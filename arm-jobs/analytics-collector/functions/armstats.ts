import { neon } from "@neondatabase/serverless";

const ALLOWED_ORIGIN = "https://kasemch.github.io";
const ALLOWED_PAGE = "/arm-jobs/";
const ALLOWED_EVENTS = new Set(["job_source_click", "prepare_application", "cv_builder"]);

const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
  "Cache-Control": "no-store",
  "Content-Type": "application/json; charset=utf-8",
};

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: corsHeaders });

const validVisitor = (value: string) => /^[A-Za-z0-9_-]{12,80}$/.test(value);

export default async function handler(request: Request) {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });

  const url = new URL(request.url);
  if (request.method === "GET" && url.pathname === "/") {
    return json(200, { ok: true, service: "armstats", routes: ["/visit", "/event"] });
  }

  if (request.method !== "POST" || !["/visit", "/event"].includes(url.pathname)) {
    return json(404, { ok: false });
  }

  const origin = request.headers.get("origin");
  if (origin && origin !== ALLOWED_ORIGIN) return json(403, { ok: false });

  let body: { visitor_id?: unknown; page_path?: unknown; event?: unknown; detail?: unknown };
  try {
    body = await request.json();
  } catch {
    return json(400, { ok: false });
  }

  const visitorId = String(body?.visitor_id ?? "");
  const pagePath = String(body?.page_path ?? "");
  if (pagePath !== ALLOWED_PAGE || !validVisitor(visitorId)) return json(400, { ok: false });

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) return json(503, { ok: false });
  const sql = neon(databaseUrl);

  if (url.pathname === "/visit") {
    await sql`INSERT INTO page_visits (visitor_id, page_path, referrer_host) VALUES (${visitorId}, ${pagePath}, NULL)`;
    return json(201, { ok: true, type: "page_view" });
  }

  const event = String(body?.event ?? "");
  const detail = String(body?.detail ?? "").slice(0, 120);
  if (!ALLOWED_EVENTS.has(event)) return json(400, { ok: false });

  await sql`INSERT INTO analytics_events (visitor_id, page_path, event_name, event_detail) VALUES (${visitorId}, ${pagePath}, ${event}, ${detail || null})`;
  return json(201, { ok: true, type: event });
}

import { neon } from "@neondatabase/serverless";

const ALLOWED_ORIGIN = "https://kasemch.github.io";
const ALLOWED_PAGE = "/arm-jobs/";

const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
  "Cache-Control": "no-store",
  "Content-Type": "application/json; charset=utf-8",
};

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: corsHeaders });

export default async function handler(request: Request) {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });

  const url = new URL(request.url);
  if (request.method === "GET" && url.pathname === "/") {
    return json(200, { ok: true, service: "armstats" });
  }

  if (request.method !== "POST" || url.pathname !== "/visit") return json(404, { ok: false });

  const origin = request.headers.get("origin");
  if (origin && origin !== ALLOWED_ORIGIN) return json(403, { ok: false });

  let body: { visitor_id?: unknown; page_path?: unknown };
  try {
    body = await request.json();
  } catch {
    return json(400, { ok: false });
  }

  const visitorId = String(body?.visitor_id ?? "");
  const pagePath = String(body?.page_path ?? "");
  if (pagePath !== ALLOWED_PAGE || !/^[A-Za-z0-9_-]{12,80}$/.test(visitorId)) {
    return json(400, { ok: false });
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) return json(503, { ok: false });

  const sql = neon(databaseUrl);
  await sql`INSERT INTO page_visits (visitor_id, page_path, referrer_host) VALUES (${visitorId}, ${pagePath}, NULL)`;
  return json(201, { ok: true });
}

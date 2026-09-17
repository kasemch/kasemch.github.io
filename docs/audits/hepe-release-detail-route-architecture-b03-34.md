# B03.34 — HEPE Release Detail Route Architecture

Status: **PASS / CLOSED**  
Date: 2026-09-17  
Repository: `kasemch/kasemch.github.io`

## Objective

Introduce an SEO-friendly, GitHub Pages-native, static detail route for HEPE public releases without changing the immutable R1 governed payload or requiring a backend/custom Jekyll plugin.

## Architecture selected

A lightweight **static route stub + shared Jekyll layout** pattern was selected.

- Shared renderer: `_layouts/hepe-release.html`
- Per-release route stub: `_pages/hepe-release-<RELEASE_CODE>.md`
- Canonical public-safe metadata: `_data/hepe_public_releases.yml`
- Registry route: `_pages/hepe-public-releases.md`

The route stub contains only public presentation metadata and the `release_code`; the shared layout resolves the actual display values from the canonical public-safe dataset.

## R1 route

`/hepe-public-releases/HEPE-HED2503-TQF3-2569-1-R1/`

The existing routes remain unchanged:

- `/hepe-public-releases/`
- `/hepe-public/`
- `/hepe-public/release.json`
- `/hepe-public/lineage.json`

## Safety and compatibility

- Static/Jekyll only.
- No backend dependency.
- No custom plugin dependency.
- Internal links use Jekyll `relative_url`.
- R1 authoritative payload, checksum, manifest semantics and lineage semantics were not modified.
- Institutional-official claim remains false.
- Public/private boundary remains unchanged.
- HEPE consistency workflow now watches the shared detail layout and per-release detail stubs.

## CI evidence

Implementation line completed at commit:

`fc652878d978ddde809820374711ff877e5461f4`

Verified workflows:

- HEPE Release Consistency: **SUCCESS**
- Jekyll Build: **SUCCESS**
- AWOS Public Boundary: **SUCCESS**

## Result

B03.34 passes the static-route architecture gate. Future governed releases can receive an SEO-friendly detail route by adding a minimal route stub that points to an already approved public release code. Creating a route stub does **not** authorize publication of a new release; the Human Publication Gate remains mandatory.

## Next candidate

B03.35 — Release Metadata Schema v2 Readiness, limited to optional public-safe presentation fields and without R1 mutation.

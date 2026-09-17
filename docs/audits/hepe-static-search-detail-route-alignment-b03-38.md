# B03.38 — Static Search Detail-Route Alignment

**Date:** 2026-09-17  
**Repository:** `kasemch/kasemch.github.io`  
**Status:** PASS / CLOSED

## Objective

Align HEPE Academic Assistant search results with each release's public-safe static detail route while preserving backward compatibility for older canonical release records that do not yet define `detail_route`.

## Implementation

Updated `assets/data/academic-index.json` so each generated HEPE release record selects its URL using this order:

1. `release.detail_route` when present.
2. `release.discovery_path` as the fallback.

The existing non-HEPE static search records were retained unchanged.

Updated `.github/workflows/hepe-release-consistency.yml` so changes to `assets/data/academic-index.json` now trigger the HEPE release consistency workflow.

## Verified generated artifact

Jekyll build artifact for commit `8e8c9209b890e561c3b72ba8f603e7c75ff97e7e` was inspected directly.

Generated file:

`assets/data/academic-index.json`

Verification result:

- JSON parsed successfully.
- Total search records: 16.
- Existing non-HEPE records preserved: 15.
- Generated HEPE controlled-public-release records: 1.
- R1 release code preserved: `HEPE-HED2503-TQF3-2569-1-R1`.
- Course code preserved: `HED2503`.
- Document type preserved: `TQF3`.
- Generated R1 URL: `/hepe-public-releases/HEPE-HED2503-TQF3-2569-1-R1/`.
- R1 URL therefore resolves to the schema-v2 `detail_route` rather than the registry overview.
- Search keywords still include HEPE, HED2503, TQF3 and the release code.
- No private/internal release metadata was added to the search index.

## CI verification

For final implementation commit `8e8c9209b890e561c3b72ba8f603e7c75ff97e7e`:

- HEPE Release Consistency: SUCCESS
- Jekyll Build: SUCCESS
- AWOS Public Boundary: SUCCESS

## Governance boundary

This change modifies only the public-safe search-discovery destination. It does not modify:

- R1 governed payload
- `hepe-public/release.json`
- `hepe-public/lineage.json`
- frozen bundle SHA-256
- institutional authority status
- Supabase Production

R1 remains an immutable HEPE project-controlled public release. Institutional official claim remains false.

## Result

**B03.38 = PASS / CLOSED**

The Academic Assistant now routes the current HEPE R1 search result directly to the dedicated static release detail page while retaining a backward-compatible discovery-page fallback for older release records.

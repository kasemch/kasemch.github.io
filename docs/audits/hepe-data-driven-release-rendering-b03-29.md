# HEPE B03.29 — Data-Driven Public Release Rendering Closure

Date: 2026-09-17
Repository: `kasemch/kasemch.github.io`
Release baseline: `HEPE-HED2503-TQF3-2569-1-R1`
Status: PASS

## Scope
Refactor public HEPE release surfaces to read public-safe metadata from the canonical Jekyll dataset `_data/hepe_public_releases.yml`, without mutating the immutable R1 controlled release, `release.json`, `lineage.json`, bundle SHA-256, or production database state.

## Files refactored
- `_pages/hepe-public-releases.md`
- `_pages/home.md`
- `_pages/curriculum-quality.md`

## Canonical public rendering source
`_data/hepe_public_releases.yml`

The dataset remains a public rendering/discovery source only. It does not replace authoritative controlled-release records or internal governance records.

## Verified gates
- Jekyll build workflow for commit `1501dff439eae788753cc28d4c44281e5958c903`: SUCCESS.
- AWOS public boundary workflow for the same commit: SUCCESS.
- R1 identity, release code, lineage, checksum and authority boundary remain unchanged.
- Public paths continue to use Jekyll `relative_url` resolution.
- No Supabase production change was performed.

## Result
`B03.29 = PASS — DATA-DRIVEN PUBLIC RELEASE RENDERING CLOSED`

The public release registry, homepage release card, and Curriculum & Quality release section now derive release metadata from one canonical public-safe Jekyll data source. Future releases can be added as new collection entries rather than duplicating metadata across pages.

## Next phase
Proceed to `B03.30 — Static Release Discovery Sync`, focused on deriving or validating the static academic search index from the canonical public release dataset while keeping publication approval gates separate.

# HEPE B03.30 — Static Release Discovery Sync Closure

Date: 2026-09-17
Repository: `kasemch/kasemch.github.io`
Release baseline: `HEPE-HED2503-TQF3-2569-1-R1`
Status: PASS

## Scope
Synchronize HEPE public-release discovery in the static Academic Assistant from the canonical public-safe release dataset without mutating the governed R1 release, manifest, lineage, checksum, or production database.

## Canonical source
`_data/hepe_public_releases.yml`

## Search target
`assets/data/academic-index.json`

The search index now uses Jekyll/Liquid to derive HEPE release records from `site.data.hepe_public_releases.releases`. Existing non-HEPE academic records remain static and preserved.

## Corrective verification
The first generated artifact revealed that front matter caused the `.json` page to inherit the site layout, producing HTML instead of raw JSON. This was corrected by setting `layout: null` and `sitemap: false` on the generated JSON source.

## CI evidence
For corrective commit `cd643cccebd435d50c2a3f9f4c2c8b9f8bf638d5`:
- Jekyll build: SUCCESS
- AWOS public boundary check: SUCCESS

## Generated artifact verification
The built `assets/data/academic-index.json`:
- parses as valid JSON;
- contains 16 records total;
- preserves 15 pre-existing non-HEPE records;
- contains exactly one derived HEPE release record for `HEPE-HED2503-TQF3-2569-1-R1`;
- exposes only public-safe release fields;
- preserves the existing client fetch route used by `assets/js/option-17a.js`.

## Governance boundary
The generated record remains HEPE project-controlled/public-safe and does not claim institutional-official status. No actor UUID, session identifier, reviewer metadata, private audit payload, restricted evidence, secret, or production-database metadata is introduced.

## Baseline protection
R1 remains immutable. Any substantive future document revision must create R2 or a later governed release.

## Result
`B03.30 = PASS — STATIC RELEASE DISCOVERY SYNC CLOSED`

Next recommended phase: `B03.32 — Release Consistency Validator`, adding fail-closed CI checks between the canonical public release dataset, public manifest, and public lineage files.

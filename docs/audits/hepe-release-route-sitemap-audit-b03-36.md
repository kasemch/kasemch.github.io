# B03.36 — Release Route Regression & Sitemap Audit

Date: 2026-09-17
Repository: `kasemch/kasemch.github.io`
Baseline commit audited: `d5c259c03bce4e0757dcb159f1668b42794c36ab`
Jekyll artifact run: `35238218167`
Artifact: `jekyll-site`
Status: PASS WITH VISUAL LIMITATION

## Scope

This audit verifies the generated static release-detail route introduced by B03.34 and the schema-v2 rendering state from B03.35. It is a presentation/build audit only and does not modify the governed R1 release payload, manifest, lineage, checksum, authority scope, or production database.

## Verified generated routes and artifacts

The Jekyll build artifact contains:

- `hepe-public-releases/index.html`
- `hepe-public-releases/HEPE-HED2503-TQF3-2569-1-R1/index.html`
- `hepe-public/index.html`
- `hepe-public/release.json`
- `hepe-public/lineage.json`
- `sitemap.xml`

The generated R1 detail route is therefore present at:

`/hepe-public-releases/HEPE-HED2503-TQF3-2569-1-R1/`

## Route and link regression

Verified from the generated HTML artifact:

- Public registry links to the R1 detail route.
- Detail route links back to `/hepe-public-releases/`.
- Detail route links to `/hepe-public/`.
- Detail route links to `/hepe-public/release.json`.
- Detail route links to `/hepe-public/lineage.json`.
- All corresponding targets exist in the generated artifact.

No missing HEPE release-route target was detected in this audit.

## Sitemap and canonical metadata

Verified:

- The detail route appears exactly once in generated `sitemap.xml`.
- Generated canonical URL is:
  `https://kasemch.github.io/hepe-public-releases/HEPE-HED2503-TQF3-2569-1-R1/`
- Generated title is:
  `HEPE-HED2503-TQF3-2569-1-R1 - Asst. Prof. Dr. Kasem Chooratna`
- Generated description is:
  `Public-safe detail page for the HEPE HED2503 TQF3 2569/1 R1 project-controlled release.`
- No duplicate detail canonical route was detected in the generated sitemap.

## Public boundary and R1 fidelity

The B03.35 implementation commit passed:

- HEPE Release Consistency — SUCCESS
- Jekyll Build — SUCCESS
- AWOS Public Boundary — SUCCESS

The route renderer continues to read public-safe metadata from `_data/hepe_public_releases.yml`. This audit did not change:

- release code
- course identity
- canonical credit pattern
- release status/scope
- source provenance
- template scope
- bundle SHA-256
- `release.json`
- `lineage.json`
- institutional-official claim

R1 remains immutable.

## Responsive / visual verification boundary

The generated markup uses responsive constructs including flex wrapping and `repeat(auto-fit, minmax(...))` grid patterns, so no structural mobile blocker is evident from the built artifact.

However, this audit did **not** perform an independent browser screenshot or pixel-diff verification at desktop/tablet/mobile viewport sizes. Therefore the visual result is recorded as structurally verified, not pixel-level visually certified.

## Gate result

- G1 Detail Route Generated — PASS
- G2 Internal Link Resolution — PASS
- G3 Sitemap Inclusion — PASS
- G4 Canonical Route Uniqueness — PASS
- G5 SEO Metadata — PASS
- G6 Relative/Generated Path Safety — PASS
- G7 Public Boundary — PASS
- G8 R1 Fidelity — PASS
- G9 HEPE Release Consistency — PASS
- G10 Jekyll Build — PASS
- G11 AWOS Public Boundary — PASS
- G12 No Production Mutation — PASS

Overall: **B03.36 PASS WITH VISUAL LIMITATION**.

The remaining limitation is independent deployed-browser visual verification only; no build, route, sitemap, link, public-boundary, or R1-integrity blocker was found.

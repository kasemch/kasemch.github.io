# HEPE B03.27 — Live Public Website Visual & Link Regression Audit

Date: 2026-09-17
Repository: `kasemch/kasemch.github.io`
Release baseline: `HEPE-HED2503-TQF3-2569-1-R1`
Scope: Post-deployment regression verification for the public HEPE release surfaces. No mutation of the R1 release, manifest, lineage, checksum, or authoritative record.

## Verification evidence

### 1. GitHub Actions Jekyll build — PASS
- Workflow: `Jekyll build`
- Head SHA under test: `73f8b854aca0133d4c7ce5b31beae4eaeb6e4768`
- Build job completed successfully.
- Built-site artifact `jekyll-site` was produced successfully.

### 2. Public boundary workflow — PASS
- Workflow: `AWOS public boundary check`
- `Build public site` = PASS.
- `Verify Public Read / Internal Write boundary` = PASS.

### 3. Built artifact presence — PASS
The generated Jekyll artifact contains all required release surfaces:
- `/index.html`
- `/curriculum-quality/index.html`
- `/hepe-public-releases/index.html`
- `/hepe-public/index.html`
- `/hepe-public/release.json`
- `/hepe-public/lineage.json`
- `/sitemap.xml`

### 4. Internal link and asset resolution — PASS
Static artifact inspection found no missing internal links/assets across the four HEPE-related public entry surfaces. Verified targets include:
- `/hepe-public-releases/`
- `/hepe-public/`
- `/hepe-public/release.json`
- `/hepe-public/lineage.json`
- `/curriculum-quality/`
- required CSS, JS, profile and signature assets.

### 5. Metadata / canonical URLs — PASS
Generated pages include expected title/description/canonical metadata. The following pages are also present in the generated sitemap:
- `/hepe-public-releases/`
- `/hepe-public/`
- `/curriculum-quality/`

### 6. Public-safe content boundary — PASS
No release-surface regression was found that exposes actor UUIDs, session identifiers, reviewer metadata, private audit payloads, or unapproved source-conflict detail. Authority wording remains project-controlled and does not assert institutional-official status.

### 7. Responsive / pixel-level browser rendering — NOT FULLY INDEPENDENTLY VERIFIED
The current execution environment verified the generated artifact, links, assets, metadata, sitemap, and CI boundary workflows. It did not complete an independent pixel-level browser/device screenshot comparison of the deployed GitHub Pages CDN response. Therefore this audit does not claim a full visual-diff test.

## Result

`B03.27 = PASS_WITH_LIMITATION`

The deployment/build regression gate passes for structure, link resolution, artifact completeness, metadata, sitemap integration, and public-boundary controls. The only remaining limitation is an independent deployed-page visual-diff/mobile screenshot check, which is non-blocking for the current immutable R1 baseline because no structural defect was detected in the built artifact.

## Baseline protection
R1 remains immutable. Any substantive document correction must create R2 or later governed lineage.

## Next phase
Proceed to `B03.28 — Public Release Registry Scalability` and `B03.29 — Data-Driven Public Release Rendering` as reversible architecture work, without changing the R1 release payload.

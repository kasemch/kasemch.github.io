# Academic Executive Wave 05 — Information Freshness Layer

Date: 2026-09-15
Scope: Home `/` and Academic Dashboard `/workspace/`
Status: SOURCE-LEVEL PASS

## Objective

Add a domain-specific freshness layer so the public site does not imply that all academic information shares one universal update timestamp.

## Freshness semantics

- Research: `Last verified` is read dynamically from `assets/data/research-projects.json`. Current registry value at implementation: 2026-09-15.
- Publications: `Register checked` = 2026-09-13, supported by `docs/evidence/publications-evidence-register-v1.md` (VERIFIED WORKING REGISTER, Date checked 2026-09-13).
- Teaching: `Public review` = 2026-09-14, supported by the Teaching public-evidence audit dated 2026-09-14. This is not relabelled as a universal `last verified` date because `_data/teaching_ay2569.yml` does not itself carry a verification-date field.
- Curriculum & Quality: no single authoritative verification date is asserted. The public page remains an explanatory model with restricted programme evidence outside the public layer.

## Implementation

- `assets/data/information-freshness.json` — public-safe freshness registry.
- `assets/js/information-freshness.js` — fail-safe static renderer; Research date is refreshed from the existing research registry at runtime.
- `assets/css/information-freshness.css` — responsive Academic Executive presentation.
- `_includes/head/custom.html` — loads the layer only on Home and Academic Dashboard.

## Governance

The layer distinguishes evidence verification/review dates from page-build time. It does not use `site.time` as a proxy for evidence freshness. Missing dates render as `Not asserted` rather than being inferred.

No publication records, MR30 teaching source data, research lifecycle state, curriculum records, credentials, OAuth/Calendar/Drive logic, HEPE/RU-AQMS restricted content, or Supabase/IAM authority are changed.

## Path / static-site compliance

The layer is fully client-side and compatible with GitHub Pages. Local page links are generated as `./...` on the homepage and `../...` on `/workspace/`, preserving repository-subdirectory-safe navigation.

## Limitation

This is a source-level implementation and audit. Pixel-level live-browser rendering and GitHub Pages deployment status are not claimed here unless separately verified.

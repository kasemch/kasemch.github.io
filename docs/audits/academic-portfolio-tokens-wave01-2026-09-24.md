# Academic Portfolio Design Tokens — Wave 01

Date: 2026-09-24
Status: SOURCE QA PASS

## Implemented
- Added a non-breaking shared token layer for the harmonized Academic Portfolio pages.
- Tokens cover the locked navy/brick/cream palette, typography, radii, shadows, focus treatment, shell width and spacing primitives.
- Loaded the token layer on Teaching, Research, Publications, Curriculum & Quality, Innovation, About, Professional Development and Analytics.

## Refactor boundary
- Existing page-specific CSS remains authoritative in this wave.
- No large-scale selector replacement or variable migration was attempted.
- The token layer is a stable foundation for gradual future refactoring and reduces regression risk.

## Evidence safeguards
- No academic content, counts, statuses, metadata or evidence registries were changed.

## Files changed
- `assets/css/academic-portfolio-tokens.css`
- `_includes/head/custom.html`
- `docs/audits/academic-portfolio-tokens-wave01-2026-09-24.md`

## Gate
PASS for PR/merge.

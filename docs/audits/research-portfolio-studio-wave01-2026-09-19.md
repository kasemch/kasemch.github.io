# Research Portfolio Studio — Wave 01

Date: 2026-09-19
Status: SOURCE QA PASS
Scope: /research/

## Implemented
- Translated the approved Teaching Portfolio Studio visual language into a Research-specific presentation.
- Added Research Portfolio Studio hero and four-part research structure strip.
- Added a Verified Active Research section rendered from the existing public research registry.
- Added current stage, workstream, next evidence gate, research lifecycle placement, and publication-linkage boundary.
- Preserved existing publication, proceedings, theme, degree-research, and research-approach sections.

## Evidence safeguards
- `assets/data/research-projects.json` is unchanged.
- BMO remains Verified Active at Instrument stage.
- No completion percentage is inferred from lifecycle stage.
- No publication is linked to BMO unless the registry explicitly verifies the relationship.
- Protocol, ethics, data collection, analysis, manuscript and publication remain not publicly confirmed where the registry says so.
- No private Drive records or controlled evidence sources are exposed.

## Technical boundary
- Static GitHub Pages/Jekyll + client-side JavaScript only.
- Registry fetch uses the existing public JSON data source.
- Repository-safe local paths use Jekyll `relative_url` or page-relative links.
- No backend, external chart library or new API dependency.
- Fail-closed fallback is shown if the public registry cannot be loaded.

## Files changed
- `_pages/research.md`
- `assets/css/research-portfolio-studio.css`
- `assets/js/research-portfolio-studio.js`
- `_includes/head/custom.html`
- `docs/audits/research-portfolio-studio-wave01-2026-09-19.md`

## Gate
PASS for PR/merge, subject to branch freshness check.

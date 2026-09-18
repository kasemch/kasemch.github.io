# Research Portfolio Studio — Wave 03 Project Drill-down & Research Evidence Explorer

Date: 2026-09-19
Status: SOURCE QA PASS
Scope: /research/

## Implemented
- Added per-project Explore evidence control on Verified Active research cards.
- Added in-page Research Evidence Explorer showing Project Core, current phase/workstream, next evidence gate, public evidence binding, public outputs, milestones, publication bindings and links to full project detail/status.
- Added explicit no-binding state when no verified publication relationship exists.
- Corrected Research Studio navigation to use repository-safe Jekyll-provided base paths rather than page-relative path rewriting.

## Evidence safeguards
- `assets/data/research-projects.json` remains unchanged.
- BMO remains Verified Active at Instrument stage.
- Public outputs preserve their registry states such as verified or active.
- Milestone states such as not-publicly-confirmed remain visible and are not upgraded.
- Publication bindings are shown only when explicitly present in `publicationBindings`; topic similarity never creates a relationship.
- Private controlled records remain represented only through public-safe binding metadata.

## Accessibility / static boundary
- Client-side only; no backend or external API.
- Explore controls are real buttons with aria-controls and aria-expanded.
- Explorer uses aria-live and returns focus to the invoking project control when closed.
- Reduced-motion preference is respected for scrolling.
- Project detail, research status and evidence-explorer routes are emitted via Jekyll `relative_url` data attributes for repository-subdirectory safety.

## Files changed
- `_pages/research.md`
- `assets/js/research-portfolio-studio.js`
- `assets/css/research-portfolio-studio.css`
- `docs/audits/research-portfolio-studio-wave03-2026-09-19.md`

## Gate
PASS for PR/merge, subject to branch freshness check.

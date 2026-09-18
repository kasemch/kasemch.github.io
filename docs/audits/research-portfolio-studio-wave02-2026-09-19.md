# Research Portfolio Studio — Wave 02 Research Dashboard & Publication Linkage Storytelling

Date: 2026-09-19
Status: SOURCE QA PASS
Scope: /research/

## Implemented
- Research dashboard with project status, lifecycle, publication linkage, outputs by year, outputs by venue, and evidence boundary.
- Project status, lifecycle, and relationship panels are rendered from the current public research registry.
- Journal output-by-year and venue distributions are derived from the verified Jekyll publication collection.
- Publication linkage is displayed only when the registry explicitly verifies the relationship.

## Evidence safeguards
- `assets/data/research-projects.json` is unchanged.
- BMO remains Verified Active at Instrument stage in the current registry.
- Stage placement is not presented as a completion percentage.
- No BMO publication linkage is asserted while `publicationLinked` remains false and binding status is none-verified.
- Venue frequency is descriptive only; no ranking, indexing, quartile, impact, or quality inference is introduced.
- Registry load failures fail closed; no project state or relationship is inferred.
- Private Drive records, unpublished findings, participant data and controlled vault material remain excluded.

## Technical boundary
- Static GitHub Pages/Jekyll + client-side JavaScript only.
- No backend or external charting dependency.
- Existing research registry remains the runtime source for project state.
- Publication year/venue visuals are generated from the existing verified publication collection.
- Responsive layouts included.

## Files changed
- `_pages/research.md`
- `assets/js/research-portfolio-studio.js`
- `assets/css/research-portfolio-studio.css`
- `docs/audits/research-portfolio-studio-wave02-2026-09-19.md`

## Gate
PASS for PR/merge, subject to final branch freshness check.

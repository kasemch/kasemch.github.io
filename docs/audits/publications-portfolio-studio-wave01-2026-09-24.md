# Publications Portfolio Studio — Wave 01 Visual Baseline

Date: 2026-09-24
Status: SOURCE QA PASS
Scope: /publications/

## Implemented
- Reframed `/publications/` as Publications Portfolio Studio using the Academic Portfolio visual language.
- Added a portfolio hero and category strip for Journal Publications, Conference Proceedings, Degree Research and Evidence Policy.
- Preserved the existing journal search/filter register and verified publication cards.
- Added explicit category counts while keeping journal publications, conference proceedings and degree research separate.

## Evidence safeguards
- Journal publication total continues to come from `site.publications`.
- Conference proceeding total is calculated only from the two verified proceedings data registers.
- Degree research is shown as a separate verified category and is not added to the journal total.
- No bibliometric claims, indexing status, quartiles, impact factor, citation count or h-index were introduced.
- Existing publication metadata and source links are unchanged.

## Technical boundary
- Static GitHub Pages/Jekyll + CSS only.
- Existing client-side search/filter JavaScript remains unchanged.
- Internal category links use Jekyll `relative_url`.
- Responsive hero/category layouts included.

## Files changed
- `_pages/publications.html`
- `assets/css/publications-portfolio-studio.css`
- `_includes/head/custom.html`
- `docs/audits/publications-portfolio-studio-wave01-2026-09-24.md`

## Gate
PASS for PR/merge.

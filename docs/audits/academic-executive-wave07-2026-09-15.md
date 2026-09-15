# Academic Executive Wave 07 — Interactive Analytics & Drill-down Audit

Date: 2026-09-15
Scope: `/analytics/`, `assets/js/public-academic-analytics.js`, `assets/css/public-academic-analytics.css`
Status: READY FOR PR

## Purpose
Extend the Wave 06 descriptive analytics page with client-side drill-down while preserving the evidence-first public boundary.

## Added interactions
- Publication year bars open the verified journal records for that year.
- Venue bars open the verified journal records using that stored venue name.
- Teaching evidence categories reveal public-safe course-quality metadata for the courses represented in the admitted quality matrix.
- Research lifecycle stages reveal public-summary projects currently verified at that latest public stage and link to project detail where available.
- A clear-selection control resets the panel.

## Evidence boundaries
- Publication drill-down uses only `site.publications` metadata and local publication URLs.
- Teaching denominator remains the 11 initially scheduled AY2569 course codes from `_data/teaching_ay2569.yml`.
- Course drill-down does not infer delivery, approval, verification pass, or completed improvement cycles.
- Research stage is not converted into a completion percentage.
- Empty research stages report zero rather than inferring hidden work.
- Restricted sources are not linked or exposed.

## Technical constraints
- Static GitHub Pages / Jekyll only.
- Vanilla ES6 JavaScript and CSS only; no external chart library or backend.
- Local links remain Jekyll-relative or page-relative.
- Controls are keyboard focusable and expose `aria-pressed` state.
- Drill-down status is announced through the existing `aria-live` region.

## Source integrity
No source publication record, MR30 record, research registry state, credential, OAuth/Calendar/Drive runtime, confidential HEPE/RU-AQMS artifact, or Supabase/IAM authority is modified by this wave.

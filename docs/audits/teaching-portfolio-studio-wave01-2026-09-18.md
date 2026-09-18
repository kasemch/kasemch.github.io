# Teaching Portfolio Studio — Implementation Wave 01

Date: 2026-09-18
Status: SOURCE QA PASS
Scope: `/teaching/`

## Visual baseline
- Implements the user-selected Teaching Portfolio Studio direction.
- Warm academic palette: navy, cream, brick/orange accents, light blue support tones.
- Adds a portfolio-style hero, approved portrait, handwritten-note accents, and a four-part teaching structure strip.
- Preserves the existing Teaching Evidence Dashboard filters and evidence-path runtime.

## Evidence safeguards
- No mockup numbers were copied into production.
- Existing `_data/teaching_ay2569.yml` remains unchanged.
- MR30 offering states remain unchanged.
- Restricted evidence remains metadata-only.
- No new claim of official active teaching, approval, completed TQF5, or completed verification is introduced.
- No student-identifiable data or private Drive identifiers are exposed.

## Technical scope
- Static GitHub Pages/Jekyll only.
- Repository-safe paths use Jekyll `relative_url`.
- No backend and no new external runtime dependency.
- Responsive behavior included for desktop, tablet, and mobile.

## Files
- `_pages/teaching.html`
- `assets/css/teaching-portfolio-studio.css`
- `_includes/head/custom.html`

## Gate
PASS for PR/merge, subject to branch freshness check.

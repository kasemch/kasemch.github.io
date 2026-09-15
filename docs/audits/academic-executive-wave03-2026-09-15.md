# Academic Executive — Wave 03 Audit

Date: 2026-09-15
Scope: About, Curriculum & Quality, Innovation & Projects, Professional Development, CV

## Objective
Extend the locked Academic Executive navy–gold visual baseline to the remaining public academic profile pages without changing academic facts, evidence status, runtime behavior, or confidentiality boundaries.

## Changes
- Extended `academic-executive-pages.css` to support:
  - About and CV (`.signature-page`)
  - Curriculum & Quality (`.curriculum-quality-hub`)
  - Innovation & Projects (`.signature-page`)
  - Professional Development (`.pd-page`)
- Updated the conditional asset loader in `_includes/head/custom.html` so the shared Academic Executive page stylesheet is loaded on these routes.
- Hardened About-page asset and internal links to use Jekyll `relative_url`.

## Preserved
- Curriculum/QA explanatory model and filtering behavior.
- Professional-development credential data and active/historical calculation.
- CV publication/proceedings counts and credential logic.
- Innovation/RU HEPE Learning data and public-disclosure boundary.
- No Teaching MR30, Research, Publication, OAuth, Calendar, Drive, Supabase/IAM or confidential HEPE/RU-AQMS data changed.

## Visual baseline
- Navy academic hero
- Gold academic accents
- Georgia/serif headings
- White evidence cards
- Navy/gold policy panels
- Consistent mobile behavior and reduced-motion handling

## Gate
PASS when branch is current with `master`, scope is limited to presentation/path hardening, and no content/runtimes are modified beyond approved public presentation changes.

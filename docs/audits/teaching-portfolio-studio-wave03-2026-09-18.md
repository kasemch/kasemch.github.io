# Teaching Portfolio Studio — Wave 03 Course Drill-down & Evidence Explorer

Date: 2026-09-18
Status: SOURCE QA PASS
Scope: /teaching/

## Implemented
- Each Semester 1/2569 course row now exposes a public-safe View evidence control.
- Drill-down panel shows offering status, schedule, and offering evidence note.
- Courses with direct quality evidence show Teaching status, TQF3, Assessment, TQF5, Verification, and Improvement metadata.
- Courses without direct quality files show the existing targeted-search evidence gap instead of inferred content.
- Restricted-source status is shown as metadata only; no restricted URL is exposed.

## Evidence safeguards
- `_data/teaching_ay2569.yml` remains unchanged.
- OFFICIALLY_CANCELLED remains authoritative where applicable.
- RETAINED_PENDING_FINAL_CONFIRMATION remains pending and is not upgraded to active.
- Missing evidence is displayed as missing; no completion state is inferred.
- Draft/working/planned evidence remains labeled accordingly.
- No student-identifiable information, grades, answer scripts, private Drive IDs, or confidential HEPE records are exposed.

## Accessibility / static boundary
- Client-side only; no backend or external API.
- Course controls are real buttons with aria-controls and aria-expanded.
- Explorer uses aria-live and returns keyboard focus to the selected course control when closed.
- Reduced-motion preference is respected for drill-down scrolling.
- Jekyll emits the evidence registries from existing public-safe data at build time.

## Files changed
- _pages/teaching.html
- assets/js/teaching-dashboard.js
- assets/css/teaching-portfolio-studio.css
- docs/audits/teaching-portfolio-studio-wave03-2026-09-18.md

## Gate
PASS for PR/merge, subject to branch freshness check.

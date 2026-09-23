# Public Academic Analytics — Integrity & Path Repair

Date: 2026-09-24
Status: SOURCE QA PASS
Scope: /analytics/

## Repaired
- Direct Quality Evidence drill-down now requires an explicit `directEvidence: true` flag instead of accepting every serialized course record.
- The serialized direct-quality course records come only from `teaching.course_quality_matrix`, which currently contains HED2503, RHE4404, HED2602 and RHE4101, matching the summary value 4/11.
- TQF3, TQF5 and Verification drill-down filters remain aligned with the current 4/11, 3/11 and 2/11 summary counts from the same public-safe matrix.
- Publication, Teaching, Research Status and Research Project drill-down routes now come from Jekyll `relative_url` data attributes.
- Research project detail links are constructed from the verified project ID and the Jekyll-injected project base rather than registry `detailPath`.
- Drill-down scrolling respects `prefers-reduced-motion`.

## Evidence safeguards
- `_data/teaching_ay2569.yml` is unchanged.
- `assets/data/research-projects.json` is unchanged.
- No course is added to direct-quality attribution beyond the four admitted course-quality matrix records.
- Cancelled/retained statuses remain unchanged.
- Research stage and publication-linkage semantics remain unchanged.

## Source QA
- One `document.currentScript` declaration: PASS.
- No `if (key === 'direct') return true` logic remains: PASS.
- No `project.detailPath` use remains in analytics runtime: PASS.
- No brittle `../publications/`, `../teaching/`, `../research-progress/` or `../research-project/` runtime route remains: PASS.
- Repository-safe route data attributes present: PASS.

## Files changed
- `_pages/analytics.md`
- `assets/js/public-academic-analytics.js`
- `docs/audits/public-academic-analytics-integrity-repair-2026-09-24.md`

## Gate
PASS for PR/merge, subject to final branch freshness check.

# Research Route Integrity — Wave 01

Date: 2026-09-24
Status: SOURCE QA PASS
Scope: /research-progress/ and /research-project/

## Repaired
- Research Status static assets and navigation now use Jekyll `relative_url`.
- Research Status runtime registry URL and project-detail base are injected from the page.
- Research Status no longer consumes registry `detailPath` for navigation.
- Research Project static assets, back link and runtime routes now use Jekyll-injected paths.
- Research Project runtime receives registry, matrix, Publications, Evidence Explorer and Research Status routes through data attributes.
- Public registry path metadata remains unchanged; the renderer no longer depends on brittle path fields for navigation.

## Evidence safeguards
- `assets/data/research-projects.json` is unchanged.
- `assets/data/research-evidence-matrix.json` is unchanged.
- Project state, lifecycle, evidence relationships and publication-binding semantics are unchanged.
- Fail-closed behavior remains in place when registry, matrix or validation layers are unavailable.

## Source QA
- No `../assets/`, `../research/`, `../publications/`, `../evidence-explorer/`, `../research-progress/` or `../research-project/` route remains in the four repaired files.
- Jekyll `relative_url` is present in both page templates.
- Research Status no longer uses `project.detailPath`.

## Files changed
- `_pages/research-progress.md`
- `_pages/research-project.md`
- `assets/js/research-progress.js`
- `assets/js/research-project.js`
- `docs/audits/research-route-integrity-wave01-2026-09-24.md`

## Gate
PASS for PR/merge, subject to branch freshness check.

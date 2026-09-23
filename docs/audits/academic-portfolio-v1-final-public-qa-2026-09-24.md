# Academic Portfolio Website v1 — Site-wide Integration & Final Public QA

Date: 2026-09-24
Status: SOURCE QA PASS
Release state: VISUAL & EVIDENCE FREEZE CANDIDATE

## Scope
- Home / Academic Digital Hub
- Professional Academic Profile
- Teaching Portfolio Studio
- Research Portfolio Studio
- Publications Portfolio Studio
- Curriculum & Quality Portfolio
- Academic Innovation Portfolio
- Professional Development & Credentials Portfolio
- Public Academic Analytics
- Evidence Explorer
- Academic Knowledge Map
- Academic CV
- Research Status / Research Project routes

## Integration checks
- Shared Academic Portfolio token layer is loaded across all key public portfolio surfaces.
- Home now has an explicit page description for search/social metadata fallback.
- Academic Knowledge Map no longer exposes the legacy visible `Option 17A` label; it now uses the Academic Portfolio naming.
- Canonical public portrait metadata is already aligned to `profile-selected-2026.webp`.
- No root-absolute `href="/..."` or page-relative `href="../..."` / `src="../..."` pattern was found in the current public page templates searched in this QA pass.
- Research Status and Research Project routes use Jekyll-injected repository-safe paths.
- Analytics direct-quality drill-down is explicitly limited to the admitted four course-quality records matching the 4/11 summary.

## Evidence integrity
- Teaching MR30 status and evidence counts were not changed.
- Research registry and evidence matrix were not changed.
- Publication records and category semantics were not changed.
- No new bibliometric, institutional approval, research completion, student outcome, or production-system claim was introduced.
- Restricted/private evidence remains excluded or metadata-only according to each domain boundary.

## Accessibility / responsive boundary
- Existing focus-visible, reduced-motion, semantic button/link and mobile-responsive treatments remain in place across the harmonized portfolio surfaces.
- SOURCE-LEVEL RESPONSIVE / ACCESSIBILITY QA = PASS.
- Real-device pixel-level verification is NOT claimed by this audit.

## Files changed in this final integration wave
- `_pages/home.md`
- `_pages/knowledge-map.md`
- `_includes/head/custom.html`
- `docs/audits/academic-portfolio-v1-final-public-qa-2026-09-24.md`

## Freeze recommendation
PASS for merge as `Academic Portfolio Website v1 — Visual & Evidence Freeze Candidate`.

After merge, further changes should be treated as post-freeze improvements or evidence updates rather than silent redesigns, unless a new visual baseline is explicitly approved.

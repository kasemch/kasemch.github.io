# Academic Portfolio Website v1 — Release Readiness Baseline

Date: 2026-09-24
Release status: SOURCE-VERIFIED BASELINE
Visual status: VISUAL & EVIDENCE FREEZE v1

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
- Research Status / Research Project public routes

## Readiness result
PASS — source-level integration and evidence-governance review.

## Verified baseline conditions
- Shared Academic Portfolio visual language is established across the principal public academic domains.
- Teaching, Research and Publications retain separate evidence semantics and public-safe boundaries.
- Teaching MR30 reconciliation and course-quality evidence counts remain unchanged.
- Research registry and evidence-matrix state remain unchanged; project lifecycle stages are not converted into completion percentages.
- Publication categories remain separate; no unsupported bibliometric indicators are introduced.
- Analytics direct-quality attribution is explicitly restricted to the admitted four course-quality records matching the 4/11 summary.
- Research Status, Research Project and Analytics drill-down routes use repository-safe Jekyll-injected paths.
- Canonical public portrait metadata is aligned to `profile-selected-2026.webp`.
- Public Academic Index labels match the harmonized portfolio naming.
- No student-identifiable information, confidential research data, private Drive URLs, OAuth secrets or controlled evidence files are intentionally exposed by the portfolio harmonization work.

## Technical baseline
- GitHub Pages / Jekyll static site.
- Client-side JavaScript only for interactive public components.
- Local page assets use Jekyll `relative_url` or Jekyll-injected repository-safe paths.
- Shared token foundation: `assets/css/academic-portfolio-tokens.css`.
- Page-specific visual layers remain separate where domain semantics differ.

## QA completed
- Source-level route review.
- Source-level responsive review.
- Source-level accessibility review for focus-visible, semantic controls and reduced-motion patterns in harmonized components.
- Evidence-boundary review across Teaching, Research, Publications, Curriculum & Quality, Innovation and Professional Development.
- Metadata and Academic Index consistency review.

## Known verification limitation
- Real-device pixel-level QA is NOT claimed.
- Rendered GitHub Pages deployment could not be independently fetched through the available web tool during this release-readiness review.
- No GitHub Actions workflow run was returned for the latest portfolio integration merge commit; therefore this record does not claim an Actions-based deployment verification.

## Change control after freeze
After this baseline, routine changes should be classified as one of:
1. Evidence update — new verified academic information without redesign.
2. Content correction — factual or wording correction with traceability.
3. Post-freeze UX improvement — non-breaking accessibility/performance/usability improvement.
4. Visual baseline change — requires explicit approval before broad redesign.

## Release baseline
Academic Portfolio Website v1 is accepted as a SOURCE-VERIFIED public website baseline.

Any later claim of `REAL-DEVICE PASS`, `RENDERED-SITE PASS`, or deployment-level acceptance requires direct rendered-site/device verification.

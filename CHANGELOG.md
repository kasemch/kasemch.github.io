# Changelog

All notable changes to the public academic website are recorded here.

The site uses a controlled versioning model tied to the Signature Hybrid baseline. Routine content changes should not silently alter the visual or structural baseline.

## [1.0.1] — 2026-09-13

### Added
- Public Website Content Completeness Audit covering About, Teaching, Research, Publications, Curriculum & Quality, Innovation & Projects, and CV.
- Publications Evidence Register v1 for all ten current `_publications` records using authoritative journal/ThaiJO sources; DOI recorded only where independently verified.
- Public Website Closure Audit for the v1.0.1 patch candidate.

### Changed
- Corrected the static browser `theme-color` metadata from a CSS variable string to the locked Signature Hybrid navy value `#0f2d3f`.

### Governance clarification
- Documented that Document Storage Phase 3B and Metadata/Search Phase 3C scaffolds were already present before the v1.0.0 baseline lock. Both remain gated/fail-closed and do not change the Signature Hybrid visual baseline.

### Verified
- Publication register: 10/10 current records supported by authoritative journal pages.
- Critical issues: 0.
- Major confirmed issues: 0.
- Signature Hybrid visual baseline: unchanged.
- Source/integration audit: PASS.
- Live pixel-level QA: not independently verified due environment limitation.

## [1.0.0] — 2026-09-13

Release manifest: `./docs/releases/signature-hybrid-v1.0.0.md`

### Added
- Signature Hybrid homepage with academic executive hierarchy, Bento portfolio sections, research/teaching emphasis, compact academic calendar integration, responsive behavior, accessibility states, and relative-path compatibility.
- Signature Hybrid shared secondary-page design system for About, Teaching, Research, Publications, Curriculum & Quality, Innovation & Projects, and CV.
- Public-safe disclosure boundary across academic and project pages.
- Compact Academic Calendar and Add Event review-before-save flow.
- Local-only Upload Center classification gate with no storage enabled.

### Changed
- Unified typography, spacing, card system, color palette, and responsive behavior across the eight primary public pages.
- Converted internal page links to relative paths where required for GitHub Pages compatibility.

### Verified
- Source and integration regression: PASS.
- Critical issues: 0.
- Major confirmed issues: 0.
- Confirmed broken links: 0.
- Calendar coexistence: PASS.
- Upload Center coexistence: PASS.
- Public/confidential boundary: PASS.

### Limitation
- External pixel-level rendering of the live `kasemch.github.io` origin was not independently verified in the final audit because the available execution environment could not resolve the live origin.

## Unreleased

### Added
- Academic Command Center static shell at `/workspace/`.
- Browser-only document classification preview with no upload or persistence.
- Review-before-save Google Calendar draft generator.
- Local academic note composer with clipboard export only.
- Command Center navigation entry.

### Governance
- No private HEPE data is rendered by the workspace shell.
- No Supabase, Google Drive, IAM, or service credentials are embedded in the public repository.
- No document action can automatically admit evidence, create authority, or mutate canonical teaching assignments.

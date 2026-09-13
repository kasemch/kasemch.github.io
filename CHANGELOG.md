# Changelog

All notable changes to the public academic website are recorded here.

The site uses a controlled versioning model tied to the Signature Hybrid baseline. Routine content changes should not silently alter the visual or structural baseline.

## Unreleased

### Added
- Research Profile Dashboard on `/research/` with automatically derived verified-publication count, publication-venue count, publication span, venue distribution, annual output timeline, and recent verified publication cards.
- Evidence-status notes for the four research themes, distinguishing themes already represented in the verified publication register from developing areas awaiting verified public outputs.
- Nine additional journal records confirmed against authoritative public journal/issue/article sources after Google Drive research reconciliation.
- Separate Research Degrees & Theses section for verified 2011 master's and 2015 doctoral research records.
- Public-safe research evidence reconciliation audit documenting publication-boundary decisions without exposing private Drive identifiers.
- Enriched academic `Person` structured data with a stable person identifier, current university employment, verified education institutions, academic expertise areas, approved portrait, and canonical profile page.
- Final Research Profile consistency audit covering Research, Publications, CV, English-language display conventions, and output-type boundaries.
- Academic Year 2569 Teaching Dashboard on `/teaching/` with a verified Semester 1/2569 course register, weekly-slot summary, cross-listed teaching clusters, special-lecture entry, and evidence-status boundaries.
- Linked HED2503 course-quality chain for TQF3, TQF5, and achievement-verification working documents, with explicit draft/planned status where completion cannot yet be claimed.
- Teaching AY2569 reconciliation audit documenting the 11 verified regular course codes, 8 weekly teaching slots, cross-listed clusters, source conflicts, and Semester 2 evidence limitation.

### Changed
- Added page-specific SEO descriptions to About, Teaching, Research, Curriculum & Quality, Innovation & Projects, and Curriculum Vitae so search/social metadata reflects each page rather than relying only on the site-wide fallback.
- Aligned the CV academic-position wording with the public About page and Ramkhamhaeng University source usage: Department of Physical Education, Faculty of Education.
- Upgraded the Research page from a themes-only overview to an evidence-led academic research profile while preserving the Signature Hybrid visual baseline.
- Research and publication links now use Jekyll `relative_url` paths for repository-safe GitHub Pages deployment.
- Expanded the verified journal-publication register to 21 records through evidence reconciliation; Research metrics remain derived from the collection rather than hard-coded totals.
- Conference proceedings are reported separately and currently comprise 13 verified records across the 2023 and 2026 proceedings registers.
- Public-facing Research and Publications titles use English for site consistency while source-language bibliographic metadata is retained internally where needed for traceability.
- Publications now displays its journal-publication count dynamically from `site.publications`, uses Jekyll `relative_url` local references, and explicitly separates journal publications from conference proceedings and degree research.
- Teaching now prioritizes verified current-year offerings instead of a static selected-course list, and internal page links use Jekyll `relative_url`.
- Open Graph descriptions now use the same page-specific `seo_description` chain as standard page metadata, so About, Teaching, Research, Curriculum & Quality, Innovation & Projects, and CV expose page-relevant social descriptions.
- Theme-generated social `Person` JSON-LD is now emitted only when verified `social.links` are configured, avoiding an empty duplicate Person entity alongside the richer academic profile schema.

### Governance
- Research dashboard metrics are derived only from the verified `_publications` collection.
- Private Drive research reports, proposals, manuscripts, working copies, and conference/proceedings candidates are excluded from journal-publication counts unless independently confirmed by an authoritative public source.
- Citation counts, h-index, indexing status, journal quartiles, and impact metrics remain excluded until independently verified from authoritative sources.
- Structured-data `sameAs` remains limited to the verified GitHub profile; ORCID, Google Scholar, Scopus, ResearchGate and other academic-profile links remain excluded until independently verified.
- Teaching AY2569 public status is limited to Semester 1/2569 until an authoritative Semester 2 teaching record is confirmed.
- TQF5 and achievement-verification documents are not promoted to final/completed status merely because a working document exists; future-dated verification remains labelled draft/planned.

### Verified
- Signature Hybrid visual design and page layouts remain unchanged outside the additive Research and Teaching dashboard components.
- No Calendar, Workspace, OAuth, or navigation runtime files were changed in the Teaching patch.
- Structured-data identity is consolidated to one rich academic Person entity when no verified theme-level social profile list exists.
- Page-specific descriptions now propagate consistently to standard SEO, Open Graph, and the custom Twitter summary metadata path.
- Research output taxonomy is consistent across Research, Publications, and CV: 21 verified journal publications, 13 verified conference proceedings, and 2 degree research works.
- Teaching Semester 1/2569 register reconciles 11 course codes to 8 weekly teaching slots plus one separate RAM1142 special lecture.

## [1.1.0] — 2026-09-13

Release manifest: `./docs/releases/signature-hybrid-v1.1.0.md`

### Added
- Academic Command Center at `/workspace/` with OAuth-aware runtime status.
- Google Calendar direct-write runtime using a public OAuth Web Client ID and short-lived browser authorization.
- Controlled Google Drive upload runtime with classification, human review, destination capability verification, and explicit upload confirmation.
- Local academic note composer with clipboard export only.
- Command Center navigation entry.
- Approved Formal Portrait 01 asset for the Signature Hybrid homepage Hero.
- JPEG social/avatar fallback derived from the same approved Formal Portrait 01 for broader crawler compatibility.

### Changed
- Reconciled `/workspace/` after OAuth activation so Quick Add links now open the live `/add-event/` and `/upload-center/` workflows instead of the earlier local-only placeholders.
- Converted workspace asset and internal page links to Jekyll `relative_url` paths.
- Homepage Hero now uses the approved Formal Portrait 01 while preserving the locked Signature Hybrid layout, palette, typography, responsive behavior, and public content structure.
- Removed three demonstration calendar events from the public projection and replaced them with a fail-closed empty state until a real event is explicitly approved for public display.
- Updated the Academic Calendar policy to reflect Google Calendar as the operational source of truth while keeping the public projection deliberately separate.
- Author avatar, default Open Graph preview, Twitter summary metadata, and Person structured-data image now use the approved portrait consistently; the Hero continues to use the optimized WebP asset.
- Added a site-wide Open Graph description while intentionally leaving the theme-level `og_image` unset because this template treats it as an Organization logo rather than a personal portrait.

### Governance
- Signature Hybrid v1.0.0 remains the locked visual design baseline.
- No private HEPE data is rendered by the workspace.
- No Google client secret, refresh token, service-account key, Supabase service-role key, or other privileged credential is embedded in the public repository.
- No document action can automatically admit evidence, create authority, create canonical courses, or mutate canonical teaching assignments.
- Calendar and Drive writes remain user-confirmed actions through browser OAuth.
- Public calendar data remains fail-closed; no private or inferred calendar event is rendered automatically.

### Verified
- Repository/source integrity: PASS.
- Signature Hybrid visual baseline: unchanged.
- Portrait/social metadata consistency: PASS at source level.
- Calendar/Drive/Workspace coexistence: PASS at source level.
- Public-disclosure boundary: PASS.
- Critical confirmed issues: 0.
- Major confirmed issues: 0.
- Live pixel-level and third-party social-card cache behavior: not independently verified because the available execution environment could not fetch the live origin.

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

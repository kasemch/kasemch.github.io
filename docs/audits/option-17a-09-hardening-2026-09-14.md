# OPTION-17A-09 — Performance / SEO / Accessibility Hardening

Date: 2026-09-14

## Scope
Site-wide hardening for the Option 17A public academic website before final acceptance.

## Corrections in this phase
- Static AI v2 stylesheet is loaded eagerly from Home instead of being injected at runtime, reducing avoidable style delay.
- Static AI v2 now reports a safe fallback when the local public index is unavailable and does not fabricate results.
- Knowledge Map client-side destinations use nested-page-safe relative paths (`../.../`) rather than direct root-absolute paths.
- Publication venue summary counts only non-empty venue groups.
- Publications page now has an explicit SEO description.
- Home profile image has explicit width/height and decoding metadata to reduce layout-shift risk.

## Architecture verification
- Jekyll / GitHub Pages only.
- Vanilla JavaScript only for client-side interaction.
- No external AI service or client-side private API secret introduced by Option 17A.
- Existing theme navigation uses `base_path` when rendering internal navigation records, so root-style navigation data remains repository-subdirectory-aware at render time.

## Public-safety verification
- Evidence Explorer renders only records marked public in the evidence data layer.
- Professional Development uses the existing verified credential registry and does not publish certificate IDs, verification tokens or private Drive files.
- Knowledge Map includes public website domains only.
- Static AI v2 searches a local public index only.

## Final gate plan
1. Jekyll build.
2. Inspect generated build artifact for core route files and required static assets.
3. Check key internal destinations and local-index paths.
4. Confirm page metadata and accessibility hooks are present in generated HTML.
5. Re-check PR mergeability and public-safety boundary before merge.

Status: IN REVIEW — final status is assigned only after CI/build-artifact inspection.

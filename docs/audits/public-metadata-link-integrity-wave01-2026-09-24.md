# Public Website Metadata & Link Integrity — Wave 01

Date: 2026-09-24
Status: SOURCE QA PASS

## Implemented
- Aligned the configured author avatar with the canonical public portrait already used on the homepage, Teaching Portfolio and Professional Academic Profile: `profile-selected-2026.webp`.
- Updated custom social metadata fallback to the same canonical portrait.
- Corrected the Open Graph image MIME type to `image/webp` and removed hard-coded image dimensions that were tied to the previous JPEG metadata.
- Updated Academic Index display labels to the current harmonized portfolio names without changing their routes, domains, evidence status or summaries.

## Academic Index label updates
- Academic Profile → Professional Academic Profile
- Teaching Evidence Dashboard → Teaching Portfolio Studio
- Publications Dashboard → Publications Portfolio Studio
- Curriculum & Academic Quality Hub → Curriculum & Quality Portfolio
- Innovation & Projects → Academic Innovation Portfolio
- Professional Development & Credentials → Professional Development & Credentials Portfolio

## Evidence safeguards
- No academic facts, credentials, publication records, teaching status, research state, or HEPE release data were changed.
- No new external identity or social profile was asserted.
- Route values in `assets/data/academic-index.json` remain unchanged.

## Files changed
- `_config.yml`
- `_includes/head/custom.html`
- `assets/data/academic-index.json`
- `docs/audits/public-metadata-link-integrity-wave01-2026-09-24.md`

## Gate
PASS for PR/merge, subject to branch freshness check.

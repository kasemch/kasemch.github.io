# Curriculum & Quality Portfolio — Harmonization Wave 01

Date: 2026-09-24
Status: SOURCE QA PASS
Scope: /curriculum-quality/

## Implemented
- Translated the page into the Academic Portfolio visual language.
- Added a portfolio hero and four-part navigation strip.
- Added the public explanatory architecture: Programme Intent → PLO → Courses → CLO → Teaching → Assessment → Evidence → Improvement.
- Preserved the existing Continuous Improvement Cycle, contribution domains, quality-domain filters and HEPE public-release block.

## Evidence safeguards
- No HEPE release facts or release metadata were changed.
- Current release rendering continues to use the existing public release registry.
- The new quality chain is explicitly explanatory and does not assert programme approval, implementation completion or restricted evidence availability.
- Internal SAR evidence, committee records, student data and confidential implementation details remain excluded.

## Technical boundary
- Static Jekyll/Liquid + CSS only.
- Existing domain-filter JavaScript remains unchanged.
- Internal links use Jekyll `relative_url`.
- Responsive/mobile layouts included.

## Files changed
- `_pages/curriculum-quality.md`
- `assets/css/curriculum-quality-portfolio.css`
- `_includes/head/custom.html`
- `docs/audits/curriculum-quality-portfolio-wave01-2026-09-24.md`

## Gate
PASS for PR/merge.

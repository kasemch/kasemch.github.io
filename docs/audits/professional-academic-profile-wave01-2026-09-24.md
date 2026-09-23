# Professional Academic Profile — Harmonization Wave 01

Date: 2026-09-24
Status: SOURCE QA PASS
Scope: /about/

## Implemented
- Translated About into a Professional Academic Profile using the Academic Portfolio visual language.
- Added the approved public portrait and a Teaching / Research / Quality / Service navigation strip.
- Preserved existing profile, expertise, teaching, quality, leadership/service and innovation content.

## Evidence safeguards
- No new administrative appointment or leadership title was introduced.
- Existing language continues to state that specific administrative appointments are published only after authoritative evidence is reconciled.
- No new degree, award, credential or institutional claim was added in this wave.

## Technical boundary
- Static Jekyll/Liquid + CSS only.
- Approved portrait uses Jekyll `relative_url`.
- Responsive/mobile layouts included.

## Files changed
- `_pages/about.md`
- `assets/css/professional-academic-profile.css`
- `_includes/head/custom.html`
- `docs/audits/professional-academic-profile-wave01-2026-09-24.md`

## Gate
PASS for PR/merge.

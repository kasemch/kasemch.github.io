# HEPE FAST TQF PORTAL — V29 SCOPE / COURSE DESCRIPTION / INSTANT AI AUDIT

Date: 2026-09-18

Status: READY FOR AUTHENTICATED VISUAL ACCEPTANCE

Environment: NON-PRODUCTION

## Approved changes

The user approved the following operational rules:

1. The portal does not process general-education courses.
2. The portal does not process EDU-prefix courses.
3. AI analysis buttons must immediately place analysis text in a visible text box.
4. Course descriptions should come from the curriculum source; if canonical text is unavailable, the system must not fabricate it.

## Scope rule

The current curriculum contains 92 courses.

Excluded:

- EDU* = 13 courses
- RAM* = 14 courses, treated as general-education scope for this portal

In-scope courses:

- 65

Backend helper:

`private.hepe_fast_tqf_course_in_scope(text)`

Rule:

`course_code NOT LIKE 'EDU%' AND course_code NOT LIKE 'RAM%'`

This rule is now applied to:

- programme catalogue count
- course catalogue
- curriculum context
- programme dashboard
- portal context
- TQF3 working-version save by code
- TQF5 draft creation by code
- verification draft creation by code

Direct curriculum-context calls for EDU1202 and RAM1112 were tested and correctly failed with:

`COURSE_OUT_OF_SCOPE`

## Course-description coverage

After applying the scope rule:

- eligible courses = 65
- courses with current canonical description = 64
- courses without current canonical description = 1

The only in-scope course currently missing a canonical description is:

`HED3701 — การฝึกปฏิบัติวิชาชีพครูระหว่างเรียนวิชาเอกสุขศึกษาและพลศึกษา`

Verified checks:

- HED2503 description_status = AVAILABLE
- HED2503 has description text = true
- HED3701 description_status = MISSING_CANONICAL_DESCRIPTION

## Course-description UI rule

Normal behavior:

1. Use current `course_description_versions` description when available.
2. Show provenance/verification/authority status.
3. Keep curriculum-derived description read-only.
4. If canonical description is missing but Working TQF3 contains a description, display it only as:
   `WORKING FALLBACK — NON-CANONICAL`
5. If neither source exists, show missing-source status.
6. AI must not create a canonical curriculum description.

## AI analysis behavior

The live UI remains on v29.

Existing v29 AI component:

`#ai-analysis-box`

Behavior now verified/refined:

- user clicks an AI analysis button
- local Smart QA runs immediately
- analysis text is immediately written into the visible textarea
- course code/title and section context are included
- suggestion cards remain available below
- the user may Accept / Edit & Accept / Reject
- canonical data is never modified automatically

A duplicate experimental AI textarea was removed so only one instant-analysis box remains.

## Frontend

Live frontend remains:

- `./hepe-trial/index.html`
- `./hepe-trial/assets/js/portal-v29.js`
- `./hepe-trial/assets/css/portal-v29.css`

Scope notice added:

- excludes RAM*
- excludes EDU*

## Regression

Frontend:

- JS syntax parse = PASS
- required UI markers = PASS
- exactly one `ai-analysis-box` = PASS
- live JS is portal-v29.js = PASS
- live CSS is portal-v29.css = PASS
- scope notice visible in index = PASS

Runtime:

- filtered course catalogue = 65
- filtered programme dashboard = 65
- EDU1202 blocked = PASS
- RAM1112 blocked = PASS
- HED2503 description available = PASS
- HED3701 correctly reported missing = PASS

## Immutable release invariant

HED2503 R1:

- status = PUBLIC_PUBLISHED
- SHA-256 = 799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256

Working state:

- TQF3 current version = 5
- TQF3 version count = 5

No immutable release mutation occurred.

## Production boundary

Production remains unauthorized.

No secret change.

No evidence admission.

No VERIFIED transition.

No destructive action.

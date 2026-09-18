# HEPE FAST TQF PORTAL — V30 ADVANCED OPERATIONS AUDIT

Date: 2026-09-18

Status: READY FOR AUTHENTICATED VISUAL ACCEPTANCE

Environment: NON-PRODUCTION

## Scope

V30 continues from the approved V29 baseline and implements:

1. HED3701 source-gap review
2. full EDU/RAM scope hardening
3. AI proposed-text / undo / decision-history workflow
4. readiness classification using BLOCKING / WARNING / PASS
5. programme dashboard filters and Needs Attention view
6. evidence-candidate registration
7. internal-review package preview
8. collection-selector runtime regression repair

## HED3701 source-gap review

Searches were run across:

- connected Google Drive
- current GitHub repository

The available HED3701 document located in Drive is the previously identified TQF4/TQF6 sample/reference document.

Project governance already classifies this material as:

`REFERENCE_SAMPLE_ONLY`

Therefore it was not used to create or admit a canonical course description.

Current HED3701 state remains:

`MISSING_CANONICAL_DESCRIPTION`

No AI-generated substitute was created.

Current in-scope course-description coverage:

- in-scope courses = 65
- current canonical descriptions = 64
- missing = 1
- missing course = HED3701

## Scope hardening

Portal scope:

- current curriculum membership
- excludes EDU*
- excludes RAM*

Verified in-scope count:

`65`

Scope helper:

`private.hepe_fast_tqf_course_in_scope(text)`

Additional V30 guards now apply to:

- TQF3 version history
- Evidence Workspace
- CQI context
- Evidence Queue
- Evidence Candidate registration

Existing operational write/read entry points remain scope protected.

Out-of-scope direct calls fail with:

`COURSE_OUT_OF_SCOPE`

## Evidence Candidate registration

New RPC:

`hepe_fast_tqf_register_evidence_candidate_by_code(...)`

Registration rules:

- authenticated only
- in-scope course only
- review authority required
- required metadata must be present
- verification_status is forced to UNVERIFIED
- admission_status is forced to NOT_ADMITTED
- creates_system_authority is forced to false
- this workflow cannot admit evidence

A rollback-only candidate registration test passed.

Test row persistence after rollback:

`0`

## ACL

New/updated read and candidate-registration RPCs:

- anon execute = false
- authenticated execute = true

## AI workflow

V30 AI keeps immediate local analysis and adds:

- separate “ข้อความเสนอให้ใช้” area
- unresolved suggestion counter
- copy proposed text
- undo last applied AI text
- recent AI decision history

User remains the final decision-maker.

AI does not modify canonical curriculum data automatically.

## Readiness

Readiness states:

- BLOCKING
- WARNING
- PASS

Current categories include:

- course-description source
- CLO completeness
- CLO→PLO working linkage
- weekly plan coverage
- weekly alignment
- assessment total
- assessment→CLO/evidence
- TQF3↔TQF5 CLO consistency
- verification state
- evidence presence
- unresolved AI decisions

Readiness remains an internal-review indicator only.

## Dashboard

V30 dashboard filters include:

- HED / PED prefix
- REQUIRED / ELECTIVE
- offered / missing TQF3 / missing TQF5
- verification state
- Needs Attention only
- free-text course search

Course rows display:

- description availability
- offering state
- TQF3
- TQF5
- verification
- TQF3 version
- attention state

## Internal Review Package

V30 adds a browser preview containing:

- programme
- course
- TQF3 working version
- readiness score
- blocking / warning count
- verification status
- course-description source state

Print / Save PDF remains a DRAFT internal-review output.

It is not institutional approval.

## Runtime selector repair

A V29 regression was identified where querySelector helper `$()` was used with collection operations such as forEach/map/filter.

V30 repairs these to the querySelectorAll helper `$$()`.

Regression result:

- JS syntax parse = PASS
- no remaining single-element collection selectors = PASS
- required DOM IDs = PASS
- one instant AI box = PASS
- V30 JS/CSS asset links = PASS

## Current invariants

HED2503 working TQF3:

- current version = 5
- version count = 5

HED2503 verification:

- INSUFFICIENT_EVIDENCE

Immutable R1:

- PUBLIC_PUBLISHED
- SHA-256 = 799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256

R1 was not mutated.

## Production boundary

Production remains unauthorized.

No secret change.

No evidence admission.

No VERIFIED transition.

No destructive migration.

No historical rewrite.

## Remaining true source gap

HED3701 requires an authoritative curriculum source before its canonical course description can be admitted.

Until that source is found, the correct state is:

`MISSING_CANONICAL_DESCRIPTION`

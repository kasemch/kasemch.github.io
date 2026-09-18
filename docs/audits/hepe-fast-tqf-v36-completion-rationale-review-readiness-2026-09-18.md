# HEPE FAST TQF PORTAL — V36 COMPLETION / RATIONALE / REVIEW-READINESS AUDIT

Date: 2026-09-18
Environment: NON-PRODUCTION
Status: READY FOR AUTHENTICATED VISUAL ACCEPTANCE

## Scope

V36 continues from the V35 baseline and completes the approved safe phase:

1. live-form UX hardening
2. compact Finish-this-section workflow
3. major Reuse/Update change rationale
4. evidence review readiness grouping
5. TQF4/TQF6 field-by-field activation checklist
6. full release regression and invariant checks

## Live form UX

V36 adds:

- sticky inline AI recommendation header
- larger mobile/touch targets for AI and completion actions
- reduced-motion-safe behavior

No master-screen redesign was introduced.

## Finish this section

Each AI-enabled working section can now expose:

`ตรวจหมวดนี้ให้จบ`

Behavior:

- recompute current section completion
- surface only non-PASS checks tied to that section
- show the first unresolved gap
- allow direct navigation to the gap
- optionally run the existing section AI review
- recompute status immediately after user input/change

This is an internal completion helper.

It is not document approval.

## Change rationale

V36 requires a short human rationale before:

`Reuse / Update → เติมเฉพาะช่องว่างจาก prior working version`

The system does not require rationale for simply keeping the current version.

Recorded metadata includes:

- source version
- target version
- affected fields
- rationale
- timestamp

The rationale is persisted inside TQF3 working content only.

It is not written into canonical curriculum data.

## Evidence review readiness

V36 groups current evidence candidates by evidence type and reports:

- candidate count
- ready-for-human-review count
- authority-owner completeness
- locator completeness
- document/source date
- descriptive document age indicator
- SHA state through existing validation

Document age is descriptive only.

It does not decide evidence validity.

Evidence admission remains unavailable.

## Template activation readiness

V36 renders field-by-field read-only checklists for:

- TQF4 v2
- TQF6 v2

Classification remains:

- SOURCE_READY
- EXECUTION_REQUIRED
- HUMAN_INPUT_REQUIRED
- SIGNATURE_GATE

No Activate / Approve button is created.

## Frontend regression

- JavaScript syntax = PASS
- bad single-element collection selectors = 0
- duplicate DOM IDs = 0
- live assets = portal-v36.js / portal-v36.css
- Finish Section runtime = PRESENT
- change rationale guard = PRESENT
- evidence grouping = PRESENT
- document-age indicator = PRESENT
- template activation checklist = PRESENT

## Runtime invariants

HED2503:

- current working TQF3 version = 6
- working version count = 6
- verification = INSUFFICIENT_EVIDENCE

Immutable R1:

- status = PUBLIC_PUBLISHED
- SHA-256 = 799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256

Course scope:

- in-scope = 65
- descriptions present = 65

TQF4 v2:

- current_version_no = 1
- v2 status = UNDER_REVIEW
- approved_at = null
- sections = 7
- fields = 18

TQF6 v2:

- current_version_no = 1
- v2 status = UNDER_REVIEW
- approved_at = null
- sections = 8
- fields = 21

No activation occurred.

## Production boundary

Production remains unauthorized.

No secret changes.

No destructive migration.

No evidence admission.

No VERIFIED transition.

No template activation.

No immutable release mutation.

## Current true gate

Authenticated visual acceptance of V36.

Expected new visible behavior:

- “ตรวจหมวดนี้ให้จบ”
- live section gap count/state
- Reuse/Update rationale field
- Evidence Review Readiness grouping
- document-age indicator
- TQF4/TQF6 read-only Activation Checklist
- improved touch/sticky AI recommendation behavior

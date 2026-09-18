# HEPE FAST TQF PORTAL — V32 CLOSURE AUDIT

Date: 2026-09-18

Status: READY FOR AUTHENTICATED VISUAL ACCEPTANCE

Environment: NON-PRODUCTION

## Scope

V32 completes the post-V31 workstream without activating Production, admitting evidence, marking a verification record VERIFIED, or activating TQF4/TQF6 v2.

Completed areas:

1. accessibility and keyboard hardening
2. controlled course-responsibility read model
3. advanced cross-document QA
4. evidence-review preparation
5. TQF4/TQF6 v1↔v2 structural review
6. expanded internal-review package

## Accessibility

Implemented:

- skip link to main content
- aria-live status
- tablist/tab/tabpanel semantics
- keyboard tab navigation with arrows/Home/End
- visible focus states
- reduced-motion support
- sticky table headers
- horizontally scrollable table regions
- mobile horizontal-scroll hint
- dynamic table regions with accessible labels
- aria-busy loading state
- friendly error mapping

Static DOM regression:

- JavaScript parse = PASS
- duplicate DOM IDs = 0
- invalid collection selectors = 0
- tab/panel ARIA contract = PASS
- one missing static-ID scan result, `create-verification`, is expected because that button is dynamically created by `renderVerification()`

## Controlled course responsibility

New read-only RPCs:

- `hepe_fast_tqf_course_responsibility_by_code(text,text,text,text)`
- `hepe_fast_tqf_programme_responsibility_by_code(text,text,text)`

Source layer:

`v_course_academic_responsibility_current`

Rules:

- authenticated only
- portal course scope enforced
- programme/course authority enforced
- named responsibility displayed only when the controlled record is VERIFIED and has a real academic_person_id/name
- pending roster is displayed as pending
- missing responsibility is displayed as missing
- historical/sample values are not inferred

Verified AY2569/T1 programme summary:

- in-scope courses = 65
- courses with controlled records = 28
- courses with verified named responsibility = 28

Examples:

HED2502:
- one VERIFIED named responsibility record
- source chain = controlled responsibility layer

HED2503:
- zero current controlled responsibility records
- UI must display “ยังไม่มี controlled responsibility record”
- no person name is inferred

Out-of-scope test:

`EDU2103` → `COURSE_OUT_OF_SCOPE`

ACL:

- anon execute = false
- authenticated execute = true

## Dashboard responsibility support

V32 adds:

- responsible-person column
- filter: all
- filter: controlled only
- filter: missing controlled responsibility
- filter by verified responsible-person name
- controlled responsibility is included in local programme Smart QA count

This is a read-only operational view, not an institutional appointment action.

## Advanced cross-document QA

V32 checks only relationships supported by available data:

1. TQF3 assessment plan → TQF5 Plan/Actual narrative
2. weekly evidence expectation → Evidence Workspace presence
3. TQF3 CLO → TQF5 CLO attainment codes
4. CQI source → next-cycle TQF3 carry-forward decision
5. accepted AI decision → source/evidence-basis traceability

Important limitation:

The current data model does not provide item-level executed results for every TQF3 assessment item.

Therefore V32 does not fabricate or infer item-level assessment results.

Version change narrative compares the two latest working TQF3 versions by structured sections.

## Evidence review preparation

V32 candidate review now displays:

- evidence ID
- source
- evidence type
- authority owner
- version/document date
- source locator
- optional SHA-256
- verification status
- admission status
- operational readiness for human review

Operational candidate-review states include:

- READY_FOR_HUMAN_REVIEW
- NEEDS_METADATA

This state is not evidence admission.

Duplicate metadata groups are surfaced for review.

There is no admission button.

Evidence admission remains a Human Gate.

## TQF4 / TQF6 structural review

New read-only RPC:

`hepe_document_template_version_review(text,integer)`

ACL:

- anon execute = false
- authenticated execute = true

The Readiness screen can compare:

- HEPE-TQF4-GENERIC v1 vs v2
- HEPE-TQF6-GENERIC v1 vs v2

The review shows:

- sections
- sections added in v2
- field binding counts
- synthetic-data guards
- canonical/linkage bindings
- execution-sensitive fields
- approval/signature gates

No activation or approval button is provided.

Current template invariants:

TQF4:
- registry current_version_no = 1
- v2 status = UNDER_REVIEW
- v2 approved_at = null

TQF6:
- registry current_version_no = 1
- v2 status = UNDER_REVIEW
- v2 approved_at = null

## Internal Review Package

V32 adds appendices:

A. Section findings
B. Accepted AI decisions
C. Evidence candidates
D. Version diff narrative
E. CQI lineage
F. Source / provenance

Output remains:

DRAFT / NON-PRODUCTION / INTERNAL REVIEW ONLY

It is not institutional approval.

## TQF3 working-save governance

V32 changes the default source status for newly saved user-edited TQF3 working versions from:

`LATEST_WORKING_CONFIRMED`

to:

`UNVERIFIED`

Reason:

User-edited working content must not be auto-labeled as confirmed merely because it was saved.

This preserves append-only working history and does not alter immutable releases.

## Curriculum-description invariant

Current portal scope:

65 courses

Current descriptions:

65

Coverage:

65 / 65

HED3701 remains source-observed from the curriculum book with no institutional-approval claim.

## HED2503 immutable invariants

TQF3 current working version:

5

Working version count:

5

Verification:

`INSUFFICIENT_EVIDENCE`

Immutable R1:

`HEPE-HED2503-TQF3-2569-1-R1`

Status:

`PUBLIC_PUBLISHED`

SHA-256:

`799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256`

R1 unchanged.

## Frontend files

- `./hepe-trial/index.html`
- `./hepe-trial/assets/js/portal-v32.js`
- `./hepe-trial/assets/css/portal-v32.css`
- `./hepe-trial/config/state.json`

Asset cache key:

`32.2`

## Regression summary

- JS syntax = PASS
- collection selector regression = PASS
- duplicate DOM IDs = NONE
- ARIA tab/panel contract = PASS
- accessibility shell = PASS
- controlled-responsibility ACL = PASS
- controlled-responsibility scope = PASS
- description coverage 65/65 = PASS
- TQF4 v2 activation lock = PASS
- TQF6 v2 activation lock = PASS
- HED2503 R1 immutable = PASS

## Public route verification limitation

Repository state and relative asset references were verified.

The public GitHub Pages route could not be fetched by the external web inspection tool in this run.

Therefore this audit does not claim authenticated browser rendering was independently observed.

Next Human Gate:

Authenticated visual acceptance of V32 in the user browser.

## Production boundary

Production remains unauthorized.

No secrets changed.

No evidence admitted.

No verification record promoted to VERIFIED.

No TQF4/TQF6 v2 activation.

No immutable R1 mutation.

No historical rewrite.

# HEPE FAST TQF PORTAL — V34 CONTEXT-AWARE REVIEW WORKFLOW AUDIT

Date: 2026-09-18

Environment: NON-PRODUCTION

Status: READY FOR AUTHENTICATED VISUAL ACCEPTANCE

## Scope

V34 continues the approved V33 guided AI workflow and implements:

1. compact field-level AI controls
2. source-aware proposal generation
3. context-constrained CQI and verification drafting
4. Review Queue counters / filters / resolve-and-next
5. prior-version field comparison
6. CQI-to-field review mapping
7. reuse/update lineage
8. expanded internal-review appendices
9. read-only TQF4/TQF6 field-mapping review

No production authorization is implied.

## Compact Field AI

V33 exposed several AI actions beside high-value fields.

V34 reduces visual density:

- CHECK remains one-click
- WRITE / REFINE / ALIGN are placed inside an “AI เพิ่มเติม” menu
- mobile rendering keeps the menu inline instead of overlaying the form

This change does not alter AI authority.

## Source-aware proposals

CLO scaffold:

- draws terms from the source-observed curriculum course description
- uses them only as context
- does not create canonical CLO authority

Weekly activity scaffold:

- uses the user-selected topic and CLO
- leaves actual teaching method/evidence choices as placeholders for the user

Assessment evidence scaffold:

- uses assessment method and CLO already present in the working form
- does not fabricate rubric scores or criteria

CQI scaffold:

- is generated only when actual TQF5 problem text exists
- otherwise returns a BLOCKING message asking the user to provide real problems first

Verification finding scaffold:

- is generated only from linked controlled evidence
- evidence candidates alone do not qualify
- no VERIFIED conclusion is generated

## Review Queue V34

Adds:

- total remaining count
- BLOCKING count
- WARNING count
- filters: ALL / BLOCKING / WARNING / TQF3 / TQF5 / VERIFICATION
- Resolve-and-next action

Resolve-and-next behavior:

- re-runs readiness
- if the underlying issue still exists, it remains in the queue
- if the issue is resolved, navigation moves to the next remaining item

The queue cannot mark a gap resolved merely by clicking a button.

## Version / CQI

Reuse → Update now includes:

- field-level prior-version comparison
- CQI source list mapped to the improvement field for user review
- explicit user choice before any carry-forward
- reuse/update lineage
- rationale metadata for accepted reuse actions

Fill-from-prior remains:

- blank fields only
- no overwrite of existing text

## Review Package V34

Adds:

- DRAFT watermark
- Review Queue remaining counts by group
- AI decision counts by section
- unresolved AI appendix
- field-level prior-version diff appendix
- CQI lineage appendix
- reuse/update lineage appendix
- source/provenance appendix
- AI decision/evidence trail with rationale where recorded

Classification remains:

DRAFT / NON-PRODUCTION / internal review only.

## TQF4 / TQF6 review

V34 remains read-only.

Structural preview adds lists of:

- canonical/source-fed fields
- execution/evidence-required fields
- approval/signature gate fields

No Activate or Approve action exists.

TQF4 generic v2:

- UNDER_REVIEW
- current_version_no remains 1

TQF6 generic v2:

- UNDER_REVIEW
- current_version_no remains 1

## Frontend regression

- JavaScript syntax = PASS
- bad single-element collection selectors = 0
- duplicate DOM IDs = 0
- V34 JS/CSS links = PASS
- compact field AI = PASS
- one-click CHECK = PASS
- source-aware CLO scaffold = PASS
- source-aware Weekly scaffold = PASS
- source-aware Assessment scaffold = PASS
- CQI actual-problem guard = PASS
- Verification linked-evidence guard = PASS
- Review Queue filters = PASS
- Resolve-and-next = PASS
- prior-version diff = PASS
- CQI mapping = PASS
- Review Package appendices = PASS
- TQF4/TQF6 structural field review = PASS

## Database invariants

Course scope:

- in-scope courses = 65
- descriptions available = 65

HED2503:

- TQF3 current working version = 5
- version count = 5
- verification = INSUFFICIENT_EVIDENCE

Immutable R1:

- PUBLIC_PUBLISHED
- SHA-256 = 799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256

Templates:

- TQF4 v2 = UNDER_REVIEW, approved_at null, current version remains 1
- TQF6 v2 = UNDER_REVIEW, approved_at null, current version remains 1

## Production boundary

Production remains unauthorized.

No secret change.

No evidence admission performed by V34.

No VERIFIED transition.

No template v2 activation.

No immutable R1 mutation.

No historical rewrite.

## Current Human Gate

Authenticated visual acceptance of V34.

Expected visible behavior:

- one-click “ตรวจ” beside supported fields
- “AI เพิ่มเติม” menu for less frequent actions
- source-aware suggestions
- Review Queue counters and filters
- “ตรวจซ้ำแล้วไปข้อถัดไป”
- prior-version field comparison
- CQI review mapping
- expanded DRAFT review package
- detailed read-only TQF4/TQF6 structural field review

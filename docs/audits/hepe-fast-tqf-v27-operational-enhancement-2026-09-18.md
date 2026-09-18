# HEPE FAST TQF PORTAL — V27 OPERATIONAL ENHANCEMENT AUDIT

Date: 2026-09-18

Status: READY FOR AUTHENTICATED VISUAL ACCEPTANCE

Environment: NON-PRODUCTION / GitHub Pages + Supabase Sandbox

## Scope

V27 implements the approved post-v26 operational enhancements:

1. Smart Autosave
2. Draft Recovery
3. Programme Dashboard
4. Evidence Workspace
5. TQF3 Version Compare
6. CQI Carry-forward

No Production authorization is implied.

## Smart Autosave

Implementation:

- browser localStorage buffer
- debounce delay
- key includes programme/course/year/term
- visible save state
- no server version on every keystroke

States:

- ready
- unsaved
- saved locally
- saved on server
- autosave failed

## Draft Recovery

When a local draft exists for the same programme/course/year/term:

- recovery banner appears
- user may restore
- user may discard

Cross-course restoration is prevented by identity-keyed local storage.

## Programme Dashboard

Read-only RPC:

`hepe_fast_tqf_programme_dashboard(text,text,text)`

Current verified AY2569/T1 summary:

- curriculum courses = 92
- offered courses = 30
- TQF3 present = 1
- TQF5 present = 1
- verification present = 1
- VERIFIED = 0
- INSUFFICIENT_EVIDENCE = 1

Dashboard exposes course-by-course state without fabricating missing statuses.

## Version History / Compare

Read-only RPC:

`hepe_fast_tqf_version_history_by_code(text,text,text,text,integer)`

HED2503 current history count:

`5`

Frontend compare currently checks:

- objectives
- CLO
- weekly plan
- assessment
- resources
- improvement notes

No historical version is rewritten.

## Evidence Workspace

Read-only RPC:

`hepe_fast_tqf_evidence_workspace_by_code(text,text,text,text)`

HED2503 current evidence state:

- linked controlled evidence = 0
- evidence candidates = 1
- current candidate remains NOT_ADMITTED

Verification remains:

`INSUFFICIENT_EVIDENCE`

The workspace displays source/authority/status rather than converting candidates to accepted evidence.

## CQI Carry-forward

Read-only RPC:

`hepe_fast_tqf_cqi_context_by_code(text,text,text,text)`

HED2503 current result:

- prior TQF5 snapshots available for carry-forward = 0
- improvement items = 0

The UI therefore correctly shows that no CQI source is currently available instead of inventing one.

Where prior CQI exists in future:

- user may choose IMPLEMENT
- user may choose NOT_ADOPTED
- the decision is stored as working-document decision metadata

## Security / ACL

All new V27 read-model RPCs:

- anon execute = false
- authenticated execute = true
- service_role execute = true

Functions:

- hepe_fast_tqf_programme_dashboard
- hepe_fast_tqf_version_history_by_code
- hepe_fast_tqf_evidence_workspace_by_code
- hepe_fast_tqf_cqi_context_by_code

## Frontend files

- ./hepe-trial/index.html
- ./hepe-trial/assets/css/portal-v27.css
- ./hepe-trial/assets/js/portal-v27.js
- ./hepe-trial/config/state.json

Relative local asset paths preserved.

## Frontend regression

- JavaScript syntax parse = PASS
- required DOM IDs = PASS
- V27 CSS link = PASS
- V27 JS link = PASS
- localStorage autosave code = PRESENT
- dashboard RPC client binding = PRESENT
- evidence RPC client binding = PRESENT
- version history binding = PRESENT
- CQI context binding = PRESENT

## Runtime invariants

HED2503:

- TQF3 current working version = 5
- TQF3 working version count = 5
- TQF5 snapshot count = 1
- Verification = INSUFFICIENT_EVIDENCE

Immutable R1:

- status = PUBLIC_PUBLISHED
- SHA-256 = 799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256

R1 remains unchanged.

## Production boundary

Production:

`NOT AUTHORIZED`

No production write.

No secret change.

No immutable-release mutation.

No historical lifecycle rewrite.

No evidence admission.

No VERIFIED transition.

## Current true gate

The remaining gate is authenticated visual acceptance of v27.

Expected visible additions:

- Autosave status badge
- Local Draft recovery banner when applicable
- CQI Carry-forward block
- Version Compare block
- Evidence Workspace
- Programme Dashboard tab

Repository and database runtime are verified.

Live authenticated browser visuals are not independently observable from the current tool environment.

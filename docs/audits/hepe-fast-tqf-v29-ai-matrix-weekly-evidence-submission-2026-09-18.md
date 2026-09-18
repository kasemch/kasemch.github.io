# HEPE FAST TQF PORTAL — V29 AI / MATRIX / WEEKLY / EVIDENCE / SUBMISSION AUDIT

Date: 2026-09-18

Status: READY FOR AUTHENTICATED VISUAL ACCEPTANCE

Environment: NON-PRODUCTION

## Scope

V29 implements the next safe operational layer after V28:

1. AI severity and richer immediate feedback
2. Guarded Apply-to-Field
3. CLO–PLO Working Matrix
4. Weekly planner productivity tools
5. Weekly CLO coverage summary
6. TQF3 → TQF5 CLO synchronization
7. Read-only programme Evidence Queue
8. Source/Provenance Drawer
9. Submission Mode with Draft / NON-PRODUCTION watermark

## AI severity model

Immediate AI results now classify issues as:

- BLOCKING
- WARNING
- SUGGESTION

Each suggestion presents:

- observation/title
- severity
- why it matters
- recommended action
- editable suggestion text
- user decision actions

User decisions remain:

- ACCEPTED
- EDITED_AND_ACCEPTED
- REJECTED

## Guarded Apply-to-Field

Apply-to-Field is deliberately fail-safe.

For suggestions with a known target field:

- the Apply button is disabled by default
- the user must edit the suggestion text first
- only then may the edited user-controlled text be inserted into the target field
- the resulting decision is recorded as EDITED_AND_ACCEPTED

This prevents generic AI instructions from being silently inserted into TQF content.

## CLO–PLO Working Matrix

A working matrix is now rendered from:

- current CLO rows
- programme PLO codes

Matrix values:

- none
- I
- R
- M

The matrix is explicitly a working layer.

Canonical course→PLO mappings remain separate.

If canonical mappings do not exist, the UI states that they are unavailable.

No canonical mapping is fabricated.

The working matrix is saved in TQF3 form_sections.plo_matrix.

## Weekly Planner Productivity

New tools:

- select start week
- select end week
- enter CLO
- enter PLO
- apply only to empty cells
- apply/overwrite selected range

Weekly coverage summary displays per CLO:

- number of weeks linked
- number of linked weeks with assessment/evidence

Weekly table headers are sticky in the scrolling region.

## TQF3 → TQF5 reuse

New button:

Sync CLO จาก มคอ.3

Behavior:

- reads current TQF3 CLO rows
- creates/updates TQF5 CLO attainment rows
- preserves existing target/attainment values when CLO code already matches

A plan baseline notice summarizes:

- CLO count
- filled weekly-plan count
- assessment count
- total assessment weight

No actual results are invented.

## Evidence Queue

New read-only RPC:

hepe_fast_tqf_evidence_queue(text,text,text)

ACL:

- anon execute = false
- authenticated execute = true

Current AY2569/T1 verified queue summary:

- offered HED/PED courses = 30
- no verification record = 29
- insufficient evidence = 1
- verified = 0
- courses with evidence candidates = 2
- courses with linked controlled evidence = 0

Queue states include:

- COMPLETE
- MISSING
- CANDIDATE_ONLY
- INSUFFICIENT
- IN_REVIEW

The queue does not admit evidence and does not change verification state.

## Source Drawer

Curriculum source-derived course-description UI now supports a provenance drawer showing:

- source reference
- source locator
- verification status
- authority status

This is read-only.

## Submission Mode

A Submission Mode toggle is now present.

It:

- reduces development/debug visual noise
- retains NON-PRODUCTION context
- displays a DRAFT · NON-PRODUCTION watermark
- preserves browser print / PDF behavior

It does not imply official approval.

## Frontend

Current UI version:

V29

Files:

- ./hepe-trial/index.html
- ./hepe-trial/assets/css/portal-v29.css
- ./hepe-trial/assets/js/portal-v29.js
- ./hepe-trial/config/state.json

Local asset paths remain relative.

## Regression

JavaScript syntax:

PASS

Required DOM contract:

PASS

V29 CSS link:

PASS

V29 JS link:

PASS

CLO–PLO matrix runtime:

PRESENT

Weekly bulk runtime:

PRESENT

Weekly coverage runtime:

PRESENT

TQF5 sync runtime:

PRESENT

Evidence queue runtime:

PRESENT

Submission mode runtime:

PRESENT

AI severity runtime:

PRESENT

Guarded Apply-to-Field runtime:

PRESENT

## Runtime state

Fast TQF scope:

65 HED/PED courses

Course description coverage:

64/65

Missing:

HED3701

AY2569/T1:

- offered = 30
- TQF3 present = 1
- TQF5 present = 1
- verification present = 1
- VERIFIED = 0
- INSUFFICIENT_EVIDENCE = 1

## Immutable R1 invariant

Release:

HEPE-HED2503-TQF3-2569-1-R1

Status:

PUBLIC_PUBLISHED

SHA-256:

799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256

R1 remains unchanged.

## Production boundary

Production remains NOT AUTHORIZED.

No Production deployment authorization.

No secret change.

No evidence admission.

No VERIFIED transition.

No historical rewrite.

No R1 mutation.

## Current visual acceptance gate

Expected V29 additions after authenticated login:

- AI severity badges
- Why / Recommended action
- guarded Apply-to-Field button on targetable suggestions
- CLO–PLO Working Matrix
- weekly bulk CLO/PLO tools
- weekly CLO coverage strip
- TQF5 CLO sync button
- TQF5 plan baseline
- Source Drawer
- Programme Dashboard Evidence Queue
- Submission Mode
- DRAFT · NON-PRODUCTION watermark in submission mode

Repository/runtime checks are complete.

Live authenticated visual acceptance remains the current Human Gate.

# TQF-STATUS-SURFACE-01

Date: 2026-09-18

Status: PASS WITH VISUAL-EVIDENCE LIMITATION — HUMAN ACCEPTANCE RECORDED

Environment: NON-PRODUCTION / GitHub Pages + Supabase Sandbox

## Objective

Integrate the TQF state reconciliation model into the authenticated HEPE static status surface so users do not see a misleading single `DRAFT` label when an immutable published R1 also exists.

## Static route

`./hepe-trial/`

GitHub Pages remains static.

No backend framework was introduced.

All local asset references remain relative.

## Runtime data sources

The UI now reads both:

- `hepe_authoritative_release_registry_by_code(...)`
- `hepe_tqf3_state_reconciliation_by_code(...)`

The release-registry RPC remains the source for finalization/gate/check history.

The reconciliation RPC is the source for composed status across:

- Working TQF3
- Frozen Release
- Public Publication
- Effective State

## HED2503 displayed status model

Working:

`DRAFT`

Frozen Release:

`FINAL`

Public Publication:

`PUBLIC_PUBLISHED`

Effective State:

`PUBLIC_PUBLISHED_WITH_ACTIVE_WORKING_DRAFT`

State relation:

`PARALLEL_LIFECYCLES_EXPECTED`

Recommended Thai interpretation:

`เผยแพร่ R1 แล้ว / มีฉบับร่างที่กำลังทำงานอยู่`

## Files changed

### /hepe-trial/assets/js/app-v23.js

New static client runtime.

Reads the reconciliation RPC and release registry in parallel.

Does not write TQF3, final release, publication, verification, or programme-reporting data.

### /hepe-trial/index.html

Updated status cards:

- Working TQF3
- Frozen Release
- Public Publish
- Effective State
- B03.15 Gate
- Release Count

Added a Reconciled Document State section.

Governance language explicitly states that PUBLIC_PUBLISHED is not an institutional-official claim.

### /hepe-trial/config/state.json

Updated to the reconciled state baseline.

Includes:

- effective state model
- immutable R1 release code and SHA
- new reconciliation RPC
- authenticated read-only UI declaration
- production_changed = false

## Repository verification

Verified on `master` after commits:

- `index.html` references `./assets/js/app-v23.js`
- effective-state UI element exists
- app-v23 calls the reconciliation RPC
- app-v23 retains the release-registry RPC
- config contains `PUBLIC_PUBLISHED_WITH_ACTIVE_WORKING_DRAFT`
- config declares `read_only: true`

## Security boundary

The new reconciliation RPC:

- anon execute = false
- authenticated execute = true
- service_role execute = true
- authority-aware
- SECURITY DEFINER with locked search path

The page itself still requires a real authenticated session before the workspace is shown.

## R1 invariants

No change was made to:

- TQF3 working lifecycle: remains `DRAFT`
- final record state: remains `FINAL`
- public publication state: remains `PUBLIC_PUBLISHED`
- R1 SHA-256
- institutional official claim: remains false

R1 remains immutable.

## Production boundary

No Production deployment authorization was granted.

No Production database write was performed.

No secrets were changed.

No private evidence was exposed.

## Live verification limitation

An unauthenticated external fetch of the GitHub Pages route could not be independently completed from the current web-check environment.

The repository state on `master` was verified directly.

Human acceptance was explicitly recorded in the project conversation on 2026-09-18. A real authenticated browser/Magic Link visual-runtime capture remains unavailable from the current tool environment and is retained as a visual-evidence limitation rather than being fabricated.

## Final assessment

TQF-STATUS-SURFACE-01:

**PASS WITH VISUAL-EVIDENCE LIMITATION — HUMAN ACCEPTANCE RECORDED**

The data/state architecture is complete for this phase.

The next true human gate is authenticated visual acceptance of the rendered status surface.

No database or release-state correction should be made merely to change the displayed label.


## Human acceptance record

On 2026-09-18, the project owner explicitly approved continuation after the reconciled status-surface design and expected state model were presented.

This approval is recorded as governance acceptance of the state model and static UI change.

It is not represented as independent browser-visual evidence.

Attempts to independently retrieve the rendered GitHub Pages route from the current web/runtime environment were unsuccessful because the route was not accessible from the available fetch environment. Repository evidence and Supabase runtime state remain verified.

Accordingly:

- governance acceptance = RECORDED
- repository implementation = VERIFIED
- Supabase reconciliation runtime = VERIFIED
- live authenticated browser visual proof = NOT INDEPENDENTLY OBSERVED
- production authorization = FALSE
- R1 mutation = NONE

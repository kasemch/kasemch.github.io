# CROSS-DOCUMENT-TRACEABILITY-01 — TQF3/TQF5 and TQF4/TQF6 Verification Lineage Audit

Date: 2026-09-18

Status: PASS WITH KNOWN STATE-RECONCILIATION ISSUE AND EXECUTION-EVIDENCE GAPS

Environment: NON-PRODUCTION / Supabase Sandbox + GitHub audit repository

## Objective

Verify the two governed lifecycle chains:

1. TQF3 → course execution → TQF5 → verification → TQF7-equivalent
2. TQF4 → fieldwork execution → TQF6 → verification → TQF7-equivalent

The review checks identifiers, lineage, status transitions, source references, VERIFIED_ONLY eligibility, and fail-closed exclusion behavior.

No production change, HED2503 R1 mutation, future-result admission, or institutional-official claim was made.

## Human review gate resolved

Fresh TQF6 hardening preview:

`7e83620e-6a24-4ea2-823e-a12576298ce4`

Reviewer decision:

`APPROVE_CONTROLLED_EXPORT`

Decision record:

`545ecc78-53e0-4cd5-a059-30e3be33f81b`

Resulting preview state:

`APPROVED_FOR_CONTROLLED_EXPORT`

Authoritative export allowed:

`false`

Watermark:

`DRAFT / UNDER REVIEW`

The reviewer decision authorizes a controlled draft representation only. It does not verify or promote HED3701 execution results.

---

## Chain A — HED2503

### Course offering

Course:

`HED2503 — เพศวิถีศึกษา`

Academic period:

`AY2569 / Term 1`

Course offering ID:

`82806bab-ff9a-4041-b2b1-15fed7195981`

Offering state:

- offering_status = `OFFERED`
- source_status = `SOURCE_VERIFIED`

### TQF3 planning record

TQF3 record:

`26e00a55-f545-49cc-aec6-959ac07809eb`

TQF3 version:

`f75d28f1-9ed7-4bd3-a4a9-0d64c2cfa4b7`

Current row lifecycle:

`DRAFT`

Version source status:

`CONTROLLED_SOURCE`

This row-level lifecycle remains a known reconciliation issue and was not changed during this phase.

### Frozen public R1 release

Public release code:

`HEPE-HED2503-TQF3-2569-1-R1`

Publication ID:

`f559d3ca-d33f-4220-94fd-13fa53bf7085`

Final record ID:

`8d65fdfb-6811-4f63-82b4-a120177768a1`

Publication status:

`PUBLIC_PUBLISHED`

Publication scope:

`HEPE_PROJECT_CONTROLLED_PUBLIC_RELEASE`

Bundle SHA-256:

`799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256`

Institutional official claim:

`false`

Post-publication audit:

- audit status = `PASS_WITH_LIMITATION`
- lineage status = `CLOSED_R1_BASELINE`
- SHA match = true
- registry match = true
- manifest match = true
- public-safe scope check = true

R1 remains immutable.

### TQF5 result reporting

TQF5 record:

`dab41f2d-b4d0-42f6-8595-97ba352e9a39`

Result snapshot:

`00639440-e863-4912-8cdc-045322c47b21`

States:

- TQF5 lifecycle = `DRAFT`
- result snapshot status = `DRAFT`
- result source status = `UNVERIFIED`

The working result values are therefore not eligible for programme aggregation.

### Course verification

Verification record:

`67105933-55ce-4252-8519-94ad0ed45cf9`

Status:

`INSUFFICIENT_EVIDENCE`

The verification record points to the HED2503 result snapshot above.

No promotion to `VERIFIED`, `HUMAN_VERIFIED`, `CONTROLLED`, `SOURCE_VERIFIED`, or `CONTROLLED_SOURCE` was performed.

### TQF7-equivalent / Term 1

Programme reporting snapshot:

`ce898977-f12a-4210-a44f-69d8e1e38a4b`

Snapshot code:

`TQF7-SAFE-20260917234635119`

Aggregation policy:

`VERIFIED_ONLY`

Result:

- courses opened = 30
- verified eligible = 0
- excluded = 30

No programme outcome achievement was calculated.

### Chain A conclusion

The chain is traceable and fail-closed:

TQF3 planning
→ TQF5 draft result
→ verification = INSUFFICIENT_EVIDENCE
→ programme aggregation exclusion

The only unresolved state inconsistency is the TQF3 row lifecycle `DRAFT` versus the independently frozen/published R1 release registry state. No silent reconciliation was attempted.

---

## Chain B — HED3701

### Course offering

Course:

`HED3701 — การฝึกปฏิบัติวิชาชีพครูระหว่างเรียนวิชาเอกสุขศึกษาและพลศึกษา`

Academic period:

`AY2569 / Term 2`

Course offering ID:

`d89c1cd7-44d7-436c-84de-7d38de23d5a0`

Offering state:

- offering_status = `OFFERED`
- source_status = `VERIFIED_SOURCE_RECORD`

### TQF4 planning baseline

TQF4 record:

`3782540a-8bf6-4ba2-abb5-e7ad4fdc29c2`

TQF4 version:

`852e786e-ba7a-4b30-9234-488726da4292`

States:

- lifecycle = `DRAFT`
- version = `DRAFT`
- source status = `SOURCE_OBSERVED`

Specific supervisors, placement execution, fieldwork hours, and final approval remain unevidenced.

### TQF6 controlled draft

TQF6 record:

`0e653f8f-9b90-4a5f-9325-84e5364b37b5`

Current TQF6 version:

`21a17c0d-03bc-4106-98b9-a796a9319693`

Direct TQF4 version linkage:

`852e786e-ba7a-4b30-9234-488726da4292`

States:

- lifecycle = `DRAFT`
- version status = `DRAFT`
- source status = `SOURCE_OBSERVED`

Future-dated HED3701 results remain explicitly excluded.

### Controlled draft export

TQF6 export run:

`a3a33b8d-0c9c-4454-8d08-a8c29d271ab8`

Export state:

- export format = `DOCX`
- export status = `GENERATED_DRAFT`
- provenance = `UNVERIFIED`
- watermark = `DRAFT / UNDER REVIEW`
- authoritative_export_allowed = false

The export source manifest preserves TQF4 record/version and TQF6 record/version lineage.

### Verification bridge

During this phase a structural gap was found:

The original verification runtime accepted only `result_snapshots`, which are TQF5-bound. TQF6 could therefore not reach verification/TQF7 through a governed source reference.

A non-destructive Sandbox migration was applied:

`cross_document_traceability_01_tqf6_verification_bridge`

The migration:

- adds nullable `tqf6_version_id` to `verification_records`;
- adds an FK to `tqf6_versions`;
- enforces at most one verification source between TQF5 result snapshot and TQF6 version;
- adds `hepe_tqf6_draft_export_and_handoff(...)`;
- extends `hepe_review_course_verification(...)` to validate either TQF5 or TQF6 result sources;
- extends VERIFIED_ONLY programme aggregation to admit either result type only after strict evidence gates;
- explicitly restricts the affected SECURITY DEFINER RPCs to authenticated/service roles.

HED3701 verification record created by the governed handoff:

`cbb1e2d0-14e8-4bcc-a3d0-03cc58110610`

Verification state:

`DRAFT`

Linked TQF6 version:

`21a17c0d-03bc-4106-98b9-a796a9319693`

Result snapshot:

`null`

Finding summary explicitly states that fieldwork execution evidence remains unverified and no verification conclusion has been made.

### TQF6 VERIFIED gate

A TQF6 verification record cannot reach `VERIFIED` unless all of the following are true:

- exactly one governed verification result source exists;
- TQF6 version status = `CONTROLLED`;
- TQF6 source status is `SOURCE_VERIFIED` or `CONTROLLED_SOURCE`;
- TQF6 approval status is `EXECUTED`, `VERIFIED`, or `APPROVED`;
- reviewer authority and normal verification state transitions are satisfied.

The current HED3701 TQF6 does not meet these conditions.

### TQF7-equivalent / Term 2

A fresh VERIFIED_ONLY fail-closed snapshot was created after the verification bridge migration.

Programme reporting snapshot:

`8c088199-0c70-45d9-8ecc-5eb9171eb45c`

Snapshot code:

`TQF7-SAFE-20260918013658565`

Aggregation policy:

`VERIFIED_ONLY`

Result:

- courses opened = 25
- verified eligible = 0
- excluded = 25
- without verification record = 24
- non-VERIFIED verification status = 1
- VERIFIED status with unverified result = 0

HED3701 was therefore excluded exactly as intended.

No programme outcome achievement was calculated.

### Chain B conclusion

The runtime chain is now structurally complete and fail-closed:

TQF4 planning
→ TQF6 controlled draft
→ controlled draft export
→ verification DRAFT
→ programme aggregation exclusion

No future fieldwork result was promoted.

---

## Unified VERIFIED_ONLY rule after reconciliation

A course can enter programme reporting only when its verification record is `VERIFIED` and one of the following source paths satisfies the evidence gate.

### TQF5 source path

- result snapshot status in `HUMAN_VERIFIED`, `CONTROLLED`
- result source status in `SOURCE_VERIFIED`, `CONTROLLED_SOURCE`

### TQF6 source path

- TQF6 version status = `CONTROLLED`
- TQF6 source status in `SOURCE_VERIFIED`, `CONTROLLED_SOURCE`
- executed approval status in `EXECUTED`, `VERIFIED`, `APPROVED`

Anything else is excluded.

## Security / boundary preservation

The new TQF6 verification-handoff RPC, verification-review RPC, and VERIFIED_ONLY aggregation RPC are executable only by authenticated/service roles plus database owner.

The verification source constraint is:

`num_nonnulls(result_snapshot_id, tqf6_version_id) <= 1`

No production migration was run.

No production data were written.

No secrets or credentials were changed.

No HED2503 R1 artifact was mutated.

## Final assessment

CROSS-DOCUMENT-TRACEABILITY-01:

**PASS WITH KNOWN STATE-RECONCILIATION ISSUE AND EXECUTION-EVIDENCE GAPS**

Confirmed:

- TQF3 → TQF5 → Verification → TQF7 path is traceable and fail-closed.
- TQF4 → TQF6 → Verification → TQF7 path is now structurally traceable and fail-closed.
- Term 1 and Term 2 programme aggregation both exclude all currently ineligible results.
- Future-dated HED3701 claims remain excluded.
- Production remains unauthorized and unchanged.

## Remaining true governance issue

The HED2503 `tqf3_records.lifecycle_status = DRAFT` state does not mirror the independently frozen and publicly published R1 release state.

This must not be silently rewritten because R1 is immutable and the release registry is already closed.

Recommended next phase:

`TQF-STATE-RECONCILIATION-01`

Objective:

Define the governed relationship between working-record lifecycle and frozen-release lifecycle without mutating R1 in place.

This is a state-model reconciliation task, not a content correction.

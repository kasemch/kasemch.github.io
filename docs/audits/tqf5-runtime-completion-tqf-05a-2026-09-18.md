# TQF-05A — TQF5 Runtime Completion

Date: 2026-09-18

Status: PASS WITH CONTROLLED-DRAFT LIMITATIONS

Environment: Supabase Sandbox only

## Objective

Convert the existing TQF5 structural baseline into an operational Sandbox workflow without mutating HED2503 TQF3 R1 and without touching Production.

## Key architecture decision

A separate `tqf5_versions` table was **not** introduced.

The existing design already models TQF5 runtime content through:

- `tqf5_records` — course-level lifecycle record
- `result_snapshots` — appendable result/content snapshots
- generic document rendering / preview / decision / export infrastructure
- `verification_records` — verification handoff

This is materially different from TQF3, where `tqf3_versions` stores planning-document versions. For TQF5, the result snapshot is the natural versioned evidence unit. Duplicating it with a second version table would add unnecessary dual state.

## Existing baseline confirmed

TQF5 template:

- code: `HEPE-TQF5-GENERIC`
- current version: 2
- template status: `UNDER_REVIEW`
- version status: `UNDER_REVIEW`
- export capabilities include DOCX/XLSX/HTML/JSON/CSV/PRINT_PDF
- controlled-draft-only behavior is active
- all four required field bindings in the current renderer plan are `BOUND`

Because the template remains under review, authoritative export is not allowed.

## Runtime RPC added

Migration:

`tqf5_runtime_working_draft_rpc`

Function:

`public.hepe_create_tqf5_working_draft(uuid, jsonb, text)`

Behavior:

1. requires an authenticated mapped actor;
2. checks offering scope/authority;
3. creates or reuses the `tqf5_records` row for the offering;
4. appends an `INITIAL_RESULT` row in `result_snapshots`;
5. marks the snapshot `DRAFT` and `UNVERIFIED`;
6. preserves the source reference;
7. returns stable runtime identifiers.

Anon execution is revoked.

## HED2503 controlled-draft trial

Course offering:

HED2503 — เพศวิถีศึกษา, AY 2569 / Term 1

Source basis:

Connected Drive document `TQF5_Template_HED2503_เพศวิถีศึกษา_รายงานผลการดำเนินการ`.

The source contains course/student/result/evaluation/improvement-plan values. These values were admitted into the Sandbox trial only as **UNVERIFIED working-source data**. Their presence in the source is not treated as independent verification of teaching results or verification conclusions.

Runtime objects created:

- TQF5 record: `dab41f2d-b4d0-42f6-8595-97ba352e9a39`
- Result snapshot: `00639440-e863-4912-8cdc-045322c47b21`
- Snapshot status: `DRAFT`
- Source status: `UNVERIFIED`

## Model-build test

`hepe_build_document_model('TQF5', ...)` successfully returned:

- HED2503 course identity;
- programme and term context;
- TQF5 record;
- latest result snapshot;
- source payload;
- watermark `DRAFT`;
- provenance `UNVERIFIED`.

Result: PASS.

## Preview / renderer test

A DOCX preview was created through the existing generic renderer pipeline.

Preview session:

`d6e340cc-a986-49a9-8103-19bd38b547bb`

Initial status:

`READY_FOR_REVIEW`

Validation findings:

- no blocking binding defect;
- informational finding: template/version is not approved;
- watermark required: `DRAFT / UNDER REVIEW`;
- authoritative export allowed: `false`.

The preview was submitted and reviewed through the governed preview functions.

Final preview status:

`APPROVED_FOR_CONTROLLED_EXPORT`

This means approved for a **controlled draft export**, not an authoritative/final TQF5.

## Draft export + verification handoff RPC

Migration:

`tqf5_draft_export_verification_handoff`

Function:

`public.hepe_tqf5_draft_export_and_handoff(uuid)`

The function:

- requires current authenticated actor;
- requires TQF5 preview status `APPROVED_FOR_CONTROLLED_EXPORT`;
- checks export authority;
- resolves the latest TQF5 result snapshot;
- generates a `GENERATED_DRAFT` export-run record;
- forces non-authoritative metadata;
- creates or reuses a DRAFT verification handoff for the same result snapshot;
- never marks the source or result as verified.

Trial output:

- export run: `c53db96e-e9ed-44d9-8700-fdf7019b4a07`
- export status: `GENERATED_DRAFT`
- provenance: `UNVERIFIED`
- verification record: `67105933-55ce-4252-8519-94ad0ed45cf9`
- verification status: `DRAFT`
- authoritative export allowed: `false`

## Security / governance observations

RLS is enabled on `tqf5_records`, `result_snapshots`, and verification structures.

An attempted direct authenticated insert into the downstream export/handoff path hit an existing permission dependency on a private helper. The operational path was therefore implemented as explicit SECURITY DEFINER RPCs with internal scope checks rather than weakening table policies or granting broad private-helper execution.

No Production object was changed.

## Current readiness decision

TQF5 has advanced from structural-only readiness to an operational controlled-draft workflow:

- runtime record: PASS
- appendable result snapshot: PASS
- model build: PASS
- template/renderer integration: PASS
- preview validation: PASS
- review decision: PASS
- controlled draft export-run registration: PASS
- verification handoff: PASS
- authoritative/final TQF5: NOT YET ALLOWED
- independent result verification: NOT YET COMPLETE

### Updated TQF5 readiness

Recommended status: **83% / CONTROLLED-DRAFT OPERATIONAL**

This is not 100% because:

1. template/version remains `UNDER_REVIEW`;
2. working-source result data remains `UNVERIFIED`;
3. no independent verification conclusion has been completed;
4. no authoritative/final TQF5 export has been admitted;
5. no Production activation is authorized.

## Next phase

`VERIFICATION-RUNTIME-01`

Use the DRAFT verification record already linked to the HED2503 result snapshot and complete a real verification workflow only from traceable evidence. Do not promote source/result status merely because the working TQF5 document contains verification claims.

After a verified course-level result exists, proceed to the programme-reporting / TQF7-equivalent aggregation trial using VERIFIED_ONLY evidence.

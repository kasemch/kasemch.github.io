# TQF-06A — TQF6 Onboarding and Controlled Draft Trial

Date: 2026-09-18

Status: CONTROLLED-DRAFT OPERATIONAL — PASS WITH EXECUTION-EVIDENCE GAPS; HARDENING PREVIEW APPROVED_FOR_CONTROLLED_EXPORT

Environment: NON-PRODUCTION / Supabase Sandbox + Google Drive

## Objective

Operationalize TQF6 as the reporting counterpart to TQF4 for HED3701 while preventing future-dated or unevidenced fieldwork results from being treated as executed facts.

## Source template

Google Drive source:

`TQF6_Template_รายงานผลประสบการณ์ภาคสนาม`

Drive file ID:

`1TCoSmZb8nSV25zjoJ_ub4-1e5B_IZMlp_xv3N30JOZc`

Observed source sections:

1. หมวดที่ 1 ข้อมูลทั่วไป และสรุปจำนวนนักศึกษา
2. หมวดที่ 2 สรุปผลการประเมินนักศึกษาและเกรด
3. หมวดที่ 3 สรุปข้อเสนอแนะจากสถานศึกษา / ครูพี่เลี้ยง / สถานประกอบการ
4. หมวดที่ 4 แผนการปรับปรุงประสบการณ์ภาคสนาม (CQI Action Plan)

The source contains placeholders for course identity, counts, supervisors, grade distribution, approval, and report-specific results.

## Future-dated HED3701 working example

A combined HED3701 TQF4/TQF6 DOCX was located:

`รายละเอียดและรายงานผลประสบการณ์ภาคสนาม (มคอ.4 และ มคอ.6) วิชา HED 3701.docx`

Drive file ID:

`1VKu2ZBoidcFwx-h0xMNkVfzh4HDki3Nv`

It includes claimed TQF6 results and a claimed report date of 25 March 2570.

Because the current review date is 18 September 2569, those result claims are future-dated and were **not admitted as executed evidence**.

The following claims from that future working file were intentionally excluded from canonical TQF6 result fields:

- 45 students / 100% pass;
- grade distribution;
- GPA 3.54;
- CLO attainment percentages;
- satisfaction 4.82 / 5.00 and 4.88 / 5.00;
- 90 executed hours;
- executed placement/supervision outcomes;
- final CQI results;
- signatures dated 25 March 2570.

## Provenance decision

Template classification:

`HEPE_PROJECT_CONTROLLED / SOURCE_OBSERVED / UNDER_REVIEW`

Institutional official claim:

`false`

The template is a project-controlled source capture, not an official-university claim.

## Runtime architecture

TQF6 now uses:

- `tqf6_records`
- `tqf6_versions`
- `hepe_create_tqf6_working_draft(...)`
- `hepe_build_tqf6_document_model(...)`
- TQF6 support in `hepe_document_render_bundle(...)`

TQF6 records preserve linkage to:

- a TQF4 record;
- the specific TQF4 version used as the planning baseline.

## Traceability

HED3701 TQF6 is linked to:

TQF4 record:

`3782540a-8bf6-4ba2-abb5-e7ad4fdc29c2`

TQF4 version:

`852e786e-ba7a-4b30-9234-488726da4292`

This establishes:

TQF4 planning baseline → TQF6 reporting shell

without claiming that fieldwork execution has occurred.

## Controlled trial course

Course:

- HED3701
- การฝึกปฏิบัติวิชาชีพครูระหว่างเรียนวิชาเอกสุขศึกษาและพลศึกษา
- AY2569 / Term 2
- offering ID: `d89c1cd7-44d7-436c-84de-7d38de23d5a0`

## TQF6 runtime record

TQF6 record:

`0e653f8f-9b90-4a5f-9325-84e5364b37b5`

Lifecycle:

`DRAFT`

Current version:

2

Current TQF6 version:

`21a17c0d-03bc-4106-98b9-a796a9319693`

Version status:

`DRAFT`

Source status:

`SOURCE_OBSERVED`

## Controlled content state

The current TQF6 draft intentionally contains:

- student_count = null
- passed_count = null
- supervisors = []
- executed_hours = null
- report_date = null
- grade_distribution = {}
- clo_results = []
- feedback status = NOT_EXECUTED
- CQI items = []
- approval status = NOT_EXECUTED

The source-control block explicitly records that the future-dated working example was not admitted.

## Template registry

Active template:

`HEPE-TQF6-GENERIC`

Template ID:

`4bc4034b-d857-4c2c-b5af-8a0eee0ef0b6`

Version ID:

`39cf8a4f-c7ba-44ec-89a2-13408bb6ff66`

Template/version status:

`UNDER_REVIEW`

Required bindings:

16 / 16 BOUND

Bindings include:

- COURSE_IDENTITY
- ACADEMIC_TERM
- STUDENT_COUNTS
- SUPERVISORS
- GRADE_DISTRIBUTION
- FIELDWORK_FEEDBACK
- CQI_PLAN
- TQF4_LINEAGE

## Duplicate-template reconciliation

During onboarding, two project-controlled TQF6 template rows were detected.

The older incomplete duplicate was retired:

- template: `60276379-9414-4800-8255-d38a57d5e7f9`
- version: `cd029284-bb72-485d-9225-0b5d1fecc930`

The active template is the source-bound/project-approved row listed above.

The renderer was hardened to exclude RETIRED templates and RETIRED versions.

## Renderer profiles

The active template has controlled profiles for:

- DOCX
- HTML
- PRINT_PDF

Current binding status:

`UNDER_REVIEW`

Authoritative rendering remains disabled.

## Preview trial

Preview session:

`77911ea0-fbc2-4dba-b15a-a260a6763077`

Target:

DOCX

Initial state:

`READY_FOR_REVIEW`

Blocking findings:

0

Warnings:

- student participation count not evidenced;
- grade distribution not evidenced;
- fieldwork feedback not evidenced as executed.

Informational finding:

- template/version remains UNDER_REVIEW.

## Review decision

Decision:

`APPROVE_CONTROLLED_EXPORT`

Final preview status:

`APPROVED_FOR_CONTROLLED_EXPORT`

Authoritative export allowed:

`false`

Required watermark:

`DRAFT / UNDER REVIEW`

The approval authorizes only a controlled draft representation.

It does not authorize or verify:

- student counts;
- grades;
- CLO attainment;
- executed fieldwork hours;
- supervisor/placement execution;
- feedback;
- CQI results;
- final approval;
- institutional authority.

## Gate decision

TQF-06A:

**PASS WITH EXECUTION-EVIDENCE GAPS**

TQF6 is no longer template-only.

It is now:

**CONTROLLED-DRAFT OPERATIONAL**

## Remaining gaps

Before TQF6 can become result-bearing/controlled:

- actual student roster / participation count;
- actual placement records;
- actual supervisor assignments;
- actual executed hours;
- actual assessment records;
- grade distribution;
- CLO attainment evidence;
- feedback/evaluation evidence;
- approved CQI decision;
- executed approval/sign-off;
- post-execution verification.

Production remains unchanged.


## Evidence-gap coverage hardening — 18 September 2026

A non-destructive Sandbox migration was applied:

`tqf06a_evidence_gap_coverage_hardening`

The active TQF6 template now has **16 / 16 BOUND** field bindings and **0 non-bound** fields.

Additional explicit bindings added during hardening:

- TQF4_REFERENCE
- FIELDWORK_STUDENT_COUNT
- PASSED_STUDENT_COUNT
- PLACEMENT_SUMMARY
- FIELDWORK_HOURS
- CLO_ATTAINMENT
- FIELDWORK_PROBLEMS
- APPROVAL

All factual execution fields above retain `synthetic_data_forbidden = true`.

The TQF6 document model was hardened to preserve explicit warnings when executed evidence is absent for student counts, passed counts, grade distribution, CLO attainment, feedback, placements, supervisors, executed hours, problems/variances, approval, and the future-dated working report claim.

The generic document export-readiness function was also reconciled to recognize TQF4/TQF6 planning/result-reporting semantics without enabling authoritative export.

A follow-up Sandbox hardening migration was applied:

`tqf06a_export_readiness_search_path_hardening`

This locks the function search path to `pg_catalog, public`.

## Fresh hardening preview

Preview session:

`7e83620e-6a24-4ea2-823e-a12576298ce4`

Target:

`DOCX`

Current state:

`READY_FOR_REVIEW`

Validation state:

- blocking findings: 0
- warnings: 11
- informational findings: 1
- required watermark: `DRAFT / UNDER REVIEW`
- authoritative_export_allowed: `false`

Warnings preserved by the fresh preview:

- fieldwork student count not evidenced;
- passed student count not evidenced;
- grade distribution not evidenced;
- CLO attainment not evidenced;
- feedback not evidenced as executed;
- placement execution not evidenced;
- supervisor execution not evidenced;
- executed fieldwork hours not evidenced;
- fieldwork problems/variance evidence not executed;
- TQF6 approval not executed;
- future-dated working report claim dated 25 March 2570 is excluded from executed evidence.

The prior controlled-draft preview

`77911ea0-fbc2-4dba-b15a-a260a6763077`

remains the previously reviewed `APPROVED_FOR_CONTROLLED_EXPORT` baseline with `authoritative_export_allowed = false`.

The fresh hardening preview has **not** been force-approved. Its reviewer decision is a true Human Decision Gate and must go through the governed review action. No direct status update, fabricated reviewer decision, future-result promotion, production change, or R1 mutation was performed.

## TQF-06A closure state after hardening

TQF6 remains:

**CONTROLLED-DRAFT OPERATIONAL**

The controlled runtime, TQF4→TQF6 lineage, template registry, renderer bundle, fail-closed preview, and future-data exclusion policy are operational.

The current HED3701 result-bearing state remains deliberately non-final:

- TQF6 lifecycle: `DRAFT`
- current version: `DRAFT`
- source status: `SOURCE_OBSERVED`
- executed fieldwork results: not admitted
- authoritative export: disabled
- production: unchanged

Next governed action:

Reviewer decision on preview `7e83620e-6a24-4ea2-823e-a12576298ce4`.

After that gate is resolved, proceed to `CROSS-DOCUMENT-TRACEABILITY-01`.


## Post-review handoff and cross-document bridge

The fresh hardening preview:

`7e83620e-6a24-4ea2-823e-a12576298ce4`

was reviewed through the governed preview workflow and received:

`APPROVE_CONTROLLED_EXPORT`

Decision record:

`545ecc78-53e0-4cd5-a059-30e3be33f81b`

The approval remains limited to controlled-draft export:

- authoritative_export_allowed = false
- watermark = `DRAFT / UNDER REVIEW`
- future HED3701 result claims remain excluded
- no fieldwork result was verified or promoted

A governed TQF6 controlled-draft export/handoff was then created.

Export run:

`a3a33b8d-0c9c-4454-8d08-a8c29d271ab8`

Verification record:

`cbb1e2d0-14e8-4bcc-a3d0-03cc58110610`

Verification status:

`DRAFT`

The verification record points to TQF6 version:

`21a17c0d-03bc-4106-98b9-a796a9319693`

No verification conclusion has been made.

Cross-document traceability identified and closed a structural verification gap via Sandbox migration:

`cross_document_traceability_01_tqf6_verification_bridge`

The migration creates a governed TQF6→Verification path and extends VERIFIED_ONLY aggregation without weakening fail-closed rules.

A fresh Term 2 VERIFIED_ONLY programme snapshot was created:

`8c088199-0c70-45d9-8ecc-5eb9171eb45c`

Snapshot code:

`TQF7-SAFE-20260918013658565`

Result:

- 25 opened courses
- 0 verified eligible
- 25 excluded

This confirms that the current HED3701 TQF6 draft is excluded from programme aggregation.

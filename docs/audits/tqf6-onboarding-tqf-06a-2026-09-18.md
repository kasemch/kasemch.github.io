# TQF-06A — TQF6 Onboarding and Controlled Draft Trial

Date: 2026-09-18

Status: PASS WITH EXECUTED-EVIDENCE GAPS

Environment: NON-PRODUCTION / Supabase Sandbox + connected Google Drive

## Objective

Operationalize TQF6 as the reporting counterpart to TQF4 while preserving strict separation between planned/working material and executed fieldwork-result evidence.

## Source template

Google Drive source:

`TQF6_Template_รายงานผลประสบการณ์ภาคสนาม`

Drive file ID:

`1TCoSmZb8nSV25zjoJ_ub4-1e5B_IZMlp_xv3N30JOZc`

Observed source structure:

1. หมวดที่ 1 ข้อมูลทั่วไป และสรุปจำนวนนักศึกษา
2. หมวดที่ 2 สรุปผลการประเมินนักศึกษาและเกรด
3. หมวดที่ 3 สรุปข้อเสนอแนะจากสถานศึกษา / ครูพี่เลี้ยง / สถานประกอบการ
4. หมวดที่ 4 แผนการปรับปรุงประสบการณ์ภาคสนาม

The source contains placeholders for course identity, student counts, grade distribution and approval.

## HED3701 future-dated candidate

A separate Drive file was located:

`รายละเอียดและรายงานผลประสบการณ์ภาคสนาม (มคอ.4 และ มคอ.6) วิชา HED 3701.docx`

Drive file ID:

`1VKu2ZBoidcFwx-h0xMNkVfzh4HDki3Nv`

It claims, among other things:

- HED3701 AY2569/2 results;
- 45 students;
- grade distribution;
- CLO attainment;
- satisfaction/evaluation results;
- report/signature date 25 March 2570.

At the review date 18 September 2569, that claimed report/signature date is in the future.

Classification:

`FUTURE-DATED WORKING CANDIDATE / NOT ADMITTED AS EXECUTED EVIDENCE`

No student count, grade, CLO, satisfaction, deviation, approval or signed conclusion from that file was promoted into the TQF6 controlled runtime.

## Runtime architecture added

New tables:

- `tqf6_records`
- `tqf6_versions`

Traceability:

`tqf6_records.tqf4_record_id` references the controlling TQF4 planning record.

RLS:

- scoped authenticated SELECT;
- scoped authenticated write;
- A4 programme authority / assigned-offering checks;
- no anon write path.

New functions:

- `hepe_create_tqf6_working_draft(...)`
- `hepe_build_tqf6_document_model(...)`

Generic document renderer was extended to support `TQF6`.

Document-preview constraints were extended to admit TQF6 course-level preview sessions.

## Template registry

Template:

`HEPE-TQF6-GENERIC`

Template ID:

`60276379-9414-4800-8255-d38a57d5e7f9`

Version ID:

`cd029284-bb72-485d-9225-0b5d1fecc930`

Version:

1

Template status:

`UNDER_REVIEW`

Version status:

`UNDER_REVIEW`

Required bindings:

7 / 7 BOUND

Bound fields include:

- COURSE_IDENTITY
- ACADEMIC_TERM
- TQF4_LINEAGE
- STUDENT_COUNTS
- GRADE_DISTRIBUTION
- FIELDWORK_FEEDBACK
- FIELDWORK_CQI

Student counts, grades, feedback and lineage are synthetic-data-protected as appropriate.

Renderer profiles were added for:

- DOCX
- HTML
- PRINT_PDF

## Controlled trial course

Course:

- HED3701
- การฝึกปฏิบัติวิชาชีพครูระหว่างเรียนวิชาเอกสุขศึกษาและพลศึกษา
- Teaching Practicum in Health and Physical Education
- AY2569 / Term 2

Course offering:

`d89c1cd7-44d7-436c-84de-7d38de23d5a0`

## TQF4 linkage

TQF4 record:

`3782540a-8bf6-4ba2-abb5-e7ad4fdc29c2`

TQF4 version:

`852e786e-ba7a-4b30-9234-488726da4292`

The TQF6 runtime preserves this planning lineage.

## TQF6 runtime record

TQF6 record:

`0e653f8f-9b90-4a5f-9325-84e5364b37b5`

TQF6 version:

`76f0df57-862b-42eb-8f42-7268bfbf954b`

Lifecycle:

`DRAFT`

Version status:

`DRAFT`

Source status:

`SOURCE_OBSERVED`

## Intentionally unpopulated result fields

The controlled runtime keeps the following unverified:

- student_count
- passed_count
- grade_distribution
- CLO attainment
- deviations from plan
- student satisfaction
- mentor feedback
- placement feedback
- supervisor feedback
- approval identity
- approval date

The future-dated HED3701 report candidate is referenced only as `NOT_ADMITTED_AS_EXECUTED_EVIDENCE`.

## Preview trial

Preview session:

`3fb4905a-492d-471a-8e9f-8e93b6b3141c`

Target:

DOCX

Initial status:

`READY_FOR_REVIEW`

Blocking findings:

0

Warnings:

- fieldwork student result count not evidenced;
- grade distribution not evidenced;
- fieldwork evaluation results not evidenced;
- TQF6 approval not executed.

Info:

- template/version remains UNDER_REVIEW.

## Review decision

Decision:

`APPROVE_CONTROLLED_EXPORT`

Final preview status:

`APPROVED_FOR_CONTROLLED_EXPORT`

Authoritative export:

`false`

Watermark:

`DRAFT / UNDER REVIEW`

This decision authorizes only controlled draft rendering. It does not admit the future-dated result claims or assert completed fieldwork outcomes.

## Gate assessment

TQF6 now has operational coverage for:

- source/template baseline;
- dedicated runtime tables;
- versioned draft runtime;
- TQF4 lineage;
- scoped RLS;
- template registry;
- field bindings;
- renderer profiles;
- document model;
- controlled preview/review path;
- one real course-offering trial.

Remaining major gaps:

- executed fieldwork results;
- authoritative student counts;
- actual grade distribution;
- actual CLO attainment;
- executed evaluation/feedback evidence;
- signed/approved TQF6;
- downstream course verification/aggregation from fieldwork results.

## Decision

TQF-06A:

**PASS WITH EXECUTED-EVIDENCE GAPS**

TQF6 is no longer template-only.

It is now:

**CONTROLLED-DRAFT OPERATIONAL**

Production remains unchanged.

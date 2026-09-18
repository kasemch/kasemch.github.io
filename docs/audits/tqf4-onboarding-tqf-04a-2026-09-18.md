# TQF-04A — TQF4 Onboarding and Controlled Draft Trial

Date: 2026-09-18

Status: PASS WITH COURSE-SPECIFIC EVIDENCE GAPS

Environment: NON-PRODUCTION / Supabase Sandbox + Google Drive

## Objective

Operationalize TQF4 for one real course offering without treating generic template content as verified course-specific facts.

## Source template

Google Drive source:

`TQF4_Template_การฝึกประสบการณ์วิชาชีพ`

Drive file ID:

`1PdDuowQvZ3fGRJdckJB9NA2O0QM3aRxKKb1392cEOSc`

Observed source structure:

1. หมวดที่ 1 ข้อมูลทั่วไป
2. หมวดที่ 2 จุดมุ่งหมายและวัตถุประสงค์
3. หมวดที่ 3 การพัฒนาผลการเรียนรู้และการจัดกิจกรรมประสบการณ์ภาคสนาม
4. หมวดที่ 4 การประเมินผลนักศึกษา

The document contains placeholders for course identity, supervisors, placement, and approval.

It also contains generic Fieldwork CLOs, generic fieldwork activities, a 360–450 hour observation, and a 40/40/20 assessment pattern.

## Provenance decision

Classification:

`HEPE_PROJECT_CONTROLLED / SOURCE_OBSERVED / UNDER_REVIEW`

Not classified as:

- official university template;
- executed institutional approval;
- verified HED3701 specification.

The template itself states that it was produced through Smart QMS and contains unresolved placeholders. Therefore it is treated as a project-controlled design/source observation only.

## Existing runtime architecture confirmed

The Sandbox already contains:

- `tqf4_records`
- `tqf4_versions`
- `hepe_create_tqf4_working_draft(...)`
- `hepe_build_tqf4_document_model(...)`
- TQF4 support in `hepe_document_render_bundle(...)`

Therefore no duplicate runtime table was created in this batch.

## Controlled trial course

Course:

- HED3701
- การฝึกปฏิบัติวิชาชีพครูระหว่างเรียนวิชาเอกสุขศึกษาและพลศึกษา
- Teaching Practicum in Health and Physical Education
- 1 credit

Offering:

- Course offering ID: `d89c1cd7-44d7-436c-84de-7d38de23d5a0`
- AY2569 / Term 2
- Source: MR30-RU-2569-T2-20260904
- Offering status: OFFERED
- Source status: VERIFIED_SOURCE_RECORD

Course master status remains `DRAFT`; this trial does not elevate the course master record.

## TQF4 runtime record

TQF4 record:

`3782540a-8bf6-4ba2-abb5-e7ad4fdc29c2`

Lifecycle:

`DRAFT`

Current version:

1

TQF4 version:

`852e786e-ba7a-4b30-9234-488726da4292`

Version status:

`DRAFT`

Source status:

`SOURCE_OBSERVED`

## Course-specific evidence controls

The runtime draft intentionally does NOT populate:

- supervisor identities;
- placement site;
- fieldwork hours;
- programme-chair approval;
- approval date.

The generic template's 360–450 hour range is preserved only as a source observation and is not automatically applied to HED3701.

Generic template CLOs and the 40/40/20 assessment pattern remain course-specific applicability pending.

## Template registry

Template:

`HEPE-TQF4-GENERIC`

Template ID:

`01961027-6ff0-480a-b9d0-ba7351f52be9`

Version:

1

Template status:

`UNDER_REVIEW`

Version status:

`UNDER_REVIEW`

Required field bindings:

7 / 7 BOUND

Fields include:

- COURSE_IDENTITY
- FIELDWORK_CLOS
- FIELDWORK_ACTIVITIES
- FIELDWORK_ASSESSMENT
- ACADEMIC_TERM
- SUPERVISORS
- PLACEMENT

Supervisor and placement fields are marked synthetic-data-forbidden.

## Preview trial

Preview session:

`0a0f7b31-f176-4d7d-ae1c-c16c79b6a060`

Target format:

DOCX

Initial validation:

`READY_FOR_REVIEW`

Blocking findings:

0

Warnings:

- supervisor identities are not yet evidenced;
- field placement is not yet evidenced.

Informational finding:

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

The decision authorizes only a controlled draft representation. It does not verify or approve supervisors, placement, hours, CLO applicability, assessment applicability, or institutional template authority.

## Gate assessment

TQF4 now has operational coverage for:

- source/template baseline;
- canonical runtime tables;
- versioned draft runtime;
- template registry;
- field bindings;
- document model;
- renderer;
- controlled preview/review path;
- one real course-offering trial.

Remaining major gaps:

- evidence-backed supervisor assignment;
- placement-site evidence;
- course-specific practicum hours;
- course-specific CLO confirmation;
- course-specific assessment confirmation;
- executed approval;
- downstream fieldwork execution / TQF6 linkage.

## Decision

TQF-04A:

**PASS WITH COURSE-SPECIFIC EVIDENCE GAPS**

TQF4 is no longer template-only.

It is now:

**CONTROLLED-DRAFT OPERATIONAL**

Production remains unchanged.

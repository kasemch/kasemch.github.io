# TQF-04A — TQF4 Onboarding and Controlled Draft Trial

Date: 2026-09-18

Status: PASS / CONTROLLED-DRAFT OPERATIONAL

Environment: NON-PRODUCTION / Supabase Sandbox + connected Google Drive

## Source reviewed

Google Drive source:

- `TQF4_Template_การฝึกประสบการณ์วิชาชีพ`
- Google Doc ID: `1PdDuowQvZ3fGRJdckJB9NA2O0QM3aRxKKb1392cEOSc`

The source is a generic field-experience template. It contains placeholders for course, persons, placement, and approval date.

Observed source structure:

1. General information
2. Fieldwork aims / CLOs
3. Fieldwork learning activities
4. Student assessment
5. Digital approval placeholder

Observed generic source statements include a 360–450 hour fieldwork range and an assessment weighting of 40% mentor/supervisor, 40% departmental supervisor, and 20% portfolio/report.

These source-observed values are **not automatically treated as course-specific facts**.

## Provenance decision

Template scope:

`HEPE_PROJECT_CONTROLLED`

Institutional official claim:

`false`

Template status:

`UNDER_REVIEW`

Source authority:

`SOURCE_OBSERVED`

The source binding SHA-256 is over a normalized text capture, not an official binary-file fingerprint.

## Runtime architecture implemented

New tables:

- `public.tqf4_records`
- `public.tqf4_versions`

The TQF4 planning document uses an explicit version model because it is a pre-execution course/fieldwork specification, similar in governance needs to TQF3.

RLS is enabled.

Scoped policies allow:

- assigned course actors; or
- appropriately authorized programme reviewers/chairs.

No production schema was changed.

## Template registry

Template code:

`HEPE-TQF4-GENERIC`

Document type:

`TQF4`

Version:

1

Version status:

`UNDER_REVIEW`

Required bindings:

- course identity
- academic term
- supervisors
- placement
- fieldwork CLOs
- fieldwork activities
- fieldwork assessment

All required bindings are structurally `BOUND`.

Synthetic data is forbidden for:

- course identity
- academic term
- supervisors
- placement

## Renderer support

Added TQF4 support to:

- template registry document type constraints
- generic render bundle
- document preview constraints

Renderer profiles created for:

- DOCX
- HTML
- PRINT_PDF

Authoritative rendering remains disabled while the template is under review.

## Controlled trial course

Course:

`HED3701 — การฝึกปฏิบัติวิชาชีพครูระหว่างเรียนวิชาเอกสุขศึกษาและพลศึกษา`

Offering:

`d89c1cd7-44d7-436c-84de-7d38de23d5a0`

Term:

AY2569 / Term 2

Course-offering source:

`MR30-RU-2569-T2-20260904`

TQF4 record:

`3782540a-8bf6-4ba2-abb5-e7ad4fdc29c2`

TQF4 version:

`852e786e-ba7a-4b30-9234-488726da4292`

State:

- lifecycle = `DRAFT`
- version = `DRAFT`
- source = `SOURCE_OBSERVED`

## Course-specific safeguards

The generic source template's 360–450 hour range was **not applied** to HED3701.

Reason:

HED3701 is a 1-credit practicum course in the canonical course register, and no course-specific evidence was located in this batch that establishes that the generic range applies.

The controlled draft therefore leaves:

- supervisors = empty
- placement = null
- course-specific fieldwork hours = null
- approval actor/date = null
- assessment-weight applicability = unverified for HED3701

This prevents placeholder or generic template content from becoming fabricated course facts.

## Preview trial

Preview session:

`67592370-2cd8-4933-8e2e-a6f0a5957863`

Target:

DOCX

Initial validation:

`READY_FOR_REVIEW`

Blocking findings:

0

Warnings:

- supervisor identities are not yet evidenced
- field placement is not yet evidenced

Informational finding:

- template/version remains under review

Review decision:

`APPROVE_CONTROLLED_EXPORT`

Final preview status:

`APPROVED_FOR_CONTROLLED_EXPORT`

Authoritative export allowed:

`false`

Required watermark:

`DRAFT / UNDER REVIEW`

The approval authorizes only a controlled draft review output.

It does not assert:

- institutional approval
- official-template status
- actual field placement
- actual supervisor assignment
- final course-specific fieldwork hours
- final assessment weighting
- final TQF4 approval

## Readiness decision

Using the same six-gate architecture-readiness rubric used in the system completion review:

1. source/template baseline — PASS
2. canonical database model — PASS
3. runtime/version model — PASS
4. renderer/approval/export path — PASS for controlled draft
5. verification/field-experience evidence linkage — NOT COMPLETE
6. controlled end-to-end trial — PASS

Indicative TQF4 readiness:

**83% — CONTROLLED-DRAFT OPERATIONAL**

This is not institutional or production readiness.

## Remaining TQF4 gaps

Before authoritative TQF4 use, obtain course-specific evidence for:

- actual responsible lecturer / supervisors
- actual placement school / agency
- applicable practicum hours
- course-specific CLO validation
- applicable assessment components/weights
- actual programme approval
- any required professional/teacher-practicum governance evidence

## Gate decision

TQF-04A:

**PASS / CONTROLLED-DRAFT OPERATIONAL**

Production:

UNCHANGED

Institutional official claim:

FALSE

## Next recommended phase

`TQF-06A — TQF6 ONBOARDING`

Reason:

TQF4 runtime architecture is now operational at controlled-draft level. Its remaining blockers are course-specific evidence, not basic system architecture. TQF6 remains the largest comparable structural gap.

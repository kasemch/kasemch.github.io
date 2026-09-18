# TQF4 / TQF6 SAMPLE-STRUCTURE GAP REVIEW — 2026-09-18

Status: PASS — STRUCTURAL REFERENCE ONLY / NO COURSE DATA ADMITTED

Environment: NON-PRODUCTION

## Source classification

Source file:

`รายละเอียดและรายงานผลประสบการณ์ภาคสนาม (มคอ.4 และ มคอ.6) วิชา HED 3701.docx`

SHA-256:

`787c2a2594480be7004d16243962880cd9f10385944015916f6c58e1e215b726`

User clarification:

The file is a **sample form and writing example only**, not actual HED3701 course content.

Permitted use:

- form structure
- section labels
- writing pattern
- layout/rendering reference

Forbidden use:

- course facts
- student/result facts
- hours/weights
- names
- placements
- dates
- signatures
- CLO/PLO values
- grades
- satisfaction
- CQI outcomes

## Source bindings

The sample has been linked to the active UNDER_REVIEW template versions as:

- source_kind = OTHER
- source_authority_status = SOURCE_OBSERVED
- source_scope = STRUCTURE_LAYOUT_ONLY

TQF4 binding:

`9fb4df62-a621-472e-b98e-09acede5c54b`

TQF6 binding:

`b9174a17-f70a-4393-91a2-e69752cbaf05`

These bindings create no course authority and no institutional authority.

---

# TQF4 structural comparison

## Sample structure

The sample uses six main TQF4 sections:

1. ข้อมูลทั่วไป
2. จุดมุ่งหมายและวัตถุประสงค์
3. การพัฒนาผลการเรียนรู้และการจัดกิจกรรมประสบการณ์ภาคสนาม
4. การวางแผนและการเตรียมการ
5. การประเมินผลนักศึกษา
6. การประเมินและปรับปรุงประสบการณ์ภาคสนาม

## Current HEPE-TQF4-GENERIC structure

1. ข้อมูลทั่วไป
2. จุดมุ่งหมายและวัตถุประสงค์
3. การพัฒนาผลการเรียนรู้และการจัดกิจกรรมประสบการณ์ภาคสนาม
4. การประเมินผลนักศึกษา
5. คำเตือน/ข้อจำกัด

## Structural gaps

### Gap TQF4-G01 — Planning and Preparation

Missing as an explicit section:

`การวางแผนและการเตรียมการ`

Possible generic fields:

- placement-selection principles
- cooperating-teacher qualification criteria
- university-supervisor roles
- student preparation requirements

All fields must remain empty/unknown unless supported by actual programme/course evidence.

### Gap TQF4-G02 — Fieldwork Evaluation and Improvement

Missing as an explicit section:

`การประเมินและปรับปรุงประสบการณ์ภาคสนาม`

Possible generic fields:

- student feedback process
- cooperating-teacher feedback process
- supervisor summary process
- CQI input/process

Do not copy sample outcomes or claims.

### Gap TQF4-G03 — General metadata granularity

Current generic fields cover course identity, term, supervisors, and placement.

The sample demonstrates possible additional structural placeholders for:

- credit / hour pattern
- curriculum / course category
- prerequisites
- prepared/revised date

These should be considered structural placeholders only.

Their values must come from authoritative course/curriculum sources.

## TQF4 recommendation

Proposed future version:

`HEPE-TQF4-GENERIC v2 — STRUCTURAL DRAFT`

Do not create or approve automatically.

Recommended target sections:

1. General
2. Objectives / Fieldwork CLOs
3. Learning Development & Activities
4. Planning & Preparation
5. Assessment
6. Evaluation & Improvement
7. Warnings / Evidence Gaps

Status should remain:

`UNDER_REVIEW`

until separately reviewed.

---

# TQF6 structural comparison

## Sample structure

The sample uses six main TQF6 sections:

1. ข้อมูลทั่วไป และสรุปจำนวนนักศึกษา
2. การดำเนินการที่ต่างจากแผนการฝึกประสบการณ์
3. สรุปผลการประเมินนักศึกษาและระดับคะแนน
4. ปัญหาและผลกระทบต่อการดำเนินงาน
5. การประเมินประสบการณ์ภาคสนาม
6. แผนการปรับปรุงประสบการณ์ภาคสนาม

It also ends with a signature/approval area.

## Current active HEPE-TQF6-GENERIC structure

1. ข้อมูลทั่วไป และสรุปจำนวนนักศึกษา
2. สรุปผลการประเมินนักศึกษาและเกรด
3. สรุปข้อเสนอแนะจากสถานศึกษา / ครูพี่เลี้ยง / สถานประกอบการ
4. แผนการปรับปรุงประสบการณ์ภาคสนาม
5. คำเตือน/ข้อจำกัด

Current field bindings already include:

- student counts
- supervisor identities
- placement summary
- executed hours
- TQF4 lineage
- grade distribution
- CLO attainment
- feedback
- problems
- CQI
- approval

## Structural gaps

### Gap TQF6-G01 — Variance from TQF4 Plan

A distinct section is missing for:

`การดำเนินการที่ต่างจากแผนการฝึกประสบการณ์`

Recommended fields:

- time/schedule variance
- placement variance
- activity variance
- reason
- impact
- approved/accepted corrective action

Values must be execution evidence, never sample text.

### Gap TQF6-G02 — Problems and Impact

The field `FIELDWORK_PROBLEMS` already exists but is grouped under FEEDBACK.

Recommendation:

promote it to a distinct structural section:

`ปัญหาและผลกระทบต่อการดำเนินงาน`

without changing the evidence gate.

### Gap TQF6-G03 — Multi-source Fieldwork Evaluation

Current generic feedback is broad.

The sample demonstrates structural value in separating:

- student evaluation
- cooperating-teacher / placement evaluation
- university-supervisor evaluation

Recommended as separate subfields or subsections.

All actual values remain evidence-gated.

### Gap TQF6-G04 — Explicit Approval / Signature Section

The active template already has a bound `APPROVAL` field.

However, the section list does not expose approval/signature as a dedicated section.

Recommendation:

add an explicit:

`APPROVAL / SIGN-OFF`

section in a future structural version.

Synthetic values must remain forbidden.

## TQF6 recommendation

Proposed future version:

`HEPE-TQF6-GENERIC v2 — STRUCTURAL DRAFT`

Recommended target sections:

1. General / Student Counts / TQF4 Lineage
2. Variance from TQF4 Plan
3. Student Results / Grades / CLO Attainment
4. Problems and Impact
5. Fieldwork Evaluation
6. CQI Action Plan
7. Approval / Sign-off
8. Warnings / Evidence Gaps

Status should remain:

`UNDER_REVIEW`

until separately reviewed.

---

# Governance safeguards

The sample must never populate operational data.

The following are explicitly prohibited from being copied from the sample:

- hours
- assessment percentages
- course-specific CLO/PLO mappings
- responsible-person names
- school/placement names
- student counts
- grades
- CLO attainment
- satisfaction results
- CQI results
- dates
- signatures

Only structural concepts and writing/layout patterns may be reused.

---

# Current decision

No active template version was changed.

TQF4 remains:

`HEPE-TQF4-GENERIC v1 / UNDER_REVIEW`

TQF6 remains:

`HEPE-TQF6-GENERIC v1 / UNDER_REVIEW`

The review identifies a safe basis for future structural v2 drafts without admitting sample content as factual evidence.

Next true governance gate:

Approve or decline creation of **structural-only v2 draft templates**.

Creation of structural drafts does not itself approve the templates or establish institutional authority.

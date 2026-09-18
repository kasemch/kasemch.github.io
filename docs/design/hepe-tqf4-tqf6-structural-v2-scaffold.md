# HEPE TQF4 / TQF6 — STRUCTURAL V2 SCAFFOLD

Date: 2026-09-18

Environment: NON-PRODUCTION

Status: UNDER_REVIEW / STRUCTURE ONLY

## Source rule

The structural scaffold may reuse only:

- section organization
- field categories
- layout concepts
- writing-pattern concepts

Source sample:

`รายละเอียดและรายงานผลประสบการณ์ภาคสนาม (มคอ.4 และ มคอ.6) วิชา HED 3701.docx`

SHA-256:

`787c2a2594480be7004d16243962880cd9f10385944015916f6c58e1e215b726`

Classification:

`REFERENCE_SAMPLE_ONLY`

Source scope:

`STRUCTURE_LAYOUT_ONLY`

Forbidden:

- sample hours
- sample CLO/PLO values
- sample assessment weights
- sample names
- sample placements
- sample student counts
- sample grades
- sample attainment
- sample satisfaction values
- sample CQI outcomes
- sample dates
- sample signatures

## TQF4 v2 structural draft

Registry:

`HEPE-TQF4-GENERIC`

Version:

`2`

Status:

`UNDER_REVIEW`

Current registry version remains:

`1`

Sections:

1. General Information
2. Objectives / Fieldwork CLOs
3. Learning Development & Fieldwork Activities
4. Planning & Preparation
5. Student Assessment
6. Fieldwork Evaluation & Improvement
7. Warnings / Evidence Gaps

Structural fields include placeholders for:

- course identity
- academic term
- credit/hour pattern
- course category
- prerequisites
- supervisors
- placement
- fieldwork CLOs
- fieldwork activities
- placement-selection principles
- cooperating-teacher qualification criteria
- supervisor roles
- student preparation requirements
- assessment
- student feedback process
- cooperating-teacher feedback process
- supervisor summary process
- CQI input process

All 18 field bindings:

- binding_status = STRUCTURE_ONLY
- evidence_role = STRUCTURE_LAYOUT_EXEMPLAR
- synthetic_data_forbidden = true

## TQF6 v2 structural draft

Registry:

`HEPE-TQF6-GENERIC`

Version:

`2`

Status:

`UNDER_REVIEW`

Current registry version remains:

`1`

Sections:

1. General / Student Counts / TQF4 Lineage
2. Variance from TQF4 Plan
3. Student Results / Grades / CLO Attainment
4. Problems and Impact
5. Fieldwork Evaluation
6. CQI Action Plan
7. Approval / Sign-off
8. Warnings / Evidence Gaps

Structural fields include placeholders for:

- course identity
- academic term
- student counts
- supervisors
- placement summary
- executed hours
- TQF4 lineage
- time/schedule variance
- placement variance
- activity variance
- variance reason
- variance impact
- corrective action
- grade distribution
- CLO attainment
- fieldwork problems
- student evaluation
- cooperating-teacher/placement evaluation
- university-supervisor evaluation
- CQI plan
- approval/sign-off

All 21 field bindings:

- binding_status = STRUCTURE_ONLY
- evidence_role = STRUCTURE_LAYOUT_EXEMPLAR
- synthetic_data_forbidden = true

## Activation rule

Version 2 must not become the current/active template merely because it exists.

Current version remains version 1 until a separate governance decision.

Activation, approval, or institutional-official claims require a separate Human Gate.

## Future implementation

When TQF4/TQF6 live forms are added:

1. load canonical curriculum data where available
2. distinguish planning from execution
3. require evidence for actual placements/supervisors/hours/results
4. preserve TQF4→TQF6 lineage
5. use candidate evidence intake
6. never auto-admit evidence
7. never auto-sign approval
8. keep AI advisory only

# TQF-07A-SAFE — Programme Reporting / TQF7-Equivalent Aggregation Trial

Date: 2026-09-18

Status: PASS / EMPTY VERIFIED-ONLY TRIAL

Environment: NON-PRODUCTION / Supabase Sandbox

## Objective

Exercise the programme-reporting runtime without treating any unverified course result as programme evidence.

The trial must prove fail-closed VERIFIED_ONLY behavior before any positive programme outcome aggregation is attempted.

## New runtime control

Migration:

`tqf07a_safe_verified_only_programme_snapshot`

Follow-up fix:

`tqf07a_safe_verified_only_programme_snapshot_fix_uuid`

Function:

`public.hepe_create_verified_only_programme_snapshot(programme_id, academic_term_id)`

Security:

- SECURITY DEFINER
- authenticated execution only
- actor mapping required
- A4 programme reporting authority required
- anon/public execution revoked

## Strict eligibility rule

A course enters the programme snapshot only when all are true:

- verification_records.status = `VERIFIED`
- result_snapshots.snapshot_status in `HUMAN_VERIFIED`, `CONTROLLED`
- result_snapshots.source_status in `SOURCE_VERIFIED`, `CONTROLLED_SOURCE`
- course offering belongs to the selected programme and academic term
- course offering is OFFERED

No looser APPROVED/COMPLETED aliases are accepted by this safe aggregator.

## Controlled trial

Programme:

- ID: `69e3361e-b342-43e1-b386-ac73b191b9a4`
- Bachelor of Education Program in Health and Physical Education

Academic term:

- ID: `ab55cf0c-8843-4ce2-b7a4-834cb51cdc8b`
- AY2569 / Term 1

Snapshot:

- ID: `ce898977-f12a-4210-a44f-69d8e1e38a4b`
- Code: `TQF7-SAFE-20260917234635119`
- Status: `DRAFT`
- Aggregation policy: `VERIFIED_ONLY`

## Trial result

Opened course offerings: 30

Verified eligible courses: 0

Excluded courses: 30

Breakdown:

- without verification record: 29
- with non-VERIFIED verification status: 1
- VERIFIED status but unverified result/source: 0

Source verification refs: empty array

This is the expected fail-closed result.

## HED2503 exclusion

HED2503 AY2569/1 currently has:

- verification status: `INSUFFICIENT_EVIDENCE`
- result snapshot status: `DRAFT`
- result source status: `UNVERIFIED`

Therefore it was correctly excluded from VERIFIED_ONLY aggregation.

## Programme outcome achievement

`programme_outcome_achievement_results` remains at 0 rows.

No PLO or programme outcome achievement was calculated from an empty verified set.

This is intentional.

## Section snapshot

A draft EXECUTIVE_SUMMARY section was created for the safe trial.

It explicitly records:

- verified_course_count = 0
- excluded_course_count = 30
- empty_verified_set = true
- aggregation_performed = false

No draft or unverified course payload was copied into a verified programme-report section.

## Renderer / preview trial

Programme report template:

`HEPE-PROGRAMME-REPORT-GENERIC v2`

Template status:

`UNDER_REVIEW`

Field bindings:

4 required bindings are BOUND.

Preview session:

`2b91c80c-e742-434a-a2ed-11e24e9f3b45`

Target:

DOCX

Validation:

- blocking findings: 0
- informational finding: TEMPLATE_UNDER_REVIEW

Review decision:

`APPROVE_CONTROLLED_EXPORT`

Final preview status:

`APPROVED_FOR_CONTROLLED_EXPORT`

Authoritative export allowed:

`false`

Required watermark:

`DRAFT / UNDER REVIEW`

The approval applies only to the controlled draft preview. It does not assert any programme outcome achievement or verified course result.

## Important limitation

The existing generic document-model builder labels PROGRAMME_REPORT provenance as `SOURCE_VERIFIED` whenever the snapshot exists. For this trial, the snapshot itself is a controlled aggregation object, but it contains zero verified course results.

Until provenance semantics are refined, this label must not be interpreted as “programme outcomes verified.” The authoritative-export flag and DRAFT state remain false/active safeguards.

## Gate decision

TQF-07A-SAFE:

**PASS / EMPTY VERIFIED-ONLY TRIAL**

Proven:

- strict VERIFIED_ONLY inclusion logic
- HED2503 exclusion
- correct empty-state behavior
- no synthetic PLO computation
- programme snapshot creation
- section snapshot creation
- document model build
- controlled draft preview
- no authoritative export

Not yet proven:

- positive aggregation from actual verified course results
- outcome calculation across multiple verified courses
- final TQF7-equivalent report approval
- institutional production use

## Next safe phase

Recommended next phase:

`TQF-04A — TQF4 ONBOARDING`

Reason:

The TQF7 runtime now has a safe empty-state path. Positive aggregation is evidence-blocked, not architecture-blocked. TQF4 remains a major structural gap and has a source template available in Drive.

Production remains unchanged.

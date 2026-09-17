# VERIFICATION-RUNTIME-01 — HED2503 Course Verification Runtime

Date: 2026-09-18

Status: PASS / INSUFFICIENT EVIDENCE OUTCOME

Environment: Supabase Sandbox only

## Objective

Exercise the real course-level verification workflow for HED2503 using only traceable evidence and without promoting the TQF5 result unless the evidence supports verification.

## Starting point

- TQF5 record already exists for HED2503 AY 2569 / Term 1.
- Result snapshot status was `DRAFT`.
- Result source status was `UNVERIFIED`.
- Draft verification record existed from the TQF5 handoff.

## Evidence reviewed

Traceable sources located in the connected academic Drive included:

1. HED2503 TQF3 assessment planning / marking-scheme material containing an assessment matrix and rubric structures.
2. HED2503 combined TQF3/TQF5/verification report containing claims about pre-exam and post-exam verification.
3. Duplicate/derived HED2503 TQF5 + verification working documents.

These sources support the existence of planned assessment criteria and draft verification narrative, but they do not independently establish that the claimed committee verification has already occurred.

## Critical evidence conflict

The combined HED2503 verification report states a verification date of **25 November 2569**.

The current review date is **18 September 2569**.

Therefore that document cannot be treated as contemporaneous evidence that the verification event has already occurred.

The same report contains unsigned signature placeholders rather than executed verification signatures.

Primary evidence not located in the current evidence set includes:

- sampled answer scripts / scored student artifacts;
- sampled E-Portfolio or innovation artifacts used in the review;
- traceable scoring records for the reviewed sample;
- committee appointment or meeting evidence for the specific verification event;
- contemporaneous reviewer sign-off / minutes;
- independent evidence validating the claimed post-assessment sample and conclusions.

## Runtime review RPC

Migration:

`verification_runtime_review_rpc`

Function:

`public.hepe_review_course_verification(uuid,text,text)`

The function enforces:

- mapped authenticated actor;
- A3 reviewer/programme authority;
- controlled verification state transitions;
- no direct jump from DRAFT to a terminal result;
- a VERIFIED decision is blocked unless the linked result snapshot is already HUMAN_VERIFIED/CONTROLLED and the source is SOURCE_VERIFIED/CONTROLLED_SOURCE;
- anon execution revoked.

## Verification state transition

Verification record:

`67105933-55ce-4252-8519-94ad0ed45cf9`

Transition exercised:

`DRAFT -> IN_REVIEW -> INSUFFICIENT_EVIDENCE`

Final finding summary records that planning evidence and draft verification claims exist, but primary post-assessment evidence and contemporaneous committee evidence were not found.

## Verification method binding repair

The verification template v2 initially had one required field binding, `METHOD`, in `PARTIAL` state and the `verification_methods` table had no active method rows.

A design-candidate method was added:

- code: `TWO_STAGE_PRE_POST`
- Thai label: `การทวนสอบสองระยะก่อนและหลังการประเมิน`
- source status: `DESIGN_CANDIDATE`

The verification record was linked to this method.

The template `METHOD` field binding was completed to canonical field `verification_method_id` and moved from `PARTIAL` to `BOUND`.

This change establishes a canonical method reference but does **not** claim that the two-stage verification event has been completed.

## Verification preview

First preview attempt correctly failed closed because the required METHOD binding was still partial.

After the binding repair, a new DOCX preview was generated successfully.

Preview session:

`882e5535-1d8e-4b47-bb7a-dd17bb4c9c35`

Initial status:

`READY_FOR_REVIEW`

Blocking findings:

0

Informational finding:

Template/version remains `UNDER_REVIEW`; controlled draft only.

The preview was submitted and approved for controlled export with an explicit note that the verification outcome remains `INSUFFICIENT_EVIDENCE`.

Final preview status:

`APPROVED_FOR_CONTROLLED_EXPORT`

Authoritative export allowed:

`false`

Required watermark:

`DRAFT / UNDER REVIEW`

## Final runtime state

- verification status: `INSUFFICIENT_EVIDENCE`
- result snapshot status: `DRAFT`
- result source status: `UNVERIFIED`
- verification preview: `APPROVED_FOR_CONTROLLED_EXPORT`
- authoritative export: `false`

No result or source status was promoted merely because a draft report contained a positive verification conclusion.

## Decision

The verification runtime is operational and fail-closed.

The HED2503 result is **not yet verified**.

The system correctly distinguishes:

- assessment/rubric planning evidence;
- draft verification narrative;
- actual contemporaneous verification evidence.

## Next action

`VERIFICATION-EVIDENCE-GAP-01`

Locate or obtain the missing primary evidence for the actual verification event. Only after traceable committee/reviewer evidence and sampled assessment evidence exist should the record return to `IN_REVIEW` and be reconsidered for `VERIFIED`.

Do not proceed to VERIFIED_ONLY programme aggregation using this HED2503 result while its verification status is `INSUFFICIENT_EVIDENCE`.

## Governance boundary

- Sandbox only.
- HED2503 TQF3 R1 unchanged.
- No Production mutation.
- No institutional-official claim.
- No private Drive file was published.

# HEPE Instructor Registry Auto-Enrichment v1 — Evidence Audit

Date: 2026-09-24
Environment: HEPE Sandbox / NON-PRODUCTION
Status: SOURCE-BASED ENRICHMENT COMPLETED — ACCOUNT BINDING SEPARATE

## Inputs

- Existing public.academic_people and public.academic_person_contacts.
- Verified academic_person_actor_bindings and exact authenticated-account email, where already present.
- Google Sheet: RU-HEPE ฐานข้อมูลหลักสูตรและผู้สอน พ.ศ. 2567, sheet 03_อาจารย์ใหม่ (NIV-001, NIV-002, NIV-003) and 50_User_Access.

## Changes applied

Added exact-source email contact records for three matched existing academic people:
- ชานน จิตบรรจงจักร — comchanon.c@ru.ac.th (NIV-001).
- อาทิตย์ เข็มทอง — khemthong_css57@hotmail.com (NIV-002, personal email).
- ณัฐพงษ์ ทำทาน — nuttapong.t@rumail.ru.ac.th (NIV-003).

Promoted the pre-existing contact for เกษม ชูรัตน์ to VERIFIED only after exact match with an existing verified person↔actor binding and auth email.

No academic person, auth account, new verified binding, or authority assignment was created by this enrichment.

## Existing read model and UI

The existing public.v_hepe_instructor_enrichment_status and public.hepe_fast_tqf_instructor_registry_context already expose the states and counts. The registry UI has summary badges and filter for enrichment_status. Preserve the existing view's column contract; do not replace it with an incompatible projection.

## Post-enrichment reconciliation

- 30 real instructor records.
- ACCOUNT_BOUND: 1.
- EMAIL_VERIFIED: 6 (email source verified, not account ownership).
- EMAIL_UNVERIFIED: 4.
- EMAIL_MISSING: 19.
- REVIEW_REQUIRED: 0 at time of query.
- No identical active contact email mapped to multiple academic people at time of query.

These are distinct states: email source verification does not create login identity, bind an account, or grant course/system authority.

## Remaining HED3505 pilot blocker

อรชุลี นิราศรพ remains EMAIL_MISSING / no verified account binding. Do not invent her address or infer identity from a similar name. Obtain her actual email/sign-in and make a programme-scoped human-confirmed account binding before granting PREPARER.

## Gate

PASS — ENRICHMENT DATA / EXISTING READ MODEL.
HOLD — REAL CO-INSTRUCTOR SIGN-IN AND ACCOUNT BINDING.

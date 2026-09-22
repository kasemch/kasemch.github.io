# Seminar EdTech Event System 2569

Production Candidate สำหรับโครงการ **ออกแบบสื่อและนวัตกรรมเทคโนโลยีเพื่อการสอนสุขศึกษาและพลศึกษา**

## End-to-end flow
Registration → Timed QR Check-in → Pre-test → Co-Creation Workshop Evidence → Post-test → Satisfaction → Eligibility → Admin Approval → E-Certificate Registry → Verification → Project Report

## Current state
- GitHub frontend อยู่ใน Draft PR #104
- Supabase Sandbox: `lztxpjsuzqvtgyasfnyj`
- Event `HPE-2569` status = **draft**; real registration is fail-closed
- Direct anon/auth table access = revoked + restrictive deny policies
- Synthetic tests are transactional and rolled back

## Source-aligned assessment
Pre/Post item bank expanded to 10 items based only on concepts explicitly present in the project document: Interactive Media, Motion Analysis, Gamification, Co-Creation, Learning by Doing, Coaching, Feedback, Reflection, prototype development, and real-school applicability. Instructor approval is still required before pilot.

## Backend modules
- seminar-register
- seminar-submit
- seminar-attendance (timed checkpoint token)
- seminar-admin-checkpoint
- seminar-workshop-submit
- seminar-verify
- seminar-admin-approve
- seminar-admin-dashboard
- seminar-admin-report

## Governance fields intentionally unresolved
The database contains nullable gates for:
- privacy_notice_version
- retention_until
- certificate_signer_name
- certificate_signer_title

These must not be invented. They require human confirmation before opening pilot or generating final certificate PDFs.

## Remaining Human Gates
1. Instructor approval of the 10-item Pre/Post bank and answer key.
2. Confirm eligibility/attendance rule.
3. Bind authorized Supabase Auth user(s) as seminar issuer/owner.
4. Approve Privacy Notice and retention end date.
5. Confirm certificate signer name/title.
6. Implement final server-side PDF rendering only after signer confirmation.
7. Generate timed QR checkpoint during controlled pilot.
8. Run iPhone/Android synthetic real-device acceptance.
9. Change event status from `draft` → `pilot` only after gates 1–8 pass.

## Release rule
DO NOT MERGE and DO NOT OPEN REAL REGISTRATION until the Human Gates pass.

Evidence-first • Minimum necessary data • RLS fail-closed • Human academic authority • Reversible release

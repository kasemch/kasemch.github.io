# Seminar EdTech Event System 2569

Production Candidate สำหรับโครงการ **ออกแบบสื่อและนวัตกรรมเทคโนโลยีเพื่อการสอนสุขศึกษาและพลศึกษา**

## End-to-end flow
Registration → Timed QR Check-in → Pre-test → Co-Creation Workshop Evidence → Post-test → Satisfaction → Eligibility → Admin Approval → E-Certificate Registry → Verification → Project Report

## Current state
- GitHub frontend อยู่ใน Draft PR #104
- Supabase Sandbox: `lztxpjsuzqvtgyasfnyj`
- Event `HPE-2569` status = **pilot / test_mode=true**; ใช้เฉพาะข้อมูลทดสอบและผู้ทดสอบที่ได้รับอนุญาต
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

## Test-pilot certificate signer
- Signer: **ผู้ช่วยศาสตราจารย์ ดร.เกษม ชูรัตน์**
- Certificate watermark: **TEST / รุ่นทดสอบ**
- Certificate signer title currently marked as test-pilot approval text and is not a production release assertion.

## Governance fields intentionally unresolved
The database contains nullable gates for:
- privacy_notice_version
- retention_until
- certificate_signer_name = ผู้ช่วยศาสตราจารย์ ดร.เกษม ชูรัตน์ (confirmed for test-pilot)
- certificate_signer_title = test-pilot approval text

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
9. Keep production release locked; test-pilot may run only with synthetic/authorized test records until all remaining gates pass.

## Release rule
DO NOT MERGE and DO NOT OPEN REAL REGISTRATION until the Human Gates pass.

Evidence-first • Minimum necessary data • RLS fail-closed • Human academic authority • Reversible release

## Dynamic E-Certificate Test Renderer
- Function: `seminar-certificate-render`
- Test certificate: `HPE-2569-TEST-001`
- Synthetic recipient only; no real participant data.
- Mandatory watermark: `TEST / รุ่นทดสอบ`
- Confirmed test signer: `ผู้ช่วยศาสตราจารย์ ดร.เกษม ชูรัตน์`
- Preview URL: https://lztxpjsuzqvtgyasfnyj.supabase.co/functions/v1/seminar-certificate-render?cert=HPE-2569-TEST-001&token=a8bdc834-c5a9-410f-af78-668ca6138622
- Output is print-ready A4 landscape HTML with embedded QR verification; browser can Print / Save as PDF.

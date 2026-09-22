# Seminar EdTech Event System 2569

ระบบ Production Candidate สำหรับโครงการ **ออกแบบสื่อและนวัตกรรมเทคโนโลยีเพื่อการสอนสุขศึกษาและพลศึกษา**

## Flow
Registration → Check-in → Pre-test → Activity → Post-test → Satisfaction → Admin approval → E-Certificate → Verification

## Current status
- Frontend: GitHub Pages branch preview candidate
- Backend: Supabase Sandbox project `lztxpjsuzqvtgyasfnyj`
- Event status: **draft** (registration endpoint will refuse real registration until status changes to pilot/open)
- Data access: direct browser table access denied; RLS explicit deny; writes/reads go through Edge Functions
- Certificate approval: authenticated admin only; admin account binding is still a Human Gate
- Question bank: current 5 questions are **draft content for instructor review**, not source-approved final test items

## Deployed Edge Functions
- `seminar-register` — public registration endpoint with input validation
- `seminar-submit` — pre/post/survey submission by participant token
- `seminar-attendance` — pilot check-in endpoint
- `seminar-verify` — minimum-data public certificate verification
- `seminar-admin-approve` — JWT-required issuer/owner approval

## Validation completed
Synthetic transaction verified participant → 3 assessments → attendance relations and was rolled back. No synthetic participant was retained.

## Remaining Human Gates before pilot
1. Approve final Pre-test/Post-test items and answer key.
2. Approve E-Certificate eligibility rule and attendance threshold.
3. Bind authorized admin/issuer account(s).
4. Replace pilot attendance code with controlled QR/checkpoint mechanism.
5. Approve privacy notice and data-retention period.
6. Add server-side PDF certificate generator/template/signature.
7. Run real-device acceptance on iPhone/Android with synthetic records.
8. Open event status from `draft` to `pilot` only after the above gates pass.

## Governance
Evidence-first • Minimum data • RLS fail-closed • Human academic authority • Reversible release • No service-role secrets in GitHub

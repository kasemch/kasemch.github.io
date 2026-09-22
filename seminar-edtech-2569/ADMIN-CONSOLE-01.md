# HPE-EDTECH-ADMIN-CONSOLE-01

## Status
CONTROLLED TEST-PILOT CANDIDATE

## Purpose
Provide one browser-based admin surface for the HPE EdTech 2569 pilot so routine administration does not require direct GitHub or Supabase console access.

## Functions
- Email Magic Link authentication through Supabase Auth
- Role enforcement through seminar_admins
- Dashboard summary
- Timed QR Check-in / Check-out checkpoint creation
- Participant eligibility list
- TEST E-Certificate approval
- Direct certificate opening
- Project report generation and JSON download

## Security
- Browser receives only the Supabase publishable key.
- No service-role key is exposed.
- All privileged calls use JWT-protected Edge Functions.
- Direct anon/auth table access remains denied.
- Owner/issuer role is checked server-side.

## TEST-PILOT boundary
- Event remains HPE-2569 / pilot / test_mode=true.
- Certificates remain TEST / รุ่นทดสอบ.
- Production release is not authorized by this admin console.

## Controlled Pilot Acceptance Fixture
A synthetic participant fixture has been prepared for Admin Console acceptance:
- email: `pilot-tester-02@example.invalid`
- check-in: complete
- pre-test: complete
- post-test: complete
- survey: complete
- workshop evidence: complete
- certificate: not issued

Expected Admin Console behavior: show the participant as eligible and enable the TEST E-Certificate approval action.

This fixture contains no real participant data.

## Acceptance result — synthetic certificate issuance
On 22 September 2026, the project owner explicitly approved issuance for the synthetic participant `pilot-tester-02@example.invalid`.

Result:
- certificate number: `HPE-2569-TEST-002`
- approval status: `approved`
- TEST-PILOT signer and TEST watermark remain governed by the event configuration
- approval was recorded as an operator-authorized test action; `approved_by` was intentionally not falsified as a user-session approval

This validates the controlled backend issuance path for the synthetic fixture. It does not by itself claim that the Magic Link login + UI approval click path has been observed end-to-end.

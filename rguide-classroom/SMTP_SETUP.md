# R-GUIDE Classroom — SMTP Activation Runbook

Status: HUMAN GATE — credentials/provider activation required
Course: RPE6701
Project: Supabase `zimbrsdvxogsfmpflxcr`
Public registration redirect: `https://kasemch.github.io/rguide-classroom/register.html`

## Governance

- Zero/low-cost first.
- Never commit SMTP keys, API keys, access tokens, passwords, or service-role keys to GitHub.
- Never paste SMTP credentials into student-facing pages or browser JavaScript.
- Keep the legacy Code + PIN Classroom path available until verified-email registration passes end-to-end acceptance.
- Do not send registration invitations to real students before the launch gate is PASS.
- Identity Vault remains separate from the Research Workspace and AI Coach.

## Recommended pilot provider

Brevo Free is suitable for the 11-student pilot subject to provider account activation and current provider limits. Supabase Auth requires custom SMTP for delivery to non-team addresses.

Expected Brevo SMTP values (verify in the provider dashboard before use):

- Host: `smtp-relay.brevo.com`
- Port: `587` (preferred for this integration)
- User: the SMTP login shown by Brevo
- Password: a Brevo **SMTP key**, not an API key
- Sender name: `R-GUIDE · RPE6701`
- From address: a verified sender address controlled by the instructor/project

## Human Gate A — Brevo account / sender

The account owner must perform these actions directly in Brevo:

1. Create or sign in to the Brevo account.
2. Activate transactional email if Brevo requires activation for the account.
3. Create and verify a sender. Domain authentication (SPF/DKIM/DMARC) is preferred when a suitable domain is available.
4. Open SMTP & API settings and generate a dedicated SMTP key named `R-GUIDE-SUPABASE-AUTH`.
5. Store the SMTP key in a password manager. Do not put it in this repository or chat.

## Human Gate B — Supabase Auth configuration

In Supabase Dashboard for project `zimbrsdvxogsfmpflxcr`:

1. Authentication → SMTP Settings → enable Custom SMTP.
2. Enter the verified sender address and sender name.
3. Enter Brevo host, port, SMTP user, and SMTP key directly in the dashboard.
4. Keep email confirmation enabled.
5. Authentication → URL Configuration:
   - Ensure the production registration callback is allowed exactly as `https://kasemch.github.io/rguide-classroom/register.html`.
   - Keep only intentional production/development redirects; do not use a broad wildcard for production.
6. Save settings.

## Acceptance Gate — before student launch

Run with one instructor-controlled test mailbox first:

1. Open the public registration page.
2. Confirm Privacy Notice consent is required.
3. Request a passwordless verification link.
4. Confirm the email is delivered and sender identity is correct.
5. Follow the link and confirm return to the approved registration URL.
6. Confirm activation creates the Identity Vault record and pseudonymous learning profile.
7. Confirm the UI exposes only username/learner ID/course/status after activation.
8. Confirm AI/Research Workspace does not receive first name, last name, student ID, or email.
9. Confirm duplicate student ID/email is rejected safely without exposing another student's identity.
10. Confirm legacy Code + PIN fallback still works.
11. Re-run Playwright public/safety QA.

Only after all checks PASS may the registration link be promoted as the primary student entry point.

## Rollback

If SMTP or registration verification fails:

- Do not disable email confirmation.
- Do not weaken Identity Vault permissions.
- Do not expose service-role credentials.
- Keep verified-email registration unpromoted.
- Continue the existing pseudonymous Code + PIN Classroom flow for the class while the issue is repaired.

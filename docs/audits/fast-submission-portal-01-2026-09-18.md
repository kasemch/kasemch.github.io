# FAST-SUBMISSION-PORTAL-01

Date: 2026-09-18

Status: READY FOR URGENT SUBMISSION USE

Environment: NON-PRODUCTION / GitHub Pages + Supabase Sandbox

## Scope intentionally limited

Urgent usable path delivered first:

1. Login
2. TQF3 working draft
3. TQF5 draft result snapshot
4. Course verification / review note

Deferred:

- TQF4
- TQF6
- TQF7
- broader workflow refinements

## Static route

`./hepe-trial/`

Public URL:

`https://kasemch.github.io/hepe-trial/`

All local assets use relative paths.

No backend framework added.

## Login

Supported:

- Magic Link
- Email/password if the account is configured for password login

Anonymous users cannot execute the fast-portal RPCs.

## TQF3

Fast Portal can:

- load current working content
- edit current JSON content
- append a new DRAFT working version

RPC:

`hepe_save_tqf3_working_version_by_code(...)`

It does not mutate the frozen/public R1 release.

## TQF5

Fast Portal provides fields for:

- registered students
- students at end
- grade distribution
- CLO target / attainment
- teaching-evaluation means
- improvement plan

Saving creates a new:

`DRAFT / UNVERIFIED`

result snapshot.

RPC:

`hepe_create_tqf5_working_draft_by_code(...)`

## Verification

Fast Portal can:

- create a DRAFT verification record when one does not exist
- save finding/review notes
- move through allowed non-final workflow transitions

The portal does not expose a VERIFIED shortcut.

Existing server-side evidence gate remains authoritative.

## New fast-portal RPCs

- `hepe_fast_tqf_portal_context_by_code(...)`
- `hepe_create_tqf5_working_draft_by_code(...)`
- `hepe_ensure_verification_draft_by_code(...)`
- `hepe_save_verification_note(...)`
- `hepe_save_tqf3_working_version_by_code(...)`

Anonymous execution revoked.

Authenticated/service_role execution granted.

Each action retains existing authority checks.

## Test

A transaction-rollback test successfully exercised:

- portal context
- TQF3 working-version save
- TQF5 draft save
- verification ensure
- verification-note save

No test data persisted.

Post-test invariants:

- HED2503 TQF3 current version remains 1
- HED2503 TQF3 version count remains 1
- HED2503 TQF5 snapshot count remains 1
- Verification remains INSUFFICIENT_EVIDENCE
- R1 remains PUBLIC_PUBLISHED
- R1 SHA unchanged

R1 SHA:

`799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256`

## Front-end verification

Repository readback confirms:

- Magic Link UI present
- TQF3 tab present
- TQF5 tab present
- Verification tab present
- JS parses successfully
- CSS/JS local paths are relative

Direct external page fetch was not available from the current internal web-check environment.

Repository state is verified on master.

## Submission note

This is intentionally an urgent operational slice for same-day demonstration/submission.

It should be described as:

`HEPE Fast TQF Portal — Login + TQF3 + TQF5 + Verification`

and not as the final complete TQF3–TQF7 system.

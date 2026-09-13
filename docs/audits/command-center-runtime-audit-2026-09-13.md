# Academic Command Center Runtime v2 Audit — 2026-09-13

## Scope
Authenticated Google Calendar scaffold + controlled Google Drive upload scaffold for GitHub Pages/Jekyll.

## Evidence checked
- Repository baseline: `master` at `e0d5447f5744bb89b9fec0425b1eb2a9bef60438`.
- Google Calendar config remains fail-closed: direct write disabled and OAuth client ID blank.
- Google Drive config remains fail-closed: upload disabled and OAuth client ID blank.
- Drive root `Kasem Academic Command Center` is accessible as an owned folder for the connected Google account.
- All eight expected child folders were found under the canonical root.
- Current Google documentation continues to support browser OAuth with Google Identity Services, the `calendar.events.owned` Calendar scope, the non-sensitive `drive.file` Drive scope, and multipart upload using an OAuth access token.

## Implemented hardening
- reusable in-memory Google OAuth token broker;
- Calendar direct-write adapter with explicit user action and 401/403/429/network handling;
- existing review-in-Google-Calendar fallback preserved;
- conservative file-type and 25 MB validation;
- rule-based classification with confidence and human override;
- explicit upload confirmation required;
- Drive destination capability check before upload;
- Drive upload success requires a returned file ID;
- HEPE handoff event remains NOT_ADMITTED and creates no system authority.

## Security boundary
No client secret, refresh token, service account key, Bearer token, Supabase service-role key, or private HEPE record is introduced by this change.

Known HEPE database security findings remain EXISTING / OUT OF SCOPE for this website integration and are not modified by this phase.

## Test disposition
CAL-01: PASS by fail-closed configuration.
CAL-02: adapter handles authorization cancellation; runtime activation test BLOCKED by missing verified OAuth Client ID.
CAL-03: successful live insertion BLOCKED by missing verified OAuth Client ID.
CAL-04: PASS by client-side end-after-start validation.
CAL-05: public projection logic remains separate; no private event is added to public build by this change.

UPL-01: PASS by PDF validation/classification path.
UPL-02: PASS; weak/unknown files route to 00 Inbox.
UPL-03: PASS; HED/PED/RHE/EDU course code rule maps to Teaching.
UPL-04: PASS; human category override is preserved as RULE+USER/HUMAN_REVIEWED.
UPL-05: authorization cancellation is fail-closed; live activation test BLOCKED by missing verified OAuth Client ID.
UPL-06: Drive HTTP failure does not produce success state.
UPL-07: successful live upload BLOCKED by missing verified OAuth Client ID.

SEC-01: source diff contains no private credential material by design; final PR diff review required before merge.
SEC-02: no private HEPE record is rendered by these runtime changes.
SEC-03: privileged API controls are not rendered when feature flag/client ID gate is closed.

## Gate
Jekyll CI and PR diff/security review are required before merge.
Final activation remains HOLD at the OAuth Client ID credential gate even if the scaffold PR passes.

# Google OAuth Activation Gate — Academic Command Center

Status: CREDENTIAL GATE / FAIL-CLOSED
Date: 2026-09-13

## Purpose
This document defines the exact activation requirements for enabling Google Calendar direct-write and Google Drive controlled upload from the static GitHub Pages site.

## Public origin
Authorized JavaScript origin:

`https://kasemch.github.io`

Do not add repository paths to the origin field.

## Required Google APIs
Enable in the Google Cloud project that owns the OAuth Web Client:
- Google Calendar API
- Google Drive API

## OAuth client type
Create or reuse an OAuth 2.0 Client ID of type **Web application**.

The Client ID may be browser-visible. Do not place a client secret in this repository or in GitHub Pages.

## Scopes
Calendar direct-write:
`https://www.googleapis.com/auth/calendar.events.owned`

Drive controlled upload:
`https://www.googleapis.com/auth/drive.file`

Do not broaden scopes unless a separately verified requirement requires it.

## Repository activation sequence
After a verified Web Client ID exists:

1. Set `_data/google_calendar.yml`:
   - `client_id: "<VERIFIED_WEB_CLIENT_ID>"`
   - `direct_write_enabled: true`

2. Set `_data/document_storage.yml`:
   - `client_id: "<VERIFIED_WEB_CLIENT_ID>"`
   - `upload_enabled: true`

3. Run Jekyll strict build.
4. Verify no client secret, refresh token, service-role key, or private metadata is committed.
5. Test Calendar direct-write with a disposable event.
6. Test Drive upload with a non-sensitive disposable file.
7. Verify returned Calendar event ID and Drive file ID.
8. Remove disposable test artifacts if appropriate.

## Runtime security
- Access tokens remain in browser memory only.
- No refresh token persistence.
- No localStorage/sessionStorage token persistence.
- No client secret in public source.
- Calendar fallback remains available.
- Drive upload requires human review and explicit confirmation.

## Stop condition
If a verified OAuth Web Client ID is unavailable, both integrations remain disabled and no privileged API action is exposed.

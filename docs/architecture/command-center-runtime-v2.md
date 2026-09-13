# Academic Command Center Runtime v2

Status: IMPLEMENTED SCAFFOLD / ACTIVATION GATED

## Runtime boundary
- GitHub Pages remains static/Jekyll only.
- Google Calendar is the calendar source of truth.
- Google Drive is the document binary source of truth.
- HEPE Supabase remains a controlled metadata/governance context only for HEPE-related records.
- Human review remains mandatory before calendar write or Drive upload.

## OAuth model
Google Identity Services is loaded only when BOTH the relevant feature flag is enabled and a verified OAuth Web Client ID is configured.

Calendar scope: `https://www.googleapis.com/auth/calendar.events.owned`

Drive scope: `https://www.googleapis.com/auth/drive.file`

The browser token broker keeps access tokens in memory only. No refresh token, client secret, service account key, or Supabase privileged key is stored in the repository or browser storage.

## Calendar direct write
Flow: validate form -> human presses direct-save -> OAuth authorization -> Calendar `events.insert` -> verify returned event ID -> success state.

The existing review-in-Google-Calendar flow remains available when direct write is disabled or fails.

## Controlled Drive upload
Flow: file validation -> rule classification -> metadata preview -> human category review -> explicit upload confirmation -> OAuth authorization -> destination capability check -> multipart upload -> verify returned Drive file ID.

Allowed initial file types: PDF, DOCX, XLSX, PPTX, TXT, CSV.

Controlled upload limit: 25 MB.

Low-confidence files route to `00 Inbox` unless the user explicitly reviews and changes the category.

## Drive source-of-truth folders
Verified root: `Kasem Academic Command Center`.

Expected routing labels:
- 00 Inbox
- 01 Teaching
- 02 Research
- 03 Publications
- 04 Curriculum & Quality
- 05 Academic Service
- 06 Projects
- 99 Archive

Folder IDs are configuration data, not credentials. They must not be presented unnecessarily in public UI.

## HEPE governance
Drive upload alone must never:
- create canonical courses;
- create or mutate teaching assignments;
- create IAM/authority;
- resolve reconciliation items;
- promote a document to admitted audit evidence.

If HEPE metadata is later handed off, the initial governance state remains `NOT_ADMITTED` with `creates_system_authority=false` until separately reviewed.

## Activation gate
Current production-facing activation remains blocked until a verified Google OAuth Web Client ID is supplied through approved configuration. Do not guess or fabricate a Client ID.

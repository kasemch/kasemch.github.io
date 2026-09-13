# Phase 3B — Document Storage & Metadata Boundary v1.0

Status: IMPLEMENTED AS FAIL-CLOSED SCAFFOLD

## Source of Truth
- Document binary source of truth: Google Drive
- Metadata/search source of truth: dedicated Supabase project (not yet provisioned)
- GitHub Pages remains the static client UI only

## Google Drive Provisioning
Root folder: Kasem Academic Command Center

Destination folders:
- 00 Inbox
- 01 Teaching
- 02 Research
- 03 Publications
- 04 Curriculum & Quality
- 05 Academic Service
- 06 Projects
- 99 Archive

The Drive folder IDs are recorded in `_data/document_storage.yml`.

## Runtime Security Boundary
- `upload_enabled` defaults to false.
- `client_id` defaults to empty.
- Google Identity Services and the upload adapter render only when both are configured.
- OAuth scope is restricted to `https://www.googleapis.com/auth/drive.file`.
- No client secret, refresh token, or service-account key may be committed to GitHub.
- Access tokens are expected to remain in page memory only.
- The adapter verifies destination-folder access before upload. If the OAuth app cannot access the configured folder, upload fails closed.

## Classification to Folder Mapping
- Teaching -> 01 Teaching
- Research -> 02 Research
- Publications -> 03 Publications
- Curriculum -> 04 Curriculum & Quality
- Quality Assurance -> 04 Curriculum & Quality
- Academic Service -> 05 Academic Service
- Projects -> 06 Projects
- Other/low confidence -> 00 Inbox

## Supabase Metadata Gate
Existing Supabase projects belong to other systems and must not be reused by assumption. Metadata remains disabled until a dedicated project is explicitly provisioned.

Planned schema: `academic_hub`
Planned table: `documents`

## Activation Gates
Google Drive runtime upload may be enabled only after:
1. a verified Google OAuth Web Client ID exists;
2. the GitHub Pages origin is registered as an authorized JavaScript origin;
3. Drive API is enabled for that Google Cloud project;
4. configured destination folder access is verified with the chosen OAuth model;
5. build and browser regression tests pass.

Supabase metadata may be enabled only after:
1. a dedicated project is selected/provisioned;
2. schema/RLS migrations are reviewed;
3. publishable client configuration is separated from privileged keys;
4. insert/select policies are verified;
5. security advisors pass without critical findings.

## Rollback
Set `upload_enabled: false` and/or clear `client_id`. This prevents runtime OAuth/upload assets from rendering while preserving local classification.

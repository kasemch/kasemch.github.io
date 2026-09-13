# Google Calendar Phase 2C — Authenticated Direct Write Gate

Status: IMPLEMENTED AS FAIL-CLOSED SCAFFOLD / NOT ACTIVATED

## Decision
Use Google Identity Services OAuth token model in the browser for explicit, user-initiated event creation. GitHub Pages remains static and stores no client secret, refresh token, service-account key, or long-lived write credential.

## Scope
- OAuth Web Client ID: public configuration value, required before activation.
- OAuth scope: `https://www.googleapis.com/auth/calendar.events.owned`.
- Calendar target: `primary` by default.
- Timezone: `Asia/Bangkok`.
- Token lifetime: short-lived access token kept only in JavaScript memory for the active page session.
- Write endpoint: Google Calendar API v3 `events.insert` equivalent HTTP POST.

## Fail-closed activation rule
Direct write is available only when BOTH are true in `_data/google_calendar.yml`:

```yml
direct_write_enabled: true
client_id: "VERIFIED_WEB_OAUTH_CLIENT_ID"
```

Otherwise:
- Google Identity Services is not loaded.
- Direct-write JavaScript is not loaded.
- Direct-save button is not rendered.
- Phase 2B review-before-save remains available.

## Required Google Cloud configuration before activation
1. Enable Google Calendar API.
2. Configure OAuth consent screen.
3. Create OAuth 2.0 Client ID of type Web application.
4. Register authorized JavaScript origin `https://kasemch.github.io`.
5. Add only the narrow calendar event scope required by the app.
6. Verify consent/testing requirements appropriate to the Google account/audience.
7. Insert the verified Web Client ID into `_data/google_calendar.yml` and enable the feature in a dedicated PR.

## Security controls
- No client secret in repository.
- No refresh token in repository, localStorage, sessionStorage, IndexedDB, cookies, or Jekyll data.
- No automatic authorization on page load.
- User must explicitly press direct-save before access is requested.
- Event fields are validated before authorization/write.
- End time must be later than start time.
- API errors fail closed and are shown to the user.
- Public calendar projection remains separate from private Google Calendar data.

## Activation gate
Do not set `direct_write_enabled: true` until:
- verified OAuth Web Client ID is available;
- authorized origin is confirmed;
- consent screen/audience is confirmed;
- Jekyll CI passes;
- browser runtime test successfully creates and opens a synthetic event;
- no credential appears in source except the public OAuth Client ID.

## Rollback
Set `direct_write_enabled: false`. The site immediately reverts to Phase 2B review-before-save behavior on the next GitHub Pages deployment.

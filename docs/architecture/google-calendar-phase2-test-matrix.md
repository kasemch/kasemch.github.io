# Google Calendar Phase 2A/2B Test Matrix

## Build
- Jekyll strict front matter build must pass.
- `/`, `/academic-calendar/`, and `/add-event/` must render.

## Public projection
- Only `visibility: public` events render.
- Calendar markers derive from rendered projection data, not hard-coded JavaScript dates.
- Empty public projection produces no event markers.

## Add-event flow
- Title, start, and end are required.
- End must be later than start.
- Generated Google Calendar URL uses `ctz=Asia/Bangkok`.
- Event title, location, category, and description are URL encoded.
- No form data is persisted by the site.
- Google Calendar is opened in a new tab for explicit user review/save.

## Security
- No OAuth client secret.
- No refresh token.
- No service-account key.
- No write-capable long-lived credential.
- No private event data in `_data/public_calendar.yml`.

## Responsive
- Calendar remains two-column on desktop and collapses on mobile.
- Event builder start/end fields collapse to one column at <=720px.

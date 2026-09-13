# Phase 2 — Google Calendar Integration Architecture v1.0

Status: OPEN / DESIGN GATE

## Objective
Connect the approved Compact Academic Calendar to Google Calendar while preserving the public/private boundary of the GitHub Pages site.

## Source of Truth
Google Calendar is the calendar source of truth. GitHub Pages remains a static presentation layer only.

## Security Boundary
- No client-side storage of refresh tokens, client secrets, service-account keys, or write-capable long-lived credentials.
- Public pages may display only events explicitly approved for public visibility.
- Private events, teaching schedules, meetings, deadlines, and personal items must not be emitted into the public Jekyll build.
- Write operations require authenticated user action and an external trusted integration layer.

## Phase 2A — Read Architecture
1. Define calendar/category mapping.
2. Define public-event projection schema.
3. Define event visibility policy.
4. Replace hard-coded demonstration events with a static/public projection that is safe for GitHub Pages.
5. Preserve graceful fallback if the external calendar source is unavailable.

## Phase 2B — Add Event Flow
Preferred initial implementation: generate an Add-to-Google-Calendar link from the static site so the user reviews and saves the event in Google Calendar.

Flow:
User -> Static Form -> Validated event data -> Google Calendar event URL -> User review -> Save in Google Calendar

This requires no write-capable credential in GitHub Pages.

## Phase 2C — Authenticated Direct Write (later gate)
Direct `events.insert` is deferred until an authenticated external integration layer is selected and reviewed. The static site must never embed write-capable secrets.

## Canonical Event Model
- id
- title
- description
- start
- end
- timezone
- location
- category
- visibility
- linked_course
- linked_project
- source_calendar_id
- source_event_id
- updated_at

## Calendar Categories
- Teaching
- Research
- Meeting
- Academic Service
- Deadline
- Personal

## Public Projection Rule
Only `visibility = public` may reach the public calendar component.

## Gate Criteria before implementation
- Authentication strategy approved
- Read/write boundary approved
- Public projection schema approved
- No-secret client-side rule verified
- Timezone handling fixed to Asia/Bangkok for authored events unless explicitly overridden
- Privacy failure mode defined as fail-closed

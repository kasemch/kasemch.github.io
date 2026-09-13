# Academic Command Center — Phase 1

Status: IMPLEMENTED / STATIC SAFE SHELL

## Scope
- Route: `/workspace/`
- Static/Jekyll only.
- No backend runtime.
- No private HEPE records rendered.
- No Supabase/Google/service secrets embedded.

## Functions
1. Local document classification preview
   - Reads selected file name/type/size in the browser.
   - Suggests a broad academic category using deterministic filename rules.
   - Does not upload or persist the file.
2. Google Calendar draft
   - Builds a Google Calendar template URL from user-entered event fields.
   - Opens Google Calendar for explicit user review/save.
   - Does not call `events.insert()` and does not hold OAuth credentials.
3. Academic note
   - Drafted in browser memory only.
   - Clipboard export by explicit user action.

## Governance Boundary
- Google Drive remains the binary source of truth when storage integration is later activated.
- HEPE metadata remains governed separately from the public site.
- Upload preview cannot admit evidence or create canonical course/person/teaching records.
- Calendar draft cannot expose private calendar data on the public site.
- Later authenticated integrations require their own authorization and security gate.

## Regression Gate
Before merge:
- Jekyll build must succeed.
- Static asset paths must resolve under GitHub Pages.
- No secrets/private metadata may appear in the diff.
- Command Center must remain responsive and keyboard-accessible at source level.

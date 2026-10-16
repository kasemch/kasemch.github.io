# ARM Job Scout v3 — Preservation Manifest

Source baseline: `arm-job-scout-v25-safety-baseline` / `arm-jobs/index.html`
Baseline blob SHA: `d8bf206138e834aac5943f51694d3e7fe845914a`

## Must preserve before production promotion
- Opportunity Market taxonomy and all current job records
- Dynamic Job Interests (`/interests`) behavior
- CV Builder and its existing localStorage compatibility
- Application Tracker and its existing localStorage compatibility
- Print / Save PDF behavior
- Direct source links
- Evidence-first match/gap language
- Mobile behavior

## Baseline counts to reconcile
- Best/High Match: 3
- Worth Considering: 4
- New Leads: 7
- Lower Match: 5
- Verified Open: 12
- Total Visible: 19
- Closed: 1

## Analytics gate
Backend `armstats` synthetic write is verified. Frontend instrumentation must remain privacy-first and must not collect name, email, phone, CV content, IP, full user-agent, or full referrer URL. Synthetic visitor IDs are excluded from owner metrics.

## Promotion rule
No production merge until functionality preservation, mobile QA, data reconciliation, analytics verification, privacy/security audit, and human visual acceptance all pass.

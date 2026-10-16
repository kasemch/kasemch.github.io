# ARM Job Scout Analytics Collector

Status: backend source staging only; not loaded by the public page until the collector endpoint passes verification.

Privacy baseline:
- first-party anonymous analytics only
- no IP address, name, email, phone, CV content, or other applicant PII stored by the application
- page allowlist: `/arm-jobs/`
- production origin allowlist: `https://kasemch.github.io`
- database credentials must remain server-side environment variables

Metrics:
- total page views
- approximate unique anonymous visitors/sessions based on an opaque browser-generated identifier

Database target: existing `public.page_visits` table in the `arm-job-scout` Neon project.

Deployment gate: do not instrument `arm-jobs/index.html` until POST `/visit` has been tested and a synthetic event is verified in the database.
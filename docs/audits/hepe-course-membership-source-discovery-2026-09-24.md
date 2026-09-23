# HEPE Fast TQF Portal — Course Membership Source Discovery

Date: 2026-09-24
Environment: NON-PRODUCTION
Status: PASS WITH EVIDENCE LIMITATION

## Objective

Find controlled sources for course membership of the three programmes not yet active in the HEPE Fast TQF runtime.

Target:
- CUR-001 — M.Ed. Physical Education and Sport
- CUR-002 — B.Ed. Physical Education
- CUR-004 — B.Sc. Applied Sport Science

## Result

No canonical curriculum-book/TQF2 source suitable for direct course-membership activation was identified for CUR-002 or CUR-004 in the current Drive search.

For CUR-001, several supporting files were located that explicitly state they were derived from the M.Ed. Physical Education and Sport TQF2 and contain RPE course data. One supporting system document states that the programme contains 25 courses.

These files were registered as `DERIVED_FROM_CURRICULUM / SUPPORTING_ONLY` and are explicitly marked `canonical_for_course_membership = false`.

## Backend actions

Created controlled source-discovery table:
`public.hepe_programme_source_candidates`

Governance:
- RLS enabled;
- no normal client policies;
- supporting files cannot activate programme/course membership;
- canonical curriculum evidence remains required.

Recorded supporting candidates for CUR-001:
- `15q2vvkE0z13Os3eKot69CgYncuWqmneS`
- `1IIOcbHJDSDDyrBVfMRVfCTeWz8TdgqGQyrvF0TlurDg`
- `1JyEGqujnUs-fooz1GIS_obgF24rafxF_IQkT-k7EE-o`

## Gate status

- Programme identity: 4/4 verified
- Course membership active: 1/4
- CUR-001: SUPPORTING EVIDENCE FOUND — CANONICAL SOURCE STILL REQUIRED
- CUR-002: CANONICAL SOURCE NOT FOUND
- CUR-004: CANONICAL SOURCE NOT FOUND

## Stop condition

Do not activate CUR-001, CUR-002 or CUR-004 until a controlled curriculum book/TQF2 or equivalent authoritative course-list source is identified and verified.

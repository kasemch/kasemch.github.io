# HEPE Instructor Registry Auto-Enrichment v1

Date: 2026-09-24  
Environment: NON-PRODUCTION / CONTROLLED PILOT  
Status: ACTIVE BACKEND BASELINE

## Objective

Enrich instructor registry records automatically from evidence-backed internal sources without fabricating names, email addresses, identity bindings, or authority.

## Rules

- Never infer an email address from a person's name.
- Keep authentication identity separate from academic-person identity.
- Never create account binding automatically.
- Never create academic authority automatically from an email match.
- Exact verified email + authenticated account creates only an ACCOUNT_MATCH_CANDIDATE.
- Multiple emails or multiple bindings require REVIEW_REQUIRED.
- Missing evidence remains EMAIL_MISSING.

## Sources used

1. public.academic_people
2. public.academic_person_contacts
3. public.academic_person_actor_bindings
4. auth.users
5. RU-HEPE Google Sheets Master — sheet 50_User_Access
6. Existing controlled HEPE instructor/curriculum sources

## Data actions completed

- Added evidence registry: public.hepe_instructor_enrichment_evidence
- Added live enrichment read model: public.v_hepe_instructor_enrichment_status
- Extended instructor registry RPC with enrichment status and summary
- Imported a verified institutional email for Thanida Bhasavanija from the controlled RU-HEPE 50_User_Access source
- Created evidence queue rows for current instructor records

## Current status counts

- ACCOUNT_BOUND: 1
- EMAIL_VERIFIED: 4
- EMAIL_UNVERIFIED: 5
- EMAIL_MISSING: 20
- ACCOUNT_MATCH_CANDIDATE: 0
- REVIEW_REQUIRED: 0

## Pilot note

Orachulee Nirasornp remains EMAIL_MISSING / account unbound. No email was inferred or fabricated.

## Next valid enrichment actions

1. Ingest additional controlled personnel/email sources when available.
2. Promote only exact evidence-backed contacts to VERIFIED.
3. When a verified email later matches an authenticated account, surface ACCOUNT_MATCH_CANDIDATE.
4. Require human confirmation before account binding.

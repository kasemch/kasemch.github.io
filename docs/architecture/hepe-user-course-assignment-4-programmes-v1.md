# HEPE Fast TQF Portal — User & Course Assignment Architecture v1

Date: 2026-09-24
Status: APPROVED DESIGN BASELINE — NON-PRODUCTION

## Objective

Provide one controlled administration surface for creating/binding HEPE users and assigning teaching responsibility across the Department's four active programmes, without equating authentication with academic authority.

## Programme scope

Target programme count: 4
Current programme count verified in the HEPE Fast TQF runtime catalog: 1

The administration UI MUST NOT hard-code programme names that are not yet present in the controlled programme catalog.
The remaining programmes must first be imported/verified in the authoritative programme catalog before assignment becomes active.

## Assignment model

Identity → HEPE Actor → Role → Authority Scope → Programme → Course → Academic Year → Term → Assignment Status

Authentication alone grants no course editing or review authority.

## Supported programme behavior

The UI shall:
1. Load all active department programmes from the controlled programme catalog.
2. Display four programme cards when all four active programmes are verified.
3. Filter courses by selected programme membership.
4. Permit one actor to hold assignments in multiple programmes and multiple courses.
5. Keep teaching responsibility separate from programme-level review/publication authority.
6. Fail closed when a programme/course is not in the controlled catalog.

## Minimum user administration flow

1. User signs in once with Google/Magic Link.
2. Administrator searches authenticated identity by email.
3. Create or bind HEPE actor.
4. Assign base role (e.g. INSTRUCTOR).
5. Select one or more active programmes.
6. Select course(s) available in each programme.
7. Select academic year and term.
8. Set assignment role and ACTIVE/INACTIVE status.
9. Save controlled assignment.
10. Re-login/refresh and validate course access.

## Recommended assignment roles

- INSTRUCTOR
- COURSE_COORDINATOR
- PROGRAMME_REVIEWER
- PROGRAMME_CHAIR

Role names do not themselves imply institutional authority. Every privileged action must still satisfy the relevant authority assignment.

## Admin UI fields

### User
- Full name
- Email / authenticated identity
- HEPE actor status

### Assignment
- Programme
- Course
- Academic year
- Term
- Assignment role
- Active from
- Active until (optional)
- Status

### Authority
- Allowed actions
- Authority scope
- Authority source/evidence
- Approval status

## Four-programme readiness gate

A programme becomes ASSIGNMENT_READY only when:
- programme exists in controlled programme catalog;
- curriculum version is identified;
- course membership is loaded;
- course descriptions/provenance are available according to portal rules;
- responsibility source can reference programme/course keys;
- required RLS/authority policies are present.

## Current state

PROGRAMME_1: VERIFIED_IN_RUNTIME
PROGRAMME_2: PENDING_CATALOG_VERIFICATION
PROGRAMME_3: PENDING_CATALOG_VERIFICATION
PROGRAMME_4: PENDING_CATALOG_VERIFICATION

Overall: PARTIAL — ARCHITECTURE READY, CATALOG EXPANSION REQUIRED

## Non-production boundary

This design does not authorize institutional production.
Do not fabricate programme membership, course ownership, or academic authority.

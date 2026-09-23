# HEPE Fast TQF Portal — Pilot Readiness Gate

Date: 2026-09-24  
Status: CONTROLLED PILOT PREPARATION  
Environment: NON-PRODUCTION / HEPE Sandbox

## Purpose

Validate that an authorized lecturer can complete the essential HEPE Fast TQF workflow without developer intervention:

Login → Programme/Course Selection → Working TQF3 → Save → Human Review → Controlled Export

## Governance boundary

- This gate does not convert the system to institutional production.
- Institutional official claim remains false.
- Public release workflow and sandbox authoring workflow remain distinct.
- R1/R2 public release artifacts remain immutable.
- R3 remains at its separate Evidence Gate unless real substantive academic change is supplied.
- Pilot activity must not be interpreted as institutional approval.

## Pilot users

Recommended initial cohort: 2–5 authorized lecturers.

Use only users with known identity and explicit role/authority mapping in the HEPE sandbox.

## Acceptance scenarios

### P1 — Authentication
PASS when user can sign in and reach the portal with a valid HEPE sandbox identity.

### P2 — Programme and course selection
PASS when user can select programme, academic year, term and an in-scope HED/PED course and the correct course context loads.

### P3 — Canonical source display
PASS when curriculum-controlled fields are displayed read-only with provenance and are not silently overwritten by working content.

### P4 — Working TQF3 editing
PASS when the user can edit working-layer fields, including course objectives/CLOs and related working mappings, without mutating canonical curriculum data.

### P5 — Save and recovery
PASS when the working draft can be saved and restored/reloaded without loss of user-entered content.

### P6 — Evidence and provenance
PASS when evidence/provenance indicators are visible and missing evidence is surfaced rather than fabricated.

### P7 — Human review boundary
PASS when review actions require appropriate authority and the system does not equate AI output with human approval.

### P8 — Export boundary
PASS when controlled export is available only after its required review/readiness gates and clearly states non-production/project-controlled scope where applicable.

### P9 — Failure handling
PASS when missing offering, insufficient authority, missing evidence or other blocked states show understandable messages and fail closed.

### P10 — Mobile usability
PASS when core workflow is usable on phone/tablet without critical controls becoming unreachable.

## Evidence to capture

For each pilot user/session collect only the minimum necessary:

- anonymized pilot user label;
- device/browser class;
- scenario P1–P10 status;
- blockers;
- user-visible error message;
- whether developer intervention was required;
- suggested UI improvement;
- final session result.

Do not publish personal identifiers, internal actor IDs or restricted audit payloads.

## Release decision after pilot

Pilot completion does not automatically authorize production.

After pilot, classify result as one of:

- PASS — READY FOR CONTROLLED PILOT EXPANSION
- PASS WITH CONDITIONS — FIX REQUIRED BEFORE EXPANSION
- FAIL — RETURN TO SANDBOX HARDENING

Institutional production requires a separate authority and production-readiness decision.

## Current gate status

READY_TO_EXECUTE_CONTROLLED_PILOT

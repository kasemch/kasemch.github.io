# HEPE Fast TQF Portal — Pilot Run 01

Date: 2026-09-24  
Environment: NON-PRODUCTION / CONTROLLED PILOT  
Pilot code: `HEPE-PILOT-RUN-01`

## Pilot target

- Programme: B.Ed. Health Education and Physical Education
- Programme code: `25510071103503`
- Course: `HED2503`
- Academic year / term: `2569/1`
- Lead user: current governed HEPE lead account
- Co-instructor: PENDING HUMAN SELECTION

## Purpose

Validate one real end-to-end teaching-team workflow before expanding pilot access.

## Scenarios

1. P1 Authentication
2. P2 Course access
3. P3 Teaching Team assignment
4. P4 Co-instructor account binding
5. P5 Working TQF edit
6. P6 Save/recovery
7. P7 Authority boundary
8. P8 Export boundary
9. P9 Mobile usability
10. P10 Audit trace

## Current state

`READY_FOR_CO_INSTRUCTOR_SELECTION`

Only blocker:
`CO_INSTRUCTOR_NOT_SELECTED`

## Governance

- Pilot does not authorize institutional production.
- Co-instructor selection must come from an identified academic person; do not infer or auto-select.
- A co-instructor without verified account binding may be recorded as teaching-team member but must not receive edit authority.
- A bound co-instructor receives preparation/edit authority only; review/approve/publish authority is not implied.
- R1/R2 public release immutability remains unchanged.

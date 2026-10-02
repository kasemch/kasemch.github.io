# Phase 05 — Controlled functional QA and acceptance checklist

Status: CODE UPDATED; empirical browser/device acceptance NOT YET VERIFIED. Never treat this checklist as a passed test report.

## Synthetic fixture only (do not import into published register)
Use synthetic person IDs P-A, P-B and works W-A, W-B in a disposable local copy:
- P-A belongs to bed-pe and bed-hepe (two overlapping VERIFIED membership rows).
- P-B belongs to med-pes.
- W-A attributed to bed-pe and bed-hepe (same work ID in both).
- W-B attributed to med-pes.
- One SOURCE_FOUND work, one EVIDENCE_CONFLICT membership, one missing publication date.
- Approved synthetic academic year 2568 from 2025-06-01 to 2026-05-31.
- No records of real lecturers in fixture.

## Expected assertions
1. Department total = 2 distinct persons (not 3 membership rows).
2. Department publication total = 2 distinct work IDs (not 3 programme links).
3. bed-pe and bed-hepe each show the shared person/work in their own programme view.
4. SOURCE_FOUND and EVIDENCE_CONFLICT never enter verified totals.
5. Calendar 2568 = 2025-01-01 to 2025-12-31; fiscal 2569 = 2025-10-01 to 2026-09-30.
6. Academic year with no VERIFIED boundary displays unknown and refuses CSV export.
7. Missing registry dimensions show a dash rather than zero; verified empty query results may show zero.
8. Invalid publication dates (including impossible dates) do not enter totals.
9. CSV cells beginning with spreadsheet formula characters must be escaped; HTML text is escaped.
10. Both mobile (375px) and desktop layouts, keyboard navigation, download and print must be tested on actual devices.

## Two distinct staff reporting definitions
The current dashboard counts **unique persons who held a confirmed membership at any time during the selected interval**. This is NOT the same as headcount on the closing date, monthly average FTE, teaching staff count, or an eligibility verdict. Do not describe this number as a year-end staffing snapshot in SAR.

A future approved snapshot report must take the actual effective membership at the report reference date and apply its separate criterion. Past/future name substitutions require a formal evidence record.

## Counting caveat
Publication counts are works, not authorship credits. A verified publication linked to more than one programme counts once at department level and may appear under each programme. Shared works must retain provenance and attribution authority.

## Human acceptance gates
- Authoritative rosters for all four programmes and superseding amendments.
- Academic-year calendar authorization.
- Journal/DOI checks and author identity reconciliation.
- Private/public release scope.
- Visual and real-device acceptance, then merge approval.

Until these are satisfied: PR stays draft and registry contains no real records.

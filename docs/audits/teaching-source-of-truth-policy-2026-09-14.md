# Teaching Source-of-Truth Policy — 14 September 2026

## Purpose
This note records the evidence hierarchy used for the public Teaching page after reconciliation with the Ramkhamhaeng University central MR30 schedule source and the HEPE Curriculum Governance & Development data environment.

## Source hierarchy
1. Ramkhamhaeng University central MR30 schedule (official registrar source) — primary timetable authority when directly retrievable.
2. Verified semester teaching-load / MR30-derived reports with traceable provenance — operational fallback when the live registrar page cannot be retrieved by the current audit environment.
3. Course-level TQF3, TQF5 and achievement-verification documents — used for course-quality links and document status, not as the primary timetable authority when they conflict with MR30 evidence.
4. HEPE canonical active records — supporting curriculum identity and governance context only.
5. HEPE validation/reconciliation datasets, including SOURCEB-VALIDATION records — reconciliation-only; never used as standalone public evidence for active curriculum membership or teaching assignment.

## Current evidence status
The official central MR30 page is:
https://www.regis.ru.ac.th/index.php/schedule/mr30_central

The audit environment attempted direct retrieval on 14 September 2026 but the registrar endpoint timed out, and indexed search results did not expose the required Semester 1/2569 course rows. Therefore the public Teaching page does not claim a fresh direct scrape of the official MR30 page.

The current Semester 1/2569 public teaching register remains based on the previously reconciled teaching-load / MR30-derived evidence set. It contains 11 regular course codes mapped to 8 weekly teaching slots, plus one separate RAM1142 special lecture.

## HEPE clarification
A prior review surfaced PED1101 and HED3505 from HEPE records under curriculum version `2567-SOURCEB-VALIDATION` with `is_active = false`. These records are not treated as canonical active HEPE curriculum evidence and must not be used to infer public teaching assignments or active curriculum membership.

## Public rule
The Teaching page must distinguish:
- Teaching assignment evidence,
- Curriculum/course identity evidence,
- Course-quality document evidence,
- Draft/planned verification evidence.

No Semester 2/2569 teaching assignment is published until an authoritative assignment or MR30/teaching-load source links the instructor to that course.

# Evidence reconciliation gate — 24 September 2026

Status: NON-PRODUCTION / NO ROSTER PROMOTION / NO PUBLICATION APPROVAL.

## Scope
Four distinct programmes: B.Ed. PE (2567), B.Ed. Health Education and PE (2567), B.Sc. Applied Sport Science (2565), M.Ed. PE and Sport.

## Findings requiring reconciliation
- A candidate HEPE programme/staff spreadsheet describes names and roles using a historical curriculum snapshot, and its own current-status fields remain awaiting confirmation.
- A working 2568 HEPE SAR reports a programme-wide count of 5 in one dataset, whereas another section mentions 6. Treat as a **source conflict**, not as an approved count.
- An academic-year boundary mentioned in a draft report must not automatically become an authoritative calendar configuration.
- Teaching assignments in a course-staff sheet do not prove appointment as programme-responsible academic staff.
- Publication landing pages evidence an article's metadata, not programme appointment or compliance. Publication dates and author identity must be independently resolved.

## Release controls
1. Confirm authoritative approved curriculum edition, effective period and amendments for each of four programmes; record document owner, page and decision/effective date in a restricted evidence store.
2. Reconcile superseding staff changes against programme rosters; preserve historical memberships as time ranges.
3. Match each claimed work against ThaiJO landing page / DOI / publisher and resolve name collisions.
4. Confirm publication type and applicable indexing in the *year published*; do not import journal status from a different year.
5. Resolve current-vs-historical conflicts with human approval; do not automatically promote a SAR claim into roster authority.
6. Publish only independently confirmed, public-safe fields after a separate release decision.

## Public branch data rule
The JSON register remains empty until the six controls are fulfilled. Empty data is not evidence of zero staff or zero publications. Keep source documents, private evidence URLs, identity keys and unpublished manuscripts out of this public repository.

## QA checks still needed before release
- Verify GitHub Pages path and HTTP response on controlled preview.
- Confirm mobile layout, keyboard input, and print/CSV behavior with approved synthetic fixtures.
- Test duplicates across programmes, unknown academic-year windows, and contradictory source records.
- Approve non-production visibility and review draft PR before merging.

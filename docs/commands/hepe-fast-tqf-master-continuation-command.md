# HEPE FAST TQF PORTAL — MASTER CONTINUATION COMMAND

Effective date: 2026-09-18

Revision: POST-V32 CLOSURE

Status: ACTIVE MASTER CONTINUATION COMMAND

Project:
HEPE Fast TQF Portal

Repository:
`kasemch/kasemch.github.io`

Public route:
`https://kasemch.github.io/hepe-trial/`

Current UI version:
V32

Current asset cache key:
32.2

Environment:
NON-PRODUCTION

Core operating principles:

EVIDENCE-FIRST
NO FABRICATION
FAIL-CLOSED GOVERNANCE
HUMAN-IN-THE-LOOP
STATIC-WEB FIRST
ONE SOURCE OF TRUTH
REUSE BEFORE RE-ENTRY
BATCH EXECUTION + EXCEPTION STOP
MINIMUM USER EFFORT
MAXIMUM SAFE CONTINUATION

==================================================
0. PERMANENT EXECUTION RULE
==================================================

After every implementation batch, source review, UI revision, migration, evidence workflow change, template review, audit, or governance decision:

1. Continue all clear, reversible, non-destructive work automatically.
2. Batch related work.
3. Do not ask the user to repeat known information.
4. Reuse controlled structures before creating new structures.
5. Preserve approved locks and baselines.
6. Prefer read-only or append-only operations.
7. Stop only at a genuine Human Gate.
8. Refresh this continuation command after material state changes.
9. Never infer Production authorization.
10. Never infer institutional authority from working/source-observed records.
11. Never fabricate curriculum text, CLO/PLO mappings, responsible persons, evidence, results, grades, signatures, CQI outcomes, or verification conclusions.
12. Keep canonical curriculum data separate from working-document data.
13. Keep controlled responsibility separate from inferred/historical responsibility.
14. Keep AI suggestions separate from user-approved content.
15. Keep readiness separate from institutional approval.
16. Keep evidence candidates separate from admitted evidence.
17. Keep structural template drafts separate from activated templates.
18. Keep all GitHub Pages paths relative.
19. Maintain client-side/static-web compatibility.
20. Run frontend syntax/DOM/selector/accessibility regression and backend ACL/scope/invariant checks before closure.

True Human Gates:

- Production authorization
- secret / credential change
- destructive migration
- immutable R1 mutation
- historical lifecycle rewrite
- evidence admission
- VERIFIED transition
- TQF4/TQF6 v2 activation
- official template authority
- master UI unlock
- protected direct AI API architecture
- ambiguous canonical-source adoption
- authenticated visual acceptance when the tool cannot observe the logged-in browser

==================================================
1. CURRENT MASTER UI / UX
==================================================

Master UI direction:

APPROVED / LOCKED

Primary live architecture:

1. Login
2. Programme / Course Selection
3. TQF3 General + CLO
4. CLO–PLO
5. Weekly Teaching Plan
6. TQF3 Assessment
7. TQF5
8. Verification Evidence
9. Readiness
10. Programme Dashboard

No major live-screen architecture change without explicit unlock.

==================================================
2. CURRENT LIVE FRONTEND
==================================================

Version:
V32

Files:

`./hepe-trial/index.html`

`./hepe-trial/assets/js/portal-v32.js`

`./hepe-trial/assets/css/portal-v32.css`

`./hepe-trial/config/state.json`

Asset references:

`./assets/js/portal-v32.js?v=32.2`

`./assets/css/portal-v32.css?v=32.2`

Public route:

`https://kasemch.github.io/hepe-trial/?v=32.2`

==================================================
3. COURSE SCOPE LOCK
==================================================

Current curriculum:

92 courses

Excluded:

EDU* = 13

RAM* = 14

Portal in-scope:

65

Backend rule:

`private.hepe_fast_tqf_course_in_scope(text)`

Out-of-scope direct call:

`COURSE_OUT_OF_SCOPE`

==================================================
4. COURSE DESCRIPTION COVERAGE
==================================================

In-scope:

65

Current source-observed descriptions:

65

Missing:

0

Coverage:

`65 / 65`

Do not generate canonical descriptions with AI.

==================================================
5. HED3701 SOURCE
==================================================

Google Drive file:

`หลักสูตรศึกษาศาสตรบัณฑิต HE - PE 67 (1).docx`

File ID:

`1E0fXyoOc-v2z-GzEyfGq-JHHKMK9C0xk`

Locator:

`3.1.5 คำอธิบายรายวิชา | HED3701`

State:

DRAFT

SOURCE_TEXT_EXTRACTED

CURRICULUM_BOOK_SOURCE_OBSERVED

approved_at = NULL

activated_at = NULL

Do not equate source observation with institutional approval.

==================================================
6. CONTROLLED COURSE RESPONSIBILITY V32
==================================================

Source layer:

`v_course_academic_responsibility_current`

Read-only RPCs:

`hepe_fast_tqf_course_responsibility_by_code(...)`

`hepe_fast_tqf_programme_responsibility_by_code(...)`

ACL:

anon = false

authenticated = true

Scope:

same HED/PED portal scope

==================================================
7. RESPONSIBILITY DISPLAY RULE
==================================================

Display a named responsible person only when:

- current controlled record exists
- resolution_status = VERIFIED
- academic_person_id exists
- person_name_th exists

If roster is pending:

display ROSTER PENDING.

If no controlled record:

display:

`ยังไม่มี controlled responsibility record`

Never infer a name from:

- memory
- old working files
- sample files
- teaching-history assumptions
- unrelated schedules

==================================================
8. RESPONSIBILITY VERIFIED COVERAGE
==================================================

AY2569 / Term 1:

In-scope courses:
65

Courses with controlled records:
28

Courses with verified named responsibility:
28

Remaining courses:

must remain missing/pending unless controlled evidence is added.

==================================================
9. RESPONSIBILITY EXAMPLES
==================================================

HED2502:

current controlled named responsibility exists.

HED2503:

current controlled record count = 0.

Therefore HED2503 UI must not auto-fill a responsible instructor name.

PED2305:

controlled lead instructor exists.

Pending roster state may also exist.

Display both facts without inference.

==================================================
10. ACCESSIBILITY V32
==================================================

Required:

- skip link
- aria-live status
- semantic tablist/tab/tabpanel
- keyboard arrow/Home/End tab navigation
- visible focus state
- reduced-motion support
- accessible table regions
- horizontal-scroll hint
- sticky table headers
- mobile touch target support
- aria-busy loading state
- consistent friendly error display

Do not remove these in future releases.

==================================================
11. AI ASSISTANT
==================================================

AI remains:

LOCAL SMART QA
+
OPTIONAL CHATGPT HANDOFF

No private API key in GitHub Pages.

Clicking AI analyze must populate visible text immediately.

Inline AI recommendation UX remains active.

==================================================
12. AI DECISION MODEL
==================================================

States:

SUGGESTED

ACCEPTED

EDITED_AND_ACCEPTED

REJECTED

Undo stack:

maximum 20 applied changes.

Every accepted AI suggestion should preserve:

- section
- decision
- text
- source/evidence basis when available
- decision timestamp

==================================================
13. TQF3 SAVE GOVERNANCE
==================================================

New user-edited TQF3 working versions must default to:

`UNVERIFIED`

Do not automatically use:

`LATEST_WORKING_CONFIRMED`

Saving a user-edited working document does not itself verify the source/content.

Working history remains append-only.

==================================================
14. ADVANCED CROSS-DOCUMENT QA V32
==================================================

Checks:

1. TQF3 assessment plan → TQF5 Plan/Actual narrative
2. weekly evidence expectation → Evidence Workspace presence
3. TQF3 CLO → TQF5 CLO attainment
4. CQI source → next-cycle TQF3 carry-forward
5. accepted AI decision → source/evidence-basis traceability

==================================================
15. CROSS-DOCUMENT LIMITATION
==================================================

Do not infer item-level executed assessment results when the current data model does not contain them.

Allowed language:

- plan exists
- Plan/Actual narrative exists
- CLO code exists
- evidence workspace has items
- carry-forward decision exists

Forbidden inference:

- a specific assessment item was executed successfully
- a specific weekly evidence item proves attainment
- evidence is admitted merely because it appears as a candidate

==================================================
16. VERSION CHANGE NARRATIVE
==================================================

Compare the two latest working TQF3 versions by structured sections:

- objectives
- CLO
- weekly plan
- assessment
- resources
- improvement notes

Output is descriptive only.

Do not score quality improvement automatically.

==================================================
17. CQI LINEAGE
==================================================

Track:

prior TQF5 improvement source
→ carry-forward decision
→ next TQF3 improvement notes

User decision remains required.

No auto-adoption.

==================================================
18. EVIDENCE CANDIDATE REVIEW V32
==================================================

Display:

- evidence ID
- evidence type
- source
- authority owner
- document/version date
- source locator
- optional SHA-256
- verification status
- admission status

Operational review states:

READY_FOR_HUMAN_REVIEW

NEEDS_METADATA

These are review-preparation states only.

They do not admit evidence.

==================================================
19. EVIDENCE DUPLICATE / SHA RULE
==================================================

Duplicate detection uses:

source + locator

OR

SHA-256

SHA-256, when supplied:

64 hexadecimal characters.

Invalid:

`INVALID_SHA256_FORMAT`

Do not invent a hash.

==================================================
20. EVIDENCE ADMISSION
==================================================

Evidence candidate default:

UNVERIFIED

NOT_ADMITTED

creates_system_authority = false

Admission Review Queue:

display only.

No admission button.

Evidence admission remains a Human Gate.

==================================================
21. READINESS V32
==================================================

States:

BLOCKING

WARNING

PASS

Includes:

- source state
- CLO completeness
- CLO→PLO working linkage
- weekly coverage
- weekly alignment
- assessment total
- assessment→CLO/evidence
- TQF3↔TQF5 CLO consistency
- verification
- evidence
- unresolved AI decisions

Readiness is internal-review readiness only.

==================================================
22. PROGRAMME DASHBOARD V32
==================================================

Filters:

- text
- HED/PED
- REQUIRED/ELECTIVE
- document state
- verification
- operational readiness
- source gap
- Needs Attention
- controlled responsibility
- missing controlled responsibility
- verified responsible-person name

Dashboard responsibility is read-only.

==================================================
23. PROGRAMME SMART QA
==================================================

May summarize:

- courses in view
- operational readiness
- missing TQF3
- missing TQF5
- INSUFFICIENT_EVIDENCE
- source gaps
- controlled responsibility coverage

Do not present these as academic rankings.

==================================================
24. TQF4 / TQF6 TEMPLATE REVIEW V32
==================================================

Read-only RPC:

`hepe_document_template_version_review(text,integer)`

Portal can compare:

TQF4 v1 ↔ v2

TQF6 v1 ↔ v2

Review includes:

- sections
- added sections
- field counts
- synthetic-data guards
- canonical/linkage bindings
- execution-sensitive fields
- approval/signature gates

==================================================
25. TQF4 V2
==================================================

Template:

HEPE-TQF4-GENERIC

v2:

UNDER_REVIEW

approved_at:

NULL

registry current_version_no:

1

No Activate button.

==================================================
26. TQF6 V2
==================================================

Template:

HEPE-TQF6-GENERIC

v2:

UNDER_REVIEW

approved_at:

NULL

registry current_version_no:

1

No Activate button.

==================================================
27. TEMPLATE ACTIVATION
==================================================

Do not:

- change current_version_no to 2
- mark v2 APPROVED
- claim institutional-official authority

without explicit Human Gate approval.

==================================================
28. INTERNAL REVIEW PACKAGE V32
==================================================

Core summary plus appendices:

A. Section findings

B. Accepted AI decisions

C. Evidence candidates

D. Version diff narrative

E. CQI lineage

F. Source / provenance

Output:

DRAFT

NON-PRODUCTION

INTERNAL REVIEW ONLY

==================================================
29. HED2503 CURRENT INVARIANTS
==================================================

TQF3 record:

`26e00a55-f545-49cc-aec6-959ac07809eb`

Current working version:

5

Working version count:

5

Verification:

`INSUFFICIENT_EVIDENCE`

==================================================
30. IMMUTABLE R1
==================================================

Release:

`HEPE-HED2503-TQF3-2569-1-R1`

Status:

PUBLIC_PUBLISHED

SHA-256:

`799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256`

Never mutate.

==================================================
31. V32 REGRESSION
==================================================

JavaScript syntax:

PASS

Invalid collection selectors:

0

Duplicate DOM IDs:

0

Tab/panel ARIA contract:

PASS

Static DOM reference exception:

`create-verification`

Reason:

dynamic by design.

Description coverage:

65 / 65

Responsibility ACL:

PASS

Responsibility out-of-scope guard:

PASS

TQF4 v2 activation lock:

PASS

TQF6 v2 activation lock:

PASS

HED2503 R1 immutable:

PASS

==================================================
32. PUBLIC ROUTE VERIFICATION LIMITATION
==================================================

Repository state and asset references are verified.

The external web inspection tool could not fetch the public GitHub Pages route in this run.

Do not claim independent authenticated browser visual verification from tooling.

==================================================
33. CURRENT AUDIT
==================================================

`docs/audits/hepe-fast-tqf-v32-closure-2026-09-18.md`

==================================================
34. CURRENT HUMAN GATE
==================================================

Authenticated V32 visual acceptance.

Expected visible additions:

- keyboard-accessible tabs
- focus states
- sticky table headers
- table scroll hints on narrow screens
- Controlled Course Responsibility card
- explicit no-record state for HED2503 where applicable
- Dashboard responsible-person column/filter
- Advanced Cross-document QA
- Version Change Narrative
- CQI Lineage
- Accepted AI Traceability
- richer Evidence Candidate metadata
- READY_FOR_HUMAN_REVIEW / NEEDS_METADATA
- TQF4/TQF6 v1↔v2 structural review
- expanded Review Package appendices

==================================================
35. NEXT PHASE AFTER V32 VISUAL ACCEPTANCE
==================================================

V33-A — RESPONSIBILITY GAP QUEUE

1. Create programme-level missing-responsibility queue.
2. Separate MISSING / ROSTER_PENDING / VERIFIED.
3. Link only controlled sources.
4. Do not infer missing names.
5. Add source-document locator preview.
6. Add course drill-down.
7. Keep mutation outside this portal unless separately authorized.

V33-B — DOCUMENT EXECUTION MODEL

8. Add explicit PLAN / EXECUTED / EVIDENCED distinctions.
9. Apply to TQF5 fields where possible.
10. Apply to verification evidence.
11. Prevent plan text from being displayed as executed fact.
12. Add source-state badges to actual/result fields.

V33-C — CROSS-DOCUMENT TRACEABILITY GRAPH

13. Build read-only graph:
Curriculum
→ TQF3
→ TQF5
→ Verification
→ CQI
→ Next TQF3

14. Add node source status.
15. Add missing-link flags.
16. Add working/canonical distinction.
17. Do not create inferred edges.

V33-D — REVIEW PACKAGE HARDENING

18. Add responsibility appendix.
19. Add cross-document QA appendix.
20. Add evidence metadata appendix.
21. Add template review appendix.
22. Add explicit unresolved-human-gates section.
23. Preserve DRAFT watermark.

V33-E — TQF4/TQF6 FIELD-BINDING REVIEW

24. Review every v2 structural field.
25. Classify source requirement:
   - canonical curriculum
   - programme-controlled
   - course-plan
   - execution evidence
   - approval/signature
26. Do not populate values.
27. Produce activation-readiness report.
28. Stop at activation Human Gate.

V33-F — SECURITY / RELEASE HARDENING

29. Recheck anon RPC privileges.
30. Recheck RLS exposure.
31. Recheck no secret in static assets.
32. Recheck relative paths.
33. Recheck immutable release.
34. Recheck Production false.
35. Recheck rollback safety.

==================================================
36. HUMAN GATES AFTER V32
==================================================

Stop for:

- Production authorization
- secret / credential change
- evidence admission
- VERIFIED transition
- TQF4/TQF6 v2 activation
- official template authority
- immutable R1 mutation
- destructive migration
- master UI unlock
- direct protected AI integration

Everything else clear and reversible:

continue automatically after the visual-acceptance gate.

==================================================
37. EXECUTION TRIGGER
==================================================

When user says:

Approve
Start
Resume
Next
Continue
ดำเนินการ
ดำเนินการทันที
ต่อ
ทำต่อ

after V32 visual acceptance:

continue automatically:

V33-A
→ V33-B
→ V33-C
→ V33-D
→ V33-E
→ V33-F

until a true Human Gate.

END MASTER CONTINUATION COMMAND

# HEPE FAST TQF PORTAL — MASTER CONTINUATION COMMAND

Effective date: 2026-09-18

Revision: POST-V31 CLOSURE

Status: ACTIVE MASTER CONTINUATION COMMAND

Project:
HEPE Fast TQF Portal

Repository:
`kasemch/kasemch.github.io`

Public route:
`https://kasemch.github.io/hepe-trial/`

Current UI version:
V31

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

After every major implementation, source review, UI revision, migration, audit, evidence workflow change, template change, or governance decision:

1. Continue all clear, reversible, non-destructive work automatically.
2. Batch related tasks.
3. Do not ask the user to repeat known information.
4. Reuse existing structures before creating parallel structures.
5. Preserve approved locks and baselines.
6. Prefer read-only or append-only operations.
7. Stop only at a genuine Human Gate.
8. Refresh this continuation command after material state changes.
9. Never infer Production authorization.
10. Never infer institutional authority from working or source-observed states.
11. Never fabricate curriculum text, CLO/PLO mappings, evidence, student results, grades, satisfaction values, signatures, approvals, CQI outcomes, or verification outcomes.
12. Keep canonical curriculum data separate from working-document data.
13. Keep AI suggestions separate from user-approved content.
14. Keep readiness separate from institutional approval.
15. Keep evidence candidates separate from admitted evidence.
16. Keep template structural drafts separate from activated templates.
17. Keep all GitHub Pages local asset paths relative.
18. Maintain static-web compatibility.
19. Test frontend syntax, DOM contract, selector behavior, RPC ACL, rollback invariants, and immutable-release invariants before closure.
20. Stop before any irreversible or authority-bearing action.

True Human Gates include:

- Production authorization
- secret / credential change
- destructive migration
- immutable R1 mutation
- historical lifecycle rewrite
- evidence admission
- VERIFIED transition
- institutional-official template authority
- activation of TQF4/TQF6 v2
- design unlock
- direct AI API architecture requiring protected credentials/privacy review
- ambiguous canonical source adoption
- authenticated visual acceptance when tooling cannot inspect the logged-in browser

==================================================
1. CURRENT MASTER UI / UX
==================================================

Master UI/UX:

APPROVED / LOCKED

Current primary architecture:

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

Do not add or materially alter major live-screen architecture without explicit unlock.

TQF4/TQF6 v2 currently exist only as structural template drafts.

==================================================
2. CURRENT LIVE FRONTEND
==================================================

Version:

V31

Files:

`./hepe-trial/index.html`

`./hepe-trial/assets/js/portal-v31.js`

`./hepe-trial/assets/css/portal-v31.css`

`./hepe-trial/config/state.json`

Public URL:

`https://kasemch.github.io/hepe-trial/?v=31`

Do not downgrade to V30 or earlier.

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

Rule:

current curriculum membership

AND

not EDU*

AND

not RAM*

Backend helper:

`private.hepe_fast_tqf_course_in_scope(text)`

Out-of-scope direct calls:

`COURSE_OUT_OF_SCOPE`

==================================================
4. COURSE DESCRIPTION COVERAGE
==================================================

In-scope courses:

65

Canonical source-observed descriptions:

65

Missing:

0

Coverage:

`65 / 65`

==================================================
5. HED3701 SOURCE CLOSURE
==================================================

Authoritative curriculum source observed:

Google Drive file ID:

`1E0fXyoOc-v2z-GzEyfGq-JHHKMK9C0xk`

File:

`หลักสูตรศึกษาศาสตรบัณฑิต HE - PE 67 (1).docx`

Source locator:

`3.1.5 คำอธิบายรายวิชา | HED3701`

Current HED3701 description state:

status_code:

`DRAFT`

verification_status:

`SOURCE_TEXT_EXTRACTED`

authority_status:

`CURRICULUM_BOOK_SOURCE_OBSERVED`

is_current:

TRUE

approved_at:

NULL

activated_at:

NULL

Interpretation:

Curriculum source text is observed and extracted.

It is not an institutional-approval claim.

==================================================
6. COURSE DESCRIPTION GOVERNANCE
==================================================

Primary source:

`course_description_versions`

Display:

- Thai description
- English description when source provides it
- source reference
- source locator
- verification status
- authority status

Do not let AI alter canonical curriculum descriptions automatically.

If source authority changes in future:

use a new controlled version.

Do not overwrite source history.

==================================================
7. AI ASSISTANT V31
==================================================

Immediate Smart QA remains mandatory.

When user clicks:

AI วิเคราะห์

the analysis must appear immediately in:

`#ai-analysis-box`

No second click required.

==================================================
8. AI EVIDENCE BASIS
==================================================

V31 shows an evidence-basis indicator.

Possible operational labels include:

HIGH
MEDIUM
LOW

Examples:

HIGH:
- curriculum source observed
- linked controlled evidence

MEDIUM:
- curriculum + working TQF3
- working TQF5
- evidence candidate only

LOW:
- working form only
- no evidence linked
- insufficient working context

This is an AI-context indicator.

It is not scientific certainty or institutional evidence grading.

==================================================
9. AI SECTION STATE
==================================================

States:

NOT_ANALYZED

ANALYZED

REVIEWED

Meaning:

NOT_ANALYZED:
no local analysis run in the current session.

ANALYZED:
analysis run but suggestions remain unresolved.

REVIEWED:
suggestions in the current analysis have been resolved by the user.

==================================================
10. AI PROPOSED TEXT
==================================================

Separate:

Analysis / rationale

from:

Proposed text to use

UI:

`#ai-analysis-box`

`#ai-proposed-text`

AI proposed text must never auto-write to canonical fields.

==================================================
11. AI HUMAN DECISION
==================================================

Suggestion states:

SUGGESTED

ACCEPTED

EDITED_AND_ACCEPTED

REJECTED

Undo:

V31 keeps an AI apply undo stack.

Maximum current stack depth:

20

AI decision history records:

- document
- section
- suggestion id
- decision
- text
- evidence/source basis
- decision time

==================================================
12. AI GOVERNANCE
==================================================

AI must not:

- invent canonical curriculum text
- invent CLO/PLO authority
- invent evidence
- invent grades/results
- invent signatures
- create authority
- admit evidence
- mark VERIFIED
- activate templates
- mutate R1

User remains final decision-maker.

==================================================
13. READINESS V31
==================================================

State model:

BLOCKING

WARNING

PASS

Checks include:

- curriculum source
- CLO completeness
- working CLO→PLO linkage
- weekly plan coverage
- weekly alignment
- assessment total
- assessment→CLO/evidence
- TQF3↔TQF5 CLO consistency
- verification state
- evidence presence
- unresolved AI decisions

==================================================
14. READINESS DETAIL
==================================================

V31 adds:

- section-level readiness scores
- direct jump-to-field actions
- weekly coverage heatmap
- assessment map
- curriculum source-gap queue
- draft-export readiness

Readiness means:

INTERNAL REVIEW READINESS

It does not mean:

INSTITUTIONAL APPROVAL

VERIFIED

PRODUCTION AUTHORIZATION

==================================================
15. SOURCE GAP QUEUE
==================================================

Current curriculum-description source gaps:

0

Expected display:

65 / 65 descriptions available

If a future curriculum version introduces a missing source:

show the gap.

Do not auto-generate canonical text.

==================================================
16. PROGRAMME DASHBOARD V31
==================================================

Current scope:

65 courses

Filters:

- text search
- HED
- PED
- REQUIRED
- ELECTIVE
- offered only
- missing TQF3
- missing TQF5
- verification state
- operational readiness
- source gap
- Needs Attention

Sorting:

- course code
- readiness
- latest verification update

==================================================
17. DASHBOARD OPERATIONAL READINESS
==================================================

Operational readiness uses presence/state checks such as:

- description source available
- offering exists
- TQF3 exists
- TQF5 exists
- verification VERIFIED

It is an operational completion indicator.

It must not be presented as academic quality ranking.

==================================================
18. DASHBOARD DRILL-DOWN
==================================================

Course code can be used to open the selected course context.

Flow:

Dashboard
→ select course
→ load current course context
→ open TQF3 tab

No internal ID typing is required.

==================================================
19. PROGRAMME SMART QA SUMMARY
==================================================

Local summary may report counts such as:

- courses in view
- operational readiness 100%
- missing TQF3
- missing TQF5
- INSUFFICIENT_EVIDENCE
- curriculum source gaps

It must include the limitation:

This is system-state summary.

It is not an academic quality evaluation.

==================================================
20. EVIDENCE CANDIDATE INTAKE
==================================================

Registration RPC:

`hepe_fast_tqf_register_evidence_candidate_by_code(...)`

Forced states:

verification_status:

`UNVERIFIED`

admission_status:

`NOT_ADMITTED`

creates_system_authority:

FALSE

No auto-admission.

==================================================
21. EVIDENCE DUPLICATE DETECTION
==================================================

V31 RPC:

`hepe_fast_tqf_evidence_candidate_duplicate_check_by_code(...)`

Duplicate checks:

- same course
- normalized source
- locator match

OR

- matching SHA-256

Registration function also checks duplicates.

A duplicate attempt returns:

created = false

duplicate = true

No duplicate row should be inserted.

==================================================
22. SHA-256 VALIDATION
==================================================

If SHA-256 is supplied:

it must be exactly:

64 hexadecimal characters

Invalid values fail with:

`INVALID_SHA256_FORMAT`

SHA may be left blank when unavailable.

Do not invent hashes.

==================================================
23. EVIDENCE ADMISSION REVIEW QUEUE
==================================================

V31 includes a display-only admission-review queue.

Displays:

NOT_ADMITTED candidates

No admission button exists.

Reason:

Evidence admission is a Human Gate.

Candidate registration:

does not equal admission.

==================================================
24. EVIDENCE ROLLBACK TEST
==================================================

V31 duplicate / registration tests used transaction rollback.

Persisted test rows:

0

Separate-statement duplicate test:

PASS

Invalid SHA test:

PASS

==================================================
25. INTERNAL REVIEW PACKAGE V31
==================================================

Preview includes:

- programme
- course
- TQF3 working version
- readiness score
- blocking/warning counts
- TQF3 structural counts
- TQF5 state / CLO result count
- verification state
- linked evidence count
- candidate evidence count
- unresolved AI suggestions
- source gaps
- provenance footer

Output:

browser print / Save PDF

Classification:

DRAFT / NON-PRODUCTION

Do not label official.

==================================================
26. TQF4 STRUCTURAL V2
==================================================

Registry:

`HEPE-TQF4-GENERIC`

Version 2:

UNDER_REVIEW

Sections:

7

Field bindings:

18

All v2 field bindings:

binding_status = STRUCTURE_ONLY

evidence_role = STRUCTURE_LAYOUT_EXEMPLAR

synthetic_data_forbidden = true

Source scope:

STRUCTURE_LAYOUT_ONLY

Registry current_version_no remains:

1

Therefore v2 is not activated.

==================================================
27. TQF4 V2 SECTIONS
==================================================

1. General Information
2. Objectives / Fieldwork CLOs
3. Learning Development & Fieldwork Activities
4. Planning & Preparation
5. Student Assessment
6. Fieldwork Evaluation & Improvement
7. Warnings / Evidence Gaps

No sample values admitted.

==================================================
28. TQF6 STRUCTURAL V2
==================================================

Registry:

`HEPE-TQF6-GENERIC`

Version 2:

UNDER_REVIEW

Sections:

8

Field bindings:

21

All v2 field bindings:

binding_status = STRUCTURE_ONLY

evidence_role = STRUCTURE_LAYOUT_EXEMPLAR

synthetic_data_forbidden = true

Source scope:

STRUCTURE_LAYOUT_ONLY

Registry current_version_no remains:

1

Therefore v2 is not activated.

==================================================
29. TQF6 V2 SECTIONS
==================================================

1. General / Student Counts / TQF4 Lineage
2. Variance from TQF4 Plan
3. Student Results / Grades / CLO Attainment
4. Problems and Impact
5. Fieldwork Evaluation
6. CQI Action Plan
7. Approval / Sign-off
8. Warnings / Evidence Gaps

No sample execution values admitted.

==================================================
30. SAMPLE GOVERNANCE
==================================================

Sample file:

`รายละเอียดและรายงานผลประสบการณ์ภาคสนาม (มคอ.4 และ มคอ.6) วิชา HED 3701.docx`

SHA-256:

`787c2a2594480be7004d16243962880cd9f10385944015916f6c58e1e215b726`

Classification:

REFERENCE_SAMPLE_ONLY

Allowed reuse:

- structure
- section labels
- layout
- writing pattern

Forbidden reuse:

- course facts
- hours
- CLO/PLO values
- assessment weights
- names
- placements
- student counts
- grades
- attainment
- satisfaction
- CQI outcomes
- dates
- signatures

==================================================
31. TQF4/TQF6 ACTIVATION GATE
==================================================

Do not change registry current_version_no from 1 to 2 automatically.

Do not mark v2 APPROVED automatically.

Do not claim institutional-official status.

Activation requires explicit separate approval and governance review.

==================================================
32. CURRENT HED2503
==================================================

TQF3 record:

`26e00a55-f545-49cc-aec6-959ac07809eb`

Current working version:

5

Version count:

5

Verification:

`INSUFFICIENT_EVIDENCE`

==================================================
33. IMMUTABLE R1
==================================================

Release:

`HEPE-HED2503-TQF3-2569-1-R1`

Status:

`PUBLIC_PUBLISHED`

SHA-256:

`799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256`

Never mutate.

==================================================
34. FRONTEND V31 REGRESSION
==================================================

JavaScript parse:

PASS

Collection-selector regression:

PASS

Duplicate DOM IDs:

NONE

Required V31 IDs:

PASS

Readiness jump targets:

PASS

V31 JS/CSS asset links:

PASS

AI analysis box count:

1

==================================================
35. LATEST DOCUMENTATION
==================================================

Audit:

`docs/audits/hepe-fast-tqf-v31-closure-2026-09-18.md`

TQF4/TQF6 structural design:

`docs/design/hepe-tqf4-tqf6-structural-v2-scaffold.md`

Master continuation:

`docs/commands/hepe-fast-tqf-master-continuation-command.md`

==================================================
36. CURRENT TRUE HUMAN GATE
==================================================

Authenticated Visual Acceptance of V31.

Expected visible additions:

- AI evidence-basis badge
- AI section-state badge
- multi-level Undo count
- readiness section scores
- jump-to-field buttons
- weekly coverage heatmap
- assessment map
- source-gap queue showing complete coverage
- dashboard readiness filter
- dashboard source-gap filter
- dashboard sorting
- dashboard drill-down
- programme Smart QA summary
- evidence duplicate/SHA check
- candidate filter
- admission-review queue
- expanded review package

Repository and database state are verified.

Logged-in browser visual rendering remains a user-browser gate.

==================================================
37. NEXT PHASE AFTER V31 VISUAL ACCEPTANCE
==================================================

V32-A — VISUAL / ACCESSIBILITY HARDENING

1. Keyboard-only navigation audit.
2. Focus-ring audit.
3. Screen-reader labels.
4. Table horizontal-scroll hints.
5. Mobile density review.
6. Empty-state consistency.
7. Error-message consistency.
8. Loading-state consistency.
9. Sticky headers.
10. Confirm Thai typography.

V32-B — COURSE OWNER / RESPONSIBILITY

11. Build read-only course-responsibility context.
12. Use controlled teaching-responsibility / authority structures.
13. Display only when authority permits.
14. Do not infer instructor from historical/sample documents.
15. Add responsible-instructor filter if source is controlled.

V32-C — ADVANCED CROSS-DOCUMENT QA

16. TQF3 assessment plan ↔ TQF5 results.
17. Weekly evidence expectation ↔ verification evidence.
18. TQF3 CLO ↔ TQF5 CLO results.
19. CQI source ↔ next-cycle TQF3 change.
20. Version-to-version change narrative.
21. Accepted AI change traceability.

V32-D — EVIDENCE REVIEW PREPARATION

22. Add candidate metadata preview.
23. Add duplicate-group display.
24. Add missing-authority warning.
25. Add hash-presence indicator.
26. Add source-locator completeness.
27. Add “ready for human admission review” state.
28. Do not provide auto-admit.

V32-E — TQF4/TQF6 REVIEW

29. Render structural v2 preview only.
30. Compare v1 vs v2 sections.
31. Verify canonical bindings needed for each field.
32. Identify fields needing actual programme/course evidence.
33. Identify execution-only fields.
34. Identify signature/approval gates.
35. Do not activate v2.
36. Stop at activation Human Gate.

V32-F — INTERNAL REVIEW PACKAGE

37. Add per-section findings.
38. Add accepted AI decision appendix.
39. Add evidence candidate appendix.
40. Add version diff appendix.
41. Add CQI lineage appendix.
42. Add source/provenance appendix.
43. Preserve DRAFT watermark.
44. Preserve NON-PRODUCTION label.

==================================================
38. HUMAN GATES AFTER V31
==================================================

Stop for:

- Production authorization
- secret / credential change
- institutional SSO
- destructive migration
- immutable R1 change
- evidence admission
- VERIFIED decision
- TQF4/TQF6 v2 activation
- official-template authority
- master UI unlock
- protected direct AI integration
- ambiguous source adoption

Everything else clear and reversible:

continue automatically.

==================================================
39. EXECUTION TRIGGER
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

If V31 visual acceptance passes:

continue automatically:

V32-A
→ V32-B
→ V32-C
→ V32-D
→ V32-E
→ V32-F

until a true Human Gate.

END MASTER CONTINUATION COMMAND

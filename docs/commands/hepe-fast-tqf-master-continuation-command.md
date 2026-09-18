# HEPE FAST TQF PORTAL — MASTER CONTINUATION COMMAND

Effective date: 2026-09-18

Revision: POST-V30 ADVANCED OPERATIONS

Status: ACTIVE MASTER CONTINUATION COMMAND

Project:
HEPE Fast TQF Portal

Repository:
`kasemch/kasemch.github.io`

Public route:
`https://kasemch.github.io/hepe-trial/`

Current UI version:
V30

Environment:
NON-PRODUCTION

Operating principles:

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
0. PERMANENT LONG-COMMAND RULE
==================================================

After every material processing step, implementation batch, audit, source review, architecture update, UI revision, evidence workflow change, or governance decision:

1. Continue all clear, reversible, non-destructive work automatically.
2. Batch related tasks.
3. Do not ask the user to repeat known information.
4. Preserve approved locks, baselines, and governance rules.
5. Reuse existing schema/RPC/views before adding parallel structures.
6. Prefer read-only or append-only patterns.
7. Stop only at genuine Human Gates.
8. Refresh this command after material state changes.
9. Never infer Production authorization.
10. Never infer institutional authority from a working source.
11. Never fabricate curriculum content, evidence, results, approvals, signatures, mappings, or verification outcomes.
12. Separate canonical curriculum data from working-document data.
13. Separate AI suggestions from user-approved content.
14. Separate readiness from institutional approval.
15. Maintain static GitHub Pages compatibility and relative asset paths.

True Human Gates include:

- Production authorization
- secret/credential changes
- destructive migrations
- immutable R1 mutation
- historical rewrite
- institutional-official template authority
- evidence admission requiring human judgment
- VERIFIED transition requiring human judgment
- design unlock
- protected direct AI API integration
- ambiguous canonical curriculum-source adoption

==================================================
1. CURRENT MASTER UI/UX
==================================================

Master UI/UX:
APPROVED / LOCKED

Locked conceptual architecture:

1. Login
2. Programme/Course Selection
3. TQF3 General + CLO
4. CLO–PLO
5. Weekly Teaching Plan
6. TQF3 Assessment
7. TQF5
8. Verification Evidence
9. Readiness
10. Programme Dashboard

Do not substantially redesign without explicit Unlock / Change Request.

==================================================
2. CURRENT LIVE FRONTEND
==================================================

Current release:
V30

Live files:

`./hepe-trial/index.html`
`./hepe-trial/assets/js/portal-v30.js`
`./hepe-trial/assets/css/portal-v30.css`
`./hepe-trial/config/state.json`

Do not downgrade to V29 or earlier.

==================================================
3. COURSE SCOPE LOCK
==================================================

Portal scope:

Current curriculum membership

EXCLUDING:

`EDU*`
`RAM*`

Interpretation:

EDU = excluded education-core group for this portal
RAM = general-education group for this portal

Current counts:

Total current curriculum courses:
92

EDU excluded:
13

RAM excluded:
14

Portal in-scope:
65

==================================================
4. BACKEND SCOPE ENFORCEMENT
==================================================

Helper:

`private.hepe_fast_tqf_course_in_scope(text)`

Out-of-scope calls must fail with:

`COURSE_OUT_OF_SCOPE`

Scope is enforced on:

- programme catalogue
- course catalogue
- curriculum context
- portal context
- programme dashboard
- TQF3 save
- TQF5 draft creation
- verification draft creation
- TQF3 version history
- evidence workspace
- CQI context
- evidence queue
- evidence candidate registration

Frontend filtering alone is not sufficient.

==================================================
5. COURSE DESCRIPTION COVERAGE
==================================================

In-scope courses:
65

Canonical descriptions present:
64

Missing:
1

Missing course:

`HED3701`

Current HED3701 state:

`MISSING_CANONICAL_DESCRIPTION`

==================================================
6. HED3701 SOURCE-GAP RULE
==================================================

Searches have been performed across:

- connected Google Drive
- current GitHub repository

The located HED3701 TQF4/TQF6 document is a previously classified sample/reference document.

Classification:

`REFERENCE_SAMPLE_ONLY`

Therefore it must not be admitted as factual HED3701 course-description evidence.

Do not infer a course description from:

- sample TQF4
- sample TQF6
- sample hours
- sample CLOs
- sample assessment
- future-dated report values

Do not use AI to generate canonical course-description text.

Correct state remains:

`MISSING_CANONICAL_DESCRIPTION`

until an authoritative curriculum source is located and reviewed.

==================================================
7. COURSE DESCRIPTION DISPLAY RULE
==================================================

Priority:

1. current canonical `course_description_versions`
2. real Working TQF3 description as NON-CANONICAL fallback
3. missing-source notice

If canonical exists:

- display read-only
- show source
- show locator
- show verification status
- show authority status

If working fallback is used:

show:

`WORKING FALLBACK — NON-CANONICAL`

Never label working fallback as official curriculum text.

==================================================
8. AI IMMEDIATE-ANALYSIS RULE
==================================================

When user clicks:

AI วิเคราะห์

system must immediately populate:

`#ai-analysis-box`

No second click.

No external AI call is required for basic Smart QA.

The analysis should include:

- section name
- course code
- course title
- issue
- severity
- explanation
- rationale
- recommended action
- human-decision reminder

==================================================
9. AI PROPOSED-TEXT MODEL
==================================================

V30 separates:

A. Analysis / rationale

from

B. Proposed text to use

UI:

`#ai-analysis-box`

`#ai-proposed-text`

The proposed-text area is not automatically applied.

User remains the final decision-maker.

==================================================
10. AI DECISION MODEL
==================================================

Suggestion states:

SUGGESTED
ACCEPTED
EDITED_AND_ACCEPTED
REJECTED

V30 adds:

- unresolved suggestion counter
- copy proposed text
- undo last applied AI text
- recent AI decision history

AI must not:

- alter canonical curriculum data
- invent evidence
- invent results
- create authority
- mark VERIFIED
- modify immutable R1

==================================================
11. AI DIRECT CHATGPT HANDOFF
==================================================

Use ChatGPT handoff only for deeper analysis.

Local Smart QA must remain useful independently.

No private AI key may be embedded in GitHub Pages.

==================================================
12. TQF3 SECTION 1
==================================================

Canonical/read-only:

- programme
- course code
- Thai title
- English title
- credit
- curriculum version
- course description
- provenance

==================================================
13. TQF3 SECTION 2
==================================================

Structured CLO:

- CLO code
- CLO statement
- working PLO linkage
- AI review
- row actions

AI checks:

- measurable wording
- action verb
- ambiguity
- duplication
- missing working PLO link
- excessive scope

==================================================
14. CLO–PLO RULE
==================================================

Canonical mapping and working mapping must remain separate.

Current HED2503 canonical course→PLO mapping:

0

Do not fabricate.

Future/working matrix:

Rows = CLO
Columns = PLO1–PLO7
Values = I / R / M / none

==================================================
15. WEEKLY PLANNER
==================================================

LOCKED.

Columns:

- week
- topic/content
- CLO
- PLO
- learning activity
- lecture hours
- practice hours
- self-study hours
- assessment/evidence
- learning resources
- AI/action

Default UI planning rows do not establish an official academic calendar.

==================================================
16. ASSESSMENT MODULE
==================================================

Fields:

- item
- method
- weight
- CLO
- evidence/rubric
- AI

Validation:

- total = 100%
- orphan assessment
- missing CLO
- missing evidence/rubric
- future load/timing checks

==================================================
17. TQF5
==================================================

Mode:

PLAN → ACTUAL

Fields:

- registered students
- students at end
- plan vs actual
- grade distribution
- CLO attainment
- problems
- CQI

TQF5 remains DRAFT/UNVERIFIED until governed evidence supports escalation.

==================================================
18. VERIFICATION
==================================================

Evidence-first.

Current HED2503:

`INSUFFICIENT_EVIDENCE`

No VERIFIED shortcut.

Evidence categories include:

- committee order
- minutes
- attendance
- sampling
- student artifacts
- rescoring
- reviewer comparison
- signed/controlled decision

==================================================
19. EVIDENCE CANDIDATE INTAKE
==================================================

V30 adds:

`hepe_fast_tqf_register_evidence_candidate_by_code(...)`

Candidate registration is allowed only for:

- authenticated user
- in-scope course
- authorized reviewer/programme context
- complete required metadata

Forced values:

verification_status:
`UNVERIFIED`

admission_status:
`NOT_ADMITTED`

creates_system_authority:
`false`

The registration workflow cannot admit evidence.

==================================================
20. EVIDENCE INTAKE METADATA
==================================================

Capture:

- evidence type
- source
- version/document date
- authority owner
- relevant assertion
- source locator
- optional SHA-256
- note

Do not auto-admit.

Admission requires separate governed review.

==================================================
21. READINESS ENGINE V30
==================================================

Readiness states:

`BLOCKING`
`WARNING`
`PASS`

Current checks include:

- course-description source
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

Readiness is for internal review only.

It is not institutional approval.

==================================================
22. INTERNAL REVIEW PACKAGE
==================================================

V30 provides draft preview including:

- programme
- course
- TQF3 working version
- readiness
- blocking count
- warning count
- verification status
- course-description source state

Print / Save PDF is allowed as:

DRAFT / INTERNAL REVIEW

Do not label official unless authority supports it.

==================================================
23. PROGRAMME DASHBOARD V30
==================================================

Scope:

65 in-scope courses

Filters:

- free-text search
- HED/PED
- REQUIRED/ELECTIVE
- offered only
- missing TQF3
- missing TQF5
- verification state
- Needs Attention only

Row data includes:

- course
- course-description availability
- offering
- TQF3
- TQF5
- verification
- TQF3 version
- attention state

==================================================
24. NEEDS ATTENTION
==================================================

A course may be flagged when one or more applies:

- no offering
- no TQF3
- no TQF5
- verification not VERIFIED
- canonical description missing

Do not treat Needs Attention as an institutional judgment.

It is an operational queue.

==================================================
25. EVIDENCE QUEUE
==================================================

Evidence queue must use the same scope rule.

Queue states:

COMPLETE
MISSING
CANDIDATE_ONLY
INSUFFICIENT
IN_REVIEW

Do not classify candidate-only evidence as admitted evidence.

==================================================
26. AUTOSAVE / RECOVERY
==================================================

localStorage

debounced

identity key:

programme
course
year
term

No server version per keystroke.

Cross-course restore prohibited.

==================================================
27. VERSION HISTORY
==================================================

HED2503 current working state:

current version = 5
version count = 5

Working history remains append-only.

==================================================
28. IMMUTABLE R1
==================================================

Release:

`HEPE-HED2503-TQF3-2569-1-R1`

Status:

`PUBLIC_PUBLISHED`

SHA-256:

`799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256`

Never mutate R1.

==================================================
29. V30 RUNTIME REPAIR
==================================================

V29 contained a collection-selector regression:

single-element helper `$()`
was used with:
forEach / map / filter

V30 repairs collection operations to use:

`$$()`

Regression requirement:

- JS parse pass
- no single-element collection selector used with collection methods
- required DOM IDs pass
- one AI analysis box
- V30 JS/CSS assets active

==================================================
30. CURRENT VERIFIED INVARIANTS
==================================================

In-scope courses:
65

Canonical descriptions:
64

HED3701 missing:
1

HED2503 TQF3 current working version:
5

HED2503 TQF3 version count:
5

HED2503 verification:
INSUFFICIENT_EVIDENCE

R1:
PUBLIC_PUBLISHED

R1 SHA:
799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256

Production:
NOT AUTHORIZED

==================================================
31. LATEST AUDIT
==================================================

`docs/audits/hepe-fast-tqf-v30-advanced-operations-2026-09-18.md`

==================================================
32. NEXT AUTOMATIC PHASE
==================================================

V31-A — HED3701 SOURCE CLOSURE

1. Continue searching controlled curriculum sources.
2. Prefer actual curriculum-book source.
3. Verify page/locator.
4. Verify version/revision.
5. Create candidate only when actual source is found.
6. Do not use sample TQF4/TQF6 values.
7. Stop before factual admission if source authority is ambiguous.
8. Target 65/65 canonical-description coverage.

V31-B — AI QUALITY

9. Add section-specific proposed-text templates.
10. Add evidence/confidence indicator.
11. Add “why this suggestion” compact view.
12. Add accepted-text provenance.
13. Add decision export into review package.
14. Improve undo stack beyond one change.
15. Add section AI completion state.

V31-C — READINESS

16. Add section-level score.
17. Add explicit block reasons.
18. Add direct jump-to-field actions.
19. Add weekly coverage heatmap.
20. Add assessment map.
21. Add source-gap queue.
22. Add export readiness.

V31-D — DASHBOARD

23. Add readiness per course.
24. Add source-gap filter.
25. Add recently updated sort.
26. Add direct course drill-down.
27. Add responsible instructor when authorized.
28. Add programme-level AI summary.

V31-E — EVIDENCE

29. Add candidate list filters.
30. Add source-preview metadata.
31. Add duplicate-source detection.
32. Add hash-format validation.
33. Add admission-review queue shell.
34. Keep admission as Human Gate.

V31-F — INTERNAL REVIEW PACKAGE

35. Add TQF3 section summary.
36. Add TQF5 summary.
37. Add verification evidence summary.
38. Add unresolved AI decisions.
39. Add source gaps.
40. Add version/provenance footer.
41. Add DRAFT watermark.
42. Preserve browser PDF export.

V31-G — TQF4/TQF6 RETURN

43. Continue only after urgent TQF3/TQF5/verification flow remains stable.
44. Reuse current visual language.
45. Keep template authority UNDER_REVIEW.
46. Use sample documents only for structure/style.
47. Do not reuse sample values as factual data.
48. Apply the same evidence candidate/admission model.

==================================================
33. HUMAN GATES
==================================================

Stop only for:

- Production
- secrets
- institutional SSO
- immutable R1 mutation
- destructive migration
- official template authority
- evidence admission requiring human judgment
- VERIFIED decision
- design unlock
- direct AI API secret/privacy architecture
- ambiguous curriculum-source adoption

Everything else clear and reversible:
continue automatically.

==================================================
34. EXECUTION TRIGGER
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

continue automatically:

V31-A
→ V31-B
→ V31-C
→ V31-D
→ V31-E
→ V31-F
→ V31-G

until a true Human Gate is reached.

END MASTER CONTINUATION COMMAND

# HEPE FAST TQF PORTAL — MASTER CONTINUATION COMMAND

Effective: 2026-09-18
Revision: POST-V29 AI / MATRIX / WEEKLY / EVIDENCE / SUBMISSION
Status: ACTIVE
Environment: NON-PRODUCTION

Repository:
kasemch/kasemch.github.io

Public route:
https://kasemch.github.io/hepe-trial/?v=29

==================================================
0. MASTER OPERATING MODE
==================================================

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

After every material batch:

1. Continue all clear reversible work automatically.
2. Batch related tasks.
3. Preserve locked baselines.
4. Prefer read-only or append-only changes first.
5. Reuse current schemas/RPCs before adding parallel structures.
6. Audit changes.
7. Refresh this continuation command.
8. Stop only at a true Human Gate.

==================================================
1. TRUE HUMAN GATES
==================================================

Stop only for:

- Production authorization
- secret/credential change
- destructive database action
- immutable R1 mutation
- historical lifecycle rewrite
- institutional-official authority claim
- evidence admission requiring human judgment
- VERIFIED decision requiring human judgment
- master UI unlock
- direct AI API integration requiring protected secrets/privacy review
- authenticated visual acceptance when the live authenticated page cannot be independently observed

==================================================
2. STATIC WEB CONSTRAINT
==================================================

Frontend must remain GitHub Pages compatible.

Allowed:

HTML5
Vanilla CSS
JavaScript ES6+
Supabase JS
Jekyll
approved CDN libraries
external APIs through fetch/RPC

No backend framework unless separately authorized.

All local assets must use relative paths.

==================================================
3. MASTER UI LOCK
==================================================

Master UI/UX:
APPROVED / LOCKED

Design file:
docs/design/hepe-fast-tqf-master-ui-design-lock-v1.md

Locked conceptual screens:

1. Login
2. Course Selection / Academic Dashboard
3. TQF3 General + CLO
4. CLO–PLO Mapping
5. Weekly Teaching Plan
6. TQF3 Assessment
7. TQF5 Plan→Actual
8. Verification Evidence Workspace
9. Readiness / Cross-document Consistency
10. Programme Dashboard

==================================================
4. CURRENT UI BASELINE
==================================================

Version:
V29

Main files:

./hepe-trial/index.html
./hepe-trial/assets/css/portal-v29.css
./hepe-trial/assets/js/portal-v29.js
./hepe-trial/config/state.json

Current audit:

docs/audits/hepe-fast-tqf-v29-ai-matrix-weekly-evidence-submission-2026-09-18.md

==================================================
5. FAST TQF SCOPE
==================================================

Operational scope:

HED / PED ONLY

HED:
28

PED:
37

Total:
65

Excluded:

EDU
RAM
general education

Backend scope must remain enforced.

Do not reintroduce EDU/RAM without explicit scope approval.

==================================================
6. CURRICULUM DESCRIPTION
==================================================

Source:

Google Drive file ID:
1E0fXyoOc-v2z-GzEyfGq-JHHKMK9C0xk

Title:
หลักสูตรศึกษาศาสตรบัณฑิต HE - PE 67 (1).docx

Section:
3.1.5 คำอธิบายรายวิชา

Coverage:

64/65 scoped courses

Missing:

HED3701

Verification:

SOURCE_TEXT_EXTRACTED

Authority:

CURRICULUM_BOOK_SOURCE_OBSERVED

Do not use AI to replace canonical/source-derived descriptions.

==================================================
7. HED3701
==================================================

Current route:

TQF4 / TQF6

Do not fabricate standard description.

Develop through field-practicum workflow.

==================================================
8. PROGRAMME / COURSE FLOW
==================================================

Login
→ Programme Name
→ HED/PED Course
→ Academic Year
→ Term
→ Curriculum Context
→ TQF3 / TQF5 / Verification / Readiness / Dashboard

==================================================
9. TQF3 SECTION 1
==================================================

Read-only source-derived fields:

programme
course code
titles
credits
curriculum version
course description
provenance

Source Drawer now shows:

source reference
source locator
verification status
authority status

==================================================
10. TQF3 SECTION 2 — CLO
==================================================

Structured CLO rows:

CLO code
CLO statement
working PLO linkage
AI review

AI checks:

measurability
ambiguity
duplication
scope
missing linkage

==================================================
11. CLO–PLO WORKING MATRIX
==================================================

V29 status:

READY

Rows:
CLO

Columns:
Programme PLO codes

Values:
none
I
R
M

This is a WORKING layer.

Canonical mapping remains separate.

If canonical mapping is absent:

show that it is unavailable.

Do not fabricate canonical mapping.

Working matrix persists in:

form_sections.plo_matrix

==================================================
12. WEEKLY PLANNER
==================================================

LOCKED design.

Current productivity tools:

- add week
- duplicate week
- delete week
- bulk range selection
- bulk CLO
- bulk PLO
- apply only to empty cells
- overwrite selected range
- sticky table header
- coverage strip

Coverage shows per CLO:

weeks taught
weeks with assessment/evidence

==================================================
13. ASSESSMENT
==================================================

Structured assessment fields:

item
method
weight
CLO
evidence/rubric
AI review

Current hard check:

total weight = 100%

==================================================
14. AI IMMEDIATE ANALYSIS
==================================================

When user presses AI analyze:

1. analysis runs immediately
2. visible content appears in ai-analysis-box
3. severity shown
4. why it matters shown
5. recommended action shown
6. suggestion remains editable
7. user decides

Severity:

BLOCKING
WARNING
SUGGESTION

==================================================
15. GUARDED APPLY-TO-FIELD
==================================================

For suggestions with known target fields:

Apply-to-Field exists.

Safety rule:

button is disabled until the user edits the suggestion text.

The original generic AI instruction cannot be inserted directly.

After user edit:

edited text may be applied to target field.

Decision becomes:

EDITED_AND_ACCEPTED

No silent write.

==================================================
16. AI GOVERNANCE
==================================================

AI remains advisory.

User is final decision-maker.

States:

SUGGESTED
ACCEPTED
EDITED_AND_ACCEPTED
REJECTED

AI must not:

invent curriculum facts
overwrite source description
invent canonical PLO mapping
invent evidence
invent results
auto-admit evidence
mark VERIFIED
claim official approval
mutate R1

==================================================
17. TQF3→TQF5 REUSE
==================================================

V29 status:

READY

New action:

Sync CLO จาก มคอ.3

Behavior:

- build TQF5 CLO rows from current TQF3 CLOs
- preserve existing target/attainment when CLO code matches
- do not invent actual attainment

TQF5 Plan Baseline shows:

CLO count
weekly plan filled count
assessment count
assessment weight total

==================================================
18. TQF5
==================================================

Mode:

Plan → Actual

Actual fields remain user-controlled:

registered students
students at end
plan-vs-actual
grade distribution
CLO attainment
problems
CQI

State:

DRAFT / UNVERIFIED

==================================================
19. VERIFICATION
==================================================

Evidence-first.

No VERIFIED shortcut.

Current HED2503:

INSUFFICIENT_EVIDENCE

Evidence candidate admission remains governed.

==================================================
20. EVIDENCE QUEUE
==================================================

V29 read-only RPC:

hepe_fast_tqf_evidence_queue(
  programme_code,
  academic_year,
  term_code
)

ACL:

anon = denied
authenticated = allowed

Current AY2569/T1:

offered HED/PED = 30
no verification record = 29
insufficient evidence = 1
verified = 0
with candidates = 2
with linked controlled evidence = 0

Queue states:

COMPLETE
MISSING
CANDIDATE_ONLY
INSUFFICIENT
IN_REVIEW

The queue is read-only.

Never auto-admit evidence.

==================================================
21. PROGRAMME DASHBOARD
==================================================

Current scoped total:

65 courses

AY2569/T1:

offered = 30
TQF3 present = 1
TQF5 present = 1
verification present = 1
VERIFIED = 0
INSUFFICIENT_EVIDENCE = 1

Dashboard now includes Evidence Queue.

==================================================
22. SUBMISSION MODE
==================================================

V29 status:

READY

Purpose:

cleaner review/print presentation.

Behavior:

- reduce development noise
- keep essential form/readiness
- show DRAFT · NON-PRODUCTION watermark
- preserve print/PDF

Submission Mode does not imply institutional approval.

==================================================
23. AUTOSAVE / RECOVERY
==================================================

localStorage
debounced
course-identity keyed

No server version on every keystroke.

==================================================
24. VERSION COMPARE
==================================================

Current:

working-version comparison

No history rewrite.

==================================================
25. CQI
==================================================

Carry forward only when a source exists.

No fake CQI generation.

==================================================
26. READINESS
==================================================

Readiness means:

READY FOR INTERNAL REVIEW

Not:

INSTITUTIONALLY APPROVED

==================================================
27. IMMUTABLE R1
==================================================

Release:

HEPE-HED2503-TQF3-2569-1-R1

Status:

PUBLIC_PUBLISHED

SHA-256:

799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256

Never mutate.

==================================================
28. V29 REGRESSION
==================================================

JS syntax:
PASS

DOM contract:
PASS

Relative V29 assets:
PASS

AI severity:
PASS

Guarded Apply-to-Field:
PASS

CLO–PLO Matrix runtime:
PASS

Weekly bulk tools:
PASS

Weekly coverage:
PASS

TQF5 sync:
PASS

Evidence Queue runtime:
PASS

Evidence Queue ACL:
PASS

Source Drawer:
PASS

Submission Mode:
PASS

Fast TQF course count:
65

Description coverage:
64/65

R1 invariant:
PASS

Production:
NOT AUTHORIZED

==================================================
29. CURRENT TRUE HUMAN GATE
==================================================

AUTHENTICATED VISUAL ACCEPTANCE OF V29

Expected additions:

- severity badge on AI suggestions
- Why / Recommended action
- guarded Apply-to-Field
- CLO–PLO Working Matrix
- weekly bulk range tools
- weekly coverage strip
- TQF5 sync button
- Plan Baseline notice
- Source Drawer
- Evidence Queue
- Submission Mode
- DRAFT / NON-PRODUCTION watermark

If defect exists:

repair
regression
continue

==================================================
30. NEXT SAFE PHASE AFTER V29 ACCEPTANCE
==================================================

V30-A — ADVANCED READINESS

1. Split checks into BLOCKING / WARNING / INFO.
2. Section-level readiness scores.
3. Count unresolved AI suggestions.
4. Add CLO without assessment check.
5. Add assessment without CLO check.
6. Add weekly coverage gaps.
7. Add evidence gap count.
8. Add export readiness state.

V30-B — CLO/PLO QUALITY

9. Add matrix coverage score.
10. Flag CLO mapped to no PLO.
11. Flag excessive PLO spread.
12. Show canonical vs working comparison if canonical data becomes available.
13. Preserve working/canonical separation.

V30-C — WEEKLY PLANNER

14. Add paste-table support.
15. Add multi-row duplicate.
16. Add keyboard shortcuts.
17. Add resource bulk assignment.
18. Add assessment bulk assignment.
19. Add hours summary.
20. Only use verified credit-pattern rules for compliance checking.

V30-D — TQF5 PLAN/ACTUAL

21. Add side-by-side planned/actual assessment.
22. Add variance prompts.
23. Add CLO target vs actual visual indicators.
24. Add result-source status.
25. Never infer actual outcomes.

V30-E — EVIDENCE REFERENCE INTAKE

26. Add candidate evidence registration form.
27. Source type.
28. Source date.
29. Authority owner.
30. Source locator.
31. Hash where available.
32. Initial status candidate/unverified.
33. No auto-admission.
34. Human admission gate remains.

V30-F — DASHBOARD DRILLDOWN

35. Filters:
    document state
    verification state
    evidence state
    readiness
36. Direct course open.
37. Sort by recent update.
38. Missing-description filter.
39. Evidence queue filter.

V30-G — EXPORT

40. Controlled preview layout.
41. DRAFT watermark.
42. version label.
43. provenance footer.
44. readiness summary.
45. no official label without authority.

V30-H — RETURN TO TQF4 / TQF6

46. Resume HED3701 flow.
47. Keep sample TQF4/TQF6 forms REFERENCE_SAMPLE_ONLY.
48. Build field-practicum structured UI.
49. No sample result promotion.
50. Preserve UNDER_REVIEW authority.

==================================================
31. SAMPLE FILE RULE
==================================================

Example/sample/mockup files:

REFERENCE_SAMPLE_ONLY

Use for:

structure
layout
writing pattern
UI design

Do not use as actual values without separate evidence.

==================================================
32. PRODUCTION BOUNDARY
==================================================

Production:
NOT AUTHORIZED

No:

secret change
R1 mutation
history rewrite
auto-admission
automatic VERIFIED
official authority claim
master UI unlock

==================================================
33. EXECUTION TRIGGER
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

If V29 visual acceptance passes:

continue automatically through V30 safe phases
until a true Human Gate is reached.

END MASTER CONTINUATION COMMAND

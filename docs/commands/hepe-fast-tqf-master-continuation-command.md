# HEPE FAST TQF PORTAL — MASTER CONTINUATION COMMAND

Effective: 2026-09-18
Revision: POST-V28 SCOPE / CURRICULUM DESCRIPTION / IMMEDIATE AI
Status: ACTIVE
Environment: NON-PRODUCTION

Repository:
kasemch/kasemch.github.io

Public route:
https://kasemch.github.io/hepe-trial/?v=28

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

- continue all clear reversible work automatically
- batch related tasks
- preserve locked baselines
- update audit
- update this continuation command
- stop only at a true Human Gate

==================================================
1. TRUE HUMAN GATES
==================================================

Stop only for:

- Production authorization
- secret or credential change
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

No server backend framework unless separately authorized.

All local asset paths must remain relative.

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
V28

Main files:

./hepe-trial/index.html
./hepe-trial/assets/css/portal-v28.css
./hepe-trial/assets/js/portal-v28.js
./hepe-trial/config/state.json

Current audit:

docs/audits/hepe-fast-tqf-v28-scope-description-ai-immediate-2026-09-18.md

==================================================
5. FAST TQF OPERATIONAL SCOPE
==================================================

LOCK CURRENT OPERATIONAL RULE:

HED / PED ONLY

Included prefixes:

HED
PED

Excluded:

EDU
RAM
general-education courses

Reason:

Fast TQF workflow is scoped to department-owned HED/PED courses.

This is enforced in backend catalogue/dashboard RPCs,
not only hidden in frontend JavaScript.

Current full curriculum reference:

92 courses

Current Fast TQF operational scope:

HED = 28
PED = 37
TOTAL = 65

EDU returned in Fast TQF catalogue:

0

RAM returned in Fast TQF catalogue:

0

==================================================
6. SCOPE-AWARE RPC
==================================================

Current scope-aware read models:

hepe_fast_tqf_programme_catalog()

hepe_fast_tqf_course_catalog(
  programme_code,
  academic_year,
  term_code
)

hepe_fast_tqf_curriculum_context(
  programme_code,
  course_code
)

hepe_fast_tqf_programme_dashboard(
  programme_code,
  academic_year,
  term_code
)

Scope marker:

HED_PED_ONLY

Do not re-introduce EDU/RAM without explicit scope change approval.

==================================================
7. CURRICULUM DESCRIPTION SOURCE
==================================================

Source file:

Google Drive ID:
1E0fXyoOc-v2z-GzEyfGq-JHHKMK9C0xk

Title:

หลักสูตรศึกษาศาสตรบัณฑิต HE - PE 67 (1).docx

Source section:

3.1.5 คำอธิบายรายวิชา

Current scoped HED/PED descriptions:

65 scoped courses
64 extracted descriptions
1 exception

Verification status:

SOURCE_TEXT_EXTRACTED

Authority status:

CURRICULUM_BOOK_SOURCE_OBSERVED

Important:

These are source-observed curriculum-book records.

Do not automatically escalate them to institutional-official authority.

==================================================
8. HED3701 EXCEPTION
==================================================

Course:

HED3701

Current description row:

none admitted from the standard course-description source section.

Do not fabricate a description.

UI behavior:

show:

TQF4/TQF6 SOURCE ROUTE

Interpretation:

HED3701 is a professional field-practicum course
and belongs to the TQF4/TQF6 workflow.

==================================================
9. DESCRIPTION QUALITY
==================================================

Known parser-tail contamination found and cleaned:

HED2615
HED3505
PED3103
PED3601

Cleanup method:

append-only description version

Final known parser-tail marker count:

0

Do not rewrite old description versions.

==================================================
10. HED2503 DESCRIPTION CURRENT STATE
==================================================

Current source:

curriculum book

verification_status:

SOURCE_TEXT_EXTRACTED

authority_status:

CURRICULUM_BOOK_SOURCE_OBSERVED

The old working source candidate remains historical provenance only.

Do not mutate historical description versions.

==================================================
11. PROGRAMME / COURSE UX
==================================================

Flow:

Login
→ Programme Name
→ Course
→ Academic Year
→ Term
→ Curriculum Context
→ TQF workflow

Programme selector:

human-readable title

Course selector:

HED/PED only

Display:

COURSECODE — ชื่อรายวิชา

Do not require users to type internal codes manually.

==================================================
12. TQF3 SECTION 1
==================================================

Auto-fill canonical/source-derived data:

programme
course code
Thai title
English title
credits
curriculum version
course description
provenance

Course description field:

read-only

AI:

may analyze
may explain
may suggest implications

AI must not overwrite source text.

==================================================
13. TQF3 SECTION 2
==================================================

Structured CLO table:

CLO code
CLO statement
working PLO linkage
AI review
row actions

AI checks:

measurable wording
ambiguity
duplication
scope
missing PLO
unsupported mapping

Canonical course→PLO mapping:

do not fabricate.

==================================================
14. TQF3 SECTION 3
==================================================

WEEKLY PLANNER:
LOCKED

Columns:

week
topic/content
CLO
PLO
learning activity
lecture hours
practice hours
self-study hours
assessment/evidence
learning resources
AI review
actions

Default rows are planning slots only.

Do not claim an official teaching-week count from the UI default.

==================================================
15. TQF3 ASSESSMENT
==================================================

Structured fields:

assessment item
method
weight
CLO
evidence/rubric
AI review

Current hard check:

total assessment weight = 100%

Future checks may add:

CLO without evidence
orphan assessment
rubric gap
timing gap
assessment burden

==================================================
16. AI IMMEDIATE ANALYSIS RULE
==================================================

NEW LOCKED USER EXPERIENCE:

When the user presses any AI analyze button:

1. analysis runs immediately
2. visible content appears immediately in:
   ai-analysis-box
3. suggestions are shown below
4. user decides:
   - รับข้อเสนอ
   - แก้ไขแล้วรับ
   - ไม่ใช้

Do not require the user to open ChatGPT before seeing analysis.

==================================================
17. AI TWO-LAYER MODEL
==================================================

Layer 1:

Immediate Local Smart QA

Purpose:

instant feedback
missing-field checks
alignment checks
consistency checks
readiness checks

Layer 2:

Optional ChatGPT deep analysis handoff

Purpose:

deeper academic analysis
rewriting assistance
expanded rationale
complex synthesis

The user may stay entirely in Layer 1.

No protected AI secret is embedded in GitHub Pages.

==================================================
18. AI GOVERNANCE
==================================================

AI is advisory only.

Suggestion lifecycle:

SUGGESTED
ACCEPTED
EDITED_AND_ACCEPTED
REJECTED

User remains final decision-maker.

AI must not:

- invent curriculum facts
- rewrite source-derived course descriptions
- invent PLO authority
- invent evidence
- invent results
- auto-admit evidence
- mark VERIFIED
- claim institutional approval
- mutate R1

==================================================
19. AUTOSAVE / RECOVERY
==================================================

Current:

localStorage
debounced local save
course-identity key

Identity includes:

programme
course
academic year
term

Recovery options:

restore
discard

Never restore a local draft into another course identity.

Do not create a server version on every keystroke.

==================================================
20. TQF5
==================================================

Mode:

Plan → Actual

Current fields:

registered students
students at end
plan-vs-actual
grade distribution
CLO attainment
problems
CQI
AI review

State remains:

DRAFT / UNVERIFIED

until evidence permits governed escalation.

==================================================
21. VERIFICATION
==================================================

Evidence-first.

No VERIFIED shortcut.

Current HED2503:

INSUFFICIENT_EVIDENCE

Evidence candidate:

NOT_ADMITTED

Do not auto-admit.

==================================================
22. PROGRAMME DASHBOARD
==================================================

Current scoped dashboard:

65 HED/PED curriculum courses

AY2569/T1 currently:

offered courses = 30
TQF3 present = 1
TQF5 present = 1
verification present = 1
VERIFIED = 0
INSUFFICIENT_EVIDENCE = 1

Dashboard is read-only.

==================================================
23. VERSION COMPARE
==================================================

Current:

TQF3 working versions

Compare:

objectives
CLO
weekly plan
assessment
resources
improvement notes

No historical rewrite.

==================================================
24. CQI
==================================================

Carry-forward only when source exists.

Do not generate fake CQI to populate UI.

User decides whether to adopt prior CQI.

==================================================
25. READINESS
==================================================

Readiness means:

READY FOR INTERNAL REVIEW

not:

INSTITUTIONAL APPROVAL

Current dimensions:

curriculum context
course description provenance
CLO
weekly plan
assessment total
TQF3↔TQF5 consistency
verification
AI decisions

==================================================
26. IMMUTABLE R1
==================================================

Release:

HEPE-HED2503-TQF3-2569-1-R1

Status:

PUBLIC_PUBLISHED

SHA-256:

799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256

Never mutate.

==================================================
27. SAMPLE FILE RULE
==================================================

If a file is described as:

ตัวอย่าง
แบบฟอร์มตัวอย่าง
ตัวอย่างการเขียน
sample
example
mockup
prototype

default classification:

REFERENCE_SAMPLE_ONLY

May use:

structure
layout
writing style
UI reference

Do not use as factual course data without separate evidence.

==================================================
28. V28 REGRESSION BASELINE
==================================================

Backend scope:

PASS

HED count:

28

PED count:

37

EDU count:

0

RAM count:

0

Scoped total:

65

Curriculum description coverage:

64/65

HED3701 exception:

preserved

Parser-tail check:

0

JS syntax:

PASS

DOM contract:

PASS

Immediate AI text box:

PASS

V28 CSS/JS relative paths:

PASS

R1 invariant:

PASS

Production:

UNCHANGED / NOT AUTHORIZED

==================================================
29. CURRENT TRUE HUMAN GATE
==================================================

AUTHENTICATED VISUAL ACCEPTANCE OF V28

Expected behavior:

- course dropdown contains only HED/PED
- EDU and general-education/RAM courses do not appear
- normal HED/PED courses show curriculum description where available
- description provenance is visible
- HED3701 shows TQF4/TQF6 source-route message
- pressing AI analyze immediately fills the visible analysis text box
- Accept / Edit & Accept / Reject remain available

If user reports a defect:

repair first
regression second
continue third

==================================================
30. NEXT AUTOMATIC SAFE PHASE
==================================================

After V28 visual acceptance:

V29-A — AI RESPONSE QUALITY

- make immediate analysis more section-specific
- add severity:
  BLOCKING / WARNING / SUGGESTION
- include “why this matters”
- include “recommended user action”
- distinguish source gap from writing improvement
- show no-issue positive confirmation without false approval

V29-B — COURSE DESCRIPTION QA

- create description coverage dashboard
- flag missing source descriptions
- flag source versions with anomalies
- add source locator drawer
- add “view source metadata”
- never edit source-derived text in form

V29-C — CLO/PLO UX

- add visual CLO↔PLO matrix
- add I/R/M working layer
- visually separate canonical mapping and working mapping
- add mapping-gap warning

V29-D — WEEKLY PLANNER EFFICIENCY

- copy week
- multi-week duplicate
- paste table rows
- keyboard navigation
- bulk CLO assignment
- weekly coverage summary
- assessment/evidence heatmap

V29-E — TQF5 REUSE

- stronger TQF3 carry-forward
- plan-vs-actual diff
- auto-create variance prompts
- preserve user edits

V29-F — VERIFICATION EVIDENCE INTAKE

- register evidence reference
- source type
- date
- locator
- authority owner
- hash when available
- candidate state first
- no auto-admission

V29-G — DASHBOARD DRILL-DOWN

- filter by HED/PED
- filter by document state
- filter by evidence state
- filter by readiness
- direct open course
- sort by update
- show missing-description indicator

V29-H — EXPORT

- print preview
- draft watermark
- version label
- provenance footer
- readiness summary
- no official label without authority

V29-I — RETURN TO TQF4/TQF6

- after urgent TQF3/TQF5/verification flow is stable
- keep example templates as REFERENCE_SAMPLE_ONLY
- develop HED3701 through TQF4/TQF6 route
- do not reuse example values as actual results

==================================================
31. AUTOMATIC EXECUTION TRIGGER
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

If V28 visual acceptance has passed:

continue automatically through V29 safe phases
until a true Human Gate is reached.

END MASTER CONTINUATION COMMAND

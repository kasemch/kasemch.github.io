# HEPE FAST TQF PORTAL — MASTER CONTINUATION COMMAND

Effective date: 2026-09-18
Revision: POST-V28 SCOPE / CURRICULUM DESCRIPTION / IMMEDIATE AI
Status: ACTIVE MASTER CONTINUATION COMMAND
Environment: NON-PRODUCTION

Repository:
`kasemch/kasemch.github.io`

Route:
`https://kasemch.github.io/hepe-trial/?v=28`

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
0. PERMANENT CONTINUATION RULE
==================================================

After every major processing batch:

- continue all clear, reversible, non-destructive work automatically
- batch related work
- refresh this command after material state changes
- preserve all approved design locks and governance boundaries
- stop only at a true Human Gate
- never invent curriculum data, evidence, results, approval, or authority
- never promote sample/example documents to factual course content
- never create VERIFIED to demonstrate workflow success
- never mutate immutable R1
- never expose secrets in GitHub Pages

==================================================
1. MASTER UI LOCK
==================================================

Master UI/UX:
APPROVED / LOCKED

File:
`docs/design/hepe-fast-tqf-master-ui-design-lock-v1.md`

Core screens remain:

Login
Academic/Course Selection
TQF3 General+CLO
CLO–PLO
Weekly Planner
Assessment
TQF5
Verification Evidence
Readiness
Programme Dashboard

Major architecture change requires explicit unlock.

==================================================
2. CURRENT UI BASELINE
==================================================

Version:
V28

Files:

`./hepe-trial/index.html`
`./hepe-trial/assets/js/portal-v28.js`
`./hepe-trial/assets/css/portal-v28.css`
`./hepe-trial/config/state.json`

V28 route:

`https://kasemch.github.io/hepe-trial/?v=28`

==================================================
3. FAST TQF COURSE SCOPE — LOCKED
==================================================

The Fast TQF Portal handles only department-owned HED/PED courses.

IN SCOPE:

HED
PED

OUT OF SCOPE:

EDU
RAM / general education

Current curriculum raw composition:

EDU = 13
HED = 28
PED = 37
RAM = 14
TOTAL = 92

Fast TQF scoped total:

HED + PED = 65

This is not merely a UI filter.

Portal catalog/context/dashboard read models enforce HED/PED scope.

==================================================
4. SCOPE EVIDENCE
==================================================

Google Drive source:

`RU-HEPE ฐานข้อมูลหลักสูตรและผู้สอน พ.ศ. 2567`

File ID:

`1Hn7___9uLYPXJ2wT4f9fBQkKmzdHCESoBA4DBptjnhE`

Source states:

department-managed teaching courses are HED/PED only

excluded:

general education
EDU teacher-profession courses managed elsewhere

Use this as the controlled scope rule for Fast TQF Portal.

==================================================
5. PROGRAMME / COURSE UX
==================================================

User flow:

Login
→ Programme
→ HED/PED Course
→ Academic Year
→ Term
→ Curriculum Context
→ TQF3/TQF5/Verification/Readiness/Dashboard

Programme count display now reflects scoped HED/PED course count.

Current scoped course count:

65

Course dropdown must not show:

EDU
RAM

==================================================
6. CURRICULUM DESCRIPTION SOURCE
==================================================

Primary curriculum-book source currently admitted as source-observed:

File:

`หลักสูตรศึกษาศาสตรบัณฑิต HE - PE 67 (1).docx`

Google Drive File ID:

`1E0fXyoOc-v2z-GzEyfGq-JHHKMK9C0xk`

Course-description section:

`3.1.5 คำอธิบายรายวิชา`

Descriptions imported to Sandbox:

64

Scoped courses:

65

Missing:

HED3701

==================================================
7. COURSE DESCRIPTION GOVERNANCE
==================================================

Imported description state:

verification_status:

`SOURCE_TEXT_EXTRACTED`

authority_status:

`CURRICULUM_BOOK_SOURCE_OBSERVED`

status_code:

`DRAFT`

This means:

- text is extracted from the identified curriculum book
- source provenance is visible
- institutional approval state is separate
- do not call it officially approved merely because it came from the curriculum book

HED2503 now uses curriculum-book-derived version 2.

==================================================
8. HED3701 SPECIAL ROUTE
==================================================

HED3701:

field-practicum course

Current course-description extraction:

not available in the same regular course-description pattern.

Therefore:

DO NOT create a description using AI.

Route:

TQF4/TQF6 FIELD PRACTICUM SOURCE WORKFLOW

UI should display this special route clearly.

==================================================
9. CATALOG RPC BASELINE
==================================================

Portal read models:

`hepe_fast_tqf_programme_catalog()`
`hepe_fast_tqf_course_catalog(text,text,text)`
`hepe_fast_tqf_curriculum_context(text,text)`
`hepe_fast_tqf_term_catalog()`
`hepe_fast_tqf_programme_dashboard(text,text,text)`

Current scope rule:

`HED_PED_ONLY`

Anon execute:

DENIED

Authenticated execute:

ALLOWED

==================================================
10. CURRENT VERIFIED RUNTIME
==================================================

Programme scoped courses:

65

Descriptions present:

64

Missing descriptions:

HED3701

AY2569/T1:

offered courses = 30
TQF3 present = 1
TQF5 present = 1
verification present = 1
VERIFIED = 0
INSUFFICIENT_EVIDENCE = 1

Do not inflate or infer missing states.

==================================================
11. TQF3 GENERAL
==================================================

Canonical curriculum fields:

read-only

Includes:

programme
course
Thai title
English title
credits
curriculum version
course description
source reference
source locator
verification status
authority status

If description missing:

do not say simply “no description in database”

Use:

NEEDS CURRICULUM-SOURCE IMPORT

except HED3701:

TQF4/TQF6 SOURCE ROUTE

==================================================
12. TQF3 CLO
==================================================

Structured CLO table:

CLO code
CLO statement
working PLO link
AI analysis
actions

AI is advisory.

Canonical mapping remains separate from working mapping.

==================================================
13. CLO–PLO
==================================================

Matrix direction remains approved.

Rows:

CLO

Columns:

PLO

Values:

I/R/M/none

Never fabricate canonical mapping.

==================================================
14. WEEKLY PLANNER
==================================================

LOCKED.

Columns:

week
topic
CLO
PLO
learning activity
lecture hours
practice hours
self-study hours
assessment/evidence
resources
AI/actions

Default planning rows are UI slots only.

==================================================
15. ASSESSMENT
==================================================

Structured assessment:

item
method
weight
CLO
evidence/rubric
AI

Current core validation:

weight total = 100%

Future:

orphan assessment
missing evidence
rubric completeness
timing
formative/summative balance

==================================================
16. AI IMMEDIATE ANALYSIS — V28 LOCK
==================================================

User requirement:

press AI
→ analysis content must appear immediately in a text box.

V28 implements:

`#ai-analysis-box`

Behavior:

- clicking any section AI button runs Smart QA immediately
- results appear immediately in the visible text area
- suggestion cards appear underneath
- user decides:
  ACCEPTED
  EDITED_AND_ACCEPTED
  REJECTED

ChatGPT handoff is optional deeper analysis.

It is not required for the immediate first response.

==================================================
17. AI GOVERNANCE
==================================================

AI may:

identify gaps
suggest wording
check alignment
summarize evidence gaps
suggest improvements

AI must not:

invent curriculum descriptions
invent canonical mappings
invent student results
invent evidence
change institutional authority
mark VERIFIED
silently overwrite user data
mutate immutable R1

==================================================
18. AUTOSAVE / RECOVERY
==================================================

V27 functionality remains active in V28.

Local autosave:

debounced

Key:

programme
course
year
term

Recovery:

restore matching local draft
discard local draft

Do not restore across course identity.

==================================================
19. TQF5
==================================================

Mode:

Plan → Actual

Current fields:

registered students
students at end
plan vs actual
grade distribution
CLO attainment
problems
CQI
AI review

Keep draft/unverified until evidence supports escalation.

==================================================
20. VERIFICATION
==================================================

Evidence-first.

No VERIFIED shortcut.

Current HED2503:

INSUFFICIENT_EVIDENCE

Evidence candidate:

not automatically admitted

==================================================
21. EVIDENCE WORKSPACE
==================================================

Display:

linked controlled evidence
candidate evidence
source
authority
status

Never auto-admit candidates.

==================================================
22. READINESS
==================================================

Readiness means:

READY FOR INTERNAL REVIEW

not institutional approval.

Continue strengthening:

blocking vs warning
section scores
unresolved AI count
cross-document mismatch
evidence-gap count
export readiness

==================================================
23. PROGRAMME DASHBOARD
==================================================

Current scoped dashboard:

HED/PED only

Current curriculum course count:

65

Current AY2569/T1 offered:

30

Do not show general education or EDU.

==================================================
24. VERSION HISTORY / COMPARE
==================================================

Working version history remains append-only.

Current HED2503 working versions:

5

Compare:

objectives
CLO
weekly plan
assessment
resources
improvement notes

Future:

field-level text diff
week diff
AI-assisted change diff

==================================================
25. CQI
==================================================

Carry-forward remains user-controlled.

No CQI source:

show none

Do not invent.

Future decisions:

IMPLEMENT
MODIFY
NOT_ADOPTED

with rationale and target term.

==================================================
26. HED2503 R1
==================================================

Release:

`HEPE-HED2503-TQF3-2569-1-R1`

Status:

PUBLIC_PUBLISHED

SHA-256:

`799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256`

Immutable.

Never mutate.

==================================================
27. SAMPLE FILE RULE
==================================================

If a source is explicitly described as:

sample
example
template example
ตัวอย่าง
แบบฟอร์มตัวอย่าง
ตัวอย่างการเขียน
mockup
prototype

classification defaults to:

REFERENCE_SAMPLE_ONLY

Use for:

structure
layout
writing pattern
UI testing

Do not use as factual course content without separate evidence.

==================================================
28. NEXT SAFE PRIORITIES
==================================================

V29-A — AI UX polish

- make immediate analysis box larger on desktop
- add Copy Result
- add Clear Result
- add section label/time
- add severity markers
- add “apply to field” only when user explicitly chooses
- never auto-apply

V29-B — Course-description coverage QA

- compare all 64 imported descriptions against source
- flag extraction anomalies
- add source-preview drawer
- add “view source locator”
- maintain HED3701 special route

V29-C — CLO/PLO improvement

- populate verified PLO statements when source available
- build matrix
- distinguish canonical vs working mapping
- add mapping coverage QA

V29-D — Weekly planner efficiency

- copy prior week
- copy prior term
- bulk assign CLO
- bulk assign resources
- hours summary
- incomplete-row indicators

V29-E — Assessment QA

- CLO coverage matrix
- total weight check
- rubric/evidence completeness
- formative/summative classification
- assessment timing

V29-F — Submission readiness

- blocking errors
- warnings
- source gaps
- unresolved AI suggestions
- print/export readiness

V29-G — Dashboard

- filter HED/PED group
- responsible instructor
- document status
- evidence status
- readiness
- due dates

V29-H — Controlled export

- print/PDF preview
- draft watermark
- version number
- provenance footer
- readiness state
- never label official without authority

V29-I — Return to TQF4/TQF6

- after urgent TQF3/TQF5/Verification flow is stable
- HED3701 routes here
- sample forms remain REFERENCE_SAMPLE_ONLY
- use real field-practicum sources before content admission

==================================================
29. TRUE HUMAN GATES
==================================================

Production authorization
secret/credential changes
destructive migration
immutable R1 mutation
historical rewrite
institutional official claim
template authority escalation
evidence admission requiring judgment
VERIFIED decision requiring judgment
master UI unlock
direct protected AI API integration
uncertain curriculum source adoption

Everything else:

continue automatically.

==================================================
30. EXECUTION TRIGGER
==================================================

When user says:

Approve
Resume
Next
Continue
Start
ดำเนินการ
ดำเนินการทันที
ต่อ
ทำต่อ

continue with highest-priority safe work.

Current next safe phase:

V29-A
→ V29-B
→ V29-C
→ V29-D
→ V29-E
→ V29-F
→ V29-G
→ V29-H

Then return to TQF4/TQF6 when urgent workflow is stable.

END MASTER CONTINUATION COMMAND

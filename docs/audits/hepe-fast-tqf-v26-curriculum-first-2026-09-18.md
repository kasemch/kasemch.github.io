# HEPE FAST TQF PORTAL — V26 CURRICULUM-FIRST UX AUDIT

Date: 2026-09-18

Status: READY FOR AUTHENTICATED VISUAL ACCEPTANCE

Environment: NON-PRODUCTION / GitHub Pages + Supabase Sandbox

## Objective

Implement the approved v26 priority set:

1. Programme dropdown using programme names
2. Dependent course dropdown from current curriculum
3. Academic year / term dropdown
4. Curriculum auto-fill with provenance
5. TQF3 weekly teaching planner
6. AI per section with human decision
7. Readiness scoring
8. Cross-document consistency checks

## Database additions

Read-only/authenticated catalog RPCs:

- hepe_fast_tqf_programme_catalog()
- hepe_fast_tqf_course_catalog(text,text,text)
- hepe_fast_tqf_curriculum_context(text,text)
- hepe_fast_tqf_term_catalog()

Anonymous execute:

false

Authenticated execute:

true

## Catalog validation

Verified runtime values:

- real programme count = 1
- current curriculum course count = 92
- academic term count = 2
- programme PLO code count = 7
- HED2503 canonical course→PLO mapping count = 0

Important:

The course dropdown is based on current curriculum membership, not curriculum_courses.is_active alone.

This avoids hiding most curriculum courses because current is_active flags are incomplete for catalogue purposes.

## Curriculum auto-fill

The UI now loads:

- programme title
- curriculum version
- course code
- Thai course title
- English course title
- credit value
- course description
- description provenance
- programme PLO codes
- canonical course→PLO mappings when available

HED2503 description currently has:

- verification_status = SOURCE_TEXT_CROSSCHECKED
- authority_status = WORKING_SOURCE_CANDIDATE

Therefore the UI must not claim that the text is definitively extracted from the official curriculum book.

## Frontend v26

Files:

- ./hepe-trial/index.html
- ./hepe-trial/assets/css/portal-v26.css
- ./hepe-trial/assets/js/portal-v26.js
- ./hepe-trial/config/state.json

All local asset paths remain relative.

## Programme / course UX

Users now select:

Programme Name
→ Course
→ Academic Year
→ Term

Programme code and internal IDs remain behind the UI.

Course dropdown displays:

COURSECODE — Thai title

A marker indicates when a matching course offering exists for the selected academic period.

## TQF3 redesign

### Section 1

Canonical curriculum context and course description are read-only.

Provenance badges are visible.

### Section 2

Structured CLO table includes:

- CLO code
- CLO statement
- PLO linkage
- per-row AI review
- add/delete controls

### Section 3

Replaced free-text teaching-plan entry with weekly planner.

Columns:

- week
- topic/content
- CLO
- PLO
- learning activities
- lecture/practice/self-study hours
- assessment/evidence
- learning resources
- AI / row actions

Rows can be added, duplicated, and deleted.

Default rows are UI planning slots only; they are not evidence of an official number of teaching weeks.

### Section 4

Structured assessment planner includes:

- assessment item
- method
- weight
- linked CLO
- evidence/rubric
- per-row AI review

The portal checks whether total assessment weight equals 100%.

### Section 5

Resources and improvement notes remain structured text areas.

## AI interaction

AI support is implemented as:

1. Local Smart QA rules
2. Section-specific ChatGPT handoff

Every Smart QA suggestion supports:

- ACCEPTED
- EDITED_AND_ACCEPTED
- REJECTED

Decisions are stored in the working document metadata when the user saves.

AI never silently edits canonical curriculum data.

No AI secret/API key is embedded in GitHub Pages.

## TQF5

The v26 TQF5 screen supports:

- registered students
- students at end
- plan vs actual narrative
- grade distribution
- CLO attainment
- problems/issues
- CQI plan
- AI review

Cross-document checking compares the TQF3 CLO set with TQF5 CLO attainment.

## Verification

Verification remains evidence-gated.

The UI includes an evidence checklist and reviewer note.

No VERIFIED shortcut is exposed.

## Readiness

Readiness currently checks:

- curriculum context
- course description availability/provenance
- CLO completeness
- weekly plan coverage
- assessment total
- TQF3↔TQF5 CLO consistency
- verification state
- AI decision tracking

Readiness is explicitly internal-review readiness, not institutional approval.

## Regression results

Repository readback:

- JS syntax parse = PASS
- required DOM elements = PASS
- v26 CSS linked using relative path = PASS
- v26 JS linked using relative path = PASS

Catalog/RPC ACL:

- anon programme = false
- anon course = false
- anon term = false
- anon curriculum = false
- authenticated equivalents = true

Rollback-safe TQF3 write test:

PASS

No rollback test data persisted.

## Runtime invariants

HED2503 working TQF3:

- current version = 5
- version count = 5

HED2503 TQF5 snapshot count:

- 1

HED2503 verification:

- INSUFFICIENT_EVIDENCE

R1:

- PUBLIC_PUBLISHED
- SHA-256 = 799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256

R1 was not mutated.

Production remains unauthorized.

## Visual verification limitation

The public route could not be independently fetched from the current web-check environment.

Therefore:

repository implementation = VERIFIED

database runtime = VERIFIED

authenticated visual runtime = REQUIRES USER BROWSER ACCEPTANCE

## Next safe continuation

After visual acceptance, continue automatically with:

1. Smart autosave/local recovery
2. course dashboard readiness list
3. programme dashboard
4. evidence workspace refinement
5. version comparison
6. CQI carry-forward
7. export/preview refinement

## Production boundary

Production authorization remains FALSE.

No production deployment, authority escalation, secret change, or immutable-release mutation occurred.

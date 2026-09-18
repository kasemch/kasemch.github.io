# HEPE FAST TQF PORTAL — MASTER CONTINUATION COMMAND

Effective date: 2026-09-18

Status: ACTIVE MASTER CONTINUATION COMMAND

Project: HEPE Fast TQF Portal / GitHub Pages / Supabase Sandbox

Repository:

`kasemch/kasemch.github.io`

Public route:

`https://kasemch.github.io/hepe-trial/`

Mode:

NON-PRODUCTION

Evidence-First

No Fabrication

Fail-Closed Governance

Human-in-the-Loop

Static-Web First

Batch Execution + Exception Stop

Minimum User Effort

Maximum Safe Continuation

==================================================
0. PERMANENT EXECUTION RULE
==================================================

From this point onward, after every major processing step, implementation batch, audit, refactor, design decision, data reconciliation, or feature completion, generate and refresh a long continuation command that allows work to continue as far as possible without requiring the user to repeatedly issue small follow-up instructions.

The assistant should:

1. Continue all clear, reversible, non-destructive work automatically.
2. Batch related tasks instead of stopping after every small change.
3. Preserve previously approved/frozen/locked decisions.
4. Reuse existing data and architecture before creating parallel structures.
5. Stop only at genuine Human Gates.
6. Never interpret silence as approval for authority escalation, Production, destructive changes, secret changes, or immutable-release mutation.
7. Always finish each major batch with:
   - current state,
   - what changed,
   - what remains,
   - risks/gaps,
   - next automatic steps,
   - true Human Gates,
   - refreshed continuation command.

==================================================
1. ROLE
==================================================

Operate as:

Senior Frontend & Static Web Engineer
+
Academic QA / TQF Workflow Systems Engineer
+
Evidence Governance Engineer
+
AI-assisted Academic Workflow Designer

Primary objective:

Deliver a practical, evidence-aware, user-friendly TQF workflow that minimizes duplicate work while keeping human academic judgment and institutional authority under human control.

==================================================
2. STATIC WEB CONSTRAINTS
==================================================

The GitHub Pages frontend must remain deployable as a static website.

Allowed:

- HTML5
- Vanilla CSS
- JavaScript ES6+
- Supabase JS client
- approved CDN libraries where justified
- Jekyll if needed
- external APIs via fetch/RPC

Prohibited unless separately authorized:

- Node.js server
- Express
- PHP
- Python Flask/Django backend
- server-side custom runtime

Path rule:

All local asset references must use relative paths.

Examples:

`./assets/css/app.css`
`./assets/js/app.js`

Never assume root-relative paths for repository-subdirectory compatibility.

==================================================
3. ENVIRONMENT BOUNDARY
==================================================

Current environment:

NON-PRODUCTION

Supabase project:

`lztxpjsuzqvtgyasfnyj`

Name:

HEPE Curriculum Command Center Sandbox

Production:

NOT AUTHORIZED

Do not infer Production authorization from:

- UI approval
- code approval
- visual approval
- feature acceptance
- template approval
- test success
- repository merge
- sandbox success

==================================================
4. MASTER UI/UX LOCK
==================================================

Master design:

HEPE Fast TQF Portal — Master UI/UX Design Direction v1.0

Status:

APPROVED / LOCKED

Design lock file:

`docs/design/hepe-fast-tqf-master-ui-design-lock-v1.md`

Commit:

`74b41597a8353b9b7b19674f476311f59ed2b1b7`

The 10-screen concept set is the master UI direction.

Locked screens:

1. Login
2. Academic Dashboard / Course Selection
3. TQF3 General + CLO Form
4. CLO–PLO Mapping
5. Weekly Teaching Plan
6. TQF3 Assessment
7. TQF5 Results Dashboard
8. Verification Evidence Workspace
9. Readiness / Cross-document Consistency
10. Programme Dashboard

Do not substantially change this architecture without explicit Unlock / Change Request.

==================================================
5. VISUAL LANGUAGE LOCK
==================================================

Use:

- academic professional visual language
- white/off-white background
- navy primary structure
- crimson accent
- green complete/pass
- amber review/warning
- red evidence gap/blocking
- light blue/slate supporting surfaces

Design traits:

- high information density but readable
- desktop-first responsive layout
- clear card hierarchy
- strong status visibility
- Thai-first labels
- English technical terms where useful
- evidence/governance-oriented interaction patterns
- avoid generic SaaS appearance where possible

==================================================
6. CURRENT URGENT OPERATIONAL SCOPE
==================================================

Priority operational modules:

- Login
- TQF3
- TQF5
- Verification

Deferred until urgent submission path is stable:

- TQF4
- TQF6
- TQF7 UI expansion
- advanced programme reporting
- advanced export
- production activation

==================================================
7. CURRENT FAST PORTAL BASELINE
==================================================

Route:

`./hepe-trial/`

Current urgent portal baseline includes:

- authentication
- Magic Link
- password login if configured
- TQF3 structured form
- TQF5 structured form
- verification checklist/workflow
- browser-side Smart QA
- ChatGPT handoff
- relative asset paths

Do not reintroduce raw JSON as the primary user interaction.

JSON may exist only in advanced/debug mode.

==================================================
8. PROGRAMME-FIRST UX
==================================================

Replace code-first selection with human-readable curriculum selection.

Required flow:

Programme Name
→ Course
→ Academic Year
→ Term
→ Curriculum Context
→ TQF document

Programme selector must display:

- programme title
- optional version label
- optional year/revision

Do not require ordinary users to know programme_code.

Store programme_code internally.

==================================================
9. DEPENDENT COURSE DROPDOWN
==================================================

After programme selection:

Course dropdown must be generated from the selected current curriculum version.

Display:

`COURSECODE — ชื่อรายวิชา`

Search should support:

- course code
- Thai title
- English title

Important current data rule:

Do not use `curriculum_courses.is_active=true` alone as the dropdown filter.

Reason:

Current curriculum version contains 92 curriculum courses, while only a narrow subset currently has `is_active=true`.

Course inclusion should be based primarily on membership in the current curriculum version, subject to later governance refinement.

==================================================
10. CURRICULUM CATALOG RPC BASELINE
==================================================

Use and preserve the current catalog RPC direction:

- `hepe_fast_tqf_programme_catalog()`
- `hepe_fast_tqf_course_catalog(...)`
- `hepe_fast_tqf_curriculum_context(...)`

Rules:

- authenticated only
- no anonymous execute
- non-destructive
- provenance-aware
- do not expose sensitive/internal-only data unnecessarily

Continue testing catalog RPCs through rollback-safe or read-only checks before UI integration.

==================================================
11. CANONICAL CURRICULUM AUTO-FILL
==================================================

Canonical curriculum data should auto-fill where available.

Candidate fields:

- programme title
- course code
- Thai course title
- English course title
- credits
- curriculum version
- course description
- PLO catalog
- course→PLO / I-R-M mapping
- recommended year/term where reliable

Canonical fields should be read-only in the ordinary form.

If users need to propose a change, create a proposal/draft layer rather than silently editing canonical curriculum data.

==================================================
12. COURSE DESCRIPTION AUTHORITY RULE
==================================================

Course description must not be labeled “from official curriculum book” unless provenance actually supports that claim.

Current HED2503 course-description state:

- source text exists
- source has been cross-checked
- authority_status = WORKING_SOURCE_CANDIDATE
- source is not yet proven as direct authoritative curriculum-book extraction

Therefore UI must show provenance badges accurately, such as:

- Verified Curriculum Source
- Working Source Candidate
- Cross-checked Source
- Needs Authority Review

Never overstate source authority.

==================================================
13. TQF3 SECTION 1
==================================================

General course information should auto-fill from curriculum context wherever possible.

Examples:

- course code
- Thai title
- English title
- credits
- curriculum version
- programme
- course description

User should not retype information already known from the curriculum database.

==================================================
14. TQF3 SECTION 2 — CLO
==================================================

Provide structured CLO entry.

Columns:

- CLO code
- CLO statement
- learning domain if used
- PLO linkage
- optional I/R/M relationship
- AI review
- action

AI may analyze:

- measurability
- action verbs
- ambiguity
- duplication
- scope
- CLO–PLO alignment

AI must not overwrite automatically.

Each recommendation must support:

- Accept
- Edit then Accept
- Reject

==================================================
15. CLO–PLO MAPPING
==================================================

Provide a visual matrix.

Rows:

CLOs

Columns:

PLO1…PLO7 or relevant programme outcomes

Cells:

- I
- R
- M
- none

Display:

- coverage
- missing PLO relationships
- over-mapping
- concentration risk
- unsupported mapping
- source/provenance where mappings come from curriculum data

Do not fabricate mapping where none exists.

==================================================
16. TQF3 SECTION 3 — WEEKLY PLANNER
==================================================

This direction is LOCKED.

Do not use one large free-text area as the primary interface.

Use weekly rows.

Recommended columns:

1. Week
2. Topic / Content
3. CLO
4. PLO
5. Learning Activities
6. Theory / Practice / Self-study Hours
7. Assessment / Evidence
8. Learning Resources
9. AI Review
10. Actions

Functions:

- Add week
- Duplicate week
- Reorder
- Delete
- Copy from prior term
- AI analyze row
- AI analyze full term
- completeness status
- alignment status

AI should check:

Topic
→ CLO
→ Activity
→ Assessment
→ Evidence

==================================================
17. WEEKLY PLAN HOURS CHECK
==================================================

Where the course credit pattern is authoritative, calculate expected hours.

Checks may include:

- total lecture hours
- practice hours
- self-study hours
- weekly allocation
- term total

Do not infer a credit pattern from examples.

If authoritative credit pattern is unavailable:

display:

`Credit-hour pattern requires source verification`

instead of manufacturing values.

==================================================
18. TQF3 ASSESSMENT MODULE
==================================================

Structured assessment planning should include:

- assessment item
- method
- weight
- linked CLO
- evidence type
- rubric
- timing/week

Validation:

- weights sum to 100%
- every assessed CLO has evidence
- no assessment item with no intended learning outcome
- formative/summative balance visible
- duplicate or overloaded assessment detected

==================================================
19. AI HUMAN-IN-THE-LOOP LOCK
==================================================

AI is advisory only.

Every recommendation must exist as a proposal state.

Recommended lifecycle:

`SUGGESTED`
→ `ACCEPTED`
or
→ `EDITED_AND_ACCEPTED`
or
→ `REJECTED`

Recommended audit fields:

- suggestion_id
- document_type
- section
- target_field
- suggestion_text
- rationale
- model/source
- created_at
- decision
- user_edited_text
- decided_by
- decided_at

Never silently replace user content.

==================================================
20. AI PER-SECTION FUNCTIONS
==================================================

Every major section should have its own AI tools.

Examples:

- Analyze completeness
- Suggest wording
- Check internal consistency
- Check CLO–PLO alignment
- Check assessment alignment
- Identify missing evidence
- Suggest questions for reviewer
- Suggest CQI action

AI output should clearly distinguish:

- observed issue
- suggestion
- optional rewrite
- evidence gap
- user decision required

==================================================
21. TQF5 PLAN→ACTUAL CARRY-FORWARD
==================================================

TQF5 should reuse TQF3 plan data.

Do not ask users to re-enter:

- CLO list
- planned assessments
- weekly plan
- assessment weights
- rubric references

TQF5 user input should focus on:

- actual student numbers
- actual implementation
- deviations from plan
- grades/results
- CLO attainment
- student feedback
- problems
- improvement/CQI

==================================================
22. TQF5 CROSS-CHECKS
==================================================

Implement automated checks such as:

- student_count consistency
- grade percentages ≈ 100%
- CLO list matches TQF3
- result exists for every assessed CLO
- actual assessment does not unexpectedly contradict TQF3
- plan/actual variance documented
- CQI linked to observed issue

==================================================
23. VERIFICATION EVIDENCE WORKSPACE
==================================================

Verification must be evidence-driven.

Evidence categories include:

- committee appointment/order
- minutes
- attendance
- sampling list
- student work/answer scripts
- scoring evidence
- re-scoring
- reviewer comparison
- signed/controlled decision

Each item should have status such as:

- PRESENT
- INCOMPLETE
- CONFLICT
- MISSING
- NOT_APPLICABLE

AI may summarize gaps.

AI may not mark VERIFIED.

==================================================
24. VERIFIED GATE
==================================================

No shortcut to VERIFIED.

VERIFIED requires server-side evidence rules.

UI may show:

- eligible
- blocked
- missing evidence
- conflict

Final transition remains governed.

==================================================
25. READINESS ENGINE
==================================================

Create document readiness score.

Suggested categories:

- required fields
- curriculum consistency
- CLO completeness
- CLO–PLO alignment
- weekly plan completeness
- assessment completeness
- cross-document consistency
- evidence completeness
- unresolved AI suggestions

Readiness should never be presented as institutional approval.

Use language such as:

`Ready for internal review`

rather than:

`Officially approved`

unless authority supports it.

==================================================
26. CROSS-DOCUMENT CONSISTENCY
==================================================

Check:

TQF3
↔ TQF5
↔ Verification

Examples:

- CLO count mismatch
- CLO code mismatch
- assessment-weight mismatch
- TQF5 results without planned assessment
- verification evidence referencing missing CLO
- student counts inconsistent across sources
- CQI disconnected from observed problem

Produce:

- pass
- warning
- blocking issue
- source references

==================================================
27. PROGRAMME DASHBOARD
==================================================

Programme-level screen should display:

- total curriculum courses
- TQF3 completion
- TQF5 completion
- verification status
- evidence gaps
- readiness
- deadlines
- recently updated documents

Provide filters:

- academic year
- term
- course group
- document state
- evidence state
- responsible instructor where authorized

==================================================
28. VERSIONING
==================================================

Preserve append-only working version behavior where feasible.

Do not mutate immutable/frozen release objects.

For HED2503 R1:

Release code:

`HEPE-HED2503-TQF3-2569-1-R1`

SHA-256:

`799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256`

R1 must remain immutable.

==================================================
29. SAMPLE FILE RULE
==================================================

Files explicitly described as:

- ตัวอย่าง
- แบบฟอร์มตัวอย่าง
- ตัวอย่างการเขียน
- sample
- example
- mockup
- prototype

must default to:

`REFERENCE_SAMPLE_ONLY`

Allowed use:

- layout
- field structure
- wording pattern
- UI concept
- renderer testing

Prohibited use without separate confirmation:

- real course values
- names
- dates
- student numbers
- results
- grades
- percentages
- actual authority
- actual approval

==================================================
30. TEMPLATE AUTHORITY
==================================================

Current TQF4/TQF5/TQF6 generic templates must not automatically become institutional official forms.

Keep authority labels precise.

Current governance default:

TQF4:
UNDER_REVIEW

TQF5:
UNDER_REVIEW

TQF6:
UNDER_REVIEW

Do not promote without stronger authoritative evidence.

==================================================
31. LOGIN
==================================================

Preserve practical login path.

Supported current direction:

- Magic Link
- password login if account configured

Future:

- institutional SSO may be added if available and authorized

Do not expose authenticated data to anonymous users.

==================================================
32. AUTOSAVE
==================================================

Implement Smart Autosave after urgent stable version if safe.

Recommended behavior:

- local form state save
- server-side draft save at controlled intervals
- visible status:
  - Unsaved
  - Saving
  - Saved
  - Save failed

Avoid excessive version creation from every keystroke.

Use staged autosave or local working buffer.

==================================================
33. DRAFT RECOVERY
==================================================

Provide recovery for:

- browser crash
- session expiration
- accidental navigation
- temporary network loss

Possible implementation:

- localStorage/sessionStorage buffer
- timestamp
- course/document key
- controlled restore prompt

Never restore across wrong course/document identity.

==================================================
34. VERSION COMPARE
==================================================

Future enhancement:

Compare:

- current draft vs previous draft
- current term vs previous term
- current TQF3 vs prior-year TQF3

Highlight:

- added
- removed
- modified
- curriculum-derived changes
- user changes
- AI-assisted accepted changes

==================================================
35. CQI CLOSED LOOP
==================================================

TQF5 improvement actions should become future TQF3 review prompts.

Example:

TQF5 issue:
CLO3 attainment below target

CQI action:
increase structured practice

Next TQF3:
show prior CQI prompt

User decision:

- implemented
- modified
- rejected with rationale

==================================================
36. EVIDENCE PROVENANCE DRAWER
==================================================

Each source-derived field should support a provenance drawer.

Display:

- source type
- source reference
- curriculum version
- page/locator
- source status
- verification status
- authority status

This is especially important for:

- course description
- PLOs
- curriculum mapping
- course title
- credits
- official result/evidence data

==================================================
37. EXPORT
==================================================

Near-term export:

- browser print
- Save as PDF

Future controlled export:

- structured PDF
- DOCX if safe generation pipeline exists
- controlled watermark
- document version
- evidence/readiness status

Never label a draft export as official.

==================================================
38. ACCESSIBILITY
==================================================

Improve progressively:

- keyboard navigation
- visible focus
- semantic labels
- sufficient contrast
- ARIA where appropriate
- tables readable on mobile
- clear error messages

==================================================
39. PERFORMANCE
==================================================

Optimize:

- cache catalog data per session
- avoid repeated identical RPC calls
- lazy render complex dashboards
- debounce local AI/QA checks
- version asset filenames or query strings for cache busting

==================================================
40. SECURITY
==================================================

Never place secret API keys in GitHub Pages.

Public Supabase publishable key is acceptable only within intended security model.

All sensitive data access must rely on:

- authentication
- RPC authorization
- RLS/authority checks
- minimal data exposure

AI integrations requiring secrets must use a safe external authorized mechanism, not embedded browser secrets.

==================================================
41. AI INTEGRATION CURRENT MODE
==================================================

Current safe mode:

- browser-side Smart QA
- structured ChatGPT prompt handoff

Future direct AI API integration requires:

- secret-safe architecture
- authority review
- privacy review
- scope review

Do not embed private API keys in static files.

==================================================
42. CURRENT DATA QUALITY LIMITATIONS
==================================================

Known items that must remain visible:

- curriculum_course.is_active flag is not suitable as sole inclusion rule
- HED2503 course description is cross-checked but currently has working-source authority
- PLO codes exist but current PLO statement versions may still be incomplete in runtime tables
- course→PLO mappings may be incomplete or absent in current runtime

UI must display unavailable mapping/authority honestly.

Do not synthesize missing mapping.

==================================================
43. CURRENT HUMAN GATES
==================================================

Human approval is required before:

- Production deployment
- secret/credential changes
- destructive database actions
- immutable R1 mutation
- historical lifecycle rewrite
- institutional-official claim
- template authority escalation
- automatic VERIFIED transition
- design unlock affecting locked 10-screen architecture
- adoption of uncertain canonical curriculum values

==================================================
44. AUTOMATIC CONTINUATION PRIORITY
==================================================

Continue automatically in this order unless blocked:

PHASE A — v26 Curriculum-first UX

1. Finish catalog RPC validation.
2. Integrate programme dropdown.
3. Integrate dependent course dropdown.
4. Integrate year/term selection.
5. Load curriculum context.
6. Display course source/provenance.
7. Auto-fill course description safely.

PHASE B — TQF3 Structured UX

8. Refine General section.
9. Refine CLO table.
10. Implement CLO–PLO matrix shell.
11. Implement weekly planner.
12. Implement assessment planner.
13. Implement per-section AI buttons.

PHASE C — Smart QA

14. Add readiness scoring.
15. Add alignment checks.
16. Add cross-document consistency.
17. Add user-decision workflow for AI suggestions.

PHASE D — TQF5

18. Carry TQF3 structure forward.
19. Add plan/actual comparison.
20. Add grade/CLO result checks.
21. Add problem/CQI section.
22. Add AI review.

PHASE E — Verification

23. Evidence checklist.
24. Evidence workspace.
25. gap/conflict status.
26. AI evidence summary.
27. preserve VERIFIED gate.

PHASE F — Dashboard

28. course readiness dashboard.
29. programme overview.
30. deadlines/status filters.
31. evidence-gap summary.

==================================================
45. TESTING RULE
==================================================

After every major implementation batch:

Run:

- JS parse/syntax check
- relative path check
- authenticated RPC access check
- anonymous RPC denial check
- rollback-safe write test where possible
- data invariant check
- R1 immutability check
- visual route/readback where available

Do not claim live browser success if not independently observed.

==================================================
46. AUDIT RULE
==================================================

Every major phase should create/update an audit file under:

`docs/audits/`

Each audit should include:

- objective
- source
- implementation
- tests
- invariants
- limitations
- production boundary
- next gate

==================================================
47. DESIGN DOCUMENTATION
==================================================

Keep design artifacts under:

`docs/design/`

Keep operational commands under:

`docs/commands/`

Keep governance documents under:

`docs/governance/`

Keep audits under:

`docs/audits/`

==================================================
48. RESPONSE RULE
==================================================

When reporting progress to the user:

Use Thai.

Keep the main summary concise and useful.

Clearly distinguish:

- verified fact
- working source
- source-observed
- AI suggestion
- inferred design proposal
- future claim
- missing evidence

Do not bury blockers.

==================================================
49. LONG CONTINUATION COMMAND RULE
==================================================

After every future major processing response, include a refreshed long continuation command.

The command should:

- inherit this master command
- include new approved decisions
- include new IDs/versions/commits where material
- update current phase
- update blockers
- update true Human Gates
- preserve locked constraints
- maximize safe automatic continuation

Do not shorten the continuation command merely for convenience if major state changed.

==================================================
50. END STATE TARGET
==================================================

Target user journey:

Login
→ Select Programme
→ Select Course
→ Select Year/Term
→ Load Canonical Curriculum Data
→ Create/Update TQF3
→ Weekly Teaching Plan
→ Assessment Alignment
→ AI Review + User Decision
→ Readiness Check
→ Teaching Execution
→ TQF5 Plan-vs-Actual
→ Verification Evidence
→ Governed Review
→ CQI
→ Programme Dashboard
→ Next-cycle TQF3 reuse

System characteristics:

- minimal duplicate data entry
- evidence traceability
- curriculum consistency
- AI-assisted but human-controlled
- versioned
- auditable
- static-web compatible
- non-production until explicitly authorized

==================================================
51. CURRENT LOCK STATEMENT
==================================================

MASTER UI/UX:

LOCKED

WEEKLY PLANNER:

LOCKED

PROGRAMME-FIRST UX:

APPROVED

DEPENDENT COURSE DROPDOWN:

APPROVED

CURRICULUM AUTO-FILL:

APPROVED

AI PER SECTION:

APPROVED

AI HUMAN DECISION:

MANDATORY

READINESS ENGINE:

APPROVED DIRECTION

CROSS-DOCUMENT CONSISTENCY:

APPROVED DIRECTION

PRODUCTION:

NOT AUTHORIZED

==================================================
52. EXECUTION START COMMAND
==================================================

When the user says any of:

Approve
Start
Resume
Next
Continue
ดำเนินการ
ดำเนินการทันที
ต่อ
ทำต่อ

immediately continue with the highest-priority safe step in Section 44.

Do not ask unnecessary clarification questions.

Use Exception Stop only when a true Human Gate is encountered.

END MASTER CONTINUATION COMMAND

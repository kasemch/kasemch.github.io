# HEPE FAST TQF PORTAL — MASTER CONTINUATION COMMAND

Effective date: 2026-09-18

Revision: POST-V29 SCOPE / DESCRIPTION / INSTANT-AI FIX

Status: ACTIVE

Repository:

`kasemch/kasemch.github.io`

Public route:

`https://kasemch.github.io/hepe-trial/`

Current live frontend generation:

V29

Environment:

NON-PRODUCTION

Operating mode:

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

After every material implementation, audit, data reconciliation, UI change, workflow enhancement, source-admission review, or governance change:

1. Continue all safe, clear, reversible work automatically.
2. Batch related tasks instead of stopping after each small change.
3. Preserve approved locks and frozen baselines.
4. Reuse existing schema/RPC/views before creating parallel structures.
5. Prefer read-only or append-only operations over destructive changes.
6. Stop only at genuine Human Gates.
7. Never infer Production authorization.
8. Never infer institutional authority from a working source.
9. Never fabricate curriculum content, evidence, results, signatures, approvals, mappings, or verification outcomes.
10. Refresh this command after material state changes.
11. Finish each major batch with current state, regression result, open gap, next steps, and Human Gates.
12. Keep all local GitHub Pages asset paths relative.
13. Keep the frontend static-web compatible.
14. Do not create a second source of truth when an existing governed structure already exists.
15. Distinguish canonical curriculum data from working document data and AI suggestions.

==================================================
1. CURRENT MASTER UI
==================================================

Master UI/UX Direction:

APPROVED / LOCKED

Design baseline:

10-screen HEPE Fast TQF Portal architecture

1. Login
2. Programme / Course Selection
3. TQF3 General + CLO
4. CLO–PLO Mapping
5. Weekly Teaching Plan
6. TQF3 Assessment
7. TQF5 Results
8. Verification Evidence Workspace
9. Readiness / Cross-document Consistency
10. Programme Dashboard

Do not substantially alter the architecture without explicit Unlock / Change Request.

==================================================
2. CURRENT LIVE FRONTEND
==================================================

Live file set:

`./hepe-trial/index.html`

`./hepe-trial/assets/js/portal-v29.js`

`./hepe-trial/assets/css/portal-v29.css`

`./hepe-trial/config/state.json`

Current UI:

V29

Do not downgrade to v28 or earlier.

==================================================
3. CURRENT SCOPE LOCK
==================================================

This portal is NOT responsible for:

1. General Education courses
2. EDU-prefix courses

Current implementation identifies:

General Education:

`RAM*`

Education-core excluded group:

`EDU*`

Backend scope helper:

`private.hepe_fast_tqf_course_in_scope(text)`

Current inclusion rule:

Course must belong to the current curriculum version

AND

course_code must NOT begin with:

`EDU`

or

`RAM`

==================================================
4. VERIFIED CURRENT COURSE COUNTS
==================================================

Current curriculum total:

92 courses

Excluded EDU:

13

Excluded RAM/general education:

14

Current portal in-scope courses:

65

Programme catalogue must show:

65

Programme dashboard must show:

65

Do not display or operate on EDU/RAM courses.

==================================================
5. BACKEND SCOPE ENFORCEMENT
==================================================

Scope must not rely only on frontend filtering.

Current protected entry points include:

`hepe_fast_tqf_course_catalog`

`hepe_fast_tqf_curriculum_context`

`hepe_fast_tqf_programme_dashboard`

`hepe_fast_tqf_portal_context_by_code`

`hepe_save_tqf3_working_version_by_code`

`hepe_create_tqf5_working_draft_by_code`

`hepe_ensure_verification_draft_by_code`

Out-of-scope calls must fail with:

`COURSE_OUT_OF_SCOPE`

Verified examples:

EDU1202:

BLOCKED

RAM1112:

BLOCKED

==================================================
6. PROGRAMME-FIRST USER FLOW
==================================================

User workflow:

Login
→ Select Programme by Name
→ Select In-scope Course
→ Select Academic Year
→ Select Term
→ Load Curriculum Context
→ TQF3 / TQF5 / Verification / Readiness / Dashboard

Do not require users to type internal codes manually.

==================================================
7. COURSE DESCRIPTION RULE
==================================================

Primary source:

`course_description_versions`

Current in-scope coverage:

65 eligible courses

64 with current canonical description

1 without current canonical description

The only currently missing course:

`HED3701`

Title:

การฝึกปฏิบัติวิชาชีพครูระหว่างเรียนวิชาเอกสุขศึกษาและพลศึกษา

==================================================
8. HED3701 DESCRIPTION RULE
==================================================

HED3701 currently returns:

`MISSING_CANONICAL_DESCRIPTION`

Do not:

- fabricate a description
- infer description from the uploaded TQF4/TQF6 sample
- use sample values as real course data
- ask AI to invent canonical curriculum wording

Allowed:

- identify source gap
- later ingest verified curriculum-book text
- show a controlled missing-source message

==================================================
9. COURSE DESCRIPTION FALLBACK
==================================================

If canonical curriculum description exists:

display canonical description

read-only

with provenance.

If canonical description does not exist but a real Working TQF3 contains a course description:

display as:

`WORKING FALLBACK — NON-CANONICAL`

and clearly state that curriculum-source confirmation is required.

If no source exists:

display missing-source status.

AI must never fill a canonical curriculum description automatically.

==================================================
10. HED2503 DESCRIPTION STATE
==================================================

Verified:

HED2503 description_status:

`AVAILABLE`

HED2503 has description text:

TRUE

Previous authority state must continue to be shown accurately.

Do not remove provenance badges.

==================================================
11. AI INTERACTION RULE
==================================================

When a user clicks:

AI วิเคราะห์

the system must immediately place analysis text in the visible text area.

Current live textbox:

`#ai-analysis-box`

Do not require a second click to see analysis.

Do not open ChatGPT first for basic analysis.

Local Smart QA must return useful text instantly.

==================================================
12. AI ANALYSIS BOX
==================================================

The visible AI analysis text should include:

- section name
- course code
- course title
- detected issue
- severity
- explanation
- rationale
- recommended action
- reminder that the user decides

Only one instant-analysis box should exist.

Duplicate AI output boxes are prohibited.

==================================================
13. AI HUMAN-IN-THE-LOOP
==================================================

Suggestion lifecycle:

SUGGESTED

→ ACCEPTED

or

→ EDITED_AND_ACCEPTED

or

→ REJECTED

AI must not silently write over user content.

AI must not alter canonical data.

AI must not create institutional approval.

AI must not mark verification VERIFIED.

==================================================
14. DIRECT CHATGPT HANDOFF
==================================================

Current direct AI enhancement:

structured prompt handoff to ChatGPT

Use only for deeper analysis after local Smart QA.

The local page itself must still show immediate analysis first.

No private API key may be embedded in GitHub Pages.

==================================================
15. TQF3 SECTION 1
==================================================

Read-only curriculum-derived fields include:

- programme
- course code
- Thai title
- English title
- credit value
- curriculum version
- course description
- provenance

Working edits must be separated from canonical curriculum data.

==================================================
16. TQF3 SECTION 2
==================================================

Structured CLO fields:

- CLO code
- CLO statement
- working PLO link
- AI review
- row actions

AI checks:

- measurable verb
- ambiguity
- duplication
- missing PLO link
- overly broad scope

==================================================
17. CLO–PLO
==================================================

Canonical mapping and working mapping must remain separate.

Current HED2503 canonical course→PLO mapping:

0

Do not fabricate.

Future matrix:

rows = CLO

columns = PLO1–PLO7

values = I / R / M / none

==================================================
18. TQF3 WEEKLY PLANNER
==================================================

LOCKED UX.

Columns:

- week
- topic/content
- CLO
- PLO
- learning activities
- lecture hours
- practice hours
- self-study hours
- assessment/evidence
- learning resources
- AI/action

Default planning rows are UI slots only.

Do not claim official term-week structure unless verified.

==================================================
19. ASSESSMENT MODULE
==================================================

Current fields:

- assessment item
- method
- weight
- CLO
- evidence/rubric
- AI review

Current key validation:

assessment total = 100%

Future advanced validation:

- orphan assessment
- missing CLO evidence
- missing rubric
- overload/duplication
- timing mismatch
- formative/summative imbalance

==================================================
20. TQF5
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

TQF5 remains DRAFT / UNVERIFIED until governed evidence permits escalation.

==================================================
21. VERIFICATION
==================================================

Evidence-first.

Current HED2503 status:

`INSUFFICIENT_EVIDENCE`

No VERIFIED shortcut.

Evidence categories:

- committee appointment
- minutes
- attendance
- sampling
- student artifacts
- rescoring
- reviewer comparison
- signed/controlled decision

==================================================
22. AUTOSAVE / RECOVERY
==================================================

Current implementation:

localStorage

debounced

keyed by:

programme/course/year/term

Do not create a server version for every keystroke.

Recovery must never cross course identity.

==================================================
23. VERSION HISTORY
==================================================

HED2503 current working TQF3:

current version = 5

version count = 5

History is append-only.

Never rewrite prior working versions.

==================================================
24. IMMUTABLE R1
==================================================

Release:

`HEPE-HED2503-TQF3-2569-1-R1`

Status:

`PUBLIC_PUBLISHED`

SHA-256:

`799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256`

Never mutate R1.

==================================================
25. PROGRAMME DASHBOARD
==================================================

Dashboard now follows the in-scope course rule.

Expected curriculum-course count:

65

Do not include EDU or RAM.

Do not fabricate statuses for courses without operational data.

==================================================
26. CURRENT FRONTEND REGRESSION
==================================================

V29 JS syntax:

PASS

Live JS:

portal-v29.js

Live CSS:

portal-v29.css

Scope notice:

PRESENT

Instant AI box count:

1

AI immediate-text logic:

PRESENT

Description fallback logic:

PRESENT

==================================================
27. CURRENT BACKEND REGRESSION
==================================================

Filtered course catalogue:

65

Filtered programme dashboard:

65

HED2503 description:

AVAILABLE

HED3701 description:

MISSING_CANONICAL_DESCRIPTION

EDU1202:

COURSE_OUT_OF_SCOPE

RAM1112:

COURSE_OUT_OF_SCOPE

R1:

UNCHANGED

==================================================
28. CURRENT AUDIT
==================================================

Latest audit:

`docs/audits/hepe-fast-tqf-v29-scope-description-instant-ai-2026-09-18.md`

==================================================
29. NEXT SAFE AUTOMATIC PHASE
==================================================

PHASE V30-A — CURRICULUM DESCRIPTION CLOSURE

1. Identify authoritative curriculum source for HED3701.
2. Do not use the TQF4/TQF6 sample as factual content.
3. Search existing controlled curriculum records / repository / approved source index.
4. If authoritative text exists, prepare candidate.
5. Verify source reference and locator.
6. Admit only after evidence rules are satisfied.
7. Re-run 65/65 description coverage check.

PHASE V30-B — COURSE SCOPE HARDENING

8. Add explicit scope metadata to remaining read-model RPCs.
9. Add automated regression list for all EDU/RAM codes.
10. Verify no out-of-scope course appears in dropdown.
11. Verify no out-of-scope course appears in dashboard.
12. Verify direct operational RPC writes fail.

PHASE V30-C — AI UX IMPROVEMENT

13. Keep instant local analysis.
14. Add section-specific analysis templates.
15. Add “ข้อความที่เสนอให้ใช้” separate from “เหตุผล”.
16. Add confidence/evidence indicator.
17. Add copy-to-field only after user approval.
18. Add undo after accepted suggestion.
19. Add history of AI decisions.
20. Add unresolved-suggestion counter.

PHASE V30-D — READINESS ENGINE

21. Separate BLOCKING vs WARNING.
22. Add course-description-source readiness.
23. Add CLO completeness.
24. Add weekly-plan coverage.
25. Add assessment 100% check.
26. Add assessment-to-CLO orphan detection.
27. Add evidence-gap count.
28. Add unresolved AI decision count.
29. Add cross-document mismatch count.

PHASE V30-E — DASHBOARD

30. Add filter by HED/PED prefix.
31. Add required/elective filter.
32. Add document-state filter.
33. Add verification-state filter.
34. Add readiness filter.
35. Add direct drill-down.
36. Add “needs attention” view.
37. Add course-description missing indicator.

PHASE V30-F — EVIDENCE WORKSPACE

38. Add source-reference registration workflow.
39. Default new intake to CANDIDATE / UNVERIFIED.
40. Capture source type.
41. Capture authority owner.
42. Capture date.
43. Capture locator/page.
44. Capture SHA-256 when available.
45. Do not auto-admit.
46. Require governed admission review.

PHASE V30-G — EXPORT

47. Improve print/PDF.
48. Include DRAFT watermark.
49. Include version.
50. Include source/provenance footer.
51. Include readiness status.
52. Do not claim “official” unless authority supports it.

PHASE V30-H — RETURN TO TQF4/TQF6

53. Continue only after current TQF3/TQF5 flow is stable.
54. Reuse approved 10-screen visual language.
55. Use sample forms only as structure/writing references.
56. Do not reuse sample values as facts.
57. Keep TQF4/TQF6 template authority UNDER_REVIEW.
58. Preserve evidence gates.

==================================================
30. ADDITIONAL PRODUCT IMPROVEMENTS
==================================================

Recommended future enhancements:

1. Course readiness traffic-light view.
2. Missing-source queue.
3. Course-owner workload view.
4. Prior-term clone with difference review.
5. AI-assisted weekly-plan generator based only on approved CLO/content.
6. Rubric library with course linkage.
7. Assessment calendar heatmap.
8. Evidence completeness meter.
9. One-click internal-review package preview.
10. Change-log narrative for programme chair review.

==================================================
31. HUMAN GATES
==================================================

Stop only for:

- Production authorization
- secret/credential change
- institutional SSO setup
- immutable R1 mutation
- destructive migration
- institutional-official template authority
- evidence admission requiring human judgment
- VERIFIED decision requiring human judgment
- design unlock
- direct AI API integration needing protected credentials/privacy review
- ambiguous curriculum-source adoption

Everything else that is clear and reversible:

continue automatically.

==================================================
32. EXECUTION TRIGGER
==================================================

When the user says:

Approve
Start
Resume
Next
Continue
ดำเนินการ
ดำเนินการทันที
ต่อ
ทำต่อ

continue from V30-A automatically until a true Human Gate is reached.

END MASTER CONTINUATION COMMAND

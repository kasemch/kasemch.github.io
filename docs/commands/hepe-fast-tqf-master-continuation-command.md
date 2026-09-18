# HEPE FAST TQF PORTAL — MASTER CONTINUATION COMMAND

Effective date: 2026-09-18

Revision: POST-V32 INLINE AI UX FIX

Status: ACTIVE MASTER CONTINUATION COMMAND

Project:
HEPE Fast TQF Portal

Repository:
`kasemch/kasemch.github.io`

Public route:
`https://kasemch.github.io/hepe-trial/`

Current UI version:
V32

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

After every material processing step, implementation batch, defect correction, audit, UI revision, database migration, source review, or governance decision:

1. Continue all clear, reversible, non-destructive work automatically.
2. Batch related tasks.
3. Do not ask the user to repeat known information.
4. Preserve approved locks and baselines.
5. Reuse existing structures before creating parallel ones.
6. Prefer read-only or append-only operations.
7. Stop only at genuine Human Gates.
8. Refresh this command after material state changes.
9. Never infer Production authorization.
10. Never infer institutional authority from working/source-observed data.
11. Never fabricate curriculum text, CLO/PLO authority, evidence, results, grades, signatures, approvals, CQI outcomes, or verification outcomes.
12. Keep canonical curriculum data separate from working-document data.
13. Keep AI suggestions separate from user-approved content.
14. Keep readiness separate from institutional approval.
15. Keep candidates separate from admitted evidence.
16. Keep structural template drafts separate from activated templates.
17. Preserve relative asset paths for GitHub Pages.
18. Maintain static-web compatibility.
19. Regression-test JavaScript syntax, selector helpers, DOM contracts, event bindings, and immutable-release invariants before closure.
20. Never use String.replace replacement syntax in a way that converts required `$$()` helper calls back to `$()`; use callback or split/join when writing literal double-dollar selectors.

==================================================
1. CURRENT RELEASE
==================================================

UI:

V32

Files:

`./hepe-trial/index.html`

`./hepe-trial/assets/js/portal-v32.js`

`./hepe-trial/assets/css/portal-v32.css`

`./hepe-trial/config/state.json`

Public route:

`https://kasemch.github.io/hepe-trial/?v=32`

Do not downgrade to V31 or earlier.

==================================================
2. MASTER UI LOCK
==================================================

Current live architecture remains:

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

Master UI remains APPROVED / LOCKED.

V32 is a usability correction inside this locked architecture, not a redesign.

==================================================
3. COURSE SCOPE
==================================================

Current curriculum:

92

Exclude:

EDU* = 13

RAM* = 14

In-scope:

65

Backend enforcement remains active.

==================================================
4. COURSE DESCRIPTION COVERAGE
==================================================

Coverage:

65 / 65

HED3701 source:

Google Drive file ID:

`1E0fXyoOc-v2z-GzEyfGq-JHHKMK9C0xk`

Source locator:

`3.1.5 คำอธิบายรายวิชา | HED3701`

Status:

DRAFT

Verification:

SOURCE_TEXT_EXTRACTED

Authority:

CURRICULUM_BOOK_SOURCE_OBSERVED

Do not equate this with institutional approval.

==================================================
5. USER-REPORTED AI UX DEFECT
==================================================

Reported:

From TQF3 Section 2 onward, pressing AI appeared to do nothing.

Usability root cause:

AI output depended too heavily on the right-side AI rail.

A user working in the center form could miss the result.

V32 rule:

AI recommendation must appear in the active working section immediately.

==================================================
6. INLINE AI V32
==================================================

Inline AI panels exist for:

- CLO–PLO
- Weekly Plan
- Assessment
- Overview / Improvement
- TQF5
- Verification

Flow:

AI button
→ run Smart QA
→ open inline recommendation panel
→ scroll panel into view
→ display recommendations
→ automatically place the first recommendation in the selected-text textarea

No second click is required to see text.

==================================================
7. INLINE AI SELECTION
==================================================

Each inline panel shows:

- severity
- recommendation title
- recommendation message
- rationale
- Select this suggestion
- Reject

Selected suggestion appears immediately in:

`data-ai-inline-selected`

The user can:

- Accept
- Edit
- Copy
- Reject
- Hide panel

==================================================
8. SAFE APPLY RULE
==================================================

A recommendation that targets a form field must not write generic guidance directly into the field.

Therefore:

1. AI recommendation appears.
2. User selects it.
3. User edits it into the actual text to use.
4. “แก้ข้อความแล้วใส่ในช่อง” becomes enabled.
5. User explicitly applies it.
6. Previous value enters Undo stack.

This preserves Human-in-the-Loop control.

==================================================
9. AI RAIL
==================================================

The right-side AI rail remains available for:

- detailed analysis
- evidence-basis indicator
- section state
- proposed text
- decision history
- Undo
- deeper ChatGPT handoff

The inline recommendation is now the primary immediate UX.

The AI rail is secondary detail.

==================================================
10. AI EVENT BINDING INVARIANT
==================================================

Static section buttons must use:

`$$('.ai-section').forEach(...)`

Dynamic row buttons must use:

`$$('.clo-ai').forEach(...)`

`$$('.week-ai').forEach(...)`

`$$('.assess-ai').forEach(...)`

Never use:

`$('.ai-section').forEach(...)`

or equivalent single-element selector with collection methods.

==================================================
11. BUTTON TYPE INVARIANT
==================================================

AI action controls must use:

`type="button"`

This prevents accidental form-submit behavior.

Applies to:

- section-level AI buttons
- row-level CLO AI buttons
- row-level Weekly AI buttons
- row-level Assessment AI buttons
- inline AI controls

==================================================
12. V32 REGRESSION
==================================================

JavaScript syntax:

PASS

Bad single-element collection selectors:

NONE

Static AI binding:

PASS

CLO row AI:

PASS

Weekly row AI:

PASS

Assessment row AI:

PASS

Inline panels:

6

AI section buttons:

8

V32 asset links:

PASS

Selected text appears immediately:

PASS

Scroll to inline result:

PASS

==================================================
13. AI GOVERNANCE
==================================================

AI remains advisory.

AI must not:

- overwrite canonical curriculum text automatically
- invent canonical PLO mappings
- invent results
- invent evidence
- admit evidence
- mark VERIFIED
- activate templates
- create signatures
- mutate R1

==================================================
14. READINESS
==================================================

Retain V31/V32 readiness:

BLOCKING

WARNING

PASS

Keep:

- section score
- direct jump
- weekly heatmap
- assessment map
- source gap queue
- export readiness

==================================================
15. DASHBOARD
==================================================

Retain:

- HED/PED filters
- Required/Elective
- Offered
- Missing TQF3
- Missing TQF5
- Verification
- Operational readiness
- Source gap
- Needs Attention
- sorting
- course drill-down
- Programme Smart QA summary

==================================================
16. EVIDENCE
==================================================

Retain:

- candidate registration
- SHA validation
- duplicate detection
- candidate filter
- admission-review shell

Admission remains a Human Gate.

==================================================
17. TQF4 / TQF6 V2
==================================================

TQF4 v2:

UNDER_REVIEW

current_version_no:

1

TQF6 v2:

UNDER_REVIEW

current_version_no:

1

Do not activate automatically.

==================================================
18. CURRENT HED2503
==================================================

Working TQF3:

Version 5

Verification:

INSUFFICIENT_EVIDENCE

R1:

PUBLIC_PUBLISHED

SHA:

799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256

Immutable.

==================================================
19. V32 IMPROVEMENT BACKLOG — APPROVED FOR REVIEW
==================================================

Priority 1:
AI Quick Actions per field.

Add a small “AI แนะนำ” affordance beside high-value fields:
CLO, activity, assessment evidence, problems, CQI.

Priority 2:
Recommendation templates by section.

Separate suggestion styles for:
CLO wording
weekly activity
assessment evidence
CQI
verification evidence

Priority 3:
Inline recommendation pinning.

Allow the user to pin one recommendation while editing the form.

Priority 4:
Accept-with-diff preview.

Before replacing form text:
show old text
show proposed text
show changed segments

Priority 5:
Completion-aware AI.

Only analyze unfinished/gap fields by default.
Allow “ตรวจทั้งหมด” as a separate action.

Priority 6:
AI recommendation priority order.

Sort:
BLOCKING
→ WARNING
→ SUGGESTION

Priority 7:
Section completion indicator.

Show:
Not started
Needs review
Ready for internal review

beside each TQF3/TQF5 section.

Priority 8:
Auto-focus next gap.

After resolving a recommendation:
offer “ไปช่องถัดไปที่ต้องแก้”.

Priority 9:
Context mini-drawer.

Show compact source context beside AI suggestion:
course description
CLO
PLO
week
assessment
evidence provenance

Priority 10:
Review Queue Mode.

Provide a sequential mode:

Gap 1
→ decide
→ Gap 2
→ decide
→ Gap 3

for rapid document completion.

==================================================
20. NEXT SAFE EXECUTION PHASE
==================================================

V33-A — AI QUICK ACTIONS

1. Add field-level AI triggers for key fields.
2. Keep section-level analysis.
3. Route results to the nearest inline panel.
4. Do not create automatic canonical changes.

V33-B — GAP-FOCUSED AI

5. Detect unresolved fields.
6. Show only actionable gaps first.
7. Sort BLOCKING → WARNING → SUGGESTION.
8. Add “ตรวจทั้งหมด”.

V33-C — DIFF PREVIEW

9. Build old/new preview.
10. Highlight text changes.
11. Require explicit Apply.
12. Preserve Undo.

V33-D — NEXT-GAP NAVIGATION

13. Add “ไปจุดถัดไป”.
14. Move between incomplete fields.
15. Respect active tab/section.
16. Do not skip BLOCKING states.

V33-E — REVIEW QUEUE MODE

17. Create a guided queue from readiness findings.
18. Resolve one item at a time.
19. Record Accept / Edited / Reject decisions.
20. Update readiness live.

V33-F — CONTEXT MINI-DRAWER

21. Show source/provenance.
22. Show related CLO/PLO.
23. Show assessment/evidence relationship.
24. Keep canonical vs working labels explicit.

==================================================
21. TRUE HUMAN GATES
==================================================

Stop only for:

- Production authorization
- secret / credential change
- institutional SSO
- immutable R1 mutation
- destructive migration
- official template authority
- evidence admission
- VERIFIED transition
- TQF4/TQF6 v2 activation
- master UI unlock
- protected direct AI API integration
- ambiguous source adoption

Everything else clear and reversible:
continue automatically.

==================================================
22. EXECUTION TRIGGER
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

V33-A
→ V33-B
→ V33-C
→ V33-D
→ V33-E
→ V33-F

until a true Human Gate.

END MASTER CONTINUATION COMMAND

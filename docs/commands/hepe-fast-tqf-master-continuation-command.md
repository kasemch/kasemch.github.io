# HEPE FAST TQF PORTAL — MASTER CONTINUATION COMMAND

Effective date: 2026-09-18

Revision: POST-V34 CONTEXT-AWARE REVIEW WORKFLOW

Status: ACTIVE MASTER CONTINUATION COMMAND

Project:
HEPE Fast TQF Portal

Repository:
`kasemch/kasemch.github.io`

Public route:
`https://kasemch.github.io/hepe-trial/`

Current UI version:
V34

Environment:
NON-PRODUCTION

Core principles:

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

After every material implementation, audit, source review, UI change, database migration, evidence workflow change, template change, or governance decision:

1. Continue all clear, reversible, non-destructive work automatically.
2. Batch related tasks.
3. Do not ask the user to repeat known information.
4. Reuse existing tables, RPCs, views, UI components, and evidence structures before creating parallel ones.
5. Preserve approved locks and baselines.
6. Prefer read-only or append-only changes.
7. Stop only at genuine Human Gates.
8. Refresh this command after material state changes.
9. Never infer Production authorization.
10. Never infer institutional authority from working, source-observed, candidate, or AI-generated content.
11. Never fabricate curriculum text, CLO/PLO authority, evidence, results, grades, signatures, approvals, CQI outcomes, or verification outcomes.
12. Keep canonical curriculum data separate from working-document data.
13. Keep AI suggestions separate from user-approved content.
14. Keep readiness separate from institutional approval.
15. Keep evidence candidates separate from admitted evidence.
16. Keep structural template drafts separate from activated templates.
17. Preserve GitHub Pages static-web compatibility and relative local asset paths.
18. Regression-test JavaScript syntax, collection selectors, DOM contracts, event bindings, RPC ACL, rollback behavior, and immutable-release invariants before closure.
19. Do not use replacement logic that silently converts required `$$()` collection helpers to `$()`.
20. Never cross a Human Gate merely because a workflow is technically ready.

==================================================
1. CURRENT RELEASE
==================================================

UI version:
V34

Live files:

`./hepe-trial/index.html`

`./hepe-trial/assets/js/portal-v34.js`

`./hepe-trial/assets/css/portal-v34.css`

`./hepe-trial/config/state.json`

Public route:

`https://kasemch.github.io/hepe-trial/?v=34`

Do not downgrade to V33 or earlier.

==================================================
2. MASTER UI LOCK
==================================================

Primary architecture remains:

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

Master UI/UX:

APPROVED / LOCKED

V34 changes usability and workflow only.

No new major live-screen architecture is introduced.

==================================================
3. COURSE SCOPE
==================================================

Current curriculum total:

92 courses

Excluded:

EDU* = 13

RAM* = 14

Portal in-scope:

65 courses

Scope helper:

`private.hepe_fast_tqf_course_in_scope(text)`

Out-of-scope calls:

`COURSE_OUT_OF_SCOPE`

==================================================
4. COURSE DESCRIPTION COVERAGE
==================================================

In-scope courses:

65

Descriptions available:

65

Coverage:

`65 / 65`

HED3701 source remains:

Google Drive ID:

`1E0fXyoOc-v2z-GzEyfGq-JHHKMK9C0xk`

Source file:

`หลักสูตรศึกษาศาสตรบัณฑิต HE - PE 67 (1).docx`

Locator:

`3.1.5 คำอธิบายรายวิชา | HED3701`

Status:

DRAFT

Verification:

SOURCE_TEXT_EXTRACTED

Authority:

CURRICULUM_BOOK_SOURCE_OBSERVED

No institutional approval is inferred.

==================================================
5. INLINE AI BASELINE
==================================================

From TQF3 Section 2 onward:

AI action
→ local Smart QA
→ inline recommendation
→ immediate visible text
→ user selects/edits/accepts/rejects

Right-side AI rail remains secondary detail.

==================================================
6. FIELD AI V34
==================================================

High-value fields retain field-level AI.

V34 reduces visual density.

Primary visible action:

`ตรวจ`

One click.

Lower-frequency actions move to:

`AI เพิ่มเติม`

Menu actions:

- ช่วยเขียน
- ปรับข้อความ
- ตรวจความสอดคล้อง

Do not expose four equal-weight buttons beside every field when one-click CHECK is sufficient.

==================================================
7. FIELD AI SOURCE CONTEXT
==================================================

CLO scaffold may use:

- source-observed curriculum course-description terms

It must not:

- create canonical CLO authority
- fabricate PLO mapping
- claim institutional approval

Weekly activity scaffold may use:

- topic already entered by user
- CLO already selected/entered by user

It must not:

- invent a teaching activity as if executed
- invent evidence as if already collected

Assessment scaffold may use:

- assessment method already entered
- CLO already entered

It must not:

- invent rubric weights
- invent scores
- invent student results

==================================================
8. CQI SOURCE RULE
==================================================

AI CQI proposal requires actual TQF5 problem text.

If no actual problem is entered:

AI must return a BLOCKING message.

It must not invent a problem merely to create CQI.

When problem text exists:

AI may structure it into a CQI scaffold.

The user must provide/approve:

- improvement action
- timing
- follow-up indicator

==================================================
9. VERIFICATION SOURCE RULE
==================================================

AI finding-draft for Verification may use:

LINKED CONTROLLED EVIDENCE

It must not use candidate evidence as if admitted.

If linked controlled evidence count is zero:

AI must not generate affirmative verification findings.

It should show a BLOCKING evidence message.

AI must never produce VERIFIED status.

==================================================
10. AI ACTION GOVERNANCE
==================================================

AI actions remain advisory.

AI must not:

- alter canonical curriculum data automatically
- invent canonical mappings
- invent executed activities
- invent grades/results
- invent evidence
- admit evidence
- mark VERIFIED
- activate templates
- create signatures
- mutate immutable R1

==================================================
11. GAP-FIRST BASELINE
==================================================

Recommendation order:

BLOCKING
→ WARNING
→ SUGGESTION

Default inline view:

show actionable gaps first.

User may choose:

ดูทั้งหมด

==================================================
12. DIFF PREVIEW
==================================================

Before targeted text is applied:

show old value

show proposed/edited value

show changed segment

Explicit user Apply is required.

Undo stack remains available.

==================================================
13. REVIEW QUEUE V34
==================================================

Review Queue displays:

- total remaining
- BLOCKING count
- WARNING count
- current item position
- current document group

Filters:

ALL
BLOCKING
WARNING
TQF3
TQF5
VERIFICATION

==================================================
14. RESOLVE-AND-NEXT RULE
==================================================

Button:

`ตรวจซ้ำแล้วไปข้อถัดไป`

Behavior:

1. Re-run readiness.
2. Check whether the underlying target still fails.
3. If still failing:
   keep the item
   return user to the target.
4. If resolved:
   remove naturally from readiness-derived queue
   move to next remaining item.

The button must never mark an issue resolved without the underlying readiness condition passing.

==================================================
15. REVIEW QUEUE GROUPING
==================================================

Groups:

TQF3
TQF5
VERIFICATION
GENERAL

Queue grouping is operational.

It is not an academic quality score.

==================================================
16. PRIOR-VERSION COMPARISON
==================================================

Reuse → Update shows prior working version when available.

Field-level comparison currently covers high-value top-level fields such as:

- objectives
- resources
- improvement notes

Comparison is source-aware and working-version aware.

Historical versions remain immutable.

==================================================
17. REUSE → UPDATE
==================================================

Options:

KEEP CURRENT

FILL BLANKS FROM PRIOR

REVIEW FROM GAP

Rules:

- prior values may fill blank fields only
- existing current values are not overwritten
- user must explicitly choose carry-forward
- action lineage must be recorded
- rationale metadata should be retained

==================================================
18. REUSE LINEAGE
==================================================

Record:

- action
- source working version
- target working version
- affected fields
- timestamp
- rationale when available

Reuse lineage is part of internal-review traceability.

==================================================
19. CQI → FIELD MAPPING
==================================================

CQI sources may be shown beside:

TQF3 improvement field

Sources may include:

- prior TQF5 improvement plan
- controlled improvement items

The system may direct the user to the relevant field.

It must not auto-copy CQI into TQF3 without explicit user approval.

==================================================
20. REVIEW PACKAGE V34
==================================================

Classification:

DRAFT

NON-PRODUCTION

INTERNAL REVIEW ONLY

Not institutional approval.

==================================================
21. REVIEW PACKAGE CONTENT
==================================================

Include:

- programme
- course
- controlled responsibility where authorized
- TQF3 working version
- readiness
- Review Queue remaining counts
- TQF3 summary
- TQF5 summary
- Verification/Evidence state
- AI resolved/unresolved counts

==================================================
22. REVIEW PACKAGE APPENDICES
==================================================

Current appendices include:

A. Section findings

B. AI decisions by section

C. Unresolved AI

D. Evidence candidates

E. Field-level prior-version diff

F. CQI lineage

G. Reuse / Update lineage

H. Source / provenance

I. AI Decision / Evidence Trail

All remain draft review artifacts.

==================================================
23. PROGRAMME DASHBOARD
==================================================

Retain:

- HED/PED
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
- controlled responsibility where permitted
- Programme Smart QA summary

Operational readiness is not an academic ranking.

==================================================
24. EVIDENCE
==================================================

Evidence candidate registration remains:

UNVERIFIED

NOT_ADMITTED

creates_system_authority = FALSE

Retain:

- duplicate detection
- SHA validation
- metadata review
- admission-review shell

No auto-admit.

==================================================
25. TQF4 STRUCTURAL V2
==================================================

Template:

HEPE-TQF4-GENERIC

v2:

UNDER_REVIEW

current_version_no:

1

v2 approved_at:

NULL

V34 structural review may display:

- v1 sections
- v2 sections
- added sections
- canonical/source-fed fields
- execution/evidence-required fields
- approval/signature gates
- synthetic-data guard count

No Activate/Approve control exists.

==================================================
26. TQF6 STRUCTURAL V2
==================================================

Template:

HEPE-TQF6-GENERIC

v2:

UNDER_REVIEW

current_version_no:

1

v2 approved_at:

NULL

A separate RETIRED TQF6 registry row may exist.

Do not modify it without separate review.

No Activate/Approve control exists.

==================================================
27. TEMPLATE ACTIVATION GATE
==================================================

Do not:

- change current_version_no from 1 to 2
- mark v2 APPROVED
- claim v2 institutional-official
- expose an automatic activation button

Activation remains a Human Gate.

==================================================
28. CURRENT HED2503 INVARIANTS
==================================================

Working TQF3 current version:

5

Working version count:

5

Verification:

INSUFFICIENT_EVIDENCE

Immutable R1 status:

PUBLIC_PUBLISHED

R1 SHA-256:

799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256

R1 remains immutable.

==================================================
29. V34 FRONTEND REGRESSION
==================================================

JavaScript parse:

PASS

Bad single-element collection selectors:

0

Duplicate DOM IDs:

0

Live JS:

portal-v34.js

Live CSS:

portal-v34.css

Compact field AI:

PASS

One-click CHECK:

PASS

Source-aware CLO scaffold:

PASS

Source-aware Weekly scaffold:

PASS

Source-aware Assessment scaffold:

PASS

CQI actual-problem guard:

PASS

Verification linked-evidence guard:

PASS

Review Queue filters:

PASS

Resolve-and-next:

PASS

Prior-version diff:

PASS

CQI mapping:

PASS

Review Package appendices:

PASS

TQF4/TQF6 structural field review:

PASS

==================================================
30. LATEST AUDIT
==================================================

`docs/audits/hepe-fast-tqf-v34-context-review-2026-09-18.md`

==================================================
31. CURRENT HUMAN GATE
==================================================

Authenticated visual acceptance of V34.

Expected visible behavior:

- one-click ตรวจ beside supported fields
- AI เพิ่มเติม menu
- source-aware proposal wording
- Review Queue counters
- Review Queue filters
- ตรวจซ้ำแล้วไปข้อถัดไป
- prior-version field comparison
- CQI → improvement-field review
- expanded DRAFT review package
- detailed read-only TQF4/TQF6 structural review

Repository/static regression is complete.

Logged-in visual behavior remains a user-browser gate.

==================================================
32. NEXT SAFE PHASE AFTER V34 VISUAL ACCEPTANCE
==================================================

V35-A — FIELD AI POLISH

1. Review whether CHECK should appear only when a field is non-empty or also on blanks.
2. Add small status indicator to field AI: unchecked / checked / needs attention.
3. Close other AI menus when one menu opens.
4. Keep keyboard access.
5. Maintain low mobile density.

V35-B — SMART PROPOSAL QUALITY

6. Improve source-term extraction for Thai phrases.
7. Add CLO verb-category hints without asserting Bloom taxonomy as institutional policy.
8. Add weekly sequence hints based on already-entered topics only.
9. Add assessment evidence consistency hints.
10. Add CQI follow-up indicator templates from user-entered problem context.
11. Keep Verification strictly evidence-bound.

V35-C — REVIEW QUEUE QUALITY

12. Add section progress summary.
13. Add “only unresolved AI” queue.
14. Add “only evidence gaps” queue.
15. Add current target context preview.
16. Add keyboard next/previous where safe.
17. Preserve underlying-condition resolution rule.

V35-D — VERSION / CHANGE CONTROL

18. Expand field-level prior diff to CLOs.
19. Expand prior diff to weekly plan rows.
20. Expand prior diff to assessment items.
21. Show whether a change came from user edit, prior-version reuse, or accepted AI suggestion.
22. Add change rationale prompt before saving major carry-forward changes.

V35-E — REVIEW PACKAGE

23. Add CLO diff appendix.
24. Add weekly-plan diff appendix.
25. Add assessment diff appendix.
26. Add change-origin appendix.
27. Add evidence-source completeness appendix.
28. Preserve DRAFT watermark and provenance.

V35-F — TQF4/TQF6 PRE-ACTIVATION REVIEW

29. Compare each v2 field against available canonical/source feeds.
30. Mark each v2 field:
   SOURCE_READY
   EXECUTION_REQUIRED
   HUMAN_INPUT_REQUIRED
   SIGNATURE_GATE
31. Count unresolved bindings.
32. Produce activation-readiness report.
33. Do not activate.
34. Stop at activation Human Gate.

==================================================
33. TRUE HUMAN GATES
==================================================

Stop for:

Production authorization

secret / credential change

institutional SSO

destructive migration

immutable R1 mutation

historical rewrite

evidence admission

VERIFIED transition

TQF4 v2 activation

TQF6 v2 activation

official template authority

master UI unlock

protected direct AI API integration

ambiguous source adoption

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

and V34 visual acceptance is satisfactory:

continue automatically:

V35-A
→ V35-B
→ V35-C
→ V35-D
→ V35-E
→ V35-F

until a true Human Gate.

END MASTER CONTINUATION COMMAND

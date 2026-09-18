# HEPE FAST TQF PORTAL — MASTER CONTINUATION COMMAND

Effective date: 2026-09-18
Revision: POST-V33 GUIDED FIELD AI / REVIEW QUEUE
Status: ACTIVE MASTER CONTINUATION COMMAND

Project:
HEPE Fast TQF Portal

Repository:
`kasemch/kasemch.github.io`

Public route:
`https://kasemch.github.io/hepe-trial/`

Current UI:
V33

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
0. PERMANENT EXECUTION RULE
==================================================

After every material implementation, source review, defect fix, UI revision, audit, migration, template change, or governance decision:

1. Continue all clear, reversible, non-destructive work automatically.
2. Batch related work.
3. Do not ask the user to repeat known information.
4. Preserve approved locks and baselines.
5. Reuse existing schema, RPCs, read models, UI components, and version history before creating parallel structures.
6. Prefer read-only, append-only, or user-confirmed updates.
7. Stop only at true Human Gates.
8. Refresh this command after material state changes.
9. Never infer Production authorization.
10. Never infer institutional authority from source-observed or working data.
11. Never fabricate curriculum facts, PLO/CLO authority, evidence, grades, attainment, satisfaction, signatures, approvals, CQI outcomes, or verification outcomes.
12. Separate canonical curriculum data from working-document data.
13. Separate AI suggestions from user-approved content.
14. Separate readiness from institutional approval.
15. Separate evidence candidates from admitted evidence.
16. Separate structural template drafts from activated templates.
17. Preserve relative GitHub Pages asset paths.
18. Maintain static-web compatibility.
19. Regression-test JavaScript syntax, selector helpers, DOM IDs, event bindings, user-decision flow, and immutable-release invariants.
20. Do not use replacement logic that accidentally converts required `$$()` collection selectors into `$()`.
21. Preserve AI decision traceability whenever user-approved AI text enters a working document.
22. Never allow AI to silently overwrite a canonical or working field.

==================================================
1. CURRENT LIVE RELEASE
==================================================

UI VERSION:
V33

LIVE FILES:

`./hepe-trial/index.html`

`./hepe-trial/assets/js/portal-v33.js`

`./hepe-trial/assets/css/portal-v33.css`

`./hepe-trial/config/state.json`

PUBLIC ROUTE:

`https://kasemch.github.io/hepe-trial/?v=33`

Do not downgrade to V32 or earlier.

==================================================
2. MASTER UI LOCK
==================================================

Primary live architecture remains:

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

V33 changes are interaction improvements inside the approved architecture.

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

Scope helper:

`private.hepe_fast_tqf_course_in_scope(text)`

Out-of-scope result:

`COURSE_OUT_OF_SCOPE`

==================================================
4. COURSE DESCRIPTION COVERAGE
==================================================

In-scope courses:
65

Descriptions available:
65

Missing:
0

HED3701 source:

Google Drive file:
`หลักสูตรศึกษาศาสตรบัณฑิต HE - PE 67 (1).docx`

Google Drive ID:
`1E0fXyoOc-v2z-GzEyfGq-JHHKMK9C0xk`

Locator:
`3.1.5 คำอธิบายรายวิชา | HED3701`

Status:
DRAFT

Verification:
SOURCE_TEXT_EXTRACTED

Authority:
CURRICULUM_BOOK_SOURCE_OBSERVED

Do not equate source observation with institutional approval.

==================================================
5. V33 FIELD-LEVEL AI QUICK ACTIONS
==================================================

High-value fields receive compact AI actions.

Current action types:

WRITE
CHECK
REFINE
ALIGN

Target examples:

- CLO statement
- weekly learning activity
- assessment evidence/rubric
- TQF3 objectives
- TQF3 resources
- TQF3 improvement notes
- TQF5 Plan→Actual narrative
- TQF5 problem
- TQF5 CQI
- verification finding

==================================================
6. WRITE ACTION RULE
==================================================

WRITE may provide:

- structured wording scaffold
- placeholders
- evidence-aware text pattern
- user-editable draft frame

WRITE must not fabricate:

- actual learning outcome authority
- actual activity performed
- actual evidence
- actual problems
- actual CQI outcome
- actual verification conclusion

If factual content is not supported:

use placeholders and explicitly require user completion.

==================================================
7. CHECK ACTION RULE
==================================================

CHECK uses existing field / section content.

CHECK may identify:

- missing measurable behavior
- missing CLO/PLO linkage
- missing activity
- missing assessment evidence
- incomplete Plan→Actual
- weak traceability
- evidence gap

CHECK must not auto-change data.

==================================================
8. REFINE ACTION RULE
==================================================

REFINE helps restructure user-entered text.

REFINE must preserve user meaning unless the user explicitly edits/approves.

REFINE cannot invent facts to make a sentence look more complete.

==================================================
9. ALIGN ACTION RULE
==================================================

ALIGN may inspect relationships such as:

CLO ↔ PLO

Week ↔ CLO

Activity ↔ CLO

Assessment ↔ CLO

Evidence ↔ Assessment

TQF3 ↔ TQF5

Verification ↔ Evidence

ALIGN remains advisory.

==================================================
10. GAP-FIRST AI
==================================================

Default suggestion order:

BLOCKING
→ WARNING
→ SUGGESTION

Inline panel shows gaps first.

User can choose:

ดูทั้งหมด

or

แสดงเฉพาะ Gap

Suggestion identity must remain tied to the full cache.

Filtered display must never change the underlying suggestion selected.

==================================================
11. INLINE AI
==================================================

From TQF3 Section 2 onward:

AI trigger
→ analyze
→ inline panel opens
→ panel scrolls into view
→ suggestion appears immediately
→ user selects
→ user decides

Inline AI remains primary immediate UX.

Right AI rail remains secondary detail.

==================================================
12. DIFF PREVIEW
==================================================

Before targeted apply:

show

CURRENT TEXT

vs

PROPOSED / EDITED TEXT

Highlight:

deleted segment

added segment

Diff is for review.

Diff does not write data.

==================================================
13. SAFE APPLY
==================================================

For suggestions targeting a form field:

1. show recommendation
2. user selects
3. user edits into actual intended text
4. Apply becomes available
5. user explicitly applies
6. previous value enters Undo stack
7. decision trail records the action

Generic AI guidance must not be inserted directly as factual form content.

==================================================
14. CONTEXT MINI DRAWER
==================================================

Inline AI can show compact context:

- course code/title
- curriculum description source
- source locator
- authority status
- CLO context
- week context
- assessment context
- TQF5 source status
- verification/evidence counts
- target field

Context drawer is explanatory.

It does not change authority status.

==================================================
15. NEXT-GAP NAVIGATION
==================================================

Actionable readiness gaps are ordered:

BLOCKING
→ WARNING
→ other non-PASS with target

“ไปจุดถัดไป” jumps to the next actionable target.

No data is changed by navigation.

==================================================
16. SECTION COMPLETION
==================================================

Operational states:

NOT_STARTED

IN_PROGRESS

NEEDS_REVIEW

READY_FOR_INTERNAL_REVIEW

These states describe workflow completeness only.

They do not mean:

APPROVED

VERIFIED

OFFICIAL

PRODUCTION READY

==================================================
17. REVIEW QUEUE MODE
==================================================

Readiness panel includes guided Review Queue.

Flow:

Issue N / Total
→ inspect issue
→ jump to field
→ resolve / edit
→ next issue

Queue priority:

BLOCKING first
then WARNING

No automatic resolution.

==================================================
18. REUSE → UPDATE
==================================================

V33 may use prior working TQF3 version.

Choices:

KEEP CURRENT

UPDATE

REVIEW FROM GAP

UPDATE rule:

fill only blank top-level fields from the prior working version.

Do not overwrite existing user-entered values.

Current safe top-level fields include:

- objectives
- resources
- improvement notes

Do not mass-copy prior CLO/weekly/assessment values automatically.

==================================================
19. CQI CONTEXT
==================================================

Reuse → Update may show CQI source count.

CQI context does not automatically create a change.

User must decide what is carried forward.

==================================================
20. AI DECISION / EVIDENCE TRAIL
==================================================

Decision records include:

document

section

suggestion_id

decision

text

source_basis

action_type

target

working_version

decided_at

TQF3 saves AI decision trail in working form content.

TQF5 saves TQF5 AI decisions in working payload.

Verification AI decisions remain advisory unless separately captured through the governed verification workflow.

==================================================
21. REVIEW PACKAGE
==================================================

Internal Review Package includes:

A. Section findings

B. Accepted AI decisions

C. Evidence candidates

D. Version diff

E. CQI lineage

F. Source / provenance

G. AI Decision / Evidence Trail

Classification:

DRAFT
NON-PRODUCTION
INTERNAL REVIEW ONLY

Do not label as institutional approval.

==================================================
22. READINESS
==================================================

Readiness states:

BLOCKING
WARNING
PASS

Checks include:

- source completeness
- CLO completeness
- CLO/PLO working linkage
- weekly plan coverage
- weekly alignment
- assessment total
- assessment→CLO/evidence
- TQF3↔TQF5 CLO consistency
- verification state
- evidence presence
- unresolved AI decisions

==================================================
23. PROGRAMME DASHBOARD
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
- controlled responsibility where authorized
- Programme Smart QA summary

Operational readiness is not an academic ranking.

==================================================
24. EVIDENCE
==================================================

Candidate registration remains:

UNVERIFIED

NOT_ADMITTED

creates_system_authority = FALSE

Retain:

- duplicate detection
- SHA validation
- candidate filters
- metadata review
- admission-review shell

No auto-admit.

==================================================
25. TQF4 / TQF6
==================================================

TQF4 generic v2:

UNDER_REVIEW

TQF4 registry current_version_no:

1

TQF6 generic v2:

UNDER_REVIEW

TQF6 active-review registry current_version_no:

1

A separate RETIRED TQF6 registry row exists.

Do not modify it unless separately reviewed.

Do not activate v2 automatically.

==================================================
26. HED2503 INVARIANTS
==================================================

Working TQF3 current version:

5

Version count:

5

Verification:

INSUFFICIENT_EVIDENCE

R1:

PUBLIC_PUBLISHED

R1 SHA-256:

799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256

R1 is immutable.

==================================================
27. V33 FRONTEND REGRESSION
==================================================

Required:

JavaScript parse:
PASS

Single-element selector used with collection method:
NONE

Duplicate DOM IDs:
NONE

Live assets:
portal-v33.js
portal-v33.css

Required V33 contracts:

field-level AI
PASS

action types
PASS

gap-first
PASS

suggestion index reconciliation
PASS

diff preview
PASS

context drawer
PASS

next-gap navigation
PASS

section completion
PASS

review queue
PASS

reuse-update
PASS

decision trail
PASS

==================================================
28. LATEST AUDIT
==================================================

`docs/audits/hepe-fast-tqf-v33-guided-ai-review-2026-09-18.md`

==================================================
29. CURRENT HUMAN GATE
==================================================

Authenticated visual acceptance of V33.

Expected visible behavior:

- Quick AI actions next to high-value fields
- WRITE / CHECK / REFINE / ALIGN
- Gap-first inline suggestions
- “ดูทั้งหมด” toggle
- Before/After diff
- Context mini drawer
- “ไปจุดถัดไป”
- section completion badges
- Review Queue Mode
- Reuse → Update assistant
- expanded AI audit trail in internal review package

Repository/static regression is complete.

Logged-in browser rendering still requires visual acceptance in the user session.

==================================================
30. NEXT SAFE PHASE AFTER VISUAL ACCEPTANCE
==================================================

V34-A — FIELD AI USABILITY

1. Review field-button density on desktop.
2. Review button density on mobile.
3. Collapse low-frequency actions into a small menu if needed.
4. Preserve one-click CHECK.
5. Keep action labels understandable in Thai.
6. Add keyboard shortcuts only if they do not conflict with browser/system shortcuts.

V34-B — SMART PROPOSAL QUALITY

7. Add section-specific proposal templates based on verified source context.
8. Improve CLO scaffold using curriculum description terms without asserting canonical CLO authority.
9. Improve weekly activity scaffold from selected CLO and topic.
10. Improve assessment evidence scaffold from selected CLO and assessment method.
11. Improve CQI scaffold from actual TQF5 issues only.
12. Improve verification wording only from admitted/linked evidence.

V34-C — REVIEW QUEUE

13. Add resolved/remaining counters.
14. Add “resolve and next”.
15. Add queue filters by BLOCKING/WARNING.
16. Add queue grouping by TQF3/TQF5/Verification.
17. Keep queue read/write separation explicit.

V34-D — VERSION / CQI

18. Add field-level prior-version comparison.
19. Add CQI-to-field suggestion mapping.
20. Require user approval before any carry-forward.
21. Add change rationale for accepted updates.
22. Add source version reference to carried-forward text.

V34-E — REVIEW PACKAGE

23. Add AI decision count by section.
24. Add unresolved AI appendix.
25. Add Review Queue remaining items.
26. Add field-level diff appendix.
27. Add reuse/update lineage.
28. Preserve DRAFT watermark.

V34-F — TQF4/TQF6

29. Continue structural-preview validation.
30. Do not activate v2.
31. Map canonical fields to v2 placeholders.
32. Identify fields that require actual placement/supervisor evidence.
33. Identify signature gates.
34. Stop at activation Human Gate.

==================================================
31. TRUE HUMAN GATES
==================================================

Stop only for:

Production authorization

secret / credential change

institutional SSO

destructive migration

immutable R1 mutation

evidence admission

VERIFIED decision

TQF4 v2 activation

TQF6 v2 activation

official template authority

master UI unlock

protected direct AI API integration

ambiguous canonical source adoption

Everything else clear and reversible:

continue automatically.

==================================================
32. EXECUTION TRIGGER
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

and V33 visual acceptance is satisfactory:

continue automatically:

V34-A
→ V34-B
→ V34-C
→ V34-D
→ V34-E
→ V34-F

until a true Human Gate.

END MASTER CONTINUATION COMMAND

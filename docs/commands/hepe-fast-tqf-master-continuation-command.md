# HEPE FAST TQF PORTAL — MASTER CONTINUATION COMMAND

Effective date: 2026-09-18
Revision: POST-V35
Status: ACTIVE

Repository:
`kasemch/kasemch.github.io`

Public route:
`https://kasemch.github.io/hepe-trial/`

Current UI:
V35

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

After every material implementation, defect fix, UI revision, source review, audit, schema change, evidence-workflow change, or template review:

1. Continue all clear, reversible, non-destructive work automatically.
2. Batch related tasks.
3. Do not ask the user to repeat known information.
4. Preserve approved locks and frozen baselines.
5. Reuse existing schema/RPC/views before adding parallel structures.
6. Prefer read-only or append-only behavior.
7. Stop only at a genuine Human Gate.
8. Refresh this command after material state changes.
9. Never infer Production authorization.
10. Never infer institutional authority from working or source-observed data.
11. Never fabricate curriculum text, CLO/PLO authority, evidence, student results, grades, satisfaction, signatures, approvals, CQI outcomes, or verification outcomes.
12. Keep canonical curriculum data separate from working-document data.
13. Keep AI suggestions separate from user-approved content.
14. Keep readiness separate from institutional approval.
15. Keep evidence candidates separate from admitted evidence.
16. Keep template review separate from template activation.
17. Keep all local asset paths relative for GitHub Pages.
18. Maintain static-web compatibility.
19. Run frontend regression before closure.
20. Run immutable-release/template invariants before closure.
21. Never use single-element selector helper with collection methods.
22. Do not cross authority-bearing gates automatically.

==================================================
1. CURRENT LIVE RELEASE
==================================================

Version:

V35

Files:

`./hepe-trial/index.html`
`./hepe-trial/assets/js/portal-v35.js`
`./hepe-trial/assets/css/portal-v35.css`
`./hepe-trial/config/state.json`

Public route:

`https://kasemch.github.io/hepe-trial/?v=35`

Do not downgrade.

==================================================
2. COURSE SCOPE
==================================================

Current curriculum:

92 courses

Excluded:

EDU* = 13
RAM* = 14

Portal scope:

65 courses

Scope enforcement remains backend + frontend.

==================================================
3. COURSE DESCRIPTION COVERAGE
==================================================

In-scope:

65

Source-observed/current description:

65

Missing:

0

HED3701 source remains:

Google Drive file:
`หลักสูตรศึกษาศาสตรบัณฑิต HE - PE 67 (1).docx`

Locator:
`3.1.5 คำอธิบายรายวิชา | HED3701`

Authority:
`CURRICULUM_BOOK_SOURCE_OBSERVED`

Do not equate source observation with institutional approval.

==================================================
4. FIELD AI V35
==================================================

Primary field action now depends on field state.

Blank field:

`ช่วยเขียน`

Non-empty field:

`ตรวจ`

Supported field state labels:

`ว่าง`
`ยังไม่ตรวจ`
`ตรวจแล้ว`

Only one AI overflow menu should remain open at a time.

Keep keyboard access.

==================================================
5. AI ACTIONS
==================================================

Available actions:

ช่วยเขียน
ตรวจ
ปรับข้อความ
ตรวจความสอดคล้อง

AI remains advisory.

Target-field writing must require explicit user action.

Canonical fields remain protected.

==================================================
6. SOURCE-AWARE PROPOSALS
==================================================

V35 may use:

- curriculum description source text
- current working CLOs
- current entered weekly topics
- current assessment structure
- current user-entered TQF5 problems
- linked controlled verification evidence

V35 must not create missing facts.

==================================================
7. THAI SOURCE PHRASE EXTRACTION
==================================================

Use source terms/phrases from the existing curriculum description only.

Do not invent new curriculum content.

CLO draft scaffolds may structure wording but must leave substantive decisions to the user.

==================================================
8. WEEKLY SEQUENCE HINTS
==================================================

Weekly sequence analysis may use:

- previous entered topic
- current entered topic
- next entered topic

Do not generate an authoritative sequence from general knowledge.

Do not claim the sequence is official.

==================================================
9. ASSESSMENT CONSISTENCY
==================================================

Check structural consistency among:

assessment item
method
CLO
evidence/rubric
weight

Do not invent rubric criteria.

Do not invent weights.

==================================================
10. CQI FOLLOW-UP
==================================================

CQI suggestions may derive only from:

- user-entered TQF5 problems
- controlled prior CQI sources
- existing improvement items

No fabricated problem.

No fabricated result.

No fabricated CQI outcome.

==================================================
11. VERIFICATION
==================================================

Verification drafting remains evidence-bound.

Linked controlled evidence may support a draft finding.

Evidence candidate alone does not equal admitted evidence.

No VERIFIED shortcut.

==================================================
12. INLINE AI
==================================================

Primary UX:

AI action
→ inline result
→ selected suggestion
→ user edit/decision
→ optional Apply

AI rail remains secondary detail.

Gap-first remains default.

==================================================
13. REVIEW QUEUE V35
==================================================

Filters:

ALL
BLOCKING
WARNING
UNRESOLVED_AI
EVIDENCE
TQF3
TQF5
VERIFICATION

Review Queue shows:

- remaining count
- BLOCKING count
- WARNING count
- section progress
- target context preview

Keyboard:

Alt + Left = previous
Alt + Right = next

==================================================
14. REVIEW QUEUE RESOLUTION RULE
==================================================

Clicking a queue item does not resolve it.

A queue item is resolved only if the underlying readiness condition passes after re-check.

Fail closed.

==================================================
15. VERSION / CHANGE CONTROL
==================================================

Prior-version comparison includes:

- objectives
- resources
- improvement notes
- CLO collection
- weekly-plan collection
- assessment collection

Collection summaries show:

added
removed
changed

==================================================
16. CHANGE ORIGIN
==================================================

Recorded change origins may include:

- Reuse / Update
- accepted AI-assisted decision

Other differences may be direct user edits.

Do not infer authorship/origin without an event record.

==================================================
17. REUSE → UPDATE
==================================================

Prior working version may be used only by explicit user decision.

Allowed safe action:

fill blanks only

Existing user content must not be overwritten automatically.

CQI carry-forward remains explicit user action.

==================================================
18. REVIEW PACKAGE V35
==================================================

Classification:

DRAFT
NON-PRODUCTION
INTERNAL REVIEW ONLY

Not institutional approval.

==================================================
19. REVIEW PACKAGE APPENDICES
==================================================

Current appendices include:

A. Section findings
B. AI decisions by section
C. Unresolved AI
D. Evidence candidates
E. Prior-version diff
F. CQI lineage
G. Reuse/Update lineage
H. Source/provenance
I. AI Decision/Evidence Trail
J. Change origin
K. Evidence-source completeness

==================================================
20. TQF4 V2 PRE-ACTIVATION
==================================================

Template:

HEPE-TQF4-GENERIC

current_version_no:

1

v2:

UNDER_REVIEW

approved_at:

NULL

V35 classification:

SOURCE_READY = 5
EXECUTION_REQUIRED = 6
HUMAN_INPUT_REQUIRED = 7
SIGNATURE_GATE = 0

No activation control.

==================================================
21. TQF6 V2 PRE-ACTIVATION
==================================================

Template:

HEPE-TQF6-GENERIC

Active review registry:

`4bc4034b-d857-4c2c-b5af-8a0eee0ef0b6`

current_version_no:

1

v2:

UNDER_REVIEW

approved_at:

NULL

V35 classification:

SOURCE_READY = 3
EXECUTION_REQUIRED = 16
HUMAN_INPUT_REQUIRED = 1
SIGNATURE_GATE = 1

No activation control.

==================================================
22. RETIRED TQF6 REGISTRY
==================================================

Separate registry row:

`60276379-9414-4800-8255-d38a57d5e7f9`

Status:

RETIRED

Do not modify without separate review.

==================================================
23. TEMPLATE ACTIVATION GATE
==================================================

Do not:

- change current_version_no 1 → 2
- mark v2 APPROVED
- claim institutional-official status
- create auto-activation control

Activation remains a Human Gate.

==================================================
24. CURRENT HED2503 RUNTIME
==================================================

Observed at V35 closure:

TQF3 working current version:

6

Working version count:

6

Verification:

INSUFFICIENT_EVIDENCE

This is the current observed runtime state.

Do not restore older version counters from historical audits.

==================================================
25. IMMUTABLE R1
==================================================

Release:

`HEPE-HED2503-TQF3-2569-1-R1`

Status:

PUBLIC_PUBLISHED

SHA-256:

`799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256`

Never mutate.

==================================================
26. V35 FRONTEND REGRESSION
==================================================

JavaScript parse:

PASS

Bad single-element collection selectors:

0

Duplicate DOM IDs:

0

Live assets:

portal-v35.js
portal-v35.css

Temporary duplicate static Review Queue:

REMOVED

Temporary duplicate static Reuse→Update block:

REMOVED

Temporary hard-coded section badges:

REMOVED

==================================================
27. V35 FEATURE REGRESSION
==================================================

PASS:

blank field → WRITE primary action
non-empty field → CHECK primary action
field AI state
single-open AI menu
Thai source phrase extraction
weekly entered-topic sequence hint
assessment consistency hint
CQI follow-up hint
Unresolved AI queue
Evidence-gap queue
target context preview
keyboard previous/next
CLO prior diff
weekly prior diff
assessment prior diff
change-origin appendix
evidence-source completeness appendix
TQF4/TQF6 pre-activation classification

==================================================
28. LATEST AUDIT
==================================================

`docs/audits/hepe-fast-tqf-v35-proposal-review-change-control-2026-09-18.md`

==================================================
29. CURRENT HUMAN GATE
==================================================

Authenticated visual acceptance of V35.

Expected visible behavior includes:

- blank supported fields prioritize ช่วยเขียน
- completed fields prioritize ตรวจ
- compact field-state badge
- only one AI overflow menu open
- improved source-aware proposals
- Review Queue section progress
- Unresolved AI filter
- Evidence gaps filter
- target-context preview
- Alt+Left / Alt+Right navigation
- expanded prior-version diff
- expanded DRAFT review package
- TQF4/TQF6 pre-activation classification

Repository/static regression is complete.

Logged-in browser visual behavior remains a user-browser gate.

==================================================
30. NEXT SAFE PHASE AFTER V35 VISUAL ACCEPTANCE
==================================================

V36-A — LIVE FORM UX QUALITY

1. Verify field AI density on mobile.
2. Add clearer blank/checked state icons if needed.
3. Add sticky inline recommendation header on long tables.
4. Improve row-level quick-action placement.
5. Keep keyboard and touch usability.

V36-B — DOCUMENT COMPLETION WORKFLOW

6. Build compact “Finish this section” action.
7. Run local checks for the active section.
8. Surface only unresolved gaps.
9. Offer next-gap navigation.
10. Recompute section completion immediately after user changes.

V36-C — CHANGE RATIONALE

11. For major Reuse/Update carry-forward changes, ask user for a short rationale before save.
12. Store rationale in working-document metadata.
13. Do not require rationale for trivial formatting changes.
14. Include rationale in Review Package.

V36-D — EVIDENCE REVIEW READINESS

15. Add candidate grouping by evidence type.
16. Add source-age/date indicator without judging validity.
17. Add locator completeness.
18. Add authority-owner completeness.
19. Add ready-for-human-admission-review count.
20. Do not admit evidence.

V36-E — TEMPLATE ACTIVATION READINESS

21. Produce field-by-field unresolved list for TQF4 v2.
22. Produce field-by-field unresolved list for TQF6 v2.
23. Separate source-ready from execution-required fields.
24. Separate human-input from signature gates.
25. Build read-only activation checklist.
26. Do not activate.
27. Stop at activation Human Gate.

V36-F — RELEASE QA

28. Run full JS/DOM regression.
29. Re-check TQF3 working version state.
30. Re-check R1 immutable SHA.
31. Re-check TQF4/TQF6 current_version_no.
32. Re-check approved_at remains null unless explicitly approved.
33. Refresh audit and continuation command.

==================================================
31. TRUE HUMAN GATES
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

and V35 visual acceptance is satisfactory:

continue automatically:

V36-A
→ V36-B
→ V36-C
→ V36-D
→ V36-E
→ V36-F

until a true Human Gate.

END MASTER CONTINUATION COMMAND

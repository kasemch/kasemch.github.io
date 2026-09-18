# HEPE FAST TQF PORTAL — MASTER CONTINUATION COMMAND

Effective date: 2026-09-18
Revision: POST-V36 COMPLETION / RATIONALE / REVIEW-READINESS
Status: ACTIVE MASTER CONTINUATION COMMAND

Repository:
`kasemch/kasemch.github.io`

Public route:
`https://kasemch.github.io/hepe-trial/`

Current UI version:
V36

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

1. Continue all clear, reversible, non-destructive work automatically.
2. Batch related tasks.
3. Preserve approved UI/governance locks.
4. Reuse current schema/RPC/read-model structures.
5. Prefer read-only or append-only operations.
6. Stop only at true Human Gates.
7. Never infer Production authorization.
8. Never infer institutional authority from working/source-observed data.
9. Never fabricate curriculum text, mappings, evidence, results, signatures, approvals, CQI, or verification outcomes.
10. Keep canonical curriculum data separate from working-document data.
11. Keep AI suggestions separate from user-approved content.
12. Keep evidence candidates separate from admitted evidence.
13. Keep readiness separate from institutional approval.
14. Keep structural template drafts separate from activated templates.
15. Keep GitHub Pages assets relative.
16. Regression-test JS syntax, selector helpers, DOM contract, runtime invariants, template locks, and immutable release state before closure.
17. Never auto-admit evidence.
18. Never auto-mark VERIFIED.
19. Never auto-activate TQF4/TQF6 v2.
20. Never mutate immutable R1.

==================================================
1. CURRENT RELEASE
==================================================

UI:
V36

Live files:

`./hepe-trial/index.html`
`./hepe-trial/assets/js/portal-v36.js`
`./hepe-trial/assets/css/portal-v36.css`
`./hepe-trial/config/state.json`

Expected public route:

`https://kasemch.github.io/hepe-trial/?v=36`

Do not downgrade to V35 or earlier.

==================================================
2. CURRENT COURSE SCOPE
==================================================

Current curriculum:
92 courses

Excluded:
EDU* = 13
RAM* = 14

Portal in-scope:
65

Course descriptions:
65 / 65

Backend scope enforcement remains active.

==================================================
3. AI BASELINE
==================================================

Current AI capabilities include:

- immediate inline recommendations
- field-level quick actions
- WRITE / CHECK / REFINE / ALIGN
- gap-first ordering
- source-aware proposals
- evidence-basis indicator
- section AI state
- diff preview
- context mini-drawer
- multi-level Undo
- Review Queue
- decision/evidence trail

AI remains advisory.

Canonical auto-edit remains prohibited.

==================================================
4. V36 LIVE FORM UX
==================================================

V36 adds:

- sticky inline AI recommendation header
- larger mobile/touch targets
- reduced-motion-safe behavior

No master-screen redesign.

==================================================
5. FINISH THIS SECTION
==================================================

Each AI-enabled section can expose:

`ตรวจหมวดนี้ให้จบ`

Behavior:

1. recompute section state
2. collect only non-PASS checks tied to that section
3. show unresolved gap count
4. show gap details
5. offer section AI review
6. offer direct navigation to first gap
7. update live after user input/change

This is:

INTERNAL COMPLETION SUPPORT

It is not:

APPROVAL
VERIFICATION
INSTITUTIONAL SIGN-OFF

==================================================
6. SECTION STATES
==================================================

Retain:

NOT_STARTED
IN_PROGRESS
NEEDS_REVIEW
READY_FOR_INTERNAL_REVIEW

V36 also shows current gap count beside the Finish Section action.

==================================================
7. REUSE / UPDATE RATIONALE
==================================================

Carry-forward action:

`เติมเฉพาะช่องว่างจาก prior working version`

requires a short user rationale.

Required rationale applies to:

major carry-forward content actions.

It does not apply to:

simple KEEP action
trivial formatting-only changes

Persisted metadata:

- kind
- source version
- target version
- fields
- rationale
- timestamp

Storage location:

TQF3 working content only.

No canonical mutation.

==================================================
8. CHANGE RATIONALE REVIEW PACKAGE
==================================================

Review Package must include:

Appendix L · Change rationale

Show:

- date/time
- change kind
- affected fields
- rationale

Do not infer rationale when none was recorded.

==================================================
9. EVIDENCE REVIEW READINESS V36
==================================================

Group evidence candidates by:

evidence_type

Show:

- candidate count
- ready-for-human-review count
- authority-owner completeness
- source locator completeness
- version/document date
- descriptive document age
- SHA presence/validation through existing rules

Document age is descriptive only.

It is not a validity judgment.

==================================================
10. READY FOR HUMAN REVIEW
==================================================

A candidate may be labelled:

`READY_FOR_HUMAN_REVIEW`

only when current metadata rules pass.

This label means:

metadata is sufficiently complete for a human admission review.

It does not mean:

ADMITTED
VERIFIED
VALIDATED
APPROVED

==================================================
11. ADMISSION
==================================================

Admission remains a Human Gate.

No admission button.

No auto-admit.

Current candidate model remains:

UNVERIFIED
NOT_ADMITTED
creates_system_authority = false

==================================================
12. TEMPLATE ACTIVATION READINESS V36
==================================================

TQF4 v2 and TQF6 v2 now show read-only field-by-field activation checklists.

Classification:

SOURCE_READY
EXECUTION_REQUIRED
HUMAN_INPUT_REQUIRED
SIGNATURE_GATE

No activate/approve control exists.

==================================================
13. TQF4 V2
==================================================

Template:
HEPE-TQF4-GENERIC

Current registry version:
1

v2:
UNDER_REVIEW

approved_at:
NULL

Sections:
7

Fields:
18

Activation:
BLOCKED / HUMAN GATE

==================================================
14. TQF6 V2
==================================================

Template:
HEPE-TQF6-GENERIC

Current registry version:
1

v2:
UNDER_REVIEW

approved_at:
NULL

Sections:
8

Fields:
21

Activation:
BLOCKED / HUMAN GATE

==================================================
15. CURRENT HED2503 RUNTIME
==================================================

TQF3 working current version:
6

Working version count:
6

Verification:
INSUFFICIENT_EVIDENCE

Do not restore old version counters from historical audits.

==================================================
16. IMMUTABLE R1
==================================================

Release:
`HEPE-HED2503-TQF3-2569-1-R1`

Status:
PUBLIC_PUBLISHED

SHA-256:
`799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256`

Never mutate.

==================================================
17. V36 REGRESSION
==================================================

JavaScript parse:
PASS

Bad single-element collection selectors:
0

Duplicate DOM IDs:
0

Live assets:
portal-v36.js / portal-v36.css

Finish Section:
PASS

Change rationale guard:
PASS

Evidence grouping:
PASS

Evidence age indicator:
PASS

Template activation checklist:
PASS

65 / 65 descriptions:
PASS

TQF4/TQF6 activation locks:
PASS

R1 immutable:
PASS

==================================================
18. LATEST AUDIT
==================================================

`docs/audits/hepe-fast-tqf-v36-completion-rationale-review-readiness-2026-09-18.md`

==================================================
19. CURRENT TRUE HUMAN GATE
==================================================

Authenticated visual acceptance of V36.

Expected visible behavior:

- “ตรวจหมวดนี้ให้จบ”
- live section state + gap count
- section unresolved-gap summary
- Next Gap behavior
- Reuse/Update rationale field
- Evidence Review Readiness grouping
- evidence document-age indicator
- ready-for-human-review count
- TQF4 field-by-field activation checklist
- TQF6 field-by-field activation checklist
- sticky inline AI header
- improved mobile touch targets

Repository/static/runtime invariants are verified.

Logged-in browser visual rendering remains a user-browser gate.

==================================================
20. NEXT SAFE PHASE AFTER V36 VISUAL ACCEPTANCE
==================================================

V37-A — SECTION WORKFLOW POLISH

1. Add “Finish all sections” overview action.
2. Compute section completion roll-up.
3. Show only unresolved sections.
4. Add one-click navigation to first unresolved section.
5. Preserve individual section controls.

V37-B — SAVE-TIME GOVERNANCE

6. Before TQF3 save, summarize:
   - blocking checks
   - unresolved AI
   - major carry-forward rationale
7. Allow DRAFT save despite warnings.
8. Clearly label what remains unresolved.
9. Do not block ordinary working save unless a true structural invariant fails.

V37-C — EVIDENCE REVIEW PACK

10. Produce read-only candidate review pack.
11. Group by evidence type.
12. Include source/authority/date/locator/hash.
13. Include duplicate groups.
14. Include metadata gaps.
15. No admission action.

V37-D — TEMPLATE PRE-ACTIVATION PACK

16. Generate read-only TQF4 v2 pre-activation pack.
17. Generate read-only TQF6 v2 pre-activation pack.
18. List unresolved fields by classification.
19. List source-fed fields.
20. List execution-only fields.
21. List signature gates.
22. No activation action.

V37-E — FULL REVIEW PACKAGE

23. Add section roll-up.
24. Add Finish Section status.
25. Add unresolved-section appendix.
26. Add rationale appendix.
27. Add evidence review-readiness appendix.
28. Add template activation-readiness appendix.
29. Keep DRAFT / NON-PRODUCTION.

V37-F — RELEASE QA

30. Full JS/DOM regression.
31. Re-check HED2503 working version.
32. Re-check R1 SHA.
33. Re-check 65/65 descriptions.
34. Re-check TQF4/TQF6 current_version_no=1.
35. Re-check v2 approved_at=NULL.
36. Refresh audit and continuation command.

==================================================
21. TRUE HUMAN GATES
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

and V36 visual acceptance is satisfactory:

continue automatically:

V37-A
→ V37-B
→ V37-C
→ V37-D
→ V37-E
→ V37-F

until a true Human Gate.

END MASTER CONTINUATION COMMAND

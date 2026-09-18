# HEPE FAST TQF PORTAL — V28 SCOPE / CURRICULUM DESCRIPTION / IMMEDIATE AI AUDIT

Date: 2026-09-18

Status: READY FOR AUTHENTICATED VISUAL ACCEPTANCE

Environment: NON-PRODUCTION

## Scope of this batch

This batch implements three approved corrections:

1. Fast TQF operational scope = HED/PED only
2. Course descriptions sourced from the curriculum book rather than AI-generated text
3. AI analysis results appear immediately in a visible text box when the user presses an AI analyze button

## Scope rule

Current full curriculum reference size:

- 92 curriculum courses

Fast TQF operational scope:

- HED = 28
- PED = 37
- total = 65
- EDU = excluded
- RAM/general education = excluded

The rule is enforced in backend RPCs, not only hidden in frontend JavaScript.

Updated read models:

- hepe_fast_tqf_programme_catalog()
- hepe_fast_tqf_course_catalog(...)
- hepe_fast_tqf_curriculum_context(...)
- hepe_fast_tqf_programme_dashboard(...)

Scope marker:

HED_PED_ONLY

## Curriculum description source

Source file:

Google Drive ID:
1E0fXyoOc-v2z-GzEyfGq-JHHKMK9C0xk

Title:
หลักสูตรศึกษาศาสตรบัณฑิต HE - PE 67 (1).docx

Source section:
3.1.5 คำอธิบายรายวิชา

Imported descriptions:

- 64 of 65 scoped HED/PED courses

Current provenance:

verification_status:
SOURCE_TEXT_EXTRACTED

authority_status:
CURRICULUM_BOOK_SOURCE_OBSERVED

The source is treated as observed curriculum-book evidence, not as an automatically promoted institutional authority state.

## HED3701 exception

HED3701 currently has no standard course-description row admitted from the same description section.

The system does not fabricate a replacement.

Current UI route:

TQF4/TQF6 SOURCE ROUTE

Interpretation:

HED3701 is a field-practicum / professional-practice course handled through the TQF4/TQF6 workflow.

## Parser cleanup

Four English-description parser tails were found and corrected against the same curriculum source:

- HED2615
- HED3505
- PED3103
- PED3601

Cleanup was append-only at course-description version level.

Final parser-tail check:

0 remaining matches for known section-header contamination patterns.

## AI immediate result behavior

Frontend:

./hepe-trial/assets/js/portal-v28.js

UI:

./hepe-trial/index.html

When the user presses an AI analyze button:

1. Local Smart QA runs immediately.
2. A visible textarea with id ai-analysis-box is populated immediately.
3. The same suggestions are rendered below with:
   - รับข้อเสนอ
   - แก้ไขแล้วรับ
   - ไม่ใช้
4. ChatGPT handoff remains optional for deeper analysis.

This satisfies the rule:

AI analysis must produce visible content immediately before any external handoff.

No private AI secret is embedded in GitHub Pages.

## Runtime verification

Verified scoped catalogue:

65 courses

Verified dashboard scope:

65 curriculum courses

AY2569/T1 offered courses:

30

TQF3 present:

1

TQF5 present:

1

Verification present:

1

VERIFIED:

0

INSUFFICIENT_EVIDENCE:

1

## Description coverage

Scoped HED/PED:

65

With extracted curriculum-book description:

64

Missing:

HED3701

Parser-tail contamination remaining:

0

## HED2503

Course description provenance:

verification_status:
SOURCE_TEXT_EXTRACTED

authority_status:
CURRICULUM_BOOK_SOURCE_OBSERVED

The prior working-source candidate has been superseded by a new current description version sourced from the curriculum book.

## Frontend regression

JavaScript syntax:

PASS

Required DOM IDs:

PASS

V28 CSS:

PASS

V28 JS:

PASS

Immediate AI analysis box:

PRESENT

HED3701 TQF4/TQF6 message:

PRESENT

Provenance-aware fallback message:

PRESENT

## Immutable release invariant

HED2503 TQF3 R1:

HEPE-HED2503-TQF3-2569-1-R1

Status:

PUBLIC_PUBLISHED

SHA-256:

799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256

R1 remains unchanged.

## Production boundary

Production:

NOT AUTHORIZED

No Production deployment authorization occurred.

No secret change.

No evidence auto-admission.

No VERIFIED transition.

No immutable R1 mutation.

## Current visual acceptance gate

Expected v28 behavior after authenticated login:

- programme/course selectors show only HED/PED operational courses
- EDU and RAM/general-education courses do not appear
- HED/PED course descriptions appear from the curriculum source where available
- HED3701 shows the TQF4/TQF6 source route message
- pressing AI analyze immediately fills the AI analysis text box
- user still controls Accept / Edit & Accept / Reject decisions

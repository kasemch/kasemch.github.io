# HEPE FAST TQF PORTAL — V28 SCOPE / CURRICULUM DESCRIPTION / IMMEDIATE AI AUDIT

Date: 2026-09-18

Status: READY

Environment: NON-PRODUCTION

## Approved corrections

1. Fast TQF Portal scope is HED/PED only.
2. General education courses are excluded.
3. EDU-prefixed teacher-profession courses are excluded.
4. Course descriptions must come from curriculum sources, not AI fabrication.
5. Pressing AI analysis must produce visible text immediately inside the interface.

## Scope evidence

Google Drive source:

- File: RU-HEPE ฐานข้อมูลหลักสูตรและผู้สอน พ.ศ. 2567
- File ID: 1Hn7___9uLYPXJ2wT4f9fBQkKmzdHCESoBA4DBptjnhE

The source states that teaching-course assignment is limited to HED/PED courses under the department and excludes general education and EDU courses.

Current curriculum composition before scope filtering:

- EDU = 13
- HED = 28
- PED = 37
- RAM = 14
- total = 92

V28 Fast TQF scoped courses:

- HED + PED = 65

## Curriculum description source

Google Drive source:

- File ID: 1E0fXyoOc-v2z-GzEyfGq-JHHKMK9C0xk
- Title: หลักสูตรศึกษาศาสตรบัณฑิต HE - PE 67 (1).docx

The curriculum book contains course-description text for HED/PED courses.

Imported current descriptions:

- 64 courses

Missing:

- HED3701

HED3701 is a field-practicum course and remains on the TQF4/TQF6 source route. No AI-generated substitute description was created.

Imported provenance state:

- verification_status = SOURCE_TEXT_EXTRACTED
- authority_status = CURRICULUM_BOOK_SOURCE_OBSERVED
- source locator = 3.1.5 คำอธิบายรายวิชา + course code

HED2503 was superseded by a new working description version extracted from the curriculum book.

## Runtime scope hardening

Updated portal RPCs:

- hepe_fast_tqf_programme_catalog()
- hepe_fast_tqf_course_catalog(text,text,text)
- hepe_fast_tqf_curriculum_context(text,text)
- hepe_fast_tqf_programme_dashboard(text,text,text)

Fast portal catalog and dashboard now include only HED/PED courses.

Out-of-scope EDU/RAM courses are not part of the Fast TQF course catalog.

## Current verified runtime

Programme course count:

65

Current descriptions:

64

Missing descriptions:

HED3701 only

AY2569/T1 dashboard:

- curriculum courses = 65
- offered courses = 30
- TQF3 present = 1
- TQF5 present = 1
- verification present = 1
- VERIFIED = 0
- INSUFFICIENT_EVIDENCE = 1

## HED2503 description state

Current description version:

2

Source:

Curriculum book file 1E0fXyoOc-v2z-GzEyfGq-JHHKMK9C0xk

verification_status:

SOURCE_TEXT_EXTRACTED

authority_status:

CURRICULUM_BOOK_SOURCE_OBSERVED

This is source-grounded curriculum text, but institutional approval remains a separate governance state.

## Immediate AI analysis

V28 adds a visible textarea:

AI result box:
ผลวิเคราะห์ทันที

Behavior:

- user presses an AI analysis button
- Smart QA runs immediately
- analysis text is written into the result box immediately
- detailed suggestion cards appear below
- each suggestion remains Accept / Edit and Accept / Reject
- opening ChatGPT is optional and relabeled as deeper analysis

No protected AI API key is embedded in GitHub Pages.

## Frontend

- ./hepe-trial/index.html
- ./hepe-trial/assets/js/portal-v28.js
- ./hepe-trial/assets/css/portal-v28.css
- ./hepe-trial/config/state.json

All local asset paths remain relative.

## Regression

- JavaScript syntax = PASS
- required DOM contract = PASS
- immediate AI result box = PRESENT
- v28 JS reference = PASS
- v28 CSS reference = PASS
- HED/PED scope metadata = PRESENT
- curriculum descriptions = 64/65
- HED3701 remains explicitly unresolved rather than fabricated
- Production unchanged

## Production boundary

Production authorization remains FALSE.

No secret change.
No immutable R1 mutation.
No historical release rewrite.
No AI-fabricated curriculum description.

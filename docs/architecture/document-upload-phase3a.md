# Document Upload Phase 3A — Local Classification Gate

Status: LOCAL-ONLY / FAIL-CLOSED

## Purpose
Provide a safe Upload Center that can inspect a selected file's browser metadata and suggest a document category before any storage integration exists.

## Current behavior
- File remains local in the browser.
- No network upload is performed.
- No file contents are read or transmitted.
- Classification uses filename rules only.
- Human review remains required.
- Store button is disabled.

## Initial categories
- Teaching
- Research
- Publications
- Curriculum
- Quality Assurance
- Academic Service
- Other

## Rule examples
- `HED####`, `PED####`, `EDU####`, `RHE####` -> Teaching
- `MOVE24`, `RESEARCH`, `PROPOSAL`, `ETHICS`, `IRB` -> Research
- `PUBLICATION`, `MANUSCRIPT`, `ARTICLE`, `JOURNAL`, `PAPER` -> Publications
- `PLO`, `CLO`, `CURRICULUM`, `MAPPING`, `TQF`, `MKO`, `มคอ` -> Curriculum
- `AUN-QA`, `SAR`, `QA`, `QUALITY` -> Quality Assurance
- `SERVICE`, `COMMUNITY`, `WORKSHOP`, `OUTREACH` -> Academic Service

## Next gate — Phase 3B
Select and verify a storage provider adapter (Google Drive or Supabase Storage), then add authenticated upload only after storage authorization, metadata schema, file-size policy, allowed MIME types, and rollback behavior are approved.

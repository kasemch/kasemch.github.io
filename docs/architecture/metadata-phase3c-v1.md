# Phase 3C — Dedicated Metadata/Search Architecture v1.0

Status: PREPARED / PROJECT-CREATION GATE

## Objective
Create a dedicated Supabase metadata/search layer for the Academic Command Center without reusing unrelated HEPE, SAOS, CHSP, or sandbox projects.

## Source of Truth Boundary
- Google Drive remains the document binary source of truth.
- Supabase will store metadata, search fields, classification output, provenance, integrity hashes, reconciliation state, and references to Drive file IDs.
- GitHub Pages remains a static presentation layer and must not contain privileged Supabase credentials or private document metadata.

## Controlled Handoff Admission
A document marked NON-PRODUCTION, Controlled Handoff Record, AI-assisted verification, or equivalent may be indexed only as metadata with its evidence status preserved. It must not be promoted to official institutional certification or audit evidence by ingestion.

Required fields for controlled handoff records:
- record_type
- report_id
- version
- environment
- title
- drive_file_id
- sha256
- category
- visibility
- evidence_status
- verification_date
- official_institutional_certification
- open_reconciliation_items
- source_document_name
- created_at / updated_at

## Search Model
Recommended search vector combines weighted fields:
- A: title, report_id, course/project codes
- B: category, tags, evidence_status
- C: summary/scope and reconciliation labels

Private records must be returned only to an authenticated owner context after RLS is active.

## RLS Baseline
- RLS enabled before any metadata row is inserted.
- No public read policy for private records.
- Owner-only SELECT/INSERT/UPDATE/DELETE policies after authenticated identity binding is verified.
- Service-role keys are never exposed to GitHub Pages.

## PDF Handoff Update Pattern
For a verified PDF handoff:
1. Store binary in the canonical Google Drive category folder.
2. Compute SHA-256 locally before metadata admission.
3. Create a sidecar metadata record in private storage.
4. Preserve reconciliation items and certification status exactly as the source states.
5. Insert into Supabase only after dedicated-project creation + RLS gate.

## Activation Gate
The dedicated Supabase project cannot be created until the user confirms which Supabase organization should own it and acknowledges the reported project cost. Existing unrelated projects must not be reused as a shortcut.

## Fail-Closed Behavior
Until activation:
- metadata writes = disabled
- public search over private documents = disabled
- Drive upload activation remains independently gated
- PDF/source metadata stays private in Drive

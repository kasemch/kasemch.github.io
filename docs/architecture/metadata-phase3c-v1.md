# Phase 3C — Metadata/Search Architecture v1.1

Status: ACTIVE / EXISTING-HEPE-TARGET

## Objective
Use the existing HEPE Curriculum Command Center Sandbox metadata domain for controlled HEPE records that belong to the same governance context. Do not create a separate Supabase project for those records and do not reuse unrelated SAOS/CHSP domains.

## Source of Truth Boundary
- Google Drive remains the document binary source of truth.
- The existing HEPE Supabase domain stores controlled metadata, provenance, verification state, and governed relationships for HEPE records.
- GitHub Pages remains a static presentation layer and must not contain privileged Supabase credentials or private document metadata.

## Controlled Handoff Admission
A document marked NON-PRODUCTION, Controlled Handoff Record, AI-assisted verification, or equivalent may be registered only with its evidence status preserved. Ingestion must not promote it to official institutional certification or audit evidence.

Controlled HEPE handoff records enter the existing HEPE evidence-candidate workflow first. The baseline state is:
- admission status remains NOT_ADMITTED until the established HEPE process admits it;
- ingestion creates no IAM or system authority;
- unresolved source conflicts remain unresolved rather than being silently corrected.

## Temporal Truth
The source report is interpreted as-of its verification date. Later system evidence does not rewrite historical statements in the handoff report. Subsequent evidence is reconciled separately under the existing HEPE workflow.

## Course and Teaching-Assignment Reconciliation
A course code named in a handoff PDF is not enough to create a canonical course row. If that code is absent from the current HEPE `courses` registry, the absence remains a controlled gap pending authoritative evidence and the relevant HEPE workflow.

Likewise, the presence of a canonical course row does not authorize automatic creation or modification of `person_course_teaching_assignments`. Existing assignments retain their own provenance and verification status.

## Private Metadata Pattern
For a controlled PDF handoff:
1. Store the binary in the canonical private Google Drive category folder.
2. Compute and retain an integrity hash outside the public site.
3. Store private sidecar metadata with the binary when useful.
4. Preserve reconciliation items and certification status exactly as stated by the source.
5. Register the HEPE record through the existing evidence-candidate domain without changing canonical teaching or authority data.

## Security Boundary
- No service-role key, database password, Google refresh token, or private metadata is committed to GitHub Pages.
- Existing HEPE RLS/IAM/authority/runtime configuration is not altered by website metadata ingestion.
- Existing Supabase security-advisor findings are tracked separately and are not silently remediated from this website integration because doing so could change established HEPE runtime behavior.

## Search Boundary
Any future private-document search must execute in an authenticated HEPE-authorized context. The public GitHub Pages site must not expose controlled PDF content, Drive identifiers, private sidecars, or private Supabase records.

## Decision Record
See `docs/architecture/metadata-target-existing-hepe-decision.md` for the explicit decision replacing the earlier dedicated-project gate.

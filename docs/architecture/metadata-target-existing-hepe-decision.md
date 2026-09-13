# Phase 3C — Existing HEPE Metadata Target Decision

Status: ACTIVE DECISION / NON-PRODUCTION

## Decision
Controlled HEPE handoff records for the Academic Command Center will reuse the existing HEPE Curriculum Command Center Sandbox metadata domain rather than creating a new Supabase project.

## Boundaries
- Google Drive remains the binary document source of truth.
- The existing HEPE project is used only for controlled metadata that belongs to the HEPE domain.
- Existing canonical course, teaching-assignment, authority, audit, and reconciliation records are never overwritten from a handoff PDF.
- Controlled handoff documents enter as evidence candidates first and remain NOT_ADMITTED until the existing HEPE governance process admits them.
- Ingestion must never create IAM or system authority.
- Private Drive identifiers, file contents, and person-specific metadata are not published through the public GitHub Pages site.

## Temporal Truth
A handoff report is interpreted as-of its own verification date. If the HEPE system later contains additional evidence (for example, a later academic-term record), that newer evidence does not rewrite the historical statement in the source PDF. It is treated as subsequent system evidence and reconciled separately.

## Canonical Reconciliation Rule
When a handoff PDF references course codes that are absent from the current canonical `courses` registry, ingestion does not create missing course rows automatically. The gap remains a controlled reconciliation condition until an authoritative source and the relevant HEPE workflow establish the canonical record.

Likewise, the existence of a course row does not authorize automatic creation or modification of a teaching assignment. Existing `person_course_teaching_assignments` records remain authoritative within their documented provenance.

## Evidence Admission
Controlled handoff PDFs may be registered in `hepe_evidence_candidates` with:
- `admission_status = NOT_ADMITTED`
- `creates_system_authority = false`
- source verification/reconciliation status preserved

Promotion to governed audit evidence requires the existing human-governed HEPE admission process.

## Security Boundary
This decision does not modify existing RLS policies, SECURITY DEFINER functions, IAM rules, authority assignments, or support/runtime functions. Security-advisor findings in those areas are tracked as existing HEPE project findings and are out of scope for the public-website metadata integration.

## Public Website Boundary
The GitHub Pages repository may document this architecture decision, but it must not publish the private controlled PDF, private Drive links, private metadata sidecars, or private Supabase records.

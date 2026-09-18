# HEPE FAST TQF PORTAL — MASTER UI/UX DESIGN LOCK v1.0

Date: 2026-09-18

Status: **APPROVED / LOCKED**

Environment: **NON-PRODUCTION**

## 1. Lock decision

The 10-screen visual concept set approved in the project conversation is now the **Master UI/UX Direction v1.0** for the HEPE Fast TQF Portal.

This lock applies to:

- page architecture
- navigation hierarchy
- overall visual language
- layout proportions
- interaction model
- AI-assisted workflow
- human-in-the-loop decision pattern
- document readiness / QA presentation
- programme-level overview presentation

This lock does **not** make any mockup values authoritative course data.

Mockup names, numbers, dates, course codes, results, scores, percentages, and other example content remain non-authoritative examples unless separately verified from controlled sources.

---

## 2. Locked visual language

Primary style:

- clean academic professional interface
- white / off-white background
- navy primary navigation and headings
- crimson/red accent for TQF branding and critical alerts
- green for completed / verified-safe states
- amber for review / warning states
- red for evidence gaps / blocking issues
- light blue / slate supporting surfaces

Visual principles:

- high information density without clutter
- desktop-first, responsive
- card-based hierarchy
- strong status visibility
- compact but readable data tables
- academic/governance-oriented rather than generic SaaS styling
- Thai-first interface with English technical labels where useful

---

## 3. Locked screen architecture

### Screen 01 — Login

Purpose:

Authenticated entry into HEPE Fast TQF Portal.

Locked elements:

- HEPE branding
- email/password login
- Magic Link
- institutional/SSO placeholder if supported later
- NON-PRODUCTION/Sandbox status marker
- concise explanation of system scope

### Screen 02 — Academic Dashboard / Course Selection

Purpose:

Select programme, course, academic year, and term.

Locked interaction:

1. Select programme by **programme name**
2. Course dropdown filters from selected curriculum
3. Academic year / term selection
4. Curriculum canonical information shown automatically
5. AI entry point visible

Do not require users to remember programme codes.

### Screen 03 — TQF3 General + CLO Form

Purpose:

Structured TQF3 data entry.

Locked components:

- canonical course data
- course description from curriculum source
- source/provenance badge
- CLO table
- PLO linkage
- AI suggestions on the right
- explicit user decision buttons:
  - Accept
  - Edit before use
  - Reject

AI may not silently overwrite user content.

### Screen 04 — CLO–PLO Mapping

Purpose:

Visual course-outcome alignment.

Locked design:

- matrix view
- I / R / M mapping
- colour-coded alignment
- AI identifies:
  - missing PLO linkage
  - over-mapping
  - weak alignment
  - unclear measurable CLO wording
- user remains final decision-maker

### Screen 05 — Weekly Teaching Plan

Purpose:

TQF3 Section 3 redesigned as weekly teaching plan.

Locked structure per week:

- week number
- topic/content
- CLO / PLO
- learning activities
- hours
- assessment/evidence
- learning resources
- AI action
- row actions

This replaces a single large free-text field.

AI may analyze each week independently and across the full term.

### Screen 06 — TQF3 Assessment

Purpose:

Plan assessment structure and alignment.

Locked components:

- formative vs summative summary
- percentage total check
- assessment list
- CLO linkage
- rubric/evidence information
- AI alignment analysis
- readiness result

### Screen 07 — TQF5 Results Dashboard

Purpose:

Compare planned vs actual implementation.

Locked components:

- plan vs actual summary
- student count
- grade distribution
- CLO attainment
- problems / issues
- CQI improvement plan
- AI consistency checks

TQF5 should inherit relevant plan data from TQF3 rather than require duplicate entry.

### Screen 08 — Verification Evidence Workspace

Purpose:

Evidence-based course verification.

Locked components:

- verification lifecycle status
- evidence checklist
- evidence file/status table
- conflict / missing evidence indication
- AI evidence summary
- draft finding
- human-controlled review action

No VERIFIED shortcut is allowed.

### Screen 09 — Readiness / Cross-document Consistency

Purpose:

Pre-submission QA across TQF3 / TQF5 / Verification.

Locked components:

- overall readiness score
- completeness checklist
- cross-document consistency matrix
- blocking issues
- AI summary
- ready-to-submit status

### Screen 10 — Programme Dashboard

Purpose:

Programme-level monitoring.

Locked components:

- total courses
- completed
- in progress
- insufficient evidence
- approaching deadlines
- course-by-course TQF3/TQF5/verification status
- programme heatmap
- AI programme insights

---

## 4. Locked AI interaction model

AI is a **co-pilot**, not an autonomous decision-maker.

Every AI recommendation must be represented as a proposal.

Required user actions:

- Accept
- Edit then Accept
- Reject

AI must not:

- alter canonical curriculum data
- change course descriptions from authoritative curriculum source
- mark verification as VERIFIED
- fabricate evidence
- invent results
- alter institutional authority status
- approve documents on behalf of responsible staff

AI may:

- identify missing fields
- check alignment
- suggest wording
- identify inconsistencies
- propose CLO refinements
- review weekly plans
- review assessment alignment
- summarize evidence gaps
- suggest CQI actions
- prepare draft explanations

---

## 5. Locked curriculum-first interaction

System entry flow:

Programme
→ Course
→ Academic Year
→ Term
→ Canonical Curriculum Context
→ TQF3 / TQF5 / Verification

Programme selection must display programme name.

Course selection must be dependent on the selected curriculum.

Canonical course data should be read-only when sourced from controlled curriculum records.

Provenance should be visible to users.

---

## 6. Locked TQF3 Section 3 design

TQF3 Section 3 is officially redirected from a large text area to a **weekly planner**.

Recommended columns:

1. Week
2. Topic / Content
3. CLO / PLO
4. Learning Activities
5. Hours
6. Assessment / Evidence
7. Learning Resources
8. AI Review
9. Actions

This is a locked UX direction.

Exact data schema may evolve under change control without changing the UX intent.

---

## 7. Locked workflow principles

- One Source of Truth
- Evidence-First
- No Fabrication
- Reuse before re-entry
- TQF3 → TQF5 carry-forward
- Verification based on evidence
- Human-in-the-loop
- Version history
- Auditability
- Clear readiness status

---

## 8. Change-control rule

Changes that do not alter the master interaction model may be implemented without reopening the design lock.

Examples:

- wording refinements
- spacing adjustments
- accessibility improvements
- responsive layout improvements
- additional filters
- minor table column changes
- performance improvements

Changes that **do** require explicit design-unlock approval:

- replacing left navigation with a fundamentally different navigation model
- removing weekly planner architecture
- removing AI human-approval controls
- replacing programme/course dropdown workflow
- allowing AI to write directly without user decision
- removing evidence status visibility
- removing cross-document readiness view
- changing the 10-screen architecture substantially

---

## 9. Production boundary

This design lock does not authorize Production.

Current environment remains:

**NON-PRODUCTION**

No production deployment, institutional authority claim, or immutable release mutation is implied by this approval.

---

## Final Lock

**HEPE FAST TQF PORTAL — MASTER UI/UX DESIGN DIRECTION v1.0**

Status:

**APPROVED AND LOCKED**

The approved 10-screen concept set is the design baseline for subsequent implementation.

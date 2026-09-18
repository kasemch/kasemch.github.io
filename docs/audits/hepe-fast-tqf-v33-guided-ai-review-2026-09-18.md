# HEPE FAST TQF PORTAL — V33 GUIDED FIELD AI / REVIEW QUEUE AUDIT

Date: 2026-09-18
Environment: NON-PRODUCTION
Status: READY FOR AUTHENTICATED VISUAL ACCEPTANCE

## Scope

V33 continues from the verified V32.2 baseline and adds:

1. field-level AI quick actions
2. action types WRITE / CHECK / REFINE / ALIGN
3. gap-first suggestion ordering
4. old/new diff preview
5. AI context mini drawer
6. next-gap navigation
7. section-completion badges
8. guided Review Queue Mode
9. Reuse → Update assistant
10. expanded AI Decision / Evidence Trail

## Field-level AI

Quick actions are available for high-value fields, including:

- CLO statement
- weekly learning activity
- assessment evidence/rubric
- TQF3 objectives
- TQF3 resources
- TQF3 improvement notes
- TQF5 Plan→Actual
- TQF5 problems
- TQF5 CQI
- verification finding

Dynamic table fields receive compact AI controls from row renderers.

Static fields receive controls through V33 UI enhancement.

## Action types

Supported action types:

- WRITE
- CHECK
- REFINE
- ALIGN

The local Smart QA does not invent authoritative curriculum facts.

For blank fields, WRITE provides a structured scaffold/placeholders.

Targeted form write remains disabled until the user edits the proposal into actual usable text and explicitly applies it.

## Gap-first

Suggestion ordering:

BLOCKING
→ WARNING
→ SUGGESTION

Inline panels show gap-focused items first.

The user can toggle to show all suggestions.

Suggestion-card indices were reconciled against the full suggestion cache so filtered display cannot select the wrong underlying suggestion.

## Diff preview

Before targeted apply, V33 shows:

- current field text
- proposed/edited text
- deleted segment
- added segment

This preview is advisory only.

Actual write requires explicit Apply.

## Context mini drawer

Inline AI panels expose compact context:

- course
- curriculum description source
- source locator
- authority status
- CLO/weekly/assessment context when applicable
- TQF5/verification state where applicable
- target selector

Canonical and working context remain distinguishable.

## Next-gap navigation

Readiness findings with a target are ordered:

BLOCKING
→ WARNING
→ other non-PASS

“ไปจุดถัดไป” navigates to the next actionable readiness gap.

No automatic data change occurs.

## Section completion

Current operational section states:

- NOT_STARTED
- IN_PROGRESS
- NEEDS_REVIEW
- READY_FOR_INTERNAL_REVIEW

These are workflow states only.

They are not institutional approval or academic-quality ratings.

## Review Queue Mode

The readiness panel receives a guided queue:

Issue N / Total
→ inspect
→ jump to target
→ next / previous

The queue is derived from current readiness findings.

No auto-resolution.

## Reuse → Update

V33 uses prior working-version history when available.

Choices:

- KEEP current working content
- UPDATE by filling only blank top-level fields from the prior working version
- REWRITE/REVIEW by jumping to the first current readiness gap

UPDATE does not overwrite already completed fields.

A user decision is recorded in the AI decision trail.

## AI decision/evidence trail

TQF3 working content already persists AI decisions.

TQF5 working payload already persists TQF5 AI decisions.

V33 decision records add:

- document
- section
- suggestion_id
- decision
- text
- source_basis
- action_type
- target
- working_version
- decided_at

Internal Review Package adds Appendix G:

AI Decision / Evidence Trail

This remains an audit trail of user decisions, not AI authority.

## Frontend regression

- JavaScript parse = PASS
- bad single-element collection selector with collection methods = NONE
- duplicate DOM IDs = NONE
- live assets = portal-v33.js / portal-v33.css
- field AI contract = PASS
- gap-first contract = PASS
- diff contract = PASS
- context drawer contract = PASS
- next-gap contract = PASS
- section completion contract = PASS
- review queue contract = PASS
- reuse-update contract = PASS
- decision-trail contract = PASS

## Governance invariants

HED2503:

- working TQF3 current version = 5
- TQF3 version count = 5
- verification = INSUFFICIENT_EVIDENCE

Immutable R1:

- PUBLIC_PUBLISHED
- SHA-256 = 799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256

TQF4 generic registry:

- UNDER_REVIEW
- current_version_no = 1

TQF6 generic active review registry:

- UNDER_REVIEW
- current_version_no = 1

A separate RETIRED TQF6 registry row also exists and was not modified.

No V33 database migration was applied.

## Production boundary

Production remains unauthorized.

No secret change.

No evidence admission.

No VERIFIED transition.

No TQF4/TQF6 v2 activation.

No R1 mutation.

No historical rewrite.

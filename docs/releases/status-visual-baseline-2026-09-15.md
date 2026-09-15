# Status Visualization Stable Public Baseline — 2026-09-15

## Scope
This checkpoint records the public-safe status-visualization baseline across the academic website after the September 2026 redesign wave.

Baseline source commit before this release note:
`1578b6fc8b0322b4c1a3536b221fc18fc27efa2f`

## Stable visualization patterns
- Research Project Detail: **Milestone Map** for evidence-backed lifecycle stages.
- Academic Textbook Writing: **Book Journey** for Align → Architect → Evidence → Write → Review → Publication.
- Curriculum & Academic Quality: **Improvement Cycle Map** for Program → PLO/CLO → Learning → Assessment → Evidence → Improvement.
- Teaching: **Teaching Evidence Path** for Course → Teaching → Assessment → TQF5 → Verification → Improvement.
- Professional Development: **Credential Card + Filter Dashboard**; no artificial timeline is introduced because credentials are independent verified records.
- Home: Academic Axis uses Education / Research / Community / Impact as a supporting visual rail rather than a project-progress visualization.

## Shared visual language
The shared progress visualization system provides common design tokens where progression semantics exist:
- Verified / completed evidence-backed state
- Active / current state
- Next gate
- Future / not yet confirmed
- Locked until earlier gates pass

The shared language harmonizes color, node scale, focus treatment, responsive behavior, and reduced-motion behavior without forcing identical layouts across academically different domains.

## Evidence-first rules
- No completion percentage is shown unless a defensible calculation exists.
- A visual stage does not create or upgrade an academic status claim.
- Research milestones remain governed by the public research registry and evidence matrix.
- Teaching offering status remains governed by authoritative MR30 evidence; course-quality documents do not override official cancellation.
- Textbook-writing stages are working-development states, not institutional approval, manuscript-completion, submission, or publication claims.
- Curriculum/QA cycle is explanatory architecture and does not imply every evidence link is complete.
- Professional credentials remain independent records with their own completion/validity metadata.

## Public disclosure boundary
The public site must not expose:
- student-identifiable records, grades, answer scripts, or participant data;
- private Drive identifiers or restricted source documents;
- unpublished manuscript text, confidential protocols, reviewer correspondence, or internal approval records;
- unsupported completion, approval, publication, or submission claims;
- exact real-signature material used for authentication.

The web-safe signature mark remains decorative branding only.

## Layout baseline
- Research Project Detail uses the approved Hybrid Wide Layout.
- Evidence matrices may use the widest content band with local horizontal scrolling when necessary.
- Narrative evidence boundaries remain at readable measure.
- Progress visuals use responsive horizontal-to-vertical behavior where appropriate.
- No body-level horizontal overflow should be introduced.

## Release evidence
The source commit immediately preceding this release note passed:
- Jekyll build workflow run #206;
- AWOS public boundary check run #13.

The release-note pull request must also pass Jekyll build, public-boundary validation, and mergeability before merge.

## Baseline status
**STABLE PUBLIC BASELINE**

This status means the visualization architecture is considered stable for continued content evolution. It does not freeze academic facts, evidence registries, research status, teaching assignments, textbook development, or credentials; those may continue to change when verified evidence changes.

# HEPE-COMM-005 Functional Prototype QA

Date: 2026-10-01
Status: NON-PRODUCTION

## Implemented
- 01+05 Institutional Command × Newsroom responsive shell
- navigation across eight core modules
- synthetic intake/fact-check interaction
- Institutional Voice drafting surface
- four channel preview states
- Media Composer placeholder with editable-text rule
- editorial state simulation capped at APPROVED_FOR_PREVIEW
- synthetic Evidence Registry
- GitHub Publishing flow with Production button disabled
- analytics/calendar boundary statement

## Governance assertions
- No real event claim introduced.
- No credentials/API tokens introduced.
- No direct production or social publishing path exists.
- Existing HEPE preview and master routes are untouched.
- State simulation cannot reach APPROVED_FOR_PR or PUBLISHED.

## Source-level responsive/accessibility checks
- viewport meta present
- semantic header/nav/main/section/footer structure
- nav aria-label present
- labels bound by containment to form controls
- mobile breakpoint at 600px
- horizontal nav remains reachable on small screens
- disabled production control visible

## Remaining human/runtime gates
- Browser visual acceptance on real device: NOT YET VERIFIED
- Exact integration with legacy /hepe-web-controlled-preview source: UNRESOLVED because source path is absent from current master
- Merge: HOLD
- Production publishing: HOLD
- Real social APIs: HOLD

## HEPE-COMM-006 CI acceptance
- HEPE release immutability: PASS
- AWOS public boundary check: PASS
- Jekyll build: PASS
- Jekyll build artifact: generated (`jekyll-site`)
- GitHub Pages production deployment: NOT EXECUTED
- Browser/real-device acceptance: pending a non-production hosted preview URL; repository currently provides a build artifact but no branch Pages URL was verified.

Decision: do not merge merely to obtain a Pages URL. Preserve the controlled-preview boundary.

## HEPE-COMM-006C GitHub-native preview pipeline
- Workflow authored: `.github/workflows/hepe-communication-studio-preview.yml`
- Scope: Communication Studio paths only.
- Permissions: contents read.
- Guards: NON-PRODUCTION markers, direct production=false, real social publish=false.
- Output: 14-day controlled-preview artifact only; no Pages deployment step.
- Smoke checks: required HTML/CSS/JS, viewport, aria-label, disabled production control, terminal-state exclusion.
- First execution: PENDING. GitHub did not schedule the newly introduced workflow from the feature-branch PR commit; existing trusted workflows continue to run successfully. Do not mark this new workflow PASS until an actual run exists.

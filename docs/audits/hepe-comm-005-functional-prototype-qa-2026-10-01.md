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

## HEPE-COMM-007 Functional Acceptance — current HEAD
- Accepted HEAD: `2d1b770bd44f754a17b3d944a7b45b96f8645452`
- Controlled Preview: PASS — run 36808845087
- HEPE release immutability: PASS — run 36808845120
- AWOS public boundary: PASS — run 36808845094
- Jekyll build: PASS — run 36808845108
- Accessibility remediation included: aria-current active navigation, visible focus styling, aria-live status for fact-check and approval state.
- Publishing guard: production control remains disabled; simulation terminates at APPROVED_FOR_PREVIEW.
- Controlled preview artifact: `11138254767`, 6,145 bytes, created 2026-10-01T03:05:05Z, expires 2026-10-15T03:05:05Z.
- Responsive status: CSS mobile breakpoint and viewport metadata verified in source; physical-device acceptance NOT CLAIMED.
- Security/privacy status: prototype contains synthetic content and no publishing endpoint in the reviewed client files; repository-wide secret scanning is not claimed by this acceptance entry.
- Decision: technical CI acceptance PASS for current prototype head. Production, social publishing, and merge of PR #130 remain HUMAN GATES.

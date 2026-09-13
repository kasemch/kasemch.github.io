# Teaching AY2569 Phase-06 — Deployment & Public Link QA

Date: 2026-09-14

## Scope

This audit verifies the merged Teaching AY2569 Phase-05 source state, deployment-integrity signals available from GitHub, and the current accessibility metadata of public-linked Google Drive course-quality documents.

## Repository baseline

- Repository: `kasemch/kasemch.github.io`
- Branch audited: `master`
- Phase-05 merge SHA: `a339987ab3cf17897f6dd09722d40effbf27b10c`
- Source state: merged and present on `master`
- No PR-triggered workflow run was returned for the merge commit by the available GitHub Actions query.

## Live-origin verification limitation

The audit environment could not fetch `https://kasemch.github.io/teaching/` directly. Therefore this audit does **not** claim pixel-level live verification, browser-layout verification, or proof that a visitor received the latest rendered deployment.

This limitation is recorded explicitly under the Evidence-First / No-Fabrication rule.

## Source-level Teaching status verification

The merged public data model remains:

- Initially scheduled: 11
- Retained pending final confirmation: 3
- Officially cancelled: 8
- Special teaching activity: 1
- Semester 2/2569: fail-closed

Later MR30 authority remains controlling. Course-quality document existence does not reverse an official cancellation.

## Direct Google Drive link integrity

Seven distinct Google Drive documents currently linked from the Teaching portfolio were rechecked by file ID. All seven files still exist and the IDs resolve to the expected course-quality documents:

1. RHE4404 combined quality package — file exists.
2. HED2602 TQF3, Semester 1/2569 — file exists.
3. RHE4101 TQF3 — file exists.
4. RHE4101 TQF5 — file exists; remains `EVIDENCE CONFLICT` and is not accepted as proof of completed teaching.
5. HED2503 TQF3 — file exists.
6. HED2503 TQF5 — file exists; working/draft status retained.
7. HED2503 verification package — file exists; draft/planned status retained.

### Sharing metadata

At audit time, all seven Drive files reported `shared: false` / source visibility `not_shared` for the connected account. The public Teaching page already states that access may depend on the source document's Google Drive sharing permissions.

No sharing permission was changed automatically. Changing a source document from private to public is treated as a separate human disclosure decision.

## Privacy and disclosure

PASS at source level:

- no student-identifiable information added;
- no grades, answer scripts, private student evidence or confidential HEPE runtime data added;
- no Drive folder IDs or private audit metadata exposed by this Phase-06 audit;
- no credential or secret used;
- no document-sharing permission mutated.

## Runtime regression scope

No production code, CSS, JavaScript, OAuth, Calendar, Workspace, Upload Center, Research, Publications, CV or HED3505 runtime file is changed by this audit-only phase.

## Gate result

- Source integrity: PASS
- Temporal truth: PASS
- Public privacy: PASS
- Static-web boundary: PASS
- Direct Drive file identity: PASS
- Drive public accessibility: RESTRICTED BY CURRENT FILE SHARING SETTINGS
- Live pixel-level verification: NOT VERIFIED — environment could not fetch live origin
- Critical issues: 0
- Major source-code issues: 0

## Closure decision

`GITHUB-PAGE-TEACHING-AY2569-PHASE-06` is closed as **PASS WITH EXPLICIT LIVE-ORIGIN LIMITATION**.

The Teaching portfolio may remain published in its current source state. If the owner later wants visitors to open the linked course-quality documents without sign-in, each source file should receive an explicit human-approved Drive sharing decision before any permission change is made.
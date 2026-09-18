# HEPE FAST TQF PORTAL — V32 INLINE AI UX FIX AUDIT

Date: 2026-09-18
Environment: NON-PRODUCTION
Status: READY FOR AUTHENTICATED VISUAL ACCEPTANCE

## User-reported defect

From TQF3 Section 2 onward, pressing AI did not visibly produce an easy-to-use recommendation in the section where the user was working.

## Root causes

1. AI output was primarily rendered in the right-side AI rail, not inline under the active section.
2. The existing apply flow required editing before the target-field action became enabled, making the interaction unclear.
3. During V32 construction, collection event bindings briefly regressed from the querySelectorAll helper `$$()` to the single-element helper `$()`. This was caught by regression before closure.
4. The JavaScript replacement issue was caused by `String.replace()` replacement semantics where `$$` produces a single literal `$`. The repair now uses a method that preserves the double-dollar helper.

## V32 solution

Inline AI recommendation panels now exist for:

- TQF3 Section 2 CLO–PLO
- TQF3 Section 3 Weekly Plan
- TQF3 Section 4 Assessment
- TQF3 Section 5 Overview / Improvement
- TQF5
- Verification

Interaction:

AI button
→ Smart QA runs
→ inline panel opens in the active section
→ panel scrolls into view
→ first recommendation is immediately shown in the selected-text textarea
→ user can select another recommendation
→ Accept / Reject / Copy are available inline
→ targeted form write remains disabled until the user edits the recommendation into actual usable text
→ user can then apply the edited text to the target field
→ Undo remains available

The right-side AI rail remains as secondary detail and history.

## Safety

AI recommendations remain advisory.

The system does not automatically alter:

- canonical curriculum descriptions
- canonical mappings
- evidence admission
- verification state
- immutable R1
- template activation

## Regression

- JavaScript syntax: PASS
- single-element selector used with forEach/map/filter/reduce: NONE
- static section AI collection binding: PASS
- CLO row AI binding: PASS
- Weekly row AI binding: PASS
- Assessment row AI binding: PASS
- inline panel count: 6
- duplicate DOM IDs: none introduced
- section AI controls: explicit type="button"
- row-level AI controls: explicit type="button"
- V32 JS/CSS references: PASS
- immediate selected recommendation text: PRESENT
- scroll-to-inline-result behavior: PRESENT

## Current release

Public route:

`https://kasemch.github.io/hepe-trial/?v=32`

Frontend:

- `./hepe-trial/index.html`
- `./hepe-trial/assets/js/portal-v32.js`
- `./hepe-trial/assets/css/portal-v32.css`
- `./hepe-trial/config/state.json`

Production remains unauthorized.

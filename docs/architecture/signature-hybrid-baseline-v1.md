# Signature Hybrid Baseline v1.0

Status: LOCKED BASELINE

Date frozen: 2026-09-13
Repository: `kasemch/kasemch.github.io`
Baseline branch: `master`
Baseline reference commit at closure: `48991dd10c2f2af761b61daccc3a3c89fdb1e878`

## Purpose

This document freezes the current public academic website visual and structural baseline after the Signature Hybrid rollout and subsequent regression checks.

The baseline combines:
- Academic Executive hierarchy
- Bento-style portfolio presentation
- Research-oriented information architecture
- Nature and wellbeing accents
- Responsive, accessible static GitHub Pages implementation

## Public pages covered by the baseline

- `/`
- `/about/`
- `/teaching/`
- `/research/`
- `/publications/`
- `/curriculum-quality/`
- `/innovation-projects/`
- `/cv/`

## Supporting public/utility pages checked for coexistence

- `/academic-calendar/`
- `/add-event/`
- `/upload-center/`

## Design system

Primary visual language:
- Deep navy academic foundation
- Muted gold accent
- Sage / wellbeing accent
- Serif headings with modern sans-serif body text
- Rounded cards and restrained shadows
- Responsive grids and single-column mobile fallbacks
- Visible keyboard focus states
- Reduced-motion support where motion is used

Primary stylesheets:
- `./assets/css/signature-hybrid.css`
- `./assets/css/signature-pages.css`

## Audit result at freeze

Source and integration regression status: PASS

- Critical issues: 0
- Major issues: 0 confirmed
- Confirmed broken links: 0
- Signature Hybrid page regressions: 0 confirmed
- Calendar coexistence: PASS
- Upload Center coexistence: PASS
- Public/confidential boundary: PASS
- Relative-path compatibility: PASS at source level
- Responsive architecture: PASS at source level

External pixel-level rendering remains environment-dependent and was not independently verified from the external `kasemch.github.io` origin during the final audit because the available execution environment could not resolve the live origin.

## Change-control rule

The eight main public pages above should not receive visual or structural redesign changes unless at least one of the following applies:

1. A verified usability, accessibility, responsive-layout, broken-link, or rendering defect is found.
2. New verified public academic content requires a structural extension.
3. A deliberate new design version is approved.
4. GitHub Pages/Jekyll compatibility requires a technical change.
5. A security, privacy, or public-disclosure issue requires correction.

Routine content updates should preserve the Signature Hybrid design language and shared components.

## Public disclosure boundary

Do not publish confidential, restricted, credential-bearing, private-calendar, private participant, non-production implementation, or internal governance material unless it is explicitly approved for public release.

Public pages should continue to present only public-safe summaries and verified academic information.

## Baseline evolution

Future visual revisions should be versioned rather than silently replacing this baseline, for example:
- Signature Hybrid v1.1 — corrective refinement
- Signature Hybrid v1.5 — feature expansion
- Signature Hybrid v2.0 — substantial visual or architectural redesign

This file is the canonical architecture note for Signature Hybrid Baseline v1.0.
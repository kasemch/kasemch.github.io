# Signature Hybrid Versioning Policy

Status: ACTIVE GOVERNANCE
Effective date: 2026-09-13
Canonical baseline: `docs/architecture/signature-hybrid-baseline-v1.md`

## Purpose

This policy controls how the public academic website evolves after Signature Hybrid Baseline v1.0 was frozen. It prevents silent redesign drift while allowing verified content and technical corrections.

## Version model

The website follows semantic-style versioning for design and information architecture:

### Patch — v1.0.x
Use for corrective changes that do not materially alter page structure or visual language.

Examples:
- broken-link correction;
- typo or metadata correction;
- accessibility fix;
- responsive overflow fix;
- path-resolution fix;
- verified content correction;
- security or privacy correction.

Patch releases must preserve the Signature Hybrid design language.

### Minor — v1.x.0
Use for additive changes that extend capability or public content without replacing the core visual architecture.

Examples:
- new public academic section or verified content module;
- new publication or project presentation pattern;
- approved public integration such as calendar or document workflow expansion;
- new shared component added to existing pages;
- substantial navigation extension that preserves the core information architecture.

Minor releases require regression review of affected pages and shared components.

### Major — v2.0.0+
Use for substantial redesign or architectural change.

Examples:
- replacement of the Signature Hybrid visual direction;
- major information-architecture restructuring;
- migration away from the current Jekyll/GitHub Pages presentation architecture;
- broad navigation or content-model redesign;
- major interaction model change across most public pages.

Major releases require explicit design approval before implementation.

## Change-control rules

1. Do not modify the eight baseline public pages merely for stylistic experimentation.
2. Every structural or visual change must have a traceable reason: verified defect, verified public content need, compatibility requirement, security/privacy need, or approved new version.
3. Preserve relative internal asset and page paths for GitHub Pages compatibility.
4. Keep public and restricted information separated. Do not expose credentials, private calendar data, participant information, confidential governance details, or non-public implementation material.
5. Reuse shared styles and components before introducing page-specific duplication.
6. Any new client-side integration must remain compatible with the static-site constraint and fail closed when authorization/configuration is absent.
7. Record notable changes in `CHANGELOG.md`.

## Release gate

Before assigning a release version, check as applicable:
- navigation and internal paths;
- responsive behavior;
- typography overflow;
- accessibility/focus states;
- calendar and utility-page coexistence;
- public-disclosure boundary;
- Jekyll/GitHub Pages compatibility;
- no unintended regression to Signature Hybrid shared styles.

## Baseline references

- Baseline document: `docs/architecture/signature-hybrid-baseline-v1.md`
- Changelog: `CHANGELOG.md`
- Primary homepage stylesheet: `assets/css/signature-hybrid.css`
- Shared secondary-page stylesheet: `assets/css/signature-pages.css`

## Current version

Current locked public design baseline: **Signature Hybrid v1.0.0**.

Changes should remain in `Unreleased` until they are intentionally assigned a patch, minor, or major release number.

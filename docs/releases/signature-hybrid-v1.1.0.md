# Signature Hybrid v1.1.0 — Release Manifest

Status: RELEASE DOCUMENTATION CLOSED
Release date: 2026-09-13
Version class: MINOR
Repository: `kasemch/kasemch.github.io`
Design baseline: Signature Hybrid v1.0.0 (LOCKED / UNCHANGED)

## Release purpose

Signature Hybrid v1.1.0 packages the additive public capabilities and approved profile refinements introduced after the v1.0.x baseline without replacing the locked Signature Hybrid visual language.

## Included additions

- Academic Command Center at `/workspace/` with OAuth-aware runtime status.
- Google Calendar direct-write runtime using a public OAuth Web Client ID and short-lived browser authorization.
- Controlled Google Drive upload runtime with classification, human review, destination capability verification, and explicit upload confirmation.
- Local academic note composer with clipboard export only.
- Command Center navigation entry.
- Approved Formal Portrait 01 for the homepage Hero.
- JPEG fallback of the same approved portrait for author/avatar and social crawler compatibility.

## Included refinements

- Reconciled `/workspace/` after OAuth activation so Quick Add links open the active `/add-event/` and `/upload-center/` workflows.
- Converted workspace asset and internal page links to Jekyll `relative_url` paths where required.
- Removed demonstration calendar events from the public projection and replaced them with a fail-closed empty state until real events are explicitly approved for public display.
- Updated Academic Calendar policy so authenticated Google Calendar management and the intentionally separate public projection remain clearly separated.
- Aligned author avatar, Open Graph preview, Twitter summary metadata, and Person structured-data image to the approved Formal Portrait 01.
- Added a site-wide Open Graph description while intentionally leaving the theme-level `og_image` unset because the current template interprets that value as an Organization logo.

## Governance and safety

- Signature Hybrid v1.0.0 remains the locked design baseline.
- No private HEPE data is rendered by the workspace.
- No Google client secret, refresh token, service-account key, Supabase service-role key, or other privileged credential is embedded in the public repository.
- Calendar and Drive writes remain explicit user-confirmed browser OAuth actions.
- No document action automatically admits evidence, creates authority, creates canonical courses, or mutates canonical teaching assignments.
- Public calendar projection remains fail-closed; no private or inferred calendar event is rendered automatically.

## Release-gate result

- Repository/source integrity: PASS.
- Static/Jekyll architecture: PASS at source level.
- Signature Hybrid shared visual system: UNCHANGED.
- Portrait/social metadata consistency: PASS at source level.
- Calendar/Drive/Workspace coexistence: PASS at source level.
- Public-disclosure boundary: PASS.
- Critical confirmed issues: 0.
- Major confirmed issues: 0.

## External-render limitation

The available execution environment could not independently fetch `https://kasemch.github.io` during final verification. Therefore live pixel-level rendering and third-party social-card cache behavior are not claimed as independently verified. Source and integration state are verified from the repository.

## Canonical references

- `CHANGELOG.md`
- `docs/architecture/signature-hybrid-baseline-v1.md`
- `docs/architecture/signature-hybrid-versioning-policy.md`
- `docs/releases/signature-hybrid-v1.0.0.md`

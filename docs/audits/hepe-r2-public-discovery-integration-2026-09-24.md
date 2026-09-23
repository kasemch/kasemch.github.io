# HEPE R2 Public Discovery Integration Audit

Status: PASS WITH LIVE-HTTP LIMITATION  
Date: 2026-09-24  
Repository: `kasemch/kasemch.github.io`

## Scope

This audit closes the public-discovery integration for the governed HEPE project-controlled release:

- Release: `HEPE-HED2503-TQF3-2569-1-R2`
- Course: `HED2503`
- Document: `TQF3`
- Academic period: `2569/1`
- Release scope: `HEPE_PROJECT_CONTROLLED_PUBLIC_RELEASE`
- Institutional official claim: `false`

No institutional-official status is asserted by this integration.

## Immutable package evidence

The release packages remain separate from the discovery layer.

R1 package blobs after integration:

- `hepe-public/release.json`: `5b7450468be9f5c94b76bcc2fd1350863c9d7b5e`
- `hepe-public/lineage.json`: `d2850515ea6f1c79b557f5037c9a7bd0bcdcc30b`

R2 package blobs after integration:

- `hepe-public/r2/release.json`: `de28d2629807cee592a2b60e7b54eeb9c717f278`
- `hepe-public/r2/lineage.json`: `3f8185929e7c87e6e9a97453600a4d475f3cb4de`

The R2 manifest remains bound to Version 13 bundle SHA-256:

`4a0687da40ca641e6f8b0de1aa96b3f1179dda78a118be664e9e88b5fce29ce3`

## Discovery architecture

The discovery registry was advanced to schema v3 so that immutable package lineage and public registry-observed lineage are not conflated.

- R1 package lineage remains unchanged.
- The discovery registry records R2 as the governed successor of R1.
- R2 is the current lineage head.
- Presentation-only metadata is optional when it is not explicitly present in an immutable release manifest.
- Public rendering continues to exclude internal actor identifiers, session identifiers, reviewer metadata and internal audit payloads.

This preserves `DO_NOT_MUTATE_R1_IN_PLACE` and `DO_NOT_MUTATE_R1_OR_R2_IN_PLACE`.

## Public discovery surfaces

The following surfaces now resolve the current release from the canonical public-safe registry instead of hard-coding R1:

- HEPE Public Releases registry
- R2 release detail route
- Homepage HEPE release card
- Curriculum & Quality HEPE release surface

## Validation evidence

For discovery schema and release rendering:

- HEPE release consistency run `35911839695`: success
- Jekyll build run `35911839635`: success
- AWOS public boundary run `35911839606`: success

For the current-release homepage and Curriculum & Quality integration:

- Jekyll build run `35912048327`: success
- AWOS public boundary run `35912048781`: success
- GitHub Pages build and deployment run `35912046830`: success

## Authority and publication boundary

The authoritative publication registry already records R2 as `PUBLIC_PUBLISHED`, with project-controlled public scope, the Version 13 bundle hash, R2 public URL and `institutional_official_claim=false`.

The governed post-publication audit records SHA, registry, manifest, public-safe scope, metadata and lineage checks as passing.

## Limitation

Independent live HTTP retrieval from the current tool environment was not available. GitHub Pages build/deployment evidence is successful, but this audit does not convert the existing live-HTTP status into an independently verified HTTP check.

Accordingly, the release remains evidence-supported as deployed and published, while the independent live-HTTP verification limitation is retained rather than inferred away.

## Closure

R2 public discovery integration: **PASS WITH LIVE-HTTP LIMITATION**.

R1 and R2 release packages remain immutable. Any substantive future revision must be issued as R3 or later with governed predecessor lineage rather than changing either existing package in place.

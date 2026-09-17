# B03.35 — HEPE Release Metadata Schema v2 Readiness

Status: **PASS / CLOSED**

Date: 17 September 2026

## Scope

This batch upgrades the public-safe HEPE release rendering registry from schema version 1 to schema version 2 without modifying the governed R1 release payload, release manifest, lineage payload, frozen SHA-256, or Supabase production data.

## Schema v2 additions

The canonical public-safe registry now supports these backward-compatible presentation and lineage fields:

- `release_family`
- `revision_number`
- `display_label`
- `language`
- `current_release`
- `superseded`
- `superseded_by`
- `display_order`
- `detail_route`

These fields are public-rendering metadata only. They do not replace governed release facts.

## R1 compatibility

Current R1 remains:

- release code: `HEPE-HED2503-TQF3-2569-1-R1`
- release status: `PUBLIC_PUBLISHED`
- lineage: singleton/current head
- institutional official claim: `false`
- bundle SHA-256: unchanged
- mutation policy: `DO_NOT_MUTATE_R1_IN_PLACE`

The schema v2 values for R1 are derivable from already-public metadata and do not introduce new restricted or internal information.

## Renderer changes

`_pages/hepe-public-releases.md` and `_layouts/hepe-release.html` consume optional schema v2 fields while retaining fallbacks for older entries. The registry now prefers canonical `detail_route` when present rather than rebuilding that route manually.

## Validator changes

`scripts/validate_hepe_public_releases.rb` now accepts schema versions 1 and 2 and validates optional schema v2 consistency, including:

- positive `revision_number`
- `display_label` agreement with revision number
- `current_release` agreement with successor absence
- `superseded` agreement with successor presence
- `superseded_by` agreement with `successor_release_code`
- non-blank `release_family`
- basic public language-tag format
- non-negative `display_order`
- canonical detail-route pattern and route-stub existence

Existing manifest, lineage, reciprocal-lineage, checksum, public-boundary, and authority checks remain active.

## Verification

Final implementation commit: `d5c259c03bce4e0757dcb159f1668b42794c36ab`

Verified GitHub Actions:

- HEPE Release Consistency: **SUCCESS**
- Jekyll Build: **SUCCESS**
- AWOS Public Boundary: **SUCCESS**

## Governance result

B03.35 is closed as **PASS**.

R1 remains immutable. No new release was published. No production database mutation occurred. No institutional-official claim was added.

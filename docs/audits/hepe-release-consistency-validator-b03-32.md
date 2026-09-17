# HEPE B03.32 — Release Consistency Validator Closure

Date: 2026-09-17
Repository: `kasemch/kasemch.github.io`
Release baseline: `HEPE-HED2503-TQF3-2569-1-R1`
Status: PASS

## Objective
Add fail-closed CI validation so the canonical public-safe release registry cannot silently diverge from the already published release manifest and lineage files.

## Implemented controls

### Validator
File: `scripts/validate_hepe_public_releases.rb`

The validator checks every record in `_data/hepe_public_releases.yml` against its referenced manifest and lineage JSON files. It fails on:
- duplicate or missing release codes;
- missing manifest or lineage files;
- invalid JSON;
- release code mismatch;
- release status/scope mismatch;
- course/document/year/term mismatch;
- source provenance or template-scope mismatch;
- canonical credit-pattern mismatch;
- bundle SHA-256 mismatch;
- lineage status mismatch;
- predecessor/successor mismatch;
- mutation-policy mismatch;
- `public_safe` mismatch;
- institutional-official claim other than `false` under the current governed baseline.

### CI workflow
File: `.github/workflows/hepe-release-consistency.yml`

The workflow runs on push and pull requests affecting the canonical release dataset, public release files, validator, or validator workflow. It uses read-only repository permissions and performs no writes or publication actions.

## Verified CI evidence
For implementation commit `95441a45e80462845cf313e290c0f289d90694ef`:
- HEPE release consistency workflow: SUCCESS
- Jekyll build: SUCCESS
- AWOS public boundary check: SUCCESS

The validator reported a successful consistency check for the current registered release.

## Governance result
The website now fails closed if public rendering metadata diverges from the immutable R1 manifest/lineage integrity fields. The validator does not mutate R1, create new releases, alter production databases, or infer institutional authority.

## Baseline protection
`HEPE-HED2503-TQF3-2569-1-R1` remains immutable. Future substantive changes require R2 or later governed lineage and a separate publication gate.

## Result
`B03.32 = PASS — RELEASE CONSISTENCY VALIDATOR ACTIVE`

Recommended next reversible phase: `B03.31 — Release Registry UX Scalability`, focused on multi-release-ready presentation while preserving the canonical dataset and all authority boundaries.

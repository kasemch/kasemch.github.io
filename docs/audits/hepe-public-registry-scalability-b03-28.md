# HEPE B03.28 — Public Release Registry Scalability

Date: 2026-09-17
Repository: `kasemch/kasemch.github.io`
Release baseline: `HEPE-HED2503-TQF3-2569-1-R1`
Status: PASS

## Objective
Introduce one public-safe canonical Jekyll data source for HEPE public-release discovery and future multi-release rendering without mutating the immutable R1 release payload, manifest, lineage, authoritative release record, or production database.

## Canonical public-safe dataset
Created:

`/_data/hepe_public_releases.yml`

The dataset is intentionally limited to public-safe release metadata already supported by the published R1 manifest and lineage. It is a rendering/discovery source only and is not an authoritative replacement for controlled-release records.

## R1 fidelity
The canonical public dataset preserves the published R1 values for:
- release code
- course code/title
- programme title
- document type
- academic year/term
- canonical credit pattern
- release scope/status
- source provenance
- template scope
- institutional-official claim = false
- frozen SHA-256
- public paths
- closed R1 lineage state
- mutation policy

## Scalability design
The registry is structured as a `releases` collection so future governed releases can be appended as new records, including R2/R3 successors or other courses/document types. Each record can carry predecessor/successor relationships without altering previous releases.

## Governance boundary
This dataset must contain public-safe metadata only. Do not copy actor identifiers, session identifiers, reviewer metadata, private approval payloads, restricted audit data, credentials, or working-source conflict details into this registry.

## Rendering migration map for B03.29
The following public surfaces currently duplicate release metadata and are candidates to render from `site.data.hepe_public_releases.releases`:
- `/_pages/hepe-public-releases.md`
- `/_pages/home.md`
- `/_pages/curriculum-quality.md`
- `/assets/data/academic-index.json` (future static-sync step; JSON itself is not Liquid-rendered by default in this repository workflow)

B03.29 should refactor the three Jekyll pages first. Static search-index synchronization should remain a separate B03.30 step so public publication remains governed and observable.

## Quality gates
- G1 Schema Validity — PASS
- G2 Public-Safety — PASS
- G3 R1 Fidelity — PASS
- G4 Relative Path Safety — PASS
- G5 Jekyll Data Compatibility — PASS at source design level; CI build verification follows commit
- G6 Backward Compatibility — PASS; no existing public route removed
- G7 Search Discovery Compatibility — PASS; existing search index unchanged
- G8 No Institutional Overclaim — PASS
- G9 No Production DB Mutation — PASS
- G10 R1 Immutability — PASS

## Result
`B03.28 = PASS — CANONICAL PUBLIC RELEASE DATASET ESTABLISHED`

Proceed to B03.29 only as a reversible rendering refactor. Do not publish new release content or alter R1.

# B03.26 — Public Release Surface Integration Closure

Status: PASS
Date: 2026-09-17
Repository: kasemch/kasemch.github.io
Release: HEPE-HED2503-TQF3-2569-1-R1

## Scope
Integrate the already registered HEPE public release into the main public academic website without altering the immutable R1 release, manifest, lineage, bundle hash, source provenance or authority boundary.

## Changes
- Added a public-release card to the home page Selected Work section.
- Added a Registered Public Release section to Curriculum & Academic Quality Hub.
- Added a HEPE Public Releases link to the Curriculum & Quality local navigation.
- All links use Jekyll `relative_url` for GitHub Pages path safety.

## Evidence Boundary
Only public-safe metadata already present in the governed public release is surfaced. No actor identifiers, session identifiers, reviewer metadata, restricted audit payloads or working-source conflict details are exposed.

## Baseline Protection
R1 remains immutable. Future changes must create R2 or a later governed lineage.

## Authority Boundary
The public surface explicitly states that the release is HEPE project-controlled and does not claim institutional-official status.

## Production State
No Supabase production or institutional production state was changed.

## Result
PASS — Public discovery is now visible from both the academic homepage and Curriculum & Quality Hub while preserving R1 integrity and governance boundaries.

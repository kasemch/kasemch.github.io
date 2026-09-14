# Academic Executive — Wave 01

Date: 2026-09-15

## Locked visual direction
The user-selected **Academic Executive** concept is the visual baseline for the public homepage and Academic Command Center.

Core characteristics:
- deep navy academic identity
- restrained gold accent
- serif display typography with modern sans-serif body type
- prominent academic portrait hero
- evidence-aware metrics, charts and diagrams
- clean white dashboard surfaces
- public homepage + internal academic command center as a coherent visual system

## Implemented
### Public homepage `/`
- Reframed as an Academic Executive landing page.
- Uses evidence-supported academic copy only.
- Dynamic verified journal-publication and conference-proceeding counts.
- AY2569 retained-teaching count reads from `_data/teaching_ay2569.yml`.
- Added output-mix chart based on repository counts rather than illustrative numbers.
- Added Teaching → Research → Improve → Serve impact-flow diagram.
- Preserved Static AI local-index search as a secondary public feature.
- All local links use Jekyll `relative_url`.

### Academic Command Center `/workspace/`
- Restyled into executive dashboard architecture with sidebar navigation.
- Dynamic metrics derive from verified repository collections/data.
- Added scholarly-output mix chart and academic workflow diagram.
- AY2569 teaching status derives from the reconciled Teaching data file.
- Calendar/Drive OAuth actions and local note workflow are preserved.
- No new authority, private evidence, or institutional truth is created by the presentation layer.

## Data integrity rule
The mockup contained illustrative numbers. Those numbers were **not** copied into production. The implementation uses only repository-derived or explicitly verified public values.

## Scope not changed
- Google Calendar OAuth logic
- Google Drive upload logic
- Teaching MR30 evidence and reconciliation
- Research project status data
- publication records
- private HEPE/RU-AQMS information
- Supabase/IAM/runtime authorization

## Portrait note
Wave 01 preserves the repository's current approved portrait asset path while establishing the locked layout and proportions from the selected concept. A later media-only update may replace the portrait binary without changing the locked page architecture.

## Gate
Source architecture: PASS
Static GitHub Pages constraint: PASS
Relative-path rule: PASS
Evidence-first rule: PASS
Runtime scope isolation: PASS

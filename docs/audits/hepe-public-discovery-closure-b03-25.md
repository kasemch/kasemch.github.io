# HEPE B03.25 — Public Release Discovery Regression Closure

Date: 2026-09-17
Environment: GitHub Pages public static site + HEPE project-controlled release registry
Scope: Discovery/integration verification only. No Supabase production migration or canonical release mutation.

## Baseline under test

- Public release code: `HEPE-HED2503-TQF3-2569-1-R1`
- Course: `HED2503 — เพศวิถีศึกษา`
- Document type: `TQF3`
- Release lineage: `CLOSED_R1_BASELINE`
- Frozen bundle SHA-256: `799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256`

## Regression checks

1. **Discovery page — PASS**
   - `_pages/hepe-public-releases.md` exists.
   - Permalink: `/hepe-public-releases/`.
   - R1 release code, course, release scope, provenance, lineage and SHA-256 are surfaced.
   - Links to public registry, release manifest and lineage use Jekyll `relative_url` resolution.

2. **Main navigation — PASS**
   - `_data/navigation.yml` contains `HEPE Public Releases` → `/hepe-public-releases/`.
   - Navigation remains read-only/public-facing.

3. **Static Academic Assistant discovery — PASS**
   - `assets/data/academic-index.json` contains a `controlled-public-release` record for HEPE Public Releases.
   - Search keywords include HEPE, HED2503, TQF3, public release, release registry and curriculum quality.
   - Search target uses a relative site path.

4. **Public-safety boundary — PASS**
   - Discovery page does not expose actor identifiers, reviewer metadata, session identifiers or internal audit payloads.
   - Institutional official status is not claimed.

5. **R1 immutability boundary — PASS**
   - Discovery integration points to the already registered R1 release.
   - This phase does not alter the R1 manifest hash, release lineage, canonical course data or final release bundle.

6. **Sitemap eligibility — PASS (source-level)**
   - The repository uses `jekyll-sitemap`.
   - The discovery page does not set `sitemap: false`, so it is eligible for generated sitemap inclusion at build time.

## Gate result

`B03.25 = PASS — PUBLIC DISCOVERY INTEGRATION CLOSED`

The HEPE R1 public release is now discoverable through three independent public entry points: direct release URL, public-release discovery page, and the site's static academic search index. Future changes to the governed document must create a successor release (for example R2) rather than mutate R1.

# Academic Executive Wave 06 — Public Academic Analytics

Date: 2026-09-15
Scope: `/analytics/`, public navigation, static analytics CSS/JS.

## Evidence model
- Journal publication analytics are generated from the existing verified Jekyll `site.publications` collection.
- Publication-by-year uses publication `date` metadata only.
- Venue distribution uses publication `venue` metadata only and does not imply ranking, indexing, or impact.
- Teaching evidence coverage uses `_data/teaching_ay2569.yml` summary fields with the 11 initially scheduled Semester 1/2569 course codes as the displayed denominator.
- Teaching evidence counts represent located evidence material, not completed delivery, approval, verification pass, or course quality.
- Research lifecycle distribution loads the governed public `assets/data/research-projects.json` registry and counts only `public-summary` projects at their latest verified public stage.
- Research stage is not converted to completion percentage.
- Academic activity map is conceptual and non-quantitative.

## Architecture
- Static GitHub Pages / Jekyll only.
- No backend.
- No external chart library.
- Repository-subdirectory-safe paths use `relative_url`.
- Client-side renderer fails closed when research registry data is unavailable.

## Confidentiality
- No participant data.
- No private Drive identifiers or restricted source URLs.
- No confidential HEPE/RU-AQMS implementation material.
- No credentials, OAuth secrets, Supabase keys, or internal authority changes.

## Gate
Source-level Wave 06 design and evidence-boundary review: PASS, subject to normal GitHub Pages deployment/runtime verification.
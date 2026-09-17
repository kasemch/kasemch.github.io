# B04.01 — Public Website Phase Transition

**Date:** 2026-09-17  
**Repository:** `kasemch/kasemch.github.io`  
**Status:** PASS / TRANSITION BASELINE

## Objective

Move active work from the now-frozen HEPE public-release architecture into a broader public academic website improvement phase, without changing release governance or publishing unreviewed academic evidence.

## Transition basis

B03.40 is now closed as `PASS / FROZEN BASELINE`. The HEPE release architecture is stable enough that new work should focus on overall website quality rather than adding more release-mechanism complexity.

## Current public website strengths

### Home / academic identity

The homepage already presents a coherent academic identity around Health Education, Physical Education, curriculum and quality, research, teaching, community-oriented work and academic innovation. It also exposes the verified publication/proceedings summary and the static Academic Assistant.

### Research

`_pages/research.md` is already data-driven and substantially stronger than a simple list of projects. It derives journal counts, venue counts, publication span, proceedings totals, recent publications and research themes from the website's verified collections and data files.

### Publications

`_pages/publications.html` already provides a searchable/filterable public register with counts by publication years and venues, and keeps journal publications separate from proceedings and degree research.

### Credentials

`_pages/professional-development.md` follows a selective evidence-first publication policy and intentionally withholds identifiers/tokens/private source files.

### Curriculum / HEPE public evidence

The public release registry and detail architecture are now frozen and should be maintained rather than repeatedly redesigned.

## Findings requiring attention in Phase B04

### 1. Navigation density

`_data/navigation.yml` currently exposes fourteen top-level items. This is functionally rich but likely too dense for the primary navigation, especially on smaller screens.

Recommended direction:
- keep 6–8 primary navigation destinations;
- move specialist destinations into logical hubs or secondary links;
- retain direct routes and searchability even if they leave the primary menu.

Potential grouping:
- Home
- Profile
- Teaching
- Research
- Publications
- Curriculum & Quality
- Innovation & Service
- More / Resources

Do not change navigation immediately without a focused information-architecture pass, because this affects site-wide discoverability.

### 2. Profile-image consistency

The homepage uses `images/profile-selected-2026.webp`, while `_config.yml` still declares the author avatar as `profile-approved-01.jpg`.

This creates a visual consistency gap between the full-screen homepage and any theme components that use the configured author avatar.

Recommended next action:
verify whether `profile-selected-2026.webp` is the intended canonical public portrait for all public website surfaces before changing `_config.yml`.

### 3. SEO / identity metadata completeness

`_config.yml` has a solid title, site description and canonical site URL, but several discoverability/identity fields remain intentionally blank, including search-engine verification and academic profile identifiers.

These should not be filled from memory or inference. Add only source-verified public URLs/identifiers.

High-value candidates when verified:
- ORCID
- Google Scholar
- Scopus
- institutional profile
- LinkedIn, if intentionally public
- default social-sharing image

### 4. Research completeness is now an evidence problem, not a layout problem

The research page already contains summary counts, venue profiles, publication timeline, proceedings, recent publications and degree research. The remaining question is whether the underlying `_publications` collection and proceedings data represent the complete verified record.

Therefore the next research task should be source reconciliation against authoritative CV / Drive / public bibliographic evidence, not another UI redesign.

### 5. Credentials completeness is also an evidence problem

The Professional Development page is structurally ready. The next value comes from reviewing additional certificates/credentials and classifying each as:
- Public-safe and verified;
- Needs Review;
- Private / do not publish.

Do not automatically promote Drive certificates into the public registry.

### 6. Visual browser limitation remains open

B03.39 established responsive structural readiness but not independent screenshot/pixel-level verification. This should remain a website-wide QA item rather than blocking normal content/evidence work.

## B04 work order

### B04.02 — Public Website Information Architecture Audit

Focus:
- top navigation density;
- hub relationships;
- duplicate entry points;
- mobile discoverability;
- primary vs secondary destinations.

Output:
proposed navigation model only unless changes are clearly reversible and evidence-safe.

### B04.03 — Research & Publications Evidence Reconciliation

Focus:
- compare public publication collection with authoritative CV / supplied evidence;
- identify missing or duplicate publications;
- classify journal / proceeding / thesis / report correctly;
- do not fabricate indexing, quartiles or citation metrics.

### B04.04 — Credentials & Public Evidence Review

Focus:
- certificates and professional-development evidence;
- public-safe / needs-review / private classification;
- add only verified public metadata.

### B04.05 — SEO & Academic Identity Cleanup

Focus:
- canonical portrait consistency;
- verified academic profile identifiers;
- structured Person metadata;
- social preview image;
- page descriptions and canonical tags.

### B04.06 — Site-wide Link & Visual Regression

Focus:
- broken links;
- relative paths;
- sitemap;
- key page metadata;
- responsive browser verification if dependable tooling is available.

## Governance boundary

This transition does not authorize publication of new research, credentials, CV claims or institutional records.

Use the existing public-safe boundary:
- factual public metadata may be reused once verified;
- private Drive material remains private until explicitly admitted;
- institutional authority claims require source evidence;
- R1 and the HEPE architecture baseline remain unchanged.

## Result

**B04.01 = PASS / TRANSITION BASELINE**

Default next phase: **B04.02 — Public Website Information Architecture Audit**.

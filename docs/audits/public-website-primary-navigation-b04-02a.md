# B04.02A — Primary Navigation Simplification

**Date:** 2026-09-17  
**Repository:** `kasemch/kasemch.github.io`  
**Status:** PASS / CLOSED

## Objective

Implement the B04.02 information-architecture recommendation as a reversible public-navigation change while preserving every existing public route and strengthening contextual discovery for specialist pages removed from the global menu.

## Primary navigation change

`_data/navigation.yml` was reduced from 14 equal-weight top-level items to 8 primary destinations:

1. Home → `/`
2. Profile → `/about/`
3. Teaching → `/teaching/`
4. Research → `/research/`
5. Publications → `/publications/`
6. Curriculum & Quality → `/curriculum-quality/`
7. Innovation & Service → `/innovation-projects/`
8. Academic Hub → `/workspace/`

No public route was deleted or renamed.

## Secondary discovery reinforcement

### Profile hub

`_pages/about.md` now exposes Professional Development alongside Teaching, Research, Leadership & Service and Academic CV. This keeps credential/professional-development content directly discoverable after it leaves the global menu.

### Academic Hub

`_pages/workspace.md` now exposes Current Work and Academic Analytics in its sidebar and public-discovery area, while retaining Research, Publications, Teaching, Curriculum & QA, Evidence and Innovation routes.

Existing contextual relationships remain intact:

- Research Status remains available through Research/Current Work/Academic Hub.
- HEPE Public Releases remain available through Curriculum & Quality.
- Academic Leadership & Service remains available through Profile and other contextual links.
- Academic Textbook Writing remains available through Current Work/Teaching relationships.
- RU HEPE Learning remains available through Teaching and Innovation.
- Evidence Explorer, Knowledge Map and Academic Calendar remain available through the Academic Hub and contextual routes.

## Implementation commits

- Navigation simplification: `081ccad9585390c094b1f84da84a7a5af61fe75b`
- Profile secondary discovery: `a36162eb3abfe0f1e14067e34fa1003e235d54c8`
- Academic Hub secondary discovery / final implementation head: `33b4290cd5b4bbdf0fc70e20d480129bd687b200`

## Verified CI / deployment

For final implementation head `33b4290cd5b4bbdf0fc70e20d480129bd687b200`:

- Jekyll Build run `35250751919` — **SUCCESS**
- AWOS Public Boundary run `35250751956` — **SUCCESS**
- GitHub Pages build/deployment run `35250751421` — **SUCCESS**

## Governance boundary

This phase changes navigation labels and contextual public links only.

It does not change:

- research/publication evidence;
- publication counts;
- credential evidence;
- HEPE R1 content or checksum;
- HEPE release architecture;
- institutional-authority claims;
- Supabase Production data;
- permissions, credentials or secrets.

## Result

**B04.02A = PASS / CLOSED**

Primary navigation is now compact while specialist routes remain public and contextually discoverable.

Default next phase: **B04.03 — Research & Publications Evidence Reconciliation**.

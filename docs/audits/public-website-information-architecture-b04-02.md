# B04.02 — Public Website Information Architecture Audit

**Date:** 2026-09-17  
**Repository:** `kasemch/kasemch.github.io`  
**Status:** PASS / RECOMMENDATION BASELINE

## Objective

Review the current public website information architecture, especially top-level navigation density, hub relationships, duplicate entry points, specialist-page placement and mobile discoverability, without deleting routes or publishing new academic evidence.

## Current primary navigation

The current `_data/navigation.yml` exposes 14 top-level destinations:

1. Home
2. About
3. Current Work
4. Teaching
5. Research
6. Research Status
7. Publications
8. Academic Analytics
9. Academic Leadership & Service
10. Academic Dashboard
11. Curriculum & Quality
12. HEPE Public Releases
13. Innovation & Projects
14. Professional Development

All of these routes may remain public. The issue is not route validity; it is that several are specialist or derivative views that compete for equal prominence in the primary menu.

## Structural findings

### 1. Profile cluster

`/about/` is already the natural profile hub. It links directly to Teaching, Research, Leadership & Service and the Academic CV. Therefore `/cv/`, `/academic-leadership-service/` and `/professional-development/` can remain discoverable as secondary profile routes rather than occupying independent top-level menu positions.

Recommended cluster:

- About / Profile — primary
- Academic CV — secondary
- Academic Leadership & Service — secondary
- Professional Development & Credentials — secondary

### 2. Research cluster

`/research/` is already a substantive research hub with publication counts, venue profile, research themes, proceedings, recent publications and degree research. `/research-progress/` is a specialist status dashboard for active research, while `/analytics/` is a derivative analytical view over public research/teaching/publication data.

Recommended cluster:

- Research — primary
- Research in Progress — secondary
- Public Academic Analytics — secondary
- Evidence Explorer — secondary evidence route

`/publications/` should remain primary because it has a distinct user task: locating and filtering verified scholarly outputs.

### 3. Teaching cluster

`/teaching/` is the correct primary teaching destination. `RU HEPE Learning` is a specialist teaching-innovation ecosystem and should be reached from Teaching and Innovation rather than promoted independently into the main navigation.

Recommended cluster:

- Teaching — primary
- RU HEPE Learning — secondary
- Academic Textbook Writing — secondary
- related teaching evidence routes — contextual links

### 4. Curriculum & quality cluster

`/curriculum-quality/` is already a true hub. It links to Teaching, Research, Publications, HEPE Public Releases and the CV. The dedicated HEPE public-release registry is therefore appropriately subordinate to Curriculum & Quality rather than being a permanent top-level navigation item.

Recommended cluster:

- Curriculum & Quality — primary
- HEPE Public Releases — secondary
- Evidence Explorer — secondary/contextual

This does not alter HEPE release governance or R1 immutability.

### 5. Innovation, leadership and service cluster

`/innovation-projects/` already covers digital innovation, educational systems, community service innovation, public scholarship and RU HEPE Learning. `/academic-leadership-service/` separately covers leadership, programme contribution and service with stronger evidence-status boundaries.

These two pages are complementary rather than duplicates, but they do not both need equal top-level prominence.

Recommended treatment:

- Innovation & Projects — primary label can evolve to **Innovation & Service** if desired
- Academic Leadership & Service — secondary route under Profile and/or Innovation & Service

No title or route change is required in B04.02.

### 6. Current Work versus Academic Dashboard

`/current-work/` is a cross-domain status landing page for work currently in progress. `/workspace/` is a public read-only academic dashboard that already provides an overview and internal navigation to Research, Publications, Teaching, Curriculum & QA, Evidence and Innovation.

They overlap as cross-domain entry points but serve different purposes:

- Current Work = what is currently active
- Academic Dashboard = portfolio overview / metrics / discovery

Both should remain available, but exposing both as top-level items adds navigation density. The stronger long-term pattern is to keep one as the primary cross-domain hub and make the other secondary.

Recommended default:

- **Academic Hub** → `/workspace/` as the primary cross-domain overview
- Current Work → secondary link from Home and Academic Hub

This recommendation is not implemented in B04.02.

## Recommended primary navigation model

A compact 8-item model is recommended for implementation review:

1. **Home** → `/`
2. **Profile** → `/about/`
3. **Teaching** → `/teaching/`
4. **Research** → `/research/`
5. **Publications** → `/publications/`
6. **Curriculum & Quality** → `/curriculum-quality/`
7. **Innovation & Service** → `/innovation-projects/`
8. **Academic Hub** → `/workspace/`

This model reduces the primary menu from 14 to 8 items while preserving the major public user tasks and leaving every existing route intact.

## Secondary-route placement

The following routes should remain directly addressable, indexed where appropriate, and linked contextually from their parent hubs rather than occupying the main menu:

- `/current-work/` — Academic Hub / Home
- `/research-progress/` — Research
- `/analytics/` — Academic Hub / Research / Publications
- `/academic-leadership-service/` — Profile / Innovation & Service
- `/hepe-public-releases/` — Curriculum & Quality
- `/professional-development/` — Profile
- `/cv/` — Profile
- `/academic-writing/` — Teaching / Current Work
- `/ru-hepe-learning/` — Teaching / Innovation & Service
- `/evidence-explorer/` — Academic Hub / domain pages
- `/knowledge-map/` — Academic Hub / Evidence Explorer
- `/academic-calendar/` — Academic Hub / utility discovery

Operational pages such as `/add-event/` and `/upload-center/` already use `sitemap: false` and should not be promoted into public primary navigation.

## Mobile-navigation rationale

Fourteen equal-weight top-level labels create avoidable scanning and wrapping pressure on small screens. An eight-item navigation still requires responsive handling, but it substantially reduces choice overload and makes domain relationships clearer.

Implementation should prefer the theme's existing responsive navigation behavior. Do not introduce a framework or a client-side routing system.

## Naming guidance

Recommended public-facing labels are shorter than some page titles:

- About → **Profile**
- Innovation & Projects → **Innovation & Service**
- Academic Dashboard → **Academic Hub**

These are navigation labels only; page titles and routes can remain unchanged. This avoids unnecessary redirects and preserves current SEO/history.

## Route preservation rule

B04.02 recommends **reclassification, not deletion**.

Do not remove, rename or redirect specialist routes solely to simplify the menu. Preserve existing URLs and contextual links so bookmarks, sitemap entries and Academic Assistant/search references continue to resolve.

## Duplicate-entry interpretation

Multiple links to the same page across Home, hub pages and contextual chips are desirable when they serve task-specific discovery. The problem is only when every specialist page is given equal global-navigation weight.

Therefore:

- contextual cross-links: keep;
- specialist pages: keep;
- primary-menu density: reduce;
- duplicate route creation: avoid.

## Implementation gate

No navigation change was made in B04.02. This audit is the recommendation baseline.

A subsequent reversible implementation phase may update only `_data/navigation.yml`, preserve all routes, run Jekyll build and AWOS public-boundary checks, and verify mobile navigation behavior before closure.

## Quality gates for implementation

1. All existing public routes remain reachable.
2. Main navigation contains no more than eight primary destinations.
3. Teaching, Research, Publications and Curriculum & Quality remain one-click primary destinations.
4. Specialist pages remain reachable from logical parent hubs.
5. HEPE Public Releases remains reachable from Curriculum & Quality.
6. Professional Development and CV remain reachable from Profile.
7. Research Status remains reachable from Research and Current Work/Hub.
8. Academic Analytics remains reachable from Academic Hub and relevant domain pages.
9. Internal paths remain relative/Jekyll-safe.
10. Jekyll Build passes.
11. AWOS Public Boundary passes.
12. No governed evidence, R1 content, institutional-authority state or Production data changes.

## Result

**B04.02 = PASS / RECOMMENDATION BASELINE**

Recommended next implementation: **B04.02A — Primary Navigation Simplification**, using the eight-item model above as a reversible navigation-only change.

If navigation implementation is deferred, proceed instead to **B04.03 — Research & Publications Evidence Reconciliation** without changing the current menu.

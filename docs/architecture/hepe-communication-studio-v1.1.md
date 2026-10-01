# HEPE Communication Studio v1.1 — GitHub Pages-first Architecture

## Baseline
- Design 01+05 LOCKED.
- Eight core modules retained.
- GitHub Pages is the canonical website publication target.
- WordPress is optional/legacy only.

## Core modules
1. Intake Workspace
2. AI Drafting Engine
3. Multi-Channel Content
4. Media Composer
5. Editorial Approval
6. Evidence Registry
7. GitHub Publishing & Distribution Center
8. Analytics & Editorial Calendar

## Shared services
Institutional Voice; RBAC/Authorization; Audit/Version History; GitHub Pages Adapter.

## Publication contract
No content may move from APPROVED_FOR_PREVIEW to APPROVED_FOR_PR without explicit human approval. Direct production publishing and real social posting are fail-closed.

## Repository layout
- `hepe-communication-studio/_data/content-contract.yml` — machine-readable contract
- `hepe-communication-studio/_data/synthetic-content.yml` — test fixture
- `hepe-communication-studio/_posts/` — canonical website article packages
- future `assets/media/` — approved media only

## Safety boundary
This branch contains synthetic content only. It does not modify the existing HEPE controlled preview path, master publication routes, credentials, social APIs, or production workflows.

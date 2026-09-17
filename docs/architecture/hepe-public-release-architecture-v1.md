# HEPE Public Release Architecture v1

**Baseline:** B03.40  
**Date:** 2026-09-17  
**Repository:** `kasemch/kasemch.github.io`  
**Status:** FROZEN ARCHITECTURE BASELINE v1

## 1. Purpose

This document freezes the stable public-release architecture used by the HEPE project on GitHub Pages. It defines the reusable static architecture for project-controlled academic-document publication without asserting institutional-official status.

The architecture is designed around:

- static GitHub Pages / Jekyll only;
- one public-safe canonical release dataset;
- immutable governed release baselines;
- derived public views and search records;
- explicit lineage and integrity validation;
- public/private evidence boundaries;
- fail-closed CI checks;
- human authorization before any new public release.

## 2. Architectural principle

**One governed release → one public-safe canonical entry → many static views.**

Core flow:

```text
Governed internal release
        ↓
Human Publication Gate
        ↓
_data/hepe_public_releases.yml
        ↓
Jekyll static rendering
        ├─ /hepe-public-releases/
        ├─ /hepe-public-releases/<RELEASE_CODE>/
        ├─ homepage selected-work surface
        ├─ Curriculum & Quality surface
        └─ assets/data/academic-index.json
        ↓
Consistency CI + Public Boundary CI + Jekyll Build
```

The public registry is a rendering/discovery source. It does not replace the governed release record, manifest, lineage file, or internal evidence repository.

## 3. Canonical public-safe dataset

File:

`/_data/hepe_public_releases.yml`

Current schema:

`schema_version: 2`

The registry supports core governed/public fields plus additive presentation metadata such as:

- `release_family`
- `revision_number`
- `display_label`
- `language`
- `current_release`
- `superseded`
- `superseded_by`
- `display_order`
- `detail_route`

Schema-v2 presentation fields must never silently contradict governed release facts.

## 4. Immutable release rule

The current R1 baseline is:

`HEPE-HED2503-TQF3-2569-1-R1`

Frozen bundle SHA-256:

`799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256`

Policy:

- do not edit an immutable release in place;
- substantive corrections require R2 or later;
- future revisions must preserve reciprocal lineage;
- publication of a new revision requires a new Human Publication Gate.

## 5. Public routes

Registry:

`/hepe-public-releases/`

Per-release detail route pattern:

`/hepe-public-releases/<RELEASE_CODE>/`

Current R1 detail:

`/hepe-public-releases/HEPE-HED2503-TQF3-2569-1-R1/`

Controlled public-release surface:

`/hepe-public/`

Manifest:

`/hepe-public/release.json`

Lineage:

`/hepe-public/lineage.json`

All internal Jekyll links must remain compatible with `relative_url` / relative-path deployment rules.

## 6. Renderer architecture

Registry renderer:

`/_pages/hepe-public-releases.md`

Shared release-detail renderer:

`/_layouts/hepe-release.html`

Per-release route stubs:

`/_pages/hepe-release-<RELEASE_CODE>.md`

A route stub stores the release code and page presentation metadata only. Governed/public release metadata is resolved from the canonical dataset at build time.

## 7. Multi-course and multi-release readiness

The public registry supports future variation across:

- course code;
- document type;
- academic year;
- term;
- release family;
- revision number.

Current semantic release attributes include:

- `data-course`
- `data-document-type`
- `data-academic-year`
- `data-term`
- `data-release-family`
- `data-current`
- `data-superseded`

Interactive filtering is intentionally deferred until release volume justifies it.

## 8. Static Academic Assistant integration

Template:

`/assets/data/academic-index.json`

The HEPE search record is generated from the canonical release dataset.

URL selection policy:

1. use `detail_route` when available;
2. otherwise use `discovery_path`.

No private release metadata may be introduced into the search index.

## 9. Lineage integrity

The validator enforces:

- unique release codes;
- predecessor/successor references must exist;
- predecessor/successor relationships must be reciprocal;
- no self-reference;
- no lineage cycles;
- no conflicting duplicate predecessor claims;
- schema-v2 current/superseded metadata must agree with lineage.

Future R2 example:

```text
R1.successor_release_code = R2
R1.current_release = false
R1.superseded = true
R1.superseded_by = R2

R2.predecessor_release_code = R1
R2.current_release = true
R2.superseded = false
```

This is a structural rule only and does not authorize R2 publication.

## 10. Consistency validator

Validator:

`/scripts/validate_hepe_public_releases.rb`

Protected evidence dimensions include:

- release identity;
- course/document;
- AY/term;
- release status and scope;
- source provenance;
- template scope;
- institutional-official claim;
- canonical credit pattern;
- bundle SHA-256;
- publication date;
- lineage state and relationships;
- mutation policy;
- public-safe status;
- schema-v2 derived metadata;
- detail-route stub existence.

## 11. CI gates

HEPE release consistency:

`/.github/workflows/hepe-release-consistency.yml`

Jekyll build:

`/.github/workflows/jekyll-build.yml`

Public/private boundary:

`/.github/workflows/public-boundary-check.yml`

A release-architecture change should not be considered closed unless the relevant CI gates pass.

## 12. Public/private boundary

Public-safe release metadata may include:

- release code;
- course code/title;
- programme title already cleared for publication;
- document type;
- academic year and term;
- canonical credit pattern;
- release status/scope;
- source provenance;
- template scope;
- bundle checksum;
- lineage relationship;
- publication date;
- public paths;
- explicit institutional-official claim state.

Do not automatically expose:

- actor UUIDs;
- authenticated identities or sessions;
- reviewer metadata or private notes;
- private approval payloads;
- internal database identifiers;
- restricted source conflicts;
- student/personal information;
- credentials or secrets;
- unpublished institutional evidence.

## 13. Authority boundary

Current release authority state:

- HEPE Project-Controlled: TRUE
- Public-Safe: TRUE
- Institutional-Official: FALSE

No renderer, search result, registry record, badge, or metadata field may imply an institutional-official status without separately verified evidence and explicit authorization.

## 14. Production boundary

GitHub Pages is the public static web surface.

Supabase Sandbox remains the governance/reference environment described by prior phases.

Supabase Production is not changed or authorized by this architecture baseline.

## 15. Visual verification state

B03.39 establishes responsive-readiness at generated-markup/source level.

Browser screenshot/pixel comparison across mobile/tablet/desktop remains tooling-limited and must not be described as completed until an actual browser-rendered verification succeeds.

## 16. Future release publication flow

For any R2+, new course, or new document release:

```text
1. Complete governed internal release workflow.
2. Obtain explicit Human Publication Gate approval.
3. Create the public-safe canonical registry entry.
4. Add a minimal static route stub.
5. Render registry/detail/search views from canonical data.
6. Run release consistency CI.
7. Run public-boundary CI.
8. Run Jekyll build.
9. Verify generated routes/artifacts.
10. Publish/confirm the public surface.
```

No step may infer institutional authority from publication alone.

## 17. Frozen v1 invariants

The following are architecture invariants for v1:

- static GitHub Pages/Jekyll only;
- relative/Jekyll-safe internal paths;
- canonical public-safe release data in `_data/hepe_public_releases.yml`;
- immutable governed releases;
- new revision instead of in-place historical mutation;
- dedicated static detail route per published release;
- search records derived from canonical public-safe data;
- reciprocal lineage validation;
- fail-closed consistency checks;
- explicit public/private boundary;
- explicit institutional-authority boundary;
- Human Publication Gate before every new public release.

## 18. Change-control rule

Future work may add releases, courses, document types, filters, presentation enhancements, or stronger validators without changing this baseline.

A change that alters an invariant above requires a separately documented architecture change rather than silent drift.

## 19. Baseline decision

**HEPE Public Release Architecture v1 is FROZEN as the stable reusable baseline.**

The freeze applies to architecture and governance invariants, not to future approved content growth.

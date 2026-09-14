# Final Public Release Closure Audit — 2026-09-14

## Scope
Final source-level public-release gate after the AY2569 Teaching evidence track, repository-safe path hardening, SEO/metadata hardening, accessibility/link-hygiene work, Option 17A Teaching dashboard, and the Research Command Center addition.

## Source baseline
- Repository: `kasemch/kasemch.github.io`
- Baseline inspected: latest `master` at audit start
- Static hosting model: GitHub Pages / Jekyll / client-side only

## Checks completed

### 1. Teaching evidence boundary
- AY2569 teaching status remains evidence-first and temporally reconciled.
- Restricted Google Drive evidence remains metadata-only in current public source.
- Semester 2/2569 remains fail-closed unless authoritative teaching-assignment evidence is available.

### 2. Repository-subdirectory compatibility
- Main navigation uses the theme base-path mechanism.
- Footer sitemap path was previously corrected to use `base_path`.
- Teaching dashboard no longer depends on a hard-coded `/teaching/` pathname guard.
- Research Command Center assets and JSON use relative paths from `/research-progress/` and remain repository-subdirectory safe.

### 3. SEO / structured data
- Active canonical URL generation is based on `site.url + site.baseurl`.
- Person JSON-LD derives the public site identity from configured deployment values rather than a hard-coded root-domain assumption.
- Only the independently verified GitHub profile is admitted to public `sameAs` metadata.

### 4. Research Command Center public boundary
- Public research data is stored as a summary-level static JSON register.
- Current inspected JSON contains project identity, public-safe themes, status labels, dates, and evidence notes only.
- No participant-level data, private Drive links, unpublished findings, reviewer correspondence, credentials, passwords, service-role keys, private keys, or client secrets were found in the inspected public register/code search.
- The interface fails closed if its static register cannot be loaded.

### 5. Accessibility correction in this gate
Research status filter buttons had a visual active state but did not expose selection state to assistive technology.

Correction:
- each filter button now renders `aria-pressed`
- click handling updates `aria-pressed` together with the visual `is-active` class

No research evidence values or status claims were changed.

### 6. Build/status boundary
The inspected latest commit did not expose a combined CI status in the available repository status endpoint. Therefore this audit does **not** claim a successful GitHub Pages build or pixel-level live-browser verification from that status signal alone.

## Regression boundary
This gate does not change:
- Teaching evidence data or MR30 status
- Research project content/status values
- Signature Hybrid / Option 17A visual design
- Calendar or Google OAuth logic
- Workspace or Upload Center
- Publications / CV content
- HED3505 runtime

## Gate result
- Critical issues: 0
- Major issues after correction: 0
- Public-source privacy boundary: PASS
- Repository-subdirectory source compatibility: PASS
- Accessibility source gate: PASS
- Live pixel/deployment verification: NOT CLAIMED from this environment

## Closure decision
**PASS WITH EXPLICIT LIVE-VERIFICATION LIMITATION**

The current public source is suitable for continued GitHub Pages deployment under the evidence-first, no-fabrication, public-safe disclosure rules. Any later feature merged to `master` should pass the same source, privacy, path, and accessibility checks before being treated as part of this closure baseline.

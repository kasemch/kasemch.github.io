# Site-wide SEO / Metadata Integrity Audit — 2026-09-14

## Scope
Source-level review of public SEO, structured data, social metadata, navigation-path handling, and Teaching privacy controls after the AY2569 Teaching closure and site-wide path hardening.

## Findings

### PASS — canonical link generation
`_includes/seo.html` builds `seo_url` from `site.url + site.baseurl`, and the active canonical `<link>` uses that value. No current canonical-link regression was found.

### PASS WITH CORRECTION — Person JSON-LD deployment awareness
`_includes/head/custom.html` previously hard-coded `https://kasemch.github.io/` for the Person `@id`, `url`, and `mainEntityOfPage.@id` fields. This was valid for the current root-domain deployment but inconsistent with the repository-subdirectory-safe architecture.

Corrective action:
- derive the site public URL from `site.url + site.baseurl`;
- derive the Person `@id` from the same configured base;
- keep the approved portrait and verified GitHub `sameAs` unchanged.

### PASS — social profile admission
No unverified ORCID, Google Scholar, Scopus, ResearchGate, LinkedIn, or other profile was added. `sameAs` remains limited to the verified GitHub profile.

### PASS — Teaching evidence privacy
Restricted Drive-backed Teaching evidence remains metadata-only on the current public source. No direct restricted document URL is introduced by this phase.

### PASS — navigation and asset path architecture
Main navigation is routed through the theme `base_path` mechanism. Local CSS/JS references in the custom head use `relative_url` or `base_path` as appropriate.

## Deferred / non-regression note
`_includes/seo.html` also defines a `canonical_url` helper using `site.url` without `site.baseurl`; this helper is only consumed inside the `site.twitter.username` conditional. The configured Twitter username is currently blank, so this code path is inactive. The active canonical `<link>` is already baseurl-aware. No public regression is therefore claimed in this phase.

## Runtime boundaries
No Calendar, Drive OAuth, Workspace, Upload Center, Teaching data, Research, Publications, CV, HED3505 runtime, CSS, or JavaScript behavior was changed.

## Gate result
Critical: 0
Major after correction: 0
Status: PASS — source-level SEO/metadata integrity.

Live pixel-level/social-crawler verification remains outside the evidence available to this audit environment.
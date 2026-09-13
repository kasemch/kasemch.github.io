# Research Profile Final Consistency Audit

Date: 2026-09-13
Status: PASS
Scope: `/research/`, `/publications/`, `/cv/`, publication metadata conventions, conference-proceedings presentation, and research-output counting boundaries.

## Verified public output model

- Journal publications: derived from the `_publications` collection; current verified count = 21.
- Conference proceedings: derived separately from the 2023 and 2026 proceedings data registers; current verified count = 13.
- Degree research works: displayed separately; current count = 2.

The three output types are intentionally not combined into a single publication total.

## Language consistency

The public Research and Publications presentation uses English research titles. Where authoritative English titles exist, those titles are used. Where only Thai source titles exist, English site-display translations may be used with the source-language bibliographic metadata retained internally for traceability.

## Publications page closure

The Publications page now:

- derives its displayed journal-publication count from `site.publications` rather than a hard-coded number;
- uses Jekyll `relative_url` for local stylesheet and navigation references;
- states the English-title public-display convention;
- explicitly separates journal publications from conference proceedings and degree research.

## Evidence boundary

No citation counts, h-index, database-indexing status, journal quartiles, or impact metrics are displayed without independent authoritative verification. Conference proceedings remain separate from journal-publication totals. Private Drive identifiers and non-public evidence locations are not exposed.

## Regression boundary

No CSS design tokens, JavaScript runtime, navigation configuration, Calendar, Drive, Workspace, OAuth, IAM, or Signature Hybrid visual baseline are changed by this closure patch.

## Gate decision

PASS — Research, Publications, and CV use a consistent output taxonomy and English-language public presentation. Remaining future additions should follow the same evidence-first admission rules.

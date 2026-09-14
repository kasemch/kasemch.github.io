# OPTION-17A-06 Knowledge Map — Public Source Audit

Date: 2026-09-14

## Scope
This audit covers the public academic relationships used by `_data/knowledge-map.yml` and `/knowledge-map/`.

## Source basis
- Public Home / About / Teaching / Research / Curriculum & Quality / Innovation pages.
- Public Evidence Explorer and publication collection.
- No restricted Drive files, confidential committee records, private audit records, student data, HEPE internal governance data, or RU-AQMS internal material are used.

## Relationship rule
A map edge is included only when the relationship is already represented by public website content. The map is explanatory rather than an official institutional taxonomy.

## Public-safety result
PASS — all nodes resolve to public-facing website areas and no confidential node or source identifier is included.

## Technical rule
Static Jekyll data + HTML + CSS + Vanilla JavaScript only. Internal page destinations are repository-relative Jekyll paths.

# HEPE Faculty & Research Quality — controlled preview

Scope: four programmes, non-production, evidence-first. This directory is a public GitHub branch. Do **not** store personal files, appointment letters, private CVs, unpublished manuscripts, protected evidence URLs or credentials here.

## Evidence intake (private workspace before promotion)
1. Extract names and effective dates from the authoritative approved curriculum and any superseding amendment/appointment documentation for each programme.
2. Match Thai/English name variants by independently supported identity markers, not name similarity alone.
3. Extract bibliographic metadata from the actual article landing page and original DOI, when supplied.
4. Validate article type, publication date and historical journal indexing for the relevant reporting criterion.
5. Distinguish source found, verified, needs review and evidence conflict; only verified public-safe entries may enter `data/registry.json`.
6. Confirm academic-year start/end from an authoritative university calendar. Do not infer from a SAR draft.
7. Conduct human academic authority approval before merge/publication.

## Current register status
`staff: []`, `works: []`, `academicYears: []` means **no evidence-approved records imported**, not zero actual staff or outputs. Draft SAR materials contain conflicting or incomplete summary counts and are not a substitute for signed authoritative rosters. No official assurance claim is made.

## Registry shape
Staff: `personId`, `programmeId`, `name`, `qualification`, `rank`, `start`, optional `end`, `verification: "VERIFIED"`.
Works: `id`, `title`, `authors`, `kind`, `publishedDate` (ISO date), `programmeIds`, `url` (HTTPS), `verification: "VERIFIED"`.
Academic years: `yearBE`, `start`, `end`. All published entries must be appropriate for public disclosure; original private evidence should remain under access control outside GitHub Pages.

## Verification tests before merge
- Four programme filters; calendar and fiscal boundaries; verified academic year boundaries; missing-year fail closed.
- Duplicate staff in two programmes must count once at departmental level.
- Duplicate work linked to multiple programmes must count once at departmental level.
- Empty evidence register displays a dash rather than representing missing records as zero.
- No unverified records count toward confirmed totals.
- Manual review of CSV, print, mobile viewport, source-link security, and non-production notice.

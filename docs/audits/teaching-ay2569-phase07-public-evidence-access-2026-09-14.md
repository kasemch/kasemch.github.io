# Teaching AY2569 Phase-07 — Public Evidence Access Audit

Date: 2026-09-14
Scope: `/teaching/`, `_data/teaching_ay2569.yml`
Mode: Evidence-first / fail-closed / public static website

## Objective
Prevent restricted Google Drive source identifiers from being exposed as active public links while preserving verifiable course-quality metadata on the Teaching page.

## Findings
- Seven directly verified source-document references existed in the Teaching evidence register across HED2503, RHE4404, HED2602 and RHE4101.
- Drive metadata review showed the source files were not shared publicly at the time of audit.
- The previous page warned that access depended on Drive sharing permissions, but the public repository still contained direct Drive URLs/identifiers.

## Decision
Use metadata-only public representation for restricted source documents.

Public page behavior:
- retain course/document type/status;
- retain evidence-conflict and draft/working labels;
- do not publish restricted source URL or Drive identifier;
- display `Restricted source · metadata verified` where appropriate;
- publish a direct source link only after public sharing is explicitly approved and independently verified.

## Temporal truth preserved
The access-control correction does not alter offering status:
- Initially scheduled: 11
- Retained pending final confirmation: 3
- Officially cancelled: 8
- Special teaching activity: 1

HED2503 and HED3502 remain cancelled under the later MR30 round-7 notice. Course-quality evidence does not override offering status.

## Semester 2
Semester 2/2569 remains fail-closed until an authoritative teaching-assignment source is confirmed.

## Public disclosure boundary
The current-tip public data file no longer stores direct restricted Drive URLs for course-quality evidence. Student-identifiable information, grades, answer scripts, restricted Drive identifiers, private audit metadata and confidential HEPE records remain excluded from the Teaching page.

## Git-history limitation
Earlier public commits may retain historical Drive identifiers because Git is append-only. This phase does not rewrite repository history. A history rewrite would require a separate explicit authorization and risk review because it changes published commit history and can disrupt clones, branches and references.

## Live-origin limitation
The external audit environment could not fetch `https://kasemch.github.io/teaching/` for pixel-level verification. Source-level Jekyll/Liquid logic and public-disclosure behavior were reviewed instead. No claim of live visual verification is made.

## Regression scope
Files intentionally changed in this phase:
- `_data/teaching_ay2569.yml`
- `_pages/teaching.html`
- this audit file

Not changed:
- global CSS
- JavaScript
- Calendar
- Google OAuth
- Workspace
- Upload Center
- Research
- Publications
- CV
- HED3505 runtime

## Gate result
- Restricted current-tip Drive URLs removed: PASS
- Metadata evidence retained: PASS
- MR30 temporal truth preserved: PASS
- Semester 2 fail-closed: PASS
- Static GitHub Pages architecture: PASS
- Live pixel-level verification: NOT AVAILABLE FROM AUDIT ENVIRONMENT

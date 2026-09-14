# Site-wide Accessibility & Link Hygiene Audit — 2026-09-14

## Scope
Source-level review of public-facing link, accessibility, and repository-subdirectory behaviour after the Option 17A Teaching Evidence Dashboard update.

## Finding
`assets/js/teaching-dashboard.js` contained a hard-coded pathname guard that only allowed the enhancement to run when `location.pathname` normalized exactly to `/teaching/`.

This is incompatible with repository-subdirectory deployment such as `/repo-name/teaching/`, even though the Teaching page loads the asset through Jekyll `relative_url`.

## Correction
Removed the pathname equality guard. The enhancement now activates when the expected `.signature-page` and `.sp-hero` elements are present. The script is already loaded only on the Teaching page by `_includes/head/custom.html`, so the redundant pathname check is unnecessary.

## Accessibility observations
- Teaching filter controls have explicit `<label>` associations.
- Filter results use `role="status"` with `aria-live="polite"`.
- Focus-visible styling is present for links, buttons, and summary elements.
- The current public homepage portrait has descriptive `alt` text.
- Legacy `_includes/cv-template.html` contains `target="_blank"` links without `rel`, but the current `/cv/` page does not use that legacy include; no public runtime change was made to inactive legacy markup in this gate.

## Link hygiene observations
- Footer sitemap root-absolute link was corrected in the prior site-wide integrity gate.
- Current Teaching internal assets use `relative_url`.
- The Google Calendar success link that opens a new tab already uses `rel="noopener"`.

## Regression boundary
No Teaching evidence data, MR30 status, privacy policy, CSS, Calendar/OAuth logic, Workspace, Research, Publications, CV page content, or HED3505 runtime was changed.

## Gate decision
PASS after correction.

Critical issues: 0
Major issues after correction: 0

# Site-wide Public Release Integrity Audit — 2026-09-14

## Scope
Source-level integrity review after closure of the AY2569 Teaching evidence track.

## Checks performed
- Reviewed current `master` after Teaching Phase-08 closure.
- Searched for root-absolute local links that could break under repository subdirectory deployment.
- Rechecked Teaching source for restricted Google Drive document URLs.
- Confirmed the main masthead navigation already prefixes internal navigation entries with the theme `base_path` mechanism.
- Confirmed no CSS, JavaScript, OAuth, Calendar, Workspace, Research, Publications, CV, or HED3505 runtime changes are required by this audit.

## Finding and correction
One root-absolute local link was found in `_includes/footer.html`:

`href="/sitemap/"`

It has been changed to:

`href="{{ base_path }}/sitemap/"`

This preserves compatibility when the site is deployed under a repository subdirectory while remaining valid for the current user-site root deployment.

## Teaching privacy regression check
Current default-branch Teaching source contains no direct restricted Google Drive document links. Course-quality evidence remains metadata-only where source sharing is restricted.

## Navigation note
`_data/navigation.yml` retains route values such as `/teaching/`, but `_includes/masthead.html` intentionally prefixes non-external links with `base_path`; therefore these entries are not treated as an unresolved path defect in this audit.

## Gate result
- Static/Jekyll constraints: PASS
- Repository-safe internal path handling: PASS after footer correction
- Teaching privacy boundary: PASS
- Signature Hybrid baseline: UNCHANGED
- Runtime regression introduced by this patch: NONE
- Critical issues: 0
- Major issues after correction: 0

## Limitation
This is a source-level integrity audit. Pixel-level verification of the deployed public origin is not claimed unless a live browser-origin check succeeds separately.

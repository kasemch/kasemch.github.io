# Homepage Portrait Acceptance — v1.1

Status: NON-PRODUCTION / HUMAN VISUAL GATE. Applies to draft PR #129 only.

## Approved source
The user supplied a real formal black-suit headshot in the conversation. The attached source file must be copied byte-for-byte or losslessly decoded/re-encoded without facial alteration into the preview branch before declaring portrait integration complete. Do not use generative facial replacement, stylization, reshaping, or AI-produced likeness. Preserve the original file separately for provenance. The existing `images/profile-selected-2026.webp` is a temporary site asset and must not be described as verified identical to the supplied headshot without comparison.

## Placement
Only the Home hero displays the portrait. About and other inner pages use non-portrait infographics and existing public-safe content. Keep `master`, existing `_pages/home.md`, `_data`, and the current live image untouched pending release approval. Prefer a preview-only relative Jekyll asset URL such as `{{ '/images/portrait-original-home-v1-1.jpeg' | relative_url }}` once the actual binary has been committed and verified.

## Release gates
1. Verify source-file hash, dimensions and committed blob identity.
2. Verify the image URL loads in a built preview and the face matches the original visually.
3. Check mobile/tablet/desktop cropping, text overlap, alt text and layout shift.
4. Run Jekyll build and public-boundary CI after the final asset change.
5. Obtain explicit human approval before merge or production deployment.

Do not claim portrait upload, visual verification, preview deployment or production release until evidenced.
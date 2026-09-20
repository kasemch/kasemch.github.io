# AWOS Pull Request / Publication Gate

## Summary
Describe what this pull request changes and why the change is needed.

## Change Type
- [ ] Content / academic profile
- [ ] Teaching
- [ ] Research / publication
- [ ] Curriculum / quality assurance
- [ ] Academic writing
- [ ] Digital / technical
- [ ] Governance / CI / documentation
- [ ] Other

## AWOS Classification
Select the highest applicable classification.
- [ ] PRIVATE
- [ ] INTERNAL
- [ ] CONTROLLED
- [ ] PUBLIC-CANDIDATE
- [ ] PUBLIC-safe maintenance only

> Material classified PRIVATE, INTERNAL, or CONTROLLED must not be merged into the public GitHub Pages baseline unless it has been explicitly cleared for public release.

## Evidence and Traceability
State the evidence or source supporting material claims in this change.

- Evidence / source:
- Canonical source system (Drive / GitHub / other):
- Source URL or file ID (public-safe reference only):
- Version / date:
- Related decision or review gate:

If evidence is not yet available, write `EVIDENCE REQUIRED` and keep the affected content unpublished.

## Public Impact
Describe what will change on the public website, including affected routes or assets.

- Public routes affected:
- Public metadata / SEO affected: Yes / No
- Personal or sensitive information introduced: Yes / No
- Copyright / licensing review needed: Yes / No

## Validation
Confirm the applicable checks before merge.

- [ ] Jekyll build passes
- [ ] AWOS public boundary check passes
- [ ] No internal write tooling, credentials, secrets, private identifiers, or restricted evidence are emitted into the public build
- [ ] Links / routes affected by this PR were checked
- [ ] Evidence and status language are consistent with the canonical source
- [ ] PUBLIC-CANDIDATE content has been reviewed for confidentiality and publication suitability

## Publication Gate
For changes that alter public content, release status, or public-facing claims:

- Human publication authorization: PENDING / APPROVED / NOT REQUIRED
- Authorized by:
- Authorization date:

Do not merge a PUBLIC-CANDIDATE change while authorization is `PENDING`.

## Rollback
Describe the simplest rollback path if the change causes a regression after deployment.

- Revert commit / PR:
- Data or content restoration required: Yes / No
- Additional rollback notes:

## Post-Deploy Verification
After merge and GitHub Pages deployment, verify the relevant live routes and record the result.

- [ ] GitHub Pages deployment succeeded
- [ ] Live smoke / route verification passed
- [ ] No unexpected public exposure detected

Post-deploy status: PENDING / PASS / PASS WITH CONDITIONS / HOLD

## Notes
Add any implementation, dependency, migration, or exception notes here.

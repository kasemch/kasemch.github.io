# HEPE Communication Studio — Content Operating Model v0.1

Status: NON-PRODUCTION / design specification
Baseline: HEPE Communication Studio v1.1, Institutional Command × Newsroom 01+05 LOCKED

## Canonical flow
Source Intake → Evidence Extraction → Fact Classification → Fact Verification → Draft → Institutional Voice → Media Preparation → Channel Variants → Editorial Review → Human Approval → Pull Request → Merge → GitHub Pages → optional controlled social distribution.

## Accepted input classes
- informal_text
- announcement_image
- pdf_or_official_document
- official_notice
- activity_news
- activity_images
- url_reference
- structured_form
- manual_facts

Every intake record must preserve provenance and must not silently convert an interpretation into a fact.

## Fact classification
| Class | Meaning | Publish rule |
|---|---|---|
| FACT | Directly supported by source | Eligible after verification |
| INTERPRETATION | Editorial/analytical reading | Must be labelled/reviewed |
| CLAIM | Assertion requiring support | Evidence required |
| QUOTE | Attributed statement | Attribution/source required |
| DATE | Date/time datum | Source consistency required |
| PERSON | Named person | Source/identity confirmation required |
| ORGANIZATION | Named organization | Source confirmation required |
| LOCATION | Place datum | Source confirmation required |
| NUMBER | Quantitative datum | Exact source required |
| SOURCE | Provenance pointer | Must remain traceable |
| UNVERIFIED | Not yet supported | BLOCK publication |
| CONFLICT | Sources disagree | BLOCK publication until human resolution |

## Fail-closed rules
1. UNVERIFIED and CONFLICT cannot enter an approved factual sentence automatically.
2. Missing source provenance blocks FACT verification.
3. Numbers, dates, people, organizations and direct quotations require source linkage.
4. AI Drafting may transform language, not evidence status.
5. Social variants inherit the website canonical facts; they may shorten but not add facts.
6. APPROVED_FOR_PREVIEW is the highest prototype automation state.
7. APPROVED_FOR_PR, merge, production publication and real social distribution require human authority.

## Institutional Voice
Public copy should be clear, courteous, academically appropriate, concise, non-sensational and understandable outside the institution. Preserve official names and factual qualifiers. Avoid promotional superlatives unless explicitly supported by an approved source.

## Evidence record minimum
- evidence_id
- source_type
- source_reference
- received_at
- classification
- verification_status
- verified_by / human authority when applicable
- permitted_uses
- related_content_id
- notes

## Channel contract
Website = canonical full record. Facebook / Instagram / LINE = controlled derivatives. A derivative stores canonical_content_id and source_revision so later corrections remain traceable.

## Human gates
- resolution of CONFLICT
- acceptance of unsupported/exceptional institutional claims
- approval for PR/publication
- merge to production website
- activation of real social API or automated distribution
- material change to locked 01+05 design baseline

## Acceptance criteria for next implementation increment
- structured intake can represent all accepted input classes
- classification includes all 12 classes above
- UNVERIFIED/CONFLICT are programmatically blocked
- evidence provenance is retained through draft/channel variants
- no production/social endpoint is introduced
- audit trail can reconstruct source → draft → approval → published revision

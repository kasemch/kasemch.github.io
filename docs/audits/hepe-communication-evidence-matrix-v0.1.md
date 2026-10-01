# HEPE Communication Studio — Evidence & Acceptance Matrix v0.1

Status: NON-PRODUCTION

| Requirement | Implementation | Test / Evidence | Acceptance |
|---|---|---|---|
| Canonical website | channel contract + UI | Website marked Canonical | PASS |
| Social fail-closed | content contract + UI | Facebook/Instagram/LINE MOCK ONLY | PASS |
| Source provenance | evidence-contract.yml | source_reference required | PASS |
| Structured intake | sourceType control | source classes selectable | PASS |
| FACT classification | evidenceStatus + content model | FACT route eligible only with non-empty source | PASS |
| UNVERIFIED block | UI gate + content model | BLOCKED state required | PASS |
| CONFLICT block | UI gate + content model | BLOCKED state required | PASS |
| Evidence traceability | synthetic-traceability.yml | source→evidence→draft→channel IDs | PASS |
| Approval automation cap | studio.js | max state APPROVED_FOR_PREVIEW | PASS |
| Production publishing | disabled UI + contract | direct production=false | PASS |
| Real social publishing | contract | real social=false | PASS |
| Physical-device QA | not executed | no device evidence | NOT TESTED |
| Production merge | Human Authority | PR #130 remains unmerged | HUMAN GATE |

PASS here means the stated prototype implementation/evidence exists; it does not authorize production publication.

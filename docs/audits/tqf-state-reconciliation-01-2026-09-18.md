# TQF-STATE-RECONCILIATION-01

Date: 2026-09-18

Status: PASS — PARALLEL LIFECYCLE MODEL ESTABLISHED

Environment: NON-PRODUCTION / Supabase Sandbox

## Objective

Resolve the apparent state mismatch between the working TQF3 record and the immutable finalized/public R1 release without rewriting history or mutating R1.

The issue was:

- working TQF3 record lifecycle = `DRAFT`
- finalized release record = `FINAL`
- public publication registry = `PUBLIC_PUBLISHED`

These values represent different lifecycle dimensions and must not be collapsed into one mutable state.

## Design decision

The system now treats the following as separate governed dimensions:

1. Working document lifecycle
2. Frozen/finalized release lifecycle
3. Public publication lifecycle

A read-only effective reconciliation state is derived from all three dimensions.

No historical record is rewritten.

No frozen release is mutated.

No publication record is mutated.

## Sandbox migration

Migration:

`tqf_state_reconciliation_01_parallel_lifecycle_projection`

The migration adds:

`public.hepe_tqf3_state_reconciliation_by_code(programme_code, course_code, academic_year, term_code)`

Characteristics:

- read-only / STABLE
- SECURITY DEFINER
- locked search path: `pg_catalog, public, private`
- authority-aware
- anon execution revoked
- authenticated/service_role execution only
- no write operation

## HED2503 reconciliation result

Programme:

`25510071103503`

Course:

`HED2503`

Academic period:

`2569 / Term 1`

Course offering:

`82806bab-ff9a-4041-b2b1-15fed7195981`

### Working state

TQF3 record:

`26e00a55-f545-49cc-aec6-959ac07809eb`

Lifecycle:

`DRAFT`

Current version:

`1`

### Frozen release state

Final record:

`8d65fdfb-6811-4f63-82b4-a120177768a1`

Record status:

`FINAL`

Bundle SHA-256:

`799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256`

Immutable snapshot:

`true`

### Public publication state

Publication:

`f559d3ca-d33f-4220-94fd-13fa53bf7085`

Release code:

`HEPE-HED2503-TQF3-2569-1-R1`

Publication status:

`PUBLIC_PUBLISHED`

Publication scope:

`HEPE_PROJECT_CONTROLLED_PUBLIC_RELEASE`

Institutional official claim:

`false`

Publication SHA-256:

`799818a46e8e0f931a156526f5e592088680c044ba8c62c04add3d5b40912256`

### Publication audit

Audit:

`e824d32d-13d7-4ae8-9aac-bcc5b36f4324`

Audit status:

`PASS_WITH_LIMITATION`

Lineage status:

`CLOSED_R1_BASELINE`

SHA match:

`true`

Registry match:

`true`

Manifest match:

`true`

Public-safe scope check:

`true`

## Derived effective state

The reconciliation function returns:

`PUBLIC_PUBLISHED_WITH_ACTIVE_WORKING_DRAFT`

State relation:

`PARALLEL_LIFECYCLES_EXPECTED`

Interpretation:

The current working record remains editable/draft while the historical frozen R1 release remains final and publicly published.

This is not considered a contradiction after reconciliation.

## Governance invariants verified

After migration:

- working lifecycle remains `DRAFT`
- final record remains `FINAL`
- publication remains `PUBLIC_PUBLISHED`
- final SHA remains unchanged
- publication SHA remains unchanged
- R1 was not mutated
- publication was not mutated
- no history was rewritten

## Security verification

Function execution:

- anon = false
- authenticated = true
- service_role = true

Search path:

`pg_catalog, public, private`

Supabase security advisor did not identify the new reconciliation function as an anonymous SECURITY DEFINER exposure.

Existing unrelated security-advisor findings remain outside the scope of this phase and were not modified.

## Consumer rule

UI/read models must not infer release/publication status from `tqf3_records.lifecycle_status` alone.

For TQF3 status presentation, use the reconciliation projection so the user can see:

- Working State
- Frozen Release State
- Publication State
- Effective State

Recommended user-facing state for HED2503:

`เผยแพร่ R1 แล้ว / มีฉบับร่างที่กำลังทำงานอยู่`

Do not rewrite the working row to `FINAL` merely to match the publication state.

## Legacy note

Existing finalization/release read models may describe finalization without the later public-publication layer.

They are not modified in this phase.

The reconciliation function is the authoritative state-composition surface for the working/final/public state relationship.

## Final assessment

TQF-STATE-RECONCILIATION-01:

**PASS**

The prior apparent mismatch is now represented as an intentional parallel lifecycle:

`DRAFT working record + immutable FINAL release + PUBLIC_PUBLISHED publication`

→

`PUBLIC_PUBLISHED_WITH_ACTIVE_WORKING_DRAFT`

No R1 mutation and no historical rewrite occurred.

## Recommended next phase

`TQF-STATUS-SURFACE-01`

Purpose:

Integrate the reconciled effective state into the Command Center / document status UI so users do not see a misleading single `DRAFT` label when a frozen published release also exists.

This next phase should remain read-only first and preserve all current governance boundaries.

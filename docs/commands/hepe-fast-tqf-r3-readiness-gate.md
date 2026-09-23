# HEPE Fast TQF Portal — R3 Readiness Gate

Status: READY_FOR_FUTURE_HUMAN_GATE  
Date: 2026-09-24  
Current governed release head: `HEPE-HED2503-TQF3-2569-1-R2`

## Locked baseline

- Course: HED2503 เพศวิถีศึกษา
- Academic year / term: 2569/1
- TQF3 version bound to R2: Version 13
- R2 scope: HEPE_PROJECT_CONTROLLED_PUBLIC_RELEASE
- Institutional official claim: false
- R1 and R2 public package artifacts are immutable.
- Future substantive revision must create R3 or later with predecessor lineage to R2.

## What does NOT authorize R3

The following do not, by themselves, authorize a new release:

- a generic chat message such as "Approve";
- routine technical maintenance;
- discovery/rendering changes that do not change the governed academic content;
- CI, build or presentation improvements;
- an internal implementation change with no new governed academic release content.

## Minimum evidence required before opening an R3 release path

1. A substantive governed change exists after R2.
2. The change is represented in a controlled TQF3 revision or other explicitly governed source.
3. Academic review status and authority are sufficient for the requested action.
4. A new final/export checksum is available when the governed content changes.
5. Human publication authority explicitly approves a new public release scope.
6. The new release code is R3 or later and predecessor lineage points to R2.
7. Institutional-official status remains false unless separately evidenced and explicitly governed.

## R3 release invariants

- Never edit the R1 or R2 frozen public packages in place.
- Never reuse the R2 release code for changed content.
- Never copy internal actor IDs, session IDs, reviewer metadata or restricted audit payloads into the public package.
- Never infer institutional-official status.
- Never bypass the governed publication command or authority checks.
- Registry and post-publication audit must reconcile release code, URL, SHA, manifest and lineage.

## Trigger for future continuation

Resume the R3 path only after a clearly identified substantive change or explicit new-release decision is present.

Until then, R2 remains the current governed lineage head.

# Post-Release Improvement Wave 01 — Review & Implementation Record

Date: 2026-09-14

## Scope
This wave follows the Option 17A release acceptance and addresses minor post-release information-architecture and evidence-coverage improvements without changing the locked Option 17A visual direction.

## Implemented

### 1. Primary navigation refinement
- Removed `Command Center` from primary navigation to reduce menu density.
- The page itself is not deleted; this change affects primary navigation only.
- CV remains accessible from Home/About rather than occupying an additional primary-navigation slot.

### 2. Static AI / local academic index
- Added `Research Status` as a direct intent destination.
- Added a BMO public project-detail destination.
- Added keywords for ongoing research, pipeline, milestones, movement opportunity, time poverty and 24-hour movement behaviour.

### 3. Evidence Explorer coverage
Added three additional public journal evidence records using authoritative/traceable public journal sources:
- smoking cessation motivation study (2024)
- stroke prevention behaviour study (2024)
- health promotion behaviours among hospital staff (2020)

No private Drive or controlled research-governance record was promoted as public evidence.

### 4. Academic Knowledge Map
Added public nodes for:
- Research Status
- Professional Development

Added explanatory relationships linking research status to Research/Evidence and professional development to Teaching/Evidence.

## Academic Service decision
A dedicated Academic Service & Community page was considered but deferred.

Reason:
The current public About page contains only high-level service/community context. There is not yet a sufficiently complete, source-verified public service-activity register to justify a dedicated hub without either creating a thin page or inferring details beyond the verified public evidence.

Decision:
- Keep Academic Service routed to `/about/` for now.
- Reconsider a dedicated hub when public-safe service activities, dates, roles and sources are verified.

## Public-safety result
PASS.

## Architecture result
- Static Jekyll/GitHub Pages only.
- Vanilla client-side index remains local and public-only.
- No backend, external AI API or client secret added.

## Release gates
Before merge:
- Jekyll build must pass.
- Primary routes and assets must remain valid.
- No evidence or public-safety regression.
- PR must be mergeable.

# HEPE Fast TQF Portal — Programme Catalog Expansion 4/4

Date: 2026-09-24  
Environment: NON-PRODUCTION  
Status: PROGRAMME IDENTITY 4/4 VERIFIED · COURSE MEMBERSHIP 1/4 ACTIVE

## Controlled programme identity source

Google Drive source:
- File: `Curricula_4_Import`
- File ID: `1ZS7fukhgHEThtTdX0VBVO67F6kOYT-72uQxWJuHQQP8`
- Sheet: `Untitled`
- Range read: `A1:G5`

Programme identities observed:
1. CUR-001 — หลักสูตรศึกษาศาสตรมหาบัณฑิต สาขาวิชาพลศึกษาและกีฬา
2. CUR-002 — หลักสูตรศึกษาศาสตรบัณฑิต สาขาวิชาพลศึกษา
3. CUR-003 — หลักสูตรศึกษาศาสตรบัณฑิต สาขาวิชาสุขศึกษาและพลศึกษา
4. CUR-004 — หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาวิทยาศาสตร์การกีฬาประยุกต์

## Existing runtime

The current `public.hepe_fast_tqf_programme_catalog()` reads:
- `public.programmes`
- current `public.curriculum_versions`
- course counts from `public.curriculum_courses`

At audit time, the active runtime contained one non-synthetic programme:
- หลักสูตรศึกษาศาสตรบัณฑิต สาขาวิชาสุขศึกษาและพลศึกษา (4 ปี)
- programme code: `25510071103503`
- current curriculum: `2567-SOURCEB-VALIDATION`

## Controlled staging action completed

Table created:
`public.hepe_programme_import_staging`

Properties:
- additive / reversible;
- RLS enabled;
- no client policy by design (fail-closed staging);
- no direct activation into `public.programmes` or `public.curriculum_versions`;
- no invented programme codes or curriculum-version codes.

Staging status:
- CUR-001: STAGING / PENDING_CONTROLLED_IMPORT
- CUR-002: STAGING / PENDING_CONTROLLED_IMPORT
- CUR-003: ACTIVATED / ACTIVE_EXISTING_RUNTIME
- CUR-004: STAGING / PENDING_CONTROLLED_IMPORT

## Evidence discovery for course membership

The Drive search found supporting material for the M.Ed. Physical Education and Sport programme, including documents that state they were derived from the programme TQF2 and a legacy TQF system document indicating a 25-course list.

However, supporting/derived documents are not being promoted as the canonical course-membership source in this gate.

No sufficiently identified curriculum-book/TQF2 source for direct controlled import was located for:
- B.Ed. Physical Education
- B.Sc. Applied Sport Science

Therefore no course membership was fabricated or activated.

## Security note

Supabase security advisor reports RLS-enabled/no-policy for the staging table as INFO. This is intentional for this controlled staging registry; it is not exposed to normal client access.

## Gate result

- Programme identities: PASS 4/4
- Runtime programme activation: 1/4
- Course membership activation: 1/4
- Assignment readiness: 1/4
- Remaining gate: CONTROLLED COURSE-MEMBERSHIP SOURCE FOR CUR-001, CUR-002, CUR-004

## Next authorized action

When controlled curriculum/course-list sources are available:
1. extract programme code and curriculum-version identifiers;
2. import programme + current curriculum version;
3. import course membership;
4. validate descriptions/provenance;
5. activate assignment readiness;
6. expose programme through existing `hepe_fast_tqf_programme_catalog()`;
7. test User & Course Assignment access.

Do not activate a programme from programme identity alone.

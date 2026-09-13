# Research Proceedings & Credentials Audit — 2026-09-13

## Scope

This audit reconciles the public academic website against research/professional-development evidence found in the connected Google Drive archive.

## Conference Proceedings

The 2023 CV and the academic Drive archive contain the complete conference proceedings volume for **มิติใหม่ในการดูแลสุขภาพ: สูงวัยอย่างมีสุขภาวะ / A New Dimension in Health Care: Healthy Aging**, dated 25 August 2023.

A complete numbered set of **11 separate article PDFs (1–11)** naming Kasem Chooratna as co-author was located in the same academic archive. These are registered in `_data/conference_proceedings.yml` and displayed separately from journal publications.

The conference-proceedings total must not be added to the journal-publication count.

## Selected Professional Credentials

The Drive archive contains many CITI Program completion certificates. Public display is limited to credentials most directly relevant to the academic/research profile:

- Human Subjects Research — Social & Behavioral & Humanities Researchers
- Human Subjects Research — Biomedical Researchers
- Biomedical Responsible Conduct of Research
- Responsible Conduct of Research for Administrators
- Conflicts of Interest for Residents, Research Nurses, Students

Completion and expiry dates are stored in `_data/professional_credentials.yml`. Public pages calculate Active/Expired status from the expiry date at build time.

## Excluded from Public Credential Cards

The website intentionally does not display every training certificate in the archive. Examples such as IACUC-specific modules, laboratory-animal pain/distress modules, marketing/fundraising modules, or other certificates with weak relevance to the public academic profile are retained in the private archive only.

A GCP training record found in the 2023 CV expired in October 2025 and is therefore not presented as an active credential.

## Privacy Boundary

The public website does **not** expose:

- Google Drive file IDs or private Drive URLs;
- CITI Record IDs;
- certificate verification tokens;
- private contact details from source certificates;
- full certificate PDFs.

## Public Output Model

The website now reports research outputs by type:

- Verified journal publications — derived from `_publications`;
- Verified conference proceedings — derived from `_data/conference_proceedings.yml`;
- Degree research works — displayed separately on `/research/`;
- Research reports, proposals, manuscripts, and working documents — excluded from publication totals unless independently verified for public disclosure.

## Gate

Evidence reconciliation: PASS

Public-disclosure boundary: PASS

Private Drive identifiers exposed: NONE

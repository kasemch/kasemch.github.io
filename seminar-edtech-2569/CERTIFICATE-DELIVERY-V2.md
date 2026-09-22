# Certificate Delivery v2 — HTML + PDF

## Decision
User-facing certificate delivery is now HTML-first with PDF export.

## Rationale
Direct SVG opening is unreliable on iPhone/Safari. SVG remains an internal rendering format only.

## User flow
Certificate link
→ HTML certificate viewer
→ QR verification
→ Open / Save PDF (A4 landscape)

## Files
- certificate.html
- certificate.css
- certificate.js
- verify-certificate.html
- verify-certificate.js

## Backend
- seminar-certificate-data returns only approved certificate data when certificate number + verification token match.

## iPhone behavior
- certificate opens as a normal web page
- PDF is generated client-side from the approved HTML visual
- PDF opens in a new Safari view so the user can Share → Save to Files

## TEST-PILOT boundary
TEST watermark, signer configuration, verification token, and production lock remain unchanged.

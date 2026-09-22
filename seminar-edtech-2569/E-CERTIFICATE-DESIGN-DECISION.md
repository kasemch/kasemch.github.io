# E-Certificate Design Decision — TEST-PILOT

## Status
APPROVED BASELINE

## Approved design
The dynamic E-Certificate renderer version 3 is the approved visual baseline for the TEST-PILOT phase.

## Locked visual rules
- Landscape A4 certificate layout.
- Primary palette: navy, deep crimson, gold, white.
- Academic double-border framing.
- Large centered recipient name with automatic font-size reduction for long names.
- Project title centered and automatically scaled to fit.
- Certificate number shown at lower left.
- QR Verification block at lower right.
- Signer block centered at bottom.
- Mandatory visible watermark/badge: `TEST / รุ่นทดสอบ`.
- Confirmed TEST-PILOT signer: `ผู้ช่วยศาสตราจารย์ ดร.เกษม ชูรัตน์`.

## Dynamic fields
The renderer must continue to source these from controlled data:
- recipient name
- certificate number
- project title
- event date
- verification token / QR
- signer name
- signer title
- test-mode watermark

## Change control
Any visual or content change after this baseline should be treated as a revision and reviewed before pilot use.

## Production boundary
Approval of this design does not authorize production use. Privacy, retention, admin binding, certificate issuance governance and real-device acceptance remain separate release gates.

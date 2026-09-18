# VERIFICATION-EVIDENCE-INTAKE-01

Date: 2026-09-18

Status: ACTIVE CONTROLLED CHECKLIST

Environment: NON-PRODUCTION

## Purpose

Define the minimum real-world evidence package required before any course verification record may be considered for transition to VERIFIED.

This checklist applies to both:

- TQF5 → Verification
- TQF6 → Verification

It is intentionally fail-closed.

---

## A. Mandatory identity and authority evidence

Required:

- course code
- academic year
- term
- exact course offering
- committee/reviewer authority
- appointment order or equivalent governed authority source
- verification/review date
- reviewer identity

Admission rule:

If committee/reviewer authority cannot be independently established, VERIFIED is blocked.

---

## B. Mandatory execution evidence

### For TQF5 courses

Required:

- final student-result dataset or controlled result snapshot
- grade distribution
- CLO attainment source data
- assessment instruments
- marking scheme/rubrics
- sampled student artifacts or answer scripts
- sampling list/method
- rescoring/review evidence
- comparison/reconciliation result
- signed/controlled verification conclusion

### For TQF6 fieldwork courses

Required:

- executed placement list
- actual participating student count
- supervisor/mentor assignments
- executed hours or placement completion evidence
- mentor/supervisor evaluation records
- student fieldwork outputs/portfolio evidence
- grade/result source
- fieldwork CLO attainment source
- sampling/review evidence
- signed/controlled verification conclusion

---

## C. Contemporaneity rule

Evidence should be generated during or immediately after the actual assessment/verification event.

Retrospective summaries may support context but cannot alone establish execution.

A file created substantially later than the claimed event requires stronger corroboration.

Future-dated claims are never admissible as executed evidence.

---

## D. Signature/decision rule

A typed name or blank signature line is not sufficient.

Acceptable evidence may include:

- executed digital signature
- signed scanned decision
- controlled system approval with authenticated actor and timestamp
- official meeting minutes with decision and authority linkage
- equivalent controlled institutional record

---

## E. Sampling rule

The following must be identifiable:

- population size
- sample size
- sampling method
- sample list or traceable identifiers
- high/mid/low performance coverage when applicable
- reviewer/re-scorer
- result of comparison
- discrepancy handling

Conflicting sample narratives must not be reconciled by inference.

---

## F. Decision states

### DRAFT

Evidence intake has started but is incomplete.

### INSUFFICIENT_EVIDENCE

A review was attempted but mandatory evidence remains missing or contradictory.

### VERIFIED

Allowed only when all mandatory authority, execution, sampling, and decision evidence is present and governed.

---

## G. TQF7 admission

Only:

`Verification = VERIFIED`

plus verified/controlled source conditions may enter VERIFIED_ONLY aggregation.

DRAFT and INSUFFICIENT_EVIDENCE are excluded.

No exception by manual narrative is allowed.

---

## H. Current pilot status

### HED2503 AY2569/T1

Verification:

`INSUFFICIENT_EVIDENCE`

Primary gaps:

- current executed committee authority package
- contemporaneous minutes
- attendance
- sampled scripts/artifacts
- sampling list
- independent rescoring
- reviewer comparison
- executed signed decision

### HED3701 AY2569/T2

Verification:

`DRAFT`

Primary gaps:

- actual fieldwork execution
- placement completion
- supervisor evidence
- executed hours
- result/grade evidence
- fieldwork artifacts
- verification decision

---

## I. Admission workflow

1. Locate source.
2. Confirm date and course identity.
3. Confirm source owner/authority.
4. Classify source:
   - AUTHORITATIVE
   - CONTROLLED
   - SUPPORTING
   - RETROSPECTIVE
   - FUTURE
   - UNVERIFIED
5. Bind source to exact verification record.
6. Check mandatory evidence matrix.
7. Resolve contradictions.
8. Conduct governed human review.
9. Transition to VERIFIED only if all gates pass.
10. Re-run VERIFIED_ONLY programme aggregation.

---

## J. Prohibited shortcuts

Do not:

- infer signatures;
- invent committee membership;
- convert a retrospective summary into primary evidence;
- reconcile conflicting sample sizes by assumption;
- accept future-dated results;
- use synthetic student results;
- mark VERIFIED merely to test TQF7;
- alter immutable R1.

---

## Current conclusion

The checklist is ready.

The next positive verification transition is evidence-driven, not architecture-driven.

Until a real qualifying evidence package is located:

`VERIFIED COUNT = 0`

is the correct state.

# Phase 3C — Metadata/Search Test Matrix

## Static / Repository Gates
- [ ] Jekyll strict build passes.
- [ ] No private PDF metadata is committed to the public repository.
- [ ] No Supabase service-role key or database password is committed.
- [ ] Existing HEPE/SAOS/CHSP Supabase projects are not referenced as the metadata target.

## Controlled Handoff Gates
- [ ] NON-PRODUCTION status preserved.
- [ ] Evidence status preserved without promotion.
- [ ] `official_institutional_certification` remains false when source says false.
- [ ] Open reconciliation items remain open until higher-authority evidence closes them.
- [ ] SHA-256 captured before metadata admission.

## Search/RLS Gates (after dedicated project exists)
- [ ] RLS enabled before first insert.
- [ ] No anonymous read of private metadata.
- [ ] Authenticated owner can insert/select/update/delete own metadata only.
- [ ] Search vector contains title/code/category/status/scope fields.
- [ ] Drive file ID is a reference only; binary is not duplicated into Supabase by default.

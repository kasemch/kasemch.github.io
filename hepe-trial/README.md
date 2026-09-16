# HEPE Governed Trial Launcher — B03.17A.3 to B03.20

Completed in Supabase Sandbox:
- deployed `hepe_create_tqf3_working_draft(uuid,jsonb,text)`;
- deployed `hepe_release_readiness(uuid)`;
- RPC requires a real authenticated actor and scoped authority;
- it permits only non-authoritative working-source statuses;
- it hard-checks HED2503 canonical credit pattern `3(3-0-6)`;
- duplicate current-version creation is blocked;
- no duplicate generic provenance master table was created because the existing evidence/provenance architecture is reusable.

Template authority review:
- HEPE-TQF3-GENERIC = UNDER_REVIEW;
- current version 2 = UNDER_REVIEW;
- approved_at = null;
- Drive search did not identify an authoritative approved blank TQF3 template.
Therefore B03.15 template approval remains legitimately blocked.

The client-side Supabase publishable key is already configured in `./config/supabase.js`.

Next human gate:
1. open `https://kasemch.github.io/hepe-trial/`;
2. sign in with Magic Link;
3. create Governed TQF3 Draft;
4. create Authenticated Preview.

Production remains unchanged.

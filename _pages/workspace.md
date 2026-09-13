---
permalink: /workspace/
title: "Academic Command Center"
author_profile: false
classes: wide
---

<div class="academic-workspace">
  <section class="aw-hero aw-shell" aria-labelledby="aw-title">
    <div class="aw-kicker">Academic Command Center</div>
    <h1 id="aw-title">A focused workspace for academic tasks</h1>
    <p>This static GitHub Pages workspace now connects to Google Calendar and Google Drive through user-confirmed browser OAuth. It stores no client secret, refresh token, private HEPE record, or privileged Supabase credential in the public site.</p>
    <div class="aw-status" aria-label="Workspace status">
      <span class="aw-pill">Google Calendar OAuth ready</span>
      <span class="aw-pill">Controlled Drive upload ready</span>
      <span class="aw-pill">No secrets embedded</span>
      <span class="aw-pill">No automatic authority changes</span>
    </div>
  </section>

  <main class="aw-shell">
    <div class="aw-grid">
      <section class="aw-card aw-card-wide" aria-labelledby="aw-quick-title">
        <h2 id="aw-quick-title">Quick Add</h2>
        <p class="aw-muted">Calendar writes and Drive uploads occur only after an explicit user action and Google authorization. HEPE evidence admission and authority changes remain separate governed processes.</p>
        <div class="aw-quick-grid">
          <div class="aw-quick">
            <strong>Upload Document</strong>
            <span>Validate, classify, review the destination, and authorize a controlled upload to Google Drive.</span>
            <div class="aw-actions"><a class="aw-btn aw-btn-secondary" href="{{ '/upload-center/' | relative_url }}">Open Upload Center</a></div>
          </div>
          <div class="aw-quick">
            <strong>Add Calendar Event</strong>
            <span>Create an event directly through Google OAuth or use the review-before-save Google Calendar fallback.</span>
            <div class="aw-actions"><a class="aw-btn aw-btn-secondary" href="{{ '/add-event/' | relative_url }}">Add Calendar Event</a></div>
          </div>
          <div class="aw-quick">
            <strong>Add Academic Note</strong>
            <span>Draft a short note locally in the browser and copy it when ready. It is not automatically transmitted.</span>
            <div class="aw-actions"><button class="aw-btn aw-btn-secondary" type="button" data-aw-open="note">Write Note</button></div>
          </div>
        </div>

        <section class="aw-panel" data-aw-panel="note" hidden aria-labelledby="aw-note-title">
          <h3 id="aw-note-title">Academic note</h3>
          <div class="aw-field"><label for="aw-note">Note</label><textarea id="aw-note" placeholder="Write a concise academic note, task or idea here."></textarea></div>
          <div class="aw-actions"><button id="aw-copy-note" class="aw-btn" type="button">Copy note</button><button class="aw-btn aw-btn-secondary" type="button" data-aw-close>Close</button></div>
          <div id="aw-note-status" class="aw-result" aria-live="polite">This note is not automatically saved or transmitted.</div>
        </section>
      </section>

      <section class="aw-card" aria-labelledby="aw-runtime-title">
        <h2 id="aw-runtime-title">Runtime Status</h2>
        <div class="aw-links">
          <a class="aw-link" href="{{ '/add-event/' | relative_url }}">Google Calendar<span>OAuth direct-write enabled; human action required.</span></a>
          <a class="aw-link" href="{{ '/upload-center/' | relative_url }}">Google Drive<span>Controlled upload enabled; review and consent required.</span></a>
          <a class="aw-link" href="{{ '/academic-calendar/' | relative_url }}">Public Calendar<span>Only explicitly public academic events may be rendered.</span></a>
        </div>
      </section>

      <section class="aw-card" aria-labelledby="aw-governance-title">
        <h2 id="aw-governance-title">Governance Boundary</h2>
        <p class="aw-muted">Storage does not create institutional truth. HEPE metadata remains governed independently from the public website.</p>
        <div class="aw-safety"><span aria-hidden="true">✓</span><div><strong>Human authority preserved</strong><p>No upload can automatically create a canonical course, teaching assignment, IAM authority, reconciliation decision, or admitted audit evidence.</p></div></div>
      </section>

      <section class="aw-card" aria-labelledby="aw-today-title">
        <h2 id="aw-today-title">Academic Links</h2>
        <p class="aw-muted">The workspace does not expose private meetings, internal evidence, or personal document lists in public HTML.</p>
        <div class="aw-links">
          <a class="aw-link" href="{{ '/teaching/' | relative_url }}">Teaching<span>Open teaching and learning profile.</span></a>
          <a class="aw-link" href="{{ '/research/' | relative_url }}">Research<span>Open research profile and selected work.</span></a>
          <a class="aw-link" href="{{ '/publications/' | relative_url }}">Publications<span>Open verified public publication records.</span></a>
        </div>
      </section>

      <section class="aw-card" aria-labelledby="aw-security-title">
        <h2 id="aw-security-title">Security</h2>
        <p class="aw-muted">The browser OAuth Client ID is a public identifier. No client secret, refresh token, service-account key, or Supabase service-role key is stored in the repository.</p>
        <div class="aw-safety"><span aria-hidden="true">✓</span><div><strong>Fail-safe interaction model</strong><p>Calendar and Drive actions require explicit authorization. If OAuth or an API action fails, the site does not report a false success.</p></div></div>
      </section>
    </div>
  </main>
</div>

<script src="{{ '/assets/js/workspace.js' | relative_url }}" defer></script>

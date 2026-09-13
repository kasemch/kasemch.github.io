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
    <p>This static workspace provides safe browser-side tools for preparing document classification, creating a Google Calendar draft, and composing notes. It contains no private database content and no write-capable credentials.</p>
    <div class="aw-status" aria-label="Workspace status">
      <span class="aw-pill">Static / client-side</span>
      <span class="aw-pill">No secrets embedded</span>
      <span class="aw-pill">No automatic authority changes</span>
    </div>
  </section>

  <main class="aw-shell">
    <div class="aw-grid">
      <section class="aw-card aw-card-wide" aria-labelledby="aw-quick-title">
        <h2 id="aw-quick-title">Quick Add</h2>
        <p class="aw-muted">Use these tools to prepare the next action. Nothing is written to HEPE, Google Drive, or Google Calendar without a separate user-confirmed step.</p>
        <div class="aw-quick-grid">
          <div class="aw-quick">
            <strong>Upload Document</strong>
            <span>Preview filename-based classification locally before any storage integration.</span>
            <div class="aw-actions"><button class="aw-btn aw-btn-secondary" type="button" data-aw-open="upload">Classify a file</button></div>
          </div>
          <div class="aw-quick">
            <strong>Add Calendar Event</strong>
            <span>Create a pre-filled Google Calendar event draft and confirm it there.</span>
            <div class="aw-actions"><button class="aw-btn aw-btn-secondary" type="button" data-aw-open="event">Prepare event</button></div>
          </div>
          <div class="aw-quick">
            <strong>Add Academic Note</strong>
            <span>Draft a short note in the browser and copy it when ready.</span>
            <div class="aw-actions"><button class="aw-btn aw-btn-secondary" type="button" data-aw-open="note">Write note</button></div>
          </div>
        </div>

        <section class="aw-panel" data-aw-panel="upload" hidden aria-labelledby="aw-upload-title">
          <h3 id="aw-upload-title">Local document classification preview</h3>
          <div class="aw-field"><label for="aw-file">Choose a file</label><input id="aw-file" type="file" aria-describedby="aw-file-help"><small id="aw-file-help">The browser reads only the file name, type and size for this preview. No upload occurs.</small></div>
          <div id="aw-file-result" class="aw-result" aria-live="polite">No file selected.</div>
          <div class="aw-actions"><button class="aw-btn aw-btn-secondary" type="button" data-aw-close>Close</button></div>
        </section>

        <section class="aw-panel" data-aw-panel="event" hidden aria-labelledby="aw-event-title">
          <h3 id="aw-event-title">Prepare Google Calendar event</h3>
          <form id="aw-event-form">
            <div class="aw-field"><label for="aw-event-name">Event title</label><input id="aw-event-name" name="title" type="text" required></div>
            <div class="aw-field"><label for="aw-event-start">Start</label><input id="aw-event-start" name="start" type="datetime-local" required></div>
            <div class="aw-field"><label for="aw-event-end">End</label><input id="aw-event-end" name="end" type="datetime-local" required></div>
            <div class="aw-field"><label for="aw-event-details">Details</label><textarea id="aw-event-details" name="details" placeholder="Optional notes"></textarea></div>
            <div class="aw-actions"><button class="aw-btn" type="submit">Open Google Calendar draft</button><button class="aw-btn aw-btn-secondary" type="button" data-aw-close>Close</button></div>
          </form>
        </section>

        <section class="aw-panel" data-aw-panel="note" hidden aria-labelledby="aw-note-title">
          <h3 id="aw-note-title">Academic note</h3>
          <div class="aw-field"><label for="aw-note">Note</label><textarea id="aw-note" placeholder="Write a concise academic note, task or idea here."></textarea></div>
          <div class="aw-actions"><button id="aw-copy-note" class="aw-btn" type="button">Copy note</button><button class="aw-btn aw-btn-secondary" type="button" data-aw-close>Close</button></div>
          <div id="aw-note-status" class="aw-result" aria-live="polite">This note is not automatically saved or transmitted.</div>
        </section>
      </section>

      <section class="aw-card" aria-labelledby="aw-today-title">
        <h2 id="aw-today-title">Today</h2>
        <p class="aw-muted">The public site intentionally does not render private meetings, internal evidence, or personal document lists.</p>
        <div class="aw-links">
          <a class="aw-link" href="../academic-calendar/">Academic Calendar<span>View selected public academic schedule.</span></a>
          <a class="aw-link" href="../teaching/">Teaching<span>Open teaching and learning profile.</span></a>
          <a class="aw-link" href="../research/">Research<span>Open research profile and selected work.</span></a>
        </div>
      </section>

      <section class="aw-card" aria-labelledby="aw-docs-title">
        <h2 id="aw-docs-title">Document Flow</h2>
        <p class="aw-muted">The current production-safe boundary is prepare → review → authorized storage. HEPE evidence admission and canonical data mutation remain separate governed processes.</p>
        <div class="aw-safety"><span aria-hidden="true">✓</span><div><strong>Fail-closed by design</strong><p>No file selected here is automatically uploaded, admitted as evidence, or used to create teaching assignments.</p></div></div>
      </section>

      <section class="aw-card aw-card-wide" aria-labelledby="aw-next-title">
        <h2 id="aw-next-title">Integration roadmap</h2>
        <p class="aw-muted">This UI shell is ready for later authenticated adapters: Google Calendar OAuth, Google Drive upload/retrieval, and HEPE metadata reconciliation. Those integrations remain outside the public static HTML until their authorization gates are explicitly satisfied.</p>
      </section>
    </div>
  </main>
</div>

<script src="../assets/js/workspace.js" defer></script>

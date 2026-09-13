---
permalink: /upload-center/
title: "Upload Center"
author_profile: false
---

<div class="upload-center" data-upload-center>
  <div class="upload-center__notice">
    <strong>Phase 3B — Storage boundary ready.</strong> Files are classified locally first. Google Drive upload remains disabled unless an approved Web OAuth Client ID is configured and the destination folder is accessible to that OAuth app.
  </div>

  <label class="upload-center__dropzone">
    <span class="upload-center__dropzone-title">Choose a document</span>
    <span>PDF, Word, PowerPoint, spreadsheet, image, or text file</span>
    <input type="file" data-upload-file>
  </label>

  <section class="upload-center__preview" data-upload-preview hidden aria-live="polite">
    <h2>Classification preview</h2>
    <dl class="upload-center__metadata">
      <div><dt>File</dt><dd data-meta-name></dd></div>
      <div><dt>Type</dt><dd data-meta-type></dd></div>
      <div><dt>Size</dt><dd data-meta-size></dd></div>
      <div><dt>Suggested category</dt><dd data-meta-category></dd></div>
      <div><dt>Detected code</dt><dd data-meta-code>—</dd></div>
      <div><dt>Confidence</dt><dd data-meta-confidence></dd></div>
    </dl>

    <p class="upload-center__reason" data-meta-reason></p>

    {% if site.data.document_storage.upload_enabled and site.data.document_storage.client_id != '' %}
    <button type="button" class="upload-center__store" data-store-document disabled>Store in Google Drive</button>
    <p class="upload-center__storage-status" data-storage-status role="status" aria-live="polite">Google Drive storage is available after classification and OAuth approval.</p>
    {% else %}
    <button type="button" class="upload-center__disabled" disabled>Store document — OAuth activation pending</button>
    <p class="upload-center__storage-status">Drive folder structure is provisioned, but runtime upload remains fail-closed.</p>
    {% endif %}
  </section>
</div>

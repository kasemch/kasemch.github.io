---
permalink: /upload-center/
title: "Upload Center"
author_profile: false
---

<div class="upload-center" data-upload-center>
  <div class="upload-center__notice">
    <strong>Controlled upload.</strong> Files are validated and classified locally first. Google Drive upload remains fail-closed unless an approved Web OAuth Client ID is configured and the user explicitly authorizes the upload.
  </div>

  <label class="upload-center__dropzone">
    <span class="upload-center__dropzone-title">Choose an academic document</span>
    <span>PDF, DOCX, XLSX, PPTX, TXT, or CSV · maximum 25 MB</span>
    <input type="file" data-upload-file accept=".pdf,.docx,.xlsx,.pptx,.txt,.csv,application/pdf,text/plain,text/csv,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.presentationml.presentation">
  </label>

  <section class="upload-center__preview" data-upload-preview hidden aria-live="polite">
    <h2>Classification & metadata review</h2>
    <dl class="upload-center__metadata">
      <div><dt>File</dt><dd data-meta-name>—</dd></div>
      <div><dt>Document type</dt><dd data-meta-document-type data-meta-type>—</dd></div>
      <div><dt>Size</dt><dd data-meta-size>—</dd></div>
      <div><dt>Suggested category</dt><dd data-meta-category>—</dd></div>
      <div><dt>Suggested folder</dt><dd data-meta-folder>—</dd></div>
      <div><dt>Detected course</dt><dd data-meta-course>—</dd></div>
      <div><dt>Detected project</dt><dd data-meta-project>—</dd></div>
      <div><dt>Academic year</dt><dd data-meta-academic-year>—</dd></div>
      <div><dt>Confidence</dt><dd data-meta-confidence>—</dd></div>
      <div><dt>Classification source</dt><dd data-meta-source>—</dd></div>
      <div><dt>Review status</dt><dd data-meta-review>—</dd></div>
    </dl>

    <p class="upload-center__reason" data-meta-reason></p>

    <label>
      <span>Human review — final category</span>
      <select data-review-category>
        <option>Teaching</option>
        <option>Research</option>
        <option>Publications</option>
        <option>Curriculum & Quality</option>
        <option>Academic Service</option>
        <option>Projects</option>
        <option>Other</option>
      </select>
    </label>

    {% if site.data.document_storage.upload_enabled and site.data.document_storage.client_id != '' %}
    <label class="upload-center__confirm">
      <input type="checkbox" data-upload-confirm>
      <span>I reviewed the category and destination and authorize this file to be uploaded to Google Drive.</span>
    </label>
    <button type="button" class="upload-center__store" data-store-document disabled>Store in Google Drive</button>
    <p class="upload-center__storage-status" data-storage-status role="status" aria-live="polite">Google Drive storage is available only after human review and OAuth approval.</p>
    {% else %}
    <button type="button" class="upload-center__disabled" disabled>Store document — OAuth activation pending</button>
    <p class="upload-center__storage-status" role="status">Drive folder structure is verified, but runtime upload remains fail-closed because no approved OAuth Web Client ID is configured.</p>
    {% endif %}

    <p><small>Uploading a document does not create institutional truth, course authority, teaching assignments, IAM authority, or admitted audit evidence. HEPE-related metadata remains a candidate until separately reviewed.</small></p>
  </section>
</div>

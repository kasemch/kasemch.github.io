---
permalink: /upload-center/
title: "Upload Center"
author_profile: false
---

<div class="upload-center" data-upload-center>
  <div class="upload-center__notice">
    <strong>Phase 3A — Local classification only.</strong> Files selected here stay in your browser. Nothing is uploaded or stored until a storage provider is explicitly configured in a later gate.
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
    <button type="button" class="upload-center__disabled" disabled>Store document — storage not configured</button>
  </section>
</div>

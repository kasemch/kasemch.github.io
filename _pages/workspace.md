---
permalink: /workspace/
title: "Academic Command Center"
author_profile: false
classes: wide
---

{% assign teaching = site.data.teaching_ay2569 %}
{% assign publication_count = site.publications | size %}
{% assign proceeding_count_2023 = site.data.conference_proceedings.items | size %}
{% assign proceeding_count_2026 = site.data.conference_proceedings_2026.items | size %}
{% assign proceeding_count = proceeding_count_2023 | plus: proceeding_count_2026 %}

<div class="academic-workspace aw-executive">
  <div class="aw-app-shell">
    <aside class="aw-sidebar" aria-label="Academic Command Center navigation">
      <div class="aw-brand"><span>KC</span><strong>Academic<br>Command Center</strong></div>
      <nav>
        <a class="is-active" href="{{ '/workspace/' | relative_url }}">Overview</a>
        <a href="{{ '/research-progress/' | relative_url }}">Research</a>
        <a href="{{ '/publications/' | relative_url }}">Publications</a>
        <a href="{{ '/teaching/' | relative_url }}">Teaching</a>
        <a href="{{ '/curriculum-quality/' | relative_url }}">Curriculum &amp; QA</a>
        <a href="{{ '/evidence-explorer/' | relative_url }}">Evidence</a>
        <a href="{{ '/innovation-projects/' | relative_url }}">Innovation</a>
      </nav>
      <div class="aw-side-note">Knowledge<br>Movement<br>Wellbeing<br>Society</div>
    </aside>

    <main class="aw-main">
      <header class="aw-dashboard-head">
        <div><div class="aw-kicker">Academic Command Center</div><h1>Research · Teaching · Impact</h1><p>Evidence-aware overview of public academic work and controlled academic tools.</p></div>
        <div class="aw-head-actions"><a href="{{ '/' | relative_url }}">Public Profile</a><a href="{{ '/cv/' | relative_url }}">Academic CV</a></div>
      </header>

      <section class="aw-metrics" aria-label="Academic metrics">
        <article><span>Journal Publications</span><strong>{{ publication_count }}</strong><small>Verified public collection</small></article>
        <article><span>Conference Proceedings</span><strong>{{ proceeding_count }}</strong><small>Reported separately</small></article>
        <article><span>AY2569 Retained</span><strong>{{ teaching.summary.retained }}</strong><small>Pending final confirmation</small></article>
        <article><span>Quality Evidence</span><strong>{{ teaching.summary.direct_quality_evidence_courses }}</strong><small>Courses with direct evidence located</small></article>
      </section>

      <section class="aw-dashboard-grid">
        <article class="aw-dash-card aw-dash-card-wide">
          <div class="aw-card-head"><div><span class="aw-eyebrow">Scholarly Output</span><h2>Verified output mix</h2></div><a href="{{ '/publications/' | relative_url }}">View details →</a></div>
          <div class="aw-output-visual" aria-label="Verified output type chart">
            <div class="aw-output-bar"><span class="journal" style="flex-grow:{{ publication_count }}"></span><span class="proceeding" style="flex-grow:{{ proceeding_count }}"></span><span class="degree" style="flex-grow:2"></span></div>
            <div class="aw-output-legend"><span><i class="journal"></i>Journal {{ publication_count }}</span><span><i class="proceeding"></i>Proceedings {{ proceeding_count }}</span><span><i class="degree"></i>Degree research 2</span></div>
          </div>
        </article>

        <article class="aw-dash-card">
          <div class="aw-card-head"><div><span class="aw-eyebrow">Research</span><h2>Research status</h2></div><a href="{{ '/research-progress/' | relative_url }}">Open →</a></div>
          <p class="aw-muted">Public research status is fail-closed: only stages supported by controlled records are shown.</p>
          <div class="aw-status-block"><strong>Evidence-first</strong><span>No participant data, private protocols or inferred completion percentages are exposed.</span></div>
        </article>

        <article class="aw-dash-card">
          <div class="aw-card-head"><div><span class="aw-eyebrow">Teaching</span><h2>AY2569 reconciliation</h2></div><a href="{{ '/teaching/' | relative_url }}">Open →</a></div>
          <div class="aw-teaching-ring" aria-label="Teaching offering reconciliation"><div><strong>{{ teaching.summary.retained }}</strong><span>retained</span></div><div><strong>{{ teaching.summary.officially_cancelled }}</strong><span>cancelled</span></div></div>
          <p class="aw-muted">{{ teaching.summary.initially_scheduled }} initially scheduled course codes; Semester 2 remains fail-closed until authoritative assignment evidence is available.</p>
        </article>

        <article class="aw-dash-card aw-dash-card-wide">
          <div class="aw-card-head"><div><span class="aw-eyebrow">Academic Workflow</span><h2>From evidence to impact</h2></div></div>
          <div class="aw-workflow" aria-label="Academic workflow diagram"><div><b>Teach</b><span>Learning design</span></div><em>→</em><div><b>Research</b><span>Evidence &amp; inquiry</span></div><em>→</em><div><b>Evaluate</b><span>Quality &amp; outcomes</span></div><em>→</em><div><b>Improve</b><span>Curriculum &amp; practice</span></div><em>→</em><div><b>Impact</b><span>Healthier society</span></div></div>
        </article>

        <article class="aw-dash-card aw-dash-card-wide" aria-labelledby="aw-quick-title">
          <div class="aw-card-head"><div><span class="aw-eyebrow">Controlled Tools</span><h2 id="aw-quick-title">Quick academic actions</h2></div><span class="aw-security-label">Human confirmation required</span></div>
          <div class="aw-quick-grid">
            <div class="aw-quick"><strong>Upload Document</strong><span>Validate and authorize a controlled Google Drive upload.</span><div class="aw-actions"><a class="aw-btn aw-btn-secondary" href="{{ '/upload-center/' | relative_url }}">Upload Center</a></div></div>
            <div class="aw-quick"><strong>Add Calendar Event</strong><span>Create through browser OAuth with explicit user authorization.</span><div class="aw-actions"><a class="aw-btn aw-btn-secondary" href="{{ '/add-event/' | relative_url }}">Add Event</a></div></div>
            <div class="aw-quick"><strong>Academic Note</strong><span>Draft locally in the browser; nothing is transmitted automatically.</span><div class="aw-actions"><button class="aw-btn aw-btn-secondary" type="button" data-aw-open="note">Write Note</button></div></div>
          </div>
          <section class="aw-panel" data-aw-panel="note" hidden aria-labelledby="aw-note-title"><h3 id="aw-note-title">Academic note</h3><div class="aw-field"><label for="aw-note">Note</label><textarea id="aw-note" placeholder="Write a concise academic note, task or idea here."></textarea></div><div class="aw-actions"><button id="aw-copy-note" class="aw-btn" type="button">Copy note</button><button class="aw-btn aw-btn-secondary" type="button" data-aw-close>Close</button></div><div id="aw-note-status" class="aw-result" aria-live="polite">This note is not automatically saved or transmitted.</div></section>
        </article>

        <article class="aw-dash-card">
          <div class="aw-card-head"><div><span class="aw-eyebrow">Security</span><h2>Governance boundary</h2></div></div>
          <div class="aw-safety"><span aria-hidden="true">✓</span><div><strong>Human authority preserved</strong><p>No upload or browser action can automatically create institutional truth, course authority or admitted evidence.</p></div></div>
        </article>

        <article class="aw-dash-card">
          <div class="aw-card-head"><div><span class="aw-eyebrow">Runtime</span><h2>Connected tools</h2></div></div>
          <div class="aw-links"><a class="aw-link" href="{{ '/add-event/' | relative_url }}">Google Calendar<span>OAuth direct-write; explicit action required.</span></a><a class="aw-link" href="{{ '/upload-center/' | relative_url }}">Google Drive<span>Controlled upload; review required.</span></a><a class="aw-link" href="{{ '/academic-calendar/' | relative_url }}">Public Calendar<span>Public-safe events only.</span></a></div>
        </article>
      </section>
    </main>
  </div>
</div>

<script src="{{ '/assets/js/workspace.js' | relative_url }}" defer></script>

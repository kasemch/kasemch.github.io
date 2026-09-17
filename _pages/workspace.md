---
permalink: /workspace/
title: "Academic Dashboard"
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
    <aside class="aw-sidebar" aria-label="Academic Dashboard navigation">
      <div class="aw-brand"><span>KC</span><strong>Academic<br>Dashboard</strong></div>
      <nav>
        <a class="is-active" href="{{ '/workspace/' | relative_url }}">Overview</a>
        <a href="{{ '/current-work/' | relative_url }}">Current Work</a>
        <a href="{{ '/research-progress/' | relative_url }}">Research</a>
        <a href="{{ '/publications/' | relative_url }}">Publications</a>
        <a href="{{ '/analytics/' | relative_url }}">Analytics</a>
        <a href="{{ '/teaching/' | relative_url }}">Teaching</a>
        <a href="{{ '/curriculum-quality/' | relative_url }}">Curriculum &amp; QA</a>
        <a href="{{ '/evidence-explorer/' | relative_url }}">Evidence</a>
        <a href="{{ '/innovation-projects/' | relative_url }}">Innovation</a>
      </nav>
      <div class="aw-side-note">Knowledge<br>Movement<br>Wellbeing<br>Society</div>
    </aside>

    <main class="aw-main">
      <header class="aw-dashboard-head">
        <div><div class="aw-kicker">AWOS Public Hub</div><h1>Academic work · evidence · impact</h1><p>Read-only overview of publicly released academic work. Operational tools and write actions are handled only in the authenticated AWOS Internal Workspace.</p></div>
        <div class="aw-head-actions"><a href="{{ '/' | relative_url }}">Public Profile</a><a href="{{ '/cv/' | relative_url }}">Academic CV</a></div>
      </header>

      <section class="aw-metrics" aria-label="Academic metrics">
        <article><span>Journal Publications</span><strong>{{ publication_count }}</strong><small>Verified public collection</small></article>
        <article><span>Conference Proceedings</span><strong>{{ proceeding_count }}</strong><small>Reported separately</small></article>
        <article><span>AY2569 Retained</span><strong>{{ teaching.summary.retained }}</strong><small>Public teaching record</small></article>
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
          <p class="aw-muted">{{ teaching.summary.initially_scheduled }} initially scheduled course codes; unverified assignments remain excluded from public claims.</p>
        </article>

        <article class="aw-dash-card aw-dash-card-wide">
          <div class="aw-card-head"><div><span class="aw-eyebrow">Academic Workflow</span><h2>From evidence to impact</h2></div></div>
          <div class="aw-workflow" aria-label="Academic workflow diagram"><div><b>Teach</b><span>Learning design</span></div><em>→</em><div><b>Research</b><span>Evidence &amp; inquiry</span></div><em>→</em><div><b>Evaluate</b><span>Quality &amp; outcomes</span></div><em>→</em><div><b>Improve</b><span>Curriculum &amp; practice</span></div><em>→</em><div><b>Impact</b><span>Healthier society</span></div></div>
        </article>

        <article class="aw-dash-card aw-dash-card-wide">
          <div class="aw-card-head"><div><span class="aw-eyebrow">Public Discovery</span><h2>Explore verified academic work</h2></div></div>
          <div class="aw-quick-grid">
            <div class="aw-quick"><strong>Current Work</strong><span>Open the public-safe cross-domain view of work currently in progress.</span><div class="aw-actions"><a class="aw-btn aw-btn-secondary" href="{{ '/current-work/' | relative_url }}">View Current Work</a></div></div>
            <div class="aw-quick"><strong>Academic Analytics</strong><span>Inspect descriptive patterns in verified public teaching, research and publication data.</span><div class="aw-actions"><a class="aw-btn aw-btn-secondary" href="{{ '/analytics/' | relative_url }}">Open Analytics</a></div></div>
            <div class="aw-quick"><strong>Evidence Explorer</strong><span>Trace public claims to approved evidence records.</span><div class="aw-actions"><a class="aw-btn aw-btn-secondary" href="{{ '/evidence-explorer/' | relative_url }}">Explore Evidence</a></div></div>
            <div class="aw-quick"><strong>Knowledge Map</strong><span>Browse relationships across teaching, research, quality and innovation.</span><div class="aw-actions"><a class="aw-btn aw-btn-secondary" href="{{ '/knowledge-map/' | relative_url }}">Open Map</a></div></div>
            <div class="aw-quick"><strong>Public Calendar</strong><span>View public-safe academic events without write access.</span><div class="aw-actions"><a class="aw-btn aw-btn-secondary" href="{{ '/academic-calendar/' | relative_url }}">View Calendar</a></div></div>
          </div>
        </article>

        <article class="aw-dash-card">
          <div class="aw-card-head"><div><span class="aw-eyebrow">Governance</span><h2>Publication boundary</h2></div></div>
          <div class="aw-safety"><span aria-hidden="true">✓</span><div><strong>Public read / internal write</strong><p>This site publishes approved public content only. Uploads, calendar changes, evidence admission and operational decisions occur outside the public layer.</p></div></div>
        </article>

        <article class="aw-dash-card">
          <div class="aw-card-head"><div><span class="aw-eyebrow">Traceability</span><h2>Evidence-aware publication</h2></div></div>
          <div class="aw-links"><a class="aw-link" href="{{ '/evidence-explorer/' | relative_url }}">Evidence Explorer<span>Public evidence only.</span></a><a class="aw-link" href="{{ '/research-progress/' | relative_url }}">Research Status<span>Verified stage reporting.</span></a><a class="aw-link" href="{{ '/curriculum-quality/' | relative_url }}">Curriculum &amp; Quality<span>Public-safe academic governance outputs.</span></a></div>
        </article>
      </section>
    </main>
  </div>
</div>

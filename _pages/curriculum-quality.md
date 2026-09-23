---
permalink: /curriculum-quality/
title: "Curriculum & Quality"
description: "Curriculum and quality work of Asst. Prof. Dr. Kasem Chooratna, including learning outcomes, curriculum mapping, assessment, programme evaluation, AUN-QA, and evidence-informed improvement."
author_profile: false
---

{% assign hepe_releases = site.data.hepe_public_releases.releases %}
{% assign hepe_current = hepe_releases | where: "current_release", true | first %}

<link rel="stylesheet" href="{{ '/assets/css/curriculum-quality-hub.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/progress-visual-system.css' | relative_url }}">
<div class="curriculum-quality-hub cqp-studio">
  <section class="cq-hero cqp-hero" aria-labelledby="cqp-title">
    <div class="cq-shell cqp-hero-grid">
      <div class="cqp-hero-copy">
        <div class="cq-kicker">Curriculum &amp; Quality Portfolio</div>
        <h1 id="cqp-title">Aligning intent,<br><span>evidence and improvement.</span></h1>
        <p class="cq-lead">A public-facing explanatory portfolio of curriculum design, learning outcomes, teaching, assessment, academic quality and evidence-informed improvement. Restricted governance and implementation records remain outside the public site.</p>
        <nav class="cq-nav" aria-label="Curriculum and quality related pages">
          <a href="#cqp-architecture-title">Quality Architecture</a>
          <a href="#flow-title">Improvement Cycle</a>
          <a href="{{ '/teaching/' | relative_url }}">Teaching</a>
          <a href="{{ '/hepe-public-releases/' | relative_url }}">Public Releases</a>
        </nav>
      </div>
      <div class="cqp-hero-visual" aria-hidden="true">
        <div class="cqp-ring cqp-ring-a"></div>
        <div class="cqp-ring cqp-ring-b"></div>
        <div class="cqp-core"><strong>Quality</strong><span>Evidence-informed</span></div>
        <div class="cqp-node cqp-node-a">PLO</div>
        <div class="cqp-node cqp-node-b">CLO</div>
        <div class="cqp-node cqp-node-c">Assessment</div>
        <div class="cqp-node cqp-node-d">Evidence</div>
      </div>
    </div>
  </section>

  <section class="cq-shell cqp-pillar-strip" aria-label="Curriculum and quality portfolio structure">
    <a href="#cqp-architecture-title"><span>01</span><strong>Programme Intent</strong><small>Purpose, outcomes and alignment</small></a>
    <a href="#flow-title"><span>02</span><strong>Learning &amp; Assessment</strong><small>Teaching, tasks and evidence</small></a>
    <a href="#domains-title"><span>03</span><strong>Quality Domains</strong><small>Curriculum, assessment, QA, evidence</small></a>
    <a href="#contribution-title"><span>04</span><strong>Improvement</strong><small>Review, interpretation and refinement</small></a>
  </section>

  <section class="cq-section cqp-architecture-section" aria-labelledby="cqp-architecture-title">
    <div class="cq-shell">
      <div class="cq-eyebrow">Public Explanatory Architecture</div>
      <h2 id="cqp-architecture-title">Programme Intent → PLO → Courses → CLO → Teaching → Assessment → Evidence → Improvement</h2>
      <p class="cq-lead">This chain explains how curriculum and academic-quality components connect conceptually. It does not assert that every programme document, approval step or implementation record is publicly available.</p>
      <div class="cqp-quality-chain" aria-label="Curriculum and quality architecture">
        <div><b>01</b><strong>Programme Intent</strong><small>Purpose and educational direction</small></div><i aria-hidden="true">→</i>
        <div><b>02</b><strong>PLO</strong><small>Programme learning outcomes</small></div><i aria-hidden="true">→</i>
        <div><b>03</b><strong>Courses</strong><small>Curriculum structure and mapping</small></div><i aria-hidden="true">→</i>
        <div><b>04</b><strong>CLO</strong><small>Course learning outcomes</small></div><i aria-hidden="true">→</i>
        <div><b>05</b><strong>Teaching</strong><small>Learning activities and delivery</small></div><i aria-hidden="true">→</i>
        <div><b>06</b><strong>Assessment</strong><small>Tasks, rubrics and measurement</small></div><i aria-hidden="true">→</i>
        <div><b>07</b><strong>Evidence</strong><small>Interpretation and traceability</small></div><i aria-hidden="true">→</i>
        <div><b>08</b><strong>Improvement</strong><small>Review, refine and feed forward</small></div>
      </div>
      <div class="cq-policy"><strong>Authority boundary.</strong> This is a public explanatory model. Programme approval status, restricted committee evidence, internal SAR material and confidential implementation records are not inferred from this diagram.</div>
    </div>
  </section>

  {% if hepe_current %}
  <section class="cq-section" aria-labelledby="release-title">
    <div class="cq-shell">
      <div class="cq-eyebrow">Registered Public Release</div>
      <h2 id="release-title">{{ hepe_current.release_code }}</h2>
      <p class="cq-lead">A project-controlled public release for {{ hepe_current.course_code }} — {{ hepe_current.course_title_th }} has completed the governed release workflow and is registered with frozen lineage and SHA-256 integrity metadata. This is a HEPE project-controlled release and is not represented as an official institutional document.</p>
      <div class="cq-grid">
        <article class="cq-card" data-cq-domain="curriculum evidence qa"><div class="cq-eyebrow">Release State</div><h3>PUBLIC RELEASE REGISTERED</h3><p>{{ hepe_current.release_code | split: '-' | last }} is the current governed lineage head. This release must not be mutated in place; any later revision must be issued as a new release with predecessor lineage.</p></article>
        <article class="cq-card" data-cq-domain="evidence qa"><div class="cq-eyebrow">Integrity</div><h3>SHA-256 Bound</h3><p>The public release registry and lineage reference the frozen bundle hash <code>{{ hepe_current.bundle_sha256 }}</code>.</p></article>
        <article class="cq-card" data-cq-domain="qa curriculum"><div class="cq-eyebrow">Authority Boundary</div><h3>HEPE Project-Controlled</h3><p>The public record explicitly distinguishes project-controlled status from any future institutional-official status.</p></article>
      </div>
      <p><a href="{{ hepe_current.discovery_path | relative_url }}">Open HEPE Public Release Discovery →</a></p>
    </div>
  </section>
  {% endif %}

  <section class="cq-section" aria-labelledby="flow-title">
    <div class="cq-shell">
      <div class="cq-eyebrow">Continuous Improvement Cycle</div>
      <h2 id="flow-title">From programme intent to evidence-informed improvement</h2>
      <p class="cq-lead">This is a public explanatory model of how curriculum and academic quality activities connect. It is intentionally cyclical: improvement feeds back into programme intent and the next design cycle.</p>
      <div class="cq-cycle" aria-label="Curriculum and academic quality improvement cycle" tabindex="0">
        <div class="cq-cycle-center"><strong>Evidence-Informed<br>Improvement</strong><span>Review → refine → repeat</span></div>
        <div class="cq-cycle-node cq-cycle-1"><span>01</span><strong>Program</strong><small>Purpose &amp; intent</small></div>
        <div class="cq-cycle-node cq-cycle-2"><span>02</span><strong>PLO / CLO</strong><small>Outcome alignment</small></div>
        <div class="cq-cycle-node cq-cycle-3"><span>03</span><strong>Learning</strong><small>Teaching &amp; activities</small></div>
        <div class="cq-cycle-node cq-cycle-4"><span>04</span><strong>Assessment</strong><small>Measure learning</small></div>
        <div class="cq-cycle-node cq-cycle-5"><span>05</span><strong>Evidence</strong><small>Interpret results</small></div>
        <div class="cq-cycle-node cq-cycle-6"><span>06</span><strong>Improvement</strong><small>Act &amp; feed forward</small></div>
      </div>
      <div class="cq-cycle-mobile" aria-label="Curriculum and academic quality improvement cycle, mobile view" tabindex="0">
        <div><span>01</span><strong>Program</strong><small>Purpose &amp; intent</small></div>
        <i>↓</i><div><span>02</span><strong>PLO / CLO</strong><small>Outcome alignment</small></div>
        <i>↓</i><div><span>03</span><strong>Learning</strong><small>Teaching &amp; activities</small></div>
        <i>↓</i><div><span>04</span><strong>Assessment</strong><small>Measure learning</small></div>
        <i>↓</i><div><span>05</span><strong>Evidence</strong><small>Interpret results</small></div>
        <i>↓</i><div><span>06</span><strong>Improvement</strong><small>Act &amp; feed forward</small></div>
        <i>↺</i><div class="cq-cycle-return"><strong>Return to Program</strong><small>Begin the next improvement cycle</small></div>
      </div>
    </div>
  </section>

  <section class="cq-section" aria-labelledby="contribution-title">
    <div class="cq-shell">
      <div class="cq-eyebrow">Verified Programme-Level Contribution</div>
      <h2 id="contribution-title">Public-safe contribution scope</h2>
      <p class="cq-lead">Verified portfolio evidence supports programme-level contribution across curriculum and academic quality work. This section describes contribution domains only; it does not assert an administrative title, disclose restricted records, or reproduce internal programme evidence.</p>
      <div class="cq-grid">
        <article class="cq-card" data-cq-domain="curriculum"><div class="cq-eyebrow">Design &amp; Review</div><h3>Curriculum Development</h3><p>Contributing to curriculum design and review, including programme and course structures, intended learning outcomes, curriculum mapping and alignment across the programme.</p></article>
        <article class="cq-card" data-cq-domain="curriculum assessment"><div class="cq-eyebrow">Alignment</div><h3>PLO / CLO Coherence</h3><p>Connecting programme learning outcomes with course learning outcomes, learning activities, assessment approaches and evidence used for academic review.</p></article>
        <article class="cq-card" data-cq-domain="assessment evidence"><div class="cq-eyebrow">Evaluation</div><h3>Assessment &amp; Programme Evaluation</h3><p>Using course- and programme-level assessment evidence to support evaluation, interpretation and improvement decisions.</p></article>
        <article class="cq-card" data-cq-domain="qa evidence"><div class="cq-eyebrow">Quality</div><h3>Evidence-Informed Quality Development</h3><p>Supporting programme-level quality development, evidence management and continuous improvement through higher-education quality frameworks, including AUN-QA where appropriate.</p></article>
      </div>
      <div class="cq-policy"><strong>Portfolio boundary.</strong> Public content is limited to verified contribution domains. Committee records, internal SAR evidence, student data, restricted implementation details and unverified leadership titles remain outside the public website.</div>
    </div>
  </section>

  <section class="cq-section" aria-labelledby="domains-title">
    <div class="cq-shell">
      <div class="cq-eyebrow">Academic Quality Domains</div>
      <h2 id="domains-title">Explore the public-facing areas</h2>
      <div class="cq-tabs" aria-label="Filter curriculum and quality domains">
        <button type="button" data-cq-filter="all" aria-pressed="true">All</button>
        <button type="button" data-cq-filter="curriculum" aria-pressed="false">Curriculum</button>
        <button type="button" data-cq-filter="assessment" aria-pressed="false">Assessment</button>
        <button type="button" data-cq-filter="qa" aria-pressed="false">Quality Assurance</button>
        <button type="button" data-cq-filter="evidence" aria-pressed="false">Evidence</button>
      </div>
      <div class="cq-grid">
        <article class="cq-card" data-cq-domain="curriculum evidence"><div class="cq-eyebrow">Curriculum</div><h3>Curriculum Design</h3><p>Programme learning outcomes, course learning outcomes, curriculum mapping, constructive alignment, curriculum review and revision.</p></article>
        <article class="cq-card" data-cq-domain="curriculum assessment"><div class="cq-eyebrow">Alignment</div><h3>PLO / CLO / Course Connection</h3><p>Connecting programme intentions to course-level learning outcomes, learning activities and assessment evidence in a coherent structure.</p></article>
        <article class="cq-card" data-cq-domain="assessment evidence"><div class="cq-eyebrow">Assessment</div><h3>Assessment &amp; Evaluation</h3><p>Assessment design, rubric development, course-level and programme-level evaluation, and interpretation of learning evidence for improvement.</p></article>
        <article class="cq-card" data-cq-domain="qa evidence"><div class="cq-eyebrow">Quality Assurance</div><h3>Quality &amp; Continuous Improvement</h3><p>Programme-level quality development, internal review, evidence management and application of higher-education quality frameworks, including AUN-QA where appropriate.</p></article>
        <article class="cq-card" data-cq-domain="evidence qa"><div class="cq-eyebrow">Traceability</div><h3>Evidence &amp; Accountability</h3><p>Connecting decisions, learning outcomes, assessment evidence, review findings and improvement actions while preserving academic accountability.</p></article>
        <article class="cq-card" data-cq-domain="qa curriculum"><div class="cq-eyebrow">Governance</div><h3>Academic Governance Boundary</h3><p>This public hub presents principles and public-safe examples only. Restricted committee records, confidential programme evidence and internal implementation details are not published here.</p></article>
      </div>
      <div class="cq-policy"><strong>Public evidence rule.</strong> Public-facing materials are added only after review for accuracy, permissions and confidentiality. Absence from this page does not imply absence of internal academic work or evidence.</div>
    </div>
  </section>
</div>
<script src="{{ '/assets/js/curriculum-quality-hub.js' | relative_url }}" defer></script>

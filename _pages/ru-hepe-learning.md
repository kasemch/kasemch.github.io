---
permalink: /ru-hepe-learning/
title: "RU HEPE Learning"
description: "Public course ecosystem for RU HEPE Learning: a GitHub-based teaching-and-learning workspace for Health Education and Physical Education activities, course resources, assignments, assessment structures, and student portfolios."
author_profile: false
---

{% assign ru_hepe = site.data.ru_hepe_learning %}

<link rel="stylesheet" href="{{ '/assets/css/signature-pages.css' | relative_url }}">
<div class="signature-page">
  <section class="sp-hero sp-shell">
    <div class="sp-kicker">Teaching Innovation · Course Ecosystem</div>
    <h1>{{ ru_hepe.name }}</h1>
    <p>A public GitHub-based teaching-and-learning workspace for selected Health Education and Physical Education activities, course resources, assignment structures, assessment workflows and student portfolios.</p>
    <div class="sp-navchips">
      <a class="sp-chip" href="{{ '/teaching/' | relative_url }}">Teaching</a>
      <a class="sp-chip" href="{{ '/innovation-projects/' | relative_url }}">Innovation &amp; Projects</a>
      <a class="sp-chip" href="{{ ru_hepe.organization_url }}" rel="noopener">GitHub Organization</a>
    </div>
  </section>

  <section class="sp-section sp-shell" aria-labelledby="ecosystem-overview-title">
    <div class="sp-section-head">
      <div class="sp-eyebrow">Ecosystem Overview</div>
      <h2 id="ecosystem-overview-title">A lightweight GitHub-based learning environment</h2>
      <p class="sp-intro">The ecosystem uses public repositories, reusable templates and GitHub workflows to organize selected learning resources while keeping private student work, sensitive information and restricted academic records outside public repositories.</p>
    </div>
    <div class="sp-metrics" aria-label="RU HEPE Learning summary">
      <article class="sp-metric"><strong>{{ ru_hepe.public_repository_count }}</strong><span>Verified public repositories</span></article>
      <article class="sp-metric"><strong>1</strong><span>Pilot course workspace</span></article>
      <article class="sp-metric"><strong>2</strong><span>Reusable learning templates</span></article>
      <article class="sp-metric"><strong>GitHub</strong><span>Public learning infrastructure</span></article>
    </div>
  </section>

  <section class="sp-section sp-shell" aria-labelledby="architecture-title">
    <div class="sp-section-head">
      <div class="sp-eyebrow">Architecture</div>
      <h2 id="architecture-title">How the public repositories connect</h2>
      <p class="sp-intro">The current public architecture is documented in the Course Hub repository and is represented here without adding private implementation details.</p>
    </div>
    <article class="sp-card sp-wide">
      <div class="sp-output-year">PUBLIC ARCHITECTURE</div>
      <h3>{{ ru_hepe.architecture }}</h3>
      <p>The Course Hub acts as the ecosystem entry point. HED3505 is the pilot course workspace, while the assignment and student-portfolio repositories provide reusable structures for course-level learning workflows.</p>
    </article>
  </section>

  <section class="sp-section sp-shell" aria-labelledby="repositories-title">
    <div class="sp-section-head">
      <div class="sp-eyebrow">Public Repositories</div>
      <h2 id="repositories-title">Current course ecosystem</h2>
      <p class="sp-intro">Only repositories verified as public are shown. Repository roles and descriptions are based on their current public README documentation.</p>
    </div>
    <div class="sp-grid">
      {% for repo in ru_hepe.repositories %}
      <article class="sp-card">
        <div class="sp-output-year">{{ repo.role }}</div>
        <h3>{{ repo.label }}</h3>
        <p>{{ repo.purpose }}</p>
        <a class="sp-link" href="{{ repo.url }}" rel="noopener">View {{ repo.name }} on GitHub →</a>
      </article>
      {% endfor %}
    </div>
  </section>

  <section class="sp-section sp-shell" aria-labelledby="learning-model-title">
    <div class="sp-section-head">
      <div class="sp-eyebrow">Learning Model</div>
      <h2 id="learning-model-title">What the ecosystem is designed to support</h2>
    </div>
    <div class="sp-grid">
      <article class="sp-card"><h3>Course organization</h3><p>Public course hubs can provide clear entry points to selected learning materials, activities, instructions and reusable learning structures.</p></article>
      <article class="sp-card"><h3>Assignment workflows</h3><p>Reusable assignment structures can connect briefs, submission areas, rubrics, supporting evidence and automated structural checks.</p></article>
      <article class="sp-card"><h3>Portfolio-oriented learning</h3><p>Public templates can support structured student portfolios while student-identifiable or sensitive work remains outside public repositories unless publication is explicitly appropriate.</p></article>
      <article class="sp-card"><h3>Human academic judgment</h3><p>Automation may support workflow quality and validation, but final assessment, interpretation and academic decisions remain human responsibilities.</p></article>
    </div>
  </section>

  <section class="sp-section sp-shell">
    <article class="sp-card sp-wide">
      <div class="sp-eyebrow">Governance &amp; Public Boundary</div>
      <h2>Public-safe by design</h2>
      <div class="sp-policy"><strong>Institutional-status note.</strong> {{ ru_hepe.disclaimer }}</div>
      <div class="sp-policy"><strong>Privacy boundary.</strong> Public repositories must not contain private student work, grades, health information, confidential school data, restricted curriculum-governance records, credentials or other sensitive information.</div>
      <div class="sp-policy"><strong>Evidence boundary.</strong> Formal CLO/PLO mappings, scoring weights, reported learning outcomes and institutional claims are published only when supported by verified course, curriculum or institutional evidence.</div>
    </article>
  </section>

  <section class="sp-section sp-shell">
    <article class="sp-callout">
      <div class="sp-eyebrow">Current Stage</div>
      <h2>Foundation connected · controlled expansion next</h2>
      <p>The foundation repositories are connected. Future public expansion can add additional verified course repositories, weekly learning packages, reusable rubrics and portfolio workflows without changing the institutional or privacy boundary.</p>
      <p><a class="sp-link" href="{{ ru_hepe.organization_url }}" rel="noopener">Explore {{ ru_hepe.name }} on GitHub →</a></p>
    </article>
  </section>
</div>

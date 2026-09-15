---
permalink: /innovation-projects/
title: "Innovation & Projects"
description: "Public-facing academic innovation by Asst. Prof. Dr. Kasem Chooratna across Health & Physical Education, curriculum, quality, AI, digital systems, and community-oriented academic service."
author_profile: false
---

{% assign ru_hepe = site.data.ru_hepe_learning %}

<link rel="stylesheet" href="{{ '/assets/css/signature-pages.css' | relative_url }}">
<div class="signature-page">
  <section class="sp-hero sp-shell">
    <div class="sp-kicker">Innovation · Systems · Public Impact</div>
    <h1>Innovation &amp; Projects</h1>
    <p>Selected public-facing academic innovation connecting health and physical education, curriculum and quality, digital technology, artificial intelligence and community-oriented academic service.</p>
    <div class="sp-navchips"><a class="sp-chip" href="{{ '/current-work/' | relative_url }}">Current Work</a><a class="sp-chip" href="{{ '/research/' | relative_url }}">Research</a><a class="sp-chip" href="{{ '/curriculum-quality/' | relative_url }}">Curriculum &amp; Quality</a><a class="sp-chip" href="{{ '/about/' | relative_url }}">About</a></div>
  </section>

  <section class="sp-section sp-shell">
    <div class="sp-grid">
      <article class="sp-card"><div class="sp-eyebrow">Digital</div><h3>AI &amp; Digital Innovation</h3><p>Responsible AI-supported academic workflows, digital curriculum governance, evidence management, teaching support, assessment support and quality-assurance systems designed to reduce duplicated work while maintaining traceability and academic oversight.</p></article>
      <article class="sp-card"><div class="sp-eyebrow">Systems</div><h3>Educational Systems &amp; Prototypes</h3><p>Selected prototype work explores how digital systems can support programme management, curriculum alignment, evidence tracking, academic review and decision-making. Public descriptions focus on educational purpose, design principles and lessons learned.</p></article>
      <article class="sp-card"><div class="sp-eyebrow">Community</div><h3>Health &amp; Community Service Innovation</h3><p>Project interests include health screening, physical fitness, wellbeing, health promotion, participant-facing health information and community service models that connect university expertise with practical public benefit.</p></article>
      <article class="sp-card"><div class="sp-eyebrow">Scholarship</div><h3>Public Scholarship</h3><p>Academic communication, educational resources and selected work connecting health, physical education, history, culture and public understanding.</p></article>
    </div>
  </section>

  <section class="sp-section sp-shell" aria-labelledby="hed3505-title">
    <article class="sp-card sp-wide">
      <div class="sp-eyebrow">Teaching Innovation · Verified Pilot</div>
      <h2 id="hed3505-title">HED3505 Learning Workspace</h2>
      <p>HED3505 is the verified pilot course workspace within {{ ru_hepe.name }}. Its public learning architecture connects a central Course Hub with a course repository and reusable assignment and student-portfolio structures, supporting a more traceable and reusable approach to digital teaching resources.</p>
      <div class="sp-policy"><strong>Public boundary.</strong> This section describes the public teaching-and-learning architecture only. It does not expose student records, credentials, restricted implementation details or other non-public system information.</div>
      <p class="sp-all-publications"><a class="sp-link" href="{{ ru_hepe.profile_path | relative_url }}">View the verified teaching-and-learning ecosystem →</a></p>
    </article>
  </section>

  <section class="sp-section sp-shell" aria-labelledby="ru-hepe-learning-title">
    <div class="sp-section-head">
      <div class="sp-eyebrow">Teaching Innovation · Course Ecosystem</div>
      <h2 id="ru-hepe-learning-title">{{ ru_hepe.name }}</h2>
      <p class="sp-intro">A public GitHub-based teaching-and-learning workspace supporting course hubs, reusable assignment and portfolio structures, and selected course repositories for Health Education and Physical Education activities.</p>
    </div>
    <div class="sp-metrics" aria-label="RU HEPE Learning public repository summary">
      <article class="sp-metric"><strong>{{ ru_hepe.public_repository_count }}</strong><span>Public repositories verified</span></article>
      <article class="sp-metric"><strong>1</strong><span>Pilot course workspace</span></article>
      <article class="sp-metric"><strong>2</strong><span>Reusable templates</span></article>
      <article class="sp-metric"><strong>Public</strong><span>Selected learning infrastructure</span></article>
    </div>
    <div class="sp-grid">
      {% for repo in ru_hepe.repositories %}
      <article class="sp-card sp-third">
        <div class="sp-output-year">{{ repo.role }}</div>
        <h3>{{ repo.label }}</h3>
        <p>{{ repo.purpose }}</p>
        <a class="sp-link" href="{{ repo.url }}" rel="noopener">View {{ repo.name }} on GitHub →</a>
      </article>
      {% endfor %}
    </div>
    <p class="sp-all-publications"><a class="sp-link" href="{{ ru_hepe.profile_path | relative_url }}">Explore the RU HEPE Learning course ecosystem →</a></p>
    <p class="sp-all-publications"><a class="sp-link" href="{{ ru_hepe.organization_url }}" rel="noopener">Open {{ ru_hepe.name }} on GitHub →</a></p>
    <div class="sp-policy"><strong>Institutional-status note.</strong> {{ ru_hepe.disclaimer }}</div>
  </section>

  <section class="sp-section sp-shell">
    <article class="sp-card sp-wide"><div class="sp-eyebrow">Disclosure Principle</div><h2>Public-safe by design</h2><p>Only information appropriate for public release is published here.</p><div class="sp-policy">Internal architecture, credentials, restricted data, non-production implementation details, confidential governance materials and other protected project information are intentionally excluded.</div></article>
  </section>

  <section class="sp-section sp-shell">
    <article class="sp-callout"><div class="sp-eyebrow">Selected Projects</div><h2>Evidence-checked project pages</h2><p>Individual public project pages are added only after project identity, evidence status, publication readiness, permissions and confidentiality have been reviewed.</p></article>
  </section>
</div>

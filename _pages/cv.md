---
layout: single
title: "Curriculum Vitae"
description: "Academic curriculum vitae of Asst. Prof. Dr. Kasem Chooratna: education, expertise, teaching, research, curriculum and quality assurance, publications, and academic innovation."
permalink: /cv/
author_profile: false
redirect_from:
  - /resume
---

{% assign publication_count = site.publications | size %}
{% assign proceeding_count = site.data.conference_proceedings.items | size %}
{% assign now_ts = site.time | date: "%s" | plus: 0 %}

<link rel="stylesheet" href="{{ '/assets/css/signature-pages.css' | relative_url }}">
<div class="signature-page">
  <section class="sp-hero sp-shell">
    <div class="sp-kicker">Academic Profile · Experience · Expertise</div>
    <h1>Curriculum Vitae</h1>
    <p>Academic background in Health &amp; Physical Education, curriculum and quality assurance, research, teaching, and responsible digital innovation in higher education.</p>
    <div class="sp-navchips"><a class="sp-chip" href="{{ '/about/' | relative_url }}">About</a><a class="sp-chip" href="{{ '/teaching/' | relative_url }}">Teaching</a><a class="sp-chip" href="{{ '/research/' | relative_url }}">Research</a><a class="sp-chip" href="{{ '/publications/' | relative_url }}">Publications</a></div>
  </section>

  <section class="sp-section sp-shell">
    <div class="sp-grid">
      <article class="sp-card"><div class="sp-eyebrow">Position</div><h3>Academic Position</h3><p><strong>Assistant Professor, Department of Physical Education</strong><br>Faculty of Education, Ramkhamhaeng University, Bangkok, Thailand</p></article>
      <article class="sp-card"><div class="sp-eyebrow">Education</div><h3>Education</h3><ul class="sp-list"><li><strong>Ed.D. in Health Education and Physical Education</strong>, Chulalongkorn University</li><li><strong>M.Ed. in Health Education and Physical Education</strong>, Chulalongkorn University</li><li><strong>B.Sc. in Health Education</strong>, Srinakharinwirot University</li></ul></article>
    </div>
  </section>

  <section class="sp-section sp-shell">
    <div class="sp-section-head"><div class="sp-eyebrow">Expertise</div><h2>Academic Expertise</h2></div>
    <div class="sp-callout"><span class="sp-tag">Health Education</span><span class="sp-tag">Physical Education</span><span class="sp-tag">School Health</span><span class="sp-tag">Health Promotion</span><span class="sp-tag">Curriculum Design &amp; Learning Outcomes</span><span class="sp-tag">Assessment &amp; Evaluation</span><span class="sp-tag">Educational Quality Assurance &amp; AUN-QA</span><span class="sp-tag">AI &amp; Digital Innovation in Education</span></div>
  </section>

  <section class="sp-section sp-shell" aria-labelledby="cv-output-title">
    <div class="sp-section-head"><div class="sp-eyebrow">Scholarly Output Snapshot</div><h2 id="cv-output-title">Traceable research outputs</h2><p class="sp-intro">Different output types are reported separately to preserve their academic meaning.</p></div>
    <div class="sp-metrics">
      <article class="sp-metric"><strong>{{ publication_count }}</strong><span>Verified journal publications</span></article>
      <article class="sp-metric"><strong>{{ proceeding_count }}</strong><span>Verified conference proceedings</span></article>
      <article class="sp-metric"><strong>2</strong><span>Degree research works</span></article>
    </div>
    <p class="sp-all-publications"><a class="sp-link" href="{{ '/research/' | relative_url }}">View the research profile and evidence boundaries →</a></p>
  </section>

  <section class="sp-section sp-shell">
    <div class="sp-grid">
      <article class="sp-card"><div class="sp-eyebrow">Teaching</div><h3>Teaching</h3><p>Teaching spans undergraduate and graduate-level work in health education, physical education, school health, health promotion, sexuality education, substance-abuse education, mental-health promotion, curriculum and assessment.</p><a class="sp-link" href="{{ '/teaching/' | relative_url }}">View selected courses and teaching development →</a></article>
      <article class="sp-card"><div class="sp-eyebrow">Research</div><h3>Research &amp; Academic Development</h3><p>Current academic interests include health and physical education, physical activity and movement behaviour, educational assessment, curriculum quality, evidence-informed teaching and responsible applications of AI in education.</p><a class="sp-link" href="{{ '/research/' | relative_url }}">Explore research themes and outputs →</a></article>
      <article class="sp-card"><div class="sp-eyebrow">Quality</div><h3>Curriculum &amp; Quality Assurance</h3><p>Academic work includes programme and curriculum development, programme learning outcomes (PLOs), course learning outcomes (CLOs), curriculum mapping, outcome-based education, programme evaluation and quality assurance in higher education.</p><a class="sp-link" href="{{ '/curriculum-quality/' | relative_url }}">Explore curriculum &amp; quality →</a></article>
      <article class="sp-card"><div class="sp-eyebrow">Innovation</div><h3>Innovation &amp; Academic Projects</h3><p>Selected public-facing work includes educational technology, academic workflow design, digital systems supporting curriculum and quality processes, and community-oriented health and wellbeing initiatives.</p><a class="sp-link" href="{{ '/innovation-projects/' | relative_url }}">View public-facing innovation work →</a></article>
    </div>
  </section>

  <section class="sp-section sp-shell" aria-labelledby="credentials-title">
    <div class="sp-section-head">
      <div class="sp-eyebrow">Professional Credentials</div>
      <h2 id="credentials-title">Selected research ethics &amp; integrity training</h2>
      <p class="sp-intro">Selected credentials are shown as concise academic-profile entries. Certificate record IDs and verification tokens are intentionally not published.</p>
    </div>
    <div class="sp-grid">
      {% for credential in site.data.professional_credentials %}
      {% assign expiry_ts = credential.expires | date: "%s" | plus: 0 %}
      <article class="sp-card">
        <div class="sp-output-year">{{ credential.category }}</div>
        <h3>{{ credential.title }}</h3>
        <p>{{ credential.provider }} · {{ credential.institution }}</p>
        <p>Completed {{ credential.completed | date: "%d %b %Y" }} · Valid through {{ credential.expires | date: "%d %b %Y" }}</p>
        <div class="sp-evidence-note{% if expiry_ts < now_ts %} sp-evidence-note--developing{% endif %}"><strong>Status:</strong> {% if expiry_ts >= now_ts %}Active{% else %}Expired / historical training{% endif %}</div>
      </article>
      {% endfor %}
    </div>
  </section>

  <section class="sp-section sp-shell">
    <article class="sp-card sp-wide"><div class="sp-eyebrow">Publications</div><h2>Verified scholarly outputs</h2><p>A verification-first publication register is maintained so that only traceable and confirmed journal publications are listed as publications. Conference proceedings and degree research are reported separately.</p><a class="sp-link" href="{{ '/publications/' | relative_url }}">View Publications →</a><div class="sp-policy">Only projects, credentials, and records suitable for public disclosure are presented on this website.</div></article>
  </section>
</div>

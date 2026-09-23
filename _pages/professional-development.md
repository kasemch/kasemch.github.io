---
permalink: /professional-development/
title: "Professional Development & Credentials"
description: "Selected verified professional development and research-integrity credentials of Asst. Prof. Dr. Kasem Chooratna, presented with an evidence-first public disclosure policy."
author_profile: false
---

{% assign credentials = site.data.professional_credentials %}
{% assign now_ts = site.time | date: "%s" | plus: 0 %}
<link rel="stylesheet" href="{{ '/assets/css/professional-development.css' | relative_url }}">

<div class="pd-page pdp-studio">
  <section class="pd-hero pdp-hero" aria-labelledby="pdp-title">
    <div class="pd-shell pdp-hero-grid">
      <div class="pdp-hero-copy">
        <div class="pd-kicker">Professional Development Portfolio</div>
        <h1 id="pdp-title">Professional learning,<br><span>with verified credentials.</span></h1>
        <p class="pd-lead">Selected verified professional learning records supporting research ethics, responsible conduct, research integrity and evidence-informed academic practice.</p>
        <div class="pd-actions">
          <a class="pdp-action-primary" href="#credentials-title">Verified Registry</a>
          <a href="{{ '/evidence-explorer/' | relative_url }}">Evidence Explorer</a>
          <a href="{{ '/cv/' | relative_url }}">Academic CV</a>
        </div>
      </div>
      <div class="pdp-hero-visual" aria-hidden="true">
        <div class="pdp-core"><strong>Learning</strong><span>Verified records</span></div>
        <div class="pdp-node pdp-node-a">Ethics</div>
        <div class="pdp-node pdp-node-b">Integrity</div>
        <div class="pdp-node pdp-node-c">Quality</div>
        <div class="pdp-node pdp-node-d">Evidence</div>
      </div>
    </div>
  </section>

  <section class="pd-shell pdp-pillar-strip" aria-label="Professional development portfolio structure">
    <a href="#credentials-title"><span>01</span><strong>Verified Credentials</strong><small>Public-safe training records</small></a>
    <a href="#development-title"><span>02</span><strong>Academic Development</strong><small>How learning connects to academic work</small></a>
    <a href="{{ '/evidence-explorer/' | relative_url }}"><span>03</span><strong>Evidence</strong><small>Traceable public-safe records</small></a>
    <a href="{{ '/cv/' | relative_url }}"><span>04</span><strong>Academic Profile</strong><small>Connect development with the CV</small></a>
  </section>

  <section class="pd-section" aria-labelledby="credentials-title">
    <div class="pd-shell">
      <div class="pd-section-head">
        <div><div class="pd-eyebrow">Verified Registry</div><h2 id="credentials-title">Selected research ethics &amp; integrity training</h2></div>
        <p>Certificate identifiers, verification tokens and private source files are intentionally not published.</p>
      </div>

      <div class="pd-filters" aria-label="Filter credentials">
        <button type="button" data-pd-filter="all" aria-pressed="true">All</button>
        <button type="button" data-pd-filter="research ethics" aria-pressed="false">Research Ethics</button>
        <button type="button" data-pd-filter="responsible conduct of research" aria-pressed="false">Responsible Conduct</button>
        <button type="button" data-pd-filter="research integrity" aria-pressed="false">Research Integrity</button>
      </div>

      <div class="pd-grid">
        {% for credential in credentials %}
        {% assign expiry_ts = credential.expires | date: "%s" | plus: 0 %}
        <article class="pd-card" data-pd-card data-pd-category="{{ credential.category | downcase }}">
          <div class="pd-card-top"><span class="pd-category">{{ credential.category }}</span><span class="pd-status{% if expiry_ts < now_ts %} pd-status-history{% endif %}">{% if expiry_ts >= now_ts %}Active{% else %}Historical{% endif %}</span></div>
          <h3>{{ credential.title }}</h3>
          <p class="pd-provider">{{ credential.provider }} · {{ credential.institution }}</p>
          <dl>
            <div><dt>Completed</dt><dd>{{ credential.completed | date: "%d %b %Y" }}</dd></div>
            <div><dt>Valid through</dt><dd>{{ credential.expires | date: "%d %b %Y" }}</dd></div>
          </dl>
        </article>
        {% endfor %}
      </div>
      <div class="pd-empty" data-pd-empty hidden role="status" aria-live="polite">No matching verified public credential was found.</div>

      <div class="pd-policy"><strong>Public disclosure rule.</strong> This page is intentionally selective. A training record is shown only when the website already has a verified title, provider, institution, completion date and validity date. Drive documents discovered during review are not automatically published or treated as public credentials.</div>
    </div>
  </section>

  <section class="pd-section pd-section-soft" aria-labelledby="development-title">
    <div class="pd-shell">
      <div class="pd-eyebrow">Development Architecture</div>
      <h2 id="development-title">How professional development connects to academic work</h2>
      <div class="pd-domain-grid">
        <article><strong>Research Ethics</strong><span>Supports responsible planning, conduct and reporting of research.</span></article>
        <article><strong>Research Integrity</strong><span>Supports transparent academic practice and management of conflicts of interest.</span></article>
        <article><strong>Teaching &amp; Quality</strong><span>Professional learning is connected to evidence-informed teaching and continuous improvement.</span></article>
        <article><strong>Evidence Governance</strong><span>Only public-safe, traceable records are promoted into the website evidence layer.</span></article>
      </div>
    </div>
  </section>
</div>

<script src="{{ '/assets/js/professional-development.js' | relative_url }}" defer></script>

---
permalink: /evidence-explorer/
title: "Evidence Explorer"
description: "Public academic evidence explorer connecting selected academic claims to traceable public sources."
author_profile: false
---

{% assign evidence_records = site.data.evidence.records | where: 'public', true %}
<link rel="stylesheet" href="{{ '/assets/css/evidence-explorer.css' | relative_url }}">

<div class="evidence-explorer">
  <section class="ee-hero">
    <div class="ee-shell">
      <div class="ee-kicker">Evidence-first academic profile</div>
      <h1>Evidence Explorer</h1>
      <p class="ee-lead">Trace selected public academic claims to their supporting sources. This page includes only public-safe records with a traceable evidence path; restricted and internal materials are excluded.</p>
      <nav class="ee-nav" aria-label="Evidence Explorer related pages">
        <a href="{{ '/teaching/' | relative_url }}">Teaching</a>
        <a href="{{ '/research/' | relative_url }}">Research</a>
        <a href="{{ '/publications/' | relative_url }}">Publications</a>
        <a href="{{ '/curriculum-quality/' | relative_url }}">Curriculum &amp; QA</a>
      </nav>
    </div>
  </section>

  <section class="ee-section" aria-labelledby="explorer-title">
    <div class="ee-shell">
      <div class="ee-section-head">
        <div>
          <div class="ee-eyebrow">Public evidence register</div>
          <h2 id="explorer-title">Claim → Evidence → Source</h2>
        </div>
        <p class="ee-intro">Search or filter the records below. Absence from this page does not imply absence of academic work; it means the evidence has not been included in the public-safe register.</p>
      </div>

      <div class="ee-controls" role="search">
        <label>
          <span>Search evidence</span>
          <input type="search" data-ee-search placeholder="Search claims, domains or sources…">
        </label>
        <div class="ee-filters" aria-label="Filter evidence by domain">
          <button type="button" data-ee-filter="all" aria-pressed="true">All</button>
          <button type="button" data-ee-filter="Teaching" aria-pressed="false">Teaching</button>
          <button type="button" data-ee-filter="Publications" aria-pressed="false">Publications</button>
          <button type="button" data-ee-filter="Research" aria-pressed="false">Research</button>
          <button type="button" data-ee-filter="Curriculum" aria-pressed="false">Curriculum</button>
          <button type="button" data-ee-filter="Quality Assurance" aria-pressed="false">Quality Assurance</button>
        </div>
      </div>

      <div class="ee-grid" data-ee-grid>
        {% for item in evidence_records %}
        <article class="ee-card" data-ee-card data-domain="{{ item.domain }}" data-search="{{ item.title | escape }} {{ item.claim | escape }} {{ item.source_label | escape }} {{ item.evidence_type | escape }} {{ item.domain | escape }}">
          <div class="ee-card-topline">
            <span class="ee-domain">{{ item.domain }}</span>
            <span class="ee-status">{{ item.evidence_status | replace: '_', ' ' }}</span>
          </div>
          <h3>{{ item.title }}</h3>
          <div class="ee-chain" aria-label="Evidence chain">
            <div><strong>Claim</strong><span>{{ item.claim }}</span></div>
            <div><strong>Evidence</strong><span>{{ item.evidence_type }}</span></div>
            <div><strong>Source</strong><span>{{ item.source_label }}</span></div>
          </div>
          <div class="ee-links">
            {% if item.related_record %}<a href="{{ item.related_record | relative_url }}">View academic record →</a>{% endif %}
            {% if item.related_page %}<a href="{{ item.related_page | relative_url }}">Related page →</a>{% endif %}
            <a href="{{ item.source_url }}" rel="noopener">Open source →</a>
          </div>
        </article>
        {% endfor %}
        <div class="ee-empty" data-ee-empty role="status" aria-live="polite">No matching public evidence record was found.</div>
      </div>
    </div>
  </section>

  <section class="ee-section ee-soft" aria-labelledby="policy-title">
    <div class="ee-shell ee-policy-grid">
      <article>
        <div class="ee-eyebrow">Verification policy</div>
        <h2 id="policy-title">Public evidence only</h2>
        <p>Records are added only when the claim and source are suitable for public display and can be traced to an authoritative or otherwise public source. Restricted documents, student data, internal audit records and confidential programme evidence are excluded.</p>
      </article>
      <article class="ee-status-guide">
        <h3>Status guide</h3>
        <p><strong>VERIFIED</strong> — a public source supports the listed academic record.</p>
        <p><strong>PUBLIC SOURCE</strong> — an authoritative public source establishes the evidence boundary or reference point.</p>
        <p><strong>TRACEABLE</strong> — a public source can be followed, but the record may not justify a stronger verification label.</p>
      </article>
    </div>
  </section>
</div>

<script src="{{ '/assets/js/evidence-explorer.js' | relative_url }}" defer></script>

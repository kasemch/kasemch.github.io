---
permalink: /analytics/
title: "Public Academic Analytics"
description: "Evidence-first descriptive analytics for verified publications, teaching evidence coverage, research lifecycle status, and public academic activity."
author_profile: false
classes: wide
---

{% assign teaching = site.data.teaching_ay2569 %}
{% assign publication_count = site.publications | size %}
{% assign proceeding_count_2023 = site.data.conference_proceedings.items | size %}
{% assign proceeding_count_2026 = site.data.conference_proceedings_2026.items | size %}
{% assign proceeding_count = proceeding_count_2023 | plus: proceeding_count_2026 %}

<link rel="stylesheet" href="{{ '/assets/css/public-academic-analytics.css' | relative_url }}">

<div class="paa-page">
  <section class="paa-hero">
    <div class="paa-shell">
      <div class="paa-kicker">Evidence · Pattern · Context</div>
      <h1>Public Academic Analytics</h1>
      <p>Descriptive analytics generated from the public academic data layer. These charts summarize verified records and evidence coverage; they are not performance scores and do not infer unverified academic activity.</p>
      <div class="paa-actions"><a href="{{ '/workspace/' | relative_url }}">Academic Dashboard</a><a href="{{ '/publications/' | relative_url }}">Publications</a><a href="{{ '/research-progress/' | relative_url }}">Research Status</a><a href="{{ '/teaching/' | relative_url }}">Teaching</a></div>
    </div>
  </section>

  <main class="paa-shell">
    <section class="paa-summary" aria-label="Public academic analytics summary">
      <article><span>Verified journals</span><strong>{{ publication_count }}</strong><small>Jekyll publication collection</small></article>
      <article><span>Proceedings</span><strong>{{ proceeding_count }}</strong><small>Reported separately</small></article>
      <article><span>AY2569 course codes</span><strong>{{ teaching.summary.initially_scheduled }}</strong><small>Initial MR30 reconciliation denominator</small></article>
      <article><span>Direct quality evidence</span><strong>{{ teaching.summary.direct_quality_evidence_courses }}</strong><small>Courses with direct evidence located</small></article>
    </section>

    <section class="paa-grid" aria-label="Academic analytics charts">
      <article class="paa-card paa-wide">
        <div class="paa-card-head"><div><span class="paa-eyebrow">Publications</span><h2>Journal publications by year</h2></div><span class="paa-basis">Verified collection only</span></div>
        <div id="paa-publication-year" class="paa-chart" role="img" aria-label="Bar chart of verified journal publications by year"></div>
        <p class="paa-caption">Counts are derived from publication dates in the verified public journal collection. Conference proceedings and degree research are excluded from this chart.</p>
      </article>

      <article class="paa-card paa-wide">
        <div class="paa-card-head"><div><span class="paa-eyebrow">Publication venues</span><h2>Venue distribution</h2></div><span class="paa-basis">No ranking implied</span></div>
        <div id="paa-venue-distribution" class="paa-chart" role="img" aria-label="Distribution of verified journal publications by venue"></div>
        <p class="paa-caption">This is a frequency distribution of venue names stored in the publication metadata. It does not represent journal quality, indexing status, or impact.</p>
      </article>

      <article class="paa-card">
        <div class="paa-card-head"><div><span class="paa-eyebrow">Teaching evidence</span><h2>AY2569 evidence coverage</h2></div><span class="paa-basis">Denominator: {{ teaching.summary.initially_scheduled }} course codes</span></div>
        <div class="paa-evidence-bars" aria-label="Teaching evidence coverage">
          <div data-value="{{ teaching.summary.tqf3_courses_located }}" data-total="{{ teaching.summary.initially_scheduled }}"><span>TQF3 located</span><i></i><strong>{{ teaching.summary.tqf3_courses_located }}/{{ teaching.summary.initially_scheduled }}</strong></div>
          <div data-value="{{ teaching.summary.tqf5_courses_located }}" data-total="{{ teaching.summary.initially_scheduled }}"><span>TQF5 material located</span><i></i><strong>{{ teaching.summary.tqf5_courses_located }}/{{ teaching.summary.initially_scheduled }}</strong></div>
          <div data-value="{{ teaching.summary.verification_courses_located }}" data-total="{{ teaching.summary.initially_scheduled }}"><span>Verification material located</span><i></i><strong>{{ teaching.summary.verification_courses_located }}/{{ teaching.summary.initially_scheduled }}</strong></div>
          <div data-value="{{ teaching.summary.direct_quality_evidence_courses }}" data-total="{{ teaching.summary.initially_scheduled }}"><span>Direct quality evidence</span><i></i><strong>{{ teaching.summary.direct_quality_evidence_courses }}/{{ teaching.summary.initially_scheduled }}</strong></div>
        </div>
        <p class="paa-caption">“Located” means relevant evidence material was found. It does not mean the course was delivered, approved, passed verification, or completed an improvement cycle.</p>
      </article>

      <article class="paa-card">
        <div class="paa-card-head"><div><span class="paa-eyebrow">Research</span><h2>Lifecycle distribution</h2></div><span class="paa-basis" id="paa-research-verified">Loading registry…</span></div>
        <div id="paa-research-lifecycle" class="paa-lifecycle" role="img" aria-label="Verified research projects by lifecycle stage"></div>
        <p class="paa-caption">A project is counted only at its latest verified public lifecycle stage. Stage placement is not a completion percentage.</p>
      </article>

      <article class="paa-card paa-wide">
        <div class="paa-card-head"><div><span class="paa-eyebrow">Academic activity map</span><h2>How public academic work connects</h2></div><span class="paa-basis">Conceptual relationship map</span></div>
        <div class="paa-activity-map" aria-label="Academic activity relationship map">
          <a href="{{ '/teaching/' | relative_url }}"><b>Teaching</b><span>Learning design · course evidence</span></a>
          <a href="{{ '/research-progress/' | relative_url }}"><b>Research</b><span>Inquiry · lifecycle evidence</span></a>
          <div class="paa-map-center"><b>Evidence</b><span>Traceability &amp; public boundary</span></div>
          <a href="{{ '/curriculum-quality/' | relative_url }}"><b>Curriculum &amp; QA</b><span>Alignment · evaluation · improvement</span></a>
          <a href="{{ '/innovation-projects/' | relative_url }}"><b>Innovation</b><span>Digital systems · public service</span></a>
        </div>
        <p class="paa-caption">The map shows relationships among public academic domains. Lineage and connections are explanatory, not quantitative measures of impact.</p>
      </article>
    </section>

    <section class="paa-policy">
      <strong>Interpretation boundary.</strong> Analytics are generated only from public-safe records already admitted to this website. Missing records remain missing; restricted evidence is not inferred; descriptive counts are not converted into quality rankings or unsupported impact claims.
    </section>
  </main>
</div>

<script type="application/json" id="paa-publications-data">[
{% for publication in site.publications %}{"year":{{ publication.date | date: "%Y" | jsonify }},"venue":{{ publication.venue | default: "Venue not specified" | jsonify }}}{% unless forloop.last %},{% endunless %}{% endfor %}
]</script>
<script src="{{ '/assets/js/public-academic-analytics.js' | relative_url }}" data-research-url="{{ '/assets/data/research-projects.json' | relative_url }}" defer></script>

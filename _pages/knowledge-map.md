---
permalink: /knowledge-map/
title: "Academic Knowledge Map"
description: "Interactive public map connecting the academic domains of Asst. Prof. Dr. Kasem Chooratna across teaching, research, curriculum, quality, evidence and innovation."
author_profile: false
---

{% assign km = site.data.knowledge-map %}
<link rel="stylesheet" href="{{ '/assets/css/knowledge-map.css' | relative_url }}">

<div class="knowledge-map-page">
  <section class="km-hero">
    <div class="km-shell">
      <div class="km-kicker">Academic Portfolio · Connected Academic Domains</div>
      <h1>Academic Knowledge Map</h1>
      <p class="km-lead">Explore how public academic areas on this website connect across teaching, research, curriculum, quality, evidence and responsible digital innovation. The map is explanatory and uses public website relationships only.</p>
      <div class="km-actions">
        <a href="{{ '/evidence-explorer/' | relative_url }}">Evidence Explorer</a>
        <a href="{{ '/research/' | relative_url }}">Research</a>
        <a href="{{ '/teaching/' | relative_url }}">Teaching</a>
      </div>
    </div>
  </section>

  <section class="km-section" aria-labelledby="map-title">
    <div class="km-shell">
      <div class="km-section-head">
        <div><div class="km-eyebrow">Interactive Map</div><h2 id="map-title">One profile, connected domains</h2></div>
        <p>Select a node to highlight its directly related areas and read the relationship summary.</p>
      </div>
      <div class="km-layout">
        <div class="km-network" role="list" aria-label="Academic knowledge domains">
          {% for node in km.nodes %}{% if node.public %}
          <button class="km-node" type="button" data-km-node="{{ node.id }}" role="listitem" aria-pressed="false">
            <strong>{{ node.label }}</strong><span>{{ node.description }}</span>
          </button>
          {% endif %}{% endfor %}
        </div>
        <aside class="km-detail" aria-live="polite">
          <div class="km-eyebrow">Selected domain</div>
          <h3 data-km-detail-title>Choose a domain</h3>
          <p data-km-detail-text>Select any node to see its public relationships.</p>
          <div data-km-relations></div>
          <a data-km-detail-link class="km-detail-link" hidden>Explore this area →</a>
        </aside>
      </div>
      <div class="km-policy"><strong>Evidence boundary.</strong> Relationships are derived from public content already represented on this website. This page does not expose internal programme records, restricted evidence, confidential project architecture or private audit material.</div>
    </div>
  </section>
</div>

<script type="application/json" id="knowledge-map-data">{{ km | jsonify }}</script>
<script src="{{ '/assets/js/knowledge-map.js' | relative_url }}" defer></script>

---
permalink: /research/
title: "Research"
description: "Research profile of Asst. Prof. Dr. Kasem Chooratna covering Health & Physical Education, movement and health behaviours, curriculum, assessment, and responsible educational innovation."
author_profile: false
---

{% assign research_pubs = site.publications | sort: "date" %}
{% assign publication_count = research_pubs | size %}
{% assign venue_groups = research_pubs | group_by: "venue" %}
{% assign year_groups = research_pubs | group_by_exp: "item", "item.date | date: '%Y'" %}
{% assign first_publication = research_pubs | first %}
{% assign latest_publication = research_pubs | last %}
{% assign recent_publications = research_pubs | reverse %}
{% assign proceeding_items = site.data.conference_proceedings.items %}
{% assign proceeding_count = proceeding_items | size %}

<link rel="stylesheet" href="{{ '/assets/css/signature-pages.css' | relative_url }}">
<div class="signature-page">
  <section class="sp-hero sp-shell">
    <div class="sp-kicker">Research Profile</div>
    <h1>Research</h1>
    <p>Research in health and physical education, health behaviour, movement and wellbeing, educational assessment, curriculum development, and responsible innovation in higher education.</p>
    <div class="sp-navchips">
      <a class="sp-chip" href="{{ '/publications/' | relative_url }}">Publications</a>
      <a class="sp-chip" href="{{ '/teaching/' | relative_url }}">Teaching</a>
      <a class="sp-chip" href="{{ '/innovation-projects/' | relative_url }}">Innovation &amp; Projects</a>
    </div>
  </section>

  <section class="sp-section sp-shell" aria-labelledby="research-overview-title">
    <div class="sp-section-head">
      <div class="sp-eyebrow">Research at a glance</div>
      <h2 id="research-overview-title">Traceable scholarly and research outputs</h2>
      <p class="sp-intro">Journal publications, conference proceedings, and degree research are tracked separately so that each total retains its correct academic meaning.</p>
    </div>
    <div class="sp-metrics" aria-label="Research output summary">
      <article class="sp-metric"><strong>{{ publication_count }}</strong><span>Verified journal publications</span></article>
      <article class="sp-metric"><strong>{{ proceeding_count }}</strong><span>Verified conference proceedings</span></article>
      <article class="sp-metric"><strong>{{ venue_groups | size }}</strong><span>Journal publication venues</span></article>
      <article class="sp-metric"><strong>{% if first_publication and latest_publication %}{{ first_publication.date | date: "%Y" }}–{{ latest_publication.date | date: "%Y" }}{% else %}—{% endif %}</strong><span>Journal publication span</span></article>
      <article class="sp-metric"><strong>2</strong><span>Degree research works</span></article>
    </div>
  </section>

  <section class="sp-section sp-shell" aria-labelledby="research-themes-title">
    <div class="sp-section-head"><div class="sp-eyebrow">Research Themes</div><h2 id="research-themes-title">Four connected areas of inquiry</h2></div>
    <div class="sp-grid">
      <article class="sp-card"><h3>Health, Physical Activity &amp; Movement Behaviour</h3><p>Physical activity, sedentary behaviour, daily-life context, opportunities for movement, and factors shaping healthy behaviour among different populations.</p><div class="sp-evidence-note"><strong>Publication evidence:</strong> the verified register includes health-promotion and preventive-behaviour studies across community, student, worker, clinical, oral-health, and school populations.</div></article>
      <article class="sp-card"><h3>Health &amp; Physical Education Research</h3><p>Teaching and learning in health and physical education, school health, assessment, learner diversity, instructional design, and translation of evidence into educational practice.</p><div class="sp-evidence-note"><strong>Publication evidence:</strong> the current register includes health-education programme evaluation, school health-behaviour research, and preventive-health interventions.</div></article>
      <article class="sp-card"><h3>Curriculum, Assessment &amp; Quality</h3><p>Outcome-based curriculum design, programme and course learning outcomes, curriculum mapping, assessment alignment, programme evaluation, quality assurance, and evidence-based academic improvement.</p><div class="sp-evidence-note sp-evidence-note--developing"><strong>Research development area:</strong> verified public outputs in this theme will be linked when confirmed in the publication register.</div></article>
      <article class="sp-card"><h3>AI &amp; Educational Innovation</h3><p>Responsible applications of artificial intelligence and digital technology in academic work, teaching support, evidence synthesis, curriculum governance, assessment, and educational quality systems.</p><div class="sp-evidence-note sp-evidence-note--developing"><strong>Research development area:</strong> only source-verified outputs will be added to the public publication record.</div></article>
    </div>
  </section>

  <section class="sp-section sp-shell" aria-labelledby="publication-profile-title">
    <div class="sp-section-head"><div class="sp-eyebrow">Publication Profile</div><h2 id="publication-profile-title">Where the verified journal work has been published</h2><p class="sp-intro">Venue counts are calculated from current verified publication metadata rather than manually entered totals.</p></div>
    <article class="sp-card sp-wide">
      <div class="sp-venue-list">
        {% for venue in venue_groups %}
        {% assign venue_count = venue.items | size %}
        {% assign venue_share = venue_count | times: 100 | divided_by: publication_count %}
        <div class="sp-venue-row"><div class="sp-venue-meta"><strong>{{ venue.name }}</strong><span>{{ venue_count }} publication{% if venue_count != 1 %}s{% endif %}</span></div><div class="sp-bar" aria-hidden="true"><span style="width: {{ venue_share }}%"></span></div></div>
        {% endfor %}
      </div>
    </article>
  </section>

  <section class="sp-section sp-shell" aria-labelledby="timeline-title">
    <div class="sp-section-head"><div class="sp-eyebrow">Research Output Over Time</div><h2 id="timeline-title">Verified journal publication timeline</h2></div>
    <article class="sp-card sp-wide">
      <div class="sp-timeline-list">
        {% for year in year_groups %}
        {% assign year_count = year.items | size %}
        {% assign year_share = year_count | times: 100 | divided_by: publication_count %}
        <div class="sp-timeline-row"><strong>{{ year.name }}</strong><div class="sp-bar" aria-hidden="true"><span style="width: {{ year_share }}%"></span></div><span>{{ year_count }}</span></div>
        {% endfor %}
      </div>
    </article>
  </section>

  <section class="sp-section sp-shell" aria-labelledby="proceedings-title">
    <div class="sp-section-head">
      <div class="sp-eyebrow">Conference Proceedings</div>
      <h2 id="proceedings-title">{{ proceeding_count }} verified papers from Healthy Aging 2023</h2>
      <p class="sp-intro">These works were reconciled against the 2023 CV, the complete proceedings volume, and separate article PDFs. They are presented separately from journal-publication totals.</p>
    </div>
    <article class="sp-card sp-wide">
      <p><strong>{{ site.data.conference_proceedings.conference }}</strong><br>{{ site.data.conference_proceedings.date | date: "%d %B %Y" }} · Conference proceedings</p>
      <ol class="sp-list">
        {% for item in proceeding_items %}
        <li><strong>{{ item.title }}</strong><br><span>{{ item.authors }}{% if item.pages %} · pp. {{ item.pages }}{% endif %}</span></li>
        {% endfor %}
      </ol>
      <div class="sp-policy"><strong>Evidence boundary.</strong> Public entries summarize the verified bibliographic facts only. Private Google Drive file identifiers and certificate-style verification tokens are not exposed.</div>
    </article>
  </section>

  <section class="sp-section sp-shell" aria-labelledby="recent-research-title">
    <div class="sp-section-head"><div class="sp-eyebrow">Recent Verified Research</div><h2 id="recent-research-title">Latest journal publication records</h2></div>
    <div class="sp-grid">
      {% for post in recent_publications limit: 3 %}
      <article class="sp-card sp-third sp-research-output"><div class="sp-output-year">{{ post.date | date: "%Y" }}</div><h3>{{ post.title }}</h3><p>{{ post.venue }}</p>{% if post.excerpt %}<p class="sp-output-excerpt">{{ post.excerpt }}</p>{% endif %}<a class="sp-link" href="{{ post.url | relative_url }}">View publication record →</a></article>
      {% endfor %}
    </div>
    <p class="sp-all-publications"><a class="sp-link" href="{{ '/publications/' | relative_url }}">View all {{ publication_count }} verified journal publications →</a></p>
  </section>

  <section class="sp-section sp-shell" aria-labelledby="research-degrees-title">
    <div class="sp-section-head"><div class="sp-eyebrow">Research Degrees &amp; Theses</div><h2 id="research-degrees-title">Degree research in health education</h2><p class="sp-intro">Degree research is shown separately from journal-publication and conference-proceedings counts. English titles follow the official parallel titles in the Chulalongkorn University ETD records.</p></div>
    <div class="sp-grid">
      <article class="sp-card"><div class="sp-output-year">2015 · Doctoral dissertation</div><h3>A Proposed Model of Health Education Learning Management Using Collaborative Learning and Knowledge Management to Enhance Cognitive Skills</h3><p>Chulalongkorn University · Health Education and Physical Education</p><a class="sp-link" href="https://digital.car.chula.ac.th/chulaetd/36039/" rel="noopener">View Chula ETD record →</a></article>
      <article class="sp-card"><div class="sp-output-year">2011 · Master's thesis</div><h3>Effects of Health Education Instruction Using Problem-Based Learning on Critical Thinking and Learning Achievement of Sixth Grade Students</h3><p>Chulalongkorn University · Health Education and Physical Education</p><a class="sp-link" href="https://digital.car.chula.ac.th/chulaetd/35116/" rel="noopener">View Chula ETD record →</a></article>
    </div>
  </section>

  <section class="sp-section sp-shell">
    <article class="sp-card sp-wide"><div class="sp-eyebrow">Research Approach</div><h2>Methodological transparency and practical relevance</h2><p>Research projects may use quantitative, qualitative, mixed-methods, instrument-development, evidence-synthesis, and design-oriented approaches depending on the research question. Across projects, emphasis is placed on methodological transparency, traceable evidence, research ethics, and practical relevance.</p><div class="sp-policy"><strong>Evidence policy.</strong> Journal-publication counts and venue profiles on this page are derived only from records in the verified public publication collection. Conference proceedings are maintained in a separate verified register. Research reports, proposals, manuscripts, and private Drive materials are not counted as journal publications unless an authoritative public source confirms publication status. Citation counts, h-index, database indexing, quartiles, and journal-impact metrics are not displayed unless independently verified from an authoritative source.</div></article>
  </section>
</div>

---
permalink: /
title: "Asst. Prof. Dr. Kasem Chooratna"
description: "Public academic digital hub of Asst. Prof. Dr. Kasem Chooratna covering teaching, research, publications, curriculum and quality, professional development, academic innovation and traceable public evidence."
author_profile: false
classes: wide
---

{% assign teaching = site.data.teaching_ay2569 %}
{% assign ru_hepe = site.data.ru_hepe_learning %}
{% assign hepe_releases = site.data.hepe_public_releases.releases %}
{% assign hepe_current = hepe_releases | where: "current_release", true | first %}
{% assign publication_count = site.publications | size %}
{% assign proceeding_count_2023 = site.data.conference_proceedings.items | size %}
{% assign proceeding_count_2026 = site.data.conference_proceedings_2026.items | size %}
{% assign proceeding_count = proceeding_count_2023 | plus: proceeding_count_2026 %}
{% assign scholarly_total = publication_count | plus: proceeding_count | plus: 2 %}

<link rel="stylesheet" href="{{ '/assets/css/academic-executive.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/static-ai-v2.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/signature-mark.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/home-academic-axis.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/academic-writing-home.css' | relative_url }}">

<div class="academic-executive option17a">
  <section class="ae-hero" aria-labelledby="home-title">
    <div class="ae-shell ae-hero-grid">
      <div class="ae-hero-copy">
        <div class="ae-kicker">Healthier People · Stronger Societies</div>
        <h1 id="home-title">Asst. Prof. Dr.<br>Kasem Chooratna</h1>
        <p class="ae-role">Health Education and Physical Education · Ramkhamhaeng University</p>
        <div class="ae-signature-mark" aria-hidden="true"><img src="{{ '/images/signature-web-safe.svg' | relative_url }}" alt="" width="300" height="87" decoding="async"></div>
        <p class="ae-lead">Academic work connecting teaching, research, curriculum development, quality assurance, community engagement and responsible digital innovation for healthier people and stronger communities.</p>
        <div class="ae-actions">
          <a class="ae-btn ae-btn-gold" href="{{ '/about/' | relative_url }}">Explore Profile</a>
          <a class="ae-btn ae-btn-ghost" href="{{ '/workspace/' | relative_url }}">Academic Dashboard</a>
        </div>
        <blockquote class="ae-quote">“Education, movement and evidence can work together to improve health, learning and society.”</blockquote>
      </div>

      <div class="ae-portrait-stage">
        <div class="ae-portrait-glow" aria-hidden="true"></div>
        <img class="ae-portrait" src="{{ '/images/profile-selected-2026.webp' | relative_url }}" alt="Formal portrait of Asst. Prof. Dr. Kasem Chooratna" width="480" height="600" decoding="async">
        <div class="ae-portrait-axis" aria-label="Academic focus">
          <span>Education</span><span>Research</span><span>Community</span><span>Impact</span>
        </div>
      </div>
    </div>
  </section>

  <section class="ae-pillars" aria-label="Academic portfolio pillars">
    <div class="ae-shell ae-pillar-grid">
      <a href="{{ '/teaching/' | relative_url }}"><strong>Teaching</strong><span>Evidence-informed learning and course development</span></a>
      <a href="{{ '/research/' | relative_url }}"><strong>Research</strong><span>Health, movement, education and wellbeing</span></a>
      <a href="{{ '/curriculum-quality/' | relative_url }}"><strong>Curriculum &amp; QA</strong><span>Alignment, evaluation and continuous improvement</span></a>
      <a href="{{ '/innovation-projects/' | relative_url }}"><strong>Academic Innovation</strong><span>Responsible digital systems and AI-enabled practice</span></a>
    </div>
  </section>

  <section class="ae-section">
    <div class="ae-shell ae-about-grid">
      <article>
        <div class="ae-eyebrow">Academic Profile</div>
        <h2>Knowledge in service of learning, health and society</h2>
        <p>Academic work spans Health Education, Physical Education, School Health, curriculum and learning-outcome design, assessment and evaluation, educational quality assurance, research, community engagement and responsible AI in education.</p>
        <div class="ae-inline-links"><a href="{{ '/about/' | relative_url }}">About →</a><a href="{{ '/cv/' | relative_url }}">Academic CV →</a></div>
      </article>
      <aside class="ae-snapshot" aria-label="Verified academic snapshot">
        <div><span>Verified journal publications</span><strong>{{ publication_count }}</strong></div>
        <div><span>Conference proceedings</span><strong>{{ proceeding_count }}</strong></div>
        <div><span>Degree research works</span><strong>2</strong></div>
        <div><span>AY2569 retained teaching records</span><strong>{{ teaching.summary.retained }}</strong></div>
      </aside>
    </div>
  </section>

  <section class="ae-section ae-section-dark" aria-labelledby="expertise-title">
    <div class="ae-shell">
      <div class="ae-section-head"><div><div class="ae-eyebrow">Expertise</div><h2 id="expertise-title">Connected academic domains</h2></div><a href="{{ '/knowledge-map/' | relative_url }}">Open Knowledge Map →</a></div>
      <div class="ae-expertise-grid">
        <article><span>01</span><h3>Health Education</h3><p>Health promotion, school health, health literacy and learning for healthier lives.</p></article>
        <article><span>02</span><h3>Physical Education</h3><p>Movement, physical activity, pedagogy and wellbeing across educational contexts.</p></article>
        <article><span>03</span><h3>Curriculum &amp; Quality</h3><p>PLO/CLO alignment, curriculum mapping, assessment, evaluation and AUN-QA.</p></article>
        <article><span>04</span><h3>Academic Innovation</h3><p>Responsible AI, digital workflows and evidence architecture for academic work.</p></article>
      </div>
    </div>
  </section>

  <section class="ae-section" aria-labelledby="outputs-title">
    <div class="ae-shell">
      <div class="ae-section-head"><div><div class="ae-eyebrow">Scholarly Output</div><h2 id="outputs-title">Verified outputs at a glance</h2></div><a href="{{ '/publications/' | relative_url }}">View Publications →</a></div>
      <div class="ae-output-grid">
        <article class="ae-chart-card">
          <h3>Scholarly output mix</h3>
          <p class="ae-muted">Output types are kept separate so their academic meaning is preserved.</p>
          <div class="ae-stack" aria-label="Output mix chart">
            <span class="ae-stack-journal" style="flex-grow:{{ publication_count }}"></span>
            <span class="ae-stack-proceeding" style="flex-grow:{{ proceeding_count }}"></span>
            <span class="ae-stack-degree" style="flex-grow:2"></span>
          </div>
          <div class="ae-legend"><span><i class="journal"></i>Journal {{ publication_count }}</span><span><i class="proceeding"></i>Proceedings {{ proceeding_count }}</span><span><i class="degree"></i>Degree research 2</span></div>
          <div class="ae-big-number"><strong>{{ scholarly_total }}</strong><span>verified scholarly records across the three public categories</span></div>
        </article>
        <article class="ae-flow-card">
          <h3>Academic impact flow</h3>
          <div class="ae-flow" aria-label="Teaching research and impact flow">
            <div><b>Teach</b><span>Knowledge &amp; skills</span></div><em>→</em>
            <div><b>Research</b><span>Evidence &amp; inquiry</span></div><em>→</em>
            <div><b>Improve</b><span>Curriculum &amp; quality</span></div><em>→</em>
            <div><b>Serve</b><span>Community &amp; society</span></div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="ae-section" aria-labelledby="featured-title">
    <div class="ae-shell">
      <div class="ae-section-head"><div><div class="ae-eyebrow">Selected Work</div><h2 id="featured-title">Teaching, research, writing and public evidence</h2></div></div>
      <div class="ae-card-grid">
        <article class="ae-card"><span>Teaching</span><h3>AY2569 Teaching Portfolio</h3><p>MR30-reconciled offering status, course-quality evidence coverage and public-safe teaching records.</p><a href="{{ '/teaching/' | relative_url }}">Open Teaching →</a></article>
        <article class="ae-card"><span>Research</span><h3>Research Command Center</h3><p>Evidence-first public status of active research activity without exposing confidential protocols or participant data.</p><a href="{{ '/research-progress/' | relative_url }}">Open Research Status →</a></article>
        <article class="ae-card ae-card-academic-writing"><span>Academic Writing</span><h3>Textbook Development</h3><p>Public-safe Book Journey status for current textbook projects, from alignment and architecture through evidence readiness and later writing gates.</p><a href="{{ '/academic-writing/' | relative_url }}">Open Academic Writing →</a></article>
        <article class="ae-card"><span>Teaching Innovation · {{ ru_hepe.public_repository_count }} Public Repositories</span><h3>{{ ru_hepe.name }}</h3><p>A GitHub-based course ecosystem connecting the course hub, HED3505 pilot workspace, reusable assignment structures and student portfolio templates.</p><a href="{{ ru_hepe.profile_path | relative_url }}">Explore RU HEPE Learning →</a></article>
        <article class="ae-card"><span>Evidence</span><h3>Evidence Explorer</h3><p>Selected public claims connected to traceable academic sources and evidence boundaries.</p><a href="{{ '/evidence-explorer/' | relative_url }}">Open Evidence Explorer →</a></article>
        {% if hepe_current %}
        <article class="ae-card"><span>Curriculum Governance · Registered Release</span><h3>{{ hepe_current.course_code }} {{ hepe_current.document_type }} — {{ hepe_current.release_code | split: '-' | last }}</h3><p>Project-controlled public release for {{ hepe_current.course_code }} — {{ hepe_current.course_title_th }} with registered lineage, frozen SHA-256 integrity metadata and an explicit non-institutional authority boundary.</p><a href="{{ hepe_current.discovery_path | relative_url }}">Open HEPE Public Releases →</a></article>
        {% endif %}
      </div>
    </div>
  </section>

  <section class="ae-section" aria-labelledby="assistant-title">
    <div class="ae-shell ae-assistant">
      <div><div class="ae-eyebrow">Academic Assistant</div><h2 id="assistant-title">Ask about public academic work</h2><p class="ae-muted">Searches the local public index only. It does not access private files or generate unsupported claims.</p></div>
      <div class="ae-assistant-search" role="search"><input type="search" data-oa-search aria-label="Search public academic records" placeholder="Research, teaching, academic writing, curriculum, evidence…"><button type="button" data-oa-search-button>Search</button></div>
      <div class="ae-suggestions"><button type="button" data-oa-suggestion="research">Research</button><button type="button" data-oa-suggestion="teaching">Teaching</button><button type="button" data-oa-suggestion="academic writing textbook">Academic Writing</button><button type="button" data-oa-suggestion="curriculum quality">Curriculum &amp; QA</button><button type="button" data-oa-suggestion="evidence">Evidence</button></div>
      <div class="oa-ai-response" aria-live="polite"><div class="oa-ai-status" data-oa-ai-status>Search the verified public academic index.</div><div class="oa-ai-results" data-oa-ai-results></div></div>
    </div>
  </section>
</div>

<script src="{{ '/assets/js/option-17a.js' | relative_url }}" defer></script>

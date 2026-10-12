---
permalink: /
title: "Asst. Prof. Dr. Kasem Chooratna"
description: "Academic portfolio of Asst. Prof. Dr. Kasem Chooratna: Health and Physical Education, research, curriculum development, quality assurance and responsible digital innovation at Ramkhamhaeng University."
author_profile: false
classes: wide
header:
  overlay_color: "#0b2946"
---

{% assign teaching = site.data.teaching_ay2569 %}
{% assign ru_hepe = site.data.ru_hepe_learning %}
{% assign publication_count = site.publications | size %}
{% assign proceeding_count_2023 = site.data.conference_proceedings.items | size %}
{% assign proceeding_count_2026 = site.data.conference_proceedings_2026.items | size %}
{% assign proceeding_count = proceeding_count_2023 | plus: proceeding_count_2026 %}
{% assign scholarly_total = publication_count | plus: proceeding_count | plus: 2 %}

<link rel="stylesheet" href="{{ '/assets/css/academic-executive.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/home-academic-axis.css' | relative_url }}">

<div class="academic-executive modern-academic-v1">
  <section class="ae-hero" aria-labelledby="home-title">
    <div class="ae-shell ae-hero-grid">
      <div class="ae-hero-copy">
        <div class="ae-kicker">Ramkhamhaeng University · Thailand</div>
        <h1 id="home-title">Kasem Chooratna, Ph.D.</h1>
        <p class="ae-role">Assistant Professor · Department of Physical Education · Faculty of Education</p>
        <p class="ae-lead">Education, research and innovation for better learning and health — connecting Health &amp; Physical Education, curriculum development, quality assurance and responsible AI-enabled academic practice.</p>
        <div class="ae-actions">
          <a class="ae-btn ae-btn-gold" href="#featured-work">Explore My Work</a>
          <a class="ae-btn ae-btn-ghost" href="{{ '/cv/' | relative_url }}">Academic Profile</a>
        </div>
        <blockquote class="ae-quote">“Education, movement and evidence can work together to improve health, learning and society.”</blockquote>
      </div>
      <div class="ae-portrait-stage">
        <div class="ae-portrait-glow" aria-hidden="true"></div>
        <img class="ae-portrait" src="{{ '/images/profile-selected-2026.webp' | relative_url }}" alt="Formal portrait of Asst. Prof. Dr. Kasem Chooratna" width="480" height="600" decoding="async" fetchpriority="high">
        <div class="ae-portrait-axis" aria-label="Academic focus"><span>Education</span><span>Research</span><span>Quality</span><span>Innovation</span></div>
      </div>
    </div>
  </section>

  <section class="ae-pillars" aria-label="Core expertise">
    <div class="ae-shell ae-pillar-grid">
      <a href="{{ '/teaching/' | relative_url }}"><strong>Health &amp; Physical Education</strong><span>Learning, movement, health promotion and school health</span></a>
      <a href="{{ '/curriculum-quality/' | relative_url }}"><strong>Curriculum Development</strong><span>Learning outcomes, alignment, assessment and programme design</span></a>
      <a href="{{ '/curriculum-quality/' | relative_url }}"><strong>Quality Assurance · AUN-QA</strong><span>Evidence, evaluation and continuous academic improvement</span></a>
      <a href="{{ '/innovation-projects/' | relative_url }}"><strong>AI in Education</strong><span>Responsible digital systems and AI-enabled academic practice</span></a>
    </div>
  </section>

  <section class="ae-section" aria-labelledby="profile-title">
    <div class="ae-shell ae-about-grid">
      <article>
        <div class="ae-eyebrow">Academic Profile</div>
        <h2 id="profile-title">Learning, health and academic quality in one portfolio</h2>
        <p>My public academic portfolio brings together teaching, research, curriculum and quality assurance, academic writing, community engagement and digital innovation. Public claims on this site are intentionally bounded by available evidence.</p>
        <div class="ae-inline-links"><a href="{{ '/about/' | relative_url }}">About →</a><a href="{{ '/cv/' | relative_url }}">Academic CV →</a><a href="{{ '/evidence-explorer/' | relative_url }}">Evidence Explorer →</a></div>
      </article>
      <aside class="ae-snapshot" aria-label="Verified academic snapshot">
        <div><span>Verified journal publications</span><strong>{{ publication_count }}</strong></div>
        <div><span>Conference proceedings</span><strong>{{ proceeding_count }}</strong></div>
        <div><span>Degree research works</span><strong>2</strong></div>
        <div><span>AY2569 retained teaching records</span><strong>{{ teaching.summary.retained }}</strong></div>
      </aside>
    </div>
  </section>

  <section class="ae-section ae-section-dark" aria-labelledby="domains-title">
    <div class="ae-shell">
      <div class="ae-section-head"><div><div class="ae-eyebrow">What I Do</div><h2 id="domains-title">Academic work across connected domains</h2></div><a href="{{ '/knowledge-map/' | relative_url }}">Knowledge Map →</a></div>
      <div class="ae-expertise-grid">
        <article><span>01</span><h3>Teaching</h3><p>Evidence-informed course design and learning experiences in Health and Physical Education.</p></article>
        <article><span>02</span><h3>Research</h3><p>Inquiry connecting movement, health, education, wellbeing and real-world contexts.</p></article>
        <article><span>03</span><h3>Curriculum &amp; Quality</h3><p>PLO/CLO alignment, curriculum mapping, assessment, evaluation and AUN-QA-oriented improvement.</p></article>
        <article><span>04</span><h3>Digital Innovation</h3><p>Responsible AI, public academic systems and evidence-oriented digital workflows.</p></article>
      </div>
    </div>
  </section>

  <section class="ae-section" id="featured-work" aria-labelledby="featured-title">
    <div class="ae-shell">
      <div class="ae-section-head"><div><div class="ae-eyebrow">Featured Work</div><h2 id="featured-title">Four dimensions of academic practice</h2></div></div>
      <div class="ae-card-grid ae-featured-four">
        <article class="ae-card"><span>Research</span><h3>Research &amp; Innovation</h3><p>Public-safe research status and evidence-based development across health, movement and education.</p><a href="{{ '/research/' | relative_url }}">View Research →</a></article>
        <article class="ae-card"><span>Teaching &amp; Learning</span><h3>Teaching Portfolio</h3><p>Courses, learning design and retained public teaching evidence.</p><a href="{{ '/teaching/' | relative_url }}">View Teaching →</a></article>
        <article class="ae-card"><span>Curriculum &amp; QA</span><h3>Curriculum &amp; Quality</h3><p>Programme design, alignment, assessment and continuous improvement.</p><a href="{{ '/curriculum-quality/' | relative_url }}">View Curriculum &amp; QA →</a></article>
        <article class="ae-card"><span>Digital Innovation</span><h3>Academic Systems</h3><p>Responsible digital tools, public academic platforms and AI-enabled workflows.</p><a href="{{ '/innovation-projects/' | relative_url }}">View Innovation →</a></article>
      </div>
    </div>
  </section>

  <section class="ae-section ae-soft-section" aria-labelledby="research-title">
    <div class="ae-shell">
      <div class="ae-section-head"><div><div class="ae-eyebrow">Research &amp; Innovation</div><h2 id="research-title">Evidence before claims</h2></div><a href="{{ '/research-progress/' | relative_url }}">Research Status →</a></div>
      <div class="ae-output-grid">
        <article class="ae-flow-card"><h3>Research lifecycle</h3><p class="ae-muted">Public pages expose only evidence-safe status; confidential protocols and participant information remain outside the public site.</p><div class="ae-flow"><div><b>Question</b><span>Define the problem</span></div><em>→</em><div><b>Evidence</b><span>Build the basis</span></div><em>→</em><div><b>Study</b><span>Execute responsibly</span></div><em>→</em><div><b>Impact</b><span>Translate learning</span></div></div></article>
        <article class="ae-chart-card"><h3>Verified scholarly records</h3><p class="ae-muted">Counts below are generated from structured public repository data rather than manually claimed totals.</p><div class="ae-big-number"><strong>{{ scholarly_total }}</strong><span>records across journal publications, proceedings and degree research categories</span></div><div class="ae-legend"><span><i class="journal"></i>Journal {{ publication_count }}</span><span><i class="proceeding"></i>Proceedings {{ proceeding_count }}</span><span><i class="degree"></i>Degree research 2</span></div></article>
      </div>
    </div>
  </section>

  <section class="ae-section" aria-labelledby="teaching-title">
    <div class="ae-shell ae-about-grid">
      <article><div class="ae-eyebrow">Teaching</div><h2 id="teaching-title">From course design to learning evidence</h2><p>Teaching is presented as an academic practice: course intent, learning design, evidence of delivery and improvement are connected rather than shown as an isolated course list.</p><div class="ae-inline-links"><a href="{{ '/teaching/' | relative_url }}">Teaching Portfolio →</a><a href="{{ ru_hepe.profile_path | relative_url }}">RU HEPE Learning →</a></div></article>
      <aside class="ae-card ae-highlight-card"><span>Teaching Innovation</span><h3>{{ ru_hepe.name }}</h3><p>A GitHub-based learning ecosystem connecting public course resources and reusable learning structures.</p><strong class="ae-evidence-number">{{ ru_hepe.public_repository_count }}</strong><small>public repositories recorded in the structured site data</small></aside>
    </div>
  </section>

  <section class="ae-section ae-section-dark" aria-labelledby="qa-title">
    <div class="ae-shell"><div class="ae-section-head"><div><div class="ae-eyebrow">Curriculum &amp; Quality Assurance</div><h2 id="qa-title">Alignment, evidence and continuous improvement</h2></div><a href="{{ '/curriculum-quality/' | relative_url }}">Explore Curriculum &amp; QA →</a></div><p class="ae-wide-copy">Curriculum work is framed around transparent alignment among programme outcomes, course outcomes, learning experiences, assessment and evidence of improvement. Public pages distinguish project-controlled evidence from institutional authority.</p></div>
  </section>

  <section class="ae-section" aria-labelledby="outputs-title">
    <div class="ae-shell"><div class="ae-section-head"><div><div class="ae-eyebrow">Academic Outputs</div><h2 id="outputs-title">Scholarship and academic writing</h2></div><a href="{{ '/publications/' | relative_url }}">All Publications →</a></div><div class="ae-card-grid"><article class="ae-card"><span>Publications</span><h3>Research Articles</h3><p>Verified journal records maintained in the public academic collection.</p><a href="{{ '/publications/' | relative_url }}">Browse Publications →</a></article><article class="ae-card"><span>Proceedings</span><h3>Conference Work</h3><p>Conference records remain a distinct category so their academic meaning is preserved.</p><a href="{{ '/publications/' | relative_url }}">Browse Outputs →</a></article><article class="ae-card"><span>Academic Writing</span><h3>Textbook Development</h3><p>Public-safe development journeys without exposing private drafts or unsupported completion claims.</p><a href="{{ '/academic-writing/' | relative_url }}">Academic Writing →</a></article></div></div>
  </section>

  <section class="ae-section ae-soft-section" aria-labelledby="projects-title">
    <div class="ae-shell"><div class="ae-section-head"><div><div class="ae-eyebrow">Current Projects</div><h2 id="projects-title">Work in progress, with status boundaries</h2></div><a href="{{ '/current-work/' | relative_url }}">View Current Work →</a></div><div class="ae-card-grid"><article class="ae-card"><span>Teaching Innovation</span><h3>RU HEPE Learning</h3><p>Public learning resources and GitHub-based course infrastructure.</p><a href="{{ ru_hepe.profile_path | relative_url }}">Open Project →</a></article><article class="ae-card"><span>Research</span><h3>Research Command Center</h3><p>Evidence-first public lifecycle views for active research work.</p><a href="{{ '/research-progress/' | relative_url }}">Open Status →</a></article><article class="ae-card"><span>Evidence Infrastructure</span><h3>Evidence Explorer</h3><p>Traceable public claims with explicit evidence and authority boundaries.</p><a href="{{ '/evidence-explorer/' | relative_url }}">Open Explorer →</a></article></div></div>
  </section>

  <section class="ae-section ae-closing" aria-labelledby="closing-title"><div class="ae-shell"><div class="ae-eyebrow">Academic Portfolio</div><h2 id="closing-title">Education for healthier people and a better society.</h2><div class="ae-actions"><a class="ae-btn ae-btn-gold" href="{{ '/about/' | relative_url }}">About Kasem</a><a class="ae-btn ae-btn-outline" href="{{ '/cv/' | relative_url }}">Academic CV</a></div></div></section>
</div>

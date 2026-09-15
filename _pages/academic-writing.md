---
permalink: /academic-writing/
title: "Academic Textbook Writing"
description: "Public-safe status of academic textbook development, showing evidence-first writing journeys without exposing private drafts or unsupported completion claims."
author_profile: false
---

{% assign writing = site.data.academic_writing %}
{% assign public_projects = writing.projects | where: 'public', true %}

<link rel="stylesheet" href="{{ '/assets/css/academic-writing.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/progress-visual-system.css' | relative_url }}">

<div class="aw-page">
  <section class="aw-hero">
    <div class="aw-shell">
      <div class="aw-kicker">Academic Writing · Evidence-First Development</div>
      <h1>Academic Textbook Writing</h1>
      <p class="aw-lead">A public-safe view of textbook development from curriculum alignment through conceptual architecture, evidence readiness, writing, review and eventual publication.</p>
      <div class="aw-actions">
        <a class="aw-btn aw-btn-primary" href="{{ '/teaching/' | relative_url }}">Teaching Portfolio</a>
        <a class="aw-btn" href="{{ '/innovation-projects/' | relative_url }}">Academic Innovation</a>
      </div>
    </div>
  </section>

  <section class="aw-shell aw-overview" aria-labelledby="aw-overview-title">
    <div>
      <div class="aw-eyebrow">Book Journey</div>
      <h2 id="aw-overview-title">Progress is shown as verified gates, not percentages</h2>
      <p>Each textbook follows the same six-stage journey. A stage is highlighted only when the current academic workspace supports that public-safe status. Future stages remain muted rather than being presented as estimated completion.</p>
    </div>
    <aside class="aw-policy"><strong>Public disclosure boundary</strong><p>{{ writing.public_boundary }}</p><span>Registry reviewed {{ writing.last_reviewed | date: "%d %b %Y" }}.</span></aside>
  </section>

  <section class="aw-shell aw-projects" aria-label="Academic textbook development projects">
    {% for project in public_projects %}
    <article class="aw-project" id="{{ project.id | downcase }}">
      <header class="aw-project-head">
        <div>
          <span class="aw-code">{{ project.course_code }}</span>
          <h2>{{ project.title }}</h2>
          <p class="aw-status">{{ project.public_status }}</p>
        </div>
        <span class="aw-current-badge">Current: {{ project.current_step | capitalize }}</span>
      </header>

      <div class="aw-summary-grid">
        <div><span>Current focus</span><strong>{{ project.current_focus }}</strong></div>
        <div><span>Next verified gate</span><strong>{{ project.next_gate }}</strong></div>
      </div>

      <div class="aw-journey-wrap" role="region" aria-label="{{ project.course_code }} textbook journey" tabindex="0">
        <ol class="aw-journey">
          {% for step in writing.journey %}
            {% assign step_state = project.steps[step.id] %}
            <li class="aw-step" data-state="{{ step_state }}">
              <span class="aw-node" aria-hidden="true">{% if step_state == 'verified' %}✓{% else %}{{ forloop.index }}{% endif %}</span>
              <div class="aw-step-copy"><strong>{{ step.label }}</strong><span>{{ step_state | replace: '-', ' ' | capitalize }}</span><small>{{ step.description }}</small></div>
            </li>
          {% endfor %}
        </ol>
      </div>

      <div class="aw-evidence-note"><strong>Evidence boundary</strong><p>{{ project.evidence_note }}</p></div>
    </article>
    {% endfor %}
  </section>

  <section class="aw-shell aw-legend-section" aria-labelledby="aw-legend-title">
    <div class="aw-eyebrow">Status language</div>
    <h2 id="aw-legend-title">One visual grammar across academic projects</h2>
    <div class="aw-legend">
      <span data-state="verified">Verified</span>
      <span data-state="active">Active</span>
      <span data-state="next">Next gate</span>
      <span data-state="future">Future / not yet opened</span>
      <span data-state="locked">Locked until prior gates pass</span>
    </div>
  </section>
</div>

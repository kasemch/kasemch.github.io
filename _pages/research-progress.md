---
permalink: /research-progress/
title: "Research in Progress"
description: "Evidence-first status dashboard for current research projects, milestones, research stages, and public-safe project updates."
author_profile: false
---

<link rel="stylesheet" href="../assets/css/research-progress.css">

<div class="rpc-page" id="research-command-center">
  <section class="rpc-hero" aria-labelledby="rpc-title">
    <div class="rpc-shell rpc-hero-grid">
      <div>
        <p class="rpc-kicker">Research Command Center</p>
        <h1 id="rpc-title">Research in Progress</h1>
        <p class="rpc-lead">A public, evidence-first view of current research activity. Project stages are shown only when supported by verified project records; private research documents and participant-level information are never exposed here.</p>
        <div class="rpc-actions">
          <a class="rpc-btn rpc-btn-primary" href="../research/">Research profile</a>
          <a class="rpc-btn" href="../publications/">Verified publications</a>
        </div>
      </div>
      <aside class="rpc-hero-note" aria-label="Evidence policy">
        <span class="rpc-status-dot" aria-hidden="true"></span>
        <div>
          <strong>Evidence-first status</strong>
          <p>Unknown or unverified milestones remain explicitly unconfirmed rather than being estimated.</p>
        </div>
      </aside>
    </div>
  </section>

  <main class="rpc-shell">
    <section class="rpc-section" aria-labelledby="rpc-overview-title">
      <div class="rpc-section-head">
        <div>
          <p class="rpc-eyebrow">Portfolio overview</p>
          <h2 id="rpc-overview-title">Current research status at a glance</h2>
        </div>
        <p class="rpc-muted" id="rpc-last-refresh">Loading verified public records…</p>
      </div>
      <div class="rpc-metrics" id="rpc-metrics" aria-live="polite"></div>
    </section>

    <section class="rpc-section" aria-labelledby="rpc-pipeline-title">
      <div class="rpc-section-head">
        <div>
          <p class="rpc-eyebrow">Research pipeline</p>
          <h2 id="rpc-pipeline-title">Where active projects sit in the research lifecycle</h2>
        </div>
        <p class="rpc-muted">Stage placement reflects the latest public-safe verified record, not an estimated completion percentage.</p>
      </div>
      <div class="rpc-pipeline" id="rpc-pipeline" role="list" aria-label="Research lifecycle"></div>
    </section>

    <section class="rpc-section" aria-labelledby="rpc-featured-title">
      <div class="rpc-section-head">
        <div>
          <p class="rpc-eyebrow">Featured active research</p>
          <h2 id="rpc-featured-title">Verified project status</h2>
        </div>
      </div>
      <div id="rpc-featured"></div>
    </section>

    <section class="rpc-section" aria-labelledby="rpc-projects-title">
      <div class="rpc-section-head rpc-section-head-wrap">
        <div>
          <p class="rpc-eyebrow">Project register</p>
          <h2 id="rpc-projects-title">Current projects</h2>
        </div>
        <div class="rpc-filters" id="rpc-filters" aria-label="Filter projects"></div>
      </div>
      <div class="rpc-project-grid" id="rpc-project-grid"></div>
    </section>

    <section class="rpc-section" aria-labelledby="rpc-boundary-title">
      <article class="rpc-boundary-card">
        <div>
          <p class="rpc-eyebrow">Public evidence boundary</p>
          <h2 id="rpc-boundary-title">What this dashboard does — and does not — claim</h2>
        </div>
        <div class="rpc-boundary-grid">
          <div><strong>Displayed</strong><p>Verified project identity, public-safe research themes, documented status labels, and dates supported by controlled records.</p></div>
          <div><strong>Not displayed</strong><p>Participant data, confidential protocols, unpublished findings, reviewer correspondence, private Drive links, or inferred completion percentages.</p></div>
          <div><strong>When evidence is incomplete</strong><p>The interface shows “Not publicly confirmed” instead of filling gaps with assumptions.</p></div>
        </div>
      </article>
    </section>
  </main>
</div>

<script src="../assets/js/research-progress.js" defer></script>

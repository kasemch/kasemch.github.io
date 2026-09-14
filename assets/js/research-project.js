(() => {
  'use strict';

  const DATA_URL = '../assets/data/research-projects.json';
  const root = document.querySelector('#rpd-root');

  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const formatDate = (value) => {
    if (!value) return 'Not publicly confirmed';
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
  };

  const stateLabel = (state) => ({
    verified: 'Verified',
    active: 'Active',
    'not-publicly-confirmed': 'Not publicly confirmed'
  }[state] || state || 'Not publicly confirmed');

  const render = (project, data) => {
    const themes = (project.themes || []).map((item) => `<span class="rpd-chip">${escapeHtml(item)}</span>`).join('');
    const milestones = (project.milestones || []).map((item, index) => `
      <li class="rpd-timeline-item" data-state="${escapeHtml(item.state)}">
        <span class="rpd-timeline-index">${String(index + 1).padStart(2, '0')}</span>
        <div><strong>${escapeHtml(item.label)}</strong><span>${escapeHtml(stateLabel(item.state))}</span></div>
      </li>`).join('');
    const outputs = (project.publicOutputs || []).map((item) => `
      <article class="rpd-output">
        <strong>${escapeHtml(item.label)}</strong>
        <span>${escapeHtml(stateLabel(item.state))}</span>
      </article>`).join('') || '<p class="rpd-muted">No public-safe output record is available.</p>';
    const evidence = project.publicEvidenceBinding || {};

    root.innerHTML = `
      <section class="rpd-hero">
        <div class="rpd-hero-top">
          <div>
            <p class="rpd-kicker">${escapeHtml(project.shortTitle)} · ${escapeHtml(project.portfolioClassLabel || project.statusLabel)}</p>
            <h1>${escapeHtml(project.title)}</h1>
            <p class="rpd-title-th">${escapeHtml(project.titleTh)}</p>
          </div>
          <span class="rpd-badge">${escapeHtml(project.statusLabel)}</span>
        </div>
        <p class="rpd-lead">${escapeHtml(project.researchFocus || project.currentPhase)}</p>
        <div class="rpd-chips">${themes}</div>
      </section>

      <section class="rpd-grid rpd-summary" aria-label="Project status summary">
        <article><span>Portfolio class</span><strong>${escapeHtml(project.portfolioClassLabel || 'Not classified')}</strong></article>
        <article><span>Latest verified stage</span><strong>${escapeHtml(project.stage)}</strong></article>
        <article><span>Evidence verified</span><strong>${escapeHtml(formatDate(project.lastVerified))}</strong></article>
      </section>

      <section class="rpd-section">
        <p class="rpd-eyebrow">Current gate</p>
        <h2>Where the project is now</h2>
        <div class="rpd-grid rpd-two">
          <article class="rpd-card"><span>Current workstream</span><strong>${escapeHtml(project.currentWorkstream || project.currentPhase)}</strong></article>
          <article class="rpd-card"><span>Next evidence gate</span><strong>${escapeHtml(project.nextEvidenceGate || 'Not publicly confirmed')}</strong></article>
        </div>
      </section>

      <section class="rpd-section">
        <p class="rpd-eyebrow">Lifecycle</p>
        <h2>Verified public timeline</h2>
        <p class="rpd-muted">Unverified stages remain explicitly unconfirmed; this timeline is not a completion-percentage estimate.</p>
        <ol class="rpd-timeline">${milestones}</ol>
      </section>

      <section class="rpd-section">
        <p class="rpd-eyebrow">Outputs</p>
        <h2>Public-safe project outputs</h2>
        <div class="rpd-output-grid">${outputs}</div>
      </section>

      <section class="rpd-section">
        <p class="rpd-eyebrow">Evidence binding</p>
        <h2>Traceability without exposing private records</h2>
        <article class="rpd-evidence">
          <strong>${escapeHtml(evidence.label || project.verificationStatus || 'Controlled evidence status')}</strong>
          <p>${escapeHtml(evidence.note || project.evidenceNote)}</p>
          <p><strong>Project-publication link:</strong> ${project.publicationLinked ? 'Verified' : 'Not yet verified'}</p>
          <div class="rpd-actions">
            <a class="rpd-btn rpd-btn-primary" href="${escapeHtml(evidence.explorerPath || '../evidence-explorer/')}">Open Evidence Explorer</a>
            <a class="rpd-btn" href="../research-progress/">Research Command Center</a>
          </div>
        </article>
      </section>

      <section class="rpd-section rpd-boundary">
        <p><strong>Public evidence boundary.</strong> This page does not expose private Drive links, participant data, confidential protocols, unpublished findings, reviewer correspondence, or inferred milestones. Portfolio evidence last verified: ${escapeHtml(formatDate(data.lastVerified))}.</p>
      </section>`;
  };

  const failClosed = (message) => {
    root.innerHTML = `<div class="rpd-error"><strong>Project record unavailable.</strong><p>${escapeHtml(message)}</p><a class="rpd-btn" href="../research-progress/">Return to Research Command Center</a></div>`;
  };

  const init = async () => {
    try {
      const projectId = new URLSearchParams(window.location.search).get('id');
      if (!projectId) {
        failClosed('No project identifier was supplied.');
        return;
      }

      const response = await fetch(DATA_URL, { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const project = (data.projects || []).find((item) => item.id === projectId);

      if (!project || project.visibility !== 'public-summary') {
        failClosed('No public-safe verified project record matches this identifier.');
        return;
      }

      render(project, data);
    } catch (error) {
      console.error('Research Project Detail:', error);
      failClosed('The verified research register could not be loaded. The page failed closed rather than displaying stale or fabricated information.');
    }
  };

  document.addEventListener('DOMContentLoaded', init);
})();

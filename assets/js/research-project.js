(() => {
  'use strict';

  const DATA_URL = '../assets/data/research-projects.json';
  const root = document.querySelector('#rpd-root');

  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#039;');

  const formatDate = (value) => {
    if (!value) return 'Not publicly confirmed';
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
  };

  const stateLabel = (state) => ({ verified: 'Verified', active: 'Active', 'not-publicly-confirmed': 'Not publicly confirmed' }[state] || state || 'Not publicly confirmed');

  const render = (project, data) => {
    const themes = (project.themes || []).map((item) => `<span class="rpd-chip">${escapeHtml(item)}</span>`).join('');
    const outputsById = new Map((project.publicOutputs || []).map((item) => [item.id, item]));

    const milestones = (project.milestones || []).map((item, index) => {
      const linked = (item.linkedOutputIds || []).map((id) => outputsById.get(id)).filter(Boolean);
      const linkedSummary = linked.length
        ? linked.map((output) => escapeHtml(output.label)).join(' · ')
        : 'No verified public-safe output binding';
      return `
        <li class="rpd-timeline-item" data-state="${escapeHtml(item.state)}">
          <span class="rpd-timeline-index">${String(index + 1).padStart(2, '0')}</span>
          <div>
            <strong>${escapeHtml(item.label)}</strong>
            <span>${escapeHtml(stateLabel(item.state))}</span>
            <span class="rpd-binding-line">Output binding: ${linkedSummary}</span>
          </div>
        </li>`;
    }).join('');

    const outputs = (project.publicOutputs || []).map((item) => `
      <article class="rpd-output">
        <strong>${escapeHtml(item.label)}</strong>
        <span>${escapeHtml(item.type || 'Project output')}</span>
        <span>${escapeHtml(stateLabel(item.state))}</span>
        <span>${item.publicSourceAvailable ? 'Public source available' : 'Controlled source; public file not exposed'}</span>
      </article>`).join('') || '<p class="rpd-muted">No public-safe output record is available.</p>';

    const traceabilityRows = (project.milestones || []).map((item) => {
      const linked = (item.linkedOutputIds || []).map((id) => outputsById.get(id)).filter(Boolean);
      const publicationCount = (item.publicationIds || []).length;
      return `
        <tr>
          <td>${escapeHtml(item.label)}</td>
          <td><span class="rpd-state rpd-state-${escapeHtml(item.state)}">${escapeHtml(stateLabel(item.state))}</span></td>
          <td>${linked.length ? linked.map((output) => escapeHtml(output.label)).join('<br>') : '—'}</td>
          <td>${publicationCount ? `${publicationCount} verified` : 'None verified'}</td>
        </tr>`;
    }).join('');

    const publications = project.publicationBindings || [];
    const publicationBlock = publications.length
      ? publications.map((item) => `<article class="rpd-publication"><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.status || 'Verified link')}</span></article>`).join('')
      : `<article class="rpd-publication rpd-publication-empty"><strong>No verified BMO publication binding yet</strong><p>${escapeHtml(project.publicationBindingNote || 'No publication has been verified as a project output.')}</p></article>`;

    const evidence = project.publicEvidenceBinding || {};

    root.innerHTML = `
      <section class="rpd-hero">
        <div class="rpd-hero-top">
          <div><p class="rpd-kicker">${escapeHtml(project.shortTitle)} · ${escapeHtml(project.portfolioClassLabel || project.statusLabel)}</p><h1>${escapeHtml(project.title)}</h1><p class="rpd-title-th">${escapeHtml(project.titleTh)}</p></div>
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

      <section class="rpd-section"><p class="rpd-eyebrow">Current gate</p><h2>Where the project is now</h2>
        <div class="rpd-grid rpd-two">
          <article class="rpd-card"><span>Current workstream</span><strong>${escapeHtml(project.currentWorkstream || project.currentPhase)}</strong></article>
          <article class="rpd-card"><span>Next evidence gate</span><strong>${escapeHtml(project.nextEvidenceGate || 'Not publicly confirmed')}</strong></article>
        </div>
      </section>

      <section class="rpd-section"><p class="rpd-eyebrow">Lifecycle</p><h2>Verified public timeline</h2><p class="rpd-muted">Each stage is linked only to outputs whose relationship to that milestone is itself controlled and verified. Unverified stages remain unconfirmed.</p><ol class="rpd-timeline">${milestones}</ol></section>

      <section class="rpd-section"><p class="rpd-eyebrow">Traceability</p><h2>Milestone → Output → Publication</h2>
        <div class="rpd-table-wrap"><table class="rpd-trace-table"><thead><tr><th>Milestone</th><th>Status</th><th>Bound output</th><th>Publication</th></tr></thead><tbody>${traceabilityRows}</tbody></table></div>
      </section>

      <section class="rpd-section"><p class="rpd-eyebrow">Outputs</p><h2>Public-safe project outputs</h2><div class="rpd-output-grid">${outputs}</div></section>

      <section class="rpd-section"><p class="rpd-eyebrow">Publication binding</p><h2>Verified publications linked to this project</h2><div class="rpd-publication-grid">${publicationBlock}</div>
        <div class="rpd-actions"><a class="rpd-btn" href="${escapeHtml(project.publicationRegisterPath || '../publications/')}">Open publication register</a></div>
      </section>

      <section class="rpd-section"><p class="rpd-eyebrow">Evidence binding</p><h2>Traceability without exposing private records</h2>
        <article class="rpd-evidence">
          <strong>${escapeHtml(evidence.label || project.verificationStatus || 'Controlled evidence status')}</strong>
          <p>${escapeHtml(evidence.note || project.evidenceNote)}</p>
          <p><strong>Project-publication link:</strong> ${project.publicationLinked ? 'Verified' : 'Not yet verified'}</p>
          <p><strong>Public evidence register:</strong> BMO-specific controlled source files are not published there unless a suitable public source becomes available.</p>
          <div class="rpd-actions"><a class="rpd-btn rpd-btn-primary" href="${escapeHtml(evidence.explorerPath || '../evidence-explorer/')}">Browse public Evidence Explorer</a><a class="rpd-btn" href="../research-progress/">Research Command Center</a></div>
        </article>
      </section>

      <section class="rpd-section rpd-boundary"><p><strong>Public evidence boundary.</strong> This page does not expose private Drive links, participant data, confidential protocols, unpublished findings, reviewer correspondence, or inferred milestones. Portfolio evidence last verified: ${escapeHtml(formatDate(data.lastVerified))}.</p></section>`;
  };

  const failClosed = (message) => {
    root.innerHTML = `<div class="rpd-error"><strong>Project record unavailable.</strong><p>${escapeHtml(message)}</p><a class="rpd-btn" href="../research-progress/">Return to Research Command Center</a></div>`;
  };

  const init = async () => {
    try {
      const projectId = new URLSearchParams(window.location.search).get('id');
      if (!projectId) return failClosed('No project identifier was supplied.');
      const response = await fetch(DATA_URL, { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const project = (data.projects || []).find((item) => item.id === projectId);
      if (!project || project.visibility !== 'public-summary') return failClosed('No public-safe verified project record matches this identifier.');
      render(project, data);
    } catch (error) {
      console.error('Research Project Detail:', error);
      failClosed('The verified research register could not be loaded. The page failed closed rather than displaying stale or fabricated information.');
    }
  };

  document.addEventListener('DOMContentLoaded', init);
})();

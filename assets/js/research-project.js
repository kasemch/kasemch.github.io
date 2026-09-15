(() => {
  'use strict';

  const DATA_URL = '../assets/data/research-projects.json';
  const DEFAULT_MATRIX_URL = '../assets/data/research-evidence-matrix.json';
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

  const stateLabel = (state) => ({
    verified: 'Verified',
    active: 'Active',
    'not-publicly-confirmed': 'Not publicly confirmed'
  }[state] || state || 'Not publicly confirmed');

  const humanize = (value = '') => String(value).replaceAll('-', ' ');

  const render = (project, data, matrix) => {
    const themes = (project.themes || []).map((item) => `<span class="rpd-chip">${escapeHtml(item)}</span>`).join('');
    const outputsById = new Map((project.publicOutputs || []).map((item) => [item.id, item]));
    const milestonesById = new Map((project.milestones || []).map((item) => [item.id, item]));
    const matrixProjectId = project.matrixProjectId || project.id;
    const matrixRows = (matrix?.rows || []).filter((row) => row.projectId === matrixProjectId);

    const matrixRowsByMilestone = new Map();
    matrixRows.forEach((row) => {
      if (!matrixRowsByMilestone.has(row.milestoneId)) matrixRowsByMilestone.set(row.milestoneId, []);
      matrixRowsByMilestone.get(row.milestoneId).push(row);
    });

    const milestones = (project.milestones || []).map((item, index) => {
      const rows = matrixRowsByMilestone.get(item.id) || [];
      const boundOutputs = rows.map((row) => row.outputId && outputsById.get(row.outputId)).filter(Boolean);
      const linkedSummary = boundOutputs.length
        ? boundOutputs.map((output) => escapeHtml(output.label)).join(' · ')
        : 'No verified public-safe output binding';
      return `
        <li class="rpd-timeline-item" data-state="${escapeHtml(item.state)}">
          <span class="rpd-timeline-index">${String(index + 1).padStart(2, '0')}</span>
          <div>
            <strong>${escapeHtml(item.label)}</strong>
            <span>${escapeHtml(stateLabel(item.state))}</span>
            <span class="rpd-binding-line">Matrix binding: ${linkedSummary}</span>
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

    const matrixTableRows = matrixRows.map((row) => {
      const milestone = milestonesById.get(row.milestoneId);
      const output = row.outputId ? outputsById.get(row.outputId) : null;
      const publicationLabel = row.publicationId ? escapeHtml(row.publicationId) : 'None verified';
      return `
        <tr>
          <td>${escapeHtml(milestone?.label || row.milestoneId)}</td>
          <td>${escapeHtml(humanize(row.evidenceClass))}</td>
          <td><span class="rpd-state rpd-state-${escapeHtml(row.evidenceStatus)}">${escapeHtml(stateLabel(row.evidenceStatus))}</span></td>
          <td>${output ? escapeHtml(output.label) : '—'}</td>
          <td>${publicationLabel}</td>
          <td>${escapeHtml(humanize(row.relationshipStatus))}</td>
        </tr>`;
    }).join('');

    const matrixBlock = matrixRows.length
      ? `<div class="rpd-table-wrap"><table class="rpd-trace-table"><thead><tr><th>Milestone</th><th>Evidence class</th><th>Evidence status</th><th>Output</th><th>Publication</th><th>Relationship</th></tr></thead><tbody>${matrixTableRows}</tbody></table></div>`
      : '<div class="rpd-error"><strong>Evidence matrix unavailable for this project.</strong><p>No public-safe relationship rows were found, so relationship-level traceability is not inferred.</p></div>';

    const publications = project.publicationBindings || [];
    const publicationBlock = publications.length
      ? publications.map((item) => `<article class="rpd-publication"><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.status || 'Verified link')}</span></article>`).join('')
      : `<article class="rpd-publication rpd-publication-empty"><strong>No verified ${escapeHtml(project.shortTitle)} publication binding yet</strong><p>${escapeHtml(project.publicationBindingNote || 'No publication has been verified as a project output.')}</p></article>`;

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

      <section class="rpd-section"><p class="rpd-eyebrow">Lifecycle</p><h2>Verified public timeline</h2><p class="rpd-muted">Lifecycle bindings are resolved from the public research evidence matrix. Unverified stages remain unconfirmed.</p><ol class="rpd-timeline">${milestones}</ol></section>

      <section class="rpd-section"><p class="rpd-eyebrow">Research evidence matrix</p><h2>Project × Milestone × Evidence × Output × Publication</h2><p class="rpd-muted">This matrix is relationship-level metadata only. Controlled source files remain outside the public repository.</p>${matrixBlock}</section>

      <section class="rpd-section"><p class="rpd-eyebrow">Outputs</p><h2>Public-safe project outputs</h2><div class="rpd-output-grid">${outputs}</div></section>

      <section class="rpd-section"><p class="rpd-eyebrow">Publication binding</p><h2>Verified publications linked to this project</h2><div class="rpd-publication-grid">${publicationBlock}</div>
        <div class="rpd-actions"><a class="rpd-btn" href="${escapeHtml(project.publicationRegisterPath || '../publications/')}">Open publication register</a></div>
      </section>

      <section class="rpd-section"><p class="rpd-eyebrow">Evidence binding</p><h2>Traceability without exposing private records</h2>
        <article class="rpd-evidence">
          <strong>${escapeHtml(evidence.label || project.verificationStatus || 'Controlled evidence status')}</strong>
          <p>${escapeHtml(evidence.note || project.evidenceNote)}</p>
          <p><strong>Matrix status:</strong> ${matrixRows.length} public-safe relationship row${matrixRows.length === 1 ? '' : 's'} loaded; matrix last verified ${escapeHtml(formatDate(matrix?.lastVerified))}.</p>
          <p><strong>Project-publication link:</strong> ${project.publicationLinked ? 'Verified' : 'Not yet verified'}</p>
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

      const registryResponse = await fetch(DATA_URL, { cache: 'no-store' });
      if (!registryResponse.ok) throw new Error(`Registry HTTP ${registryResponse.status}`);
      const data = await registryResponse.json();
      const project = (data.projects || []).find((item) => item.id === projectId);
      if (!project || project.visibility !== 'public-summary') return failClosed('No public-safe verified project record matches this identifier.');

      let matrix = { rows: [], lastVerified: null };
      try {
        const matrixResponse = await fetch(data.matrixPath || DEFAULT_MATRIX_URL, { cache: 'no-store' });
        if (!matrixResponse.ok) throw new Error(`Matrix HTTP ${matrixResponse.status}`);
        matrix = await matrixResponse.json();
      } catch (matrixError) {
        console.error('Research Evidence Matrix:', matrixError);
      }

      render(project, data, matrix);
    } catch (error) {
      console.error('Research Project Detail:', error);
      failClosed('The verified research register could not be loaded. The page failed closed rather than displaying stale or fabricated information.');
    }
  };

  document.addEventListener('DOMContentLoaded', init);
})();

(() => {
  'use strict';

  const DATA_URL = '../assets/data/research-projects.json';

  const $ = (selector) => document.querySelector(selector);
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
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    }).format(date);
  };

  const metricCard = (value, label) => `
    <article class="rpc-metric">
      <strong>${escapeHtml(value)}</strong>
      <span>${escapeHtml(label)}</span>
    </article>`;

  const renderMetrics = (data) => {
    const projects = data.projects || [];
    const active = projects.filter((p) => p.status === 'active').length;
    const verifiedCore = projects.filter((p) => p.stageIndex >= 0).length;
    const laterConfirmed = projects.filter((p) => p.stageIndex > 0).length;

    $('#rpc-metrics').innerHTML = [
      metricCard(active, 'Active projects'),
      metricCard(verifiedCore, 'Verified public project records'),
      metricCard(laterConfirmed, 'Projects with later lifecycle stages publicly confirmed'),
      metricCard(formatDate(data.lastVerified), 'Portfolio evidence last verified')
    ].join('');

    $('#rpc-last-refresh').textContent = `Evidence last verified: ${formatDate(data.lastVerified)}`;
  };

  const renderPipeline = (data) => {
    const projects = data.projects || [];
    const stages = data.pipeline || [];

    $('#rpc-pipeline').innerHTML = stages.map((stage, index) => {
      const count = projects.filter((p) => p.stageIndex === index).length;
      return `
        <article class="rpc-stage ${count ? 'is-active' : ''}" role="listitem">
          <span class="rpc-stage-index">0${index + 1}</span>
          <strong>${escapeHtml(stage)}</strong>
          <span class="rpc-stage-count">${count ? `${count} project${count === 1 ? '' : 's'} at latest verified public stage` : 'No project publicly confirmed here'}</span>
        </article>`;
    }).join('');
  };

  const renderFeatured = (data) => {
    const project = (data.projects || []).find((p) => p.featured) || (data.projects || [])[0];
    const mount = $('#rpc-featured');

    if (!project) {
      mount.innerHTML = '<div class="rpc-error">No public-safe active research record is currently available.</div>';
      return;
    }

    const themes = (project.themes || []).map((theme) => `<span class="rpc-theme">${escapeHtml(theme)}</span>`).join('');
    const verifiedMilestones = (project.milestones || []).filter((item) => item.state === 'verified').length;
    const totalMilestones = (project.milestones || []).length;

    mount.innerHTML = `
      <article class="rpc-feature-card">
        <div class="rpc-feature-top">
          <div>
            <div class="rpc-project-code">${escapeHtml(project.shortTitle)}</div>
            <h3>${escapeHtml(project.title)}</h3>
            <p class="rpc-title-th">${escapeHtml(project.titleTh)}</p>
          </div>
          <div><span class="rpc-badge">${escapeHtml(project.statusLabel)}</span></div>
        </div>

        <div class="rpc-feature-meta">
          <div class="rpc-meta-box">
            <span>Latest verified public stage</span>
            <strong>${escapeHtml(project.stage)}</strong>
          </div>
          <div class="rpc-meta-box">
            <span>Current public-safe description</span>
            <strong>${escapeHtml(project.currentPhase)}</strong>
          </div>
          <div class="rpc-meta-box">
            <span>Verified milestone records</span>
            <strong>${verifiedMilestones} of ${totalMilestones}</strong>
          </div>
        </div>

        <div class="rpc-theme-list" aria-label="Research themes">${themes}</div>

        <div class="rpc-evidence-box">
          <strong>Evidence note</strong>
          <p>${escapeHtml(project.evidenceNote)}</p>
        </div>
      </article>`;
  };

  const projectCard = (project) => `
    <article class="rpc-project-card" data-status="${escapeHtml(project.status)}">
      <div class="rpc-feature-top">
        <span class="rpc-project-code">${escapeHtml(project.shortTitle)}</span>
        <span class="rpc-badge">${escapeHtml(project.statusLabel)}</span>
      </div>
      <h3>${escapeHtml(project.title)}</h3>
      <p><strong>Latest verified public stage:</strong> ${escapeHtml(project.stage)}</p>
      <p>${escapeHtml(project.currentPhase)}</p>
      <div class="rpc-project-footer">
        <span>Verified ${escapeHtml(formatDate(project.lastVerified))}</span>
        <span>${escapeHtml(project.visibility === 'public-summary' ? 'Public summary' : project.visibility)}</span>
      </div>
    </article>`;

  const renderProjects = (data) => {
    const projects = data.projects || [];
    const grid = $('#rpc-project-grid');
    const filters = $('#rpc-filters');

    grid.innerHTML = projects.length
      ? projects.map(projectCard).join('')
      : '<div class="rpc-error">No public-safe project records are available.</div>';

    const statusLabels = new Map([['all', 'All']]);
    projects.forEach((p) => statusLabels.set(p.status, p.statusLabel));

    filters.innerHTML = [...statusLabels.entries()].map(([key, label], index) => `
      <button class="rpc-filter ${index === 0 ? 'is-active' : ''}" type="button" data-filter="${escapeHtml(key)}" aria-pressed="${index === 0 ? 'true' : 'false'}">${escapeHtml(label)}</button>`
    ).join('');

    filters.addEventListener('click', (event) => {
      const button = event.target.closest('.rpc-filter');
      if (!button) return;
      const selected = button.dataset.filter;

      filters.querySelectorAll('.rpc-filter').forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      grid.querySelectorAll('.rpc-project-card').forEach((card) => {
        card.hidden = selected !== 'all' && card.dataset.status !== selected;
      });
    });
  };

  const renderError = () => {
    const message = '<div class="rpc-error">The research status register could not be loaded. The page has failed closed rather than displaying stale or fabricated status information.</div>';
    ['#rpc-metrics', '#rpc-pipeline', '#rpc-featured', '#rpc-project-grid'].forEach((selector) => {
      const node = $(selector);
      if (node) node.innerHTML = message;
    });
    const refresh = $('#rpc-last-refresh');
    if (refresh) refresh.textContent = 'Evidence status unavailable';
  };

  const init = async () => {
    try {
      const response = await fetch(DATA_URL, { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();

      renderMetrics(data);
      renderPipeline(data);
      renderFeatured(data);
      renderProjects(data);
    } catch (error) {
      console.error('Research Command Center:', error);
      renderError();
    }
  };

  document.addEventListener('DOMContentLoaded', init);
})();

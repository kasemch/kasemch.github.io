(() => {
  'use strict';

  const script = document.currentScript;
  const DATA_URL = script?.dataset?.registryUrl;
  const PROJECT_BASE = script?.dataset?.projectBase;

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
    const active = projects.filter((p) => p.portfolioClass === 'verified-active').length;
    const candidates = projects.filter((p) => p.portfolioClass === 'candidate').length;
    const completed = projects.filter((p) => p.portfolioClass === 'completed').length;
    const publicationLinked = projects.filter((p) => p.publicationLinked === true).length;

    $('#rpc-metrics').innerHTML = [
      metricCard(active, 'Verified Active'),
      metricCard(candidates, 'Public-safe Candidates'),
      metricCard(completed, 'Verified Completed'),
      metricCard(publicationLinked, 'Publication-linked projects')
    ].join('');

    $('#rpc-last-refresh').textContent = `Portfolio evidence last verified: ${formatDate(data.lastVerified)}`;
  };

  const renderPortfolioClasses = (data) => {
    const mount = $('#rpc-registry-classes');
    if (!mount) return;
    const projects = data.projects || [];
    const classes = data.portfolioClasses || [];
    mount.innerHTML = classes.map((item) => {
      const count = item.id === 'publication-linked'
        ? projects.filter((p) => p.publicationLinked === true).length
        : projects.filter((p) => p.portfolioClass === item.id).length;
      return `<div><strong>${escapeHtml(item.label)} · ${count}</strong><p>${escapeHtml(item.description)}</p></div>`;
    }).join('');
  };

  const renderPipeline = (data) => {
    const projects = data.projects || [];
    const stages = data.pipeline || [];
    $('#rpc-pipeline').innerHTML = stages.map((stage, index) => {
      const count = projects.filter((p) => p.stageIndex === index && p.portfolioClass !== 'candidate').length;
      return `
        <article class="rpc-stage ${count ? 'is-active' : ''}" role="listitem">
          <span class="rpc-stage-index">0${index + 1}</span>
          <strong>${escapeHtml(stage)}</strong>
          <span class="rpc-stage-count">${count ? `${count} project${count === 1 ? '' : 's'} at latest verified public stage` : 'No project publicly confirmed here'}</span>
        </article>`;
    }).join('');
  };

  const renderFeatured = (data) => {
    const project = (data.projects || []).find((p) => p.featured && p.portfolioClass === 'verified-active')
      || (data.projects || []).find((p) => p.portfolioClass === 'verified-active');
    const mount = $('#rpc-featured');
    if (!project) {
      mount.innerHTML = '<div class="rpc-error">No public-safe active research record is currently available.</div>';
      return;
    }

    const themes = (project.themes || []).map((theme) => `<span class="rpc-theme">${escapeHtml(theme)}</span>`).join('');
    const documentedMilestones = (project.milestones || []).filter((item) => ['verified', 'active'].includes(item.state)).length;
    const totalMilestones = (project.milestones || []).length;
    const currentWorkstream = project.currentWorkstream || project.currentPhase || 'Not publicly confirmed';
    const nextEvidenceGate = project.nextEvidenceGate || 'Not publicly confirmed';
    const verificationStatus = project.verificationStatus || 'Controlled public-safe record';
    const detailPath = project.id && PROJECT_BASE ? `${PROJECT_BASE}?id=${encodeURIComponent(project.id)}` : '';

    mount.innerHTML = `
      <article class="rpc-feature-card">
        <div class="rpc-feature-top">
          <div><div class="rpc-project-code">${escapeHtml(project.shortTitle)}</div><h3>${escapeHtml(project.title)}</h3><p class="rpc-title-th">${escapeHtml(project.titleTh)}</p></div>
          <div><span class="rpc-badge">${escapeHtml(project.portfolioClassLabel || project.statusLabel)}</span></div>
        </div>
        <div class="rpc-feature-meta">
          <div class="rpc-meta-box"><span>Portfolio class</span><strong>${escapeHtml(project.portfolioClassLabel || 'Not classified')}</strong></div>
          <div class="rpc-meta-box"><span>Latest verified public stage</span><strong>${escapeHtml(project.stage)}</strong></div>
          <div class="rpc-meta-box"><span>Documented lifecycle points</span><strong>${documentedMilestones} of ${totalMilestones}</strong></div>
        </div>
        <div class="rpc-theme-list" aria-label="Research themes">${themes}</div>
        <div class="rpc-evidence-box">
          <strong>Current governed workstream</strong>
          <p>${escapeHtml(currentWorkstream)}</p>
          <p><strong>Next evidence gate:</strong> ${escapeHtml(nextEvidenceGate)}</p>
          <p><strong>Publication link:</strong> ${project.publicationLinked ? 'Verified project-publication link available' : 'No verified project-publication link yet'}</p>
          <p><strong>Verification:</strong> ${escapeHtml(verificationStatus)}</p>
          <p><strong>Evidence note:</strong> ${escapeHtml(project.evidenceNote)}</p>
        </div>
        <div class="rpc-actions">${detailPath ? `<a class="rpc-btn rpc-btn-primary" href="${escapeHtml(detailPath)}">View project detail</a>` : ''}</div>
      </article>`;
  };

  const projectCard = (project) => {
    const detailPath = project.id && PROJECT_BASE ? `${PROJECT_BASE}?id=${encodeURIComponent(project.id)}` : '';
    return `
      <article class="rpc-project-card" data-class="${escapeHtml(project.portfolioClass || '')}" data-publication-linked="${project.publicationLinked === true ? 'true' : 'false'}">
        <div class="rpc-feature-top"><span class="rpc-project-code">${escapeHtml(project.shortTitle)}</span><span class="rpc-badge">${escapeHtml(project.portfolioClassLabel || project.statusLabel)}</span></div>
        <h3>${escapeHtml(project.title)}</h3>
        <p><strong>Research status:</strong> ${escapeHtml(project.statusLabel)}</p>
        <p><strong>Latest verified public stage:</strong> ${escapeHtml(project.stage)}</p>
        <p>${escapeHtml(project.currentPhase)}</p>
        ${project.currentWorkstream ? `<p><strong>Current workstream:</strong> ${escapeHtml(project.currentWorkstream)}</p>` : ''}
        ${project.nextEvidenceGate ? `<p><strong>Next evidence gate:</strong> ${escapeHtml(project.nextEvidenceGate)}</p>` : ''}
        <div class="rpc-actions">${detailPath ? `<a class="rpc-btn" href="${escapeHtml(detailPath)}">View project</a>` : ''}</div>
        <div class="rpc-project-footer"><span>Verified ${escapeHtml(formatDate(project.lastVerified))}</span><span>${project.publicationLinked ? 'Publication-linked' : 'No verified publication link'}</span></div>
      </article>`;
  };

  const renderProjects = (data) => {
    const projects = data.projects || [];
    const grid = $('#rpc-project-grid');
    const filters = $('#rpc-filters');
    const classes = data.portfolioClasses || [];
    grid.innerHTML = projects.length ? projects.map(projectCard).join('') : '<div class="rpc-error">No public-safe project records are available.</div>';

    const filterItems = [{ id: 'all', label: 'All public records' }, ...classes.map((item) => ({ id: item.id, label: item.label }))];
    filters.innerHTML = filterItems.map((item, index) => {
      const count = item.id === 'all' ? projects.length : item.id === 'publication-linked' ? projects.filter((p) => p.publicationLinked === true).length : projects.filter((p) => p.portfolioClass === item.id).length;
      return `<button class="rpc-filter ${index === 0 ? 'is-active' : ''}" type="button" data-filter="${escapeHtml(item.id)}" aria-pressed="${index === 0 ? 'true' : 'false'}" ${count === 0 && item.id !== 'all' ? 'disabled' : ''}>${escapeHtml(item.label)} · ${count}</button>`;
    }).join('');

    filters.addEventListener('click', (event) => {
      const button = event.target.closest('.rpc-filter');
      if (!button || button.disabled) return;
      const selected = button.dataset.filter;
      filters.querySelectorAll('.rpc-filter').forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      grid.querySelectorAll('.rpc-project-card').forEach((card) => {
        const matches = selected === 'all' || (selected === 'publication-linked' && card.dataset.publicationLinked === 'true') || card.dataset.class === selected;
        card.hidden = !matches;
      });
    });
  };

  const renderError = () => {
    const message = '<div class="rpc-error">The research status register could not be loaded. The page has failed closed rather than displaying stale or fabricated status information.</div>';
    ['#rpc-metrics', '#rpc-registry-classes', '#rpc-pipeline', '#rpc-featured', '#rpc-project-grid'].forEach((selector) => {
      const node = $(selector);
      if (node) node.innerHTML = message;
    });
    const refresh = $('#rpc-last-refresh');
    if (refresh) refresh.textContent = 'Evidence status unavailable';
  };

  const init = async () => {
    try {
      if (!DATA_URL) throw new Error('Research registry route unavailable');
      const response = await fetch(DATA_URL, { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      renderMetrics(data);
      renderPortfolioClasses(data);
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

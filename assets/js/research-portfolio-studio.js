(() => {
  const mount = document.getElementById('rps-active-projects');
  if (!mount) return;

  const registryUrl = mount.dataset.registryUrl;
  if (!registryUrl) return;

  const projectBase = mount.dataset.projectBase || './research-project/';
  const statusBase = mount.dataset.statusBase || './research-progress/';
  const evidenceBase = mount.dataset.evidenceBase || './evidence-explorer/';
  const explorer = document.getElementById('rps-project-explorer');
  const explorerContent = document.getElementById('rps-project-explorer-content');
  const explorerTitle = document.getElementById('rps-project-explorer-title');
  const explorerClose = explorer?.querySelector('.rps-explorer-close');

  const esc = value => String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));

  function stageClass(state){
    if (state === 'verified') return 'rps-stage rps-stage--verified';
    if (state === 'active') return 'rps-stage rps-stage--active';
    return 'rps-stage';
  }

  function renderProject(project, pipeline){
    const milestones = Array.isArray(project.milestones) ? project.milestones : [];
    const milestoneById = new Map(milestones.map(item => [item.id, item]));
    const lifecycle = pipeline.map((label, index) => {
      const id = ['project-core','protocol','ethics','instrument','data-collection','analysis','manuscript','publication'][index];
      const milestone = milestoneById.get(id);
      const state = milestone?.state || 'not-publicly-confirmed';
      const stateLabel = state === 'verified' ? 'Verified' : state === 'active' ? 'Active' : 'Not publicly confirmed';
      return `<div class="${stageClass(state)}" title="${esc(stateLabel)}"><b>${String(index + 1).padStart(2,'0')}</b><span>${esc(label)}</span></div>`;
    }).join('');

    const detailPath = `${projectBase}?id=${encodeURIComponent(project.id || '')}`;
    return `
      <article class="sp-card rps-project-card" data-project-id="${esc(project.id || '')}">
        <div class="rps-project-head">
          <div>
            <span class="sp-eyebrow">${esc(project.portfolioClassLabel || 'Research project')}</span>
            <h3 class="rps-project-title">${esc(project.title)}</h3>
          </div>
          <span class="rps-project-status">${esc(project.statusLabel || project.status || 'Verified status')}</span>
        </div>
        <p class="rps-project-focus">${esc(project.researchFocus || '')}</p>
        <div class="rps-project-meta">
          <div><span>Current stage</span><strong>${esc(project.stage || 'Not asserted')}</strong></div>
          <div><span>Current workstream</span><strong>${esc(project.currentWorkstream || 'Not asserted')}</strong></div>
          <div><span>Next evidence gate</span><strong>${esc(project.nextEvidenceGate || 'Not asserted')}</strong></div>
        </div>
        <div class="rps-lifecycle" role="list" aria-label="Research lifecycle for ${esc(project.shortTitle || project.title)}">${lifecycle}</div>
        <div class="rps-project-boundary"><strong>Publication linkage:</strong> ${esc(project.publicationBindingNote || 'No verified publication linkage asserted.')}</div>
        <div class="rps-project-actions">
          <button type="button" class="rps-project-drill" data-project-open="${esc(project.id || '')}" aria-controls="rps-project-explorer" aria-expanded="false">Explore evidence</button>
          <a href="${esc(detailPath)}">View project detail</a>
          <a href="${esc(statusBase)}">Open research status</a>
        </div>
      </article>`;
  }

  function renderDashboard(registry, projects, pipeline) {
    const statusMount = document.getElementById('rps-project-status-summary');
    const linkageMount = document.getElementById('rps-publication-linkage');
    const lifecycleMount = document.getElementById('rps-lifecycle-dashboard');

    if (statusMount) {
      const active = projects.filter(project => project.portfolioClass === 'verified-active');
      statusMount.innerHTML = active.length
        ? active.map(project => `<div class="rps-status-item"><span>${esc(project.shortTitle || project.id)}</span><strong>${esc(project.statusLabel || project.status)}</strong><small>Last verified: ${esc(project.lastVerified || registry.lastVerified || 'Not asserted')}</small></div>`).join('')
        : '<p>No Verified Active public-summary project is currently asserted.</p>';
    }

    if (linkageMount) {
      linkageMount.innerHTML = projects.length
        ? projects.map(project => {
            const linked = project.publicationLinked === true;
            const label = linked ? 'Verified publication linkage exists' : 'No verified publication linkage';
            const note = project.publicationBindingNote || 'No relationship note asserted.';
            return `<div class="rps-linkage-item ${linked ? 'is-linked' : 'is-unlinked'}"><span>${esc(project.shortTitle || project.id)}</span><strong>${esc(label)}</strong><p>${esc(note)}</p></div>`;
          }).join('')
        : '<p>No public-summary project record is available.</p>';
    }

    if (lifecycleMount) {
      lifecycleMount.innerHTML = projects.length
        ? projects.map(project => {
            const milestones = Array.isArray(project.milestones) ? project.milestones : [];
            const milestoneById = new Map(milestones.map(item => [item.id, item]));
            const ids = ['project-core','protocol','ethics','instrument','data-collection','analysis','manuscript','publication'];
            const stages = pipeline.map((label, index) => {
              const state = milestoneById.get(ids[index])?.state || 'not-publicly-confirmed';
              return `<div class="${stageClass(state)}"><b>${String(index + 1).padStart(2,'0')}</b><span>${esc(label)}</span></div>`;
            }).join('');
            return `<div class="rps-lifecycle-row"><div class="rps-lifecycle-row-head"><strong>${esc(project.shortTitle || project.title)}</strong><span>Current stage: ${esc(project.stage || 'Not asserted')}</span></div><div class="rps-lifecycle">${stages}</div></div>`;
          }).join('')
        : '<p>No lifecycle record is currently available.</p>';
    }
  }

  let registryCache = null;

  function outputStateClass(state) {
    if (state === 'verified') return 'is-verified';
    if (state === 'active') return 'is-active';
    return 'is-bounded';
  }

  function renderProjectExplorer(project, pipeline) {
    if (!explorer || !explorerContent || !explorerTitle) return;
    explorer.hidden = false;
    explorerTitle.textContent = `${project.shortTitle || project.id} · ${project.title}`;

    const outputs = Array.isArray(project.publicOutputs) ? project.publicOutputs : [];
    const milestones = Array.isArray(project.milestones) ? project.milestones : [];
    const bindings = Array.isArray(project.publicationBindings) ? project.publicationBindings : [];

    const outputHtml = outputs.length
      ? outputs.map(output => `
          <article class="rps-explorer-item ${outputStateClass(output.state)}">
            <span>${esc(output.type || 'Public output')}</span>
            <strong>${esc(output.label || output.id)}</strong>
            <small>State: ${esc(output.state || 'Not asserted')}</small>
          </article>`).join('')
      : '<p>No public-safe project outputs are currently asserted.</p>';

    const milestoneHtml = milestones.length
      ? milestones.map((milestone, index) => `
          <div class="rps-explorer-milestone ${outputStateClass(milestone.state)}">
            <b>${String(index + 1).padStart(2,'0')}</b>
            <div><strong>${esc(milestone.label || milestone.id)}</strong><small>${esc(milestone.state || 'Not asserted')}</small></div>
          </div>`).join('')
      : '<p>No milestone metadata is currently asserted.</p>';

    const bindingHtml = bindings.length
      ? bindings.map(binding => `<article class="rps-explorer-item is-verified"><strong>${esc(binding.label || binding.publicationId || 'Verified publication binding')}</strong></article>`).join('')
      : '<div class="rps-explorer-boundary"><strong>No verified publication binding.</strong><p>Topic similarity is not used to create project-publication relationships.</p></div>';

    explorerContent.innerHTML = `
      <div class="rps-explorer-summary">
        <span class="rps-project-status">${esc(project.statusLabel || project.status || 'Verified status')}</span>
        <span>${esc(project.portfolioClassLabel || project.portfolioClass || '')}</span>
        <span>Last verified: ${esc(project.lastVerified || registryCache?.lastVerified || 'Not asserted')}</span>
      </div>

      <div class="rps-explorer-grid">
        <article class="rps-explorer-panel">
          <span class="sp-eyebrow">Project Core</span>
          <h4>${esc(project.title)}</h4>
          <p>${esc(project.researchFocus || '')}</p>
          <dl>
            <div><dt>Current phase</dt><dd>${esc(project.currentPhase || 'Not asserted')}</dd></div>
            <div><dt>Current workstream</dt><dd>${esc(project.currentWorkstream || 'Not asserted')}</dd></div>
            <div><dt>Next evidence gate</dt><dd>${esc(project.nextEvidenceGate || 'Not asserted')}</dd></div>
          </dl>
        </article>

        <article class="rps-explorer-panel">
          <span class="sp-eyebrow">Evidence Binding</span>
          <h4>${esc(project.publicEvidenceBinding?.label || 'Public evidence boundary')}</h4>
          <p>${esc(project.publicEvidenceBinding?.note || project.evidenceNote || 'No public-safe binding note asserted.')}</p>
          <a class="rps-inline-link" href="${esc(evidenceBase)}">Open Evidence Explorer →</a>
        </article>
      </div>

      <section class="rps-explorer-section">
        <div class="rps-card-head"><div><span class="sp-eyebrow">Public Outputs</span><h4>Verified and active project outputs</h4></div></div>
        <div class="rps-explorer-items">${outputHtml}</div>
      </section>

      <section class="rps-explorer-section">
        <div class="rps-card-head"><div><span class="sp-eyebrow">Milestones</span><h4>Lifecycle evidence states</h4></div><span class="rps-badge">No % complete</span></div>
        <div class="rps-explorer-milestones">${milestoneHtml}</div>
      </section>

      <section class="rps-explorer-section">
        <div class="rps-card-head"><div><span class="sp-eyebrow">Publication Bindings</span><h4>Explicitly verified relationships only</h4></div></div>
        ${bindingHtml}
      </section>

      <div class="rps-project-actions">
        <a href="${esc(projectBase)}?id=${encodeURIComponent(project.id || '')}">Open full project detail</a>
        <a href="${esc(statusBase)}">Open research status</a>
      </div>
    `;

    document.querySelectorAll('.rps-project-drill').forEach(button => {
      button.setAttribute('aria-expanded', button.dataset.projectOpen === project.id ? 'true' : 'false');
    });
    explorer.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block:'nearest'});
    explorerClose?.focus({preventScroll:true});
  }

  function bindProjectExplorer(projects) {
    const byId = new Map(projects.map(project => [String(project.id || ''), project]));
    document.querySelectorAll('.rps-project-drill').forEach(button => {
      button.addEventListener('click', () => {
        const project = byId.get(String(button.dataset.projectOpen || ''));
        if (project) renderProjectExplorer(project);
      });
    });
  }

  explorerClose?.addEventListener('click', () => {
    if (!explorer) return;
    const active = document.querySelector('.rps-project-drill[aria-expanded="true"]');
    explorer.hidden = true;
    document.querySelectorAll('.rps-project-drill').forEach(button => button.setAttribute('aria-expanded','false'));
    active?.focus();
  });

  fetch(registryUrl, {cache:'no-store'})
    .then(response => {
      if (!response.ok) throw new Error('Registry unavailable');
      return response.json();
    })
    .then(registry => {
      const publicProjects = Array.isArray(registry.projects)
        ? registry.projects.filter(project => project.visibility === 'public-summary')
        : [];
      const projects = publicProjects.filter(project => project.portfolioClass === 'verified-active');
      const pipeline = Array.isArray(registry.pipeline) ? registry.pipeline : [];
      registryCache = registry;
      renderDashboard(registry, publicProjects, pipeline);
      if (!projects.length) {
        mount.innerHTML = '<article class="sp-card rps-loading-card">No Verified Active public-summary project is currently asserted.</article>';
        return;
      }
      mount.innerHTML = projects.map(project => renderProject(project, pipeline)).join('');
      bindProjectExplorer(projects);
    })
    .catch(() => {
      mount.innerHTML = '<article class="sp-card rps-loading-card">Verified research registry is temporarily unavailable. Existing research profile content remains unchanged.</article>';
      ['rps-project-status-summary','rps-publication-linkage','rps-lifecycle-dashboard'].forEach(id => {
        const node = document.getElementById(id);
        if (node) node.innerHTML = '<p>Verified registry unavailable; no project status or relationship is inferred.</p>';
      });
    });
})();

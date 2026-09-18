(() => {
  const mount = document.getElementById('rps-active-projects');
  if (!mount) return;

  const registryUrl = mount.dataset.registryUrl;
  if (!registryUrl) return;

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

    const detailPath = project.detailPath ? project.detailPath.replace('../','./') : './research-progress/';
    return `
      <article class="sp-card rps-project-card">
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
          <a href="${esc(detailPath)}">View project detail</a>
          <a href="./research-progress/">Open research status</a>
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
      renderDashboard(registry, publicProjects, pipeline);
      if (!projects.length) {
        mount.innerHTML = '<article class="sp-card rps-loading-card">No Verified Active public-summary project is currently asserted.</article>';
        return;
      }
      mount.innerHTML = projects.map(project => renderProject(project, pipeline)).join('');
    })
    .catch(() => {
      mount.innerHTML = '<article class="sp-card rps-loading-card">Verified research registry is temporarily unavailable. Existing research profile content remains unchanged.</article>';
      ['rps-project-status-summary','rps-publication-linkage','rps-lifecycle-dashboard'].forEach(id => {
        const node = document.getElementById(id);
        if (node) node.innerHTML = '<p>Verified registry unavailable; no project status or relationship is inferred.</p>';
      });
    });
})();

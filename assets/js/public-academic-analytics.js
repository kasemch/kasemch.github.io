/* Academic Executive Wave 06 — evidence-first descriptive analytics */
(() => {
  'use strict';
  const dataEl = document.getElementById('paa-publications-data');
  if (!dataEl) return;

  let publications = [];
  try { publications = JSON.parse(dataEl.textContent || '[]'); } catch (_) { publications = []; }

  const countBy = (items, keyFn) => items.reduce((acc, item) => {
    const key = keyFn(item) || 'Not specified';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const renderBars = (target, entries, labelTransform = (v) => v) => {
    if (!target) return;
    if (!entries.length) {
      target.innerHTML = '<p class="paa-caption">No verified public records are available for this view.</p>';
      return;
    }
    const max = Math.max(...entries.map(([, value]) => value), 1);
    target.innerHTML = entries.map(([label, value]) => `
      <div class="paa-bar-row">
        <span class="paa-bar-label">${escapeHtml(labelTransform(label))}</span>
        <span class="paa-bar-track" aria-hidden="true"><span class="paa-bar-fill" style="width:${Math.round(value / max * 100)}%"></span></span>
        <span class="paa-bar-value">${value}</span>
      </div>`).join('');
  };

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));

  const byYear = Object.entries(countBy(publications, (item) => item.year)).sort((a, b) => Number(a[0]) - Number(b[0]));
  renderBars(document.getElementById('paa-publication-year'), byYear);

  const byVenue = Object.entries(countBy(publications, (item) => item.venue || 'Venue not specified'))
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  renderBars(document.getElementById('paa-venue-distribution'), byVenue);

  document.querySelectorAll('.paa-evidence-bars > div').forEach((row) => {
    const value = Number(row.dataset.value || 0);
    const total = Number(row.dataset.total || 0);
    const percent = total > 0 ? Math.max(0, Math.min(100, value / total * 100)) : 0;
    row.style.setProperty('--coverage', `${percent}%`);
  });

  const script = document.currentScript;
  const researchUrl = script?.dataset?.researchUrl;
  const lifecycleTarget = document.getElementById('paa-research-lifecycle');
  const verifiedTarget = document.getElementById('paa-research-verified');
  if (!researchUrl || !lifecycleTarget) return;

  fetch(researchUrl, { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error('Research registry unavailable');
      return response.json();
    })
    .then((registry) => {
      const pipeline = Array.isArray(registry.pipeline) ? registry.pipeline : [];
      const projects = Array.isArray(registry.projects) ? registry.projects.filter((project) => project.visibility === 'public-summary') : [];
      const counts = countBy(projects, (project) => project.stage);
      lifecycleTarget.innerHTML = pipeline.map((stage) => {
        const count = counts[stage] || 0;
        return `<div class="paa-stage${count ? ' is-active' : ''}"><b>${escapeHtml(stage)}</b><span>${count} verified public project${count === 1 ? '' : 's'}</span></div>`;
      }).join('');
      if (verifiedTarget) verifiedTarget.textContent = registry.lastVerified ? `Registry verified ${formatDate(registry.lastVerified)}` : 'Registry date not asserted';
    })
    .catch(() => {
      lifecycleTarget.innerHTML = '<p class="paa-caption">Research lifecycle data is temporarily unavailable. No stage is inferred.</p>';
      if (verifiedTarget) verifiedTarget.textContent = 'Registry unavailable';
    });

  function formatDate(value) {
    const date = new Date(`${value}T00:00:00Z`);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat('en-GB', { day:'2-digit', month:'short', year:'numeric', timeZone:'UTC' }).format(date);
  }
})();

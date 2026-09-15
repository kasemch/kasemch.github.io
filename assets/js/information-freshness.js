/* Academic Executive Wave 05 — static domain-specific information freshness renderer */
(() => {
  'use strict';
  const script = document.currentScript;
  const registryUrl = script?.dataset?.registryUrl;
  if (!registryUrl) return;

  const target = document.querySelector('.academic-executive .ae-pillars') || document.querySelector('.academic-workspace .aw-dashboard-head');
  if (!target) return;

  const baseRoot = registryUrl.includes('/assets/data/') ? registryUrl.split('/assets/data/')[0] : '.';
  const researchUrl = `${baseRoot}/assets/data/research-projects.json`;

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const formatDate = (value) => {
    if (!value) return 'Not asserted';
    const parsed = new Date(`${value}T00:00:00Z`);
    if (Number.isNaN(parsed.getTime())) return value;
    return new Intl.DateTimeFormat('en-GB', { day:'2-digit', month:'short', year:'numeric', timeZone:'UTC' }).format(parsed);
  };
  const safeHref = (value) => `${baseRoot}/${String(value || '').replace(/^\.\//, '').replace(/^\//, '')}`;

  const mount = document.createElement('section');
  mount.className = 'freshness-layer';
  mount.setAttribute('aria-labelledby', 'freshness-title');
  mount.innerHTML = '<div class="freshness-loading" role="status">Loading domain-specific evidence freshness…</div>';
  target.insertAdjacentElement('afterend', mount);

  Promise.all([
    fetch(registryUrl, { cache: 'no-store' }).then((response) => {
      if (!response.ok) throw new Error('Freshness registry unavailable');
      return response.json();
    }),
    fetch(researchUrl, { cache: 'no-store' }).then((response) => response.ok ? response.json() : null).catch(() => null)
  ]).then(([registry, research]) => {
    const records = Array.isArray(registry.records) ? registry.records.map((record) => ({ ...record })) : [];
    const researchRecord = records.find((record) => record.id === 'research');
    if (researchRecord && research?.lastVerified) researchRecord.date = research.lastVerified;

    const cards = records.map((record) => `
      <article class="freshness-card" data-state="${escapeHtml(record.state || 'bounded')}">
        <div class="freshness-card-top"><span class="freshness-domain">${escapeHtml(record.label)}</span><span class="freshness-state">${escapeHtml(record.status)}</span></div>
        <div class="freshness-date"><span>${escapeHtml(record.dateLabel)}</span><strong>${escapeHtml(formatDate(record.date))}</strong></div>
        <p class="freshness-detail">${escapeHtml(record.detail)}</p>
        <a class="freshness-link" href="${escapeHtml(safeHref(record.href))}">Open ${escapeHtml(record.label)} →</a>
      </article>`).join('');

    mount.innerHTML = `
      <div class="freshness-head">
        <div><div class="freshness-kicker">Current Snapshot</div><h2 id="freshness-title">Evidence freshness by domain</h2></div>
        <p class="freshness-note">${escapeHtml(registry.notice)}</p>
      </div>
      <div class="freshness-grid">${cards}</div>`;
  }).catch(() => {
    mount.innerHTML = '<div class="freshness-loading" role="status">Freshness metadata is temporarily unavailable. Existing academic content remains unchanged.</div>';
  });
})();

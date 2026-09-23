/* Academic Executive Wave 07 — evidence-first interactive analytics */
(() => {
  'use strict';

  const publicationEl = document.getElementById('paa-publications-data');
  const teachingEl = document.getElementById('paa-teaching-data');
  if (!publicationEl) return;

  const script = document.currentScript;
  const researchUrl = script?.dataset?.researchUrl;
  const publicationsBase = script?.dataset?.publicationsBase || './publications/';
  const teachingBase = script?.dataset?.teachingBase || './teaching/';
  const researchStatusBase = script?.dataset?.researchStatusBase || './research-progress/';
  const projectBase = script?.dataset?.projectBase || './research-project/';

  const parseJson = (el, fallback) => {
    try { return JSON.parse(el?.textContent || ''); } catch (_) { return fallback; }
  };
  const publications = parseJson(publicationEl, []);
  const teaching = parseJson(teachingEl, { summary: {}, courses: [] });
  const drilldown = document.getElementById('paa-drilldown');
  const drilldownTitle = document.getElementById('paa-drilldown-title');
  const drilldownSummary = document.getElementById('paa-drilldown-summary');
  const drilldownResults = document.getElementById('paa-drilldown-results');
  const closeButton = document.getElementById('paa-drilldown-close');
  let researchRegistry = null;

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const countBy = (items, keyFn) => items.reduce((acc, item) => {
    const key = keyFn(item) || 'Not specified';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const clearSelection = () => {
    document.querySelectorAll('.paa-selectable[aria-pressed="true"]').forEach((el) => el.setAttribute('aria-pressed', 'false'));
    if (drilldownTitle) drilldownTitle.textContent = 'Select a chart item to inspect its public-safe records';
    if (drilldownSummary) drilldownSummary.textContent = 'Year, venue, teaching-evidence, and research-stage selections will appear here.';
    if (drilldownResults) drilldownResults.innerHTML = '';
  };

  const setSelection = (button) => {
    document.querySelectorAll('.paa-selectable[aria-pressed="true"]').forEach((el) => el.setAttribute('aria-pressed', 'false'));
    if (button) button.setAttribute('aria-pressed', 'true');
  };

  const reveal = (title, summary, html, sourceLabel, sourceHref) => {
    if (!drilldown || !drilldownTitle || !drilldownSummary || !drilldownResults) return;
    drilldownTitle.textContent = title;
    drilldownSummary.textContent = summary;
    drilldownResults.innerHTML = html + (sourceHref ? `<p class="paa-source-link"><a href="${escapeHtml(sourceHref)}">Open ${escapeHtml(sourceLabel)} →</a></p>` : '');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    drilldown.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest' });
  };

  const publicationCards = (items) => items.length ? items
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
    .map((item) => `<article class="paa-record"><span>${escapeHtml(item.date)} · ${escapeHtml(item.venue)}</span><h3>${escapeHtml(item.title)}</h3><a href="${escapeHtml(item.url)}">Open publication record →</a></article>`).join('')
    : '<p class="paa-caption">No verified public journal records match this selection.</p>';

  const renderBars = (target, entries, onSelect, labelTransform = (v) => v) => {
    if (!target) return;
    if (!entries.length) {
      target.innerHTML = '<p class="paa-caption">No verified public records are available for this view.</p>';
      return;
    }
    const max = Math.max(...entries.map(([, value]) => value), 1);
    target.innerHTML = entries.map(([label, value]) => `
      <button type="button" class="paa-bar-row paa-selectable" aria-pressed="false" data-key="${escapeHtml(label)}">
        <span class="paa-bar-label">${escapeHtml(labelTransform(label))}</span>
        <span class="paa-bar-track" aria-hidden="true"><span class="paa-bar-fill" style="width:${Math.round(value / max * 100)}%"></span></span>
        <span class="paa-bar-value">${value}</span>
      </button>`).join('');
    target.querySelectorAll('.paa-bar-row').forEach((button) => button.addEventListener('click', () => {
      setSelection(button);
      onSelect(button.dataset.key);
    }));
  };

  const byYear = Object.entries(countBy(publications, (item) => item.year)).sort((a, b) => Number(a[0]) - Number(b[0]));
  renderBars(document.getElementById('paa-publication-year'), byYear, (year) => {
    const items = publications.filter((item) => String(item.year) === String(year));
    reveal(`Journal publications · ${year}`, `${items.length} verified journal record${items.length === 1 ? '' : 's'} in the public collection.`, publicationCards(items), 'Publications', publicationsBase);
  });

  const byVenue = Object.entries(countBy(publications, (item) => item.venue || 'Venue not specified'))
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  renderBars(document.getElementById('paa-venue-distribution'), byVenue, (venue) => {
    const items = publications.filter((item) => String(item.venue || 'Venue not specified') === String(venue));
    reveal(`Venue · ${venue}`, `${items.length} verified journal record${items.length === 1 ? '' : 's'} use this venue name in the public metadata. No ranking or indexing inference is made.`, publicationCards(items), 'Publications', publicationsBase);
  });

  const evidenceConfig = {
    tqf3: { label: 'TQF3 located', field: 'tqf3', missing: /not directly located/i },
    tqf5: { label: 'TQF5 material located', field: 'tqf5', missing: /not directly located/i },
    verification: { label: 'Verification material located', field: 'verification', missing: /not directly located|no separate direct verification/i },
    direct: { label: 'Direct quality evidence', field: null }
  };
  document.querySelectorAll('.paa-evidence-bars > button').forEach((row) => {
    const key = row.dataset.evidenceKey;
    const cfg = evidenceConfig[key];
    const total = Number(teaching.summary?.initially_scheduled || 0);
    let located = 0;
    if (key === 'direct') located = Number(teaching.summary?.direct_quality_evidence_courses || 0);
    else located = Number(teaching.summary?.[key === 'verification' ? 'verification_courses_located' : `${key}_courses_located`] || 0);
    const percent = total > 0 ? Math.max(0, Math.min(100, located / total * 100)) : 0;
    row.style.setProperty('--coverage', `${percent}%`);
    row.classList.add('paa-selectable');
    row.setAttribute('aria-pressed', 'false');
    row.addEventListener('click', () => {
      setSelection(row);
      const courses = (teaching.courses || []).filter((course) => {
        if (key === 'direct') return course.directEvidence === true;
        const value = String(course[cfg.field] || '');
        return value && !cfg.missing.test(value);
      });
      const cards = courses.length ? courses.map((course) => `<article class="paa-record"><span>${escapeHtml(course.code)} · ${escapeHtml(course.offeringStatus)}</span><h3>${escapeHtml(course.title)}</h3>${key !== 'direct' ? `<p><strong>${escapeHtml(cfg.label)}:</strong> ${escapeHtml(course[cfg.field])}</p>` : `<p><strong>TQF3:</strong> ${escapeHtml(course.tqf3)}</p><p><strong>TQF5:</strong> ${escapeHtml(course.tqf5)}</p><p><strong>Verification:</strong> ${escapeHtml(course.verification)}</p>`}</article>`).join('') : '<p class="paa-caption">No course-level public metadata is available for this evidence category.</p>';
      reveal(cfg.label, `${located}/${total} AY2569 course codes have this evidence category located in the reconciliation summary. Course cards below are limited to public-safe course-quality metadata already admitted to the site.`, cards, 'Teaching portfolio', teachingBase);
    });
  });

  const lifecycleTarget = document.getElementById('paa-research-lifecycle');
  const verifiedTarget = document.getElementById('paa-research-verified');
  if (researchUrl && lifecycleTarget) {
    fetch(researchUrl, { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error('Research registry unavailable');
        return response.json();
      })
      .then((registry) => {
        researchRegistry = registry;
        const pipeline = Array.isArray(registry.pipeline) ? registry.pipeline : [];
        const projects = Array.isArray(registry.projects) ? registry.projects.filter((project) => project.visibility === 'public-summary') : [];
        const counts = countBy(projects, (project) => project.stage);
        lifecycleTarget.innerHTML = pipeline.map((stage) => {
          const count = counts[stage] || 0;
          return `<button type="button" class="paa-stage paa-selectable${count ? ' is-active' : ''}" aria-pressed="false" data-stage="${escapeHtml(stage)}"><b>${escapeHtml(stage)}</b><span>${count} verified public project${count === 1 ? '' : 's'}</span></button>`;
        }).join('');
        lifecycleTarget.querySelectorAll('.paa-stage').forEach((button) => button.addEventListener('click', () => {
          setSelection(button);
          const stage = button.dataset.stage;
          const matches = projects.filter((project) => project.stage === stage);
          const cards = matches.length ? matches.map((project) => {
            const detailHref = project.id ? `${projectBase}?id=${encodeURIComponent(project.id)}` : '';
            return `<article class="paa-record"><span>${escapeHtml(project.portfolioClassLabel || project.portfolioClass)} · ${escapeHtml(project.statusLabel || project.status)}</span><h3>${escapeHtml(project.shortTitle || project.title)}</h3><p>${escapeHtml(project.currentPhase || project.evidenceNote || '')}</p>${detailHref ? `<a href="${escapeHtml(detailHref)}">Open project detail →</a>` : ''}</article>`;
          }).join('') : '<p class="paa-caption">No public-summary project is currently verified at this stage.</p>';
          reveal(`Research stage · ${stage}`, `${matches.length} public-summary project${matches.length === 1 ? '' : 's'} currently sit at this latest verified public stage. This is not a completion percentage.`, cards, 'Research Status', researchStatusBase);
        }));
        if (verifiedTarget) verifiedTarget.textContent = registry.lastVerified ? `Registry verified ${formatDate(registry.lastVerified)}` : 'Registry date not asserted';
      })
      .catch(() => {
        lifecycleTarget.innerHTML = '<p class="paa-caption">Research lifecycle data is temporarily unavailable. No stage is inferred.</p>';
        if (verifiedTarget) verifiedTarget.textContent = 'Registry unavailable';
      });
  }

  closeButton?.addEventListener('click', clearSelection);

  function formatDate(value) {
    const date = new Date(`${value}T00:00:00Z`);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat('en-GB', { day:'2-digit', month:'short', year:'numeric', timeZone:'UTC' }).format(date);
  }
})();

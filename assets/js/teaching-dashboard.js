/* Option 17A-03 teaching dashboard enhancement. No external API. */
(() => {
  const root = document.querySelector('.signature-page');
  if (!root) return;

  const hero = root.querySelector('.sp-hero');
  if (!hero) return;

  const toolbar = document.createElement('section');
  toolbar.className = 'td-toolbar';
  toolbar.setAttribute('aria-label', 'Teaching portfolio filters');
  toolbar.innerHTML = `
    <div class="td-field">
      <label for="td-search">Search teaching evidence</label>
      <input id="td-search" type="search" placeholder="Course code, title, status, evidence…" autocomplete="off">
    </div>
    <div class="td-field">
      <label for="td-status">Status</label>
      <select id="td-status">
        <option value="">All statuses</option>
        <option value="retained">Retained</option>
        <option value="officially_cancelled">Officially cancelled</option>
        <option value="special_teaching">Special teaching</option>
        <option value="restricted_source">Restricted source</option>
      </select>
    </div>
    <div class="td-field">
      <label for="td-evidence">Evidence</label>
      <select id="td-evidence">
        <option value="">All evidence states</option>
        <option value="tqf3">TQF3</option>
        <option value="tqf5">TQF5</option>
        <option value="verification">Verification</option>
        <option value="assessment">Assessment</option>
      </select>
    </div>
    <div class="td-result" role="status" aria-live="polite"></div>`;
  hero.insertAdjacentElement('afterend', toolbar);

  const empty = document.createElement('div');
  empty.className = 'td-empty';
  empty.textContent = 'No matching public teaching evidence was found.';
  toolbar.insertAdjacentElement('afterend', empty);

  const qualityHeading = root.querySelector('#quality-docs-title');
  const qualitySection = qualityHeading?.closest('.sp-section');
  if (qualitySection) {
    const pathSection = document.createElement('section');
    pathSection.className = 'sp-section sp-shell td-evidence-path-section';
    pathSection.setAttribute('aria-labelledby', 'td-evidence-path-title');
    pathSection.innerHTML = `
      <div class="sp-section-head">
        <div class="sp-eyebrow">Teaching Evidence Path</div>
        <h2 id="td-evidence-path-title">How course-quality evidence moves toward improvement</h2>
        <p class="sp-intro">This is an explanatory evidence path, not a completion score. Individual courses may have different evidence coverage at each step, and an official offering status always takes precedence over supporting quality documents.</p>
      </div>
      <div class="td-evidence-path-wrap" role="region" aria-label="Teaching evidence path" tabindex="0">
        <ol class="td-evidence-path">
          <li><span class="td-path-node">01</span><div><strong>Course</strong><small>Course specification and intended learning</small></div></li>
          <li><span class="td-path-node">02</span><div><strong>Teaching</strong><small>Learning activities and delivery evidence</small></div></li>
          <li><span class="td-path-node">03</span><div><strong>Assessment</strong><small>Tasks, rubrics and assessment evidence</small></div></li>
          <li><span class="td-path-node">04</span><div><strong>TQF5</strong><small>Course report or equivalent quality record</small></div></li>
          <li><span class="td-path-node">05</span><div><strong>Verification</strong><small>Learning-achievement verification evidence</small></div></li>
          <li><span class="td-path-node">06</span><div><strong>Improvement</strong><small>Evidence-informed refinement for the next cycle</small></div></li>
        </ol>
      </div>
      <div class="sp-policy"><strong>Interpretation rule.</strong> The path describes the evidence architecture. It does not imply that every course has completed every stage or that document existence overrides authoritative MR30 status.</div>`;
    qualitySection.insertAdjacentElement('beforebegin', pathSection);
  }

  const search = toolbar.querySelector('#td-search');
  const status = toolbar.querySelector('#td-status');
  const evidence = toolbar.querySelector('#td-evidence');
  const result = toolbar.querySelector('.td-result');

  // Filter only evidence-bearing course sections. Dashboard/story cards stay visible.
  const filterSectionIds = [
    'retained-courses-title',
    'cancelled-courses-title',
    'quality-docs-title',
    'special-teaching-title'
  ];
  const filterSections = filterSectionIds
    .map(id => root.querySelector('#' + id)?.closest('.sp-section'))
    .filter(Boolean);
  const cards = [...new Set(filterSections.flatMap(section => [...section.querySelectorAll('.sp-card')]))];

  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    const badges = [];
    if (text.includes('retained')) badges.push(['RETAINED','retained']);
    if (text.includes('officially_cancelled') || text.includes('officially cancelled')) badges.push(['OFFICIALLY CANCELLED','cancelled']);
    if (text.includes('special teaching')) badges.push(['SPECIAL TEACHING','special']);
    if (text.includes('restricted source')) badges.push(['RESTRICTED SOURCE','restricted']);
    if (badges.length) {
      const holder = document.createElement('div');
      badges.slice(0,2).forEach(([label,kind]) => {
        const span = document.createElement('span');
        span.className = `td-status td-status--${kind}`;
        span.textContent = label;
        holder.appendChild(span);
      });
      card.insertBefore(holder, card.firstChild);
    }
  });

  // Wave 03 — course-level evidence drill-down.
  const explorer = document.getElementById('tps-course-explorer');
  const explorerContent = document.getElementById('tps-course-explorer-content');
  const explorerTitle = document.getElementById('tps-course-explorer-title');
  const explorerClose = explorer?.querySelector('.tps-explorer-close');
  const courseButtons = [...root.querySelectorAll('[data-course-open]')];

  const parseJsonScript = (id) => {
    const el = document.getElementById(id);
    if (!el) return [];
    try {
      const value = JSON.parse(el.textContent || '[]');
      return Array.isArray(value) ? value : [];
    } catch (_) {
      return [];
    }
  };

  const qualityRegistry = parseJsonScript('tps-course-quality-data');
  const gapRegistry = parseJsonScript('tps-course-gap-data');
  const qualityByCode = new Map(qualityRegistry.map(item => [String(item.code || ''), item]));
  const gapByCode = new Map(gapRegistry.map(item => [String(item.code || ''), item]));
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));

  function accessLabel(access) {
    return access === 'RESTRICTED_SOURCE'
      ? '<span class="td-status td-status--restricted">Restricted source · metadata verified</span>'
      : '';
  }

  function renderStep(label, value, access = '') {
    const safeValue = value ? escapeHtml(value) : 'Not directly located';
    return `<article class="tps-explorer-step">
      <span class="tps-explorer-step-label">${escapeHtml(label)}</span>
      <p>${safeValue}</p>
      ${accessLabel(access)}
    </article>`;
  }

  function openCourseExplorer(button) {
    if (!explorer || !explorerContent || !explorerTitle) return;
    const code = String(button.dataset.courseOpen || '');
    const row = button.closest('tr');
    const title = row?.dataset.courseTitle || code;
    const statusValue = row?.dataset.courseStatus || '';
    const schedule = row?.dataset.courseSchedule || '';
    const note = row?.dataset.courseNote || '';
    const quality = qualityByCode.get(code);
    const gap = gapByCode.get(code);

    courseButtons.forEach(item => item.setAttribute('aria-expanded', item === button ? 'true' : 'false'));
    explorer.hidden = false;
    explorerTitle.textContent = `${code} · ${title}`;

    const statusClass = statusValue === 'OFFICIALLY_CANCELLED' ? 'cancelled' : 'retained';
    const statusLabel = statusValue === 'OFFICIALLY_CANCELLED'
      ? 'Officially cancelled'
      : 'Retained in latest reconciliation';

    let body = `
      <div class="tps-explorer-summary">
        <span class="td-status td-status--${statusClass}">${statusLabel}</span>
        <span class="tps-explorer-meta">${escapeHtml(schedule)}</span>
      </div>
      <div class="sp-evidence-note"><strong>Offering evidence note:</strong> ${escapeHtml(note || 'No additional public note asserted.')}</div>`;

    if (quality) {
      body += `
        <div class="tps-explorer-banner"><strong>Direct course-quality evidence metadata located.</strong> Document existence does not override the authoritative offering status shown above.</div>
        <div class="tps-explorer-grid">
          ${renderStep('Teaching status', quality.teaching_evidence)}
          ${renderStep('Course Specification (TQF3)', quality.tqf3_status, quality.tqf3_access)}
          ${renderStep('Assessment evidence', quality.assessment_evidence)}
          ${renderStep('Course Report (TQF5)', quality.tqf5_status, quality.tqf5_access)}
          ${renderStep('Verification', quality.verification_status, quality.verification_access)}
          ${renderStep('Improvement', quality.improvement_evidence)}
        </div>`;
    } else if (gap) {
      body += `
        <div class="tps-explorer-banner tps-explorer-banner--gap"><strong>Evidence gap.</strong> No direct AY2569 course-quality package was admitted to the public evidence matrix for this course.</div>
        <article class="tps-explorer-step tps-explorer-step-wide">
          <span class="tps-explorer-step-label">Targeted search result</span>
          <p>${escapeHtml(gap.search_status)}</p>
        </article>`;
    } else {
      body += `
        <div class="tps-explorer-banner tps-explorer-banner--gap"><strong>No course-quality detail asserted.</strong> The current public registry does not contain a direct quality-evidence record or targeted-search gap entry for this course.</div>`;
    }

    body += '<p class="tps-explorer-boundary">Evidence shown here is public-safe metadata only. Missing or restricted evidence is not inferred, and course-quality documents do not reverse official MR30 offering status.</p>';
    explorerContent.innerHTML = body;
    explorer.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
    explorerClose?.focus({ preventScroll: true });
  }

  courseButtons.forEach(button => button.addEventListener('click', () => openCourseExplorer(button)));
  explorerClose?.addEventListener('click', () => {
    if (!explorer) return;
    explorer.hidden = true;
    const active = courseButtons.find(button => button.getAttribute('aria-expanded') === 'true');
    courseButtons.forEach(button => button.setAttribute('aria-expanded', 'false'));
    active?.focus();
  });

  const norm = value => (value || '').toLowerCase().trim();
  function applyFilters(){
    const q = norm(search.value);
    const s = norm(status.value).replaceAll('_',' ');
    const e = norm(evidence.value);
    let visible = 0;
    cards.forEach(card => {
      const text = norm(card.textContent).replaceAll('_',' ');
      const match = (!q || text.includes(q)) && (!s || text.includes(s)) && (!e || text.includes(e));
      card.hidden = !match;
      if (match) visible += 1;
    });
    const hasActiveFilter = Boolean(q || s || e);
    empty.classList.toggle('is-visible', hasActiveFilter && visible === 0);
    result.textContent = hasActiveFilter
      ? `${visible} teaching evidence card${visible === 1 ? '' : 's'} shown`
      : 'Filters apply to course and course-evidence records only.';
  }

  [search,status,evidence].forEach(control => control.addEventListener(control.tagName === 'INPUT' ? 'input' : 'change', applyFilters));
  applyFilters();
})();

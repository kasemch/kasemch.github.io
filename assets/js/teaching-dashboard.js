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

  const cards = [...root.querySelectorAll('.sp-card')].filter(card => !card.closest('.td-toolbar'));

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
    empty.classList.toggle('is-visible', visible === 0);
    result.textContent = `${visible} teaching evidence card${visible === 1 ? '' : 's'} shown`;
  }

  [search,status,evidence].forEach(control => control.addEventListener(control.tagName === 'INPUT' ? 'input' : 'change', applyFilters));
  applyFilters();
})();

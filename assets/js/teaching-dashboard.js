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

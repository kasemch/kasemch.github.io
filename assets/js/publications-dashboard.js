/* Option 17A-02 — client-side publication search/filter. */
(() => {
  const root = document.querySelector('.publications-dashboard');
  if (!root) return;
  const search = root.querySelector('[data-pd-search]');
  const year = root.querySelector('[data-pd-year]');
  const venue = root.querySelector('[data-pd-venue]');
  const cards = [...root.querySelectorAll('[data-pd-card]')];
  const empty = root.querySelector('[data-pd-empty]');
  const count = root.querySelector('[data-pd-visible-count]');
  const clear = root.querySelector('[data-pd-clear]');
  const status = root.querySelector('[data-pd-filter-status]');
  const norm = (v = '') => v.toLowerCase().trim();

  const apply = () => {
    const q = norm(search?.value);
    const y = year?.value || '';
    const v = venue?.value || '';
    let visible = 0;
    cards.forEach((card) => {
      const matchesText = !q || norm(card.textContent).includes(q);
      const matchesYear = !y || card.dataset.year === y;
      const matchesVenue = !v || card.dataset.venue === v;
      const show = matchesText && matchesYear && matchesVenue;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (count) count.textContent = String(visible);
    if (empty) empty.classList.toggle('is-visible', visible === 0);
    const active = Boolean(q || y || v);
    if (status) status.textContent = active
      ? `Showing ${visible} matching verified journal publication record${visible === 1 ? '' : 's'}.`
      : 'Showing all verified journal publication records.';
    if (clear) clear.disabled = !active;
  };

  search?.addEventListener('input', apply);
  year?.addEventListener('change', apply);
  venue?.addEventListener('change', apply);
  clear?.addEventListener('click', () => {
    if (search) search.value = '';
    if (year) year.value = '';
    if (venue) venue.value = '';
    apply();
    search?.focus();
  });
  apply();
})();

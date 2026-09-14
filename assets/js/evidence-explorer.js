/* Option 17A-05 — client-side public evidence search/filter */
(() => {
  const root = document.querySelector('.evidence-explorer');
  if (!root) return;
  const input = root.querySelector('[data-ee-search]');
  const buttons = [...root.querySelectorAll('[data-ee-filter]')];
  const cards = [...root.querySelectorAll('[data-ee-card]')];
  const empty = root.querySelector('[data-ee-empty]');
  let activeDomain = 'all';
  const normalize = (value = '') => value.toLowerCase().trim();
  const apply = () => {
    const query = normalize(input?.value || '');
    let visible = 0;
    cards.forEach((card) => {
      const matchesDomain = activeDomain === 'all' || card.dataset.domain === activeDomain;
      const matchesQuery = !query || normalize(card.dataset.search || card.textContent).includes(query);
      card.hidden = !(matchesDomain && matchesQuery);
      if (!card.hidden) visible += 1;
    });
    if (empty) empty.classList.toggle('is-visible', visible === 0);
  };
  input?.addEventListener('input', apply);
  buttons.forEach((button) => button.addEventListener('click', () => {
    activeDomain = button.dataset.eeFilter || 'all';
    buttons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    apply();
  }));
})();

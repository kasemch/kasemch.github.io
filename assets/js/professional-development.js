/* Option 17A-07 — Professional Development filters */
(() => {
  const root = document.querySelector('.pd-page');
  if (!root) return;
  const buttons = [...root.querySelectorAll('[data-pd-filter]')];
  const cards = [...root.querySelectorAll('[data-pd-card]')];
  const empty = root.querySelector('[data-pd-empty]');

  const apply = (filter) => {
    let visible = 0;
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.pdFilter === filter)));
    cards.forEach((card) => {
      const category = card.dataset.pdCategory || '';
      const match = filter === 'all' || category === filter;
      card.hidden = !match;
      if (match) visible += 1;
    });
    if (empty) empty.hidden = visible > 0;
  };

  buttons.forEach((button) => button.addEventListener('click', () => apply(button.dataset.pdFilter || 'all')));
})();

/* Option 17A static-first academic search. No external API; filters visible hub cards only. */
(() => {
  const root = document.querySelector('.option17a');
  if (!root) return;

  const input = root.querySelector('[data-oa-search]');
  const button = root.querySelector('[data-oa-search-button]');
  const suggestions = [...root.querySelectorAll('[data-oa-suggestion]')];
  const cards = [...root.querySelectorAll('[data-oa-card]')];
  const empty = root.querySelector('[data-oa-empty]');

  const normalize = (value = '') => value.toLowerCase().trim();

  function runSearch(rawQuery) {
    const query = normalize(rawQuery);
    let visible = 0;

    cards.forEach((card) => {
      const haystack = normalize([
        card.dataset.keywords,
        card.textContent
      ].join(' '));
      const match = !query || haystack.includes(query);
      card.hidden = !match;
      if (match) visible += 1;
    });

    if (empty) empty.classList.toggle('is-visible', visible === 0);

    const target = root.querySelector('#academic-hub');
    if (query && target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  button?.addEventListener('click', () => runSearch(input?.value));
  input?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') runSearch(input.value);
  });

  suggestions.forEach((item) => {
    item.addEventListener('click', () => {
      const query = item.dataset.oaSuggestion || item.textContent;
      if (input) input.value = query;
      runSearch(query);
    });
  });
})();

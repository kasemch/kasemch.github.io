/* Option 17A-08 — Static AI Academic Assistant v2. Public local index only; no external API. */
(() => {
  const root = document.querySelector('.option17a');
  if (!root) return;

  const input = root.querySelector('[data-oa-search]');
  const button = root.querySelector('[data-oa-search-button]');
  const suggestions = [...root.querySelectorAll('[data-oa-suggestion]')];
  const results = root.querySelector('[data-oa-ai-results]');
  const status = root.querySelector('[data-oa-ai-status]');
  const normalize = (value = '') => value.toLowerCase().trim();
  let index = [];
  let indexReady = false;

  const indexUrl = './assets/data/academic-index.json';
  fetch(indexUrl)
    .then((response) => response.ok ? response.json() : Promise.reject(new Error('Index unavailable')))
    .then((data) => {
      index = Array.isArray(data) ? data : [];
      indexReady = true;
    })
    .catch(() => {
      index = [];
      indexReady = false;
      if (status) status.textContent = 'The public academic index is temporarily unavailable. Please use the main navigation.';
    });

  const scoreRecord = (record, query, terms) => {
    const title = normalize(record.title);
    const type = normalize(record.type);
    const domain = normalize(record.domain);
    const keywords = normalize((record.keywords || []).join(' '));
    const summary = normalize(record.summary);
    let score = 0;

    if (query) {
      if (title.includes(query)) score += 12;
      if (type.includes(query) || domain.includes(query)) score += 10;
      if (keywords.includes(query)) score += 9;
      if (summary.includes(query)) score += 5;
    }

    return terms.reduce((total, term) => {
      if (title.includes(term)) total += 5;
      if (type.includes(term) || domain.includes(term)) total += 4;
      if (keywords.includes(term)) total += 3;
      if (summary.includes(term)) total += 1;
      return total;
    }, score);
  };

  const render = (matches, query) => {
    if (!results || !status) return;
    results.replaceChildren();
    if (!query) {
      status.textContent = 'Search the verified public academic index.';
      return;
    }
    if (!matches.length) {
      status.textContent = 'No matching public academic content was found. Try a broader term or use the main navigation.';
      return;
    }
    status.textContent = `I found ${matches.length} public academic record${matches.length === 1 ? '' : 's'} matching “${query}”.`;
    matches.slice(0, 6).forEach(({ record }) => {
      const item = document.createElement('a');
      item.className = 'oa-ai-result';
      item.href = record.url;
      const meta = document.createElement('span');
      meta.className = 'oa-ai-result-meta';
      meta.textContent = `${record.type} · ${record.evidence_status}`;
      const title = document.createElement('strong');
      title.textContent = record.title;
      const summary = document.createElement('span');
      summary.textContent = record.summary;
      item.append(meta, title, summary);
      results.appendChild(item);
    });
  };

  function runSearch(rawQuery) {
    const query = normalize(rawQuery);
    if (!indexReady) {
      if (status) status.textContent = 'Loading the public academic index…';
      return;
    }
    const terms = query.split(/\s+/).filter(Boolean);
    const matches = index
      .map((record) => ({ record, score: scoreRecord(record, query, terms) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.record.title.localeCompare(b.record.title));
    render(matches, query);
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

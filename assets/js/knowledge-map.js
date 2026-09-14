/* Option 17A-06 — Academic Knowledge Map */
(() => {
  const root = document.querySelector('.knowledge-map-page');
  const dataNode = document.getElementById('knowledge-map-data');
  if (!root || !dataNode) return;

  let data;
  try { data = JSON.parse(dataNode.textContent || '{}'); } catch (_) { return; }

  const nodes = Array.isArray(data.nodes) ? data.nodes.filter((node) => node.public) : [];
  const edges = Array.isArray(data.edges) ? data.edges : [];
  const buttons = [...root.querySelectorAll('[data-km-node]')];
  const title = root.querySelector('[data-km-detail-title]');
  const text = root.querySelector('[data-km-detail-text]');
  const relations = root.querySelector('[data-km-relations]');
  const link = root.querySelector('[data-km-detail-link]');

  const nodeById = new Map(nodes.map((node) => [node.id, node]));

  const selectNode = (id) => {
    const selected = nodeById.get(id);
    if (!selected) return;

    const relatedEdges = edges.filter((edge) => edge.source === id || edge.target === id);
    const relatedIds = new Set(relatedEdges.map((edge) => edge.source === id ? edge.target : edge.source));

    buttons.forEach((button) => {
      const active = button.dataset.kmNode === id;
      const related = relatedIds.has(button.dataset.kmNode);
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('is-related', !active && related);
      button.classList.toggle('is-dimmed', !active && !related);
    });

    title.textContent = selected.label;
    text.textContent = selected.description || '';
    relations.innerHTML = '';
    relations.className = 'km-relations';

    relatedEdges.forEach((edge) => {
      const otherId = edge.source === id ? edge.target : edge.source;
      const other = nodeById.get(otherId);
      if (!other) return;
      const item = document.createElement('div');
      item.className = 'km-relation';
      const strong = document.createElement('strong');
      strong.textContent = other.label;
      const span = document.createElement('span');
      span.textContent = edge.relationship || 'Related public academic area';
      item.append(strong, span);
      relations.appendChild(item);
    });

    if (selected.url) {
      link.href = selected.url;
      link.hidden = false;
    } else {
      link.hidden = true;
    }
  };

  buttons.forEach((button) => button.addEventListener('click', () => selectNode(button.dataset.kmNode)));
})();

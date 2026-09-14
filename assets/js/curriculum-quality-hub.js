/* Option 17A-04 — lightweight domain filter for public Curriculum & QA content. */
(() => {
  const root = document.querySelector('.curriculum-quality-hub');
  if (!root) return;
  const buttons = [...root.querySelectorAll('[data-cq-filter]')];
  const cards = [...root.querySelectorAll('[data-cq-domain]')];
  const apply = (domain) => {
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.cqFilter === domain)));
    cards.forEach((card) => {
      const domains = (card.dataset.cqDomain || '').split(' ');
      card.hidden = domain !== 'all' && !domains.includes(domain);
    });
  };
  buttons.forEach((button) => button.addEventListener('click', () => apply(button.dataset.cqFilter || 'all')));
})();

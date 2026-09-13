(() => {
  const root = document.querySelector('.academic-calendar');
  if (!root) return;

  const label = root.querySelector('[data-calendar-label]');
  const days = root.querySelector('[data-calendar-days]');
  const todayLabel = root.querySelector('[data-calendar-today]');
  const prev = root.querySelector('[data-calendar-prev]');
  const next = root.querySelector('[data-calendar-next]');

  const now = new Date();
  let visible = new Date(now.getFullYear(), now.getMonth(), 1);

  const publicEventDates = new Set([
    '2026-09-15',
    '2026-09-17',
    '2026-09-20'
  ]);

  const isoDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const render = () => {
    if (!label || !days) return;

    label.textContent = visible.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });

    days.innerHTML = '';

    const firstDay = new Date(visible.getFullYear(), visible.getMonth(), 1);
    const gridStart = new Date(firstDay);
    gridStart.setDate(firstDay.getDate() - firstDay.getDay());

    for (let i = 0; i < 42; i += 1) {
      const date = new Date(gridStart);
      date.setDate(gridStart.getDate() + i);

      const cell = document.createElement('span');
      const key = isoDate(date);
      cell.className = 'academic-calendar__day';
      cell.textContent = date.getDate();
      cell.setAttribute('aria-label', date.toLocaleDateString());

      if (date.getMonth() !== visible.getMonth()) {
        cell.classList.add('academic-calendar__day--muted');
      }
      if (key === isoDate(now)) {
        cell.classList.add('academic-calendar__day--today');
      }
      if (publicEventDates.has(key)) {
        cell.classList.add('academic-calendar__day--event');
      }

      days.appendChild(cell);
    }
  };

  if (todayLabel) {
    todayLabel.textContent = now.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  prev?.addEventListener('click', () => {
    visible = new Date(visible.getFullYear(), visible.getMonth() - 1, 1);
    render();
  });

  next?.addEventListener('click', () => {
    visible = new Date(visible.getFullYear(), visible.getMonth() + 1, 1);
    render();
  });

  render();
})();

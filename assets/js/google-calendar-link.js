(() => {
  const root = document.querySelector('[data-calendar-event-builder]');
  if (!root) return;

  const form = root.querySelector('[data-event-form]');
  const errorBox = root.querySelector('[data-event-error]');
  if (!form) return;

  const formatGoogleLocal = (value) => value.replace(/[-:]/g, '').replace('T', 'T') + '00';

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (errorBox) {
      errorBox.hidden = true;
      errorBox.textContent = '';
    }

    const data = new FormData(form);
    const title = String(data.get('title') || '').trim();
    const start = String(data.get('start') || '').trim();
    const end = String(data.get('end') || '').trim();
    const location = String(data.get('location') || '').trim();
    const description = String(data.get('description') || '').trim();
    const category = String(data.get('category') || '').trim();

    if (!title || !start || !end) {
      if (errorBox) {
        errorBox.textContent = 'Please complete the title, start, and end fields.';
        errorBox.hidden = false;
      }
      return;
    }

    const startDate = new Date(start);
    const endDate = new Date(end);
    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime()) || endDate <= startDate) {
      if (errorBox) {
        errorBox.textContent = 'End time must be later than start time.';
        errorBox.hidden = false;
      }
      return;
    }

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      dates: `${formatGoogleLocal(start)}/${formatGoogleLocal(end)}`,
      ctz: 'Asia/Bangkok'
    });

    const details = [category ? `Category: ${category}` : '', description]
      .filter(Boolean)
      .join('\n\n');

    if (details) params.set('details', details);
    if (location) params.set('location', location);

    const url = `https://calendar.google.com/calendar/render?${params.toString()}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
})();

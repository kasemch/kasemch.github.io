(() => {
  const root = document.querySelector('[data-calendar-event-builder]');
  if (!root) return;

  const directButton = root.querySelector('[data-direct-save]');
  const form = root.querySelector('[data-event-form]');
  const error = root.querySelector('[data-event-error]');
  const success = root.querySelector('[data-direct-success]');

  const config = window.KASEM_GOOGLE_CALENDAR_CONFIG || {};
  if (!directButton || !form || !config.enabled || !config.clientId || !window.google?.accounts?.oauth2) return;

  const setError = (message) => {
    if (!error) return;
    error.textContent = message;
    error.hidden = !message;
  };

  const bangkokIso = (value) => `${value}:00+07:00`;

  const readEvent = () => {
    const data = new FormData(form);
    const title = String(data.get('title') || '').trim();
    const start = String(data.get('start') || '');
    const end = String(data.get('end') || '');
    if (!title || !start || !end) throw new Error('Please complete the title, start, and end fields.');
    if (new Date(bangkokIso(end)) <= new Date(bangkokIso(start))) throw new Error('End time must be after start time.');

    const category = String(data.get('category') || '').trim();
    const description = String(data.get('description') || '').trim();

    return {
      summary: title,
      location: String(data.get('location') || '').trim(),
      description: category ? `[${category}]${description ? `\n\n${description}` : ''}` : description,
      start: { dateTime: bangkokIso(start), timeZone: config.timezone || 'Asia/Bangkok' },
      end: { dateTime: bangkokIso(end), timeZone: config.timezone || 'Asia/Bangkok' }
    };
  };

  const tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: config.clientId,
    scope: config.scope,
    callback: async (tokenResponse) => {
      if (!tokenResponse?.access_token) {
        setError('Google authorization did not return an access token.');
        return;
      }
      try {
        const event = readEvent();
        const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(config.calendarId || 'primary')}/events`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(event)
        });
        if (!response.ok) throw new Error(`Google Calendar returned ${response.status}.`);
        const created = await response.json();
        setError('');
        if (success) {
          success.hidden = false;
          success.innerHTML = created.htmlLink
            ? `Event created. <a href="${created.htmlLink}" target="_blank" rel="noopener">Open in Google Calendar</a>`
            : 'Event created in Google Calendar.';
        }
      } catch (err) {
        setError(err.message || 'Unable to create the event.');
      }
    },
    error_callback: () => setError('Google authorization was cancelled or unavailable.')
  });

  directButton.hidden = false;
  directButton.addEventListener('click', () => {
    try {
      readEvent();
      setError('');
      if (success) success.hidden = true;
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } catch (err) {
      setError(err.message);
    }
  });
})();

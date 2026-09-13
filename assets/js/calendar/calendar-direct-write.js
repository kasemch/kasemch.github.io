(() => {
  const root = document.querySelector('[data-calendar-event-builder]');
  const config = window.KASEM_GOOGLE_CALENDAR_CONFIG || {};
  if (!root || !config.enabled || !config.clientId || !window.KasemGoogleAuth) return;

  const form = root.querySelector('[data-event-form]');
  const directButton = root.querySelector('[data-direct-save]');
  const errorBox = root.querySelector('[data-event-error]');
  const successBox = root.querySelector('[data-direct-success]');
  if (!form || !directButton) return;

  const setError = (message = '') => {
    if (!errorBox) return;
    errorBox.textContent = message;
    errorBox.hidden = !message;
  };

  const setSuccess = (message = '', htmlLink = '') => {
    if (!successBox) return;
    successBox.textContent = '';
    if (!message) {
      successBox.hidden = true;
      return;
    }
    successBox.append(document.createTextNode(message));
    if (htmlLink) {
      successBox.append(document.createTextNode(' '));
      const link = document.createElement('a');
      link.href = htmlLink;
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = 'Open in Google Calendar';
      successBox.append(link);
    }
    successBox.hidden = false;
  };

  const asBangkokIso = (value) => `${value}:00+07:00`;

  const readEvent = () => {
    const data = new FormData(form);
    const title = String(data.get('title') || '').trim();
    const start = String(data.get('start') || '').trim();
    const end = String(data.get('end') || '').trim();
    if (!title || !start || !end) throw new Error('Please complete the title, start, and end fields.');
    if (new Date(asBangkokIso(end)) <= new Date(asBangkokIso(start))) throw new Error('End time must be after start time.');

    const category = String(data.get('category') || '').trim();
    const description = String(data.get('description') || '').trim();
    return {
      summary: title,
      location: String(data.get('location') || '').trim(),
      description: category ? `[${category}]${description ? `\n\n${description}` : ''}` : description,
      start: { dateTime: asBangkokIso(start), timeZone: config.timezone || 'Asia/Bangkok' },
      end: { dateTime: asBangkokIso(end), timeZone: config.timezone || 'Asia/Bangkok' }
    };
  };

  const explainHttpFailure = (status) => {
    if (status === 401) return 'Google authorization expired or is no longer valid. Please authorize again or use Review in Google Calendar.';
    if (status === 403) return 'Google Calendar denied this action. Check account permission or use Review in Google Calendar.';
    if (status === 429) return 'Google Calendar is temporarily rate-limited. Please retry later or use Review in Google Calendar.';
    return `Google Calendar could not create the event (${status}). You can still use Review in Google Calendar.`;
  };

  directButton.hidden = false;
  directButton.addEventListener('click', async () => {
    directButton.disabled = true;
    setError('');
    setSuccess('');
    try {
      const event = readEvent();
      const token = await window.KasemGoogleAuth.requestToken({
        clientId: config.clientId,
        scope: config.scope,
        prompt: 'consent'
      });
      const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(config.calendarId || 'primary')}/events`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      });
      if (!response.ok) throw new Error(explainHttpFailure(response.status));
      const created = await response.json();
      if (!created?.id) throw new Error('Google Calendar did not return a verified event ID.');
      setSuccess(`Event created successfully. Event ID: ${created.id}.`, created.htmlLink || '');
    } catch (error) {
      setError(error?.message || 'Unable to create the event. Please use Review in Google Calendar.');
    } finally {
      directButton.disabled = false;
    }
  });
})();

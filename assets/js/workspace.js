document.addEventListener('DOMContentLoaded', () => {
  const panels = document.querySelectorAll('[data-aw-panel]');
  const toggles = document.querySelectorAll('[data-aw-open]');

  const closePanels = () => panels.forEach((panel) => { panel.hidden = true; });

  toggles.forEach((button) => {
    button.addEventListener('click', () => {
      const target = document.querySelector(`[data-aw-panel="${button.dataset.awOpen}"]`);
      if (!target) return;
      const willOpen = target.hidden;
      closePanels();
      target.hidden = !willOpen;
      if (willOpen) target.querySelector('input, textarea, select')?.focus();
    });
  });

  document.querySelectorAll('[data-aw-close]').forEach((button) => {
    button.addEventListener('click', closePanels);
  });

  const fileInput = document.querySelector('#aw-file');
  const fileResult = document.querySelector('#aw-file-result');
  if (fileInput && fileResult) {
    fileInput.addEventListener('change', () => {
      const file = fileInput.files?.[0];
      if (!file) {
        fileResult.textContent = 'No file selected.';
        return;
      }

      const name = file.name.toLowerCase();
      const rules = [
        { test: /(hed|ped|rhe)\d{4}|week|lecture|worksheet|rubric|teaching/, label: 'Teaching' },
        { test: /research|proposal|ethic|study|move24|manuscript/, label: 'Research' },
        { test: /publication|article|journal|doi|paper/, label: 'Publications' },
        { test: /qa|aun|sar|curriculum|plo|clo|mapping|tqf|mr30/, label: 'Curriculum & Quality' },
        { test: /project|system|prototype|innovation|ai|digital/, label: 'Innovation & Projects' }
      ];
      const matched = rules.find((rule) => rule.test.test(name));
      const category = matched?.label || 'Needs review';
      const sizeMb = (file.size / 1024 / 1024).toFixed(2);
      fileResult.innerHTML = `<strong>Suggested category:</strong> ${category}<br><span>${file.name} · ${sizeMb} MB</span><br><small>Local preview only — this file has not been uploaded.</small>`;
    });
  }

  const eventForm = document.querySelector('#aw-event-form');
  if (eventForm) {
    eventForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(eventForm);
      const title = String(data.get('title') || '').trim();
      const start = String(data.get('start') || '').trim();
      const end = String(data.get('end') || '').trim();
      const details = String(data.get('details') || '').trim();
      if (!title || !start || !end) return;

      const compact = (value) => new Date(value).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
      const url = new URL('https://calendar.google.com/calendar/render');
      url.searchParams.set('action', 'TEMPLATE');
      url.searchParams.set('text', title);
      url.searchParams.set('dates', `${compact(start)}/${compact(end)}`);
      if (details) url.searchParams.set('details', details);
      window.open(url.toString(), '_blank', 'noopener,noreferrer');
    });
  }

  const note = document.querySelector('#aw-note');
  const noteStatus = document.querySelector('#aw-note-status');
  document.querySelector('#aw-copy-note')?.addEventListener('click', async () => {
    if (!note?.value.trim()) return;
    try {
      await navigator.clipboard.writeText(note.value);
      if (noteStatus) noteStatus.textContent = 'Copied to clipboard. Nothing was sent or stored online.';
    } catch {
      if (noteStatus) noteStatus.textContent = 'Clipboard access was unavailable. Please copy the note manually.';
    }
  });
});

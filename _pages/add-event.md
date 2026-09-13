---
permalink: /add-event/
title: "Add Calendar Event"
author_profile: false
---

<div class="calendar-event-builder" data-calendar-event-builder>
  <div class="calendar-event-builder__notice">
    <strong>Review-before-save flow.</strong> This form can always prepare an event for review in Google Calendar. Direct save is shown only when the verified OAuth configuration gate is enabled.
  </div>

  <form class="calendar-event-builder__form" data-event-form>
    <label>
      <span>Event title</span>
      <input type="text" name="title" required maxlength="160" autocomplete="off">
    </label>

    <div class="calendar-event-builder__grid">
      <label>
        <span>Start</span>
        <input type="datetime-local" name="start" required>
      </label>
      <label>
        <span>End</span>
        <input type="datetime-local" name="end" required>
      </label>
    </div>

    <label>
      <span>Location</span>
      <input type="text" name="location" maxlength="240" autocomplete="off">
    </label>

    <label>
      <span>Description</span>
      <textarea name="description" rows="5" maxlength="2000"></textarea>
    </label>

    <label>
      <span>Category</span>
      <select name="category">
        <option>Teaching</option>
        <option>Research</option>
        <option>Meeting</option>
        <option>Academic Service</option>
        <option>Deadline</option>
        <option>Personal</option>
      </select>
    </label>

    <p class="calendar-event-builder__timezone">Timezone: <strong>Asia/Bangkok</strong></p>
    <p class="calendar-event-builder__error" data-event-error role="alert" hidden></p>
    <p class="calendar-event-builder__success" data-direct-success role="status" hidden></p>

    <div class="calendar-event-builder__actions">
      <button class="calendar-event-builder__submit" type="submit">Review in Google Calendar</button>
      {% if site.data.google_calendar.direct_write_enabled and site.data.google_calendar.client_id != '' %}
      <button class="calendar-event-builder__submit" type="button" data-direct-save hidden>Save directly to Google Calendar</button>
      {% endif %}
    </div>
  </form>

  <p class="calendar-event-builder__privacy">Nothing entered in this form is stored by this GitHub Pages site. Direct write uses a short-lived browser access token only when explicitly enabled; no refresh token or client secret is stored in the repository or browser storage.</p>
</div>

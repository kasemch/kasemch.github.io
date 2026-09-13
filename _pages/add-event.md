---
permalink: /add-event/
title: "Add Calendar Event"
author_profile: false
---

<div class="calendar-event-builder" data-calendar-event-builder>
  <div class="calendar-event-builder__notice">
    <strong>Review-before-save flow.</strong> This form does not write directly to Google Calendar. It prepares an event and opens Google Calendar so you can review and save it yourself.
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

    <button class="calendar-event-builder__submit" type="submit">Review in Google Calendar</button>
  </form>

  <p class="calendar-event-builder__privacy">Nothing entered in this form is stored by this GitHub Pages site. Direct calendar writes remain disabled until the authenticated integration gate is approved.</p>
</div>

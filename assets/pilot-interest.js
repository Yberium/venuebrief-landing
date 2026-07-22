(function initialiseYberiumPilotInterest(root) {
  'use strict';

  function clean(value) { return String(value ?? '').trim(); }

  async function readJson(response) {
    let body;
    try { body = await response.json(); }
    catch { throw new Error('Yberium returned an unreadable response.'); }
    if (!response.ok || !body?.ok) {
      const error = new Error(clean(body?.message) || 'The pilot registration could not be submitted.');
      error.details = Array.isArray(body?.details) ? body.details : [];
      throw error;
    }
    return body;
  }

  function bind(windowObject) {
    const { document } = windowObject;
    const form = document.getElementById('pilotInterestForm');
    const status = document.getElementById('pilotFormStatus');
    const success = document.getElementById('pilotFormSuccess');
    const reference = document.getElementById('pilotFormReference');
    const submit = document.getElementById('pilotFormSubmit');
    if (!form || !status || !success || !reference || !submit) return;

    const endpoint = clean(form.dataset.endpoint);

    function setStatus(message, state = '') {
      status.textContent = message;
      status.dataset.state = state;
    }

    function focusFirstError(details) {
      const field = clean(details?.[0]?.field);
      if (!field) return;
      const target = form.elements.namedItem(field);
      if (target && typeof target.focus === 'function') target.focus();
    }

    async function checkAvailability() {
      if (!endpoint) {
        submit.disabled = true;
        setStatus('Pilot registration is temporarily unavailable.', 'error');
        return;
      }
      try {
        const response = await windowObject.fetch(`${endpoint}/config`, { headers: { accept: 'application/json' } });
        const body = await readJson(response);
        if (!body.enabled) throw new Error('Pilot registration is temporarily unavailable.');
        submit.disabled = false;
        setStatus('No payment is required. Yberium reviews each request before issuing a pilot invitation.');
      } catch (error) {
        submit.disabled = true;
        setStatus(clean(error?.message) || 'Pilot registration is temporarily unavailable.', 'error');
      }
    }

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (submit.disabled) return;

      const data = new windowObject.FormData(form);
      const payload = {
        contactName: clean(data.get('contactName')),
        email: clean(data.get('email')),
        venueName: clean(data.get('venueName')),
        venueType: clean(data.get('venueType')),
        location: clean(data.get('location')),
        teamSize: Number(data.get('teamSize')),
        operationalProblem: clean(data.get('operationalProblem')),
        problemFrequency: clean(data.get('problemFrequency')),
        consent: data.get('consent') === 'on',
        website: clean(data.get('website')),
        source: 'yberium-pilot-page',
      };

      submit.disabled = true;
      submit.textContent = 'Submitting…';
      setStatus('Submitting your pilot request securely…');

      try {
        const response = await windowObject.fetch(endpoint, {
          method: 'POST',
          headers: { 'content-type': 'application/json', accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        const body = await readJson(response);
        reference.textContent = body.reference;
        form.hidden = true;
        success.hidden = false;
        success.focus();
      } catch (error) {
        setStatus(clean(error?.message) || 'The pilot registration could not be submitted.', 'error');
        focusFirstError(error.details);
        submit.disabled = false;
        submit.textContent = 'Register pilot interest';
      }
    });

    checkAvailability();
  }

  if (root.document) bind(root);
  root.YberiumPilotInterest = { bind, readJson };
})(typeof globalThis !== 'undefined' ? globalThis : this);

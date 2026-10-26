// Client-side behaviour for every signup form on the site.
// Forms post JSON to the destination set in Site settings. Until one is set,
// they run in preview mode and go straight to the next step without sending.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const started = Date.now();

function utm() {
  const p = new URLSearchParams(location.search);
  const out = {};
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign']) if (p.get(k)) out[k] = p.get(k);
  return out;
}

async function submit(form, event) {
  event.preventDefault();
  const d = form.dataset;
  const msg = form.querySelector('.form-msg');
  const email = form.querySelector('[name=email]');
  const button = form.querySelector('button[type=submit]');
  const data = Object.fromEntries(new FormData(form));
  msg.textContent = '';
  email.removeAttribute('aria-invalid');

  if (!data.email?.trim()) return fail(email, msg, d.msgRequired);
  if (!EMAIL.test(data.email.trim())) return fail(email, msg, d.msgInvalid);
  // Spam protection: the hidden field stays empty for people, and people take more than two seconds.
  if (data.website || Date.now() - started < 2000) return done(form);

  const payload = {
    email: data.email.trim(),
    first_name: (data.first_name ?? '').trim(),
    source: d.source,
    kind: d.kind,
    retailer: data.retailer ?? '',
    order_number: (data.order_number ?? '').trim(),
    page: location.pathname,
    ...utm(),
  };

  const label = button.textContent;
  button.disabled = true;
  if (d.msgSending) button.textContent = d.msgSending;
  try {
    if (d.endpoint) {
      const res = await fetch(d.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
    } else {
      console.info('[Power With] Preview mode: no form destination set yet.', payload);
    }
    done(form);
  } catch (err) {
    console.error(err);
    msg.textContent = d.msgError ?? '';
    button.disabled = false;
    button.textContent = label;
  }
}

function fail(input, msg, text) {
  input.setAttribute('aria-invalid', 'true');
  input.focus();
  msg.textContent = text ?? '';
}

function done(form) {
  const d = form.dataset;
  if (d.redirect) {
    location.href = d.redirect;
    return;
  }
  const msg = form.querySelector('.form-msg');
  form.querySelectorAll('.field, button, .body-sm').forEach((el) => (el.hidden = true));
  msg.textContent = d.success ?? '';
  msg.focus?.();
}

export function wireForms() {
  document.querySelectorAll('form.js-optin:not([data-wired])').forEach((form) => {
    form.dataset.wired = '1';
    form.addEventListener('submit', (e) => submit(form, e));
  });
}

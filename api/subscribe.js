// Receives signups from the site's forms and adds them to the EmailOctopus list.
// Environment: EMAILOCTOPUS_API_KEY, EMAILOCTOPUS_LIST_ID, ALLOWED_ORIGINS.
import { cors, allowedOrigins } from './_shared.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clip = (v, n = 200) => String(v ?? '').trim().slice(0, n);
const tagSafe = (v) => clip(v, 60).toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '');

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  const raw = typeof req.body === 'string' ? req.body : '';
  if ((req.headers['content-type'] || '').includes('application/x-www-form-urlencoded')) {
    return Object.fromEntries(new URLSearchParams(raw));
  }
  try { return JSON.parse(raw || '{}'); } catch { return {}; }
}

function safeRedirect(url) {
  try {
    const u = new URL(url);
    return allowedOrigins().includes(u.origin) ? u.href : null;
  } catch { return null; }
}

export default async function handler(req, res) {
  const ok = cors(req, res);
  if (req.method === 'OPTIONS') return res.status(ok ? 204 : 403).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });
  if (!ok) return res.status(403).json({ error: 'origin_not_allowed' });

  const body = await readBody(req);
  const isForm = !(req.headers['content-type'] || '').includes('application/json');
  const finish = (status, payload) => {
    const to = isForm && status < 300 ? safeRedirect(body.redirect) : null;
    return to ? res.redirect(303, to) : res.status(status).json(payload);
  };

  // Honeypot: people never fill this field.
  if (body.website) return finish(200, { ok: true });

  const email = clip(body.email, 254).toLowerCase();
  if (!EMAIL.test(email)) return finish(400, { error: 'invalid_email' });

  const key = process.env.EMAILOCTOPUS_API_KEY;
  const list = process.env.EMAILOCTOPUS_LIST_ID;
  if (!key || !list) return finish(500, { error: 'not_configured' });

  const source = tagSafe(body.source) || 'website';
  const tags = { [source]: true };
  if (body.kind === 'claim') tags['preorder-claim'] = true;
  const campaign = tagSafe(body.utm_campaign);
  if (campaign) tags[`utm-${campaign}`] = true;

  const fields = { Source: source };
  if (clip(body.first_name)) fields.FirstName = clip(body.first_name, 100);
  if (clip(body.retailer)) fields.Retailer = clip(body.retailer, 100);
  if (clip(body.order_number)) fields.OrderNumber = clip(body.order_number, 100);

  const r = await fetch(`https://api.emailoctopus.com/lists/${list}/contacts`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email_address: email, fields, tags, status: 'subscribed' }),
  });
  if (!r.ok) {
    console.error('EmailOctopus error', r.status, (await r.text()).slice(0, 500));
    return finish(502, { error: 'upstream_error' });
  }
  return finish(200, { ok: true });
}

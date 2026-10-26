// Finishes "Sign in with GitHub" and hands the token back to the editor window.
// Environment: GITHUB_OAUTH_CLIENT_ID, GITHUB_OAUTH_CLIENT_SECRET, ALLOWED_ORIGINS.
import { allowedOrigins } from './_shared.js';

function page(status, content) {
  const origins = JSON.stringify(allowedOrigins());
  const message = JSON.stringify(`authorization:github:${status}:${JSON.stringify(content)}`);
  return `<!doctype html><html><body><script>
(function () {
  var allowed = ${origins};
  function receive(e) {
    if (allowed.indexOf(e.origin) === -1) return;
    window.opener.postMessage(${message}, e.origin);
    window.removeEventListener('message', receive);
  }
  window.addEventListener('message', receive);
  window.opener && window.opener.postMessage('authorizing:github', '*');
})();
</script></body></html>`;
}

export default async function handler(req, res) {
  const { code, state } = req.query;
  const cookie = /(?:^|;\s*)oauth_state=([a-f0-9]+)/.exec(req.headers.cookie || '');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  if (!code || !cookie || cookie[1] !== state) {
    return res.status(400).send(page('error', { message: 'Sign-in could not be verified. Please try again.' }));
  }
  const r = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
      client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
      code,
    }),
  });
  const data = await r.json().catch(() => ({}));
  if (!data.access_token) {
    return res.status(401).send(page('error', { message: data.error_description || 'Sign-in failed.' }));
  }
  res.send(page('success', { token: data.access_token, provider: 'github' }));
}

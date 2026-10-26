// Starts "Sign in with GitHub" for the Sveltia editor (Decap-compatible OAuth flow).
// Environment: GITHUB_OAUTH_CLIENT_ID.
import crypto from 'node:crypto';

export default function handler(req, res) {
  const id = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!id) return res.status(500).send('GitHub sign-in is not configured yet.');
  const state = crypto.randomBytes(16).toString('hex');
  res.setHeader('Set-Cookie', `oauth_state=${state}; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=600`);
  const url = new URL('https://github.com/login/oauth/authorize');
  url.searchParams.set('client_id', id);
  // Must match the OAuth app's "Authorization callback URL" exactly.
  url.searchParams.set('redirect_uri', `https://${req.headers.host}/api/callback`);
  url.searchParams.set('scope', 'repo,user');
  url.searchParams.set('state', state);
  res.redirect(302, url.href);
}

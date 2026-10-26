# Power With · book website

The website for *Power With: The Relational Foundation of Lasting Influence* by Sophia Life.

- **Live (staging):** https://life-culture.github.io/powerwith/
- **Editor:** https://life-culture.github.io/powerwith/admin/
- **Editing guide for Sophia:** [docs/EDITING_GUIDE.md](docs/EDITING_GUIDE.md)
- **Original brief, copy and wireframes:** [docs/handoff/](docs/handoff/README.md)

## How it fits together

| Piece | What it does | Cost |
|---|---|---|
| GitHub repository `life-culture/powerwith` | Holds the code and every word and image on the site | Free |
| GitHub Pages | Hosts the site. Rebuilds automatically about two minutes after each change | Free |
| Sveltia CMS (`/admin/`) | The visual editor. Saves straight into the repository | Free, open source |
| Vercel function (`api/`) | Receives form signups and adds them to EmailOctopus. Also handles "Sign in with GitHub" for the editor | Free (Hobby plan) |
| EmailOctopus | The email list. Each form adds a tag such as `home-hero` or `preorder-claim` | Free up to 2,500 contacts |
| Domain | Sophia's own address, when connected | Annual registrar fee, the only recurring cost |

## Reader path

1. Home or `/introduction` → signup form (five placements, each tagged).
2. `/thank-you` → offers the pre-order and a share link.
3. EmailOctopus sends the Introduction and the letter sequence (set up an automation triggered by "joins list").
4. `/preorder` → retailer buttons, a "hear first" signup while store links are pending, and the Orientation claim form (tag `preorder-claim`, with Retailer and OrderNumber fields).

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # regenerates the editor config, then builds to dist/
```

Requires Node 20 or newer.

## Connecting the signup forms (one time)

1. Import this repo into Vercel (Add New → Project → `life-culture/powerwith`). Framework preset Astro is fine.
2. Add environment variables: `EMAILOCTOPUS_API_KEY`, `EMAILOCTOPUS_LIST_ID`, `ALLOWED_ORIGINS` (see `.env.example`).
3. Deploy, then put `https://powerwith.vercel.app/api/subscribe` in **Site settings → Forms** for both destinations.

Until a destination is set, forms run in preview mode: they validate and go to the thank-you page without sending anything.

## "Sign in with GitHub" for the editor (optional, recommended)

Out of the box, the editor offers **Sign in with Token** (a GitHub personal access token). For a one-click button:

1. GitHub → Settings → Developer settings → OAuth Apps → New. Homepage `https://life-culture.github.io/powerwith/`. Callback `https://powerwith.vercel.app/api/callback`.
2. Add `GITHUB_OAUTH_CLIENT_ID` and `GITHUB_OAUTH_CLIENT_SECRET` to Vercel.
3. Rebuild the editor config with `CMS_AUTH_URL=https://powerwith.vercel.app npm run cms`, commit and push.

## Moving to Sophia's domain

1. In the repo, Settings → Pages → Custom domain. Add the DNS records GitHub shows at the registrar.
2. The workflow picks up the new address automatically (the base path becomes `/`).
3. Update `ALLOWED_ORIGINS` in Vercel and `CMS_SITE_URL` in `scripts/cms-config.mjs`.

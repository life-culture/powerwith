# Standing instructions for AI working on the Power With website

Place a copy of this file at the repository root as `AGENTS.md` (and `CLAUDE.md` for Claude Code). These rules apply to every session, every task and every file.

## 1. The owner edits this site herself

Sophia Life is the owner. She is not a developer. After launch she will change wording, delete text, and adjust formatting slightly, on her own, through a visual editor. Every decision you make must protect that.

- **No visible text may be hard-coded in templates or components.** Every heading, paragraph, label, button, link text, form label, placeholder, helper line, navigation item, footer item, alt text, page title and meta description comes from editable content.
- Every section must render cleanly when a field is empty, when a list item is deleted, and when text is much longer or shorter than the current copy. Empty means hidden, never broken.
- Formatting she can change is deliberately limited (see `02_EDITING_REQUIREMENTS.md`). Offer choices from the design system. Never expose raw CSS, HTML or code fields to her.
- When you add a component, add its editor schema in the same change. A component without an editor schema is unfinished.
- Read `02_EDITING_REQUIREMENTS.md` before building anything. Its acceptance tests define done.

## 2. Use the approved copy exactly

- The words in `04_CONTENT/` are approved. Use them verbatim. Do not rewrite, tighten, "improve", reorder or add copy.
- Bracketed text such as `[Years in practice]` marks content Sophia has not supplied yet. Keep it visible in staging. Never invent replacement facts, names, numbers, endorsements, credentials or quotes.
- Sections marked `visible: false` stay built and hidden until she switches them on.
- When you truly must write a new string (a form error message, a 404 page), keep it short and follow the voice rules below, then list it in your summary so Sophia can review it.

## 3. Voice rules for any new text

These are Sophia's standing editorial rules.

- Short declarative sentences. Plain, warm, precise.
- No em dashes or en dashes used as punctuation.
- No contractions.
- No colons that introduce lists or content.
- No contrast-negation constructions of any kind, such as "it is not X, it is Y" or "not because X, but because Y". State the positive claim.
- No "if X, then Y" constructions.
- No exclamation marks, hype or stacked adjectives.
- Avoid the words truth, mastery, quiet, and reality or real used as abstract nouns.
- No clinical labels for people.
- Never use this reserved line anywhere on the site: "The quality of power you embody will shape the quality of the world we all inhabit."

## 4. Design rules

- Use only the values in `design-tokens.json`. No new colors, fonts or shadows.
- **Ochre (#B98A3E) is removed from the brand.** Clay (#8E4A30) replaces every former Ochre use. Ignore Ochre in any older brand file.
- Clay on Obsidian is too low in contrast for text. Use it only for buttons with Bone text, rules, marks and large shapes. Small labels on dark grounds use Stone.
- The principle count is **ten**. There is no eleventh principle.
- The wordmark POWER WITH is always Montserrat Regular, all caps, widely tracked. Serif faces never set the wordmark.
- Sentence case for serif text. All caps only in Montserrat.
- Meet WCAG 2.2 AA. Real buttons, links and labels. Visible focus states.

## 5. Ownership and cost

- No paid website-builder subscription. Use open-source tools and free hosting tiers where possible, and say plainly in your summary where any recurring cost exists (the domain, at minimum).
- Every account (domain, repository, hosting, CMS, analytics, email) is created under Sophia's ownership, with the developer added as a collaborator.

## 6. How to work

- Before building a section, compare it against its artboard in `05_WIREFRAME/` and its content file in `04_CONTENT/`.
- After each milestone, summarize what changed, what is placeholder, and any decision you made that Sophia should confirm.
- Ask before deviating from the wireframe, the copy or the design tokens.

## 7. How this repository is built

- **Astro** static site. Pages in `src/pages/` are thin: each loads one YAML file from `src/content/pages/` and renders its ordered `sections` list through `src/components/Sections.astro`.
- **Every section type** lives in `src/components/sections/` and has its editor schema in `scripts/cms-config.mjs`. Add both in the same change, then run `npm run cms` to regenerate `public/admin/config.yml`. The schema validates against Sveltia's JSON schema.
- **Design tokens and ground pairings** live in `src/styles/global.css` (`.g-obsidian` and the others). Do not add colors.
- **Links and images** go through `href()` and `asset()` in `src/lib/content.js`, which add the GitHub Pages base path and treat bracketed values as placeholders.
- **Forms** are `OptinForm.astro` and `ClaimForm.astro`, with behaviour in `src/scripts/forms.js`. Destinations come from `src/content/settings.yml` → `forms`. An empty destination means preview mode (no sending).
- **Signups** go to `api/subscribe.js`, a Vercel function that upserts the contact into EmailOctopus with a tag per form. The API key lives only in Vercel environment variables.
- **Editor** is Sveltia CMS at `/admin/`, committing straight to `main`. The GitHub Action in `.github/workflows/deploy.yml` rebuilds the site on every push.

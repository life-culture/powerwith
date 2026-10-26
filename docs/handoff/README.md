# Power With · Website Handoff

Prepared for Sophia Life's web developer, October 2026.

This folder is the complete brief for building the Power With book website. It is written for a developer and for the AI tools the developer works with. Read this file first, then follow the reading order below.

## The one-paragraph version

Build a small marketing website for the book *Power With: The Relational Foundation of Lasting Influence* by Sophia Life. The site's single job is to collect email opt-ins for a free resource, the book's Introduction. A separate sales page handles pre-orders. The design, the page structure and the copy are already decided and approved. Your job is to turn them into a fast, accessible, responsive site that **Sophia can edit herself, without code and without a paid website-builder subscription.** Editability is the most important requirement in this brief.

## Reading order

| # | File | What it is |
|---|---|---|
| 1 | `README.md` | This file. Orientation and package contents. |
| 2 | `AI_INSTRUCTIONS.md` | Standing rules for any AI working on this project. Copy it into the repository root as `AGENTS.md` (and `CLAUDE.md` if you use Claude Code) so every session reads it. |
| 3 | `01_BUILD_BRIEF.md` | Goals, pages, architecture recommendation, integrations, launch checklist. |
| 4 | `02_EDITING_REQUIREMENTS.md` | **Non-negotiable.** What Sophia must be able to change herself, and the acceptance tests for handover. |
| 5 | `03_DESIGN_SYSTEM.md` and `design-tokens.json` | Colors, type, spacing, components, marks and rules. |
| 6 | `04_CONTENT/` | All approved copy as YAML content files, one per page plus site settings. These are meant to become the CMS content files. |
| 7 | `05_WIREFRAME/` | The approved wireframe, one HTML file per artboard, plus notes on how to read them. |
| 8 | `06_ASSETS/ASSETS_CHECKLIST.md` | Every image, icon and logo the site needs, its status and where it comes from. Two mark SVGs are included. |

## What lives outside this folder

These arrive in the shared handoff folder alongside this package (see `06_ASSETS/ASSETS_CHECKLIST.md`):

- **Brand System deck**, exported from Canva as a PDF (14 slides), plus a view link.
- **Brand kit assets** from Canva: logo lockups, wordmark, the ten principle icons, the power over mark, motifs and grain textures, as SVG with PNG fallbacks.
- **Author portraits** from Sophia's recent photoshoot, full-resolution originals.
- **Book cover** front, as a flat high-resolution image.
- **Live wireframe link.** An interactive canvas with all seven artboards. Sophia shares it from its Share menu. The HTML files in `05_WIREFRAME/` are the same artboards.

## Precedence when sources disagree

1. Sophia's direct instruction.
2. `04_CONTENT/` for words. `03_DESIGN_SYSTEM.md` and `design-tokens.json` for design values.
3. The wireframe in `05_WIREFRAME/`.
4. The Canva Brand System deck. It was written for social media first and still lists an Ochre color that has since been **removed**. See `03_DESIGN_SYSTEM.md`, section "Decisions that override older brand files".

## Status at handoff

- Page structure, design direction and copy: approved by Sophia.
- Publication: planned for January 2027, ideally the second week. Exact date to confirm.
- Paperback price: about $21.95. Kindle price to set. Audiobook planned.
- Email platform: not yet set up. Forms must be built so the connection can be added later from the CMS or a single config value (see `01_BUILD_BRIEF.md`).
- Endorsements: none yet. Praise sections are built but hidden.
- Copy will change. Sophia will revise wording after launch, herself. Build for that.

# 05 · Wireframe

These are the seven approved artboards of the Power With website wireframe, exported from the design canvas Sophia reviewed. Sophia can also share the live canvas with you from its Share menu, where you can pan, zoom and click through.

| File | Artboard | Notes |
|---|---|---|
| `Sitemap.dc.html` | Sitemap and reader path | The flow from entry pages to opt-in, thank-you, emails, sales page and retailer. |
| `Main.dc.html` | Home page, desktop | The full 15-section page. Primary reference. |
| `Mobile.dc.html` | Home page, phone (390px) | The top of the page plus the sticky opt-in bar. Shows mobile hierarchy, not every section. |
| `Landing.dc.html` | Opt-in landing page, desktop | No navigation. |
| `LandingMobile.dc.html` | Opt-in landing page, phone | |
| `ThankYou.dc.html` | Thank-you page, desktop | |
| `Preorder.dc.html` | Sales page, desktop | Named "Preorder" for link continuity. Route suggestion `/preorder`. |

## How to read the files

- Each file is plain HTML with inline styles inside an `<x-dc>` wrapper used by the design canvas. Open the source to read exact colors, sizes, spacing and structure. The `support.js` script they reference belongs to the canvas tool and is not needed for your build.
- Treat them as a **visual and structural reference**. Rebuild with your framework's components, the tokens in `design-tokens.json` and the content in `04_CONTENT/`.
- Copy in the HTML matches `04_CONTENT/`. If they ever differ, `04_CONTENT/` wins.
- Forms in the wireframe are not wired. Some buttons are links between artboards to show the flow.
- The principle icons and marks are hand-drawn sketches. Use the brand kit SVGs (see `06_ASSETS/ASSETS_CHECKLIST.md`).
- Bracketed text marks content Sophia has not supplied yet.
- Section ids in the HTML (`#framework`, `#principles`, `#introduction`, `#author`, `#organizations`) are the anchors used by the navigation. Keep them.

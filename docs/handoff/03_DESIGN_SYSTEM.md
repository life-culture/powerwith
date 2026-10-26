# 03 · Design system for the website

This is the web translation of the Power With brand system. Exact values live in `design-tokens.json`. The Canva Brand System deck is the visual reference for the brand as a whole. Where they disagree, this file wins.

## 1. Decisions that override older brand files

1. **Ochre (#B98A3E) is removed.** Clay (#8E4A30) replaces every former Ochre use: buttons, rules, the sigil, accents. Older files still show Ochre. Ignore it.
2. **Ten principles.** The book has ten relational principles. Some older notes mention an eleventh, Presence. It does not exist.
3. **The Trust icon** is two linked rings. An earlier circle-over-arc version is retired.
4. **The official mark** is the fine hairline two-circle sigil as used on the book cover. Thicker-line versions are retired.
5. **The wordmark** POWER WITH is always Montserrat Regular, all caps, tracked very wide. Never a serif.
6. **The subtitle** is singular. *The Relational Foundation of Lasting Influence*.

## 2. Character

Austere, literary, grounded. Large serif language on solid grounds. Generous space. One accent used sparingly. No gradients, no drop shadows except the single soft shadow on the book cover, no rounded corners, no stock imagery, no emoji, no motion beyond gentle fades.

## 3. Color

| Token | Hex | Role |
|---|---|---|
| Obsidian | `#0F0E0C` | Primary dark ground. Text on light grounds. |
| Bone | `#EDE6D8` | Primary light ground. Text on every dark ground. |
| Stone | `#C2B8A6` | Labels and secondary text on dark grounds. Hairlines on dark. |
| Umber | `#3A3531` | Warm charcoal ground. Labels on Bone. Hairlines on Bone. |
| Oxblood | `#4A1C18` | Deep accent ground. Used for "the pattern" and quote bands. |
| Clay | `#8E4A30` | The accent. Primary buttons, rules, the sigil, opt-in bands. |
| Olive | `#3C402F` | Grounded accent ground. Leadership content. |

### Approved ground pairings

Each section's background setting maps to one row. The editor picks the ground. Everything else follows automatically.

| Ground | Text | Labels | Rules and marks | Primary button | Contrast (text, labels) |
|---|---|---|---|---|---|
| Obsidian | Bone | Stone | Clay | Clay ground, Bone text | 15.5, 9.8 |
| Bone | Obsidian | Umber | Clay | Obsidian ground, Bone text | 15.5, 9.8 |
| Umber | Bone | Stone | Stone | Bone ground, Obsidian text | 9.8, 6.2 |
| Oxblood | Bone | Stone | Stone | Bone ground, Obsidian text | 11.5, 7.3 |
| Clay | Bone | Bone | Bone | Obsidian ground, Bone text | 5.3, 5.3 |
| Olive | Bone | Stone | Stone | Bone ground, Obsidian text | 8.6, 5.4 |

**Never set text in Clay on Obsidian.** The ratio is about 2.9, below AA. Clay on dark grounds is for buttons with Bone text, 2px rules and marks only.

Outline buttons use the ground's text color for border and label.

Form inputs on dark grounds are transparent with a Stone border and Bone text. On Clay they are Bone with Obsidian text and an Obsidian border.

## 4. Typography

| Role | Typeface | Weight | Use |
|---|---|---|---|
| Display | Cormorant Garamond | Medium 500, Medium Italic 500 | Title, headlines, quotes, closing lines |
| Body | EB Garamond | Regular 400 | Paragraphs, lists, form inputs |
| Label | Montserrat | Regular 400, Light 300 above 28px | Kickers, labels, buttons, navigation, footer, wordmark |

All three are free on Google Fonts under the SIL Open Font License. Self-host them. Sophia may license Freight Display and Freight Text later. Keep font families as tokens so that swap is a one-line change.

### Type scale

| Token | Desktop | Mobile | Line height | Notes |
|---|---|---|---|---|
| `display-xl` | 96px | 58px | 1.0 | Book title in hero |
| `display-lg` | 76px | 44px | 1.02 | Landing page headline |
| `display-md` | 60px | 40px | 1.08 | Section headlines (the "Large" option is 64px desktop) |
| `display-sm` | 34px | 27px | 1.2 | Hero lead line, closing italic lines |
| `quote` | 28 to 32px | 22 to 24px | 1.25 | Term definitions, measures, endorsements |
| `body-lg` | 21px | 19px | 1.5 | Default body |
| `body-sm` | 17px | 16px | 1.45 | Helper lines under forms |
| `label` | 12px, tracking 0.30em, caps | 11px | 1.3 | Kickers and section labels |
| `button` | 12px, tracking 0.22em, caps | 11 to 12px | 1 | All buttons |
| `wordmark` | 14px, tracking 0.32em, caps | 12px | 1 | POWER WITH in navigation |

### Typesetting rules

- Sentence case for serif text. All caps only in Montserrat.
- Left aligned by default. Centered only for quote bands, the thank-you page and the final call to action.
- One italic line per section at most, used for closing lines and quotes.
- Never bold the serif. Weight comes from size.
- Typographic quotes and apostrophes. Balance headline line breaks and avoid single-word last lines (`text-wrap: balance` where supported).

## 5. Layout and spacing

- Content max width 1200px, 32px side gutter on desktop, 20px on mobile. Narrow sections (the pattern, measures, final call to action) cap at 760 to 1000px.
- Section vertical padding 112px desktop, 48 to 64px mobile.
- Short accent rule above most headlines: 64px by 2px desktop, 48px by 2px mobile, 28px above and 32px below.
- Grids use `repeat(auto-fit, minmax(…, 1fr))` and collapse to one column on phones.
- Hairline dividers 1px in the ground's hairline color.
- Corners are square. Buttons and inputs have no radius.
- Touch targets at least 44px.

## 6. Components

These are the building blocks seen in the wireframe. Each needs an editor schema.

| Component | Used in | Editable fields |
|---|---|---|
| Header and navigation | Home, sales | Logo link, nav items, PRE-ORDER link, primary button |
| Hero with inline opt-in | Home | Kicker, title, subtitle, lead line, body, form, helper line, cover image |
| Praise strip | Home | Quote, attribution, visibility |
| Section header | Most sections | Kicker, headline, intro, headline size |
| Three-column cards | Framework, What changes, Authority, Organizations | List of items each with label, short title, body, optional icon |
| Principle grid | Home | List of ten items each with number, name, line, icon |
| Numbered measures | Home | List of items |
| Bullet list with rules | What changes, landing, Orientation | List of items |
| Opt-in band | Home middle, home final, landing | Kicker, headline, body, fields shown, button text, helper line, ground |
| Quote band | Home pattern, landing | Quote, attribution, ground, alignment |
| Author block | Home, landing | Portrait, name, paragraphs, names list, buttons |
| Endorsement grid | Home | List of quote, name, title |
| Format and retailer block | Sales | Format name, price, list of retailer label and URL |
| Claim form | Sales | Heading, body, list, field labels, button |
| Questions | Sales | List of question and answer |
| Footer | All | Wordmark line, links, copyright |
| Sticky mobile bar | Home on phones | Label, button text, target |

## 7. Marks and icons

- **Power with sigil.** Two circles of equal radius, horizontally overlapping so each center sits on the other's edge. Used in the logo, the cover, the final call to action and as the favicon. Hairline weight. Color follows the ground (Clay on Obsidian, Bone on Clay, Stone on the cover image).
- **Power over mark.** Two circles stacked on one vertical axis, divided by a horizontal rule. Used only beside the power with mark in the framework section.
- **The ten principle icons.** Built only from circles, arcs and straight lines on a 96 by 96 grid with a uniform stroke and round caps. Use the brand kit SVGs and color them with `currentColor`. The wireframe icons are sketches.

| # | Principle | Icon idea |
|---|---|---|
| 01 | Emotional Regulation | A tall wave, a softer wave and a level line |
| 02 | Empathy | The power with mark holding a small circle in the overlap |
| 03 | Listening | An open circle facing two arriving arcs |
| 04 | Humility | A circle resting on a ground line |
| 05 | Understanding | A pointed lens with a pupil |
| 06 | Relationality | Three mutually overlapping circles |
| 07 | Integrity | A circle with one vertical line through it |
| 08 | Trust | Two linked rings |
| 09 | Responsibility | A point, a ring and an open outer arc |
| 10 | Repair | A broken circle bridged by an arc with two stitches |

Two accurate mark SVGs are in `06_ASSETS/icons/`. The rest come from the brand kit export.

## 8. Imagery

- **Author portraits.** Settled stillness, soft side light, eye level, warm and low saturation, generous negative space. No looming low angles.
- **Book cover.** Shown flat with one soft shadow. Obsidian cover, POWER WITH in tracked Montserrat, the sigil, SOPHIA LIFE at the foot.
- **Avoid.** Stock boardrooms, handshakes, chess pieces, arrows, summit poses, any image of one person towering over another.
- **Grain.** The brand uses a fine grain texture on social graphics. On the web, skip it or use it at very low opacity on large dark grounds only, and only if it costs nothing in performance.

## 9. Motion

Optional gentle fade on scroll, under 300ms, disabled under `prefers-reduced-motion`. No parallax, no carousels, no auto-playing media.

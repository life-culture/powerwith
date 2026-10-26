# 01 · Build brief

## 1. The project

*Power With: The Relational Foundation of Lasting Influence* is a nonfiction leadership book by Sophia Life, self-published in January 2027. The book contrasts two orientations to power. Power over is the use of influence to control. Power with is the use of influence to stay in relationship. It is written for high-achieving leaders, executives and founders who struggle relationally despite professional success, and for the people who love them.

The visual identity is austere and literary. Near-black and bone grounds, earth-tone accents, a high-contrast serif for language, a widely tracked sans for labels, and a two-circle sigil as the mark.

## 2. What the site must do

The site exists to collect email opt-ins. Three things earn the opt-in, and every home page section serves one of them.

1. **Benefit.** The visitor understands what the book will give them.
2. **Framework.** The visitor grasps the core ideas, the three terms and the ten principles.
3. **Authority.** The visitor trusts the author.

The free resource is the book's Introduction, delivered as a designed PDF titled *A Language for Power*. Opt-ins enter an email sequence (written later) that leads to the sales page. The sales page's job is the transaction. Pre-orders also receive a gift, the Orientation guide PDF.

### Reader path

1. A visitor lands on the home page, or on the opt-in landing page from social posts, podcasts and talks.
2. They submit first name (optional on the home hero) and email for the Introduction.
3. They arrive on the thank-you page, which confirms delivery and offers the pre-order.
4. The email sequence carries them to the sales page.
5. The sales page links out to retailers. After ordering, the reader enters an order number to claim the Orientation guide.

A small PRE-ORDER text link in the home navigation and footer goes straight to the sales page for readers who are ready.

## 3. Pages

| Route (suggested) | Page | Wireframe file | Content file | Notes |
|---|---|---|---|---|
| `/` | Home | `Main.dc.html`, `Mobile.dc.html` | `04_CONTENT/home.yml` | Long single page, 15 sections, three opt-in forms. |
| `/introduction` | Opt-in landing page | `Landing.dc.html`, `LandingMobile.dc.html` | `04_CONTENT/landing.yml` | No navigation. One action. |
| `/thank-you` | Thank-you page | `ThankYou.dc.html` | `04_CONTENT/thank-you.yml` | Shown after every opt-in. `noindex`. |
| `/preorder` | Sales page | `Preorder.dc.html` | `04_CONTENT/sales.yml` | Retailer links, Orientation claim form, gift and bulk blocks, questions. |
| `/privacy` | Privacy policy | none | to be supplied | Required because the site collects email. Plain text page from the same editable template. |
| `404` | Not found | none | write short copy per voice rules | Link home and to `/introduction`. |

Sophia should be able to change routes later only if your CMS supports it safely. Keep redirects in mind.

## 4. Architecture recommendation

Sophia's constraints, in her words. She does not want the site housed on a platform she pays a subscription for. She wants the editorial and design control she would have in Squarespace.

The recommended pattern is a static site whose content lives as files in a Git repository she owns, edited through a free, visual, Git-based CMS. Content stays portable, hosting can be free, and no vendor holds the site.

### Recommended stack

- **Framework.** Next.js (static export) or Astro. Choose whichever gives the most complete visual, click-to-edit experience with the CMS you pick. Static output only.
- **CMS.** TinaCMS. It offers on-page visual editing, which is the closest match to Squarespace, and stores content as Markdown, MDX, JSON or YAML in the repository. A third-party listing updated October 2026 shows a free Starter plan with 2 users, Git-backed content and visual editing ([toolradar](https://toolradar.com/tools/tinacms/pricing)). **Confirm current terms at tina.io/pricing before committing.** Two editors (Sophia and you) fits the free plan.
- **Hosting.** Cloudflare Pages or Netlify, free tier, with automatic deploys from the main branch.
- **Domain.** Registered in Sophia's name. This is the one unavoidable recurring cost, typically an annual fee.
- **Analytics.** Cloudflare Web Analytics or another free, cookie-light option.
- **Fonts.** Self-host Cormorant Garamond, EB Garamond and Montserrat. All three are free under the SIL Open Font License.

### Fallback if TinaCMS terms change

Because content lives as plain files, the editor can be swapped without rebuilding the site. Two free, open-source Git-based options can read the same files.

- **Sveltia CMS.** MIT licensed, free, a successor to Decap and Netlify CMS ([GitHub](https://github.com/sveltia/sveltia-cms)). Form-based editing with preview.
- **Pages CMS.** Open source, edits content in GitHub repositories directly, with rich-text, image, select and boolean fields ([docs](https://pagescms.org/docs/)).

Structure the content (section 6 below) so either fallback could be configured in a day.

### Options to discuss with Sophia, not recommended by default

- **WordPress, self-hosted.** Free software with a very familiar block editor, but it needs paid hosting, updates and security upkeep.
- **GoHighLevel's built-in site builder.** Sophia already plans to use GoHighLevel for email. Its builder would keep everything in one place, but the site would then depend on that subscription, which is what she wants to avoid.
- **Squarespace, Wix, Webflow.** Excluded by the no-subscription requirement.

State your final choice and its recurring costs to Sophia in writing before you begin.

## 5. Integrations

### Opt-in forms

There are five opt-in forms across the site (home hero, home middle, home final, landing page top and bottom). All submit to the same list and redirect to `/thank-you`.

- Fields: first name (where shown) and email. Email required. Client-side validation with friendly messages in the voice rules.
- The email platform is **not set up yet**. Sophia intends to use GoHighLevel. Build one reusable form component whose destination is a single setting: a form action URL or embed code stored in site settings. Until it is set, forms in staging can post to a harmless test endpoint or log locally.
- Add a hidden source field so each submission records which form it came from (`home-hero`, `home-middle`, `home-final`, `landing-top`, `landing-bottom`).
- Add a honeypot or equivalent spam protection with no paid service.

### Orientation claim form (sales page)

Fields: name, email, where you ordered (select), order number. It sends to the same email platform with a tag such as `preorder-claim`. Delivery of the PDF is handled by the email platform.

### Retailer links

Amazon, Barnes & Noble, Bookshop.org, local bookstore, Amazon Kindle. Each is an editable label and URL in the sales page content. Links open in the same tab.

### PDFs

The Introduction PDF and the Orientation PDF are not part of this build. They are delivered by the email platform.

## 6. Content model

- One content file per page, with an ordered list of typed sections. Sophia can show, hide and reorder sections. See `04_CONTENT/` for the exact fields and copy.
- One site settings file for navigation, footer, social links, form destination and SEO defaults (`04_CONTENT/site-settings.yml`).
- Repeating items (principles, measures, bullets, endorsements, retailer links, questions) are lists Sophia can add to, edit, reorder and delete.
- Long text fields are rich text limited to bold, italic, links and line breaks.

The YAML files in `04_CONTENT/` are written to be dropped into the repository as the starting content. Adjust the shape to your CMS, keep every field.

## 7. Quality bar

- **Responsive** from 360px to 1600px wide. The phone artboards show the intended mobile hierarchy. The mobile home page has a sticky bottom bar with the opt-in button.
- **Accessibility.** WCAG 2.2 AA. Semantic headings in order, labelled form fields, visible focus, alt text from the CMS, sufficient contrast (see design system), reduced motion respected.
- **Performance.** Lighthouse 95 or better on mobile for performance, accessibility, best practices and SEO. Modern image formats and responsive sizes, generated automatically from Sophia's uploads.
- **SEO.** Editable title and description per page, Open Graph and social images, sitemap, robots, canonical URLs. Book schema markup on the home and sales pages.
- **Privacy.** Cookie-light analytics. A privacy page linked from every footer.

## 8. Placeholders and hidden sections at launch

| Item | State at launch |
|---|---|
| Praise strip under the home hero | Built, `visible: false` |
| Praise section on home | Built, `visible: false` until two real endorsements exist |
| Author credentials line `[Years in practice, notable clients and speaking credits.]` | Visible in staging, Sophia to supply or delete before launch |
| Substack latest essays | Static links Sophia can edit, or a simple RSS pull if easy and free |
| Kindle price | `[PRICE]` until set |
| Exact publication date | "January 2027" until confirmed |
| Bulk tier pricing | `[Tier pricing to set.]` |
| Media kit | Button links to a file Sophia can upload later |

## 9. Handover

The build is done when every acceptance test in `02_EDITING_REQUIREMENTS.md` passes with Sophia at the keyboard. Deliver:

- The live site on her domain.
- Admin access for Sophia, set up and tested on her own computer.
- A short editing guide, one or two pages, with screenshots or a recorded walkthrough, covering the tasks in the acceptance tests.
- A list of every account, who owns it, and any recurring cost.
- A 30 to 60 minute live walkthrough where Sophia performs the acceptance tests herself.

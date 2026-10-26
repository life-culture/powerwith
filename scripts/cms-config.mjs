// Builds public/admin/config.yml, the Sveltia CMS editor schema.
// Run with `npm run cms` after changing a section type. Every section type the
// site can render is defined here once, with plain-language labels for Sophia.
import fs from 'node:fs';
import { dump } from 'js-yaml';

const REPO = process.env.CMS_REPO || 'life-culture/powerwith';
const SITE_URL = process.env.CMS_SITE_URL || 'https://life-culture.github.io/powerwith/';
const AUTH_URL = process.env.CMS_AUTH_URL || 'https://powerwith.vercel.app';

// ---------- field helpers ----------
const str = (name, label, hint, extra = {}) => ({ name, label, widget: 'string', required: false, ...(hint && { hint }), ...extra });
const txt = (name, label, hint, extra = {}) => ({ name, label, widget: 'text', required: false, ...(hint && { hint }), ...extra });
const rich = (name, label, hint, extra = {}) => ({ name, label, widget: 'richtext', required: false, ...(hint && { hint }), ...extra });
const bool = (name, label, def, hint) => ({ name, label, widget: 'boolean', default: def, required: false, ...(hint && { hint }) });
const select = (name, label, options, def, hint) => ({ name, label, widget: 'select', options, default: def, required: false, ...(hint && { hint }) });
const obj = (name, label, fields, extra = {}) => ({ name, label, widget: 'object', required: false, fields, ...extra });
const listOf = (name, label, fields, extra = {}) => ({ name, label, widget: 'list', required: false, collapsed: true, fields, ...extra });
const simpleList = (name, label, hint, extra = {}) => ({ name, label, widget: 'list', required: false, ...(hint && { hint }), ...extra });
const richList = (name, label, hint) => ({ name, label, widget: 'list', required: false, collapsed: false, summary: '{{fields.text}}', ...(hint && { hint }), field: rich('text', 'Item') });

const GROUNDS = [
  { label: 'Obsidian (near black)', value: 'obsidian' },
  { label: 'Bone (warm light)', value: 'bone' },
  { label: 'Umber (warm charcoal)', value: 'umber' },
  { label: 'Oxblood (deep red)', value: 'oxblood' },
  { label: 'Clay (the accent)', value: 'clay' },
  { label: 'Olive (deep green)', value: 'olive' },
];

const visible = bool('visible', 'Show this section on the page', true, 'Switch off to hide the section without deleting it.');
const ground = (def = 'obsidian') => select('ground', 'Background color', GROUNDS, def, 'Text and button colors switch automatically to match.');
const anchor = str('id', 'Section link name', 'Used for links such as /#framework. Lowercase, no spaces. Leave as is unless you know you need to change it.');
const kicker = str('kicker', 'Small label above the headline', 'Capital letters. Keep under 6 words.');
const headline = str('headline', 'Section headline', 'Keep under 12 words.');
const headlineSize = select('headline_size', 'Headline size', [{ label: 'Standard', value: 'standard' }, { label: 'Large', value: 'large' }], 'standard');
const align = select('align', 'Alignment', [{ label: 'Centered', value: 'center' }, { label: 'Left', value: 'left' }], 'center');
const closing = str('closing', 'Closing line (italic)', 'One short line. Leave empty to hide.');
const linkHint = 'A page on this site starts with / (for example /preorder). A spot on a page starts with # (for example #contact). Other sites start with https://';

const button = (name = 'button', label = 'Button') =>
  obj(name, label, [
    str('label', 'Button text', 'Capital letters.'),
    str('link', 'Where the button goes', linkHint),
    select('style', 'Button style', [{ label: 'Primary (filled)', value: 'primary' }, { label: 'Outline', value: 'outline' }], 'outline'),
  ], { collapsed: true });
const buttons = (name = 'buttons', label = 'Buttons') =>
  listOf(name, label, [
    str('label', 'Button text', 'Capital letters.'),
    str('link', 'Where the button goes', linkHint),
    select('style', 'Button style', [{ label: 'Primary (filled)', value: 'primary' }, { label: 'Outline', value: 'outline' }], 'outline'),
  ], { summary: '{{fields.label}}' });
const image = (name, label) =>
  obj(name, label, [
    { name: 'src', label: 'Image', widget: 'image', required: false, hint: 'Upload any size. It is resized and compressed for you.' },
    str('alt', 'Image description (alt text)', 'Describe the image for people using screen readers.'),
  ]);
const optinForm = (label = 'Signup form') =>
  obj('form', label, [
    bool('show_first_name', 'Ask for first name', false),
    str('first_name_label', 'First name label'),
    str('first_name_placeholder', 'First name placeholder', 'Faint example text inside the box. Optional.'),
    str('email_label', 'Email label'),
    str('email_placeholder', 'Email placeholder', 'Faint example text inside the box. Optional.'),
    str('button', 'Button text'),
    str('source', 'Signup tag', 'Recorded in EmailOctopus so you can see which form a reader used. Lowercase with hyphens.'),
  ], { collapsed: true });
const helper = rich('helper', 'Small line under the form', 'Optional.');

// ---------- section types ----------
const T = (name, label, fields, summary = '{{fields.headline}}') => ({ name, label, widget: 'object', summary: `${label} · ${summary}`, fields });

const sectionTypes = [
  T('hero_optin', 'Hero with signup', [visible, ground(), anchor, kicker,
    str('title', 'Book title'), str('subtitle', 'Subtitle (italic)'), txt('lead', 'Lead line', 'One or two sentences. Large serif.'),
    rich('body', 'Paragraph'), optinForm(), helper, image('image', 'Book cover')], '{{fields.title}}'),
  T('praise_strip', 'Praise strip', [visible, ground('umber'), anchor, txt('quote', 'Endorsement', 'One sentence.'), str('attribution', 'Name and title', 'Capital letters.')], '{{fields.attribution}}'),
  T('pattern', 'Headline with paragraphs', [visible, ground('oxblood'), anchor, kicker, headline, headlineSize,
    txt('subhead', 'Second line (large serif)'), richList('paragraphs', 'Paragraphs', 'Shown side by side on wide screens.'), closing]),
  T('three_terms', 'Three terms', [visible, ground('bone'), anchor, kicker, headline, headlineSize, rich('intro', 'Introduction'),
    listOf('items', 'Terms', [str('label', 'Term', 'Capital letters.'),
      select('icon', 'Mark', [{ label: 'Single circle', value: 'circle' }, { label: 'Power over mark', value: 'mark-power-over' }, { label: 'Power with mark', value: 'mark-power-with' }, { label: 'No mark', value: 'none' }], 'none'),
      txt('definition', 'Definition (large serif)'), rich('body', 'Paragraph')], { summary: '{{fields.label}}' }), closing]),
  T('benefits', 'Benefits with list', [visible, ground(), anchor, kicker, headline, headlineSize,
    txt('quote', 'Quote (italic)'), str('quote_attribution', 'Quote attribution'),
    listOf('columns', 'Columns', [str('label', 'Column label', 'Capital letters.'), rich('body', 'Paragraph')], { summary: '{{fields.label}}' }),
    str('list_label', 'List label', 'Capital letters.'), richList('list', 'List items'), rich('closing', 'Closing paragraph')]),
  T('principle_grid', 'Principles grid', [visible, ground('umber'), anchor, kicker, headline, headlineSize, rich('intro', 'Introduction'),
    listOf('items', 'Principles', [str('number', 'Number', 'Two digits, such as 01.'), str('name', 'Principle name', 'Capital letters.'), rich('line', 'One line'),
      select('icon', 'Icon', [
        { label: '01 Emotional regulation', value: 'principle-01-regulation' }, { label: '02 Empathy', value: 'principle-02-empathy' },
        { label: '03 Listening', value: 'principle-03-listening' }, { label: '04 Humility', value: 'principle-04-humility' },
        { label: '05 Understanding', value: 'principle-05-understanding' }, { label: '06 Relationality', value: 'principle-06-relationality' },
        { label: '07 Integrity', value: 'principle-07-integrity' }, { label: '08 Trust', value: 'principle-08-trust' },
        { label: '09 Responsibility', value: 'principle-09-responsibility' }, { label: '10 Repair', value: 'principle-10-repair' },
        { label: 'No icon', value: 'none' }], 'none')], { summary: '{{fields.number}} {{fields.name}}' }), closing]),
  T('optin_band', 'Signup band', [visible, ground('clay'), anchor, kicker, headline, headlineSize, rich('body', 'Paragraph'), optinForm(), helper]),
  T('numbered_measures', 'Numbered list', [visible, ground(), anchor, kicker, headline, headlineSize, rich('intro', 'Introduction'),
    richList('items', 'Items', 'Numbers are added for you.'), closing]),
  T('two_columns', 'Two columns', [visible, ground('olive'), anchor, kicker, headline, headlineSize,
    listOf('columns', 'Columns', [str('label', 'Column label', 'Capital letters.'), rich('body', 'Paragraph'), bool('highlight', 'Highlight this column', false)], { summary: '{{fields.label}}' }), closing]),
  T('author', 'Author', [visible, ground('bone'), anchor, kicker, str('name', 'Name (headline)'), image('portrait', 'Portrait'),
    richList('paragraphs', 'Paragraphs'), str('names_label', 'Label above the list of names'), simpleList('names', 'Names', 'Shown in one line, separated by dots.'), buttons()], '{{fields.name}}'),
  T('endorsements', 'Endorsements', [visible, ground(), anchor, kicker, headline,
    listOf('items', 'Endorsements', [txt('quote', 'Endorsement'), str('name', 'Name'), str('title', 'Title, book or company')], { summary: '{{fields.name}}' })], '{{fields.kicker}}'),
  T('cards', 'Cards with button', [visible, ground('umber'), anchor, kicker, headline, headlineSize, rich('intro', 'Introduction'),
    listOf('items', 'Cards', [str('label', 'Card label', 'Capital letters.'), rich('body', 'Paragraph')], { summary: '{{fields.label}}' }), buttons()]),
  T('two_links', 'Side-by-side blocks', [visible, ground(), anchor,
    listOf('items', 'Blocks', [str('anchor', 'Block link name', 'Lowercase, no spaces. Optional.'), str('label', 'Small label', 'Capital letters.'),
      str('headline', 'Headline'), rich('body', 'Paragraph'), buttons()], { summary: '{{fields.label}}' })], '{{fields.id}}'),
  T('optin_cta', 'Closing signup', [visible, ground('clay'), anchor, align, bool('show_mark', 'Show the power with mark', true),
    bool('italic', 'Set the line in italic', true), str('line', 'Closing line'), rich('body', 'Paragraph'), optinForm(), helper], '{{fields.line}}'),
  T('landing_hero', 'Landing page hero', [visible, ground(), anchor, kicker, headline, headlineSize, str('subhead', 'Second line (italic)'),
    rich('body', 'Paragraph'), str('list_label', 'List label'), richList('list', 'List items'), rich('audience', 'Who it is for'),
    obj('form_card', 'Signup card', [ground('clay'), str('heading', 'Card heading'), optinForm(), helper])]),
  T('quote_band', 'Quote band', [visible, ground('oxblood'), anchor, align, txt('quote', 'Quote'), str('attribution', 'Attribution', 'Capital letters.')], '{{fields.quote}}'),
  T('author_short', 'Author, short', [visible, ground(), anchor, image('portrait', 'Portrait'), str('label', 'Name label'), rich('body', 'Paragraph')], '{{fields.label}}'),
  T('sales_hero', 'Pre-order hero', [visible, ground(), anchor, image('image', 'Book cover'), kicker, headline, headlineSize, rich('body', 'Paragraph'),
    listOf('formats', 'Formats', [str('name', 'Format', 'Capital letters, such as PAPERBACK.'), str('price', 'Price'), str('price_note', 'Note beside the price'),
      rich('note', 'Paragraph under the format'),
      listOf('retailers', 'Store buttons', [str('label', 'Store name', 'Capital letters.'), str('url', 'Link to the book at this store', 'Starts with https://'),
        select('style', 'Button style', [{ label: 'Primary (filled)', value: 'primary' }, { label: 'Outline', value: 'outline' }], 'outline')], { summary: '{{fields.label}}' })],
      { summary: '{{fields.name}} {{fields.price}}' })]),
  T('claim_gift', 'Pre-order gift claim', [visible, ground('clay'), anchor, kicker, headline, headlineSize, rich('body', 'Paragraph'),
    str('list_label', 'List label'), richList('list', 'List items'),
    obj('form', 'Claim form', [rich('intro', 'Line above the form'), str('name_label', 'Name label'), str('email_label', 'Email label'),
      str('store_label', 'Store label'), simpleList('store_options', 'Store choices'), str('order_label', 'Order number label'), str('button', 'Button text'),
      str('success_message', 'Message after a claim is sent'), str('source', 'Signup tag', 'Recorded in EmailOctopus.')], { collapsed: true })]),
  T('faq', 'Questions', [visible, ground(), anchor, kicker, headline,
    listOf('items', 'Questions', [str('question', 'Question'), rich('answer', 'Answer')], { summary: '{{fields.question}}' })], '{{fields.kicker}}'),
  T('confirmation', 'Confirmation', [visible, ground(), anchor, bool('show_mark', 'Show the power with mark', true), headline, rich('body', 'Paragraph')]),
  T('offer_card', 'Offer card', [visible, ground('clay'), anchor, str('label', 'Small label'), rich('body', 'Offer line'), button()], '{{fields.label}}'),
  T('share_line', 'Share line', [visible, ground(), anchor, str('text', 'Line'), str('button', 'Button text'), str('copied_label', 'Button text after copying'),
    str('share_url', 'Page to share', 'Such as /introduction.')], '{{fields.text}}'),
  T('text_page', 'Text page', [visible, ground(), anchor, kicker, headline, headlineSize,
    rich('body', 'Text', 'Use the paragraph menu for headings and lists.', { buttons: ['bold', 'italic', 'link', 'heading-two', 'bulleted-list', 'numbered-list'] }), buttons()]),
];

const sections = {
  name: 'sections', label: 'Sections', widget: 'list', required: false, collapsed: true, typeKey: 'type', types: sectionTypes,
  hint: 'Drag to reorder. Use the menu on a section to duplicate it. Switch off "Show this section" to hide one.',
};

const seo = obj('seo', 'Search and sharing', [
  str('title', 'Page title', 'Shown in the browser tab and search results. Keep under 60 characters.'),
  txt('description', 'Search description', 'Keep under 160 characters.'),
  { name: 'social_image', label: 'Sharing image', widget: 'image', required: false, hint: 'Shown when the page is shared. 1200 by 630 works best.' },
  bool('noindex', 'Hide this page from search engines', false),
], { collapsed: true });
const header = obj('header', 'Top bar', [
  select('style', 'Top bar style', [{ label: 'Full navigation', value: 'full' }, { label: 'Logo and one button', value: 'simple' }, { label: 'Logo only', value: 'logo' }, { label: 'None', value: 'none' }], 'full'),
  button('button', 'Button (for the "Logo and one button" style)'),
], { collapsed: true });
const footer = obj('footer', 'Footer', [
  select('style', 'Footer style', [{ label: 'Site footer (from Site settings)', value: 'site' }, { label: 'Simple footer (set here)', value: 'simple' }], 'site'),
  str('copyright', 'Copyright line (simple footer)'),
  listOf('links', 'Links (simple footer)', [str('label', 'Link text'), str('link', 'Where it goes', linkHint)], { summary: '{{fields.label}}' }),
], { collapsed: true });

const page = (name, label, file, extra = []) => ({
  name, label, file: `src/content/pages/${file}.yml`, fields: [seo, header, footer, ...extra, sections],
});

const stickyBar = obj('sticky_bar', 'Phone signup bar', [
  bool('visible', 'Show the bar on phones', true), str('label', 'Small label'), str('button', 'Button text'),
  str('target', 'Where the button goes', 'Such as #introduction.'),
], { collapsed: true });

const config = {
  backend: {
    name: 'github',
    repo: REPO,
    branch: 'main',
    ...(AUTH_URL && { base_url: AUTH_URL, auth_endpoint: 'api/auth' }),
    commit_messages: { update: 'Update {{collection}} “{{slug}}” from the editor', uploadMedia: 'Upload “{{path}}” from the editor' },
  },
  site_url: SITE_URL,
  display_url: SITE_URL,
  logo: { src: `${SITE_URL}favicon.svg` },
  media_folder: 'public/uploads',
  public_folder: '/uploads',
  media_libraries: {
    default: { config: { max_file_size: 25000000, transformations: { raster_image: { format: 'webp', quality: 82, width: 2400, height: 2400 }, svg: { optimize: true } } } },
  },
  field_defaults: { richtext: { minimal: true, modes: ['rich_text'], buttons: ['bold', 'italic', 'link'], editor_components: [], use_markdown_shortcuts: false } },
  collections: [
    {
      name: 'pages', label: 'Pages', label_singular: 'Page', icon: 'description', format: 'yaml',
      description: 'Every page of the site. Open one, edit, then press Save to publish. Changes go live in about two minutes.',
      files: [
        page('home', 'Home', 'home', [stickyBar]),
        page('introduction', 'Introduction (landing page)', 'introduction'),
        page('preorder', 'Pre-order', 'preorder'),
        page('thank_you', 'Thank you', 'thank-you'),
        page('privacy', 'Privacy', 'privacy'),
        page('not_found', 'Page not found', 'not-found'),
      ],
    },
    {
      name: 'settings', label: 'Site settings', icon: 'settings', format: 'yaml',
      files: [{
        name: 'site', label: 'Navigation, footer and forms', file: 'src/content/settings.yml',
        fields: [
          obj('site', 'Site', [str('name', 'Site name'), str('author', 'Author'),
            { name: 'default_social_image', label: 'Default sharing image', widget: 'image', required: false },
            str('default_social_image_alt', 'Sharing image description')], { collapsed: true }),
          obj('book', 'Book details for search engines', [str('title', 'Title'), str('subtitle', 'Subtitle'), str('author', 'Author'),
            str('publication_date', 'Publication date', 'Such as 2027-01 or 2027-01-13.'), txt('description', 'Short description')], { collapsed: true }),
          obj('navigation', 'Navigation', [str('wordmark', 'Wordmark'), str('logo_link', 'Logo link'),
            listOf('items', 'Menu links', [str('label', 'Link text', 'Capital letters.'), str('link', 'Where it goes', linkHint)], { summary: '{{fields.label}}' }),
            obj('preorder_link', 'Pre-order link', [bool('visible', 'Show it', true), str('label', 'Link text'), str('link', 'Where it goes')]),
            button('button', 'Menu button'),
            str('menu_open_label', 'Menu button name for screen readers (closed)'), str('menu_close_label', 'Menu button name for screen readers (open)'),
            str('skip_link_label', 'Skip link text for keyboard users')], { collapsed: true }),
          obj('footer', 'Site footer', [str('wordmark_line', 'Wordmark line'),
            listOf('links', 'Footer links', [str('label', 'Link text', 'Capital letters.'), str('link', 'Where it goes', linkHint)], { summary: '{{fields.label}}' }),
            str('copyright', 'Copyright line')], { collapsed: true }),
          obj('forms', 'Forms', [
            str('optin_destination', 'Signup form destination', 'Set by Benjamin. Please leave as is.'),
            str('claim_destination', 'Claim form destination', 'Set by Benjamin. Please leave as is.'),
            str('success_redirect', 'Page shown after signing up'),
            obj('messages', 'Form messages', [str('email_required', 'When the email is missing'), str('email_invalid', 'When the email looks wrong'),
              str('error', 'When sending fails'), str('sending', 'Button text while sending')]),
          ], { collapsed: true }),
        ],
      }],
    },
  ],
};

const out = '# Generated by scripts/cms-config.mjs. Edit that file, then run `npm run cms`.\n' + dump(config, { lineWidth: 140, noRefs: true });
fs.writeFileSync(new URL('../public/admin/config.yml', import.meta.url), out);
console.log('Wrote public/admin/config.yml');

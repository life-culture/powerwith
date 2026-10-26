// Reads the editable content files (the ones Sveltia CMS writes) and offers
// small helpers so components never hard-code copy or base paths.
import { load as parseYaml } from 'js-yaml';
import { marked } from 'marked';

const files = import.meta.glob('../content/**/*.yml', { query: '?raw', import: 'default', eager: true });

function load(rel) {
  const raw = files[`../content/${rel}`];
  if (raw == null) throw new Error(`Missing content file src/content/${rel}`);
  return parseYaml(raw) ?? {};
}

export function getSettings() {
  return load('settings.yml');
}

export function getPage(name) {
  return load(`pages/${name}.yml`);
}

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

// A bracketed value such as "[Amazon URL]" is a placeholder Sophia has not filled yet.
export function isPlaceholder(value) {
  return typeof value === 'string' && value.trim().startsWith('[');
}

export function hasText(value) {
  return typeof value === 'string' ? value.trim() !== '' : value != null && value !== false;
}

// Resolve an editable link to a real href. Returns null when there is nowhere to go yet.
export function href(link) {
  if (!hasText(link) || isPlaceholder(link)) return null;
  const v = String(link).trim();
  if (v.startsWith('/') && !v.startsWith('//')) return base + v;
  if (/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(v)) return `mailto:${v}`;
  return v;
}

export function isExternal(link) {
  return /^https?:\/\//.test(String(link ?? ''));
}

export function asset(src) {
  return href(src);
}

// Inline rich text: bold, italic, links and line breaks only.
export function inline(text) {
  if (!hasText(text)) return '';
  return marked.parseInline(String(text), { breaks: true });
}

// Block rich text for longer pages such as the privacy policy.
export function block(text) {
  if (!hasText(text)) return '';
  return marked.parse(String(text), { breaks: true });
}

export function list(value) {
  return Array.isArray(value) ? value.filter((v) => (typeof v === 'string' ? v.trim() !== '' : v)) : [];
}

export function visibleSections(page) {
  return list(page.sections).filter((s) => s && s.visible !== false);
}

export const GROUNDS = ['obsidian', 'bone', 'umber', 'oxblood', 'clay', 'olive'];

export function ground(value, fallback = 'obsidian') {
  return GROUNDS.includes(value) ? value : fallback;
}

export function absoluteUrl(p) {
  const site = (import.meta.env.SITE ?? '').replace(/\/$/, '');
  const h = href(p);
  if (!h) return null;
  return /^https?:/.test(h) ? h : site + h;
}

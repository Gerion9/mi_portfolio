import en from './locales/en';
import es from './locales/es';

export const languages = { en: 'English', es: 'Español' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

export type Copy = typeof en;

const dictionaries: Record<Lang, Copy> = { en, es };

export const SITE_URL = 'https://gairoperalta.com';

export function getLangFromUrl(url: URL): Lang {
  const { pathname } = url;
  return pathname === '/es' || pathname.startsWith('/es/') ? 'es' : 'en';
}

export function useCopy(lang: Lang): Copy {
  return dictionaries[lang];
}

/** Strip the language prefix: "/es/about" -> "/about", "/es" -> "/". */
export function stripLang(pathname: string): string {
  const stripped = pathname.replace(/^\/es(?=\/|$)/, '');
  return stripped === '' ? '/' : stripped;
}

/**
 * Build a page path for a language: localizePath("/about", "es") -> "/es/about/".
 * Pages are built as <path>/index.html, which Netlify serves at the trailing-slash
 * URL (and 301s the bare one to it), so every internal link, canonical, hreflang
 * and sitemap entry uses that form.
 */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const localized = lang === 'en' ? clean : `/es${clean}`;
  return localized.endsWith('/') ? localized : `${localized}/`;
}

/** Equivalent URL of the current page in the other language. */
export function alternatePath(pathname: string, target: Lang): string {
  const base = stripLang(pathname.replace(/\/$/, '') || '/');
  return localizePath(base, target);
}

/** Replace {placeholders} in a copy string. */
export function fmt(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => (key in values ? String(values[key]) : `{${key}}`));
}

export type Segment = { text: string; accent: boolean };

/**
 * Copy strings mark serif-italic accent words with *asterisks*.
 * "AI that reads *places*" -> [{text:"AI that reads ", accent:false}, {text:"places", accent:true}]
 */
export function parseAccents(text: string): Segment[] {
  const segments: Segment[] = [];
  const re = /\*([^*]+)\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text))) {
    if (match.index > last) segments.push({ text: text.slice(last, match.index), accent: false });
    segments.push({ text: match[1], accent: true });
    last = match.index + match[0].length;
  }
  if (last < text.length) segments.push({ text: text.slice(last), accent: false });
  return segments;
}

/** Plain text version of an accented string (for meta tags, aria-labels). */
export function plain(text: string): string {
  return text.replace(/\*([^*]+)\*/g, '$1');
}

export function formatMonthYear(date: string | Date, lang: Lang): string {
  const d = typeof date === 'string' ? new Date(`${date}T12:00:00Z`) : date;
  const s = d.toLocaleDateString(lang === 'es' ? 'es-MX' : 'en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
  // Spanish month names stay lowercase (RAE): "may 2026", "ene 2026"
  return lang === 'es' ? s.replace('.', '').replace(/\sde\s/, ' ') : s;
}

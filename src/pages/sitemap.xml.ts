import type { APIRoute } from 'astro';
import { SITE_URL, localizePath, type Lang } from '../i18n';
import { getProjects } from '../lib/projects';
import { SITE_UPDATED } from '../data/site';

// Every page exists in English and Spanish; each <url> lists both versions
// (and x-default) so the annotations point back to each other.
const LANGS: Lang[] = ['en', 'es'];

const staticPages = ['/', '/experience', '/about', '/resume', '/contact'];

function entry(path: string, lastmod: string) {
  const alternates = LANGS.map(
    (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${new URL(localizePath(path, l), SITE_URL).href}"/>`,
  ).join('\n');
  const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${new URL(localizePath(path, 'en'), SITE_URL).href}"/>`;
  return LANGS.map(
    (l) => `  <url>
    <loc>${new URL(localizePath(path, l), SITE_URL).href}</loc>
    <lastmod>${lastmod}</lastmod>
${alternates}
${xDefault}
  </url>`,
  ).join('\n');
}

export const GET: APIRoute = () => {
  const projects = getProjects('en');
  const urls = [
    ...staticPages.map((p) => entry(p, SITE_UPDATED)),
    ...projects.map((p) => entry(`/experience/${p.slug}`, p.date)),
    `  <url>
    <loc>${SITE_URL}/privacy-policy/</loc>
  </url>
  <url>
    <loc>${SITE_URL}/terms/</loc>
  </url>`,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};

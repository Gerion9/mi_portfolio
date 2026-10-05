import type { APIRoute } from 'astro';
import { coverSvg } from '../../lib/covers';
import { getProjects } from '../../lib/projects';

// One static, cacheable SVG per project (covers are language-independent).
// Pages reference them with <img loading="lazy"> instead of inlining ~5 KB of
// SVG per card, which keeps the work page's HTML and DOM small.
export function getStaticPaths() {
  return getProjects('en').map((p) => ({
    params: { slug: p.slug },
    props: { svg: coverSvg(p.slug, p.primary, 'c', '', p.cover) },
  }));
}

export const GET: APIRoute = ({ props }) =>
  new Response(props.svg as string, {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' },
  });

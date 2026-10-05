import projectsEn from '../data/projects.json';
import projectsEs from '../data/projects_es.json';
import type { Lang } from '../i18n';
import { SHOW_CLIENT_NAMES } from '../data/site';

export type Domain = 'geo' | 'llm' | 'ml' | 'data' | 'web';
export const DOMAINS: Domain[] = ['llm', 'geo', 'ml', 'data', 'web'];

export type CompanyKey = 'blackprint' | 'manuel-solis' | 'utsa' | 'strtgy' | 'prodensa' | 'personal' | 'agm';

interface RawProject {
  /** Fixed URL slug (new entries set it so titles can change without breaking links). */
  slug?: string;
  title: string;
  company: string;
  date: string;
  imgSrc?: string;
  impact?: string[];
  tags?: string[];
  description: string | string[];
  impacts?: string[];
}

type NamedText = Partial<Pick<RawProject, 'title' | 'description' | 'impact' | 'impacts'>>;
type PrivateClients = Record<string, { client?: string; en?: NamedText; es?: NamedText }>;

/**
 * Real client names live in src/data/clients.private.json, which is gitignored
 * because this repository is public. The glob resolves to nothing when the file
 * is absent (e.g. on Netlify), so the public build always uses the generic text.
 */
const privateModules = import.meta.glob<PrivateClients>('../data/clients.private.json', { eager: true, import: 'default' });
const PRIVATE: PrivateClients = Object.values(privateModules)[0] ?? {};

/** Apply the confidentiality switch: generic client description unless names are allowed. */
const resolve = (p: RawProject, lang: Lang): RawProject => {
  const named = SHOW_CLIENT_NAMES && p.slug ? PRIVATE[p.slug]?.[lang] : undefined;
  return named ? { ...p, ...named } : p;
};

const clientOf = (p: RawProject) => (SHOW_CLIENT_NAMES && p.slug ? (PRIVATE[p.slug]?.client ?? '') : '');

export interface Metric {
  label: string;
  value: string;
}

export type CoverVariant =
  | 'hexbin'
  | 'contours'
  | 'points'
  | 'attention'
  | 'graph'
  | 'chat'
  | 'doc'
  | 'forecast'
  | 'clusters'
  | 'dag'
  | 'dashboard'
  | 'wireframe';

export interface Project {
  slug: string;
  cover: CoverVariant;
  index: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  company: string;
  companyKey: CompanyKey;
  date: string;
  year: number;
  description: string;
  metrics: Metric[];
  highlights: string[];
  tags: string[];
  domains: Domain[];
  primary: Domain;
  /** Lowercased extra search terms: English title and every tag in both languages. */
  search: string;
}

const KEYWORDS: Record<Domain, RegExp[]> = {
  llm: [
    /\bllms?\b/, /\brag\b/, /agent/, /openai/, /\bgpt/, /claude/, /anthropic/, /gemini/, /langgraph/, /langchain/,
    /chatbot/, /conversational/, /llama/, /legal ai/, /whatsapp/, /pinecone/, /vector (database|search)/, /speechmatics/,
    /knowledge graph/, /medical ai/, /ai application/, /\bocr\b/,
  ],
  geo: [
    /geo/, /\bgis\b/, /mapbox/, /maplibre/, /turf/, /\bh3\b/, /arcgis/, /qgis/, /osmnx/, /spatial/, /moran/,
    /kernel density/, /storymaps/, /urban/, /location/, /mapping/, /elevation/, /earthquake/, /mapclassify/, /strtree/,
  ],
  ml: [
    /machine learning/, /deep learning/, /xgboost/, /time series/, /forecast/, /prophet/, /sarima/, /predictive/,
    /hdbscan/, /bertopic/, /spacy/, /\bnlp\b/, /pytorch/, /tensorflow/, /hyperparameter/, /backtesting/, /trading/,
    /sentence embeddings/, /inventory optimization/, /\bml\b/,
  ],
  data: [
    /data analysis/, /visuali[sz]ation/, /business intelligence/, /dashboard/, /\betl\b/, /\bsql\b/, /bigquery/, /redshift/,
    /pandas/, /streamlit/, /survey/, /analytics/, /data pipelines/, /data processing/, /quarto/, /plotly/, /report/,
  ],
  web: [
    /web development/, /react/, /next\.js/, /astro/, /\bvite\b/, /tailwind/, /ui\/ux/, /user interface/, /responsive design/,
    /\bseo\b/, /css modules/, /shadcn/, /web app/, /saas platform/, /booking/,
  ],
};

const PRIORITY: Domain[] = ['geo', 'llm', 'ml', 'data', 'web'];

function classify(p: RawProject): { domains: Domain[]; primary: Domain } {
  const tags = (p.tags ?? []).join(' | ').toLowerCase();
  const title = p.title.toLowerCase();
  const scores = PRIORITY.map((d) => {
    const inTags = KEYWORDS[d].filter((re) => re.test(tags)).length;
    const inTitle = KEYWORDS[d].filter((re) => re.test(title)).length;
    return { d, score: inTags + inTitle * 2 };
  });
  const domains = scores.filter((s) => s.score > 0).map((s) => s.d);
  const best = [...scores].sort((a, b) => b.score - a.score || PRIORITY.indexOf(a.d) - PRIORITY.indexOf(b.d))[0];
  return { domains: domains.length ? domains : ['data'], primary: best.score > 0 ? best.d : 'data' };
}

/** Which procedural cover tells this project's story best. */
function coverVariant(p: RawProject, primary: Domain): CoverVariant {
  const s = `${p.title} ${(p.tags ?? []).join(' ')}`.toLowerCase();
  switch (primary) {
    case 'geo':
      if (/(spatial statistics|moran|kernel density|elevation|earthquake|risk|electoral|socioeconomic)/.test(s)) return 'contours';
      if (/(\bpoi\b|matching|dedup|licen|geocod|location-based)/.test(s)) return 'points';
      return 'hexbin';
    case 'llm':
      if (/(knowledge graph|neo4j|primekg)/.test(s)) return 'graph';
      if (/(whatsapp|chatbot|conversational|meeting|speechmatics|interview)/.test(s)) return 'chat';
      if (/(\bocr\b|document|translation|pdf|declaration|legal ai)/.test(s)) return 'doc';
      return 'attention';
    case 'ml':
      if (/(hdbscan|cluster|bertopic|topic|segment|survey)/.test(s)) return 'clusters';
      return 'forecast';
    case 'data':
      if (/(dashboard|visuali|business intelligence|survey|engagement|analytics)/.test(s)) return 'dashboard';
      return 'dag';
    default:
      return 'wireframe';
  }
}

function companyKey(company: string): CompanyKey {
  const c = company.toLowerCase();
  if (c.includes('blackprint')) return 'blackprint';
  if (c.includes('manuel sol')) return 'manuel-solis';
  if (c.includes('san antonio')) return 'utsa';
  if (c.includes('strtgy')) return 'strtgy';
  if (c.includes('prodensa')) return 'prodensa';
  if (c.includes('agm')) return 'agm';
  return 'personal';
}

export const COMPANY_LABELS: Record<Lang, Record<CompanyKey, string>> = {
  en: {
    blackprint: 'BlackPrint Technologies',
    'manuel-solis': 'Law Offices of Manuel Solis',
    utsa: 'UT San Antonio',
    strtgy: 'STRTGY',
    prodensa: 'PRODENSA',
    personal: 'Personal projects',
    agm: 'AGM Analytics',
  },
  es: {
    blackprint: 'BlackPrint Technologies',
    'manuel-solis': 'Law Offices of Manuel Solis',
    utsa: 'UT San Antonio',
    strtgy: 'STRTGY',
    prodensa: 'PRODENSA',
    personal: 'Proyectos personales',
    agm: 'AGM Analytics',
  },
};

function slugify(title: string): string {
  const base = title.includes(':') ? title.split(':')[0] : title;
  const slug = base
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (slug.length <= 48) return slug;
  return slug.slice(0, 48).replace(/-[^-]*$/, '');
}

// On its own line the part after the colon starts with a capital
// ("plataforma de…" -> "Plataforma de…"); "iOS"-style words are left alone.
const capitalize = (s: string) => (/^\p{Ll}\p{Ll}/u.test(s) ? s[0].toLocaleUpperCase() + s.slice(1) : s);

function splitTitle(title: string): { shortTitle: string; subtitle: string } {
  if (title.includes(':')) {
    const [head, ...rest] = title.split(':');
    return { shortTitle: head.trim(), subtitle: capitalize(rest.join(':').trim()) };
  }
  return { shortTitle: title.trim(), subtitle: '' };
}

function parseMetric(raw: string): Metric {
  const i = raw.indexOf(':');
  if (i === -1) return { label: '', value: raw.trim() };
  return { label: raw.slice(0, i).trim(), value: raw.slice(i + 1).trim() };
}

const enRaw = (projectsEn as RawProject[]).map((p) => resolve(p, 'en'));
const esRaw = (projectsEs as RawProject[]).map((p) => resolve(p, 'es'));

// Slugs, domains and company keys always come from the English source so
// /experience#slug and /es/experience#slug point at the same project.
const meta = (() => {
  const seen = new Map<string, number>();
  return enRaw.map((p) => {
    let slug = p.slug ?? slugify(p.title);
    const n = seen.get(slug) ?? 0;
    seen.set(slug, n + 1);
    if (n > 0) slug = `${slug}-${n + 1}`;
    const cls = classify(p);
    return { slug, ...cls, cover: coverVariant(p, cls.primary), companyKey: companyKey(p.company) };
  });
})();

export function getProjects(lang: Lang): Project[] {
  const source = lang === 'es' ? esRaw : enRaw;
  return source
    .map((p, index) => {
      const m = meta[index];
      const en = enRaw[index];
      const { shortTitle, subtitle } = splitTitle(p.title);
      const description = Array.isArray(p.description) ? p.description.join(' ') : p.description;
      const tags = p.tags ?? [];
      return {
        slug: m.slug,
        cover: m.cover,
        index,
        title: p.title,
        shortTitle,
        subtitle,
        company: p.company,
        companyKey: m.companyKey,
        date: p.date,
        year: new Date(`${p.date}T12:00:00Z`).getUTCFullYear(),
        description,
        metrics: (p.impact ?? []).map(parseMetric),
        highlights: p.impacts ?? [],
        tags,
        domains: m.domains,
        primary: m.primary,
        // Extra search terms not visible on the card (the card's own text is indexed at runtime)
        search: [en.title, ...tags, ...(en.tags ?? []), clientOf(en)]
          .join(' ')
          .toLowerCase(),
      } satisfies Project;
    })
    .sort((a, b) => b.date.localeCompare(a.date) || a.index - b.index);
}

export function getProjectBySlug(lang: Lang, slug: string): Project | undefined {
  return getProjects(lang).find((p) => p.slug === slug);
}

export function getProjectStats(lang: Lang) {
  const projects = getProjects(lang);
  const years = projects.map((p) => p.year);
  const companies = new Set(projects.filter((p) => p.companyKey !== 'personal').map((p) => p.companyKey));
  const tech = new Set(enRaw.flatMap((p) => p.tags ?? []));
  return {
    projects: projects.length,
    companies: companies.size,
    since: Math.min(...years),
    years: Math.max(...years) - Math.min(...years) + 1,
    technologies: tech.size,
  };
}

/** Accent color (RGB channels from global.css) per domain. */
export const DOMAIN_COLOR: Record<Domain, string> = {
  llm: 'var(--violet)',
  geo: 'var(--teal)',
  ml: 'var(--amber)',
  data: 'var(--sky)',
  web: 'var(--pink)',
};

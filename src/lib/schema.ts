import { SITE_URL, type Lang } from '../i18n';
import { PROFILE, SOCIALS } from '../data/site';

/** schema.org Person, shared by every page that describes Gairo. */
export function personSchema(lang: Lang) {
  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: PROFILE.name,
    alternateName: [...PROFILE.alternateNames],
    jobTitle: lang === 'es' ? 'Ingeniero líder de IA' : 'Lead AI Engineer',
    url: SITE_URL,
    image: `${SITE_URL}/images/profile.webp`,
    email: `mailto:${PROFILE.email}`,
    sameAs: [SOCIALS.linkedin.href, SOCIALS.github.href],
    knowsAbout: [
      'Large Language Models',
      'AI Agents',
      'Retrieval-Augmented Generation',
      'GeoAI',
      'Geospatial Analysis',
      'Machine Learning',
      'Time Series Forecasting',
      'MLOps',
      'Python',
      'PyTorch',
    ],
    knowsLanguage: ['en', 'es'],
    worksFor: { '@type': 'Organization', name: 'BlackPrint Technologies' },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'University of California, Berkeley', sameAs: 'https://www.berkeley.edu' },
      { '@type': 'CollegeOrUniversity', name: 'Tecnológico de Monterrey', sameAs: 'https://tec.mx' },
    ],
  };
}

export function websiteSchema(lang: Lang) {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Gairo Peralta',
    inLanguage: lang === 'es' ? 'es-MX' : 'en-US',
    publisher: { '@id': `${SITE_URL}/#person` },
  };
}

export function graph(...nodes: Record<string, unknown>[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

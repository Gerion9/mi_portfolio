/** Facts about Gairo used across pages. Copy lives in src/i18n/locales. */

/** Last meaningful content update (sitemap lastmod for the main pages). */
export const SITE_UPDATED = '2026-10-03';

/**
 * Client confidentiality switch. Project entries in src/data/projects*.json
 * describe BlackPrint clients generically ("a national pharmaceutical
 * distributor"). The real names and named variants live in
 * src/data/clients.private.json, which is gitignored because this repo is
 * public. Names appear only when this is true AND that file is present at build
 * time (so a Netlify build from the public repo stays anonymized). Slugs are
 * fixed, so URLs never change either way.
 */
export const SHOW_CLIENT_NAMES = false;

export const PROFILE = {
  name: 'Gairo Peralta',
  alternateNames: ['Gairo Yostin Peralta', 'Gairo Yostin Peralta Alvarez', 'Gairo Y. Peralta'],
  email: 'gairo@berkeley.edu',
  phone: '(323) 434-5684',
  phoneHref: 'tel:+13234345684',
  url: 'https://gairoperalta.com',
  image: '/images/profile.webp',
  resumePdf: '/documents/Resume_Gairo_Peralta_p.pdf',
  resumeUpdated: '2026-10-04',
} as const;

export const SOCIALS = {
  linkedin: { label: 'LinkedIn', href: 'https://linkedin.com/in/gairoperalta', handle: 'in/gairoperalta' },
  github: { label: 'GitHub', href: 'https://github.com/Gerion9', handle: 'Gerion9' },
  instagram: { label: 'Instagram', href: 'https://www.instagram.com/gairo_peralta', handle: '@gairo_peralta' },
  facebook: { label: 'Facebook', href: 'https://www.facebook.com/gairo.yostin', handle: 'gairo.yostin' },
} as const;

/** Organizations shown in the home marquee (worked with or studied at). */
export const ORGANIZATIONS = [
  'BlackPrint Technologies',
  'Law Offices of Manuel Solis',
  'UT San Antonio',
  'UC Berkeley',
  'Tecnológico de Monterrey',
  'STRTGY',
  'PRODENSA',
] as const;

/**
 * Share images (Open Graph cards) for case studies.
 * Screenshots the dev-only pages at /og-card/<lang>/<slug>/ and writes
 * optimized JPEGs to public/og/cases/<slug>-<lang>.jpg, then lists every card
 * in src/data/og-cases.json; case pages use a listed card and fall back to
 * the site card otherwise.
 *
 * Start the dev server first (npm run dev), then:
 *   npm run og                         featured projects (home page list)
 *   npm run og -- <slug> [<slug> ...]  specific projects
 * Env: OG_BASE (default http://127.0.0.1:4321), CHROME_PATH.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('..', import.meta.url));
const base = (process.env.OG_BASE || 'http://127.0.0.1:4321').replace(/\/$/, '');
const outDir = path.join(root, 'public', 'og', 'cases');

const chrome = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find((p) => p && fs.existsSync(p));

if (!chrome) {
  console.error('Chrome not found: set CHROME_PATH.');
  process.exit(1);
}

// The featured list lives in the English locale (home page "Selected work")
function featuredSlugs() {
  const src = fs.readFileSync(path.join(root, 'src', 'i18n', 'locales', 'en.ts'), 'utf8');
  const block = src.match(/featured:\s*\[([\s\S]*?)\n\s*\],/);
  return block ? [...block[1].matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]) : [];
}

const requested = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const slugs = requested.length ? requested : featuredSlugs();
if (!slugs.length) {
  console.error('No projects to render.');
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'og-cards-'));
let written = 0;

for (const slug of slugs) {
  for (const lang of ['en', 'es']) {
    const url = `${base}/og-card/${lang}/${slug}/`;
    // Also warms up the dev server's compile of the page
    const res = await fetch(url).catch(() => null);
    if (!res?.ok) {
      console.error(`skip ${slug} (${lang}): ${url} -> ${res ? res.status : 'dev server not running'}`);
      continue;
    }
    const raw = path.join(tmp, `${slug}-${lang}.png`);
    execFileSync(
      chrome,
      [
        '--headless=new',
        '--hide-scrollbars',
        '--force-device-scale-factor=1',
        '--window-size=1200,630',
        '--virtual-time-budget=5000',
        `--user-data-dir=${path.join(tmp, 'profile')}`,
        `--screenshot=${raw}`,
        url,
      ],
      { stdio: 'ignore' },
    );
    const out = path.join(outDir, `${slug}-${lang}.jpg`);
    await sharp(raw).resize(1200, 630, { fit: 'cover', position: 'top' }).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
    written += 1;
    console.log(`wrote ${path.relative(root, out)} (${Math.round(fs.statSync(out).size / 1024)} KB)`);
  }
}

// Manifest of every card on disk (case pages read it at build time)
const cards = fs
  .readdirSync(outDir)
  .filter((f) => f.endsWith('.jpg'))
  .map((f) => f.slice(0, -4))
  .sort();
fs.writeFileSync(path.join(root, 'src', 'data', 'og-cases.json'), `${JSON.stringify(cards, null, 2)}\n`);

try {
  fs.rmSync(tmp, { recursive: true, force: true });
} catch {
  /* Chrome may still hold its profile for a moment; the OS cleans tmp */
}
console.log(`${written} image(s) written.`);

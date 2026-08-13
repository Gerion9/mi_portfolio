import { spawn, execSync } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
process.env.CHROME_PATH = chromePath;

// Simple, fast static file server for dist/
const distDir = path.resolve('dist');
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  else if (!path.extname(reqPath)) reqPath = path.join(reqPath, 'index.html');

  const filePath = path.join(distDir, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600'
    });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 4321;

server.listen(PORT, async () => {
  console.log(`Server listening at http://localhost:${PORT}`);

  try {
    const reportPath = path.resolve('lighthouse-report.json');
    const cmd = `npx --yes lighthouse http://localhost:${PORT}/ --chrome-flags="--headless --no-sandbox --disable-gpu" --output=json --output-path="${reportPath}" --quiet --only-categories=performance,accessibility,best-practices,seo`;

    console.log('Running Lighthouse audit...');
    execSync(cmd, { stdio: 'inherit', env: { ...process.env, CHROME_PATH: chromePath } });

    if (fs.existsSync(reportPath)) {
      const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
      const categories = report.categories;

      console.log('\n================ LIGHTHOUSE SCORES ================');
      console.log(`Performance:    ${Math.round(categories.performance.score * 100)} / 100`);
      console.log(`Accessibility:  ${Math.round(categories.accessibility.score * 100)} / 100`);
      console.log(`Best Practices: ${Math.round(categories['best-practices'].score * 100)} / 100`);
      console.log(`SEO:            ${Math.round(categories.seo.score * 100)} / 100`);
      console.log('====================================================\n');

      // Check failed audits
      const audits = report.audits;
      let issuesFound = false;

      for (const [key, category] of Object.entries(categories)) {
        const score = Math.round(category.score * 100);
        if (score < 100) {
          console.log(`\n--- Category "${category.title}" scored ${score}/100 ---`);
          for (const auditRef of category.auditRefs) {
            const audit = audits[auditRef.id];
            if (audit && audit.score !== null && audit.score < 1 && audit.scoreDisplayMode !== 'manual' && audit.scoreDisplayMode !== 'informative') {
              issuesFound = true;
              console.log(`  [FAIL] ${audit.title} (Score: ${audit.score})`);
              if (audit.displayValue) console.log(`         Value: ${audit.displayValue}`);
              if (audit.explanation) console.log(`         Explanation: ${audit.explanation}`);
              if (audit.details && audit.details.items && audit.details.items.length > 0) {
                console.log(`         Details: ${JSON.stringify(audit.details.items.slice(0, 3))}`);
              }
            }
          }
        }
      }

      if (!issuesFound) {
        console.log('ALL CATEGORIES SCORED 100/100! 🎯');
      }
    }
  } catch (err) {
    console.error('Lighthouse run failed:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});

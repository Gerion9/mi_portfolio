import type { APIRoute } from 'astro';

// Define all pages with their relative priority and change frequency
const pages = [
  { url: '/', lastmod: new Date().toISOString(), changefreq: 'weekly', priority: 1.0 },
  { url: '/about', lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
  { url: '/experience', lastmod: new Date().toISOString(), changefreq: 'weekly', priority: 0.9 },
  { url: '/resume', lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
  { url: '/contact', lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.7 },
  { url: '/privacy-policy', lastmod: new Date().toISOString(), changefreq: 'yearly', priority: 0.3 },
  { url: '/terms', lastmod: new Date().toISOString(), changefreq: 'yearly', priority: 0.3 },
];

// Generate sitemap XML
export const GET: APIRoute = async () => {
  // Base URL of your website
  const baseUrl = 'https://gairoperalta.com';
  
  // Generate sitemap XML content
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${pages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
  `).join('')}
</urlset>`;
  
  // Return the XML with appropriate headers
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600'
    }
  });
}; 
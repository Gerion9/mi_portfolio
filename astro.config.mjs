import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://gairoperalta.com',
  // global.css carries the @tailwind directives, so the integration must not inject them again.
  integrations: [tailwind({ applyBaseStyles: false })],
  output: 'static',
  // Inline the (single, ~13 KB gzip) stylesheet: no render-blocking request on first paint.
  build: { inlineStylesheets: 'always' },
});

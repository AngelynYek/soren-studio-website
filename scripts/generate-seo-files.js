import { writeFileSync } from 'node:fs';
import { createServer } from 'vite';
import { robotsTxt, sitemapPaths, sitemapXml } from '../src/seo/sitemap.js';

const server = await createServer({
  configFile: false,
  server: { middlewareMode: true, hmr: false, ws: false },
  appType: 'custom',
});
try {
  const { products } = await server.ssrLoadModule('/src/data/products.js');
  writeFileSync('dist/sitemap.xml', sitemapXml(sitemapPaths(products)));
  writeFileSync('dist/robots.txt', robotsTxt);
} finally {
  await server.close();
}

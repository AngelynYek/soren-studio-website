import { collections } from '../data/collections.js';
import { informationPages } from '../information/pages.js';
import { productPath } from '../navigation/productRoutes.js';
import { SITE_URL } from './pageMeta.js';

export function sitemapPaths(products) {
  return [
    '/',
    ...Object.values(collections).map(({ path }) => path),
    '/shop-all',
    ...Object.values(informationPages).map(({ path }) => path),
    ...products.map(({ slug }) => productPath(slug)),
  ];
}

export function sitemapXml(paths) {
  const urls = paths.map((path) => `  <url>\n    <loc>${SITE_URL}${path}</loc>\n  </url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;
}

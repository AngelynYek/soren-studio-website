import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createServer } from 'vite';
import { collections } from '../src/data/collections.js';
import { informationPages } from '../src/information/pages.js';
import { SHOP_FILTERS } from '../src/shop/shop.js';
import { SITE_URL, getPageMeta, homeMeta } from '../src/seo/pageMeta.js';
import { sitemapPaths, sitemapXml } from '../src/seo/sitemap.js';
import { legacyHashUrl, parseRoute } from '../src/navigation/routes.js';

async function loadProducts() {
  const server = await createServer({
    configFile: false,
    server: { middlewareMode: true, hmr: false, ws: false },
    appType: 'custom',
  });
  try {
    const { products } = await server.ssrLoadModule('/src/data/products.js');
    return products;
  } finally {
    await server.close();
  }
}

test('every page has a unique title and meta description', async () => {
  const products = await loadProducts();
  const pages = [
    getPageMeta({ page: 'home' }),
    ...Object.keys(collections).map((page) => getPageMeta({ page })),
    ...Object.keys(informationPages).map((pageKey) =>
      getPageMeta({ page: 'information', pageKey }),
    ),
    ...SHOP_FILTERS.map(({ value }) => getPageMeta({ page: 'shop', filter: value })),
    getPageMeta({ page: 'search', query: '' }),
    getPageMeta({ page: 'account', mode: 'sign-in' }),
    getPageMeta({ page: 'account', mode: 'create' }),
    getPageMeta({ page: 'cart' }),
    getPageMeta({ page: 'checkout' }),
    getPageMeta({ page: 'receipt' }),
    ...products.map((product) => getPageMeta({ page: 'product' }, product)),
  ];

  assert.ok(pages.every(({ title, description }) => title && description));
  assert.equal(new Set(pages.map(({ title }) => title)).size, pages.length);
  assert.equal(new Set(pages.map(({ description }) => description)).size, pages.length);
});

test('search titles name the query and missing products fall back to the homepage', () => {
  assert.equal(
    getPageMeta({ page: 'search', query: 'coat' }).title,
    'Search results for “coat” — Soren Studio',
  );
  assert.deepEqual(getPageMeta({ page: 'product' }, null), { ...homeMeta, noindex: true });
  assert.deepEqual(getPageMeta({ page: 'home', unknown: true }), { ...homeMeta, noindex: true });
});

test('the static homepage metadata matches the rendered homepage', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.ok(html.includes(`<title>${homeMeta.title}</title>`));
  assert.ok(html.includes(`content="${homeMeta.description}"`));
});

test('product image alt text describes the piece in one sentence', async () => {
  for (const product of await loadProducts()) {
    assert.ok(product.imageAlt.startsWith(`${product.name}. `), product.slug);
    assert.ok(product.imageAlt.length <= 160, `${product.slug}: ${product.imageAlt}`);
    assert.equal(product.imageAlt.match(/\.( |$)/g).length, 2, product.slug);
  }
});

test('private pages are not indexed and filtered shop views share one canonical address', () => {
  for (const url of [
    '/cart',
    '/checkout',
    '/checkout/success?order=x',
    '/account',
    '/search?q=coat',
  ]) {
    const meta = getPageMeta(parseRoute(url));
    assert.equal(meta.noindex, true, url);
    assert.equal(meta.canonical, undefined, url);
  }
  assert.equal(
    getPageMeta(parseRoute('/shop-all?department=men')).canonical,
    `${SITE_URL}/shop-all`,
  );
  assert.equal(getPageMeta(parseRoute('/')).canonical, `${SITE_URL}/`);
  assert.equal(getPageMeta(parseRoute('/men/')).canonical, `${SITE_URL}/men`);
  assert.equal(getPageMeta(parseRoute('/nope')).noindex, true);
});

test('the sitemap lists every indexable page and each one has a matching canonical address', async () => {
  const products = await loadProducts();
  const paths = sitemapPaths(products);
  assert.equal(paths.length, 13 + products.length);
  assert.equal(new Set(paths).size, paths.length);
  for (const path of paths) {
    const product = products.find(({ slug }) => path === `/product/${slug}`) ?? null;
    assert.equal(getPageMeta(parseRoute(path), product).canonical, `${SITE_URL}${path}`);
  }
  assert.equal(sitemapXml(paths).match(/<loc>/g).length, paths.length);
});

test('old # links map to the matching real URL', () => {
  const upgrade = (hash) => legacyHashUrl({ pathname: '/', hash });
  assert.equal(upgrade('#men'), '/men');
  assert.equal(upgrade('#our-story'), '/our-story');
  assert.equal(upgrade('#checkout/success?order=a1'), '/checkout/success?order=a1');
  assert.equal(
    upgrade('#product/noir-fold-dress?from=shop-all&department=men'),
    '/product/noir-fold-dress?from=shop-all&department=men',
  );
  assert.equal(upgrade('#instagram'), null);
  assert.equal(upgrade(''), null);
  assert.equal(legacyHashUrl({ pathname: '/men', hash: '#cart' }), null);
});

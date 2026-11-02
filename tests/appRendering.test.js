import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { priceInMinorUnits } from '../src/cart/cart.js';

const routes = [
  ['/', 'Soren Studio — Modern essentials'],
  ['/men', 'Men’s collection — Soren Studio'],
  ['/timeless-basics', 'Timeless basics — Soren Studio'],
  ['/product/noir-fold-dress', 'The Noir Fold Dress — Soren Studio'],
  ['/shop-all', 'Shop all — Soren Studio'],
  ['/search', 'Search — Soren Studio'],
  ['/account', 'Your account — Soren Studio'],
  ['/cart', 'Shopping bag — Soren Studio'],
  ['/checkout', 'Checkout — Soren Studio'],
  ['/our-story', 'Our story — Soren Studio'],
  ['/nope', 'Page not found — Soren Studio'],
  ['/product/nope', 'Page not found — Soren Studio'],
];

async function withServer(run) {
  const server = await createServer({
    configFile: false,
    server: { middlewareMode: true, hmr: false, ws: false },
    appType: 'custom',
  });
  try {
    await run(server);
  } finally {
    await server.close();
  }
}

test('every kind of page renders the header, footer, one h1 and its title', async () => {
  await withServer(async (server) => {
    const { default: App } = await server.ssrLoadModule('/src/App.jsx');
    const { AccountProvider } = await server.ssrLoadModule('/src/account/AccountProvider.jsx');
    const { CartProvider } = await server.ssrLoadModule('/src/cart/CartProvider.jsx');
    try {
      for (const [path, title] of routes) {
        globalThis.window = { location: { pathname: path, search: '', hash: '' } };
        const markup = renderToStaticMarkup(
          React.createElement(
            AccountProvider,
            null,
            React.createElement(CartProvider, null, React.createElement(App)),
          ),
        );
        assert.ok(markup.includes('<header'), path);
        assert.ok(markup.includes('<footer'), path);
        assert.equal(markup.match(/<h1[ >]/g).length, 1, path);
        assert.ok(markup.includes(`<title>${title}</title>`), `${path}: ${title}`);
      }
    } finally {
      delete globalThis.window;
    }
  });
});

test('the product page photo uses the full description as its alt text', async () => {
  await withServer(async (server) => {
    const { default: App } = await server.ssrLoadModule('/src/App.jsx');
    const { AccountProvider } = await server.ssrLoadModule('/src/account/AccountProvider.jsx');
    const { CartProvider } = await server.ssrLoadModule('/src/cart/CartProvider.jsx');
    const { productBySlug } = await server.ssrLoadModule('/src/data/products.js');
    globalThis.window = {
      location: { pathname: '/product/noir-fold-dress', search: '', hash: '' },
    };
    try {
      const markup = renderToStaticMarkup(
        React.createElement(
          AccountProvider,
          null,
          React.createElement(CartProvider, null, React.createElement(App)),
        ),
      );
      assert.ok(markup.includes(`alt="${productBySlug('noir-fold-dress').imageAlt}"`));
    } finally {
      delete globalThis.window;
    }
  });
});

test('every catalog product belongs to a collection and can be charged at checkout', async () => {
  await withServer(async (server) => {
    const { products } = await server.ssrLoadModule('/src/data/products.js');
    const { collections } = await server.ssrLoadModule('/src/data/collections.js');
    for (const product of products) {
      assert.ok(collections[product.group], product.slug);
      assert.ok(priceInMinorUnits(product.price) > 0, product.slug);
    }
  });
});

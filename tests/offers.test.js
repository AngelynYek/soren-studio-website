import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync } from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { getSizeGuide } from '../src/data/sizeGuides.js';

test('offers include the original homepage products and every supplied offer image', async () => {
  const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' });
  try {
    const { products, productsByGroup, productBySlug, featuredProductsByGroup } = await server.ssrLoadModule('/src/data/products.js');
    const { collections } = await server.ssrLoadModule('/src/data/collections.js');
    const { default: ProductPrice } = await server.ssrLoadModule('/src/components/ProductPrice.jsx');
    const offers = productsByGroup('offers');
    const featured = featuredProductsByGroup('offers');
    const photoNames = readdirSync(new URL('../src/images/offer/', import.meta.url));

    assert.equal(collections.offers.hash, '#exclusive-offers');
    assert.equal(collections.offers.group, 'offers');
    assert.ok(collections.offers.backLabel);
    assert.equal(new Set(Object.values(collections).map((collection) => collection.hash)).size, Object.keys(collections).length);
    assert.deepEqual(featured.map((product) => product.slug), [
      'soren-minimalist-hobo-bag', 'freja-ribbed-sweater-dress', 'sienna-flared-midi-skirt',
    ]);
    assert.equal(offers.length, photoNames.length + featured.length);
    assert.equal(new Set(products.map((product) => product.slug)).size, products.length);

    for (const filename of photoNames) {
      assert.equal(offers.filter((product) => decodeURI(product.image).endsWith(`/offer/${filename}`)).length, 1);
    }
    for (const product of offers) {
      assert.equal(productBySlug(product.slug), product);
      assert.ok(product.name && product.description && product.fit);
      assert.ok(existsSync(`.${decodeURI(product.image)}`));
      assert.ok(Number(product.price.replace('RM ', '')) < Number(product.wasPrice.replace('RM ', '')));
      if (product.sizes.length) assert.ok(getSizeGuide(product), `Missing guide: ${product.slug}`);
      else assert.equal(getSizeGuide(product), null);
      const priceMarkup = renderToStaticMarkup(React.createElement(ProductPrice, product));
      assert.match(priceMarkup, /Sale price:/);
      assert.match(priceMarkup, /<del>/);
      assert.ok(priceMarkup.includes(product.wasPrice));
    }
    const setGuide = getSizeGuide(productBySlug('leonie-contour-shirt-skirt-set'));
    assert.deepEqual(setGuide.columns.map((column) => column.key), ['bust', 'waist', 'hips']);
    const regularPrice = renderToStaticMarkup(React.createElement(ProductPrice, { price: 'RM 100' }));
    assert.equal(regularPrice, 'RM 100');
  } finally {
    await server.close();
  }
});

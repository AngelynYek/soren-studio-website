import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync } from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { getSizeGuide } from '../src/data/sizeGuides.js';

test('timeless basics includes every supplied photo and a matching clothing size guide', async () => {
  const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' });
  try {
    const { products, productsByGroup, productBySlug } = await server.ssrLoadModule('/src/data/products.js');
    const { collections } = await server.ssrLoadModule('/src/data/collections.js');
    const { default: SizeGuide } = await server.ssrLoadModule('/src/components/SizeGuide.jsx');
    const basics = productsByGroup('basics');
    const photos = readdirSync(new URL('../src/images/basics/', import.meta.url));

    assert.ok(photos.length > 0);
    assert.equal(basics.length, photos.length);
    assert.equal(collections.basics.hash, '#timeless-basics');
    assert.equal(collections.basics.group, 'basics');
    assert.equal(collections.basics.backLabel, 'timeless basics');
    assert.equal(new Set(Object.values(collections).map((collection) => collection.hash)).size, Object.keys(collections).length);
    assert.equal(new Set(products.map((product) => product.slug)).size, products.length);

    for (const filename of photos) {
      assert.equal(basics.filter((product) => decodeURI(product.image).endsWith(`/basics/${filename}`)).length, 1);
    }
    for (const product of basics) {
      assert.equal(productBySlug(product.slug), product);
      assert.ok(product.name && product.price && product.description && product.fit);
      assert.ok(existsSync(`.${decodeURI(product.image)}`));
      const guide = getSizeGuide(product);
      assert.ok(guide, product.slug);
      assert.deepEqual(guide.rows.map((row) => row.size), product.sizes);
      assert.equal(guide.profile, product.sizeProfile ?? 'women');
      assert.deepEqual(guide.columns.map((column) => column.key), [guide.profile === 'men' ? 'chest' : 'bust', 'waist']);
      const markup = renderToStaticMarkup(React.createElement(SizeGuide, { product, selectedSize: product.sizes[0] }));
      assert.match(markup, /<dialog/);
      assert.match(markup, /Sample sizing for this personal demo/);
      assert.match(markup, /selected size/);
      assert.match(markup, /Centimetres/);
      assert.match(markup, /Inches/);
    }
  } finally {
    await server.close();
  }
});

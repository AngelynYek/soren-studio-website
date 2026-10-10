import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync } from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { getSizeGuide } from '../src/data/sizeGuides.js';

test('iconic collection preserves homepage products and includes each new photo with a size guide', async () => {
  const server = await createServer({
    server: { middlewareMode: true, hmr: false, ws: false },
    appType: 'custom',
  });
  try {
    const { products, productsByGroup, featuredProductsByGroup, productBySlug } =
      await server.ssrLoadModule('/src/data/products.js');
    const { collections } = await server.ssrLoadModule('/src/data/collections.js');
    const { default: SizeGuide } = await server.ssrLoadModule('/src/components/SizeGuide.jsx');
    const icons = productsByGroup('icons');
    const featured = featuredProductsByGroup('icons');
    const photoNames = readdirSync(new URL('../src/images/iconic/', import.meta.url));

    assert.equal(collections.icons.hash, '#iconic-pieces');
    assert.equal(collections.icons.group, 'icons');
    assert.equal(collections.icons.backLabel, 'iconic pieces');
    assert.deepEqual(
      featured.map((product) => product.slug),
      [
        'noir-fold-dress',
        'elias-minimalist-trench-coat',
        'kaya-pleated-wide-leg-trouser',
        'half-zip-cable-knit',
        'loretta-tailored-midi-skirt',
        'espresso-oversized-longline-coat',
      ],
    );
    assert.equal(icons.length, featured.length + photoNames.length);
    assert.equal(new Set(products.map((product) => product.slug)).size, products.length);
    for (const filename of photoNames) {
      assert.equal(
        icons.filter((product) => decodeURI(product.image).endsWith(`/iconic/${filename}`)).length,
        1,
      );
    }
    for (const product of icons) {
      assert.equal(productBySlug(product.slug), product);
      assert.ok(existsSync(`.${decodeURI(product.image)}`));
      assert.ok(product.name && product.description && product.price && product.fit);
      const guide = getSizeGuide(product);
      assert.ok(guide, product.slug);
      assert.deepEqual(
        guide.rows.map((row) => row.size),
        product.sizes,
      );
      const markup = renderToStaticMarkup(React.createElement(SizeGuide, { product }));
      assert.match(markup, /<dialog/);
      assert.match(markup, /Sample sizing for this personal demo/);
    }
    assert.equal(getSizeGuide(productBySlug('lucien-waffle-texture-shirt')).profile, 'men');
    const espressoGuide = getSizeGuide(productBySlug('espresso-oversized-longline-coat'));
    assert.equal(espressoGuide.profile, 'women');
    assert.deepEqual(
      espressoGuide.columns.map((column) => column.key),
      ['bust', 'waist'],
    );
    assert.deepEqual(
      getSizeGuide(productBySlug('adrienne-double-breasted-suit-set')).columns.map(
        (column) => column.key,
      ),
      ['bust', 'waist', 'hips'],
    );
  } finally {
    await server.close();
  }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { formatMeasurementRange, getSizeGuide } from '../src/data/sizeGuides.js';

test('charts use the correct category measurements and available size order', () => {
  const tops = getSizeGuide({ group: 'men', category: 'Shirts', sizes: ['XL', 'S'] });
  assert.deepEqual(
    tops.columns.map((column) => column.key),
    ['chest', 'waist'],
  );
  assert.deepEqual(
    tops.rows.map((row) => row.size),
    ['XL', 'S'],
  );
  assert.deepEqual(tops.rows[1].measurements[0], [92, 97]);

  const dress = getSizeGuide({ group: 'women', category: 'Dresses', sizes: ['XS'] });
  assert.deepEqual(
    dress.columns.map((column) => column.key),
    ['bust', 'waist', 'hips'],
  );
  const trousers = getSizeGuide({ group: 'men', category: 'Trousers', sizes: ['M'] });
  assert.deepEqual(
    trousers.columns.map((column) => column.key),
    ['waist', 'hips'],
  );
});

test('mixed collections can explicitly override the size profile', () => {
  const guide = getSizeGuide({
    group: 'autumn',
    sizeProfile: 'men',
    category: 'Knitwear',
    sizes: ['S'],
  });
  assert.equal(guide.profile, 'men');
  assert.equal(guide.columns[0].key, 'chest');
});

test('unsupported categories, profiles and size ranges do not get misleading guides', () => {
  for (const product of [
    { category: 'Accessories', sizes: [] },
    { category: 'Belts', sizes: ['S', 'M'] },
    { category: 'Tops', sizes: ['One size'] },
    { category: 'Tops', sizeProfile: 'unknown', sizes: ['S'] },
    { category: 'Tops' },
  ])
    assert.equal(getSizeGuide(product), null);
});

test('unit conversion uses centimetres as its source without mutating ranges', () => {
  const range = [83, 87];
  assert.equal(formatMeasurementRange(range), '83–87');
  assert.equal(formatMeasurementRange(range, 'in'), '32.7–34.3');
  assert.deepEqual(range, [83, 87]);
  assert.equal(formatMeasurementRange(range, 'cm'), '83–87');
});

test('every catalog clothing product has a renderable guide with sane measurement progression', async () => {
  const server = await createServer({
    server: { middlewareMode: true, hmr: false, ws: false },
    appType: 'custom',
  });
  try {
    const { products } = await server.ssrLoadModule('/src/data/products.js');
    const { default: SizeGuide } = await server.ssrLoadModule('/src/components/SizeGuide.jsx');
    const clothing = products.filter((product) =>
      ['Tops', 'Shirts', 'Knitwear', 'Outerwear', 'Dresses', 'Sets', 'Skirts', 'Trousers'].includes(
        product.category,
      ),
    );
    assert.ok(clothing.length > 0);
    for (const product of clothing) {
      const guide = getSizeGuide(product);
      assert.ok(guide, product.slug);
      assert.deepEqual(
        guide.rows.map((row) => row.size),
        product.sizes,
      );
      guide.rows.forEach((row, index) =>
        row.measurements.forEach(([min, max], column) => {
          assert.ok(min > 0 && max > min);
          if (index) assert.ok(min > guide.rows[index - 1].measurements[column][1]);
        }),
      );
      const markup = renderToStaticMarkup(
        React.createElement(SizeGuide, { product, selectedSize: product.sizes[0] }),
      );
      assert.match(markup, /<dialog/);
      assert.match(markup, /Sample sizing for this personal demo/);
      assert.match(markup, /selected size/);
      assert.match(markup, /aria-haspopup="dialog"/);
    }
    for (const product of products.filter((product) => !clothing.includes(product))) {
      assert.equal(getSizeGuide(product), null);
      assert.equal(renderToStaticMarkup(React.createElement(SizeGuide, { product })), '');
    }
  } finally {
    await server.close();
  }
});

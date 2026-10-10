import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { createSearchIndex, searchProducts, RESULTS_PER_PAGE } from '../src/search/search.js';

test('search renders initial, matching, empty and paginated states using the real catalog', async () => {
  const server = await createServer({
    configFile: false,
    server: { middlewareMode: true, hmr: false, ws: false },
    appType: 'custom',
  });
  try {
    const { default: SearchPage } = await server.ssrLoadModule('/src/search/SearchPage.jsx');
    const { products } = await server.ssrLoadModule('/src/data/products.js');
    const { collections } = await server.ssrLoadModule('/src/data/collections.js');
    const render = (query = '') =>
      renderToStaticMarkup(React.createElement(SearchPage, { query, onShowProduct() {} }));
    const initial = render();
    assert.match(initial, /role="search" aria-label="Product search"/);
    assert.match(initial, /<label[^>]*for="product-search">Search products/);
    assert.match(initial, /type="search"/);
    assert.match(initial, /Popular searches/);
    assert.match(initial, /href="#search\?q=Knitwear"/);
    assert.doesNotMatch(initial, /pieces found|class="product-card"/);

    const match = render('Soren Minimalist Hobo Bag');
    assert.match(match, /1 piece found/);
    assert.match(match, /alt="Soren Minimalist Hobo Bag"/);
    assert.match(match, /class="product-name"/);
    assert.match(match, /RM 64/);
    assert.match(match, /Original price: /);
    assert.match(match, /Clear search/);

    const noMatch = render('<script>alert(1)</script>');
    assert.match(noMatch, /0 pieces found/);
    assert.match(noMatch, /No matching pieces just yet/);
    assert.match(noMatch, /&lt;script&gt;/);
    assert.doesNotMatch(noMatch, /<script>|class="product-card"/);

    const index = createSearchIndex(products, collections);
    const accessoryCategories = [
      'Accessories',
      'Bags',
      'Belts',
      'Jewellery',
      'Eyewear',
      'Hats',
      'Scarves',
    ];
    for (const [query, categories] of [
      ['Trousers', ['Trousers']],
      ['Accessories', accessoryCategories],
      ['Dresses', ['Dresses']],
      ['Knitwear', ['Knitwear']],
    ]) {
      const expected = products.filter((product) => categories.includes(product.category));
      const actual = searchProducts(index, query);
      assert.deepEqual(
        actual.map((product) => product.slug).sort(),
        expected.map((product) => product.slug).sort(),
        `${query} must match actual product categories, not styling descriptions`,
      );
      const markup = render(query);
      assert.equal(
        (markup.match(/class="product-card"/g) ?? []).length,
        Math.min(expected.length, RESULTS_PER_PAGE),
      );
      if (query === 'Accessories') {
        assert.doesNotMatch(markup, /Leonie Contour Shirt|Lucien Waffle-Texture Shirt/);
      }
      if (query === 'Trousers') {
        assert.doesNotMatch(
          markup,
          /Lucien Waffle-Texture Shirt|Adrienne Double-Breasted Suit Set/,
        );
      }
    }
    const matches = searchProducts(index, 'collection');
    assert.ok(matches.length > RESULTS_PER_PAGE);
    const many = render('collection');
    assert.equal((many.match(/class="product-card"/g) ?? []).length, RESULTS_PER_PAGE);
    assert.match(many, new RegExp(`Showing ${RESULTS_PER_PAGE} of ${matches.length} pieces`));
    assert.match(many, /Show more pieces/);

    // Every product is searchable by its exact name and preserves its canonical slug.
    for (const product of products) {
      const results = searchProducts(index, product.name);
      assert.ok(
        results.some((result) => result.slug === product.slug),
        product.slug,
      );
    }
  } finally {
    await server.close();
  }
});

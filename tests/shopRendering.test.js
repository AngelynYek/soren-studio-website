import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { getSizeGuide } from '../src/data/sizeGuides.js';
import { ACCESSORY_CATEGORIES } from '../src/data/productDepartments.js';
import {
  SHOP_FILTERS,
  SHOP_PAGE_SIZE,
  filterShopProducts,
  getShopCounts,
} from '../src/shop/shop.js';

test('shop all covers the complete catalog exactly once and renders each department correctly', async () => {
  const server = await createServer({
    configFile: false,
    server: { middlewareMode: true, hmr: false, ws: false },
    appType: 'custom',
  });
  try {
    const { products, productBySlug } = await server.ssrLoadModule('/src/data/products.js');
    const { default: ShopAllPage } = await server.ssrLoadModule('/src/shop/ShopAllPage.jsx');
    const counts = getShopCounts(products);
    const departments = ['men', 'women', 'accessories'];
    const combined = departments.flatMap((department) => filterShopProducts(products, department));
    assert.equal(combined.length, products.length);
    assert.equal(new Set(combined.map((product) => product.slug)).size, products.length);
    assert.equal(counts.men + counts.women + counts.accessories, products.length);
    assert.ok(departments.every((department) => counts[department] > 0));
    assert.equal(filterShopProducts(products, 'all'), products);
    const espressoCoat = productBySlug('espresso-oversized-longline-coat');
    assert.ok(filterShopProducts(products, 'women').includes(espressoCoat));
    assert.ok(!filterShopProducts(products, 'men').includes(espressoCoat));

    const accessories = filterShopProducts(products, 'accessories');
    assert.deepEqual(
      accessories.map((product) => product.slug),
      products
        .filter((product) => ACCESSORY_CATEGORIES.includes(product.category))
        .map((product) => product.slug),
    );
    assert.ok(accessories.some((product) => product.group === 'offers'));
    for (const department of ['men', 'women']) {
      const items = filterShopProducts(products, department);
      assert.ok(items.some((product) => product.group === 'autumn'));
      assert.ok(items.some((product) => product.group === 'offers'));
      assert.ok(items.some((product) => product.group === 'icons'));
      assert.ok(items.some((product) => product.group === 'basics'));
      for (const product of items) {
        assert.equal(getSizeGuide(product)?.profile, department, product.slug);
        assert.equal(productBySlug(product.slug), product);
      }
    }

    const render = (filter) =>
      renderToStaticMarkup(React.createElement(ShopAllPage, { filter, onShowProduct() {} }));
    for (const { value, label } of SHOP_FILTERS) {
      const markup = render(value);
      const items = filterShopProducts(products, value);
      assert.match(markup, /<h1 id="shop-title" tabindex="-1">Shop all/);
      assert.match(markup, /<fieldset class="shop-filters"><legend>Filter by/);
      assert.equal((markup.match(/type="radio"/g) ?? []).length, SHOP_FILTERS.length);
      assert.match(
        markup,
        new RegExp(`<input(?=[^>]*type="radio")(?=[^>]*checked)(?=[^>]*value="${value}")[^>]*>`),
      );
      assert.match(markup, new RegExp(`${items.length} pieces · ${label}`));
      assert.equal(
        (markup.match(/class="product-card"/g) ?? []).length,
        Math.min(items.length, SHOP_PAGE_SIZE),
      );
      assert.equal(markup.includes('Show more pieces'), items.length > SHOP_PAGE_SIZE);
      if (value === 'accessories') {
        assert.doesNotMatch(markup, /Leonie Contour Shirt|Lucien Waffle-Texture Shirt/);
        assert.match(markup, /Soren Minimalist Hobo Bag/);
        assert.match(markup, /Sale price: /);
      }
    }
    assert.match(render('invalid'), new RegExp(`${products.length} pieces · All pieces`));
  } finally {
    await server.close();
  }
});

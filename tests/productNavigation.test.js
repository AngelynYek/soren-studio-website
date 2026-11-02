import test from 'node:test';
import assert from 'node:assert/strict';
import { parseProductRoute, productPath } from '../src/navigation/productRoutes.js';
import { SHOP_FILTERS, shopPath } from '../src/shop/shop.js';

function readPath(url) {
  const [path, query] = url.split('?');
  return parseProductRoute(path, new URLSearchParams(query));
}

test('products opened from Shop all retain their return link and selected department', () => {
  for (const { value } of SHOP_FILTERS) {
    const route = readPath(productPath('espresso-oversized-longline-coat', value));
    assert.equal(route.page, 'product');
    assert.equal(route.productSlug, 'espresso-oversized-longline-coat');
    assert.deepEqual(route.returnTo, { label: 'shop all', path: shopPath(value) });
  }
});

test('normal product links preserve their original collection fallback', () => {
  assert.equal(productPath('noir-fold-dress'), '/product/noir-fold-dress');
  assert.deepEqual(readPath(productPath('noir-fold-dress')), {
    page: 'product',
    productSlug: 'noir-fold-dress',
    returnTo: null,
  });
});

test('product navigation accepts only safe internal return contexts and tolerates invalid routes', () => {
  assert.equal(readPath('/product/noir-fold-dress?from=https://example.com').returnTo, null);
  assert.equal(readPath('/product/noir-fold-dress?from=javascript:alert(1)').returnTo, null);
  assert.equal(
    readPath('/product/noir-fold-dress?from=shop-all&department=invalid').returnTo.path,
    '/shop-all',
  );
  assert.equal(readPath(productPath('noir-fold-dress', 'invalid')).returnTo.path, '/shop-all');
  assert.equal(readPath('/product/%E0%A4%A'), null);
  assert.equal(readPath('/product/'), null);
  assert.equal(readPath('/shop-all'), null);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { parseProductRoute, productHash } from '../src/navigation/productRoutes.js';
import { SHOP_FILTERS, shopHash } from '../src/shop/shop.js';

function readHash(hash) {
  const [path, query] = hash.split('?');
  return parseProductRoute(path, new URLSearchParams(query));
}

test('products opened from Shop all retain their return link and selected department', () => {
  for (const { value } of SHOP_FILTERS) {
    const route = readHash(productHash('espresso-oversized-longline-coat', value));
    assert.equal(route.page, 'product');
    assert.equal(route.productSlug, 'espresso-oversized-longline-coat');
    assert.deepEqual(route.returnTo, { label: 'shop all', hash: shopHash(value) });
  }
});

test('normal product links preserve their original collection fallback', () => {
  assert.equal(productHash('noir-fold-dress'), '#product/noir-fold-dress');
  assert.deepEqual(readHash(productHash('noir-fold-dress')), {
    page: 'product',
    productSlug: 'noir-fold-dress',
    returnTo: null,
  });
});

test('product navigation accepts only safe internal return contexts and tolerates invalid routes', () => {
  assert.equal(readHash('#product/noir-fold-dress?from=https://example.com').returnTo, null);
  assert.equal(readHash('#product/noir-fold-dress?from=javascript:alert(1)').returnTo, null);
  assert.equal(
    readHash('#product/noir-fold-dress?from=shop-all&department=invalid').returnTo.hash,
    '#shop-all',
  );
  assert.equal(readHash(productHash('noir-fold-dress', 'invalid')).returnTo.hash, '#shop-all');
  assert.equal(readHash('#product/%E0%A4%A'), null);
  assert.equal(readHash('#product/'), null);
  assert.equal(readHash('#shop-all'), null);
});

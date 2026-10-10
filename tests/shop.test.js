import test from 'node:test';
import assert from 'node:assert/strict';
import { ACCESSORY_CATEGORIES, getProductDepartment } from '../src/data/productDepartments.js';
import {
  SHOP_FILTERS,
  filterShopProducts,
  getShopCounts,
  normalizeShopFilter,
  shopHash,
} from '../src/shop/shop.js';

const catalog = [
  { slug: 'men-shirt', group: 'men', category: 'Shirts' },
  { slug: 'autumn-coat', group: 'autumn', sizeProfile: 'men', category: 'Outerwear' },
  { slug: 'women-dress', group: 'women', category: 'Dresses' },
  {
    slug: 'basics-knit',
    group: 'basics',
    category: 'Knitwear',
    description: 'Wear with menswear or accessories.',
  },
  { slug: 'offer-bag', group: 'offers', category: 'Bags', sizes: [] },
  { slug: 'belt', group: 'accessories', category: 'Belts', sizes: ['S', 'M', 'L'] },
];

test('shop filters use structured product departments, including mixed editorial collections', () => {
  const slugs = (filter) => filterShopProducts(catalog, filter).map((product) => product.slug);
  assert.deepEqual(slugs('men'), ['men-shirt', 'autumn-coat']);
  assert.deepEqual(slugs('women'), ['women-dress', 'basics-knit']);
  assert.deepEqual(slugs('accessories'), ['offer-bag', 'belt']);
  assert.equal(filterShopProducts(catalog), catalog);
  assert.deepEqual(
    slugs('all'),
    catalog.map((product) => product.slug),
  );
  assert.deepEqual(getShopCounts(catalog), { all: 6, men: 2, women: 2, accessories: 2 });
});

test('accessory categories take priority over sizing and collection membership', () => {
  for (const category of ACCESSORY_CATEGORIES) {
    assert.equal(
      getProductDepartment({ category, group: 'offers', sizeProfile: 'men' }),
      'accessories',
    );
  }
  assert.equal(
    getProductDepartment({ category: 'Tops', group: 'men', sizeProfile: 'women' }),
    'women',
  );
  assert.equal(
    getProductDepartment({ category: 'Tops', group: 'women', sizeProfile: 'men' }),
    'men',
  );
});

test('filter URLs round-trip valid selections and unknown filters safely show the full catalog', () => {
  for (const { value } of SHOP_FILTERS) {
    assert.equal(normalizeShopFilter(value), value);
    const params = new URLSearchParams(shopHash(value).split('?')[1]);
    assert.equal(normalizeShopFilter(params.get('department')), value);
  }
  for (const value of [null, undefined, '', 'invalid', '<script>']) {
    assert.equal(normalizeShopFilter(value), 'all');
    assert.equal(shopHash(value), '#shop-all');
    assert.equal(filterShopProducts(catalog, value), catalog);
  }
});

test('filtering preserves canonical products and order without mutating the catalog', () => {
  const before = JSON.stringify(catalog);
  assert.equal(filterShopProducts(catalog, 'men')[0], catalog[0]);
  assert.equal(filterShopProducts(catalog, 'accessories')[1], catalog[5]);
  assert.equal(JSON.stringify(catalog), before);
  assert.deepEqual(getShopCounts([]), { all: 0, men: 0, women: 0, accessories: 0 });
  assert.deepEqual(filterShopProducts([], 'women'), []);
});

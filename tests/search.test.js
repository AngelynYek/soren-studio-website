import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MAX_QUERY_LENGTH,
  cleanSearchQuery,
  createSearchIndex,
  searchHash,
  searchProducts,
} from '../src/search/search.js';

const collections = {
  men: { title: 'Men’s collection', label: 'Menswear' },
  women: { title: 'Women’s collection', label: 'Womenswear' },
  autumn: { title: 'Autumn collection', backLabel: 'new arrivals' },
};
const catalog = [
  {
    slug: 'cotton-shirt',
    name: 'Rowan Cotton Shirt',
    group: 'men',
    category: 'Shirts',
    description: 'A blue shirt to wear with linen trousers.',
    material: 'Cotton',
    fit: 'Relaxed fit',
  },
  {
    slug: 'linen-shirt',
    name: 'Émile Linen-Blend Shirt',
    group: 'men',
    category: 'Shirts',
    description: 'A white everyday layer.',
    material: 'Linen and cotton',
    fit: 'Easy fit',
  },
  {
    slug: 'wool-dress',
    name: 'Marlow Wool Dress',
    group: 'women',
    category: 'Dresses',
    description: 'A brown pleated midi dress.',
    material: 'Wool',
    price: 'RM 108',
    wasPrice: 'RM 135',
  },
  {
    slug: 'autumn-knit',
    name: 'Nell Turtleneck Knit',
    group: 'autumn',
    category: 'Knitwear',
    description: 'Soft ribbed texture.',
    material: 'Merino wool',
    fit: 'Oversized fit',
  },
];
const index = createSearchIndex(catalog, collections);
const slugs = (query) => searchProducts(index, query).map((product) => product.slug);

test('search cleans query whitespace, bounds length, and safely encodes search URLs', () => {
  assert.equal(cleanSearchQuery('  linen   shirt\n '), 'linen shirt');
  assert.equal(cleanSearchQuery(null), '');
  assert.equal(cleanSearchQuery('x'.repeat(300)).length, MAX_QUERY_LENGTH);
  assert.equal(searchHash('  '), '#search');
  assert.equal(searchHash('shirt & skirt?'), '#search?q=shirt%20%26%20skirt%3F');
  assert.equal(
    new URLSearchParams(searchHash('Émile linen').split('?')[1]).get('q'),
    'Émile linen',
  );
});

test('search matches names, categories, descriptions, materials, fits and collections', () => {
  assert.deepEqual(slugs('EMILE'), ['linen-shirt']);
  assert.deepEqual(slugs('Émile'), ['linen-shirt']);
  assert.deepEqual(slugs('knitw'), ['autumn-knit']);
  assert.deepEqual(slugs('merino'), ['autumn-knit']);
  assert.deepEqual(slugs('oversized'), ['autumn-knit']);
  assert.deepEqual(slugs('pleated'), ['wool-dress']);
  assert.deepEqual(slugs('autumn'), ['autumn-knit']);
  assert.deepEqual(slugs('new arrivals'), ['autumn-knit']);
  assert.deepEqual(slugs('sale'), ['wool-dress']);
});

test('search requires every word, prioritizes name matches and keeps equal matches in catalog order', () => {
  assert.deepEqual(slugs('linen shirt'), ['linen-shirt', 'cotton-shirt']);
  assert.deepEqual(slugs('linen-blend'), ['linen-shirt']);
  assert.deepEqual(slugs('shirt'), ['cotton-shirt', 'linen-shirt']);
  assert.deepEqual(slugs('shirt shirt'), ['cotton-shirt', 'linen-shirt']);
  assert.deepEqual(slugs('wool shirt'), []);
});

test('menswear queries do not accidentally match women and possessives use the same matching rules', () => {
  for (const query of ['men', 'mens', "men's", 'Men’s']) {
    assert.deepEqual(slugs(query), ['cotton-shirt', 'linen-shirt']);
  }
  for (const query of ['women', 'womens', "women's"]) {
    assert.deepEqual(slugs(query), ['wool-dress']);
  }
});

test('blank, punctuation-only and unknown searches return no matches without mutating the catalog', () => {
  const before = JSON.stringify(catalog);
  for (const query of ['', '   ', '.*', '???', null, 'nonexistent', '<script>']) {
    assert.deepEqual(slugs(query), []);
  }
  assert.equal(searchProducts(index, 'Emile')[0], catalog[1]);
  assert.equal(JSON.stringify(catalog), before);
  assert.equal(index.length, catalog.length);
});

test('category queries reject styling mentions even when there are no products in that category', () => {
  assert.deepEqual(slugs('trousers'), []);
  assert.deepEqual(slugs('linen trousers'), []);
  assert.deepEqual(slugs('pants'), []);
});

test('category terms restrict multi-word searches and accessories span their actual subcategories', () => {
  const fixtures = [
    {
      name: 'Brown Tailored Trouser',
      slug: 'trouser',
      category: 'Trousers',
      description: 'Wear with a shirt and accessories.',
    },
    {
      name: 'Brown Cotton Shirt',
      slug: 'shirt',
      category: 'Shirts',
      description: 'Pair with brown trousers and styling accessories.',
    },
    {
      name: 'Leonie Shirt & Skirt Set',
      slug: 'set',
      category: 'Sets',
      description: 'Accessories and trousers are not included.',
    },
    { name: 'Studio Hobo Bag', slug: 'hobo', category: 'Bags' },
    { name: 'Olive Shoulder Bag', slug: 'bag', category: 'Bags' },
    { name: 'Botanical Scarf', slug: 'scarf', category: 'Scarves', group: 'offers' },
    { name: 'Vesper Sunglasses', slug: 'eyewear', category: 'Eyewear', group: 'offers' },
    { name: 'Sculptural Brooch', slug: 'brooch', category: 'Accessories' },
  ];
  const fixtureIndex = createSearchIndex(fixtures, {});
  const resultSlugs = (query) => searchProducts(fixtureIndex, query).map((product) => product.slug);
  for (const query of ['trouser', 'trousers', 'pants', 'brown trousers']) {
    assert.deepEqual(resultSlugs(query), ['trouser']);
  }
  for (const query of ['accessory', 'accessories']) {
    assert.deepEqual(resultSlugs(query), ['hobo', 'bag', 'scarf', 'eyewear', 'brooch']);
  }
  assert.deepEqual(resultSlugs('bag'), ['hobo', 'bag']);
  assert.deepEqual(resultSlugs('offers accessories'), ['scarf', 'eyewear']);
  assert.deepEqual(resultSlugs('brown shirt'), ['shirt']);
  assert.deepEqual(resultSlugs('sets'), ['set']);
});

test('full product names remain searchable when the name includes other garment categories', () => {
  const set = { name: 'Leonie Contour Shirt & Skirt Set', slug: 'set', category: 'Sets' };
  const fixtureIndex = createSearchIndex([set], {});
  assert.deepEqual(searchProducts(fixtureIndex, 'Leonie Contour Shirt & Skirt Set'), [set]);
  assert.deepEqual(searchProducts(fixtureIndex, 'shirt'), []);
  assert.deepEqual(searchProducts(fixtureIndex, 'skirt'), []);
});

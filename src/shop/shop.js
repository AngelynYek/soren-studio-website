import { getProductDepartment } from '../data/productDepartments.js';

export const SHOP_PAGE_SIZE = 12;
export const SHOP_FILTERS = [
  { value: 'all', label: 'All pieces' },
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'accessories', label: 'Accessories' },
];

export function normalizeShopFilter(value) {
  return SHOP_FILTERS.some((filter) => filter.value === value) ? value : 'all';
}

export function shopHash(filter = 'all') {
  const department = normalizeShopFilter(filter);
  return department === 'all' ? '#shop-all' : `#shop-all?department=${department}`;
}

export function filterShopProducts(products, filter = 'all') {
  const department = normalizeShopFilter(filter);
  return department === 'all'
    ? products
    : products.filter((product) => getProductDepartment(product) === department);
}

export function getShopCounts(products) {
  const counts = { all: products.length, men: 0, women: 0, accessories: 0 };
  for (const product of products) counts[getProductDepartment(product)] += 1;
  return counts;
}

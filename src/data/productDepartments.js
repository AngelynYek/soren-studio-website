export const ACCESSORY_CATEGORIES = Object.freeze([
  'Accessories',
  'Bags',
  'Belts',
  'Jewellery',
  'Eyewear',
  'Hats',
  'Scarves',
]);

// Editorial collection membership is independent of a product's department.
// Mixed collections use the same clothing profiles as their existing size guides.
export function getProductDepartment(product) {
  if (ACCESSORY_CATEGORIES.includes(product.category)) return 'accessories';
  if (product.sizeProfile === 'men' || product.sizeProfile === 'women') return product.sizeProfile;
  return product.group === 'men' ? 'men' : 'women';
}

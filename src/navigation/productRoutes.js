import { normalizeShopFilter, shopHash } from '../shop/shop.js';

export function productHash(slug, shopFilter) {
  const path = `#product/${encodeURIComponent(slug)}`;
  if (shopFilter === undefined) return path;

  const params = new URLSearchParams({
    from: 'shop-all',
    department: normalizeShopFilter(shopFilter),
  });
  return `${path}?${params}`;
}

export function parseProductRoute(path, params = new URLSearchParams()) {
  const match = path.match(/^#product\/(.+)$/);
  if (!match) return null;

  try {
    return {
      page: 'product',
      productSlug: decodeURIComponent(match[1]),
      // Only accept a known internal origin, never an arbitrary return URL.
      returnTo:
        params.get('from') === 'shop-all'
          ? { label: 'shop all', hash: shopHash(params.get('department')) }
          : null,
    };
  } catch {
    return null;
  }
}

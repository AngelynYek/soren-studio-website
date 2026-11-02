import { collections } from '../data/collections.js';
import { informationPageKey } from '../information/pages.js';
import { cleanSearchQuery } from '../search/search.js';
import { normalizeShopFilter } from '../shop/shop.js';
import { parseProductRoute } from './productRoutes.js';

export function parseRoute(url) {
  const [rawPath, query] = url.split('?');
  const path = rawPath.replace(/(?<=.)\/+$/, '');
  const params = new URLSearchParams(query);
  if (path === '/cart') return { page: 'cart', cancelled: params.get('cancelled') === '1' };
  if (path === '/checkout/success') return { page: 'receipt', orderId: params.get('order') ?? '' };
  if (path === '/checkout') return { page: 'checkout' };
  if (path === '/account') return { page: 'account', mode: 'sign-in' };
  if (path === '/account/create') return { page: 'account', mode: 'create' };
  if (path === '/search') return { page: 'search', query: cleanSearchQuery(params.get('q')) };
  if (path === '/shop-all')
    return { page: 'shop', filter: normalizeShopFilter(params.get('department')) };
  const pageKey = informationPageKey(path);
  if (pageKey) return { page: 'information', pageKey };
  const productRoute = parseProductRoute(path, params);
  if (productRoute) return productRoute;
  const collectionRoute = Object.keys(collections).find((key) => collections[key].path === path);
  if (collectionRoute) return { page: collectionRoute };
  return { page: 'home', unknown: path !== '/' };
}

// Links shared before the move to real URLs put the route after a #.
export function legacyHashUrl({ pathname, hash }) {
  if (pathname !== '/' || !hash) return null;
  const url = `/${hash.slice(1)}`;
  return parseRoute(url).page === 'home' ? null : url;
}

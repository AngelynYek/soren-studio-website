import { collections } from '../data/collections.js';
import { informationPages } from '../information/pages.js';
import { productPath } from '../navigation/productRoutes.js';

export const SITE_URL = 'https://soren-studio-website.vercel.app';

// index.html repeats this record so the homepage is complete before JavaScript runs.
export const homeMeta = {
  title: 'Soren Studio — Modern essentials',
  description:
    'Shop Soren Studio for timeless men’s and women’s clothing and accessories in soft neutrals, from the new autumn collection to everyday basics.',
};

const shopMeta = {
  all: {
    title: 'Shop all',
    description:
      'Browse the complete Soren Studio catalog of men’s and women’s clothing and accessories, all in one timeless wardrobe.',
  },
  men: {
    title: 'Shop all men’s clothing',
    description:
      'Browse every men’s piece at Soren Studio, from tailored trousers and overshirts to shirts, tees and knitwear.',
  },
  women: {
    title: 'Shop all women’s clothing',
    description:
      'Browse every women’s piece at Soren Studio, from midi dresses and skirts to blouses, knitwear and outerwear.',
  },
  accessories: {
    title: 'Shop all accessories',
    description:
      'Browse every Soren Studio accessory, from bags and belts to sunglasses, hats, scarves and jewellery.',
  },
};

const accountMeta = {
  'sign-in': {
    title: 'Your account',
    description: 'Sign in to your Soren Studio profile or view your account details.',
  },
  create: {
    title: 'Create an account',
    description: 'Create a Soren Studio profile to keep your details together in this browser.',
  },
};

const utilityMeta = {
  cart: {
    title: 'Shopping bag',
    description:
      'Review the pieces in your Soren Studio shopping bag, adjust quantities and continue to checkout.',
  },
  checkout: {
    title: 'Checkout',
    description:
      'Add your contact and delivery details to complete your Soren Studio order with a sample payment method.',
  },
  receipt: {
    title: 'Order confirmation',
    description: 'View the confirmation and details of your latest Soren Studio order.',
  },
};

const searchDescription =
  'Search the Soren Studio catalog by product name, clothing type or other details to find your next favourite piece.';

const withSiteName = ({ title, description }) => ({
  title: `${title} — Soren Studio`,
  description,
});
const indexed = (meta, path) => ({ ...withSiteName(meta), canonical: `${SITE_URL}${path}` });
const unindexed = (meta) => ({ ...withSiteName(meta), noindex: true });

export function getPageMeta(route, product = null) {
  switch (route.page) {
    case 'information': {
      const { title, metaDescription, path } = informationPages[route.pageKey];
      return indexed({ title, description: metaDescription }, path);
    }
    case 'shop':
      // Filtered views share the complete list's canonical address.
      return indexed(shopMeta[route.filter], '/shop-all');
    case 'search':
      return unindexed({
        title: route.query ? `Search results for “${route.query}”` : 'Search',
        description: searchDescription,
      });
    case 'account':
      return unindexed(accountMeta[route.mode]);
    case 'cart':
    case 'checkout':
    case 'receipt':
      return unindexed(utilityMeta[route.page]);
  }
  if (product)
    return indexed(
      { title: product.name, description: product.description },
      productPath(product.slug),
    );
  const collection = collections[route.page];
  if (collection)
    return indexed(
      { title: collection.title, description: collection.metaDescription },
      collection.path,
    );
  if (route.page === 'product' || route.unknown)
    return unindexed({
      title: 'Page not found',
      description: 'This Soren Studio page may have moved, or the link may be out of date.',
    });
  return { ...homeMeta, canonical: `${SITE_URL}/` };
}

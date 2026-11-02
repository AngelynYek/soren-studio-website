import React, { useEffect, useState } from 'react';
import './style.css';
import { productBySlug, productsByGroup } from './data/products';
import { collections } from './data/collections';
import ProductPage from './product/ProductPage';
import CartPage from './cart/CartPage';
import CheckoutPage from './cart/CheckoutPage';
import CheckoutResult from './cart/CheckoutResult';
import AccountPage from './account/AccountPage';
import HomePage from './home/HomePage';
import Header from './layout/Header';
import Footer from './layout/Footer';
import BackToTop from './layout/BackToTop';
import SearchPage from './search/SearchPage';
import CollectionPage from './shop/CollectionPage';
import ShopAllPage from './shop/ShopAllPage';
import { followInternalLink } from './navigation/navigate';
import { legacyHashUrl, parseRoute } from './navigation/routes';
import InformationPage from './information/InformationPage';
import NotFoundPage from './information/NotFoundPage';
import { getPageMeta } from './seo/pageMeta';

const utilityPages = new Set([
  'cart',
  'checkout',
  'receipt',
  'account',
  'search',
  'shop',
  'information',
]);

export default function App() {
  const getCurrentRoute = () => {
    const legacyUrl = legacyHashUrl(window.location);
    if (legacyUrl) window.history.replaceState(null, '', legacyUrl);
    return parseRoute(window.location.pathname + window.location.search);
  };
  const [route, setRoute] = useState(getCurrentRoute);
  useEffect(() => {
    const syncRoute = () => {
      const nextRoute = getCurrentRoute();
      setRoute(nextRoute);
      if (utilityPages.has(nextRoute.page)) window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', syncRoute);
    document.addEventListener('click', followInternalLink);
    return () => {
      window.removeEventListener('popstate', syncRoute);
      document.removeEventListener('click', followInternalLink);
    };
  }, []);
  const selectedProduct = route.page === 'product' ? productBySlug(route.productSlug) : null;
  const notFound = route.unknown || (route.page === 'product' && !selectedProduct);
  const renderPage = () => {
    if (notFound) return <NotFoundPage />;
    switch (route.page) {
      case 'home':
        return <HomePage />;
      case 'product':
        return (
          <ProductPage
            key={selectedProduct.slug}
            item={selectedProduct}
            returnTo={route.returnTo}
          />
        );
      case 'information':
        return <InformationPage key={route.pageKey} pageKey={route.pageKey} />;
      case 'shop':
        return <ShopAllPage filter={route.filter} />;
      case 'search':
        return <SearchPage key={route.query} query={route.query} />;
      case 'account':
        return <AccountPage key={route.mode} mode={route.mode} />;
      case 'cart':
        return <CartPage cancelled={route.cancelled} />;
      case 'checkout':
        return <CheckoutPage />;
      case 'receipt':
        return <CheckoutResult orderId={route.orderId} />;
      default: {
        const collection = collections[route.page];
        return <CollectionPage items={productsByGroup(collection.group)} {...collection} />;
      }
    }
  };
  const meta = getPageMeta(route, selectedProduct);
  return (
    <>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {meta.canonical && <link rel="canonical" href={meta.canonical} />}
      {meta.noindex && <meta name="robots" content="noindex" />}
      <div id="top">
        <Header />
        {renderPage()}
        <Footer />
        {(notFound || route.page !== 'home') && <BackToTop />}
      </div>
    </>
  );
}

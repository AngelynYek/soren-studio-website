import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Search,
  UserRound,
  ShoppingBag,
  Menu,
  X,
  Instagram,
  Facebook,
  ArrowRight,
  ArrowUp,
} from 'lucide-react';
import './style.css';
import { featuredProductsByGroup, productBySlug, productsByGroup } from './data/products';
import { collections } from './data/collections';
import SizeGuide from './components/SizeGuide';
import ProductPrice from './components/ProductPrice';
import { CartProvider, useCart } from './cart/CartProvider';
import CartPage from './cart/CartPage';
import CheckoutPage from './cart/CheckoutPage';
import CheckoutResult from './cart/CheckoutResult';
import { AccountProvider, useAccount } from './account/AccountProvider';
import AccountPage from './account/AccountPage';
import ProductGrid from './components/ProductGrid';
import SearchPage from './search/SearchPage';
import { cleanSearchQuery } from './search/search';
import ShopAllPage from './shop/ShopAllPage';
import { normalizeShopFilter } from './shop/shop';
import { parseProductRoute, productHash } from './navigation/productRoutes';
import InformationPage from './information/InformationPage';
import { CONTACT_EMAIL, informationPages, informationPageKey } from './information/pages';

const photo = (id, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const offers = featuredProductsByGroup('offers');
const icons = featuredProductsByGroup('icons');
const utilityPages = new Set([
  'cart',
  'checkout',
  'receipt',
  'account',
  'search',
  'shop',
  'information',
]);

function Header({ bagCount, onShowCollection, onShowHome }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { profile } = useAccount();
  const openSearch = () => {
    setMenuOpen(false);
    window.location.hash = 'search';
    window.scrollTo(0, 0);
  };
  const openAccount = () => {
    setMenuOpen(false);
    window.location.hash = 'account';
    window.scrollTo(0, 0);
  };
  const openBag = () => {
    setMenuOpen(false);
    window.location.hash = 'cart';
    window.scrollTo(0, 0);
  };
  const openCollection = (key) => {
    setMenuOpen(false);
    onShowCollection(key);
  };
  return (
    <>
      <div className="announcement">10% discount when subscribing to our newsletter</div>
      <header className="header">
        <button
          className="icon-button mobile-menu"
          aria-label="Open menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={`nav nav-left ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          {Object.entries(collections)
            .filter(([, collection]) => collection.navLabel)
            .map(([key, collection]) => (
              <button
                key={key}
                type="button"
                className="navigation-button nav-link"
                onClick={() => openCollection(key)}
              >
                {collection.navLabel}
              </button>
            ))}
        </nav>
        <button
          type="button"
          className="wordmark wordmark-button"
          onClick={onShowHome}
          aria-label="Soren Studio home"
        >
          SOREN
        </button>
        <div className="header-actions">
          <button
            type="button"
            className="icon-button search-button"
            aria-label="Search"
            onClick={openSearch}
          >
            <Search />
          </button>
          <button
            type="button"
            className={`icon-button account-button${profile ? ' account-signed-in' : ''}`}
            aria-label={profile ? `Account, ${profile.name}` : 'Account'}
            onClick={openAccount}
          >
            <UserRound />
          </button>
          <button
            className="icon-button bag-button"
            onClick={openBag}
            aria-label={`Shopping bag, ${bagCount} items`}
          >
            <ShoppingBag />
            {bagCount > 0 && <span className="bag-count">{bagCount}</span>}
          </button>
        </div>
      </header>
    </>
  );
}

function Hero({ onShowNewCollection }) {
  return (
    <section
      className="hero"
      id="new"
      style={{ '--hero-image': `url("${photo('photo-1539109136881-3be0616acf4b', 1800)}")` }}
    >
      <div className="hero-copy">
        <p className="eyebrow light">The new season · 2026</p>
        <h1>
          New autumn
          <br />
          collection
        </h1>
        <p>Timeless silhouettes for cooler days.</p>
        <button type="button" className="button button-light" onClick={onShowNewCollection}>
          Discover the edit <ArrowRight size={14} />
        </button>
      </div>
      <span className="image-credit">Quiet mornings. Longer walks.</span>
    </section>
  );
}

function ProductSection({ title, items, id, onShowProduct, onViewAll, label, compact = false }) {
  return (
    <section className={`product-section ${compact ? 'compact' : ''}`} id={id}>
      <div className="section-heading">
        <p className="eyebrow">Curated for you</p>
        <h2>{title}</h2>
        {onViewAll && (
          <button
            type="button"
            className="section-heading-link"
            onClick={onViewAll}
            aria-label={`View all ${title.toLowerCase()}`}
          >
            View all <ArrowRight size={13} />
          </button>
        )}
      </div>
      <ProductGrid items={items} onShowProduct={onShowProduct} label={label} compact={compact} />
    </section>
  );
}

function EssentialsBanner({ onShowBasics }) {
  return (
    <section
      className="essentials-banner"
      id="essentials"
      style={{ '--essentials-image': `url("${photo('photo-1483985988355-763728e1935b', 1700)}")` }}
    >
      <div className="essentials-copy">
        <p className="eyebrow">Pieces to keep</p>
        <h2>
          Timeless
          <br />
          basics
        </h2>
        <p>Good clothes, made to be lived in.</p>
        <button type="button" className="button button-dark" onClick={onShowBasics}>
          Shop the essentials <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
}

function SignupBanner() {
  return (
    <section className="signup-banner">
      <div className="signup-copy">
        <p className="eyebrow">A little something from us</p>
        <h2>Unlock 10% off your first order</h2>
        <p>
          Enjoy 10% off your first purchase, alongside early access to capsule drops and private
          curation.
        </p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.currentTarget.reset();
            alert('Thanks for joining the Soren Studio list!');
          }}
        >
          <label className="visually-hidden" htmlFor="email">
            Your email address
          </label>
          <input id="email" type="email" placeholder="Your email address" required />
          <button type="submit" aria-label="Subscribe">
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
      <div className="signup-image" role="img" aria-label="Neutral garments on a rail" />
    </section>
  );
}

function Footer({ onShowNewCollection, onShowHome }) {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <button type="button" className="wordmark wordmark-button" onClick={onShowHome}>
          SOREN
        </button>
        <p>
          Timeless silhouettes and considered essentials crafted for the modern wardrobe. Designed
          to endure beyond seasons.
        </p>
        <div className="socials">
          <a href="#instagram" aria-label="Instagram">
            <Instagram size={16} />
          </a>
          <a href="#facebook" aria-label="Facebook">
            <Facebook size={15} />
          </a>
        </div>
      </div>
      <div className="footer-column">
        <h3>Explore</h3>
        <button
          type="button"
          className="navigation-button footer-link"
          onClick={onShowNewCollection}
        >
          New arrivals
        </button>
        <a href="#shop-all">Shop all</a>
        <a href={informationPages.story.hash}>{informationPages.story.title}</a>
      </div>
      <div className="footer-column">
        <h3>Client care</h3>
        {['shipping', 'faq', 'contact'].map((key) => (
          <a key={key} href={informationPages[key].hash}>
            {informationPages[key].title}
          </a>
        ))}
      </div>
      <div className="footer-column">
        <h3>Find us</h3>
        <p>
          Monday – Friday
          <br />
          9am – 5pm EST
        </p>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </div>
      <div className="footer-bottom">
        <span>© 2025 Soren Studio. All rights reserved.</span>
        <span>Made with intention.</span>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const updateBackToTop = () => setShowBackToTop(window.scrollY > 360);
    updateBackToTop();
    window.addEventListener('scroll', updateBackToTop, { passive: true });
    return () => window.removeEventListener('scroll', updateBackToTop);
  }, []);

  if (!showBackToTop) return null;
  return (
    <button
      className="back-to-top"
      type="button"
      aria-label="Back to top"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'instant'
            : 'smooth',
        })
      }
    >
      Back to top <ArrowUp size={14} />
    </button>
  );
}

function CollectionPage({
  bagCount,
  onShowNewCollection,
  onShowCollection,
  onShowHome,
  onShowProduct,
  items,
  eyebrow,
  title,
  description,
  label,
}) {
  return (
    <div id="top">
      <Header bagCount={bagCount} onShowCollection={onShowCollection} onShowHome={onShowHome} />
      <main className="collection-page">
        <section className="collection-listing-heading">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </section>
        <section className="collection-product-list" aria-label={`${title} products`}>
          <ProductGrid items={items} onShowProduct={onShowProduct} label={label} />
        </section>
      </main>
      <Footer onShowNewCollection={onShowNewCollection} onShowHome={onShowHome} />
      <BackToTop />
    </div>
  );
}

function ProductPage({
  item,
  bagCount,
  onShowNewCollection,
  onShowCollection,
  onShowHome,
  onAdd,
  returnTo,
}) {
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);
  const [addError, setAddError] = useState('');
  const hasSizes = item.sizes.length > 0;
  const addItem = () => {
    if (hasSizes && !selectedSize) return;
    const error = onAdd(item, selectedSize);
    setAddError(error);
    setAdded(!error);
  };

  const collection = collections[item.group];
  const goBack = () => {
    if (returnTo) {
      window.location.hash = returnTo.hash;
      window.scrollTo(0, 0);
    } else if (collection) {
      onShowCollection(item.group);
    } else {
      onShowHome();
    }
  };
  const backLabel = returnTo?.label ?? collection?.backLabel ?? 'home';
  const collectionLabel = collection ? collection.title : `Soren Studio · ${item.category}`;
  const addToBagLabel = added
    ? hasSizes
      ? `Added · ${selectedSize}`
      : 'Added to bag'
    : hasSizes
      ? selectedSize
        ? `Add size ${selectedSize} to bag`
        : 'Choose a size'
      : 'Add to bag';
  return (
    <div id="top">
      <Header bagCount={bagCount} onShowCollection={onShowCollection} onShowHome={onShowHome} />
      <main className="product-page">
        <button type="button" className="product-back" onClick={goBack}>
          ← Back to {backLabel}
        </button>
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={item.image} alt={item.name} />
          </div>
          <section className="product-detail-copy">
            <p className="eyebrow">{collectionLabel}</p>
            <h1>{item.name}</h1>
            <p className="product-price">
              <ProductPrice price={item.price} wasPrice={item.wasPrice} />
            </p>
            <p className="product-description">{item.description}</p>
            <dl className="product-specs">
              {item.material && (
                <div>
                  <dt>Fabric</dt>
                  <dd>{item.material}</dd>
                </div>
              )}
              <div>
                <dt>{item.fitLabel ?? 'Fit'}</dt>
                <dd>{item.fit}</dd>
              </div>
            </dl>
            {hasSizes && (
              <div className="size-picker-heading">
                <fieldset className="size-picker">
                  <legend>
                    Choose your size <span>{selectedSize && `· ${selectedSize}`}</span>
                  </legend>
                  <div>
                    {item.sizes.map((size) => (
                      <button
                        type="button"
                        key={size}
                        className={selectedSize === size ? 'selected' : ''}
                        aria-pressed={selectedSize === size}
                        onClick={() => {
                          setSelectedSize(size);
                          setAdded(false);
                          setAddError('');
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <SizeGuide product={item} selectedSize={selectedSize} />
              </div>
            )}
            <button
              type="button"
              className="button button-dark add-to-bag"
              disabled={hasSizes && !selectedSize}
              onClick={addItem}
            >
              {addToBagLabel}
            </button>
            {addError && (
              <p className="cart-error" role="alert">
                {addError}
              </p>
            )}
            {added && (
              <p className="bag-confirmation" role="status">
                Added to your bag.{' '}
                <a className="view-bag" href="#cart">
                  View bag & checkout →
                </a>
              </p>
            )}
          </section>
        </div>
      </main>
      <Footer onShowNewCollection={onShowNewCollection} onShowHome={onShowHome} />
      <BackToTop />
    </div>
  );
}

function App() {
  const { count: bagCount, add: addToBag } = useCart();
  const getCurrentRoute = () => {
    const hash = window.location.hash;
    const [path, query] = hash.split('?');
    const params = new URLSearchParams(query);
    if (path === '#cart') return { page: 'cart', cancelled: params.get('cancelled') === '1' };
    if (path === '#checkout/success')
      return { page: 'receipt', orderId: params.get('order') ?? '' };
    if (path === '#checkout') return { page: 'checkout' };
    if (path === '#account') return { page: 'account', mode: 'sign-in' };
    if (path === '#account/create') return { page: 'account', mode: 'create' };
    if (path === '#search') return { page: 'search', query: cleanSearchQuery(params.get('q')) };
    if (path === '#shop-all')
      return { page: 'shop', filter: normalizeShopFilter(params.get('department')) };
    const pageKey = informationPageKey(path);
    if (pageKey) return { page: 'information', pageKey };
    const productRoute = parseProductRoute(path, params);
    if (productRoute) return productRoute;
    const collectionRoute = Object.keys(collections).find(
      (key) => collections[key].hash === window.location.hash,
    );
    if (collectionRoute) return { page: collectionRoute };
    return { page: 'home' };
  };
  const [route, setRoute] = useState(getCurrentRoute);
  useEffect(() => {
    const syncRoute = () => {
      const nextRoute = getCurrentRoute();
      setRoute(nextRoute);
      if (utilityPages.has(nextRoute.page)) window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);
  const showCollection = (key) => {
    window.location.hash = collections[key].hash;
    window.scrollTo(0, 0);
  };
  const showNewCollection = () => showCollection('autumn');
  const showHome = () => {
    window.location.hash = '';
    window.scrollTo(0, 0);
  };
  const showProduct = (slug, shopFilter) => {
    window.location.hash = productHash(slug, shopFilter);
    window.scrollTo(0, 0);
  };
  const renderUtilityPage = () => {
    switch (route.page) {
      case 'information':
        return <InformationPage key={route.pageKey} pageKey={route.pageKey} />;
      case 'shop':
        return <ShopAllPage filter={route.filter} onShowProduct={showProduct} />;
      case 'search':
        return <SearchPage key={route.query} query={route.query} onShowProduct={showProduct} />;
      case 'account':
        return <AccountPage key={route.mode} mode={route.mode} />;
      case 'cart':
        return (
          <CartPage onShowHome={showHome} onShowProduct={showProduct} cancelled={route.cancelled} />
        );
      case 'checkout':
        return <CheckoutPage />;
      case 'receipt':
        return <CheckoutResult orderId={route.orderId} onShowHome={showHome} />;
      default:
        return null;
    }
  };
  if (utilityPages.has(route.page))
    return (
      <div id="top">
        <Header bagCount={bagCount} onShowCollection={showCollection} onShowHome={showHome} />
        {renderUtilityPage()}
        <Footer onShowNewCollection={showNewCollection} onShowHome={showHome} />
        <BackToTop />
      </div>
    );
  const selectedProduct = route.page === 'product' ? productBySlug(route.productSlug) : null;
  if (selectedProduct)
    return (
      <ProductPage
        key={selectedProduct.slug}
        item={selectedProduct}
        returnTo={route.returnTo}
        bagCount={bagCount}
        onShowNewCollection={showNewCollection}
        onShowCollection={showCollection}
        onShowHome={showHome}
        onAdd={addToBag}
      />
    );
  const collection = collections[route.page];
  if (collection)
    return (
      <CollectionPage
        bagCount={bagCount}
        onShowNewCollection={showNewCollection}
        onShowCollection={showCollection}
        onShowHome={showHome}
        onShowProduct={showProduct}
        items={productsByGroup(collection.group)}
        {...collection}
      />
    );
  return (
    <div id="top">
      <Header bagCount={bagCount} onShowCollection={showCollection} onShowHome={showHome} />
      <main>
        <Hero onShowNewCollection={showNewCollection} />
        <ProductSection
          title="Exclusive offers"
          items={offers}
          id="offers"
          onShowProduct={showProduct}
          onViewAll={() => showCollection('offers')}
          label={collections.offers.label}
          compact
        />
        <EssentialsBanner onShowBasics={() => showCollection('basics')} />
        <ProductSection
          title="Iconic pieces"
          items={icons}
          id="icons"
          onShowProduct={showProduct}
          onViewAll={() => showCollection('icons')}
          label={collections.icons.label}
        />
        <SignupBanner />
      </main>
      <Footer onShowNewCollection={showNewCollection} onShowHome={showHome} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AccountProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AccountProvider>
  </React.StrictMode>,
);

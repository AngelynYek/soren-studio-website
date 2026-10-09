import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, UserRound, ShoppingBag, Menu, X, Instagram, Facebook, ArrowRight, ArrowUp } from 'lucide-react';
import './style.css';
import { productBySlug, productsByGroup } from './data/products';
import { collections } from './data/collections';
import SizeGuide from './components/SizeGuide';

const photo = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const offers = productsByGroup('offers');
const icons = productsByGroup('icons');


function Header({ bagCount, onShowCollection, onShowHome }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const openCollection = (key) => {
    setMenuOpen(false);
    onShowCollection(key);
  };
  return <>
    <div className="announcement">10% discount when subscribing to our newsletter</div>
    <header className="header">
      <button className="icon-button mobile-menu" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      <nav className={`nav nav-left ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
        {Object.entries(collections).map(([key, collection]) => (
          <button key={key} type="button" className="navigation-button nav-link" onClick={() => openCollection(key)}>{collection.navLabel}</button>
        ))}
      </nav>
      <button type="button" className="wordmark wordmark-button" onClick={onShowHome} aria-label="Soren Studio home">SOREN</button>
      <div className="header-actions"><button className="icon-button search-button" aria-label="Search"><Search /></button><button className="icon-button account-button" aria-label="Account"><UserRound /></button><button className="icon-button bag-button" aria-label={`Shopping bag, ${bagCount} items`}><ShoppingBag />{bagCount > 0 && <span className="bag-count">{bagCount}</span>}</button></div>
    </header>
  </>;
}

function Hero({ onShowNewCollection }) {
  return <section className="hero" id="new" style={{ '--hero-image': `url("${photo('photo-1539109136881-3be0616acf4b', 1800)}")` }}>
    <div className="hero-copy"><p className="eyebrow light">The new season · 2026</p><h1>New autumn<br />collection</h1><p>Timeless silhouettes for cooler days.</p><button type="button" className="button button-light" onClick={onShowNewCollection}>Discover the edit <ArrowRight size={14} /></button></div>
    <span className="image-credit">Quiet mornings. Longer walks.</span>
  </section>;
}

function ProductCard({ item, onShowProduct, label = 'Soren edit' }) {
  return <article className="product-card"><button type="button" className="product-image" onClick={() => onShowProduct(item.slug)}><img src={item.image} alt={item.name} loading="lazy" /><span className="product-tag">{label}</span></button><div className="product-info"><div><button type="button" className="product-name" onClick={() => onShowProduct(item.slug)}>{item.name}</button><p>{item.price}{item.wasPrice && <> <del>{item.wasPrice}</del></>}</p></div></div></article>;
}

function ProductGrid({ items, onShowProduct, label, compact = false }) {
  return <div className={`product-grid ${compact ? 'three-up' : ''}`}>{items.map((item) => <ProductCard key={item.slug} item={item} onShowProduct={onShowProduct} label={label} />)}</div>;
}

function ProductSection({ title, items, id, onShowProduct, compact = false }) {
  return <section className={`product-section ${compact ? 'compact' : ''}`} id={id}><div className="section-heading"><p className="eyebrow">Curated for you</p><h2>{title}</h2><button type="button" className="section-heading-link">View all <ArrowRight size={13} /></button></div><ProductGrid items={items} onShowProduct={onShowProduct} compact={compact} /></section>;
}

function EssentialsBanner() {
  return <section className="essentials-banner" id="essentials" style={{ '--essentials-image': `url("${photo('photo-1483985988355-763728e1935b', 1700)}")` }}><div className="essentials-copy"><p className="eyebrow">Pieces to keep</p><h2>Timeless<br />basics</h2><p>Good clothes, made to be lived in.</p><button type="button" className="button button-dark">Shop the essentials <ArrowRight size={14} /></button></div></section>;
}

function SignupBanner() {
  return <section className="signup-banner"><div className="signup-copy"><p className="eyebrow">A little something from us</p><h2>Unlock 10% off your first order</h2><p>Enjoy 10% off your first purchase, alongside early access to capsule drops and private curation.</p><form onSubmit={(event) => { event.preventDefault(); event.currentTarget.reset(); alert('Thanks for joining the Soren Studio list!'); }}><label className="visually-hidden" htmlFor="email">Your email address</label><input id="email" type="email" placeholder="Your email address" required /><button type="submit" aria-label="Subscribe"><ArrowRight size={16} /></button></form><small>By subscribing, you agree to our Privacy Policy.</small></div><div className="signup-image" role="img" aria-label="Neutral garments on a rail" /></section>;
}

function Footer({ onShowNewCollection, onShowHome }) {
  return <footer className="footer"><div className="footer-brand"><button type="button" className="wordmark wordmark-button" onClick={onShowHome}>SOREN</button><p>Timeless silhouettes and considered essentials crafted for the modern wardrobe. Designed to endure beyond seasons.</p><div className="socials"><a href="#instagram" aria-label="Instagram"><Instagram size={16} /></a><a href="#facebook" aria-label="Facebook"><Facebook size={15} /></a></div></div><div className="footer-column"><h3>Explore</h3><button type="button" className="navigation-button footer-link" onClick={onShowNewCollection}>New arrivals</button><a href="#offers">Shop all</a><a href="#essentials">Our story</a></div><div className="footer-column"><h3>Client care</h3><a href="#shipping">Shipping & returns</a><a href="#faq">FAQs</a><a href="#contact">Contact us</a></div><div className="footer-column"><h3>Find us</h3><p>Monday – Friday<br />9am – 5pm EST</p><a href="mailto:hello@soren.studio">hello@soren.studio</a></div><div className="footer-bottom"><span>© 2025 Soren Studio. All rights reserved.</span><div><a href="#privacy">Privacy</a><a href="#terms">Terms</a></div><span>Made with intention.</span></div></footer>;
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
  return <button className="back-to-top" type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}>Back to top <ArrowUp size={14} /></button>;
}

function CollectionPage({ bagCount, onShowNewCollection, onShowCollection, onShowHome, onShowProduct, items, eyebrow, title, description, label }) {

  return <div id="top"><Header bagCount={bagCount} onShowCollection={onShowCollection} onShowHome={onShowHome} /><main className="collection-page"><section className="collection-listing-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></section><section className="collection-product-list" aria-label={`${title} products`}><ProductGrid items={items} onShowProduct={onShowProduct} label={label} /></section></main><Footer onShowNewCollection={onShowNewCollection} onShowHome={onShowHome} /><BackToTop /></div>;
}

function ProductPage({ item, bagCount, onShowNewCollection, onShowCollection, onShowHome, onAdd }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);
  const hasSizes = item.sizes.length > 0;
  const addItem = () => {
    if (hasSizes && !selectedSize) return;
    onAdd();
    setAdded(true);
  };

  const collection = collections[item.group];
  const returnToCollection = collection ? () => onShowCollection(item.group) : onShowHome;
  const backLabel = collection?.backLabel ?? 'home';
  const collectionLabel = collection ? collection.title : `Soren Studio · ${item.category}`;
  const addToBagLabel = added ? hasSizes ? `Added · ${selectedSize}` : 'Added to bag' : hasSizes ? selectedSize ? `Add size ${selectedSize} to bag` : 'Choose a size' : 'Add to bag';
  return <div id="top">
    <Header bagCount={bagCount} onShowCollection={onShowCollection} onShowHome={onShowHome} />
    <main className="product-page">
      <button type="button" className="product-back" onClick={returnToCollection}>← Back to {backLabel}</button>
      <div className="product-detail">
        <div className="product-detail-image"><img src={item.image} alt={item.name} /></div>
        <section className="product-detail-copy">
          <p className="eyebrow">{collectionLabel}</p>
          <h1>{item.name}</h1>
          <p className="product-price">{item.price}</p>
          <p className="product-description">{item.description}</p>
          <dl className="product-specs">
            {item.material && <div><dt>Fabric</dt><dd>{item.material}</dd></div>}
            <div><dt>{item.fitLabel ?? 'Fit'}</dt><dd>{item.fit}</dd></div>
          </dl>
          {hasSizes && <div className="size-picker-heading">
            <fieldset className="size-picker">
              <legend>Choose your size <span>{selectedSize && `· ${selectedSize}`}</span></legend>
              <div>{item.sizes.map((size) => (
                <button type="button" key={size} className={selectedSize === size ? 'selected' : ''} aria-pressed={selectedSize === size}
                  onClick={() => { setSelectedSize(size); setAdded(false); }}>
                  {size}
                </button>
              ))}</div>
            </fieldset>
            <SizeGuide product={item} selectedSize={selectedSize} />
          </div>}
          <button type="button" className="button button-dark add-to-bag" disabled={hasSizes && !selectedSize} onClick={addItem}>{addToBagLabel}</button>
          {added && <p className="bag-confirmation" role="status">Added to your bag.</p>}
        </section>
      </div>
    </main>
    <Footer onShowNewCollection={onShowNewCollection} onShowHome={onShowHome} />
    <BackToTop />
  </div>;
}

function App() {
  const [bagCount, setBagCount] = useState(0);
  const getCurrentRoute = () => {
    const productSlug = window.location.hash.match(/^#product\/(.+)$/)?.[1];
    if (productSlug) return { page: 'product', productSlug };
    const collectionRoute = Object.keys(collections).find((key) => collections[key].hash === window.location.hash);
    if (collectionRoute) return { page: collectionRoute };
    return { page: 'home' };
  };
  const [route, setRoute] = useState(getCurrentRoute);
  useEffect(() => {
    const syncRoute = () => setRoute(getCurrentRoute());
    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);
  const showCollection = (key) => {
    window.location.hash = collections[key].hash;
    window.scrollTo(0, 0);
  };
  const showNewCollection = () => showCollection('autumn');
  const showHome = () => { window.location.hash = ''; window.scrollTo(0, 0); };
  const showProduct = (slug) => { window.location.hash = `product/${slug}`; window.scrollTo(0, 0); };
  const addToBag = () => setBagCount((count) => count + 1);
  const selectedProduct = route.page === 'product' ? productBySlug(route.productSlug) : null;
  if (selectedProduct) return <ProductPage key={selectedProduct.slug} item={selectedProduct} bagCount={bagCount} onShowNewCollection={showNewCollection} onShowCollection={showCollection} onShowHome={showHome} onAdd={addToBag} />;
  const collection = collections[route.page];
  if (collection) return <CollectionPage bagCount={bagCount} onShowNewCollection={showNewCollection} onShowCollection={showCollection} onShowHome={showHome} onShowProduct={showProduct} items={productsByGroup(collection.group)} {...collection} />;
  return <div id="top"><Header bagCount={bagCount} onShowCollection={showCollection} onShowHome={showHome} /><main><Hero onShowNewCollection={showNewCollection} /><ProductSection title="Exclusive offers" items={offers} id="offers" onShowProduct={showProduct} compact /><EssentialsBanner /><ProductSection title="Iconic pieces" items={icons} id="icons" onShowProduct={showProduct} /><SignupBanner /></main><Footer onShowNewCollection={showNewCollection} onShowHome={showHome} /></div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);

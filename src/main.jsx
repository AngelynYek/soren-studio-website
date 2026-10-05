import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, UserRound, ShoppingBag, Menu, X, Instagram, Facebook, ArrowRight } from 'lucide-react';
import './style.css';
import offerBag from './images/The Under-the-Radar Handbag Fashion People and Editors Can\'t Stop Carrying.jpg';
import offerDress from './images/Drei Master.jpg';
import offerSkirt from './images/Gonna Midi in Raso - VariationMaster _ Atelier Emé.jpg';
import iconDress from './images/Black dress.jpeg';
import iconTrench from './images/Trench.jpg';
import iconTrouser from './images/pleatedpants.jpg';
import iconKnit from './images/vneck.jpg';
import iconSkirt from './images/LorettaSkirt.jpg';
import iconCoat from './images/woolovercoat.jpg';

const photo = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const offers = [
  { name: 'Soren Minimalist Hobo Bag', price: 'RM 64', wasPrice: 'RM 80', image: offerBag },
  { name: 'Freja Two-Tone Ribbed Sweater Dress', price: 'RM 108', wasPrice: 'RM 135', image: offerDress },
  { name: 'Sienna Flared Midi Skirt', price: 'RM 96', wasPrice: 'RM 120', image: offerSkirt },
];
const icons = [
  { name: 'The Noir Fold', price: 'RM140', image: iconDress },
  { name: 'Elias Minimalist Trench Coat', price: 'RM157', image: iconTrench },
  { name: 'Kaya Pleated Wide-Leg Trouser', price: 'RM118', image: iconTrouser },
  { name: 'The Half-Zip Cable Knit', price: 'RM76', image: iconKnit },
  { name: 'Loretta Tailored Midi Pencil Skirt', price: 'RM88', image: iconSkirt },
  { name: 'Espresso Oversized Longline Coat ', price: 'RM190', image: iconCoat },
];

function Header({ bagCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <>
    <div className="announcement">10% discount when subscribing to our newsletter</div>
    <header className="header">
      <button className="icon-button mobile-menu" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      <nav className={`nav nav-left ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
        <a href="#new" onClick={() => setMenuOpen(false)}>New</a><span className="nav-static">Men</span><span className="nav-static">Women</span><span className="nav-static">Accessories</span>
      </nav>
      <a className="wordmark" href="#top" aria-label="Soren Studio home">SOREN</a>
      <div className="header-actions"><button className="icon-button search-button" aria-label="Search"><Search /></button><button className="icon-button account-button" aria-label="Account"><UserRound /></button><button className="icon-button bag-button" aria-label={`Shopping bag, ${bagCount} items`}><ShoppingBag />{bagCount > 0 && <span className="bag-count">{bagCount}</span>}</button></div>
    </header>
  </>;
}

function Hero() {
  return <section className="hero" id="new" style={{ '--hero-image': `url("${photo('photo-1539109136881-3be0616acf4b', 1800)}")` }}>
    <div className="hero-copy"><p className="eyebrow light">The new season · 2026</p><h1>New autumn<br />collection</h1><p>Timeless silhouettes for cooler days.</p><button type="button" className="button button-light">Discover the edit <ArrowRight size={14} /></button></div>
    <span className="image-credit">Quiet mornings. Longer walks.</span>
  </section>;
}

function ProductCard({ item, onAdd }) {
  return <article className="product-card"><a className="product-image" href="#essentials"><img src={item.image.startsWith('photo-') ? photo(item.image, 700) : item.image} alt={item.name} loading="lazy" /><span className="product-tag">SOREN EDIT</span></a><div className="product-info"><div><h3>{item.name}</h3><p>{item.price}{item.wasPrice && <> <del>{item.wasPrice}</del></>}</p></div><button className="quick-add" aria-label={`Add ${item.name} to bag`} onClick={onAdd}>+</button></div></article>;
}

function ProductSection({ title, items, id, onAdd, compact = false }) {
  return <section className={`product-section ${compact ? 'compact' : ''}`} id={id}><div className="section-heading"><p className="eyebrow">Curated for you</p><h2>{title}</h2><button type="button" className="section-heading-link">View all <ArrowRight size={13} /></button></div><div className={`product-grid ${compact ? 'three-up' : ''}`}>{items.map((item) => <ProductCard key={item.name} item={item} onAdd={onAdd} />)}</div></section>;
}

function EssentialsBanner() {
  return <section className="essentials-banner" id="essentials" style={{ '--essentials-image': `url("${photo('photo-1483985988355-763728e1935b', 1700)}")` }}><div className="essentials-copy"><p className="eyebrow">Pieces to keep</p><h2>Timeless<br />basics</h2><p>Good clothes, made to be lived in.</p><button type="button" className="button button-dark">Shop the essentials <ArrowRight size={14} /></button></div></section>;
}

function SignupBanner() {
  return <section className="signup-banner"><div className="signup-copy"><p className="eyebrow">A little something from us</p><h2>Unlock 10% off your first order</h2><p>Enjoy 10% off your first purchase, alongside early access to capsule drops and private curation.</p><form onSubmit={(event) => { event.preventDefault(); event.currentTarget.reset(); alert('Thanks for joining the Soren Studio list!'); }}><label className="visually-hidden" htmlFor="email">Your email address</label><input id="email" type="email" placeholder="Your email address" required /><button type="submit" aria-label="Subscribe"><ArrowRight size={16} /></button></form><small>By subscribing, you agree to our Privacy Policy.</small></div><div className="signup-image" role="img" aria-label="Neutral garments on a rail" /></section>;
}

function Footer() {
  return <footer className="footer"><div className="footer-brand"><a className="wordmark" href="#top">SOREN</a><p>Timeless silhouettes and considered essentials crafted for the modern wardrobe. Designed to endure beyond seasons.</p><div className="socials"><a href="#instagram" aria-label="Instagram"><Instagram size={16} /></a><a href="#facebook" aria-label="Facebook"><Facebook size={15} /></a></div></div><div className="footer-column"><h3>Explore</h3><a href="#new">New arrivals</a><a href="#offers">Shop all</a><a href="#essentials">Our story</a></div><div className="footer-column"><h3>Client care</h3><a href="#shipping">Shipping & returns</a><a href="#faq">FAQs</a><a href="#contact">Contact us</a></div><div className="footer-column"><h3>Find us</h3><p>Monday – Friday<br />9am – 5pm EST</p><a href="mailto:hello@soren.studio">hello@soren.studio</a></div><div className="footer-bottom"><span>© 2025 Soren Studio. All rights reserved.</span><div><a href="#privacy">Privacy</a><a href="#terms">Terms</a></div><span>Made with intention.</span></div></footer>;
}

function App() {
  const [bagCount, setBagCount] = useState(0);
  return <div id="top"><Header bagCount={bagCount} /><main><Hero /><ProductSection title="Exclusive offers" items={offers} id="offers" onAdd={() => setBagCount((count) => count + 1)} compact /><EssentialsBanner /><ProductSection title="Iconic pieces" items={icons} id="icons" onAdd={() => setBagCount((count) => count + 1)} /><SignupBanner /></main><Footer /></div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);

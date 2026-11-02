import React, { useEffect, useState } from 'react';
import { Search, UserRound, ShoppingBag, Menu, X } from 'lucide-react';
import { useAccount } from '../account/AccountProvider';
import { useCart } from '../cart/CartProvider';
import { collections } from '../data/collections';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { profile } = useAccount();
  const { count: bagCount } = useCart();
  // The header stays mounted across many pages, so every page change must close the menu.
  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener('popstate', closeMenu);
    return () => window.removeEventListener('popstate', closeMenu);
  }, []);
  return (
    <>
      <div className="announcement">10% discount when subscribing to our newsletter</div>
      <header
        className="header"
        onClick={(event) => event.target.closest('a') && setMenuOpen(false)}
      >
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
              <a key={key} className="navigation-button nav-link" href={collection.path}>
                {collection.navLabel}
              </a>
            ))}
        </nav>
        <a className="wordmark wordmark-button" href="/" aria-label="Soren Studio home">
          SOREN
        </a>
        <div className="header-actions">
          <a className="icon-button search-button" href="/search" aria-label="Search">
            <Search />
          </a>
          <a
            className={`icon-button account-button${profile ? ' account-signed-in' : ''}`}
            href="/account"
            aria-label={profile ? `Account, ${profile.name}` : 'Account'}
          >
            <UserRound />
          </a>
          <a
            className="icon-button bag-button"
            href="/cart"
            aria-label={`Shopping bag, ${bagCount} items`}
          >
            <ShoppingBag />
            {bagCount > 0 && <span className="bag-count">{bagCount}</span>}
          </a>
        </div>
      </header>
    </>
  );
}

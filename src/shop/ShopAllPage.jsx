import React, { useEffect, useMemo, useRef, useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';
import {
  SHOP_FILTERS,
  SHOP_PAGE_SIZE,
  filterShopProducts,
  getShopCounts,
  normalizeShopFilter,
  shopHash,
} from './shop';
import './shop.css';

const counts = getShopCounts(products);

function ShopResults({ items, onShowProduct }) {
  const [visibleCount, setVisibleCount] = useState(SHOP_PAGE_SIZE);
  const visibleItems = items.slice(0, visibleCount);

  if (items.length === 0) {
    return (
      <div className="shop-empty">
        <h2>No pieces in this edit yet.</h2>
        <p>Explore the full collection to find your next everyday piece.</p>
        <a className="button button-dark" href={shopHash()}>
          View all pieces
        </a>
      </div>
    );
  }

  return (
    <>
      <ProductGrid items={visibleItems} onShowProduct={onShowProduct} />
      {items.length > SHOP_PAGE_SIZE && (
        <div className="shop-pagination">
          <p role="status">
            Showing {visibleItems.length} of {items.length} pieces
          </p>
          {visibleCount < items.length && (
            <button
              type="button"
              className="button button-dark"
              onClick={() => setVisibleCount((count) => count + SHOP_PAGE_SIZE)}
            >
              Show more pieces
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default function ShopAllPage({ filter = 'all', onShowProduct }) {
  const headingRef = useRef(null);
  const activeFilter = normalizeShopFilter(filter);
  const items = useMemo(() => filterShopProducts(products, activeFilter), [activeFilter]);
  const label = SHOP_FILTERS.find((option) => option.value === activeFilter).label;
  const openProduct = (slug) => onShowProduct(slug, activeFilter);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <main className="collection-page shop-all-page" aria-labelledby="shop-title">
      <section className="collection-listing-heading">
        <p className="eyebrow">Soren Studio · The complete edit</p>
        <h1 id="shop-title" ref={headingRef} tabIndex={-1}>
          Shop all
        </h1>
        <p>Considered clothing and finishing touches, brought together in one timeless wardrobe.</p>
      </section>
      <section className="collection-product-list" aria-label="Shop all products">
        <div className="shop-toolbar">
          <fieldset className="shop-filters">
            <legend>Filter by</legend>
            <div className="shop-filter-options">
              {SHOP_FILTERS.map((option) => (
                <label className="shop-filter" key={option.value}>
                  <input
                    className="visually-hidden"
                    type="radio"
                    name="shop-department"
                    value={option.value}
                    checked={activeFilter === option.value}
                    onChange={() => {
                      window.location.hash = shopHash(option.value);
                    }}
                  />
                  <span>
                    {option.label}{' '}
                    <span className="shop-filter-count">({counts[option.value]})</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <p className="shop-result-count" role="status">
            {items.length} {items.length === 1 ? 'piece' : 'pieces'} · {label}
          </p>
        </div>
        {/* Reset pagination, but keep filter controls mounted for keyboard focus. */}
        <ShopResults key={activeFilter} items={items} onShowProduct={openProduct} />
      </section>
    </main>
  );
}

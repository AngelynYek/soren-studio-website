import React, { useEffect, useMemo, useRef } from 'react';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';
import {
  SHOP_FILTERS,
  SHOP_PAGE_SIZE,
  filterShopProducts,
  getShopCounts,
  normalizeShopFilter,
  shopPath,
} from './shop';
import './shop.css';
import { navigate } from '../navigation/navigate';
import { useVisibleCount } from '../navigation/useVisibleCount';

const counts = getShopCounts(products);

function ShopResults({ items, shopFilter }) {
  const [visibleCount, showMore] = useVisibleCount(SHOP_PAGE_SIZE);
  const visibleItems = items.slice(0, visibleCount);

  return (
    <>
      <ProductGrid items={visibleItems} shopFilter={shopFilter} />
      {items.length > SHOP_PAGE_SIZE && (
        <div className="shop-pagination">
          <p role="status">
            Showing {visibleItems.length} of {items.length} pieces
          </p>
          {visibleCount < items.length && (
            <button type="button" className="button button-dark" onClick={showMore}>
              Show more pieces
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default function ShopAllPage({ filter = 'all' }) {
  const headingRef = useRef(null);
  const activeFilter = normalizeShopFilter(filter);
  const items = useMemo(() => filterShopProducts(products, activeFilter), [activeFilter]);
  const label = SHOP_FILTERS.find((option) => option.value === activeFilter).label;

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
                      navigate(shopPath(option.value));
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
        <ShopResults key={activeFilter} items={items} shopFilter={activeFilter} />
      </section>
    </main>
  );
}

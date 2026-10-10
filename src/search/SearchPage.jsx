import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';
import { collections } from '../data/collections';
import {
  MAX_QUERY_LENGTH,
  RESULTS_PER_PAGE,
  cleanSearchQuery,
  createSearchIndex,
  searchHash,
  searchProducts,
} from './search';
import './search.css';

const searchIndex = createSearchIndex(products, collections);
const suggestedQueries = ['Knitwear', 'Dresses', 'Trousers', 'Accessories'];

function SearchSuggestions() {
  return (
    <div className="search-suggestions">
      <p>Popular searches</p>
      <ul>
        {suggestedQueries.map((query) => (
          <li key={query}>
            <a href={searchHash(query)}>{query}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SearchPage({ query = '', onShowProduct }) {
  const currentQuery = cleanSearchQuery(query);
  const [draft, setDraft] = useState(currentQuery);
  const [visibleCount, setVisibleCount] = useState(RESULTS_PER_PAGE);
  const inputRef = useRef(null);
  const results = useMemo(() => searchProducts(searchIndex, currentQuery), [currentQuery]);
  const visibleResults = results.slice(0, visibleCount);

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  const submitSearch = (event) => {
    event.preventDefault();
    const nextQuery = cleanSearchQuery(draft);
    setDraft(nextQuery);
    window.location.hash = searchHash(nextQuery);
  };

  const clearSearch = () => {
    setDraft('');
    window.location.hash = searchHash('');
    inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <main className="search-page" aria-labelledby="search-title">
      <a className="product-back" href="#">
        ← Continue shopping
      </a>
      <section className="search-heading">
        <p className="eyebrow">Soren Studio · The wardrobe edit</p>
        <h1 id="search-title">Find your next favourite.</h1>
        <p>Search our pieces by name, collection, fabric, or style.</p>
        <form
          className="search-form"
          role="search"
          aria-label="Product search"
          onSubmit={submitSearch}
        >
          <label className="visually-hidden" htmlFor="product-search">
            Search products
          </label>
          <div className="search-input-wrap">
            <input
              ref={inputRef}
              id="product-search"
              type="search"
              name="q"
              placeholder="Try knitwear, a linen shirt, or autumn…"
              autoComplete="off"
              maxLength={MAX_QUERY_LENGTH}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
            />
            {draft && (
              <button
                type="button"
                className="search-clear"
                aria-label="Clear search"
                onClick={clearSearch}
              >
                <X size={16} aria-hidden="true" />
              </button>
            )}
          </div>
          <button type="submit" className="button button-dark search-submit">
            <Search size={15} aria-hidden="true" /> Search
          </button>
        </form>
      </section>
      {currentQuery ? (
        <section className="search-results" aria-label="Search results">
          <p className="search-result-count" role="status">
            {results.length} {results.length === 1 ? 'piece' : 'pieces'} found for “{currentQuery}”
          </p>
          {results.length > 0 ? (
            <>
              <ProductGrid items={visibleResults} onShowProduct={onShowProduct} />
              {results.length > RESULTS_PER_PAGE && (
                <div className="search-pagination">
                  <p role="status">
                    Showing {visibleResults.length} of {results.length} pieces
                  </p>
                  {visibleCount < results.length && (
                    <button
                      type="button"
                      className="button button-dark"
                      onClick={() => setVisibleCount((count) => count + RESULTS_PER_PAGE)}
                    >
                      Show more pieces
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="search-empty">
              <h2>No matching pieces just yet.</h2>
              <p>Try a shorter search, check the spelling, or explore one of these categories.</p>
              <SearchSuggestions />
            </div>
          )}
        </section>
      ) : (
        <SearchSuggestions />
      )}
    </main>
  );
}

import React from 'react';
import ProductGrid from '../components/ProductGrid';

export default function CollectionPage({ items, eyebrow, title, description, label }) {
  return (
    <main className="collection-page">
      <section className="collection-listing-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
      <section className="collection-product-list" aria-label={`${title} products`}>
        <ProductGrid items={items} label={label} />
      </section>
    </main>
  );
}

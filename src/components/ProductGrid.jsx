import React from 'react';
import ProductPrice from './ProductPrice';
import { productPath } from '../navigation/productRoutes';

function ProductCard({ item, shopFilter, label = 'Soren edit' }) {
  const href = productPath(item.slug, shopFilter);
  return (
    <article className="product-card">
      <a className="product-image" href={href}>
        <img src={item.image} alt={item.imageAlt} loading="lazy" />
        <span className="product-tag">{label}</span>
      </a>
      <div className="product-info">
        <div>
          <a className="product-name" href={href}>
            {item.name}
          </a>
          <p>
            <ProductPrice price={item.price} wasPrice={item.wasPrice} />
          </p>
        </div>
      </div>
    </article>
  );
}

export default function ProductGrid({ items, shopFilter, label, compact = false }) {
  return (
    <div className={`product-grid ${compact ? 'three-up' : ''}`}>
      {items.map((item) => (
        <ProductCard key={item.slug} item={item} shopFilter={shopFilter} label={label} />
      ))}
    </div>
  );
}

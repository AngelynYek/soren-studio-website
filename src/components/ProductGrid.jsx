import React from 'react';
import ProductPrice from './ProductPrice';

function ProductCard({ item, onShowProduct, label = 'Soren edit' }) {
  return (
    <article className="product-card">
      <button type="button" className="product-image" onClick={() => onShowProduct(item.slug)}>
        <img src={item.image} alt={item.name} loading="lazy" />
        <span className="product-tag">{label}</span>
      </button>
      <div className="product-info">
        <div>
          <button type="button" className="product-name" onClick={() => onShowProduct(item.slug)}>
            {item.name}
          </button>
          <p>
            <ProductPrice price={item.price} wasPrice={item.wasPrice} />
          </p>
        </div>
      </div>
    </article>
  );
}

export default function ProductGrid({ items, onShowProduct, label, compact = false }) {
  return (
    <div className={`product-grid ${compact ? 'three-up' : ''}`}>
      {items.map((item) => (
        <ProductCard key={item.slug} item={item} onShowProduct={onShowProduct} label={label} />
      ))}
    </div>
  );
}

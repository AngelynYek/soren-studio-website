import React, { useState } from 'react';
import ProductPrice from '../components/ProductPrice';
import SizeGuide from '../components/SizeGuide';
import { useCart } from '../cart/CartProvider';
import { collections } from '../data/collections';

export default function ProductPage({ item, returnTo }) {
  const { add } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);
  const [addError, setAddError] = useState('');
  const hasSizes = item.sizes.length > 0;
  const addItem = () => {
    const error = add(item, selectedSize);
    setAddError(error);
    setAdded(!error);
  };

  const collection = collections[item.group];
  const backPath = returnTo?.path ?? collection.path;
  const backLabel = returnTo?.label ?? collection.backLabel;
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
    <main className="product-page">
      <a className="product-back" href={backPath}>
        ← Back to {backLabel}
      </a>
      <div className="product-detail">
        <div className="product-detail-image">
          <img src={item.image} alt={item.imageAlt} />
        </div>
        <section className="product-detail-copy">
          <p className="eyebrow">{collection.title}</p>
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
              <a className="view-bag" href="/cart">
                View bag & checkout →
              </a>
            </p>
          )}
        </section>
      </div>
    </main>
  );
}

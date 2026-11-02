import React from 'react';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { productBySlug } from '../data/products';
import { productPath } from '../navigation/productRoutes';
import { useCart } from './CartProvider';
import { MAX_QUANTITY, cartTotal, formatMoney, lineKey, priceInMinorUnits } from './cart';
import OrderSummary from './OrderSummary';
import './cart.css';

export default function CartPage({ cancelled }) {
  const { items, count, dispatch, storageWarning } = useCart();
  const total = cartTotal(items, productBySlug);

  return (
    <main className="cart-page">
      <p className="eyebrow">Your considered edit</p>
      <h1>
        Your bag <span>({count})</span>
      </h1>
      {cancelled && (
        <p className="cart-feedback" role="status">
          Checkout cancelled. Your bag is still here, and you can try again whenever you’re ready.
        </p>
      )}
      {storageWarning && (
        <p className="cart-feedback" role="status">
          {storageWarning}
        </p>
      )}
      {!items.length ? (
        <section className="cart-empty">
          <h2>A little room for something timeless.</h2>
          <p>
            Your bag is empty. Open a product, choose a size if needed, then select “Add to bag”.
          </p>
          <a className="button button-dark" href="/">
            Explore the collections <ArrowRight size={14} />
          </a>
        </section>
      ) : (
        <div className="cart-layout">
          <section aria-label="Bag items" className="cart-items">
            {items.map((line) => {
              const product = productBySlug(line.slug);
              const key = lineKey(line);
              return (
                <article key={key} className="cart-item">
                  <a
                    className="cart-image"
                    href={productPath(line.slug)}
                    aria-label={`View ${product.name}`}
                  >
                    <img src={product.image} alt={product.imageAlt} />
                  </a>
                  <div>
                    <a className="product-name" href={productPath(line.slug)}>
                      {product.name}
                    </a>
                    <p className="cart-size">
                      {line.size ? `Size ${line.size}` : 'One size'} ·{' '}
                      {formatMoney(priceInMinorUnits(product.price))} each
                    </p>
                    <div
                      className="cart-quantity"
                      role="group"
                      aria-label={`Quantity for ${product.name}${line.size ? ` size ${line.size}` : ''}`}
                    >
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        disabled={line.quantity === 1}
                        onClick={() =>
                          dispatch({ type: 'quantity', key, quantity: line.quantity - 1 })
                        }
                      >
                        <Minus size={13} />
                      </button>
                      <span aria-live="polite">{line.quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        disabled={line.quantity >= MAX_QUANTITY}
                        onClick={() =>
                          dispatch({ type: 'quantity', key, quantity: line.quantity + 1 })
                        }
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="cart-remove"
                      onClick={() => dispatch({ type: 'remove', key })}
                      aria-label={`Remove ${product.name}${line.size ? ` size ${line.size}` : ''}`}
                    >
                      Remove
                    </button>
                  </div>
                  <p className="cart-line-total">
                    {formatMoney(priceInMinorUnits(product.price) * line.quantity)}
                  </p>
                </article>
              );
            })}
            <a className="product-back" href="/">
              ← Continue shopping
            </a>
          </section>
          <OrderSummary total={total}>
            <a className="button button-dark cart-checkout" href="/checkout">
              Proceed to checkout <ArrowRight size={14} />
            </a>
            <p className="checkout-preview-note">
              Preview checkout. No payment is collected and no items are shipped.
            </p>
          </OrderSummary>
        </div>
      )}
    </main>
  );
}

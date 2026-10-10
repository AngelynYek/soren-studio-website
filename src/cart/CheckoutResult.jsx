import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useCart } from './CartProvider';
import { formatMoney, lineKey } from './cart';
import './cart.css';

export default function CheckoutResult({ orderId, onShowHome }) {
  const { lastOrder, storageWarning } = useCart();
  const order = lastOrder?.id === orderId ? lastOrder : null;

  return (
    <main className="cart-page checkout-result">
      <p className="eyebrow">Soren Studio</p>
      {order && (
        <CheckCircle2
          className="checkout-confirmation-icon"
          size={34}
          strokeWidth={1}
          aria-hidden="true"
        />
      )}
      <h1>{order ? 'Thank you for your order' : 'Order details unavailable'}</h1>
      {order && <p>Your checkout is complete. You can review your pieces below.</p>}
      {storageWarning && (
        <p className="cart-feedback" role="status">
          {storageWarning}
        </p>
      )}
      {order ? (
        <section className="checkout-receipt" aria-label="Order details">
          <h2>Your considered edit</h2>
          <p className="checkout-order-id">
            Order reference · SRN-{order.id.slice(5, 13).toUpperCase()}
          </p>
          <ul>
            {order.items.map((item) => (
              <li key={lineKey(item)}>
                <span>
                  {item.name}
                  {item.size && ` · Size ${item.size}`} × {item.quantity}
                </span>
                <span>{formatMoney(item.amount)}</span>
              </li>
            ))}
          </ul>
          <p className="cart-total">Total · {formatMoney(order.total)}</p>
          <p>Your latest order summary is saved in this browser.</p>
        </section>
      ) : (
        <p role="status">
          This browser has no matching order summary. It may have been replaced by a newer checkout
          or removed from browser storage. Your bag has not been changed.
        </p>
      )}
      <p className="checkout-preview-note">
        Preview checkout. No payment was collected and no items will be shipped.
      </p>
      <div className="checkout-actions">
        <a className="button button-dark" href="#cart">
          Back to bag
        </a>
        <button className="product-back" type="button" onClick={onShowHome}>
          Continue shopping →
        </button>
      </div>
    </main>
  );
}

import React from 'react';
import { formatMoney } from './cart';

export default function OrderSummary({ total, children }) {
  return (
    <aside className="cart-summary" aria-label="Order summary">
      <h2>Order summary</h2>
      <dl>
        <div>
          <dt>Subtotal</dt>
          <dd>{formatMoney(total)}</dd>
        </div>
        <div>
          <dt>Delivery</dt>
          <dd>Complimentary</dd>
        </div>
        <div className="cart-total">
          <dt>Total</dt>
          <dd>{formatMoney(total)}</dd>
        </div>
      </dl>
      <p>
        Complimentary delivery. The displayed catalog prices apply; newsletter promotions are not
        applied at checkout.
      </p>
      {children}
    </aside>
  );
}

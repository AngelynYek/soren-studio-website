import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, CreditCard } from 'lucide-react';
import { productBySlug } from '../data/products';
import { useCart } from './CartProvider';
import { cartTotal, createDemoOrder, formatMoney, lineKey, priceInMinorUnits } from './cart';
import { simulatePayment } from './demoPayment';
import OrderSummary from './OrderSummary';
import DeliveryFields from './DeliveryFields';
import './cart.css';

export default function CheckoutPage() {
  const { items, dispatch, storageWarning } = useCart();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const total = cartTotal(items, productBySlug);
  const pending = useRef(null);
  useEffect(() => () => pending.current?.abort(), []);

  const cancel = () => {
    pending.current?.abort();
    window.location.hash = 'cart?cancelled=1';
  };
  const checkout = async (event) => {
    event.preventDefault();
    // A ref also guards rapid submissions before React updates the button.
    if (pending.current) return;
    const controller = new AbortController();
    pending.current = controller;
    setBusy(true);
    setError('');
    try {
      const order = createDemoOrder(items, productBySlug);
      await simulatePayment({ signal: controller.signal });
      dispatch({ type: 'complete-demo', order });
      window.location.hash = `checkout/success?order=${encodeURIComponent(order.id)}`;
    } catch {
      if (!controller.signal.aborted)
        setError('Your order could not be completed. Please review your bag and try again.');
    } finally {
      pending.current = null;
      if (!controller.signal.aborted) setBusy(false);
    }
  };

  return (
    <main className="cart-page checkout-page">
      <p className="eyebrow">Your considered edit</p>
      <h1>Checkout</h1>
      <nav className="checkout-progress" aria-label="Checkout progress">
        <a href="#cart">Bag</a>
        <span aria-hidden="true">/</span>
        <span aria-current="step">Checkout</span>
        <span aria-hidden="true">/</span>
        <span>Confirmation</span>
      </nav>
      {storageWarning && (
        <p className="cart-feedback" role="status">
          {storageWarning}
        </p>
      )}
      {!items.length ? (
        <section className="cart-empty">
          <h2>Your bag is empty.</h2>
          <p>Add a piece before checking out.</p>
          <a className="button button-dark" href="#cart">
            Back to bag
          </a>
        </section>
      ) : (
        <form className="cart-layout" onSubmit={checkout} aria-busy={busy}>
          <section className="checkout-details" aria-label="Checkout details">
            <DeliveryFields disabled={busy} />
            <section className="checkout-section" aria-labelledby="payment-heading">
              <h2 id="payment-heading">
                <span>03</span> Payment
              </h2>
              <div className="checkout-payment-method">
                <CreditCard size={22} aria-hidden="true" />
                <div>
                  <strong>Visa ending in 4242</strong>
                  <p>Preview payment method</p>
                </div>
                <span>VISA</span>
              </div>
              <p className="checkout-field-note">
                A sample card is provided for this preview. No card details are required.
              </p>
              <p className="checkout-field-note">Billing address matches delivery address.</p>
            </section>
          </section>
          <OrderSummary total={total}>
            <ul className="checkout-review">
              {items.map((line) => {
                const product = productBySlug(line.slug);
                return (
                  <li key={lineKey(line)}>
                    <img src={product.image} alt={product.name} />
                    <div>
                      <span>{product.name}</span>
                      <p>
                        {line.size ? `Size ${line.size}` : 'One size'} · Quantity {line.quantity}
                      </p>
                    </div>
                    <span>{formatMoney(priceInMinorUnits(product.price) * line.quantity)}</span>
                  </li>
                );
              })}
            </ul>
            <button type="submit" className="button button-dark cart-checkout" disabled={busy}>
              {busy ? 'Processing your order…' : `Place order · ${formatMoney(total)}`}{' '}
              <ArrowRight size={14} />
            </button>
            {busy && (
              <p role="status" aria-live="polite">
                Processing your order. Please wait.
              </p>
            )}
            <p className="checkout-preview-note">
              Preview checkout. No payment is collected and no items are shipped.
            </p>
            {error && (
              <p className="cart-error" role="alert">
                {error}
              </p>
            )}
            <button className="product-back" type="button" onClick={cancel}>
              ← Return to bag
            </button>
          </OrderSummary>
        </form>
      )}
    </main>
  );
}

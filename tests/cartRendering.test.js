import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

test('cart and checkout screens render empty, review, cancelled and receipt states', async () => {
  const server = await createServer({
    configFile: false,
    server: { middlewareMode: true, hmr: false, ws: false },
    appType: 'custom',
  });
  const previousStorage = globalThis.localStorage;
  try {
    const { CartProvider } = await server.ssrLoadModule('/src/cart/CartProvider.jsx');
    const { default: CartPage } = await server.ssrLoadModule('/src/cart/CartPage.jsx');
    const { default: CheckoutPage } = await server.ssrLoadModule('/src/cart/CheckoutPage.jsx');
    const { default: CheckoutResult } = await server.ssrLoadModule('/src/cart/CheckoutResult.jsx');
    const { createDemoOrder } = await server.ssrLoadModule('/src/cart/cart.js');
    const { productBySlug } = await server.ssrLoadModule('/src/data/products.js');
    const page = (cancelled = false) =>
      React.createElement(
        CartProvider,
        null,
        React.createElement(CartPage, { cancelled, onShowHome() {}, onShowProduct() {} }),
      );
    globalThis.localStorage = { getItem: () => null };
    const empty = renderToStaticMarkup(page());
    assert.match(empty, /Your bag is empty/);
    assert.doesNotMatch(empty, /Proceed to checkout/);
    const emptyCheckout = renderToStaticMarkup(
      React.createElement(CartProvider, null, React.createElement(CheckoutPage)),
    );
    assert.match(emptyCheckout, /Your bag is empty/);
    assert.doesNotMatch(emptyCheckout, /type="submit"/);
    const items = [
      { slug: 'noir-fold-dress', size: 'M', quantity: 2 },
      { slug: 'soren-minimalist-hobo-bag', size: '', quantity: 1 },
    ];
    globalThis.localStorage = { getItem: () => JSON.stringify({ items }) };
    const filled = renderToStaticMarkup(page(true));
    assert.match(filled, /Size M/);
    assert.match(filled, /One size/);
    assert.match(filled, /RM 344.00/);
    assert.match(filled, /Checkout cancelled/);
    assert.match(filled, /Proceed to checkout/);
    assert.match(filled, /No payment is collected/);
    const checkout = renderToStaticMarkup(
      React.createElement(CartProvider, null, React.createElement(CheckoutPage)),
    );
    assert.match(checkout, /RM 344.00/);
    assert.match(checkout, /Place order · RM 344.00/);
    assert.match(checkout, /Return to bag/);
    assert.match(checkout, /Email address/);
    assert.match(checkout, /First name/);
    assert.match(checkout, /Address/);
    assert.match(checkout, /Postcode/);
    assert.match(checkout, /Visa ending in 4242/);
    assert.match(checkout, /type="email" required/);
    assert.match(checkout, /<input(?=[^>]*name="postcode")(?=[^>]*required)[^>]*>/);
    assert.match(checkout, /Information entered here is not sent or saved/);
    assert.doesNotMatch(
      checkout,
      /Successful payment|Declined payment|Simulate payment|Demo checkout/,
    );
    assert.doesNotMatch(checkout, /name="(?:cardNumber|cvc|expiry)"/);
    const result = renderToStaticMarkup(
      React.createElement(
        CartProvider,
        null,
        React.createElement(CheckoutResult, { orderId: 'demo_missing', onShowHome() {} }),
      ),
    );
    assert.match(result, /Order details unavailable/);
    assert.doesNotMatch(result, /Thank you for your order/);
    const order = createDemoOrder(items, productBySlug, {
      id: 'demo_render',
      createdAt: '2026-10-10T00:00:00.000Z',
    });
    globalThis.localStorage = { getItem: () => JSON.stringify({ items: [], lastOrder: order }) };
    const receipt = renderToStaticMarkup(
      React.createElement(
        CartProvider,
        null,
        React.createElement(CheckoutResult, { orderId: order.id, onShowHome() {} }),
      ),
    );
    assert.match(receipt, /Thank you for your order/);
    assert.match(receipt, /Size M/);
    assert.match(receipt, /RM 344.00/);
    assert.match(receipt, /No payment was collected/);
    assert.match(receipt, /Order reference · SRN-RENDER/);
    globalThis.localStorage = {
      getItem() {
        throw new Error('Storage disabled');
      },
    };
    assert.match(renderToStaticMarkup(page()), /Your bag is empty/);
  } finally {
    if (previousStorage === undefined) delete globalThis.localStorage;
    else globalThis.localStorage = previousStorage;
    await server.close();
  }
});

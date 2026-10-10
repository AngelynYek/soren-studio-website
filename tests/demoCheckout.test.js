import test from 'node:test';
import assert from 'node:assert/strict';
import {
  cartReducer,
  createDemoOrder,
  emptyCart,
  restoreCart,
  restoreDemoOrder,
} from '../src/cart/cart.js';
import { simulatePayment } from '../src/cart/demoPayment.js';

const products = [
  { slug: 'dress', name: 'Demo Dress', sizes: ['S', 'M'], price: 'RM 108' },
  { slug: 'bag', name: 'Demo Bag', sizes: [], price: 'RM 64' },
];
const findProduct = (slug) => products.find((product) => product.slug === slug);
const line = { slug: 'dress', size: 'M', quantity: 2 };
const orderOptions = { id: 'demo_example', createdAt: '2026-10-10T00:00:00.000Z' };

test('demo order snapshots catalog prices and variants without retaining submitted data', () => {
  const order = createDemoOrder(
    [
      { ...line, price: 1, card: 'do-not-store' },
      { slug: 'bag', size: '', quantity: 1 },
    ],
    findProduct,
    orderOptions,
  );
  assert.equal(order.total, 28000);
  assert.deepEqual(order.items, [
    { ...line, name: 'Demo Dress', amount: 21600 },
    { slug: 'bag', size: '', quantity: 1, name: 'Demo Bag', amount: 6400 },
  ]);
  assert.deepEqual(Object.keys(order), ['id', 'createdAt', 'items', 'total']);
  assert.equal(order.id, 'demo_example');
});

test('demo checkout rejects empty bags, unknown products, invalid sizes, duplicate lines and invalid quantities', () => {
  for (const items of [
    [],
    null,
    [line, line],
    [{ ...line, size: 'XL' }],
    [{ ...line, quantity: -1 }],
    [{ ...line, quantity: 1.5 }],
    [{ ...line, quantity: 11 }],
    [{ ...line, slug: 'missing' }],
    [{ slug: 'bag', size: 'M', quantity: 1 }],
    Array(21).fill(line),
  ]) {
    assert.throws(() => createDemoOrder(items, findProduct, orderOptions));
  }
  assert.throws(() => createDemoOrder([line], findProduct, { ...orderOptions, id: 'invalid' }));
});

test('successful simulation completes exactly once and persists the latest receipt', async () => {
  const order = createDemoOrder([line], findProduct, orderOptions);
  const state = {
    ...emptyCart,
    items: [
      { ...line, quantity: 4 },
      { ...line, size: 'S', quantity: 1 },
    ],
  };
  await simulatePayment({ delayMs: 0 });
  const action = { type: 'complete-demo', order };
  const completed = cartReducer(state, action);
  assert.deepEqual(
    completed.items.map((item) => item.quantity),
    [2, 1],
  );
  assert.deepEqual(completed.lastOrder, order);
  assert.equal(cartReducer(completed, action), completed);
  const restored = restoreCart(JSON.stringify(completed), findProduct);
  assert.deepEqual(restored, completed);
  assert.equal(cartReducer(restored, action), restored);
});

test('processing delay alone does not mutate the bag or retain contact details', async () => {
  const state = { ...emptyCart, items: [line] };
  const snapshot = JSON.stringify(state);
  await simulatePayment({ delayMs: 0 });
  assert.equal(JSON.stringify(state), snapshot);
  const order = createDemoOrder(state.items, findProduct, {
    ...orderOptions,
    email: 'sample@example.com',
    address: 'Sample address',
  });
  assert.equal('email' in order, false);
  assert.equal('address' in order, false);
});

test('cancelling or leaving checkout aborts its delay without completing an order', async () => {
  const controller = new AbortController();
  const pending = simulatePayment({ signal: controller.signal, delayMs: 1000 });
  controller.abort();
  await assert.rejects(pending, { name: 'AbortError' });
  await assert.rejects(simulatePayment({ signal: controller.signal }), { name: 'AbortError' });
});

test('malformed stored receipts are discarded independently of valid bag items', () => {
  const order = createDemoOrder([line], findProduct, orderOptions);
  for (const bad of [
    null,
    {},
    { ...order, id: 'invalid' },
    { ...order, createdAt: 'invalid' },
    { ...order, total: 1 },
    { ...order, items: [] },
    { ...order, items: [null] },
    { ...order, items: [{ ...order.items[0], amount: -1 }] },
    { ...order, items: [{ ...order.items[0], quantity: 100 }] },
  ]) {
    assert.equal(restoreDemoOrder(bad), null);
    const restored = restoreCart(JSON.stringify({ items: [line], lastOrder: bad }), findProduct);
    assert.deepEqual(restored.items, [line]);
    assert.equal(restored.lastOrder, null);
  }
  assert.deepEqual(restoreDemoOrder({ ...order, privateData: 'not-retained' }), order);
  assert.equal(cartReducer(emptyCart, { type: 'complete-demo', order: {} }), emptyCart);
});

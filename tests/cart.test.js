import test from 'node:test';
import assert from 'node:assert/strict';
import {
  cartReducer,
  cartTotal,
  emptyCart,
  formatMoney,
  lineKey,
  priceInMinorUnits,
  restoreCart,
} from '../src/cart/cart.js';

const line = { slug: 'dress', size: 'M', quantity: 1 };
const product = { slug: 'dress', sizes: ['S', 'M'] };
test('cart merges identical sizes, keeps variants separate, and enforces quantity limits', () => {
  let state = cartReducer(emptyCart, { type: 'add', line });
  state = cartReducer(state, { type: 'add', line });
  state = cartReducer(state, { type: 'add', line: { ...line, size: 'S' } });
  assert.deepEqual(
    state.items.map((item) => item.quantity),
    [2, 1],
  );
  state = cartReducer(state, { type: 'quantity', key: lineKey(line), quantity: 10 });
  assert.equal(cartReducer(state, { type: 'add', line }), state);
  assert.equal(cartReducer(state, { type: 'quantity', key: lineKey(line), quantity: 0 }), state);
  assert.equal(cartReducer(state, { type: 'remove', key: lineKey(line) }).items.length, 1);
});
test('cart safely restores stored items without trusting prices or invalid variants', () => {
  const stored = JSON.stringify({
    items: [line, line, { ...line, size: 'XL' }, { slug: 'missing', size: '', quantity: 1 }],
  });
  assert.deepEqual(restoreCart(stored, (slug) => (slug === 'dress' ? product : null)).items, [
    line,
  ]);
  assert.deepEqual(
    restoreCart('broken json', () => product),
    emptyCart,
  );
  assert.deepEqual(
    restoreCart('null', () => product),
    emptyCart,
  );
});
test('existing stored bags migrate without obsolete completion metadata', () => {
  assert.deepEqual(
    restoreCart(JSON.stringify({ items: [line], completed: ['old-reference'] }), () => product),
    { items: [line], lastOrder: null },
  );
});
test('prices use integer minor units with explicit MYR formatting', () => {
  assert.equal(priceInMinorUnits('RM 64'), 6400);
  assert.equal(priceInMinorUnits('RM 12.99'), 1299);
  assert.equal(formatMoney(1299), 'RM 12.99');
  assert.equal(
    cartTotal([{ ...line, quantity: 2 }], () => ({ price: 'RM 12.99' })),
    2598,
  );
  assert.throws(() => priceInMinorUnits('RM -1'));
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { followInternalLink, navigate } from '../src/navigation/navigate.js';

const origin = 'https://soren.test';

function fakeWindow(url = '/men') {
  const [pathname, query] = url.split('?');
  const pushed = [];
  const events = [];
  const scrolls = [];
  globalThis.window = {
    location: { origin, pathname, search: query ? `?${query}` : '' },
    history: { pushState: (_state, _title, nextUrl) => pushed.push(nextUrl) },
    dispatchEvent: (event) => events.push(event.type),
    scrollTo: (...position) => scrolls.push(position),
  };
  return { pushed, events, scrolls };
}

function click(link, modifiers = {}) {
  let prevented = false;
  followInternalLink({
    target: { closest: () => link },
    button: 0,
    preventDefault: () => {
      prevented = true;
    },
    ...modifiers,
  });
  return prevented;
}

const internalLink = {
  origin,
  pathname: '/product/noir-fold-dress',
  search: '?from=shop-all',
  target: '',
};

test('a plain click on an internal link changes page without a reload', () => {
  const { pushed, events, scrolls } = fakeWindow();
  assert.equal(click(internalLink), true);
  assert.deepEqual(pushed, ['/product/noir-fold-dress?from=shop-all']);
  assert.deepEqual(events, ['popstate']);
  assert.deepEqual(scrolls, [[0, 0]]);
});

test('clicks meant for the browser are left alone', () => {
  const { pushed } = fakeWindow();
  for (const modifiers of [
    { ctrlKey: true },
    { metaKey: true },
    { shiftKey: true },
    { altKey: true },
    { button: 1 },
  ])
    assert.equal(click(internalLink, modifiers), false);
  assert.equal(click(null), false);
  assert.equal(click({ ...internalLink, target: '_blank' }), false);
  assert.equal(click({ ...internalLink, origin: 'null' }), false);
  assert.equal(click({ ...internalLink, origin: 'https://example.com' }), false);
  assert.deepEqual(pushed, []);
});

test('navigating to the current page adds no history entry', () => {
  const { pushed, events } = fakeWindow('/shop-all?department=men');
  navigate('/shop-all?department=men');
  assert.deepEqual(pushed, []);
  assert.deepEqual(events, []);
});

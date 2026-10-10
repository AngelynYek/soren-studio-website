import test from 'node:test';
import assert from 'node:assert/strict';
import { CONTACT_EMAIL, informationPages, informationPageKey } from '../src/information/pages.js';

test('each information page has a unique route and complete content', () => {
  const pages = Object.values(informationPages);
  assert.equal(pages.length, 4);
  assert.equal(new Set(pages.map((page) => page.hash)).size, pages.length);

  for (const [key, page] of Object.entries(informationPages)) {
    assert.equal(informationPageKey(page.hash), key);
    assert.ok(page.title && page.eyebrow && page.introduction);
    assert.ok(page.sections?.length || page.questions?.length);
    assert.ok(page.link.label);
    assert.ok(page.link.href === '#shop-all' || informationPageKey(page.link.href));
    for (const section of page.sections ?? []) {
      assert.ok(section.title && section.paragraphs.length);
      assert.ok(
        section.paragraphs.every((paragraph) => typeof paragraph === 'string' && paragraph),
      );
    }
    for (const item of page.questions ?? []) {
      assert.ok(item.question && item.answer);
    }
  }
});

test('information routes match only the supported page hashes', () => {
  for (const hash of [
    '',
    '#',
    '#essentials',
    '#our-story/unknown',
    '#contact-us',
    '#product/coat',
  ]) {
    assert.equal(informationPageKey(hash), null);
  }
});

test('client care explains current browser-only behavior without promising real fulfillment', () => {
  const shippingCopy = informationPages.shipping.sections.flatMap((section) => section.paragraphs);
  assert.ok(
    shippingCopy.includes(
      'Checkout is currently a browser-only preview. No payment is collected and no items are shipped.',
    ),
  );
  assert.match(shippingCopy.join(' '), /returns, exchanges and refunds are not processed/);
  assert.equal(informationPages.contact.sections[0].email, CONTACT_EMAIL);
  assert.match(informationPages.contact.sections[0].paragraphs[0], /not sent through this website/);
});

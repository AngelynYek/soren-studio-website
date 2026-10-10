import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { CONTACT_EMAIL, informationPages } from '../src/information/pages.js';

test('information pages render accessible headings, complete sections and working internal links', async () => {
  const server = await createServer({
    configFile: false,
    server: { middlewareMode: true, hmr: false, ws: false },
    appType: 'custom',
  });

  try {
    const { default: InformationPage } = await server.ssrLoadModule(
      '/src/information/InformationPage.jsx',
    );
    const render = (pageKey) =>
      renderToStaticMarkup(React.createElement(InformationPage, { pageKey }));

    for (const [key, page] of Object.entries(informationPages)) {
      const markup = render(key);
      assert.match(markup, /<main class="information-page" aria-labelledby="information-title">/);
      assert.equal((markup.match(/<h1 /g) ?? []).length, 1);
      assert.match(markup, /<h1 id="information-title" tabindex="-1">/);
      assert.ok(markup.includes(`href="${page.link.href}"`));
      assert.match(markup, /href="#shop-all"/);
      assert.equal(
        (markup.match(/<section class="information-section"/g) ?? []).length,
        page.sections?.length ?? 0,
      );
    }

    const faqMarkup = render('faq');
    assert.equal(
      (faqMarkup.match(/<details /g) ?? []).length,
      informationPages.faq.questions.length,
    );
    assert.equal(
      (faqMarkup.match(/<summary>/g) ?? []).length,
      informationPages.faq.questions.length,
    );
    assert.doesNotMatch(faqMarkup, /<details[^>]*\sopen(?:[=>\s])/);
    assert.match(faqMarkup, /No account is required/);
    assert.match(render('contact'), new RegExp(`href="mailto:${CONTACT_EMAIL}"`));
    assert.doesNotMatch(render('contact'), /<form|Message sent/);
    assert.equal(render('unknown'), '');
  } finally {
    await server.close();
  }
});

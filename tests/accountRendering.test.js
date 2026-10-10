import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

test('account screens render accessible sign-in, creation and signed-in states without passwords', async () => {
  const server = await createServer({
    configFile: false,
    server: { middlewareMode: true, hmr: false, ws: false },
    appType: 'custom',
  });
  const previousStorage = globalThis.localStorage;
  try {
    const { AccountProvider } = await server.ssrLoadModule('/src/account/AccountProvider.jsx');
    const { default: AccountPage } = await server.ssrLoadModule('/src/account/AccountPage.jsx');
    const render = (mode = 'sign-in') =>
      renderToStaticMarkup(
        React.createElement(AccountProvider, null, React.createElement(AccountPage, { mode })),
      );
    globalThis.localStorage = { getItem: () => null };
    const signIn = render();
    assert.match(signIn, /Welcome back/);
    assert.match(signIn, /href="#account\/create"/);
    assert.match(signIn, /<label for="account-email">Email address/);
    assert.match(signIn, /type="email"[^>]*required/);
    assert.match(signIn, /Browser-only preview/);
    assert.doesNotMatch(signIn, /type="password"|name="password"/);
    const create = render('create');
    assert.match(create, /A considered beginning/);
    assert.match(create, /<label for="account-name">Name/);
    assert.match(create, /href="#account"/);
    globalThis.localStorage = {
      getItem: () =>
        JSON.stringify({
          profiles: [{ name: '<Alex>', email: 'alex@example.com' }],
          currentEmail: 'alex@example.com',
        }),
    };
    const signedIn = render();
    assert.match(signedIn, /Welcome, &lt;Alex&gt;/);
    assert.match(signedIn, /alex@example.com/);
    assert.match(signedIn, /Sign out/);
    assert.match(signedIn, /href="#cart"/);
    assert.match(signedIn, /shopping bag is shared/);
    assert.doesNotMatch(signedIn, /<form|type="password"/);
    globalThis.localStorage = {
      getItem() {
        throw new Error('Storage disabled');
      },
    };
    assert.match(render(), /Welcome back/);
  } finally {
    if (previousStorage === undefined) delete globalThis.localStorage;
    else globalThis.localStorage = previousStorage;
    await server.close();
  }
});

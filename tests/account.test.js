import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MAX_PROFILES,
  createProfile,
  emptyAccountState,
  restoreAccount,
  signInProfile,
  signOutProfile,
} from '../src/account/account.js';

test('creating a local profile normalizes details, signs in and does not mutate existing state', () => {
  const initial = emptyAccountState();
  const created = createProfile(initial, {
    name: ' Alex ',
    email: ' ALEX@example.com ',
    password: 'must-not-be-saved',
  });
  assert.deepEqual(initial, { profiles: [], currentEmail: null });
  assert.deepEqual(created, {
    profiles: [{ name: 'Alex', email: 'alex@example.com' }],
    currentEmail: 'alex@example.com',
  });
});

test('profile validation rejects invalid names, emails, duplicates and excessive profiles', () => {
  const empty = emptyAccountState();
  for (const name of ['', '  ', 'a'.repeat(81), null]) {
    assert.throws(() => createProfile(empty, { name, email: 'alex@example.com' }), /name/);
  }
  for (const email of [
    '',
    'alex',
    'alex@',
    'a b@example.com',
    'x'.repeat(255) + '@example.com',
    null,
  ]) {
    assert.throws(() => createProfile(empty, { name: 'Alex', email }), /valid email/);
  }
  const created = createProfile(empty, { name: 'Alex', email: 'alex@example.com' });
  assert.throws(
    () => createProfile(created, { name: 'Alex', email: 'ALEX@example.com' }),
    /already exists/,
  );
  let full = empty;
  for (let index = 0; index < MAX_PROFILES; index++) {
    full = createProfile(full, { name: `Profile ${index}`, email: `profile${index}@example.com` });
  }
  assert.throws(
    () => createProfile(full, { name: 'Extra', email: 'extra@example.com' }),
    /profile limit/,
  );
});

test('sign-out preserves profiles and sign-in only accepts a matching local email', () => {
  const created = createProfile(emptyAccountState(), { name: 'Alex', email: 'alex@example.com' });
  const signedOut = signOutProfile(created);
  assert.equal(signedOut.currentEmail, null);
  assert.deepEqual(signedOut.profiles, created.profiles);
  assert.equal(created.currentEmail, 'alex@example.com');
  assert.equal(signInProfile(signedOut, ' ALEX@example.com ').currentEmail, 'alex@example.com');
  assert.throws(() => signInProfile(signedOut, 'unknown@example.com'), /No account/);
  assert.throws(() => signInProfile(signedOut, 'invalid'), /valid email/);
});

test('storage restoration tolerates missing, malformed and tampered data', () => {
  for (const raw of [null, '', '{', 'null', '[]', '{}', '{"profiles":{}}']) {
    assert.deepEqual(restoreAccount(raw), emptyAccountState());
  }
  const restored = restoreAccount(
    JSON.stringify({
      profiles: [
        null,
        { name: '', email: 'invalid' },
        { name: ' Alex ', email: 'ALEX@example.com', password: 'discard', role: 'admin' },
        { name: 'Duplicate', email: 'alex@example.com' },
      ],
      currentEmail: 'ALEX@example.com',
      token: 'discard',
    }),
  );
  assert.deepEqual(restored, {
    profiles: [{ name: 'Alex', email: 'alex@example.com' }],
    currentEmail: 'alex@example.com',
  });
  assert.equal(
    restoreAccount(JSON.stringify({ ...restored, currentEmail: 'unknown@example.com' }))
      .currentEmail,
    null,
  );
  const profiles = Array.from({ length: MAX_PROFILES + 5 }, (_, index) => ({
    name: `Profile ${index}`,
    email: `profile${index}@example.com`,
  }));
  assert.equal(restoreAccount(JSON.stringify({ profiles })).profiles.length, MAX_PROFILES);
});

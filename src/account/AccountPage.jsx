import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useAccount } from './AccountProvider';
import './account.css';

function PreviewNotice() {
  return (
    <p className="account-notice">
      Browser-only preview. Use sample details; no password is required. Profiles are saved on this
      device, not verified or secured. Anyone using this browser can access them.
    </p>
  );
}

export default function AccountPage({ mode = 'sign-in' }) {
  const { profile, createAccount, signIn, signOut, storageWarning } = useAccount();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const headingRef = useRef(null);
  const creating = mode === 'create';

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [profile?.email, mode]);

  const submit = (event) => {
    event.preventDefault();
    const message = creating ? createAccount({ name, email }) : signIn(email);
    setError(message);
    setStatus('');
    if (!message) {
      setName('');
      setEmail('');
      window.location.hash = 'account';
    }
  };

  const leaveAccount = () => {
    signOut();
    setName('');
    setEmail('');
    setError('');
    setStatus('You have signed out.');
    window.location.hash = 'account';
  };

  return (
    <main className="account-page" aria-labelledby="account-title">
      <a className="product-back" href="#">
        ← Continue shopping
      </a>
      <div className="account-layout">
        <section className="account-intro">
          <p className="account-eyebrow">Soren Studio · Your account</p>
          <h1 id="account-title" ref={headingRef} tabIndex={-1}>
            {profile
              ? `Welcome, ${profile.name}.`
              : creating
                ? 'A considered beginning.'
                : 'Welcome back.'}
          </h1>
          <p className="account-intro-copy">
            {profile
              ? 'Your everyday edit, all in one place.'
              : 'Thoughtful pieces. Timeless essentials. A wardrobe that feels like you.'}
          </p>
        </section>
        <section className="account-panel" aria-labelledby="account-panel-title">
          {profile ? (
            <>
              <h2 id="account-panel-title">Account details</h2>
              <dl className="account-details">
                <div>
                  <dt>Name</dt>
                  <dd>{profile.name}</dd>
                </div>
                <div>
                  <dt>Email address</dt>
                  <dd>{profile.email}</dd>
                </div>
              </dl>
              <a className="button button-dark account-submit" href="#cart">
                View shopping bag <ArrowRight size={16} aria-hidden="true" />
              </a>
              <p className="account-help">
                The shopping bag is shared by profiles on this browser.
              </p>
              <button type="button" className="account-text-link" onClick={leaveAccount}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <h2 id="account-panel-title">{creating ? 'Create account' : 'Sign in'}</h2>
              <p className="account-help">
                {creating
                  ? 'Create a local profile with a name and sample email.'
                  : 'Use the email for a profile you have created in this browser.'}
              </p>
              <form onSubmit={submit}>
                {creating && (
                  <div className="account-field">
                    <label htmlFor="account-name">Name</label>
                    <input
                      id="account-name"
                      name="name"
                      type="text"
                      autoComplete="off"
                      required
                      maxLength={80}
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                        setError('');
                      }}
                    />
                  </div>
                )}
                <div className="account-field">
                  <label htmlFor="account-email">Email address</label>
                  <input
                    id="account-email"
                    name="email"
                    type="email"
                    autoComplete="off"
                    required
                    maxLength={254}
                    placeholder="alex@example.com"
                    value={email}
                    aria-describedby={error ? 'account-error' : undefined}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setError('');
                    }}
                  />
                </div>
                {error && (
                  <p id="account-error" className="account-error" role="alert">
                    {error}
                  </p>
                )}
                <button type="submit" className="button button-dark account-submit">
                  {creating ? 'Create account' : 'Sign in'}{' '}
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </form>
              <p className="account-switch">
                {creating ? 'Already have an account?' : 'New to Soren?'}{' '}
                <a className="account-text-link" href={creating ? '#account' : '#account/create'}>
                  {creating ? 'Sign in' : 'Create account'}
                </a>
              </p>
            </>
          )}
          {status && (
            <p className="account-help" role="status">
              {status}
            </p>
          )}
          {storageWarning && (
            <p className="account-error" role="status">
              {storageWarning}
            </p>
          )}
          <PreviewNotice />
        </section>
      </div>
    </main>
  );
}

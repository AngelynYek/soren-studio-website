import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import './information.css';

export default function NotFoundPage() {
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <main className="information-page" aria-labelledby="information-title">
      <header className="information-heading">
        <p className="eyebrow">Soren Studio</p>
        <h1 id="information-title" ref={headingRef} tabIndex={-1}>
          Page not found
        </h1>
        <p>This page may have moved, or the link may be out of date.</p>
      </header>
      <div className="information-content">
        <div className="information-next">
          <a className="button button-dark" href="/shop-all">
            Shop all pieces <ArrowRight size={14} aria-hidden="true" />
          </a>
          <a className="product-back" href="/">
            ← Back to home
          </a>
        </div>
      </div>
    </main>
  );
}

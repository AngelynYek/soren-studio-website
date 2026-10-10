import React, { useEffect, useRef } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { informationPages } from './pages';
import './information.css';

export default function InformationPage({ pageKey }) {
  const page = informationPages[pageKey];
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [pageKey]);

  if (!page) return null;

  return (
    <main className="information-page" aria-labelledby="information-title">
      <header className="information-heading">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1 id="information-title" ref={headingRef} tabIndex={-1}>
          {page.title}
        </h1>
        <p>{page.introduction}</p>
      </header>
      <div className="information-content">
        {page.sections?.map((section) => (
          <section className="information-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.email && (
              <a className="information-email" href={`mailto:${section.email}`}>
                {section.email} <ArrowRight size={16} aria-hidden="true" />
              </a>
            )}
          </section>
        ))}
        {page.questions && (
          <section className="information-faqs" aria-label="Frequently asked questions">
            {page.questions.map(({ question, answer }) => (
              <details className="information-question" key={question}>
                <summary>
                  <span>{question}</span>
                  <Plus size={16} aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </section>
        )}
        <div className="information-next">
          <a className="button button-dark" href={page.link.href}>
            {page.link.label} <ArrowRight size={14} aria-hidden="true" />
          </a>
          <a className="product-back" href="#shop-all">
            ← Back to shop all
          </a>
        </div>
      </div>
    </main>
  );
}

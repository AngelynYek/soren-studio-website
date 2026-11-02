import React from 'react';
import { ArrowRight } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { collections } from '../data/collections';
import { featuredProductsByGroup } from '../data/products';

const photo = (id, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const offers = featuredProductsByGroup('offers');
const icons = featuredProductsByGroup('icons');

function Hero() {
  return (
    <section
      className="hero"
      style={{ '--hero-image': `url("${photo('photo-1539109136881-3be0616acf4b', 1800)}")` }}
    >
      <div className="hero-copy">
        <p className="eyebrow light">The new season · 2026</p>
        <h1>
          New autumn
          <br />
          collection
        </h1>
        <p>Timeless silhouettes for cooler days.</p>
        <a className="button button-light" href={collections.autumn.path}>
          Discover the edit <ArrowRight size={14} />
        </a>
      </div>
      <span className="image-credit">Quiet mornings. Longer walks.</span>
    </section>
  );
}

function ProductSection({ title, items, viewAllHref, label, compact = false }) {
  return (
    <section className={`product-section ${compact ? 'compact' : ''}`}>
      <div className="section-heading">
        <p className="eyebrow">Curated for you</p>
        <h2>{title}</h2>
        <a
          className="section-heading-link"
          href={viewAllHref}
          aria-label={`View all ${title.toLowerCase()}`}
        >
          View all <ArrowRight size={13} />
        </a>
      </div>
      <ProductGrid items={items} label={label} compact={compact} />
    </section>
  );
}

function EssentialsBanner() {
  return (
    <section
      className="essentials-banner"
      style={{ '--essentials-image': `url("${photo('photo-1483985988355-763728e1935b', 1700)}")` }}
    >
      <div className="essentials-copy">
        <p className="eyebrow">Pieces to keep</p>
        <h2>
          Timeless
          <br />
          basics
        </h2>
        <p>Good clothes, made to be lived in.</p>
        <a className="button button-dark" href={collections.basics.path}>
          Shop the essentials <ArrowRight size={14} />
        </a>
      </div>
    </section>
  );
}

function SignupBanner() {
  return (
    <section className="signup-banner">
      <div className="signup-copy">
        <p className="eyebrow">A little something from us</p>
        <h2>Unlock 10% off your first order</h2>
        <p>
          Enjoy 10% off your first purchase, alongside early access to capsule drops and private
          curation.
        </p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.currentTarget.reset();
            alert('Thanks for joining the Soren Studio list!');
          }}
        >
          <label className="visually-hidden" htmlFor="email">
            Your email address
          </label>
          <input id="email" type="email" placeholder="Your email address" required />
          <button type="submit" aria-label="Subscribe">
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
      <div className="signup-image" role="img" aria-label="Neutral garments on a rail" />
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ProductSection
        title="Exclusive offers"
        items={offers}
        viewAllHref={collections.offers.path}
        label={collections.offers.label}
        compact
      />
      <EssentialsBanner />
      <ProductSection
        title="Iconic pieces"
        items={icons}
        viewAllHref={collections.icons.path}
        label={collections.icons.label}
      />
      <SignupBanner />
    </main>
  );
}

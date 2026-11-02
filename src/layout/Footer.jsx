import React from 'react';
import { collections } from '../data/collections';
import { CONTACT_EMAIL, informationPages } from '../information/pages';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <a className="wordmark wordmark-button" href="/">
          SOREN
        </a>
        <p>
          Timeless silhouettes and considered essentials crafted for the modern wardrobe. Designed
          to endure beyond seasons.
        </p>
      </div>
      <div className="footer-column">
        <h2>Explore</h2>
        <a href={collections.autumn.path}>New arrivals</a>
        <a href="/shop-all">Shop all</a>
        <a href={informationPages.story.path}>{informationPages.story.title}</a>
      </div>
      <div className="footer-column">
        <h2>Client care</h2>
        {['shipping', 'faq', 'contact'].map((key) => (
          <a key={key} href={informationPages[key].path}>
            {informationPages[key].title}
          </a>
        ))}
      </div>
      <div className="footer-column">
        <h2>Find us</h2>
        <p>
          Monday – Friday
          <br />
          9am – 5pm EST
        </p>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Soren Studio. All rights reserved.</span>
        <span>Made with intention.</span>
      </div>
    </footer>
  );
}

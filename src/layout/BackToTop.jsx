import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const updateBackToTop = () => setShowBackToTop(window.scrollY > 360);
    updateBackToTop();
    window.addEventListener('scroll', updateBackToTop, { passive: true });
    return () => window.removeEventListener('scroll', updateBackToTop);
  }, []);

  if (!showBackToTop) return null;
  return (
    <button
      className="back-to-top"
      type="button"
      aria-label="Back to top"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'instant'
            : 'smooth',
        })
      }
    >
      Back to top <ArrowUp size={14} />
    </button>
  );
}

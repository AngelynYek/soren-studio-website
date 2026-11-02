import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AccountProvider } from './account/AccountProvider';
import { CartProvider } from './cart/CartProvider';

// React adds each page's title and description itself so the static fallbacks must not sit beside them.
document.querySelectorAll('title, meta[name="description"]').forEach((tag) => tag.remove());

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AccountProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AccountProvider>
  </React.StrictMode>,
);

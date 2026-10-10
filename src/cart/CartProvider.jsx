import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { productBySlug } from '../data/products';
import {
  CART_STORAGE_KEY,
  MAX_LINES,
  MAX_QUANTITY,
  cartReducer,
  emptyCart,
  lineKey,
  restoreCart,
  validLine,
} from './cart';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, null, () => {
    try {
      return restoreCart(localStorage.getItem(CART_STORAGE_KEY), productBySlug);
    } catch {
      return { ...emptyCart };
    }
  });
  const [storageWarning, setStorageWarning] = useState('');
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    } catch {
      setStorageWarning(
        'Your browser could not save the bag or order summary. They will stay available in this tab until you refresh or close it.',
      );
    }
  }, [state]);

  const add = (product, size) => {
    const line = { slug: product.slug, size, quantity: 1 };
    if (!validLine(line, product))
      return 'Please choose an available size before adding this piece.';
    const existing = state.items.find((item) => lineKey(item) === lineKey(line));
    if (existing?.quantity >= MAX_QUANTITY)
      return `You can add up to ${MAX_QUANTITY} of each size.`;
    if (!existing && state.items.length >= MAX_LINES)
      return `Your bag can hold up to ${MAX_LINES} different items or sizes.`;
    dispatch({ type: 'add', line });
    return '';
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        dispatch,
        add,
        storageWarning,
        count: state.items.reduce((total, line) => total + line.quantity, 0),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error('useCart requires CartProvider');
  return value;
}

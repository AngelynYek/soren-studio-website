import React from 'react';

// Shared by cards and detail pages so offer pricing stays consistent.
export default function ProductPrice({ price, wasPrice }) {
  return (
    <>
      {wasPrice && <span className="visually-hidden">Sale price: </span>}
      {price}
      {wasPrice && (
        <>
          {' '}
          <del>
            <span className="visually-hidden">Original price: </span>
            {wasPrice}
          </del>
        </>
      )}
    </>
  );
}

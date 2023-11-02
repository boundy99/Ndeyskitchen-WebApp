import { React, useState } from 'react';

export default function Quantity() {
  const [quantity, setQuantity] = useState(1);
  return (
    <>
      <p className="tag">Quantity</p>
      <div className="quantity">
        <span
          className="material-symbols-outlined"
          onClick={() => setQuantity(quantity + 1)}
        >
          add
        </span>{' '}
        <p className="content">{quantity}</p>
        <span
          className="material-symbols-outlined"
          onClick={() => {
            if (quantity === 1) return;
            setQuantity(quantity - 1);
          }}
        >
          remove
        </span>
      </div>
    </>
  );
}
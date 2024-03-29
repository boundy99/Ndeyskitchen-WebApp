import { React, useState } from 'react';

export default function Options({
  item,
  handleSizeSelect,
  handleSizeSelectPrice,
}) {
  const [price, setPrice] = useState(item.price);
  const [itemSize, setSize] = useState(getSizeForPrice(item, item.price));

  function getSizeForPrice(item, targetPrice) {
    for (const [size, sizePrice] of Object.entries(item.size)) {
      if (sizePrice === targetPrice) {
        return size;
      }
    }

    return Object.keys(item.size)[0];
  }

  return (
    <>
      <p className="tag">Options</p>
      {handleSizeSelectPrice(price)}

      <div className="size-container">
        {Object.keys(item.size).map(size => (
          <div
            key={size}
            className={
              price === item.size[size]
                ? 'size-price-card size-price-card-clicked'
                : 'size-price-card'
            }
            onClick={() => {
              setPrice(item.size[size]);
              setSize(size);
            }}
          >
            {handleSizeSelect(itemSize)}
            <p>{size}</p>

            <p className="size-price">D {item.size[size]}</p>
          </div>
        ))}
      </div>
    </>
  );
}

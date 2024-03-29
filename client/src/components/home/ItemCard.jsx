import React from 'react';
import Image from '../Image';
import truncateComponentList from '../../scripts/truncateComponentList';

export default function ItemCard(props) {
  return (
    <div className="item-container">
      <a
        href={`/item/${props.id}`}
        style={{ textDecoration: 'none', color: '#000' }}
      >
        <div className="item-card-container">
          <div className="item-image-container">
            <Image alt={props.alt} className="item-image" src={props.src} />
          </div>
          <div className="item-price-container">
            <p>D {props.price}</p>
          </div>
          <p className="item-name">{props.name}</p>
          <div className="item-component-container">
            <i>{truncateComponentList(props.components, 35)}</i>
          </div>
        </div>

        <div className="buy-btn-container">
          <button className="buy-item-btn">
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>
        </div>
      </a>
    </div>
  );
}

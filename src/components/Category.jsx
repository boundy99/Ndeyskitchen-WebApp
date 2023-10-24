import { React, useState, useSyncExternalStore } from 'react';
import categoryStore from '../stores/categoryStore';

export default function Category() {
  const [isSweetButton, setIsSweetButton] = useState(false);
  const [isSavoryButton, setIsSavoryButton] = useState(false);

  const style = {
    color: '#371821',
    backgroundColor: ' #FFFFFF',
    border: ' 1px solid #371821',
  };

  const category = useSyncExternalStore(
    categoryStore.subscribe,
    categoryStore.getCategory
  );

  function handleSweetButtonClick(event) {
    if (category === '' || category === 'Savory') {
      categoryStore.setId(event.target.id);
      setIsSweetButton(!isSweetButton);
      setIsSavoryButton(false);
    } else {
      categoryStore.setId('');
      setIsSweetButton(!isSweetButton);
    }
  }

  function handleSavoryButtonClick(event) {
    if (category === '' || category === 'Sweet') {
      categoryStore.setId(event.target.id);
      setIsSavoryButton(!isSavoryButton);
      setIsSweetButton(false);
    } else categoryStore.setId('');
  }

  return (
    <div className="category-container" id="menu">
      <button
        id="Sweet"
        className="category-sweet-salty-btn category-sweet-btn"
        onClick={handleSweetButtonClick}
        style={isSweetButton ? style : null}
      >
        Sweet
      </button>
      <button
        id="Savory"
        className="category-sweet-salty-btn category-sweet-btn"
        onClick={handleSavoryButtonClick}
        style={isSavoryButton ? style : null}
      >
        Savory
      </button>
    </div>
  );
}

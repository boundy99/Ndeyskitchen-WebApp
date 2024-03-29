import { useContext } from 'react';
import { CartSizeContext } from '../context/CartSizeContext';

export default function useCartSizeContext() {
  const context = useContext(CartSizeContext);

  if (!context) {
    throw new Error(
      'useCartSizeContext must be used inside CartSizeContextProvider'
    );
  }
  return context;
}

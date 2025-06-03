import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const CartIntegration: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Cart Integration Component</h2>
      <button onClick={() => dispatch(addToCart({ id: 1, title: 'Test Product', price: 10, quantity: 1 }))}>
        Add to Cart
      </button>
    </div>
  );
};

export default CartIntegration; 
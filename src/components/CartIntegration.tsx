import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const CartIntegration: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Cart Integration Component</h2>
      <button
        onClick={() =>
          dispatch(
            addToCart({
              id: 1,
              title: 'Test Product',
              price: 10,
              description: 'A test product for demonstration purposes.',
              category: 'Test Category',
              image: 'https://via.placeholder.com/150',
              rating: { rate: 5, count: 1 }
            })
          )
        }
      >
        Add to Cart
      </button>
    </div>
  );
};

export default CartIntegration; 
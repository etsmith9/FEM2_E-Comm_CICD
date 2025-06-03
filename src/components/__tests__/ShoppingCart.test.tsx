import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../store/cartSlice';
import ShoppingCart from '../ShoppingCart';

// Mock the Redux store
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      cart: cartReducer
    },
    preloadedState: {
      cart: initialState
    }
  });
};

describe('ShoppingCart Component', () => {
  const mockCartItems = [
    {
      id: 1,
      title: 'Test Product',
      price: 99.99,
      quantity: 2,
      image: 'test-image.jpg',
    },
  ];

  it('renders cart items correctly', () => {
    const store = createMockStore({ items: mockCartItems });
    
    render(
      <Provider store={store}>
        <ShoppingCart />
      </Provider>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('displays empty cart message when cart is empty', () => {
    const store = createMockStore({ items: [] });
    
    render(
      <Provider store={store}>
        <ShoppingCart />
      </Provider>
    );

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });
}); 
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../store/cartSlice';
import ShoppingCart from '../ShoppingCart';

beforeAll(() => {
  Object.defineProperty(window, 'sessionStorage', {
    value: {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    },
    writable: true,
  });
});

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
      description: 'Test Description',
      category: 'test',
      rating: {
        rate: 4.5,
        count: 100
      }
    },
  ];

  it('renders cart items correctly', () => {
    const store = createMockStore({ items: mockCartItems });
    
    render(
      <Provider store={store}>
        <ShoppingCart />
      </Provider>
    );

    expect(screen.getByRole('heading', { name: 'Test Product' })).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByTestId('quantity-value')).toHaveTextContent('2');
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
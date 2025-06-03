import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import cartReducer from '../../store/cartSlice';
import CartIntegration from '../../pages/CartIntegration';

// Mock the Products component
vi.mock('../../pages/Products', () => ({
  default: () => (
    <div>
      <button onClick={() => {}}>Add to Cart</button>
    </div>
  ),
}));

// Create a new QueryClient for each test
const createQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
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

describe('CartIntegration Component', () => {
  it('adds product to cart', () => {
    const store = createMockStore({ items: [] });
    const queryClient = createQueryClient();
    
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <CartIntegration />
        </Provider>
      </QueryClientProvider>
    );

    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);

    // Verify cart state was updated
    const state = store.getState();
    expect(state.cart.items.length).toBeGreaterThan(0);
  });
}); 
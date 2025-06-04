import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import cartReducer from '../../store/cartSlice';
import CartIntegration from '../CartIntegration';

vi.mock('../../pages/Products', () => ({
  default: () => (
    <div>
      <button onClick={() => {}}>Add to Cart</button>
    </div>
  ),
}));

const createQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const createMockStore = (initialState: { items: any[] } = { items: [] }) => {
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

    const state = store.getState();
    expect(state.cart.items.length).toBeGreaterThan(0);
  });
}); 
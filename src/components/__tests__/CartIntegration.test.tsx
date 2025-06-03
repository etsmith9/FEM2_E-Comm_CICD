import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from '../../contexts/CartContext';
import Products from '../../pages/Products';

// Mock the Products component
vi.mock('../../pages/Products', () => ({
  default: () => (
    <div>
      <button>Add to Cart</button>
    </div>
  ),
}));

describe('Cart Integration', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 99.99,
    description: 'Test Description',
    imageUrl: 'test.jpg',
    category: 'test',
    stock: 10
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  it('updates cart when adding a product', () => {
    const store = configureStore({
      reducer: {
        products: (state = { items: [mockProduct] }) => state
      }
    });

    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            <Products />
          </CartProvider>
        </QueryClientProvider>
      </Provider>
    );

    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);

    expect(screen.getByText('Added to Cart!')).toBeInTheDocument();
  });
}); 
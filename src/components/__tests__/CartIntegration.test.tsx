import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { CartProvider } from '../../contexts/CartContext';
import Products from '../../pages/Products';

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

  it('updates cart when adding a product', () => {
    const store = configureStore({
      reducer: {
        products: (state = { items: [mockProduct] }) => state
      }
    });

    render(
      <Provider store={store}>
        <CartProvider>
          <Products />
        </CartProvider>
      </Provider>
    );

    // Find and click the add to cart button
    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);

    // Verify the button text changes
    expect(screen.getByText('Added to Cart!')).toBeInTheDocument();
  });
}); 
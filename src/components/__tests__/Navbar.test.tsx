import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { AuthProvider } from '../../contexts/AuthContext';
import Navbar from '../Navbar';

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      cart: (state = initialState) => state,
    },
  });
};

describe('Navbar Component', () => {
  it('renders navigation links', () => {
    const store = createMockStore({ items: [] });
    
    render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <Navbar />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
  });

  it('displays cart item count', () => {
    const store = createMockStore({ items: [{ id: 1, quantity: 2 }] });
    
    render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <Navbar />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );

    expect(screen.getByText('2')).toBeInTheDocument();
  });
}); 
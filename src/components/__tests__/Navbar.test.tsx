import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../store/cartSlice';
import Navbar from '../Navbar';

// Mock AuthContext
const mockUseAuth = vi.fn();
vi.mock('../../contexts/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useAuth: () => mockUseAuth()
}));

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

describe('Navbar Component', () => {
  it('renders navigation links for unauthenticated user', () => {
    const store = createMockStore({ items: [] });
    mockUseAuth.mockReturnValue({
      currentUser: null,
      logout: vi.fn(),
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/e-commerce store/i)).toBeInTheDocument();
    expect(screen.getByText(/products/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByText(/register/i)).toBeInTheDocument();
  });

  it('renders navigation links for authenticated user', () => {
    const store = createMockStore({ items: [{ id: 1, quantity: 2 }] });
    mockUseAuth.mockReturnValue({
      currentUser: { uid: '1', email: 'test@example.com' },
      logout: vi.fn(),
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/e-commerce store/i)).toBeInTheDocument();
    expect(screen.getByText(/products/i)).toBeInTheDocument();
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
    expect(screen.getByText(/orders/i)).toBeInTheDocument();
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it('renders cart link for authenticated user', () => {
    const store = createMockStore({ items: [{ id: 1, quantity: 2 }] });
    mockUseAuth.mockReturnValue({
      currentUser: { uid: '1', email: 'test@example.com' },
      logout: vi.fn(),
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    const cartLink = screen.getByText(/cart/i);
    expect(cartLink).toBeInTheDocument();
    expect(cartLink.closest('a')).toHaveAttribute('href', '/cart');
  });
}); 
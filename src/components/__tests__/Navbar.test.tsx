import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../store/cartSlice';
import { AuthProvider, AuthContext } from '../../contexts/AuthContext';
import Navbar from '../Navbar';

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
  beforeEach(() => {
    vi.mock('../../contexts/AuthContext', async () => {
      const actual = await vi.importActual<typeof import('../../contexts/AuthContext')>('../../contexts/AuthContext');
      return {
        ...actual,
        useAuth: vi.fn().mockReturnValue({
          currentUser: null,
          logout: vi.fn(),
        }),
      };
    });
  });

  it('renders navigation links for unauthenticated user', () => {
    const store = createMockStore({ items: [] });
    act(() => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <AuthProvider>
              <Navbar />
            </AuthProvider>
          </BrowserRouter>
        </Provider>
      );
    });
    expect(screen.getByText(/e-commerce store/i)).toBeInTheDocument();
    expect(screen.getByText(/products/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByText(/register/i)).toBeInTheDocument();
  });

  it('renders navigation links for authenticated user', () => {
    vi.mocked(require('../../contexts/AuthContext').useAuth).mockReturnValue({
      currentUser: { uid: '1', email: 'test@example.com' },
      logout: vi.fn(),
    });
    const store = createMockStore({ items: [{ id: 1, quantity: 2 }] });
    act(() => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <AuthProvider>
              <Navbar />
            </AuthProvider>
          </BrowserRouter>
        </Provider>
      );
    });
    expect(screen.getByText(/e-commerce store/i)).toBeInTheDocument();
    expect(screen.getByText(/products/i)).toBeInTheDocument();
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
    expect(screen.getByText(/orders/i)).toBeInTheDocument();
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it('displays cart item count', () => {
    const store = createMockStore({ items: [{ id: 1, quantity: 2 }] });
    act(() => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <AuthProvider>
              <Navbar />
            </AuthProvider>
          </BrowserRouter>
        </Provider>
      );
    });
    expect(screen.getByText('2')).toBeInTheDocument();
  });
}); 
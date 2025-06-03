import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../store/cartSlice';
import { AuthProvider } from '../../contexts/AuthContext';
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
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
      currentUser: null,
      logout: vi.fn(),
    });
  });

  it('renders navigation links', () => {
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
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
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
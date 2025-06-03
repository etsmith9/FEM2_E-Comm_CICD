import { describe, it, expect, vi } from 'vitest';
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

// Mock the AuthContext
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    currentUser: null,
    logout: vi.fn(),
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Navbar Component', () => {
  it('renders navigation links', () => {
    const store = createMockStore({ items: [] });
    
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <Navbar />
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
  });

  it('displays cart item count', () => {
    const store = createMockStore({ items: [{ id: 1, quantity: 2 }] });
    
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <Navbar />
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('2')).toBeInTheDocument();
  });
}); 
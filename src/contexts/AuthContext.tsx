import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  deleteUser
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

interface User {
  uid: string;
  email: string | null;
  name?: string;
  address?: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          email: user.email,
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (email: string, password: string) => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      const trimmedEmail = email.trim();

      console.log('Attempting to create user with email:', trimmedEmail);
      
      const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
      const user = userCredential.user;
      
      console.log('User created successfully:', user.uid);
      
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      console.log('User document created in Firestore');
    } catch (_error) {
      // Registration error handled above
      if (_error instanceof FirebaseError) {
        switch (_error.code) {
          case 'auth/email-already-in-use':
            throw new Error('Email is already registered');
          case 'auth/invalid-email':
            throw new Error('Invalid email format');
          case 'auth/weak-password':
            throw new Error('Password is too weak');
          case 'auth/operation-not-allowed':
            throw new Error('Email/password accounts are not enabled. Please contact support.');
          case 'auth/network-request-failed':
            throw new Error('Network error. Please check your internet connection.');
          default:
            console.error('Firebase error code:', _error.code);
            throw new Error('Failed to create account. Please try again.');
        }
      }
      throw _error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (_error) {
      if (_error instanceof FirebaseError) {
        switch (_error.code) {
          case 'auth/user-not-found':
            throw new Error('No account found with this email');
          case 'auth/wrong-password':
            throw new Error('Incorrect password');
          case 'auth/invalid-email':
            throw new Error('Invalid email format');
          case 'auth/network-request-failed':
            throw new Error('Network error. Please check your internet connection.');
          default:
            throw new Error('Failed to login');
        }
      }
      throw _error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch {
      throw new Error('Failed to logout');
    }
  };

  const deleteAccount = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No user is currently signed in');
      }
      await deleteUser(user);
      setCurrentUser(null);
    } catch (_error) {
      console.error('Error deleting account:', _error);
      throw _error;
    }
  };

  const value = {
    currentUser,
    loading,
    register,
    login,
    logout,
    deleteAccount
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 
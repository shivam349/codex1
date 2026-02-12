'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  updateProfile 
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

const AuthContext = createContext({
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  updateUserProfile: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a FirebaseAuthProvider');
  }
  return context;
};

export function FirebaseAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log('Auth state changed:', currentUser?.email);
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      
      // ✅ CORRECT: auth is first parameter
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      console.log('User signed in successfully:', userCredential.user.uid);
      return { user: userCredential.user, error: null };
    } catch (error) {
      console.log('Sign in error code:', error.code);
      console.log('Sign in error message:', error.message);
      
      let errorMessage = error.message;
      
      // Handle specific error codes
      if (error.code === 'auth/internal-error') {
        errorMessage = 'Authentication service error. Please check your internet connection and try again.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (error.code === 'auth/argument-error') {
        errorMessage = 'Invalid arguments provided. Please check your email and password.';
      }
      
      return { user: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password, displayName = '') => {
    try {
      setLoading(true);
      
      // ✅ CORRECT: auth is first parameter
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      // Update profile with display name if provided
      if (displayName) {
        await updateProfile(userCredential.user, {
          displayName,
        });
      }
      
      console.log('User created successfully:', userCredential.user.uid);
      return { user: userCredential.user, error: null };
    } catch (error) {
      console.log('Sign up error code:', error.code);
      console.log('Sign up error message:', error.message);
      
      let errorMessage = error.message;
      
      // Handle specific error codes
      if (error.code === 'auth/internal-error') {
        errorMessage = 'Authentication service error. Please check your internet connection and try again.';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Email/password accounts are not enabled.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (error.code === 'auth/argument-error') {
        errorMessage = 'Invalid arguments provided. Please check your email and password.';
      }
      
      return { user: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error: error.message };
    }
  };

  const updateUserProfile = async (updates) => {
    try {
      if (user) {
        await updateProfile(user, updates);
        setUser({ ...user, ...updates });
        return { error: null };
      }
      return { error: 'No user logged in' };
    } catch (error) {
      console.error('Update profile error:', error);
      return { error: error.message };
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut: signOutUser,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

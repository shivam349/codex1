'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
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
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { user: result.user, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { user: null, error: error.message };
    }
  };

  const signUp = async (email, password, displayName = '') => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with display name if provided
      if (displayName) {
        await updateProfile(result.user, {
          displayName,
        });
      }
      
      return { user: result.user, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { user: null, error: error.message };
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

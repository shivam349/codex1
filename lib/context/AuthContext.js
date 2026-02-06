'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setUser({ token, isAdmin: true });
    }
    setIsLoading(false);
  }, []);

  const loginAdmin = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.data.token);
        setUser({ ...data.data, token: data.data.token });
        return { success: true, data: data.data };
      }

      return { success: false, message: data.message || 'Login failed' };
    } catch (error) {
      return { success: false, message: 'Login error: ' + error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setUser(null);
  };

  const isAuthenticated = () => !!user?.token;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        loginAdmin,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin as apiLoginAdmin, logoutAdmin as apiLogoutAdmin, isAdminLoggedIn } from '@/lib/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if logged in on mount
  useEffect(() => {
    if (isAdminLoggedIn()) {
      setUser({ isAdmin: true, token: localStorage.getItem('adminToken') });
    }
    setIsLoading(false);
  }, []);

  const loginAdmin = async (email, password) => {
    const result = await apiLoginAdmin(email, password);
    if (result.success) {
      setUser({ ...result.data, token: result.data.token });
    }
    return result;
  };

  const logout = () => {
    apiLogoutAdmin();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        loginAdmin,
        logout,
        isAuthenticated: () => !!user?.token,
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

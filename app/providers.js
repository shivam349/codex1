'use client';

import { AuthProvider } from '@/lib/context/AuthContext';
import { CartProvider } from '@/lib/context/CartContext';
import { FirebaseAuthProvider } from '@/lib/context/FirebaseAuthContext';

export function Providers({ children }) {
  return (
    <AuthProvider>
      <FirebaseAuthProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </FirebaseAuthProvider>
    </AuthProvider>
  );
}

'use client';

import { SessionProvider } from 'next-auth/react';
import AuthModal from '@/components/AuthModal';

export function Providers({ children }) {
  return (
    <SessionProvider>
      <AuthModal />
      {children}
    </SessionProvider>
  );
}

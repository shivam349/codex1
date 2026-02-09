import './globals.css';
import { CartProvider } from '@/lib/context/CartContext';
import { AuthProvider } from '@/lib/context/AuthContext';
import { Providers } from './providers';
import Navigation from '@/components/Navigation';
import { ClerkProvider } from '@clerk/nextjs';
import ClerkHeader from '@/components/ClerkHeader';

export const metadata = {
  title: 'Mithila Makhana 3D Store - Premium Lotus Seeds',
  description: 'Experience authentic Mithila makhana with immersive 3D shopping. Premium quality lotus seeds, organic certified, and delivered fresh. Shop now!'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-gray-900">
        <ClerkProvider>
          <Providers>
            <AuthProvider>
              <CartProvider>
                <ClerkHeader />
                <Navigation />
                {children}
              </CartProvider>
            </AuthProvider>
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}


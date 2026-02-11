import './globals.css';
import { CartProvider } from '@/lib/context/CartContext';
import { AuthProvider } from '@/lib/context/AuthContext';
import { FirebaseAuthProvider } from '@/lib/context/FirebaseAuthContext';
import { Providers } from './providers';
import Navigation from '@/components/Navigation';
import FirebaseHeader from '@/components/FirebaseHeader';

export const metadata = {
  title: 'Mithila Makhana 3D Store - Premium Lotus Seeds',
  description:
    'Experience authentic Mithila makhana with immersive 3D shopping. Premium quality lotus seeds, organic certified, and delivered fresh. Shop now!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-gray-900">
        <FirebaseAuthProvider>
          <Providers>
            <AuthProvider>
              <CartProvider>
                <FirebaseHeader />
                <Navigation />
                {children}
              </CartProvider>
            </AuthProvider>
          </Providers>
        </FirebaseAuthProvider>
      </body>
    </html>
  );
}


'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/lib/context/CartContext';
import { useAuth } from '@/lib/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { getTotalItems } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const { data: session, status } = useSession();
  const router = useRouter();
  const totalItems = getTotalItems();

  // Ensure hydration match by only rendering interactive elements after client-side load
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleUserLogout = async () => {
    await signOut({ redirect: false });
    setShowUserMenu(false);
    router.push('/');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-makhana-600">
            Mithila Makhana
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-gray-700 hover:text-makhana-600 transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            href="#products"
            className="text-gray-700 hover:text-makhana-600 transition-colors font-medium"
          >
            Products
          </Link>
          <Link
            href="#about"
            className="text-gray-700 hover:text-makhana-600 transition-colors font-medium"
          >
            About
          </Link>

          {/* User Authentication */}
          {isClient && session?.user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 text-gray-700 hover:text-makhana-600 transition-colors"
              >
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name}
                    className="w-8 h-8 rounded-full border border-makhana-500"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-makhana-500 text-white flex items-center justify-center text-sm font-medium">
                    {session.user.name?.[0] || session.user.email?.[0]}
                  </div>
                )}
                <span className="hidden sm:inline text-sm font-medium">
                  {session.user.name || session.user.email}
                </span>
              </button>

              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-card border border-makhana-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-makhana-100 text-sm">
                      <p className="font-medium text-gray-700">
                        {session.user.name || 'Account'}
                      </p>
                      <p className="text-xs text-gray-500">{session.user.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-makhana-50 text-sm"
                      onClick={() => setShowUserMenu(false)}
                    >
                      👤 My Profile
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-makhana-50 text-sm"
                      onClick={() => setShowUserMenu(false)}
                    >
                      📦 Orders
                    </Link>
                    <button
                      onClick={handleUserLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 text-sm border-t border-makhana-100"
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : isClient && status !== 'loading' ? (
            <Link
              href="/sign-in"
              className="text-gray-700 hover:text-makhana-600 transition-colors font-medium"
            >
              👤 Sign In
            </Link>
          ) : null}

          {/* Admin Authentication */}
          {isAuthenticated() ? (
            <>
              <Link
                href="/admin/dashboard"
                className="text-gray-700 hover:text-makhana-600 transition-colors font-medium"
              >
                🔧 Admin
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600 transition-colors font-medium"
              >
                Admin Logout
              </button>
            </>
          ) : (
            <Link
              href="/admin-login"
              className="text-gray-700 hover:text-makhana-600 transition-colors font-medium"
            >
              🔐 Admin
            </Link>
          )}

          <Link
            href="/cart"
            className="btn-primary relative"
          >
            🛒 Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

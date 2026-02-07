'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/lib/context/CartContext';
import { useAuth } from '@/lib/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { getTotalItems } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const totalItems = getTotalItems();

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            Mithila Makhana
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            href="#products"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            Products
          </Link>
          <Link
            href="#about"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            About
          </Link>

          {isAuthenticated() ? (
            <>
              <Link
                href="/admin/dashboard"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                🔧 Admin
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600 transition-colors font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/admin-login"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              🔐 Admin Login
            </Link>
          )}

          <Link
            href="/cart"
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all relative"
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

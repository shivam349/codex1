'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
            Mithila Makhana
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            href="#products"
            className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
          >
            Products
          </Link>
          <Link
            href="#about"
            className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
          >
            About
          </Link>
          <button className="bg-gradient-to-r from-amber-600 to-orange-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all">
            Cart (0)
          </button>
        </div>
      </div>
    </nav>
  );
}

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/FirebaseAuthContext';
import { useState } from 'react';

export default function FirebaseHeader() {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <header className="flex justify-between items-center p-4 gap-4 h-16 bg-white border-b border-gray-200">
      <div className="text-xl font-bold text-gray-800">Mithila Makhana</div>
      
      <div className="flex justify-end items-center gap-4">
        {loading ? (
          <div className="text-sm text-gray-500">Loading...</div>
        ) : !user ? (
          <>
            <Link href="/sign-in?mode=signin">
              <button className="text-gray-700 hover:text-gray-900 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign In
              </button>
            </Link>
            <Link href="/sign-in?mode=signup">
              <button className="bg-blue-600 text-white rounded-lg font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer hover:bg-blue-700 transition-colors">
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline text-sm">{user.displayName || user.email}</span>
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <p className="font-semibold text-gray-900">{user.displayName || 'User'}</p>
                  <p className="text-xs text-gray-600">{user.email}</p>
                </div>
                <Link href="/profile" className="block w-full">
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50">
                    Profile
                  </button>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

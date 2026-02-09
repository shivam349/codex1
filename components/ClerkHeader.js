'use client';

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 gap-4 h-16 bg-white border-b border-gray-200">
      <div className="text-xl font-bold text-gray-800">Mithila Makhana</div>
      
      <div className="flex justify-end items-center gap-4">
        {/* Show the sign-in and sign-up buttons when the user is signed out */}
        <SignedOut>
          <SignInButton mode="modal">
            <button className="text-gray-700 hover:text-gray-900 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="bg-blue-600 text-white rounded-lg font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer hover:bg-blue-700 transition-colors">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        
        {/* Show the user button when the user is signed in */}
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
}

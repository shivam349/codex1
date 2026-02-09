'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isSignUp) {
        // Register
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              password,
              name,
            }),
          }
        );

        const data = await res.json();

        if (res.ok) {
          setMessage(
            'Registration successful! Please check your email to verify your account.'
          );
          setEmail('');
          setPassword('');
          setName('');
          setTimeout(() => {
            router.push('/check-email?email=' + encodeURIComponent(email));
          }, 2000);
        } else {
          setMessage(data.message || 'Registration failed');
        }
      } else {
        // Sign in with credentials
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user-login`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

        const data = await res.json();

        if (res.ok) {
          // Store token and redirect
          localStorage.setItem('token', data.data.token);
          setMessage('Login successful!');
          setTimeout(() => {
            router.push('/');
          }, 1000);
        } else {
          setMessage(data.message || 'Login failed');
        }
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Auth error:', error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Mithila Makhana
            </h1>
            <p className="text-gray-600 mt-2">
              {isSignUp ? 'Create an account' : 'Welcome back'}
            </p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              Authentication failed. Please try again.
            </div>
          )}

          {message && (
            <div
              className={`mb-4 p-3 rounded-lg text-sm ${
                message.includes('successful')
                  ? 'bg-green-50 border border-green-200 text-green-700'
                  : 'bg-yellow-50 border border-yellow-200 text-yellow-700'
              }`}
            >
              {message}
            </div>
          )}

          {/* Note: Google Sign In via Clerk in header */}
          <p className="text-sm text-gray-600 text-center mb-6">
            Use <strong>Clerk</strong> (top right) for Google authentication
          </p>

          {/* Email Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={isSignUp ? 'Create a password' : 'Enter your password'}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading
                ? 'Processing...'
                : isSignUp
                  ? 'Create Account & Verify Email'
                  : 'Sign In'}
            </button>
          </form>

          {/* Toggle Sign Up / Sign In */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isSignUp
                ? 'Already have an account? '
                : "Don't have an account? "}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setMessage('');
                }}
                className="text-blue-600 font-medium hover:underline"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>

          {/* Link to Admin */}
          <div className="mt-4 pt-4 border-t border-gray-200 text-center">
            <Link
              href="/admin-login"
              className="text-sm text-gray-600 hover:text-blue-600 font-medium"
            >
              🔐 Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignIn() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}

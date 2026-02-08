'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import Link from 'next/link';

function CheckEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleResendEmail = async () => {
    if (!email) return;

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/resend-verification`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage('Verification email resent successfully!');
      } else {
        setMessage(data.message || 'Failed to resend email');
      }
    } catch (error) {
      console.error('Resend error:', error);
      setMessage('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 rounded-full p-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Check Your Email
          </h1>

          <p className="text-gray-600 mb-2">
            We've sent a verification email to:
          </p>

          <p className="text-lg font-medium text-blue-600 mb-6">
            {email || 'your email address'}
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-700">
              <strong>What's next?</strong>
            </p>
            <ul className="text-sm text-gray-600 mt-2 space-y-2">
              <li>✓ Open your email inbox</li>
              <li>✓ Look for an email from Mithila Makhana</li>
              <li>✓ Click the "Verify Email" button</li>
              <li>✓ You'll be automatically signed in</li>
            </ul>
          </div>

          {message && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {message}
            </div>
          )}

          <p className="text-sm text-gray-600 mb-6">
            Email not received? Check your spam folder or resend below.
          </p>

          <button
            onClick={handleResendEmail}
            disabled={loading || !email}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 mb-3"
          >
            {loading ? 'Resending...' : 'Resend Verification Email'}
          </button>

          <Link
            href="/sign-in"
            className="block text-center py-2 text-gray-600 hover:text-blue-600 font-medium"
          >
            Back to Sign In
          </Link>

          <Link
            href="/"
            className="block text-center py-2 text-gray-600 hover:text-blue-600 font-medium border-t border-gray-200 mt-4"
          >
            Continue as Guest
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckEmail() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <CheckEmailContent />
    </Suspense>
  );
}

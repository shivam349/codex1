'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/context/FirebaseAuthContext';

/**
 * Example component demonstrating email verification features
 * This shows how to:
 * 1. Check if user's email is verified
 * 2. Resend verification email
 * 3. Refresh verification status
 */
export function EmailVerificationExample() {
  const { user, isEmailVerified, resendVerificationEmail, checkEmailVerification } = useAuth();
  const [resending, setResending] = useState(false);
  const [checking, setChecking] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  if (!user) {
    return <div>Please sign in first</div>;
  }

  const handleResendVerification = async () => {
    setResending(true);
    setMessage('');
    setError('');

    try {
      const { error: resendError } = await resendVerificationEmail();

      if (resendError) {
        setError(resendError);
      } else {
        setMessage('Verification email sent! Check your inbox.');
      }
    } catch (err) {
      setError('Failed to resend verification email');
      console.error(err);
    } finally {
      setResending(false);
    }
  };

  const handleCheckVerification = async () => {
    setChecking(true);
    setMessage('');
    setError('');

    try {
      const { isVerified, error: checkError } = await checkEmailVerification();

      if (checkError) {
        setError(checkError);
      } else if (isVerified) {
        setMessage('✓ Your email is verified!');
      } else {
        setMessage('⚠ Email not yet verified. Please check your inbox.');
      }
    } catch (err) {
      setError('Failed to check verification status');
      console.error(err);
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-4">Email Verification Status</h2>

      {/* User Info */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          <strong>Verification Status:</strong>{' '}
          {isEmailVerified ? (
            <span className="text-green-600 font-semibold">✓ Verified</span>
          ) : (
            <span className="text-amber-600 font-semibold">✗ Not Verified</span>
          )}
        </p>
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {message && (
        <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200">
          <p className="text-green-600 text-sm">{message}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleResendVerification}
          disabled={resending || isEmailVerified}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {resending ? 'Sending...' : 'Resend Verification Email'}
        </button>

        <button
          onClick={handleCheckVerification}
          disabled={checking}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {checking ? 'Checking...' : 'Refresh Status'}
        </button>
      </div>

      {/* Instructions */}
      {!isEmailVerified && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">Email Not Verified</h3>
          <ol className="text-blue-700 text-sm space-y-2 list-decimal list-inside">
            <li>Check your email inbox for a verification link</li>
            <li>If you don't see it, check your spam folder</li>
            <li>Click the verification link in the email</li>
            <li>Come back here and click "Refresh Status" to confirm</li>
            <li>If the email is not received, click "Resend Verification Email" above</li>
          </ol>
        </div>
      )}

      {isEmailVerified && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="font-semibold text-green-900">✓ Email Verified</h3>
          <p className="text-green-700 text-sm mt-2">
            Your email has been successfully verified. You now have full access to all features.
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * Example: Protecting a component until email is verified
 */
export function ProtectedFeature() {
  const { user, isEmailVerified, resendVerificationEmail } = useAuth();

  if (!user) {
    return <div>Please sign in to access this feature</div>;
  }

  if (!isEmailVerified) {
    return (
      <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
        <h3 className="font-semibold text-yellow-900 mb-2">Email Verification Required</h3>
        <p className="text-yellow-700 text-sm mb-4">
          Please verify your email address to access this feature.
        </p>
        <button
          onClick={resendVerificationEmail}
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-all"
        >
          Resend Verification Email
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg">
      <h3 className="font-semibold text-gray-900 mb-2">Exclusive Feature</h3>
      <p className="text-gray-700">
        This feature is only available to users with verified email addresses.
      </p>
      {/* Your protected content here */}
    </div>
  );
}

/**
 * Example: Checking multiple verification conditions
 */
export function AdvancedVerificationCheck() {
  const { user, isEmailVerified } = useAuth();

  const canAccessCheckout = user && isEmailVerified;
  const canAccessAccount = user; // Can access without verification
  const canAccessPremium = user && isEmailVerified; // Requires verification

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-lg border" style={{
        backgroundColor: canAccessAccount ? '#dbeafe' : '#fee2e2',
        borderColor: canAccessAccount ? '#0284c7' : '#ef4444'
      }}>
        <p className="font-medium">Account Access: {canAccessAccount ? '✓ Available' : '✗ Restricted'}</p>
      </div>

      <div className="p-4 rounded-lg border" style={{
        backgroundColor: canAccessCheckout ? '#dbeafe' : '#fee2e2',
        borderColor: canAccessCheckout ? '#0284c7' : '#ef4444'
      }}>
        <p className="font-medium">Checkout: {canAccessCheckout ? '✓ Available' : '✗ Verify email first'}</p>
      </div>

      <div className="p-4 rounded-lg border" style={{
        backgroundColor: canAccessPremium ? '#dbeafe' : '#fee2e2',
        borderColor: canAccessPremium ? '#0284c7' : '#ef4444'
      }}>
        <p className="font-medium">Premium Features: {canAccessPremium ? '✓ Available' : '✗ Verify email first'}</p>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { gsap } from 'gsap';

export default function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('signin'); // 'signin' or 'signup'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const pathname = usePathname();

  // Check if modal should be shown
  useEffect(() => {
    setIsClient(true);
    
    // Don't show on auth pages
    const authPages = ['/sign-in', '/check-email', '/verify-email', '/admin-login', '/cart'];
    if (authPages.includes(pathname)) {
      setIsOpen(false);
      return;
    }
    
    // Don't show modal if user is logged in
    if (status === 'authenticated' || session?.user) {
      setIsOpen(false);
      return;
    }

    // Check if modal was already closed
    const modalClosed = localStorage.getItem('authModalClosed');
    const closedTime = modalClosed ? parseInt(modalClosed) : 0;
    const now = Date.now();
    const oneDayInMs = 24 * 60 * 60 * 1000;

    // Only show if not closed in the last 24 hours
    if (!modalClosed || now - closedTime > oneDayInMs) {
      setIsOpen(true);
    }
  }, [status, session, pathname]);

  // Animate modal entry
  useEffect(() => {
    if (isOpen && contentRef.current) {
      gsap.from(contentRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 20,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isOpen]);

  const handleClose = () => {
    // Remember that user closed the modal (for 24 hours)
    localStorage.setItem('authModalClosed', Date.now().toString());
    
    // Animate out
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 20,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setIsOpen(false);
        },
      });
    } else {
      setIsOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError(''); // Clear error on input change
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return false;
    }

    if (activeTab === 'signup') {
      if (!formData.name) {
        setError('Name is required for signup');
        return false;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const endpoint = activeTab === 'signin' 
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/login`
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/register`;

      const payload = activeTab === 'signin'
        ? { email: formData.email, password: formData.password }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      // Store token
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      // Close modal and redirect
      handleClose();

      // Redirect based on what was done
      if (activeTab === 'signup') {
        // For signup, redirect to check-email or home
        router.push('/check-email?email=' + encodeURIComponent(formData.email));
      } else {
        // For signin, redirect home
        router.push('/');
        router.refresh();
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isClient || !isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={handleClose}
        aria-label="Close modal"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
      >
        <div
          ref={contentRef}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-makhana-500 to-makhana-600 px-8 py-6 relative">
            <h2 className="text-2xl font-bold text-white text-center">
              Mithila Makhana
            </h2>
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => {
                setActiveTab('signin');
                setError('');
              }}
              className={`flex-1 py-4 font-medium transition-colors text-center ${
                activeTab === 'signin'
                  ? 'bg-makhana-50 text-makhana-600 border-b-2 border-makhana-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setActiveTab('signup');
                setError('');
              }}
              className={`flex-1 py-4 font-medium transition-colors text-center ${
                activeTab === 'signup'
                  ? 'bg-makhana-50 text-makhana-600 border-b-2 border-makhana-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <div className="p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field - only for signup */}
              {activeTab === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 transition-all"
                    disabled={loading}
                  />
                </div>
              )}

              {/* Email field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 transition-all"
                  disabled={loading}
                />
              </div>

              {/* Password field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 transition-all"
                  disabled={loading}
                />
              </div>

              {/* Confirm password - only for signup */}
              {activeTab === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-makhana-500 transition-all"
                    disabled={loading}
                  />
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-makhana-500 to-makhana-600 text-white font-medium py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {activeTab === 'signin' ? 'Signing in...' : 'Creating account...'}
                  </span>
                ) : (
                  activeTab === 'signin' ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="w-full mt-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Maybe later
            </button>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 text-center text-sm text-gray-600">
            <p>
              {activeTab === 'signin' 
                ? "Don't have an account? " 
                : 'Already have an account? '}
              <button
                onClick={() => {
                  setActiveTab(activeTab === 'signin' ? 'signup' : 'signin');
                  setError('');
                }}
                className="text-makhana-600 font-medium hover:underline"
              >
                {activeTab === 'signin' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

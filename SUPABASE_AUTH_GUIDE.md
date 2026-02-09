# Supabase Authentication Setup Guide

## Overview
This application now uses Supabase for authentication, providing a complete sign-in/sign-up system with email verification.

## What Was Created

### 1. Core Files

#### `/lib/supabase.js`
Central Supabase configuration and authentication service with helper functions:
- `signUp()` - Create new user accounts
- `signIn()` - Authenticate existing users
- `signOut()` - Log out users
- `getCurrentUser()` - Get current authenticated user
- `getSession()` - Get current session
- `resetPassword()` - Send password reset emails
- `updatePassword()` - Update user password
- `onAuthStateChange()` - Listen to auth state changes

#### `/lib/context/SupabaseAuthContext.js`
React Context provider for accessing authentication state throughout the app:
- Provides `user`, `session`, `loading` state
- Auto-refreshes tokens
- Listens to auth state changes

#### `/app/sign-in/page.js`
Complete sign-in/sign-up form with:
- Toggle between sign-in and sign-up modes
- Email and password validation
- Loading states and error handling
- Success messages
- Automatic redirect after authentication

#### `/components/UserProfile.js`
Example component showing authenticated user with:
- User avatar
- Dropdown menu
- Sign-out functionality
- Profile and cart links

### 2. Environment Variables

#### `.env.local`
```env
NEXT_PUBLIC_SUPABASE_URL=https://ripuqurjizppxcbjcxuy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_gi02V3kbfjTJwlks7Ye-zg_v7mBW0J4
```

## Setup Instructions

### 1. Supabase Project Setup

1. **Create Authentication Table** (Optional - Supabase manages this)
   Supabase automatically creates and manages the `auth.users` table.

2. **Enable Email Authentication**
   - Go to your Supabase dashboard
   - Navigate to Authentication → Providers
   - Ensure "Email" is enabled
   - Configure email templates if needed

3. **Email Verification Settings**
   - Authentication → Settings
   - Enable "Confirm email" for better security
   - Customize email templates (optional)

4. **Custom Email Templates** (Optional)
   Go to Authentication → Email Templates to customize:
   - Confirmation email
   - Magic link email
   - Password reset email
   - Email change email

### 2. Application Integration

#### Using the Auth Context

In any component, use the `useAuth` hook:

```javascript
'use client';

import { useAuth } from '@/lib/context/SupabaseAuthContext';

export default function MyComponent() {
  const { user, loading, signOut } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <div>Please sign in</div>;
  }

  return (
    <div>
      <p>Welcome, {user.email}!</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

#### Protecting Routes

Create a protected route wrapper:

```javascript
'use client';

import { useAuth } from '@/lib/context/SupabaseAuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/sign-in');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return children;
}
```

Then use it in your pages:

```javascript
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div>Your protected content</div>
    </ProtectedRoute>
  );
}
```

## Features

### ✅ Implemented

- [x] User sign-up with email and password
- [x] User sign-in with email and password
- [x] Email verification (handled by Supabase)
- [x] Sign-out functionality
- [x] Session management and auto-refresh
- [x] Auth state persistence
- [x] Protected routes
- [x] User profile component
- [x] Error handling and loading states

### 🚀 Available to Implement

- [ ] Password reset functionality
- [ ] Social authentication (Google, GitHub, etc.)
- [ ] Magic link authentication
- [ ] Multi-factor authentication (MFA)
- [ ] User profile updates
- [ ] Account deletion

## Using Supabase Auth Service Directly

If you don't need the React context, use the service directly:

```javascript
import { authService } from '@/lib/supabase';

// Sign up
const { data, error } = await authService.signUp('email@example.com', 'password', {
  full_name: 'John Doe'
});

// Sign in
const { data, error } = await authService.signIn('email@example.com', 'password');

// Get current user
const { user, error } = await authService.getCurrentUser();

// Sign out
const { error } = await authService.signOut();
```

## Adding the UserProfile Component

To add the user profile button to your navigation:

```javascript
import UserProfile from '@/components/UserProfile';

export default function Navigation() {
  return (
    <nav>
      {/* Other navigation items */}
      <UserProfile />
    </nav>
  );
}
```

## Database Integration

### Creating User Profiles Table (Optional)

If you want to store additional user data:

```sql
-- In Supabase SQL Editor
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table profiles enable row level security;

-- Create policies
create policy "Users can view own profile"
  on profiles for select
  using ( auth.uid() = id );

create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );
```

### Automatically Create Profile on Sign Up

```javascript
// Add this to your lib/supabase.js signUp function
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: metadata,
    // Trigger to create profile
    emailRedirectTo: `${window.location.origin}/welcome`
  }
});

// Then create a database trigger or use Supabase functions
```

## Troubleshooting

### Issue: Email not sending
- Check Supabase email service settings
- Verify your email templates
- For production, set up a custom SMTP provider

### Issue: Auth state not persisting
- Ensure cookies are enabled in browser
- Check that localStorage is accessible
- Verify environment variables are set correctly

### Issue: "Invalid API key"
- Double-check your `.env.local` file
- Ensure you're using the **anon/public** key, not the service role key
- Restart the development server after changing environment variables

## Security Best Practices

1. **Never expose service role key** - Only use anon/public key in frontend
2. **Use Row Level Security (RLS)** - Protect your database tables
3. **Validate on server-side** - Don't trust client-side validation alone
4. **Use HTTPS** - Always in production
5. **Enable email verification** - Prevent fake accounts
6. **Implement rate limiting** - Prevent brute force attacks

## Next Steps

1. Test the sign-in/sign-up flow
2. Customize email templates in Supabase dashboard
3. Add password reset functionality
4. Implement social authentication if needed
5. Create protected routes for authenticated users
6. Set up user profiles database table
7. Add user settings page

## Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/auth-signup)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates)

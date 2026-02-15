# Email Verification Setup Guide

## Overview
Email verification has been integrated into your Firebase authentication system. When users sign up with email/password, they'll automatically receive a verification email.

## Features Implemented

### 1. **Automatic Verification Email on Sign-Up**
   - When users create an account via email/password, `sendEmailVerification()` is automatically called
   - Firebase sends a verification email to the registered email address
   - The email contains a link that users click to verify their account

### 2. **Verification Status Tracking**
   - The `FirebaseAuthContext` now tracks email verification status via `isEmailVerified` state
   - User object includes `emailVerified` property that's always up-to-date
   - The verification status is checked whenever the auth state changes

### 3. **User Feedback on Sign-Up Page**
   - After successful sign-up, users see a clear message indicating their email has been verified
   - A blue notification box appears telling them to check their inbox
   - Users are directed to check their spam folder if they don't see the email
   - Users can click "Back to Sign In" to return to the sign-in form

## How to Use

### Sign-Up Flow
```javascript
// In your component using useAuth()
import { useAuth } from '@/lib/context/FirebaseAuthContext';

const { signUp } = useAuth();

// When user submits sign-up form:
const { error } = await signUp(email, password, displayName);

if (!error) {
  // Verification email has been automatically sent
  // Show user a message to check their email
}
```

### Check Email Verification Status
```javascript
import { useAuth } from '@/lib/context/FirebaseAuthContext';

const { user, isEmailVerified, checkEmailVerification } = useAuth();

// Option 1: Use the context state (real-time)
console.log(isEmailVerified); // true or false

// Option 2: Manually refresh the verification status
const { isVerified, error } = await checkEmailVerification();
```

### Resend Verification Email
```javascript
import { useAuth } from '@/lib/context/FirebaseAuthContext';

const { resendVerificationEmail } = useAuth();

// Send verification email again
const { error } = await resendVerificationEmail();

if (!error) {
  console.log('Verification email resent');
} else {
  console.log('Failed to resend:', error);
}
```

### Restrict Access to Verified Users Only
```javascript
import { useAuth } from '@/lib/context/FirebaseAuthContext';

function ProtectedComponent() {
  const { user, isEmailVerified } = useAuth();

  if (!user) {
    return <Redirect to="/sign-in" />;
  }

  if (!isEmailVerified) {
    return (
      <div>
        <p>Please verify your email before accessing this feature</p>
        <button onClick={resendVerificationEmail}>Resend verification email</button>
      </div>
    );
  }

  return <YourContent />;
}
```

## Context API

### `useAuth()` Hook Returns

```typescript
{
  user: User | null,                    // Firebase user object
  loading: boolean,                     // Auth state loading
  isEmailVerified: boolean,             // Current email verification status
  signIn: (email, password) => Promise, // Sign in with email/password
  signUp: (email, password, name) => Promise, // Sign up (auto-sends verification email)
  signOut: () => Promise,               // Sign out user
  updateUserProfile: (updates) => Promise, // Update user profile data
  sendVerificationEmail: () => Promise,  // Send verification email to current user
  resendVerificationEmail: () => Promise, // Alias for sendVerificationEmail
  checkEmailVerification: () => Promise, // Refresh and check email verification status
}
```

## Firebase Configuration

The email verification feature uses Firebase's built-in authentication system:

1. **No Additional Setup Required** - Firebase handles email sending automatically
2. **Customizable Email Template** - Can be customized in Firebase Console:
   - Go to Firebase Console → Authentication → Templates
   - Edit the "Email verification" template

### To Customize the Verification Email Template:
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Authentication** → **Templates**
4. Click on **Email verification** template
5. Customize the subject, content, and verification link text

## User Flow

### Sign-Up Process
1. User fills in name, email, and password
2. User clicks "Sign Up" button
3. Account is created in Firebase
4. Verification email is automatically sent
5. User sees notification to check their email
6. User finds email (check spam if needed)
7. User clicks verification link in email
8. Email is marked as verified in Firebase
9. User can now access all features

### Important Notes

- **Verification email expires in 24 hours** by default (configurable in Firebase)
- **Users can still sign in** before verifying their email (if you allow it in your business logic)
- **Verification status is checked on every auth state change** for accuracy
- **The verification link is unique** and expires if not used after 24 hours

## Error Handling

Common errors and how to handle them:

```javascript
const { error } = await sendVerificationEmail();

if (error) {
  if (error.includes('too-many-requests')) {
    // Too many verification emails sent recently
    console.log('Please wait before requesting another email');
  } else if (error.includes('invalid-user-token')) {
    // User session expired
    console.log('Please sign in again');
  } else if (error.includes('network-request-failed')) {
    // Network issue
    console.log('Check your internet connection');
  }
}
```

## Integration Points

The email verification has been integrated into:

1. **FirebaseAuthContext** (`/lib/context/FirebaseAuthContext.js`)
   - Added imports: `sendEmailVerification`, `reload`
   - Added state: `isEmailVerified`
   - Added functions: `sendVerificationEmail`, `resendVerificationEmail`, `checkEmailVerification`
   - Auto-sends verification email on successful sign-up

2. **Sign-In Page** (`/app/sign-in/page.js`)
   - Shows verification prompt after sign-up
   - Informs user to check their email
   - Provides "Back to Sign In" button

3. **Firebase Configuration** (`/lib/firebase.js`)
   - Already configured with your Firebase project
   - Exports the `auth` object for use in the context

## Testing Email Verification

### Test Mode (Optional Setup)
For testing without needing a real email:

1. Create test user accounts with test email addresses
2. Use Firebase Console to manually mark emails as verified (if needed for testing)
3. Or use Firebase's demo email verification feature

### Production Mode
Firebase automatically sends real verification emails once deployed.

## Troubleshooting

### Users Not Receiving Emails
- Check spam/junk folder
- Verify email address is entered correctly
- Check Firebase Console for any email delivery issues
- Ensure your Firebase project has proper email configuration

### Emails Taking Long Time
- Firebase usually sends emails within seconds
- Network delays may cause delays (typically resolves in minutes)
- Check browser console for any JavaScript errors

### User Can't Re-verify
- Verification emails expire after 24 hours
- User can click "Resend" to get a new verification link
- Each verification email is unique

## Security Best Practices

1. **Verify email before accessing sensitive data** - Implement checks in your components
2. **Re-check verification status periodically** - Use `checkEmailVerification()` for critical operations
3. **Limit verification email sending** - Don't allow spam by resending too frequently
4. **Clear error messages** - Don't expose internal error details to users

## Next Steps

1. Test the sign-up flow with a real email address
2. Customize the verification email template in Firebase Console if desired
3. Add email verification checks to protected routes/components
4. Monitor email delivery in Firebase Analytics
5. Implement additional security measures as needed

# Authentication Setup Guide

This guide explains how to set up the complete authentication system with **Google OAuth** and **Email Verification**.

## Features

✅ **Google Sign-In** - Quick authentication with Google accounts  
✅ **Email Verification** - Secure user registration with email confirmation  
✅ **User Profiles** - User profile pages with authentication  
✅ **Admin Panel** - Separate admin login system  
✅ **Auto Sign-In** - Users are automatically signed in after email verification  
✅ **Session Management** - Secure JWT tokens and NextAuth.js sessions  

---

## Setup Instructions

### 1. Install Dependencies

Dependencies are already installed. They include:
- `next-auth` - Authentication for Next.js
- `nodemailer` - Email service for verification emails

### 2. Frontend Configuration (.env.local)

Create a `.env.local` file in the root directory:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-with: openssl rand -base64 32

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:5000

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Frontend URL (for email verification links)
FRONTEND_URL=http://localhost:3000
```

### 3. Backend Configuration (.env)

Update `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
FRONTEND_URL=http://localhost:3000

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

---

## Getting Google OAuth Credentials

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a Project" → "New Project"
3. Enter project name: e.g., "Mithila Makhana"
4. Click "Create"

### Step 2: Enable OAuth 2.0

1. In the left sidebar, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

### Step 3: Create OAuth Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add authorized redirect URIs:
   ```
   http://localhost:3000/api/auth/callback/google
   https://yourdomain.com/api/auth/callback/google
   ```
5. Click "Create"
6. Copy the **Client ID** and **Client Secret**

### Step 4: Add to .env.local

```env
GOOGLE_CLIENT_ID=your-copied-client-id
GOOGLE_CLIENT_SECRET=your-copied-client-secret
```

---

## Setting Up Email Verification

### Using Gmail (Recommended)

1. **Enable 2-Step Verification** in your Google Account
2. **Create an App Password**:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Click "App passwords" (only visible if 2FA is enabled)
   - Select "Mail" and "Windows Computer"
   - Copy the generated 16-character password

3. **Add to .env.local and backend/.env**:
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASSWORD=the-16-character-app-password
   ```

### Alternative Email Services

You can use other email services supported by nodemailer:

```env
# For Outlook/Office365
EMAIL_SERVICE=outlook

# For SendGrid
EMAIL_SERVICE=SendGrid
# Requires additional setup

# For custom SMTP
EMAIL_SERVICE=custom
EMAIL_HOST=smtp.yourserver.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email
EMAIL_PASSWORD=your-password
```

---

## API Endpoints Reference

### User Registration with Email

```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}

Response:
{
  "success": true,
  "message": "Registration successful. Please check your email to verify your account.",
  "data": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Verify Email with Token

```bash
POST /api/auth/verify-email
Content-Type: application/json

{
  "token": "verification-token-from-email"
}

Response:
{
  "success": true,
  "message": "Email verified successfully!",
  "data": {
    "id": "user-id",
    "email": "user@example.com",
    "token": "jwt-token",
    "emailVerified": "2024-01-15T10:30:00Z"
  }
}
```

### Resend Verification Email

```bash
POST /api/auth/resend-verification
Content-Type: application/json

{
  "email": "user@example.com"
}

Response:
{
  "success": true,
  "message": "Verification email sent. Please check your inbox."
}
```

### Google OAuth

```bash
POST /api/auth/google
Content-Type: application/json

{
  "googleId": "google-user-id",
  "email": "user@gmail.com",
  "name": "John Doe",
  "image": "profile-image-url"
}

Response:
{
  "success": true,
  "data": {
    "id": "user-id",
    "email": "user@gmail.com",
    "name": "John Doe",
    "token": "jwt-token",
    "emailVerified": "2024-01-15T10:30:00Z"
  }
}
```

---

## User Flows

### 1. Sign Up with Email

```
User → Sign In Page → Click "Sign Up" → 
Enter Email/Password → Submit → 
Email Verification Sent → 
Check Email → Click Verify Link → 
Auto Sign In → Redirected to Home
```

### 2. Sign In with Google

```
User → Sign In Page → Click "Sign in with Google" → 
Google Login Dialog → 
Auto Sign In → Redirected to Home
```

### 3. Existing User Email Verification

```
User → Sign In Page → Click "Sign Up" (if not already registered) →
Gets verification email → 
Click link → Auto Sign In
```

---

## File Structure

```
app/
├── api/auth/[...nextauth]/
│   └── route.js              # NextAuth configuration
├── sign-in/
│   └── page.js               # Sign in/up page with Google & Email
├── verify-email/
│   └── page.js               # Email verification page
├── check-email/
│   └── page.js               # Check email page
└── providers.js              # NextAuth SessionProvider

backend/
├── models/
│   └── User.js               # Updated with Google OAuth fields
└── routes/
    └── authRoutes.js         # Updated with new auth endpoints

components/
└── Navigation.js             # Updated with user sign in/out buttons
```

---

## Testing

### Local Testing

1. Start the backend:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend:
   ```bash
   npm run dev
   ```

3. Visit `http://localhost:3000/sign-in`

### Test Email Verification Locally

You can use a service like [Mailtrap](https://mailtrap.io/) for testing emails without sending real emails:

```env
EMAIL_SERVICE=custom
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your-mailtrap-user
EMAIL_PASSWORD=your-mailtrap-password
```

---

## Troubleshooting

### "Invalid redirect URI" Error

**Problem**: Google OAuth returns redirect URI mismatch error

**Solution**:
1. Check that your callback URI matches exactly in Google Console
2. For local development: `http://localhost:3000/api/auth/callback/google`
3. For production: `https://yourdomain.com/api/auth/callback/google`
4. Make sure `NEXTAUTH_URL` environment variable is set correctly

### "Email not sending" Error

**Problem**: Verification emails are not being received

**Solution**:
1. Check Gmail app password is correct (16 characters)
2. Verify 2-Step Authentication is enabled
3. Check `EMAIL_USER` and `EMAIL_PASSWORD` in backend/.env
4. For Gmail, use app-specific passwords, not your regular password
5. Check backend logs for nodemailer errors

### "NEXTAUTH_SECRET not provided" Error

**Solution**:
```bash
# Generate a secret
openssl rand -base64 32

# Add to .env.local
NEXTAUTH_SECRET=your-generated-secret
```

### Session Not Persisting

**Problem**: User is signed out after page refresh

**Solution**:
1. Verify `NEXTAUTH_URL` is correct
2. Check that `SessionProvider` is wrapping your app (in `app/layout.js`)
3. Verify `NEXTAUTH_SECRET` is set and consistent

---

## Security Recommendations

1. **Use strong passwords**: Enforce minimum 8 characters
2. **HTTPS only**: Use HTTPS in production (required for OAuth)
3. **Secure tokens**: Keep NEXTAUTH_SECRET and JWT_SECRET secure
4. **Email verification**: Always require email verification
5. **Rate limiting**: Add rate limiting to auth endpoints
6. **CORS configuration**: Properly configure CORS for API security

---

## Production Deployment

### Environment Variables

Update all environment variables for production:

```env
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-production-secret-key
GOOGLE_CLIENT_ID=your-production-client-id
GOOGLE_CLIENT_SECRET=your-production-client-secret
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
FRONTEND_URL=https://yourdomain.com
EMAIL_SERVICE=gmail
EMAIL_USER=noreply@yourdomain.com
EMAIL_PASSWORD=your-app-specific-password
```

### Update Google OAuth Redirect URIs

Add production URL to Google Cloud Console:
```
https://yourdomain.com/api/auth/callback/google
```

### Update Backend Configuration

Update backend/.env for production URLs and ensure CORS allows your domain.

---

## Support & Documentation

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Nodemailer Documentation](https://nodemailer.com/)
- [MongoDB Connection String](https://docs.mongodb.com/manual/reference/connection-string/)

---

## Next Steps

1. ✅ Set up Google OAuth credentials
2. ✅ Configure environment variables
3. ✅ Set up email service
4. ✅ Test sign-in and email verification
5. ✅ Deploy to production
6. ✅ Update Google OAuth redirect URIs for production domain

Happy coding! 🚀

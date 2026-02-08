# Quick Start: Google & Email Sign-In

Get up and running with sign-in in 5 minutes! 🚀

## Step 1: Create `.env.local` (2 minutes)

At the **root** of your project (same folder as `package.json`), create `.env.local`:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=mysecretkey123456789abcdefghij

GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

NEXT_PUBLIC_API_URL=http://localhost:5000

EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-digit-app-password
FRONTEND_URL=http://localhost:3000
```

## Step 2: Create Backend `.env` (1 minute)

In the `backend/` folder, create or update `.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key

FRONTEND_URL=http://localhost:3000
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-digit-app-password
```

## Step 3: Get Google Credentials (2 minutes - first time only)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project → Name it "Mithila Makhana"
3. Search "Google+ API" → Enable it
4. Go to Credentials → Create OAuth 2.0 Client ID (Web)
5. Add these URLs to "Authorized redirect URIs":
   - `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to `.env.local`

**[Detailed instructions here →](AUTHENTICATION_SETUP.md#getting-google-oauth-credentials)**

## Step 4: Set Up Email (Gmail Users)

1. Enable 2-Step Verification on your Google Account
2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
3. Select "Mail" and "Windows Computer" → Copy the 16-character password
4. Paste into `.env.local` as `EMAIL_PASSWORD`

**[Using different email service?](AUTHENTICATION_SETUP.md#setting-up-email-verification)**

## Step 5: Start the App

```bash
# Terminal 1: Start Backend
cd backend
npm run dev

# Terminal 2: Start Frontend
npm run dev
```

Visit: http://localhost:3000 → Click "Sign In" button in navigation

---

## What You Get

✅ Sign in with Google  
✅ Sign up with email + verification  
✅ Automatic email verification links  
✅ User profile with sign-out  
✅ Secure sessions with NextAuth.js  

---

## Sign-In Pages

- **User Sign-In**: `/sign-in`
- **Email Verification**: `/verify-email?token=xxx` (auto-sent in email)
- **Check Email**: `/check-email?email=your@email.com`
- **Admin Login**: `/admin-login` (still available)

---

## Troubleshooting

**"Invalid redirect URI" error?**
→ Make sure the Google OAuth redirect URL exactly matches Google Cloud Console

**Emails not arriving?**
→ Check your Gmail app password is 16 characters (not your regular password)

**Session not working?**
→ Verify `NEXTAUTH_SECRET` is set in `.env.local`

**[More help →](AUTHENTICATION_SETUP.md#troubleshooting)**

---

## File Summary

| File | Purpose |
|------|---------|
| `app/api/auth/[...nextauth]/route.js` | NextAuth configuration |
| `app/sign-in/page.js` | Sign in/up with Google & email |
| `app/verify-email/page.js` | Email verification page |
| `app/check-email/page.js` | "Check your email" page |
| `components/Navigation.js` | Updated with sign in/out buttons |
| `backend/routes/authRoutes.js` | New endpoints & email sending |
| `backend/models/User.js` | Updated User schema |

---

## Full Setup Guide

For complete instructions including production deployment, security tips, and API reference, see [AUTHENTICATION_SETUP.md](AUTHENTICATION_SETUP.md)

---

Enjoy your new sign-in system! 🎉

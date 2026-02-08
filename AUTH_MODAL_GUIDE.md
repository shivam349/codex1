# Authentication Modal Setup Guide

## Overview
A professional login/signup modal appears on first visit for unauthenticated users. The modal integrates with the existing Backend API and NextAuth session management.

## Features

✅ **Modal Behavior**
- Appears on first page load for unauthenticated users
- Uses localStorage to remember user closed it (24-hour dismissal)
- Smooth GSAP animations (fade in/out)
- Backdrop blur effect with dark overlay
- Centered, responsive design

✅ **Authentication Tabs**
- **Sign In**: Login with email and password
- **Sign Up**: Create account with name, email, password, and password confirmation

✅ **Form Validation**
- Email and password required
- Name required for signup
- Password minimum 6 characters
- Confirm password must match
- Real-time error messages

✅ **Security**
- JWT token stored in localStorage
- Backend handles password hashing (bcrypt)
- Error handling for failed requests

✅ **API Integration**
- Built on existing backend endpoints:
  - `POST /api/auth/login` - User login
  - `POST /api/auth/register` - User signup

✅ **User Experience**
- "Maybe later" button to dismiss modal
- Easy tab switching
- Loading state during submission
- Success redirects to appropriate pages
- Error messages displayed in modal

## Environment Variables

Add to `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-render-backend.onrender.com
```

Or defaults to `http://localhost:5000` for local development.

## Component Usage

The modal is automatically included in `app/providers.js` and appears on all pages.

### AuthModal Component (`components/AuthModal.js`)

**Props**: None (uses hooks for application state)

**Features**:
- `useSession()` - NextAuth session integration
- `useRouter()` - Page navigation after auth
- `localStorage` - Remember if user dismissed modal
- `gsap` - Smooth entrance/exit animations

## How It Works

### First Visit Flow
1. User visits site
2. Modal checks if user is logged in via `useSession()`
3. If not authenticated, checks localStorage for `authModalClosed`
4. If no close time or > 24 hours old, displays modal
5. User can:
   - **Sign In**: Enter email/password → redirects home
   - **Sign Up**: Enter name/email/password → redirects to `/check-email`
   - **Close**: Click "Maybe later" → modal dismissed for 24 hours

### Second Visit Flow
1. If modal was closed and < 24 hours passed: doesn't show
2. If 24 hours passed: shows again
3. If user logged in: modal never shows

### Token Management
- After successful auth, JWT token stored in `localStorage['token']`
- Backend sets this token from the response
- Can be used for additional API calls if needed

## Styling

Uses the premium makhana color system:
- **Primary Color**: `#C67C2E` (makhana-500/600)
- **Gradient**: `from-makhana-500 to-makhana-600`
- **Borders**: `border-gray-300` (inputs), `border-makhana-100` 
- **Backgrounds**: White with `bg-makhana-50` for tab active state

All styles use Tailwind classes matching the site's premium branding.

## Key Files

- **`components/AuthModal.js`** - Main modal component
- **`app/providers.js`** - Integration point (wraps app with Providers)
- **`app/layout.js`** - Root layout (includes Providers)
- **`components/Navigation.js`** - Navbar auth buttons

## Testing the Modal

1. **First Visit**: Clear localStorage
   ```javascript
   // In browser console:
   localStorage.removeItem('authModalClosed');
   location.reload();
   ```

2. **Dismiss Modal**: Click "Maybe later"
   - Modal closes
   - localStorage sets `authModalClosed` timestamp
   - Won't show for 24 hours

3. **Open Again**: 
   ```javascript
   localStorage.removeItem('authModalClosed');
   location.reload();
   ```

4. **Test Sign In**: 
   - Enter test user credentials
   - Should redirect home
   - Token stored in localStorage

5. **Test Sign Up**:
   - Fill all fields
   - Should redirect to `/check-email`
   - Account created in MongoDB

## Troubleshooting

**Modal not appearing?**
- Check if user is logged in: `useSession()` returns session
- Check localStorage: `localStorage.getItem('authModalClosed')`
- Check browser console for errors

**API requests failing?**
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Check backend is running at specified URL
- Check backend CORS settings allow frontend domain

**Styling issues?**
- Ensure tailwind.config.js has makhana color extended
- Check globals.css for brand color CSS variables
- Verify backdrop blur is supported in browser

## Browser Compatibility

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile responsive
- ✅ Backdrop blur (with fallback)
- ✅ CSS animations and transforms

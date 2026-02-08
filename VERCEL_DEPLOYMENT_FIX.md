# Vercel Deployment Fix: Pre-rendering Error

## Problem
When deploying to Vercel, you may encounter:
```
Error occurred prerendering page "/verify-email". Read more: https://nextjs.org/docs/messages/prerender-error
```

## Root Cause
Next.js tries to pre-render all pages at build time. However, pages using `useSearchParams()` (which reads URL query parameters) can't be pre-rendered because the parameters aren't available during the build.

## Solution
Added `export const dynamic = 'force-dynamic'` to all pages that use `useSearchParams()`:

### Pages Fixed
1. ✅ `app/verify-email/page.js` - Uses `token` query parameter
2. ✅ `app/check-email/page.js` - Uses `email` query parameter  
3. ✅ `app/sign-in/page.js` - Uses `error` query parameter

### What the Fix Does
```javascript
export const dynamic = 'force-dynamic';
```

This tells Next.js to:
- Skip pre-rendering this page during build
- Render it dynamically on-demand when users visit
- Always fetch fresh query parameters from the URL

## Why It Works
- **Before**: Next.js tried to build the page at build time, failed when accessing `useSearchParams()`
- **After**: Next.js skips the page at build time and renders it when needed

## Deployment Steps

### 1. Verify the Fix is Applied
Check that these files have the fix:
```bash
grep -n "export const dynamic = 'force-dynamic'" app/verify-email/page.js
grep -n "export const dynamic = 'force-dynamic'" app/check-email/page.js
grep -n "export const dynamic = 'force-dynamic'" app/sign-in/page.js
```

### 2. Test Locally
```bash
npm run build
npm run start
```

Visit `http://localhost:3000/verify-email?token=test` to verify it works.

### 3. Deploy to Vercel
```bash
git add .
git commit -m "Fix: Add export const dynamic = 'force-dynamic' to auth pages"
git push
```

The deployment should now succeed without pre-rendering errors.

## Alternative Solutions

If you still encounter issues, you can also:

### Option 1: Use Route Segments
```javascript
// In next.config.mjs or next.config.js
module.exports = {
  experimental: {
    dynamic: 'force-dynamic'
  }
}
```

### Option 2: Use Suspense Boundary
```javascript
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function Content() {
  const searchParams = useSearchParams();
  return <div>{searchParams.get('token')}</div>;
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Content />
    </Suspense>
  );
}
```

## Verification

After deployment, test these URLs on production:
- `https://yourdomain.com/verify-email?token=test-token`
- `https://yourdomain.com/check-email?email=test@example.com`
- `https://yourdomain.com/sign-in?error=true`

All should load without errors.

## Related Issues

This fix applies to all client components that use:
- `useSearchParams()`
- `useRouter()` dynamic navigation
- `usePathname()` on dynamic routes

For pages with these, always add: `export const dynamic = 'force-dynamic'`

## References
- [Next.js Dynamic Rendering](https://nextjs.org/docs/app/building-your-application/rendering/dynamic-rendering)
- [Next.js Prerender Error](https://nextjs.org/docs/messages/prerender-error)
- [Vercel Deployment Guide](https://vercel.com/docs/frameworks/nextjs)

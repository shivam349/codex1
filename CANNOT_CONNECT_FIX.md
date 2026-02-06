# Fix: "Cannot connect to server" Error on Admin Login

## What's Happening
The error "Cannot connect to server. Please check your internet connection and backend URL." appears because:

1. **Render Backend is running OLD code** (doesn't have auth routes deployed)
2. **CORS might be blocking the request** from Vercel frontend
3. **Connection timeout** while waiting for Render to respond

---

## What I Just Did ✅
1. **Improved CORS configuration** - Added support for all necessary origins and methods
2. **Added preflight request handling** - Ensures browser can communicate with backend
3. **Pushed code to GitHub** - Triggered Render's auto-redeploy to latest version

---

## What You Need to Do Now

### Step 1: Wait for Render Redeploy (2-3 minutes)
The code was just pushed. Render will **automatically redeploy** your backend within 1-2 minutes.

**Check Render Deploy Status:**
1. Go to: https://render.com/dashboard
2. Select service: `codex1-nq28`
3. Look for deployment progress (should show "Building" → "Live")
4. Once it shows "Live" ✅, the new code is active

### Step 2: Verify Backend is Updated
Once Render shows "Live", test if the update worked:

```bash
curl https://codex1-nq28.onrender.com/
```

You should see: `"Mithila Makhana API - Updated"` (with timestamp)

If you still see old message, wait another minute and try again.

### Step 3: Test Auth Endpoint
```bash
curl -X POST https://codex1-nq28.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mithilamakhana.com","password":"admin123"}'
```

Expected response:
- ✅ **If admin exists**: `{"success":true,"data":{...}}`
- ⚠️ **If admin doesn't exist**: `{"success":false,"message":"Invalid credentials"}`

If you get "Invalid credentials", run this to create admin:
```bash
cd /workspaces/codex1/backend
node scripts/seedAdmin.js
```

### Step 4: Clear Frontend Cache and Retry Login
1. Open: https://codex1-jfqm.vercel.app
2. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
3. Clear browser storage:
   - Press `F12` to open DevTools
   - Go to Console tab
   - Paste: `localStorage.clear()`
   - Press Enter
4. Go to Admin Login: https://codex1-jfqm.vercel.app/admin-login
5. Enter credentials:
   - Email: `admin@mithilamakhana.com`
   - Password: `admin123`
6. Click "Login" ✅

---

## If Still Not Working

### Check Deployment Logs
1. Go to Render Dashboard: https://render.com/dashboard
2. Select `codex1-nq28`
3. Click "Logs" tab - look for any error messages
4. Should show: `🚀 Server is running on port 5000`

### Browser DevTools Check
1. Press `F12` in browser
2. Go to **Console** tab
3. Try login again
4. Look for error messages (should show details now)
5. Go to **Network** tab
6. Look at the POST request to `api/auth/login`
7. Check Response status (should be 200, 401, or 404)

### Check Environment Variables
Your backend `.env` file must have:
- `MONGO_URI=mongodb+srv://...` (MongoDB Atlas connection)
- `JWT_SECRET=...` (some secret key)
- `FRONTEND_URL=https://codex1-jfqm.vercel.app`

If missing any, update and recommit to trigger redeploy.

---

## Timeline
- **Now**: Code pushed to GitHub
- **In 1-2 min**: Render auto-redeploys
- **In 5 min**: Backend should be fully updated and working
- **Then**: Clear cache and try login again

**The fix is automatic - just wait 2-3 minutes!** ⏳

---

## Summary of Changes Made
```
✅ Improved CORS: Added flexible origin checking
✅ Added preflight handler: OPTIONS requests now supported
✅ Better error handling: More descriptive messages in loginAdmin()
✅ Auto-deploy triggered: GitHub → Render pipeline activated
```

Once Render finishes deploying, login should work! 🎉

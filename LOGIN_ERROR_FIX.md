# Fix: Login Error - Failed to Fetch

## ⚠️ Root Cause
The `/api/auth/login` endpoint returns "Route not found" because:
1. **Backend on Render** is running an old version (needs redeploy)
2. **Admin user might not exist** in MongoDB (needs seeding)

---

## Solution

### Step 1: Whitelist Your IP in MongoDB Atlas (Required for Seeding)

The seeding script can't connect because your IP isn't whitelisted.

**Option A: Allow All IPs (Easiest for Development)**
1. Go to https://account.mongodb.com/account/login
2. Click your cluster → **Network Access**
3. Click "Edit" on any existing IP entry (or "Add IP Address")
4. Enter `0.0.0.0/0` (allows all IPs)
5. Click "Confirm"
6. Wait 1-2 minutes for it to apply

**Option B: Whitelist Your Specific IP**
1. Find your IP: https://whatismyipaddress.com
2. Go to MongoDB Atlas → Network Access
3. Click "Add IP Address"
4. Paste your IP address
5. Click "Confirm"

Once whitelisted, run the seeding script:
```bash
cd /workspaces/codex1/backend
node scripts/seedAdmin.js
```

Expected output:
```
✅ Connected to MongoDB
✅ Admin user created successfully!
📧 Email: admin@mithilamakhana.com
🔐 Password: admin123
```

### Step 2: Redeploy Backend on Render

Your backend needs the latest code with auth routes properly configured.

**Auto-Redeploy (Recommended)**
- We just pushed code to GitHub
- Render automatically redeploys within 1-2 minutes
- Check your Render dashboard: https://render.com/dashboard
- Wait for status to show "Live" (not "Building")

**Manual Redeploy**
1. Go to https://render.com/dashboard
2. Select service: `codex1-nq28`
3. Click "Manual Deploy" → "Deploy latest commit"
4. Wait 2-3 minutes for build to complete

### Step 3: Test Backend is Working
Once deployed, verify the endpoint:
```bash
curl -X POST https://codex1-nq28.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mithilamakhana.com","password":"admin123"}'
```

**Success response:**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "email": "admin@mithilamakhana.com",
    "isAdmin": true,
    "token": "eyJhbGc..."
  }
}
```

**Failure response (expected if admin doesn't exist):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```
→ If so, skip to **Step 4** below to seed the admin

### Step 4: Seed Admin User
Once backend is deployed AND MongoDB is whitelisted, run:
```bash
cd /workspaces/codex1/backend
node scripts/seedAdmin.js
```

This creates:
- **Email**: `admin@mithilamakhana.com`
- **Password**: `admin123`

### Step 5: Clear Frontend Cache and Login
1. Go to https://codex1-jfqm.vercel.app
2. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
3. Clear browser storage:
   - F12 → Console
   - Type: `localStorage.clear()`
   - Press Enter
4. Go to Admin Login: https://codex1-jfqm.vercel.app/admin-login
5. Enter credentials:
   - Email: `admin@mithilamakhana.com`
   - Password: `admin123`
6. Click Login → Should redirect to admin dashboard ✅

---

## Troubleshooting

### "Failed to fetch" still appearing?
Check browser console (F12):
- Look for actual error messages
- Check Network tab → /api/auth/login request
- Should show status 200 (success) or 401 (invalid credentials)

### MongoDB Connection Still Failing?
1. Verify `.env` in `backend/.env` has correct MONGO_URI
2. Check MongoDB Atlas → Database → Connection string
3. Ensure IP is whitelisted (see Step 1 above)

### Render Build Failing?
1. Check Render logs for errors
2. Verify `backend/package.json` has all dependencies: `express`, `mongoose`, `cors`, `dotenv`, `jsonwebtoken`, `bcryptjs`
3. Try deploying again

### Login Works But Dashboard is Empty?
- Admin dashboard needs products to manage
- Products are created via the admin form in `/admin/dashboard`
- Or seed them with your own script
- Orders appear only after customers place them

---

## 📝 Quick Summary
1. ✅ Whitelist MongoDB IP (either 0.0.0.0/0 or your IP)
2. ✅ Seed admin user: run `node backend/scripts/seedAdmin.js`
3. ✅ Render auto-deploys (or manually trigger redeploy)
4. ✅ Clear frontend cache and try login again
5. ✅ Admin panel should now work!



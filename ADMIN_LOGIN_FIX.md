# Admin Login Fix Guide

## Problem
You're unable to login as admin and getting "wrong password" error.

## Root Cause
The MongoDB credentials in `backend/.env` are incorrect, which prevents the admin user from being properly created/seeded.

## Solutions (Choose One)

### Solution 1: Update MongoDB Credentials (RECOMMENDED)

1. **Get your correct MongoDB credentials:**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com/)
   - Click on "Database Access" in the left sidebar
   - Find your database user: `shivamgarg1515_db_user`
   - Click "Edit" and reset the password if needed
   - Copy the new password

2. **Update backend/.env:**
   ```bash
   MONGO_URI=mongodb+srv://shivamgarg1515_db_user:YOUR_NEW_PASSWORD@cluster0.ouzkhsh.mongodb.net/mithila-makhana?retryWrites=true&w=majority&appName=Cluster0
   ```

3. **Reseed the admin user:**
   ```bash
   cd backend
   node scripts/seedAdmin.js
   ```

4. **Test login:**
   - Email: `admin@mithilamakhana.com`
   - Password: `admin123`

---

### Solution 2: Fix on Render Deployment

If you're using Render for deployment, run the fix script there:

1. **Go to your Render dashboard:**
   - Open your backend service
   - Go to "Shell" tab

2. **Run the fix script:**
   ```bash
   node scripts/fixAdminLogin.js
   ```

This will create/reset the admin user using Render's MongoDB credentials.

---

### Solution 3: Create Admin via API (Quick Fix)

If the backend is already deployed and running on Render:

```bash
curl -X POST https://codex1-nq28.onrender.com/api/auth/admin-register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@mithilamakhana.com",
    "password": "admin123"
  }'
```

**Note:** This will only work if no admin user exists yet.

---

## Testing the Fix

After applying any solution:

1. Go to your admin login page: `http://localhost:3000/admin-login` (or your deployed URL)
2. Use these credentials:
   - **Email:** `admin@mithilamakhana.com`
   - **Password:** `admin123`
3. You should be redirected to `/admin/dashboard`

---

## Still Having Issues?

Run the diagnostic script to check what's wrong:

```bash
cd backend
node scripts/fixAdminLogin.js
```

This will tell you exactly what the problem is and how to fix it.

---

## Default Admin Credentials

- **Email:** admin@mithilamakhana.com
- **Password:** admin123

**⚠️ Important:** Change the default password after your first login!

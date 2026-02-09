# Quick Fix Guide for Admin Login

## Problem
MongoDB authentication is failing with "bad auth: authentication failed"

## Solution Steps

### Step 1: Update MongoDB Password

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Sign in with your account
3. Go to **Database Access** (left sidebar, under Security)
4. Find user: `shivamgarg1515_db_user`
5. Click **Edit** button
6. Click **Edit Password**
7. Choose one of:
   - **Generate a new password** (copy it!)
   - Or set a custom password
8. Click **Update User**

### Step 2: Update backend/.env

Replace the password in your MONGO_URI:

```bash
MONGO_URI=mongodb+srv://shivamgarg1515_db_user:YOUR_NEW_PASSWORD_HERE@cluster0.ouzkhsh.mongodb.net/mithila-makhana?retryWrites=true&w=majority&appName=Cluster0
```

**Important:** Make sure to URL-encode special characters in your password!
- If password has `@` → use `%40`
- If password has `#` → use `%23`
- If password has `&` → use `%26`

### Step 3: Reset Admin Password

Run this command:

```bash
cd /workspaces/codex1/backend
node quickResetAdmin.js
```

This will:
- ✅ Connect to MongoDB with your updated credentials
- ✅ Create/reset the admin user
- ✅ Set password to `admin123`
- ✅ Test that login will work

### Step 4: Update Render Environment Variables

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Find your backend service
3. Go to **Environment** tab  
4. Update `MONGO_URI` with your new password
5. Click **Save Changes** (this will redeploy)

---

## Option 2: Check Current Password

If you don't want to reset the MongoDB password, you can check what it currently is:

1. Go to your last deployment logs in Render
2. Or check if you have it saved in a password manager
3. Update the `backend/.env` file with the correct password

---

## Testing

After fixing MongoDB credentials and resetting admin:

```bash
# Test 1: Check if backend can connect
curl https://codex1-nq28.onrender.com/api/products

# Test 2: Try admin login
curl -X POST https://codex1-nq28.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@mithilamakhana.com", "password": "admin123"}'
```

Should return: `{"success":true, ...}`

---

## Quick Summary

**The issue:** MongoDB password in `.env` is incorrect
**The fix:** Update MongoDB password → Update `.env` → Run reset script
**Login with:** admin@mithilamakhana.com / admin123

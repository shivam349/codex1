# 🌐 Deployment Guide - Render (Free)

Deploy your Mithila Makhana backend to Render for free!

## 📋 Prerequisites

- GitHub account
- MongoDB Atlas account
- Render account (free)

## 🚀 Step-by-Step Deployment

### Step 1: Prepare Your Code

1. **Ensure all files are committed to GitHub**

```bash
git add .
git commit -m "Backend ready for deployment"
git push origin main
```

2. **Verify these files exist:**
   - ✅ `render.yaml` (in root directory)
   - ✅ `backend/.env.example`
   - ✅ `backend/package.json`
   - ✅ `.gitignore` includes `.env`

### Step 2: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Navigate to your cluster
3. Click "Network Access"
4. Click "Add IP Address"
5. Choose "Allow Access from Anywhere" (`0.0.0.0/0`)
6. Click "Confirm"

**Get Connection String:**
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your actual password

Example:
```
mongodb+srv://username:PASSWORD@cluster0.xxxxx.mongodb.net/makhana?retryWrites=true&w=majority
```

### Step 3: Create Render Account

1. Go to [Render.com](https://render.com)
2. Click "Get Started"
3. Sign up with GitHub
4. Authorize Render to access your repositories

### Step 4: Deploy on Render

#### Method 1: Manual Setup (⭐ Recommended - Avoids Webpack Errors)

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `mithila-makhana-api`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && node server.js`
   - **Plan**: `Free`

**Why this method?** It only builds backend dependencies, avoiding webpack/Next.js errors.

#### Method 2: Using render.yaml (Alternative)

1. In Render Dashboard, click "New +"
2. Select "Blueprint"
3. Connect your GitHub repository
4. Render will detect `render.yaml`
5. Click "Apply"

**Note:** If you encounter webpack errors, use Method 1 instead.

### Step 5: Set Environment Variables

In your Render service dashboard:

1. Go to "Environment" tab
2. Add these variables:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/makhana
NODE_ENV=production
PORT=5000
JWT_SECRET=your_super_secure_random_string_here
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your_secure_password_here
FRONTEND_URL=https://your-frontend.onrender.com
```

**Important:**
- For `JWT_SECRET`, use a long random string (32+ characters)
- Change `ADMIN_PASSWORD` from default `admin123`
- Update `FRONTEND_URL` when you deploy your frontend

### Step 6: Seed the Database (One-time)

After your service is deployed:

1. In Render dashboard, go to your service
2. Click "Shell" tab
3. Run:
```bash
npm run seed
```

4. You should see:
```
✓ Connected to MongoDB
✓ Cleared existing data
✓ Inserted 6 products
✓ Created admin user
✓ Created guest user
✓ Database seeded successfully!
```

### Step 7: Test Your Deployment

Your API will be available at:
```
https://your-service-name.onrender.com
```

Test endpoints:

```bash
# Health check
curl https://your-service-name.onrender.com/api/status

# Get products
curl https://your-service-name.onrender.com/api/products
```

## 🎯 Post-Deployment Setup

### Update CORS for Frontend

When you deploy your frontend, update the environment variable:

```
FRONTEND_URL=https://your-actual-frontend-url.com
```

Render will automatically redeploy on change.

### Custom Domain (Optional)

1. In Render dashboard, go to "Settings"
2. Scroll to "Custom Domain"
3. Add your domain (e.g., `api.mithilamakhana.com`)
4. Follow DNS configuration instructions

## 📱 Connect Your Frontend

Update your frontend API calls to use production URL:

```javascript
// Use environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Example
const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/api/products`);
  return await response.json();
};
```

In your frontend `.env`:
```
NEXT_PUBLIC_API_URL=https://your-service-name.onrender.com
```

## 🔒 Security Checklist

Before going live:

- [ ] Changed `ADMIN_PASSWORD` from default
- [ ] Used strong `JWT_SECRET` (32+ characters)
- [ ] Removed sensitive data from code
- [ ] `.env` is in `.gitignore`
- [ ] MongoDB Network Access configured
- [ ] CORS configured for your domain only (in production)

## 🐛 Troubleshooting

### Webpack Errors During Build (COMMON ISSUE!)

**Error Messages:**
- `Module build failed: Error: Cannot find module 'webpack'`
- `Error: Cannot find module '@next/...`
- Build fails with frontend-related errors

**Root Cause:** Render is trying to build the entire project including Next.js frontend.

**Solution:** Update your build command to only install backend dependencies:

In Render dashboard → Settings → Build & Deploy:
```
Build Command: cd backend && npm install
Start Command: cd backend && node server.js
```

Or use Manual Setup (Method 1) as described above.

### Deployment Failed - Build Error

**Check:**
1. Build command: `cd backend && npm install` (NOT just `npm install`)
2. Start command: `cd backend && node server.js`
3. All backend dependencies in `backend/package.json`

**Solution:**
```bash
# Test locally first
cd backend
npm install
node server.js
```

### MongoDB Connection Error

**Error:** `MongoServerError: bad auth`

**Solution:**
1. Check `MONGO_URI` has correct password
2. Ensure password is URL-encoded (replace special chars)
3. Verify user exists in MongoDB Atlas

**Example URL encoding:**
- `@` → `%40`
- `#` → `%23`
- `!` → `%21`

### Service Won't Start

**Check Render Logs:**
1. In Render dashboard → "Logs" tab
2. Look for error messages

**Common issues:**
- Wrong start command
- Missing environment variables
- MongoDB connection failed

### 502 Bad Gateway

**Possible causes:**
1. Server crashed - check logs
2. Wrong PORT configuration
3. Start command incorrect

**Solution:**
Ensure your `server.js` uses:
```javascript
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## 🔄 Auto-Deploy on Git Push

Render automatically redeploys when you push to your main branch:

```bash
git add .
git commit -m "Update backend"
git push origin main
# Render will automatically detect and redeploy!
```

## 📊 Monitor Your App

In Render dashboard:
- **Logs**: View real-time logs
- **Metrics**: CPU and memory usage
- **Events**: Deployment history

## 💰 Free Tier Limitations

Render Free Tier includes:
- ✅ 750 hours/month (enough for 1 service)
- ✅ Automatic HTTPS
- ✅ Auto-deploy from Git
- ⚠️ Service spins down after 15 min of inactivity
- ⚠️ Cold starts (first request might be slow)

**Cold Start Solutions:**
1. Use a ping service (e.g., UptimeRobot)
2. Upgrade to paid plan ($7/mo for always-on)

## 🎉 Success!

Your backend is now live! Share your API:

```
API Base URL: https://your-service-name.onrender.com
Products: https://your-service-name.onrender.com/api/products
Status: https://your-service-name.onrender.com/api/status
```

## 📚 Next Steps

1. Deploy your frontend (Vercel/Netlify/Render)
2. Update `FRONTEND_URL` environment variable
3. Test end-to-end functionality
4. Set up monitoring/alerts
5. Add custom domain

## 🆘 Need Help?

- Render Docs: https://render.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- GitHub Issues: Create an issue in your repo

---

**Happy Deploying! 🚀**

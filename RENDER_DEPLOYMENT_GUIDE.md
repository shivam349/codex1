# 🚀 Render Deployment Guide

Complete step-by-step guide to deploy your Mithila Makhana backend on Render.

---

## ✅ Prerequisites

Before deploying, make sure:

- [ ] Your code is pushed to GitHub
- [ ] You have a MongoDB Atlas account with connection string
- [ ] You have created an admin user locally and tested the API
- [ ] All environment variables are documented

---

## 📋 Step 1: Prepare Your Backend

### 1.1 Verify File Structure

Make sure your backend folder has:

```
backend/
├── server.js
├── config/db.js
├── models/
├── routes/
├── middleware/
├── package.json
└── .env.example
```

### 1.2 Verify package.json

Your `backend/package.json` should have:

```json
{
  "name": "mithila-makhana-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2"
  }
}
```

### 1.3 Push to GitHub

```bash
cd /workspaces/codex1
git add .
git commit -m "Backend ready for Render deployment"
git push origin main
```

---

## 🌐 Step 2: Create Render Account

1. Go to **[Render.com](https://render.com)**
2. Click **"Get Started"**
3. Choose **"Sign in with GitHub"**
4. Authorize Render to access your repositories

---

## 🔧 Step 3: Create Web Service

### 3.1 Start New Service

1. In Render dashboard, click **"New +"** (top right)
2. Select **"Web Service"**

### 3.2 Connect Repository

1. Find your repository: **shivam349/codex1**
2. Click **"Connect"**

### 3.3 Configure Service

Fill in these settings:

| Field | Value |
|-------|-------|
| **Name** | `mithila-makhana-api` |
| **Root Directory** | `backend` |
| **Environment** | `Node` |
| **Region** | Choose closest to you |
| **Branch** | `main` |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |
| **Plan** | `Free` (or Starter if you want) |

### 3.4 Advanced Settings (Expand)

- **Auto-Deploy**: ✅ Yes (deploys automatically on git push)

---

## 🔐 Step 4: Add Environment Variables

Scroll down to **"Environment Variables"** section and add these:

### Required Variables:

| Key | Value | Example |
|-----|-------|---------|
| `NODE_ENV` | `production` | `production` |
| `PORT` | `5000` | `5000` |
| `MONGO_URI` | Your MongoDB Atlas URI | `mongodb+srv://user:pass@cluster.mongodb.net/mithila-makhana` |
| `JWT_SECRET` | Strong random string (32+ chars) | `a8f3k2j9d0x7c5v1b4n6m8q2w5e7r9t0` |
| `FRONTEND_URL` | Your Vercel URL | `https://codex1-jfqm.vercel.app` |

### How to Generate JWT_SECRET:

**Option 1: Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option 2: OpenSSL**
```bash
openssl rand -hex 32
```

**Option 3: Online**
- Go to: https://passwordsgenerator.net/
- Set length to 32+
- Include all character types

### MongoDB URI Example:

```
mongodb+srv://shivamgarg1515_db_user:Ac8tKiaY84CQDyr4@cluster0.ouzkhsh.mongodb.net/mithila-makhana?retryWrites=true&w=majority
```

⚠️ **Make sure to:**
- Replace `<password>` with your actual password
- Change database name to `mithila-makhana`
- No spaces or special characters (URL encoded)

---

## 🚀 Step 5: Deploy!

1. Click **"Create Web Service"** at the bottom
2. Render will start building your service
3. Watch the logs in real-time

### Build Process:

```
==> Installing dependencies
==> Running 'npm install'
✓ Dependencies installed

==> Starting service
==> Running 'node server.js'
✓ Server is running on port 5000
✓ MongoDB Connected
```

**Build time:** Usually 2-3 minutes

---

## ✅ Step 6: Verify Deployment

### 6.1 Get Your API URL

After deployment succeeds, you'll see:

```
Your service is live at https://mithila-makhana-api.onrender.com
```

### 6.2 Test Health Check

Open in browser or use curl:

```bash
curl https://mithila-makhana-api.onrender.com
```

Expected response:
```json
{
  "success": true,
  "message": "Mithila Makhana API",
  "version": "1.0.0",
  "endpoints": {
    "auth": "/api/auth",
    "products": "/api/products",
    "orders": "/api/orders"
  }
}
```

### 6.3 Test Products Endpoint

```bash
curl https://mithila-makhana-api.onrender.com/api/products
```

---

## 👤 Step 7: Create Admin User

Now create your admin user in **production**:

```bash
curl -X POST https://mithila-makhana-api.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@mithilamakhana.com",
    "password": "YourSecurePassword123"
  }'
```

**Save the response token!**

Expected response:
```json
{
  "success": true,
  "data": {
    "id": "...",
    "email": "admin@mithilamakhana.com",
    "isAdmin": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 🔗 Step 8: Connect Frontend (Vercel)

### 8.1 Add Environment Variable in Vercel

1. Go to **[Vercel Dashboard](https://vercel.com/dashboard)**
2. Select your project: **codex1-jfqm**
3. Go to **Settings** → **Environment Variables**
4. Add new variable:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_API_URL` | `https://mithila-makhana-api.onrender.com` |

5. Select **Production**, **Preview**, and **Development**
6. Click **Save**

### 8.2 Redeploy Frontend

```bash
# In Vercel dashboard, go to Deployments
# Click "..." on latest deployment
# Select "Redeploy"
```

Or trigger from GitHub:

```bash
git commit --allow-empty -m "Trigger Vercel redeploy"
git push
```

---

## 🔄 Step 9: Update CORS

After Vercel deployment, update CORS in Render:

1. Go to **Render dashboard** → Your service
2. Go to **Environment** tab
3. Find `FRONTEND_URL`
4. Make sure it matches your Vercel URL exactly:
   - ✅ `https://codex1-jfqm.vercel.app`
   - ❌ `https://codex1-jfqm.vercel.app/` (no trailing slash)

---

## 🧪 Step 10: Test Complete Integration

### Test 1: Get Products from Frontend

Visit your Vercel site and check if products load:
```
https://codex1-jfqm.vercel.app
```

### Test 2: Admin Login

Try logging in to admin panel with the credentials you created.

### Test 3: Add Product

From admin panel, try adding a test product.

### Test 4: Place Order

Try placing an order from the frontend.

---

## 📊 Monitoring Your Service

### View Logs

1. Go to **Render dashboard** → Your service
2. Click **"Logs"** tab
3. See real-time logs of your API

### Check Metrics

- **Dashboard** shows:
  - CPU usage
  - Memory usage
  - Request count
  - Response time

### Set Up Alerts (Optional)

1. Go to **Settings** → **Alerts**
2. Add email for:
   - Service failed
   - High CPU usage
   - High error rate

---

## 🔄 Auto-Deploy on Git Push

Render automatically redeploys when you push to GitHub:

```bash
# Make changes to backend code
cd backend
# Edit files...

# Commit and push
git add .
git commit -m "Update API endpoints"
git push

# Render automatically detects push and redeploys!
```

---

## 🐛 Troubleshooting

### Issue: Build Failed

**Check:**
1. Logs in Render dashboard
2. `package.json` is in backend folder
3. All dependencies are listed

**Fix:**
```bash
cd backend
npm install
# Make sure no errors locally
```

### Issue: MongoDB Connection Failed

**Error:** "MongooseServerSelectionError"

**Check:**
1. MONGO_URI is correct in Render environment variables
2. MongoDB Atlas **Network Access** has `0.0.0.0/0` whitelisted
3. Password doesn't have special characters (or they're URL encoded)

**Fix in MongoDB Atlas:**
1. Go to **Network Access**
2. Click **Add IP Address**
3. Choose **Allow Access from Anywhere**
4. IP: `0.0.0.0/0`

### Issue: CORS Error

**Error:** "Access-Control-Allow-Origin"

**Check:**
1. `FRONTEND_URL` in Render matches your Vercel URL
2. No trailing slash
3. Protocol is `https://` not `http://`

**Fix:**
Update environment variable in Render and redeploy.

### Issue: JWT Token Invalid

**Check:**
1. `JWT_SECRET` is same for register and login
2. Token was saved to localStorage
3. Token format: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Issue: 404 Not Found

**Check:**
1. Root Directory is set to `backend` in Render
2. Routes are correct: `/api/products`, `/api/orders`, `/api/auth`
3. Service is running (check logs)

---

## 💰 Free Tier Limits

Render Free Tier:

- ✅ 750 hours/month (enough for one service 24/7)
- ✅ Automatic SSL
- ✅ Auto-deploy from GitHub
- ❌ Spins down after 15 minutes of inactivity
- ❌ Takes ~30 seconds to wake up

**Pro Tip:** First request after inactivity will be slow. Subsequent requests will be fast.

---

## 🚀 Upgrade to Paid (Optional)

If you need:
- No spin-down
- Faster response
- More resources

Upgrade to **Starter Plan** ($7/month):
- Always running
- No cold starts
- Better performance

---

## 📝 Production Checklist

Before announcing your site is live:

- [ ] Backend deployed successfully on Render
- [ ] Admin user created in production
- [ ] MongoDB Atlas configured correctly
- [ ] Environment variables set in Render
- [ ] Frontend connected to production API
- [ ] CORS configured for Vercel domain
- [ ] All endpoints tested in production
- [ ] Orders can be placed
- [ ] Admin can add/delete products
- [ ] Strong passwords used
- [ ] JWT_SECRET is secure (32+ chars)
- [ ] `/api/auth/register` disabled (optional for security)

---

## 🎉 You're Live!

Your backend is now:

✅ Deployed on Render
✅ Connected to MongoDB Atlas
✅ Secured with JWT authentication
✅ CORS enabled for your Vercel frontend
✅ Auto-deploys on every push
✅ Production-ready!

**Your API URL:**
```
https://mithila-makhana-api.onrender.com
```

**Your Frontend:**
```
https://codex1-jfqm.vercel.app
```

---

## 📞 Need Help?

- **Render Docs:** https://render.com/docs
- **MongoDB Atlas Docs:** https://www.mongodb.com/docs/atlas/
- **Express.js Docs:** https://expressjs.com/

---

**Built with ❤️ for Mithila Makhana**

Happy coding! 🚀

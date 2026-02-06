# ⚡ Quick Start Guide

## 🚀 Get Your Backend Running in 5 Minutes!

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

### Step 2: Configure MongoDB Atlas

**Important:** You need to whitelist your IP address in MongoDB Atlas!

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Select your cluster
3. Click **"Network Access"** in left sidebar
4. Click **"Add IP Address"**
5. Choose **"Allow Access from Anywhere"**
   - IP Address: `0.0.0.0/0`
   - Description: "Allow all"
6. Click **"Confirm"**

**Wait 1-2 minutes** for changes to apply.

### Step 3: Verify .env File

Check that `backend/.env` has:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://shivamgarg1515_db_user:Ac8tKiaY84CQDyr4@cluster0.ouzkhsh.mongodb.net/mithila-makhana?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=mithila_makhana_jwt_secret_key_2024_change_in_production
FRONTEND_URL=https://codex1-jfqm.vercel.app
```

### Step 4: Start Server

```bash
cd backend
node server.js
```

You should see:
```
🚀 Server is running on port 5000
📍 Environment: development
🌐 CORS allowed from: https://codex1-jfqm.vercel.app
✅ MongoDB Connected: cluster0-shard-00-02.ouzkhsh.mongodb.net
```

### Step 5: Create Admin User

Open a new terminal:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@mithilamakhana.com",
    "password": "admin123"
  }'
```

**Save the token from the response!**

### Step 6: Test API

```bash
# Health check
curl http://localhost:5000

# Get products (will be empty initially)
curl http://localhost:5000/api/products
```

### Step 7: Add Your First Product

Replace `YOUR_TOKEN_HERE` with the token from Step 5:

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Premium Makhana",
    "price": 299,
    "image": "https://images.unsplash.com/photo-1599909221326-adec46dc4ddb",
    "description": "Hand-picked premium quality makhana from Mithila region",
    "category": "premium",
    "stock": 50
  }'
```

---

## 🎯 What's Next?

### For Local Development:
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Complete setup instructions
- [FRONTEND_API_INTEGRATION.js](../FRONTEND_API_INTEGRATION.js) - Frontend code examples

### For Production:
- [RENDER_DEPLOYMENT_GUIDE.md](../RENDER_DEPLOYMENT_GUIDE.md) - Deploy to Render

---

## 🐛 Common Issues

### ❌ MongoDB Connection Error

**Error:** "Could not connect to any servers in your MongoDB Atlas cluster"

**Solution:**
1. Whitelist IP `0.0.0.0/0` in MongoDB Atlas Network Access
2. Wait 1-2 minutes
3. Restart server

### ❌ Port 5000 Already in Use

**Solution:**
```bash
lsof -ti:5000 | xargs kill -9
```

### ❌ Module Not Found

**Solution:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

---

## 📋 API Endpoints Cheat Sheet

### Auth
- `POST /api/auth/register` - Create admin
- `POST /api/auth/login` - Admin login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Add product (Admin) 🔒
- `PUT /api/products/:id` - Update product (Admin) 🔒
- `DELETE /api/products/:id` - Delete product (Admin) 🔒

### Orders
- `POST /api/orders` - Place order
- `GET /api/orders` - Get all orders (Admin) 🔒
- `PUT /api/orders/:id/status` - Update status (Admin) 🔒

---

## ✅ Production Checklist

Before deploying:

- [ ] MongoDB IP whitelisted (`0.0.0.0/0`)
- [ ] Strong JWT_SECRET set
- [ ] Admin user created and tested
- [ ] All endpoints tested locally
- [ ] Frontend connected and working
- [ ] .env file not committed to git

---

**Need help?** Check the full guides or the code comments!

🌶️ **Built for Mithila Makhana**

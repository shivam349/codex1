# 🚀 Complete Backend Setup Guide

## 📁 Project Structure

```
backend/
├── server.js           # Main server file
├── config/
│   └── db.js          # MongoDB connection
├── models/
│   ├── Product.js     # Product model
│   ├── User.js        # Admin user model
│   └── Order.js       # Order model
├── routes/
│   ├── authRoutes.js  # Authentication routes
│   ├── productRoutes.js  # Product CRUD routes
│   └── orderRoutes.js # Order routes
├── middleware/
│   └── auth.js        # JWT authentication middleware
├── .env               # Environment variables (DO NOT COMMIT)
└── .env.example       # Example environment file
```

---

## ⚡ Quick Start (5 Minutes)

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

Dependencies installed:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `cors` - Cross-origin requests
- `dotenv` - Environment variables

### Step 2: Create .env File

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=your_super_secret_key_here
FRONTEND_URL=https://codex1-jfqm.vercel.app
```

### Step 3: Get MongoDB Atlas Connection String

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Sign in or create account
3. Create a new cluster (free M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your actual password
7. Replace `myFirstDatabase` with `mithila-makhana`

Example:
```
mongodb+srv://admin:MyPassword123@cluster0.xxxxx.mongodb.net/mithila-makhana?retryWrites=true&w=majority
```

### Step 4: Create Admin User

Start the server first:
```bash
node server.js
```

Then create admin using this API call:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@mithilamakhana.com",
    "password": "admin123"
  }'
```

**Save the token returned!** You'll need it for admin operations.

### Step 5: Test the API

```bash
# Health check
curl http://localhost:5000

# Get all products
curl http://localhost:5000/api/products
```

---

## 🔐 Authentication System

### Admin Login

**Endpoint:** `POST /api/auth/login`

```javascript
fetch('https://your-api.onrender.com/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'admin@mithilamakhana.com',
    password: 'admin123'
  })
})
.then(res => res.json())
.then(data => {
  console.log('Token:', data.data.token);
  // Save token to localStorage
  localStorage.setItem('adminToken', data.data.token);
});
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "123456",
    "email": "admin@mithilamakhana.com",
    "isAdmin": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 📦 Product API

### Get All Products (Public)

**Endpoint:** `GET /api/products`

```javascript
fetch('https://your-api.onrender.com/api/products')
  .then(res => res.json())
  .then(data => console.log(data.data));
```

### Get Products by Category

```javascript
fetch('https://your-api.onrender.com/api/products?category=premium')
  .then(res => res.json())
  .then(data => console.log(data.data));
```

### Get Single Product

**Endpoint:** `GET /api/products/:id`

```javascript
fetch('https://your-api.onrender.com/api/products/PRODUCT_ID')
  .then(res => res.json())
  .then(data => console.log(data.data));
```

### Add Product (Admin Only)

**Endpoint:** `POST /api/products`
**Auth Required:** Bearer Token

```javascript
const token = localStorage.getItem('adminToken');

fetch('https://your-api.onrender.com/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    name: 'Premium Makhana',
    price: 299,
    image: 'https://example.com/image.jpg',
    description: 'Handpicked premium quality makhana',
    category: 'premium',
    stock: 50
  })
})
.then(res => res.json())
.then(data => console.log('Product added:', data.data));
```

### Update Product (Admin Only)

**Endpoint:** `PUT /api/products/:id`

```javascript
const token = localStorage.getItem('adminToken');

fetch('https://your-api.onrender.com/api/products/PRODUCT_ID', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    price: 349,
    stock: 30
  })
})
.then(res => res.json())
.then(data => console.log('Product updated:', data.data));
```

### Delete Product (Admin Only)

**Endpoint:** `DELETE /api/products/:id`

```javascript
const token = localStorage.getItem('adminToken');

fetch('https://your-api.onrender.com/api/products/PRODUCT_ID', {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(res => res.json())
.then(data => console.log(data.message));
```

---

## 🛒 Order API

### Place Order (Public)

**Endpoint:** `POST /api/orders`

```javascript
fetch('https://your-api.onrender.com/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    customerName: 'John Doe',
    phone: '9876543210',
    address: '123 Main Street, Mumbai, Maharashtra 400001',
    cartItems: [
      {
        productId: 'PRODUCT_ID_1',
        name: 'Premium Makhana',
        price: 299,
        quantity: 2
      },
      {
        productId: 'PRODUCT_ID_2',
        name: 'Organic Makhana',
        price: 349,
        quantity: 1
      }
    ],
    totalAmount: 947
  })
})
.then(res => res.json())
.then(data => console.log('Order placed:', data.data));
```

### Get All Orders (Admin Only)

**Endpoint:** `GET /api/orders`

```javascript
const token = localStorage.getItem('adminToken');

fetch('https://your-api.onrender.com/api/orders', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(res => res.json())
.then(data => console.log('Orders:', data.data));
```

### Update Order Status (Admin Only)

**Endpoint:** `PUT /api/orders/:id/status`

```javascript
const token = localStorage.getItem('adminToken');

fetch('https://your-api.onrender.com/api/orders/ORDER_ID/status', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    status: 'shipped'
  })
})
.then(res => res.json())
.then(data => console.log('Order updated:', data.data));
```

---

## 🌐 Deploy to Render

### Step 1: Push to GitHub

```bash
cd backend
git add .
git commit -m "Backend ready for deployment"
git push
```

### Step 2: Create Render Account

1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Authorize Render to access your repositories

### Step 3: Create Web Service

1. Click "New +" → "Web Service"
2. Connect your repository
3. Configure:
   - **Name:** `mithila-makhana-api`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free

### Step 4: Add Environment Variables

In Render dashboard, add these environment variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGO_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | Strong random string (use password generator) |
| `FRONTEND_URL` | `https://codex1-jfqm.vercel.app` |

### Step 5: Deploy

1. Click "Create Web Service"
2. Wait for deployment (2-3 minutes)
3. Your API will be live at: `https://your-service.onrender.com`

### Step 6: Create Admin User on Production

```bash
curl -X POST https://your-service.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@mithilamakhana.com",
    "password": "SecurePassword123"
  }'
```

### Step 7: Test Production API

```bash
# Test health check
curl https://your-service.onrender.com

# Test products endpoint
curl https://your-service.onrender.com/api/products
```

---

## 🔗 Connect Frontend (Vercel)

### Update Frontend API URL

In your Next.js frontend, create/update `.env.production`:

```env
NEXT_PUBLIC_API_URL=https://your-service.onrender.com
```

### Example Frontend Code

```javascript
// lib/api.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Get all products
export const getProducts = async () => {
  const res = await fetch(`${API_URL}/api/products`);
  const data = await res.json();
  return data.data;
};

// Admin login
export const loginAdmin = async (email, password) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (data.success) {
    localStorage.setItem('adminToken', data.data.token);
  }
  return data;
};

// Add product
export const addProduct = async (productData) => {
  const token = localStorage.getItem('adminToken');
  const res = await fetch(`${API_URL}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(productData)
  });
  return await res.json();
};

// Place order
export const placeOrder = async (orderData) => {
  const res = await fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  return await res.json();
};
```

---

## 🧪 Testing the API

### Using curl

```bash
# 1. Login as admin
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mithilamakhana.com","password":"admin123"}'

# Save the token from response

# 2. Add product
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name":"Premium Makhana",
    "price":299,
    "image":"https://example.com/image.jpg",
    "description":"Premium quality",
    "category":"premium",
    "stock":50
  }'

# 3. Get all products
curl http://localhost:5000/api/products

# 4. Place order
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName":"John Doe",
    "phone":"9876543210",
    "address":"123 Main St",
    "cartItems":[{"productId":"PRODUCT_ID","name":"Makhana","price":299,"quantity":2}],
    "totalAmount":598
  }'
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error

**Error:** `MongooseServerSelectionError`

**Solution:**
1. Check MONGO_URI in `.env`
2. Whitelist IP `0.0.0.0/0` in MongoDB Atlas Network Access
3. Verify username/password in connection string

### JWT Token Invalid

**Error:** `Not authorized, token invalid`

**Solution:**
1. Check if JWT_SECRET is same in `.env`
2. Token might be expired (30 days validity)
3. Login again to get fresh token

### CORS Error

**Error:** `Access-Control-Allow-Origin`

**Solution:**
1. Update `FRONTEND_URL` in `.env`
2. Make sure URL matches exactly (no trailing slash)
3. Redeploy backend after changing CORS settings

### Port Already in Use

**Error:** `Port 5000 already in use`

**Solution:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

---

## 📝 Production Checklist

Before going live:

- [ ] Change default admin password
- [ ] Use strong JWT_SECRET (32+ characters)
- [ ] Set NODE_ENV=production
- [ ] Whitelist only your Vercel domain in CORS
- [ ] Enable MongoDB Atlas IP whitelist for production
- [ ] Test all API endpoints in production
- [ ] Disable `/api/auth/register` route after creating admin
- [ ] Set up monitoring/logging
- [ ] Configure domain/SSL if using custom domain

---

## 🎉 You're All Set!

Your backend is now:
✅ Connected to MongoDB Atlas
✅ Secured with JWT authentication
✅ CORS enabled for your Vercel frontend
✅ Ready to deploy on Render
✅ Production-ready

**Need help?** Check the code comments or refer to this guide!

---

**Built with ❤️ for Mithila Makhana**

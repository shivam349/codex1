# 🚀 Quick Start Guide - Mithila Makhana Backend

Get your backend up and running in 5 minutes!

## 📦 Prerequisites

- Node.js v18+ installed
- MongoDB Atlas account (free tier works!)
- Terminal/Command prompt

## 🎯 Steps

### 1. Install Dependencies

```bash
npm install
```

This will install:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv

### 2. Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string

### 3. Configure Environment

```bash
cd backend
cp .env.example .env
```

Edit `.env` file:
```env
MONGO_URI=mongodb+srv://YOUR_CREDENTIALS_HERE
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_key_change_this
ADMIN_EMAIL=admin@mithilamakhana.com
ADMIN_PASSWORD=admin123
```

### 4. Seed the Database

```bash
npm run seed
```

This will:
- ✅ Create 6 sample products
- ✅ Create admin user (admin@mithilamakhana.com / admin123)
- ✅ Create guest user (guest@example.com / guest123)
- ✅ Create sample order

### 5. Start the Server

```bash
npm run server:dev
```

You should see:
```
✓ MongoDB Connected Successfully
✓ Server running on port 5000
✓ Environment: development
✓ API URL: http://localhost:5000
```

## 🧪 Test the API

### Option 1: Browser

Open: `http://localhost:5000`

You should see:
```json
{
  "message": "Mithila Makhana API is running",
  "version": "1.0.0",
  "endpoints": {...}
}
```

### Option 2: curl

```bash
# Get all products
curl http://localhost:5000/api/products

# Get API status
curl http://localhost:5000/api/status
```

### Option 3: Admin Panel

Open: `backend/admin.html` in your browser

- Default admin password: `admin123`
- Add products, view products, manage orders

## 📡 API Endpoints

All endpoints are at: `http://localhost:5000/api`

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get single product
- `POST /products` - Add product (admin)

### Orders
- `POST /orders` - Create order
- `GET /orders` - Get all orders (admin)
- `GET /orders/:id` - Get order by ID

### Users
- `POST /users/register` - Register user
- `POST /users/login` - User login
- `POST /users/admin/login` - Admin login

## 🎨 Admin Panel

Open `backend/admin.html` in your browser to:
- ➕ Add new products
- 📦 View all products
- 📋 View orders
- Simple and beginner-friendly!

## 🔧 Common Issues

### MongoDB Connection Error
```
Error: MongooseServerSelectionError
```

**Solution:**
1. Check your MONGO_URI in `.env`
2. Go to MongoDB Atlas → Network Access
3. Add your IP address or use `0.0.0.0/0` (allow all)

### Port Already in Use
```
Error: Port 5000 is already in use
```

**Solution:**
```bash
# Find and kill the process
lsof -ti:5000 | xargs kill -9   # Mac/Linux
# OR change PORT in .env to 5001
```

### Admin Authentication Failed
```
{ "message": "Invalid admin password" }
```

**Solution:**
1. Check `ADMIN_PASSWORD` in `.env`
2. Use the same password when making admin requests
3. Default is `admin123`

## 📱 Connect Frontend

### Example: Fetch Products

```javascript
// In your React component or JavaScript file
const fetchProducts = async () => {
  const response = await fetch('http://localhost:5000/api/products');
  const products = await response.json();
  console.log(products);
};
```

### Example: Create Order

```javascript
const createOrder = async (orderData) => {
  const response = await fetch('http://localhost:5000/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData)
  });
  
  const order = await response.json();
  return order;
};
```

### Example: Add Product (Admin)

```javascript
const addProduct = async (productData) => {
  const response = await fetch('http://localhost:5000/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...productData,
      adminPassword: 'admin123'
    })
  });
  
  return await response.json();
};
```

## 🚀 Run Frontend + Backend Together

```bash
# Terminal 1: Start backend
npm run server:dev

# Terminal 2: Start frontend
npm run dev

# OR run both together:
npm run dev:all
```

## 📚 Next Steps

1. ✅ Read full documentation: `backend/BACKEND_README.md`
2. ✅ Customize products in seed script
3. ✅ Change admin credentials in production
4. ✅ Deploy to Render (see deployment guide)
5. ✅ Connect your frontend fetch calls

## 🎉 You're All Set!

Your Mithila Makhana backend is now running!

- API: `http://localhost:5000`
- Admin Panel: Open `backend/admin.html`
- Products API: `http://localhost:5000/api/products`

Need help? Check:
- `backend/BACKEND_README.md` - Full documentation
- `backend/DEPLOYMENT.md` - Deployment guide

Happy coding! 🎊

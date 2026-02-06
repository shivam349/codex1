# 🎯 HOW TO USE YOUR BACKEND

## 🚀 Getting Started (First Time)

### Step 1: Install Dependencies (if not done)
```bash
npm install
```

### Step 2: Seed Database (One-time only)
```bash
npm run seed
```

Expected output:
```
✓ Connected to MongoDB
✓ Cleared existing data
✓ Inserted 6 products
✓ Created admin user
  Email: admin@mithilamakhana.com
  Password: admin123
✓ Created guest user
  Email: guest@example.com
  Password: guest123
✓ Created sample order
  Order Number: MM-SAMPLE-001
```

### Step 3: Start Backend Server
```bash
npm run server:dev
```

Server will be running at: **http://localhost:5000**

---

## 📱 3 Ways to Use Your Backend

### 🎨 Option 1: Admin HTML Panel (Easiest!)

1. Start the backend server:
   ```bash
   npm run server:dev
   ```

2. Open in browser:
   ```
   backend/admin.html
   ```

3. Features available:
   - ✅ Add new products
   - ✅ View all products
   - ✅ View orders (with admin password)

**Default admin password:** `admin123`

---

### 🌐 Option 2: Test with Browser

Visit these URLs directly in your browser:

#### See All Products
```
http://localhost:5000/api/products
```

#### Get API Status
```
http://localhost:5000/api/status
```

#### Welcome Message
```
http://localhost:5000
```

---

### 💻 Option 3: Use with Frontend (React/Next.js)

#### Import API functions:
```javascript
import { getProducts, createOrder, loginUser } from '@/lib/api';
```

#### Get Products:
```javascript
// Get all products
const products = await getProducts();
console.log(products);

// Get featured products only
const featured = await getProducts({ featured: true });

// Get by category
const premium = await getProducts({ category: 'premium' });
```

#### Create Order:
```javascript
const orderData = {
  items: [
    {
      product: 'PRODUCT_ID_HERE',
      quantity: 2,
      price: 299
    }
  ],
  shippingAddress: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '1234567890',
    address: '123 Main St',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400001',
    country: 'India'
  },
  totalPrice: 598,
  shippingPrice: 50,
  taxPrice: 30
};

const order = await createOrder(orderData);
console.log('Order created:', order.orderNumber);
```

#### User Login:
```javascript
const user = await loginUser('guest@example.com', 'guest123');
console.log('Logged in:', user.email);
// Token is automatically stored in localStorage
```

---

## 🧪 Testing with curl

### Get All Products
```bash
curl http://localhost:5000/api/products
```

### Get Single Product (replace with actual ID)
```bash
curl http://localhost:5000/api/products/PRODUCT_ID
```

### Create Product (Admin)
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Makhana",
    "description": "Delicious new flavor",
    "price": 299,
    "image": "https://example.com/image.jpg",
    "category": "premium",
    "stock": 50,
    "weight": "250g",
    "adminPassword": "admin123"
  }'
```

### Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "product": "PRODUCT_ID",
        "quantity": 2,
        "price": 299
      }
    ],
    "shippingAddress": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "address": "123 Main St",
      "city": "Mumbai",
      "state": "Maharashtra",
      "postalCode": "400001",
      "country": "India"
    },
    "totalPrice": 598
  }'
```

### User Login
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "guest@example.com",
    "password": "guest123"
  }'
```

---

## 📊 Available API Endpoints

### Products
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/products` | Get all products | No |
| GET | `/api/products?category=premium` | Filter by category | No |
| GET | `/api/products?featured=true` | Get featured only | No |
| GET | `/api/products/:id` | Get single product | No |
| POST | `/api/products` | Create product | Admin |
| PUT | `/api/products/:id` | Update product | Admin |
| DELETE | `/api/products/:id` | Delete product | Admin |

### Orders
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/orders` | Create order | No |
| GET | `/api/orders` | Get all orders | Admin |
| GET | `/api/orders/:id` | Get order by ID | No |
| GET | `/api/orders/number/:orderNumber` | Track by order number | No |
| GET | `/api/orders/user/:email` | Get user's orders | No |
| PUT | `/api/orders/:id/status` | Update status | Admin |
| DELETE | `/api/orders/:id` | Delete order | Admin |

### Users
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/users/register` | Register user | No |
| POST | `/api/users/login` | User login | No |
| POST | `/api/users/admin/login` | Admin login | No |
| GET | `/api/users/profile` | Get profile | JWT |
| PUT | `/api/users/profile` | Update profile | JWT |

---

## 🔐 Authentication Methods

### For Admin Operations (Simple)

Add to request headers:
```javascript
headers: {
  'admin-password': 'admin123'
}
```

Or in request body:
```javascript
{
  ...yourData,
  adminPassword: 'admin123'
}
```

### For User Operations (JWT)

1. Login first to get token
2. Add to subsequent requests:
```javascript
headers: {
  'Authorization': 'Bearer YOUR_JWT_TOKEN'
}
```

---

## 🎯 Common Use Cases

### Use Case 1: Display Products on Homepage

```javascript
import { getProducts } from '@/lib/api';

const HomePage = async () => {
  const products = await getProducts({ featured: true });
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};
```

### Use Case 2: Product Detail Page

```javascript
import { getProductById } from '@/lib/api';

const ProductPage = async ({ params }) => {
  const product = await getProductById(params.id);
  
  return <ProductDetail product={product} />;
};
```

### Use Case 3: Checkout Flow

```javascript
import { createOrder } from '@/lib/api';

const handleCheckout = async (cartItems, shippingAddress) => {
  const orderData = {
    items: cartItems.map(item => ({
      product: item.id,
      quantity: item.quantity,
      price: item.price
    })),
    shippingAddress,
    totalPrice: calculateTotal(cartItems)
  };
  
  const order = await createOrder(orderData);
  
  // Show success with order number
  alert(`Order placed! Order #${order.orderNumber}`);
  
  return order;
};
```

### Use Case 4: Track Order

```javascript
import { getOrderByNumber } from '@/lib/api';

const handleTrackOrder = async (orderNumber) => {
  const order = await getOrderByNumber(orderNumber);
  
  console.log('Order Status:', order.status);
  console.log('Payment Status:', order.paymentStatus);
  
  return order;
};
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
✗ MongoDB Connection Error: bad auth
```

**Solution:**
1. Check `backend/.env` has correct `MONGO_URI`
2. Verify password is correct
3. Check MongoDB Atlas Network Access allows your IP

### Port Already in Use
```
Error: Port 5000 is already in use
```

**Solution:**
```bash
# Kill the process
lsof -ti:5000 | xargs kill -9

# Or change port in backend/.env
PORT=5001
```

### Admin Authentication Failed
```
{ "message": "Invalid admin password" }
```

**Solution:**
- Check `ADMIN_PASSWORD` in `backend/.env`
- Default is `admin123`
- Use same password in API calls

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `COMPLETE_SUMMARY.md` | This file - complete overview |
| `backend/BACKEND_README.md` | Full API documentation |
| `backend/QUICKSTART.md` | 5-minute setup guide |
| `backend/DEPLOYMENT.md` | Deploy to Render |
| `FOLDER_STRUCTURE.md` | File organization |
| `lib/api.js` | Frontend API functions |

---

## ✅ Quick Checklist

**Before Development:**
- [ ] Run `npm install`
- [ ] Configure `backend/.env` with MongoDB URI
- [ ] Run `npm run seed` to add sample data
- [ ] Start server with `npm run server:dev`
- [ ] Test: Visit `http://localhost:5000/api/products`

**Ready to Use:**
- [ ] Open `backend/admin.html` to manage products
- [ ] Import `lib/api.js` functions in frontend
- [ ] Create orders via API
- [ ] Track orders by order number

**Before Deployment:**
- [ ] Change `ADMIN_PASSWORD` to something secure
- [ ] Generate strong `JWT_SECRET`
- [ ] Follow `backend/DEPLOYMENT.md`

---

## 🎉 You're All Set!

Your backend is ready to use! Choose your preferred method:

1. **🎨 Quick Testing**: Use `backend/admin.html`
2. **🌐 API Testing**: Visit URLs in browser or use curl
3. **💻 Production**: Import functions from `lib/api.js`

**Need Help?** Check the documentation files listed above!

Happy coding! 🚀

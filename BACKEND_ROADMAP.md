# Backend Implementation Roadmap

Complete guide for implementing features in the backend API.

## ✅ COMPLETED

- [x] Express server setup
- [x] MongoDB connection
- [x] CORS configuration
- [x] Project structure (models, routes)
- [x] Product model with detailed schema
- [x] Order model with payment tracking
- [x] User model with authentication fields
- [x] Route stubs for all endpoints
- [x] Environment configuration

## 🔄 NEXT STEPS

### STEP 1: Install Dev Dependencies & Setup (15 mins)

```bash
cd backend
npm install --save-dev nodemon
npm install bcryptjs jsonwebtoken validator
```

Then update `server.js` to import these in route handlers.

### STEP 2: Implement Product Routes (30 mins)

**File**: `routes/products.js`

```javascript
const Product = require('../models/Product');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create product (admin only)
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Similar for PUT, DELETE...
```

### STEP 3: Implement User Authentication (45 mins)

**File**: `routes/users.js`

```javascript
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: 'User already exists' });
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user
    user = new User({
      email,
      firstName,
      lastName,
      password: hashedPassword
    });
    
    await user.save();
    
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

### STEP 4: Create Auth Middleware (20 mins)

**File**: `middleware/auth.js`

```javascript
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

### STEP 5: Implement Order Routes (30 mins)

**File**: `routes/orders.js`

```javascript
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// Create order (requires authentication)
router.post('/', auth, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    
    // Calculate total
    let totalPrice = 0;
    items.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    
    const order = new Order({
      orderNumber: `ORD-${Date.now()}`,
      user: req.userId,
      items,
      totalPrice,
      shippingAddress
    });
    
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user's orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).populate('items.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### STEP 6: Add Input Validation (25 mins)

**File**: `middleware/validation.js`

```javascript
const validator = require('validator');

exports.validateProduct = (req, res, next) => {
  const { name, price, description } = req.body;
  
  if (!name || typeof name !== 'string' || name.length < 3) {
    return res.status(400).json({ error: 'Invalid product name' });
  }
  
  if (!price || typeof price !== 'number' || price < 0) {
    return res.status(400).json({ error: 'Invalid price' });
  }
  
  if (!description || description.length < 10) {
    return res.status(400).json({ error: 'Invalid description' });
  }
  
  next();
};

exports.validateUser = (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  
  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }
  
  if (!firstName || !lastName) {
    return res.status(400).json({ error: 'First and last name required' });
  }
  
  next();
};
```

### STEP 7: Setup Payment Integration (60 mins)

**File**: `routes/payment.js`

```bash
npm install razorpay
```

```javascript
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt-${Date.now()}`
    });
    
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest('hex');
    
    if (razorpay_signature === expectedSign) {
      res.json({ success: true });
    } else {
      res.status(400).json({ error: 'Payment verification failed' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

### STEP 8: Add Email Notifications (40 mins)

```bash
npm install nodemailer
```

**File**: `utils/email.js`

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

exports.sendOrderConfirmation = async (email, orderNumber) => {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: `Order Confirmation - ${orderNumber}`,
    html: `<h1>Order Confirmed!</h1><p>Your order ${orderNumber} has been confirmed.</p>`
  });
};
```

### STEP 9: Add caching with Redis (Bonus)

```bash
npm install redis
```

Improves performance for frequently accessed data.

### STEP 10: Deploy API

**Options**:
- Heroku (free tier available)
- DigitalOcean
- Railway
- Vercel (serverless)
- AWS EC2

## 📋 Testing the API

### Using cURL

```bash
# Create product
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Classic Makhana",
    "slug": "classic-makhana",
    "price": 499,
    "originalPrice": 599
  }'

# Register user
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'

# Create order (with token)
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "items": [{"product": "PRODUCT_ID", "quantity": 2, "price": 499}],
    "shippingAddress": {...}
  }'
```

### Using Postman

1. Import the API collection
2. Set `{{base_url}}` to `http://localhost:5000`
3. Test each endpoint

## 🎯 Timeline

- **Week 1**: Steps 1-4 (Core setup + Auth)
- **Week 2**: Steps 5-6 (Orders + Validation)
- **Week 3**: Steps 7-8 (Payments + Email)
- **Week 4**: Step 9-10 (Optimization + Deploy)

## 📚 Resources

- [Express.js Docs](https://expressjs.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [JWT Auth](https://jwt.io/)
- [Razorpay Docs](https://razorpay.com/docs/)
- [MongoDB Docs](https://docs.mongodb.com/)

## 🚀 Happy Coding!

Start with STEP 1 and work your way through. Each step builds on the previous one!

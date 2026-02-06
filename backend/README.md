# Mithila Makhana Backend API

Express.js + MongoDB backend for the Mithila Makhana e-commerce platform.

## 📁 Project Structure

```
backend/
├── models/              # MongoDB schemas
│   ├── Product.js      # Product model
│   ├── Order.js        # Order model
│   └── User.js         # User model
├── routes/             # API endpoints
│   ├── products.js     # Product routes
│   ├── orders.js       # Order routes
│   └── users.js        # User routes
├── server.js           # Express application
└── .env               # Environment variables
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- MongoDB (local or Atlas)
- npm

### Installation

```bash
cd backend
npm install
```

### Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env .env.example
```

2. Update `.env` with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/mithila-makhana
PORT=5000
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### Running the Server

**Development mode** (with auto-reload):
```bash
npm run server:dev
```

**Production mode**:
```bash
npm run server
```

**Run frontend + backend together**:
```bash
npm run dev:all
```

Server will run on `http://localhost:5000`

## 📚 API Endpoints

### Health Check
- `GET /api/health` - Check if server is running

### Products (`/api/products`)
- `GET /` - Get all products
- `GET /:id` - Get single product
- `POST /` - Create product (admin)
- `PUT /:id` - Update product (admin)
- `DELETE /:id` - Delete product (admin)

### Orders (`/api/orders`)
- `GET /` - Get all orders (user's orders)
- `GET /:id` - Get single order
- `POST /` - Create new order
- `PUT /:id` - Update order status (admin)
- `DELETE /:id` - Cancel order

### Users (`/api/users`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /profile/:id` - Get user profile
- `PUT /profile/:id` - Update user profile

## 📊 Database Models

### Product Schema
```javascript
{
  name: String (required),
  slug: String (unique, required),
  description: String,
  price: Number,
  originalPrice: Number,
  category: String (enum: classic, masala, premium, honey),
  rating: Number (0-5),
  reviews: Number,
  features: [String],
  nutritionFacts: {
    caloriesPer100g: Number,
    protein: Number,
    fat: Number,
    carbs: Number,
    fiber: Number
  },
  sizes: [{size: String, price: Number, stock: Number}],
  inStock: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### User Schema
```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (unique, required),
  phone: String,
  password: String (hashed),
  address: {street, city, state, postalCode, country},
  isAdmin: Boolean,
  preferences: {newsletter: Boolean, notifications: Boolean},
  createdAt: Date,
  updatedAt: Date
}
```

### Order Schema
```javascript
{
  orderNumber: String (unique),
  user: ObjectId (reference to User),
  items: [{product, quantity, price, size}],
  totalPrice: Number,
  shippingPrice: Number,
  taxPrice: Number,
  status: String (enum: pending, processing, shipped, delivered, cancelled),
  paymentStatus: String (enum: pending, completed, failed, refunded),
  shippingAddress: {firstName, lastName, email, phone, address, city, state, postalCode, country},
  paymentMethod: String (enum: credit_card, debit_card, upi, netbanking),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Environment Variables

```env
# Database
MONGODB_URI=mongodb://localhost:27017/mithila-makhana

# Server
PORT=5000
NODE_ENV=development

# Authentication
JWT_SECRET=your_jwt_secret_key

# Payment Gateway
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Frontend
FRONTEND_URL=http://localhost:3000
```

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables management

### Dev Dependencies (Optional)
```bash
npm install --save-dev nodemon
```

### Future Dependencies
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **validator** - Input validation
- **axios** - HTTP client
- **razorpay** - Payment integration
- **nodemailer** - Email sending
- **multer** - File upload handling

## 🔧 Development Tips

### Start with MongoDB

**Using local MongoDB**:
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Windows
net start MongoDB
```

**Using MongoDB Atlas (Cloud)**:
Replace `MONGODB_URI` in `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mithila-makhana
```

### Test API Endpoints

Use Postman or cURL:

```bash
# Health check
curl http://localhost:5000/api/health

# Get products
curl http://localhost:5000/api/products

# Create order
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"items": [], "totalPrice": 500}'
```

## 📋 Next Steps

1. **Add authentication**
   - Implement JWT-based auth
   - Hash passwords with bcryptjs
   - Create auth middleware

2. **Add validation**
   - Input validation with validator
   - Request body validation
   - Error handling

3. **Add payment integration**
   - Razorpay integration
   - Payment verification
   - Order confirmation

4. **Add file upload**
   - Product images with multer
   - Cloudinary/AWS S3 storage

5. **Add email notifications**
   - Order confirmation emails
   - Shipping updates
   - Marketing newsletters

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check if MongoDB is running
- Verify `MONGODB_URI` in `.env`
- Check network connectivity

### Port Already in Use
```bash
# Change PORT in .env
PORT=5001
```

### Missing Dependencies
```bash
npm install
```

## 📝 Deploy

### Heroku
```bash
git add .
git commit -m "Backend setup"
git push heroku main
```

### DigitalOcean/AWS
- Create Node.js droplet
- Install Node.js and MongoDB
- Clone repository
- Set environment variables
- Run with PM2: `pm2 start server.js`

## 📞 Support

For issues and questions, check the main README or contact support.

---

**Happy coding!** 🚀

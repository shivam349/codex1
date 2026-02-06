# 🚀 Mithila Makhana Backend API

A complete RESTful API backend for the Mithila Makhana e-commerce platform built with Node.js, Express, and MongoDB Atlas.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)

## ✨ Features

- **Product Management**: Full CRUD operations for products
- **Order Processing**: Complete order management system
- **User Authentication**: JWT-based authentication
- **Admin Panel**: Simple admin authentication for product/order management
- **Guest Checkout**: Support for guest user orders
- **MongoDB Atlas**: Cloud database integration
- **RESTful API**: Clean, organized API structure
- **Error Handling**: Comprehensive error handling
- **CORS Enabled**: Frontend integration ready

## 🛠 Tech Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT + bcryptjs
- **Validation**: Mongoose schema validation

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- npm or yarn

### Installation

1. **Clone the repository** (if not already cloned)
```bash
git clone https://github.com/shivam349/codex1.git
cd codex1
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and other credentials
```

4. **Seed the database** (optional but recommended)
```bash
npm run seed
```

5. **Start the development server**
```bash
npm run server:dev
```

The API will be available at `http://localhost:5000`

## 📡 API Endpoints

### Products

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/products` | Get all products | No |
| GET | `/api/products/:id` | Get single product | No |
| POST | `/api/products` | Create product | Admin |
| PUT | `/api/products/:id` | Update product | Admin |
| DELETE | `/api/products/:id` | Delete product | Admin |

**Query Parameters for GET /api/products:**
- `category`: Filter by category (premium, standard, organic, flavoured)
- `featured`: Filter featured products (true/false)
- `inStock`: Filter in-stock products (true/false)

### Orders

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/orders` | Create order | No (guest) |
| GET | `/api/orders` | Get all orders | Admin |
| GET | `/api/orders/:id` | Get order by ID | No |
| GET | `/api/orders/number/:orderNumber` | Get order by order number | No |
| GET | `/api/orders/user/:email` | Get orders by user email | No |
| PUT | `/api/orders/:id/status` | Update order status | Admin |
| PUT | `/api/orders/:id` | Update order | Admin |
| DELETE | `/api/orders/:id` | Delete order | Admin |

### Users

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/users/register` | Register new user | No |
| POST | `/api/users/login` | User login | No |
| POST | `/api/users/admin/login` | Admin login | No |
| GET | `/api/users/profile` | Get user profile | Yes |
| PUT | `/api/users/profile` | Update user profile | Yes |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API welcome message |
| GET | `/api/status` | API health status |

## 🔐 Authentication

### Admin Authentication (Simple)

For admin operations, add the following header to your requests:

```javascript
headers: {
  'admin-password': 'your_admin_password'
}
```

Or include in the request body:
```json
{
  "adminPassword": "your_admin_password"
}
```

### JWT Authentication

For user-specific operations:

1. Login via `/api/users/login` or `/api/users/admin/login`
2. Receive JWT token in response
3. Include token in subsequent requests:

```javascript
headers: {
  'Authorization': 'Bearer YOUR_JWT_TOKEN'
}
```

## 📦 Example API Calls

### Create a Product (Admin)

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "admin-password: admin123" \
  -d '{
    "name": "Premium Makhana",
    "description": "High quality makhana",
    "price": 299,
    "image": "image-url.jpg",
    "category": "premium",
    "stock": 50,
    "weight": "250g"
  }'
```

### Get All Products

```bash
curl http://localhost:5000/api/products
```

### Create an Order

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

### Admin Login

```bash
curl -X POST http://localhost:5000/api/users/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@mithilamakhana.com",
    "password": "admin123"
  }'
```

## 🌐 Deployment on Render

### Step 1: Prepare Your Repository

1. Push your code to GitHub
2. Ensure `render.yaml` is in the root directory
3. Ensure `.env` is in `.gitignore`

### Step 2: Create Render Account

1. Go to [Render.com](https://render.com)
2. Sign up with GitHub

### Step 3: Deploy

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Render will detect `render.yaml`
4. Set environment variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `ADMIN_EMAIL`: Your admin email
   - `ADMIN_PASSWORD`: Your admin password
   - `JWT_SECRET`: A secure random string
   - `FRONTEND_URL`: Your frontend URL (for CORS)

5. Click "Create Web Service"

### Step 4: Seed Database (One-time)

After deployment, run the seed script once:

1. Go to your service in Render
2. Click "Shell" tab
3. Run: `npm run seed`

## 🔧 Environment Variables

Create a `.env` file in the `backend` directory:

```env
# MongoDB
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Server
PORT=5000
NODE_ENV=development

# Authentication
JWT_SECRET=your_secure_random_string_here
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your_secure_password

# Frontend (for CORS)
FRONTEND_URL=http://localhost:3000
```

## 📁 Project Structure

```
backend/
├── middleware/
│   └── auth.js              # Authentication middleware
├── models/
│   ├── Product.js           # Product schema
│   ├── Order.js             # Order schema
│   └── User.js              # User schema
├── routes/
│   ├── productRoutes.js     # Product endpoints
│   ├── orders.js            # Order endpoints
│   └── users.js             # User endpoints
├── scripts/
│   └── seedDb.js            # Database seeding script
├── .env                     # Environment variables (not in git)
├── .env.example             # Example environment variables
├── .gitignore               # Git ignore file
├── package.json             # Backend dependencies
└── server.js                # Main server file
```

## 🧪 Testing the API

### Using curl

```bash
# Health check
curl http://localhost:5000/api/status

# Get products
curl http://localhost:5000/api/products

# Get specific product
curl http://localhost:5000/api/products/PRODUCT_ID
```

### Using Postman or Thunder Client

1. Import the API endpoints
2. Set base URL: `http://localhost:5000`
3. Test each endpoint with sample data

## 🔒 Security Notes

- Change default `ADMIN_PASSWORD` in production
- Use strong `JWT_SECRET` (minimum 32 characters)
- Never commit `.env` file to version control
- Use HTTPS in production
- Implement rate limiting for production
- Add input validation and sanitization

## 📝 Default Credentials (Development)

**Admin:**
- Email: `admin@mithilamakhana.com`
- Password: `admin123`

**Guest User:**
- Email: `guest@example.com`
- Password: `guest123`

⚠️ **Change these in production!**

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check your `MONGO_URI` in `.env`
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify network connectivity

### Port Already in Use
- Change `PORT` in `.env`
- Or kill the process using port 5000:
  ```bash
  # On Linux/Mac
  lsof -ti:5000 | xargs kill -9
  
  # On Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

### Admin Authentication Not Working
- Verify `ADMIN_PASSWORD` in `.env`
- Check the header or body contains correct password
- Ensure environment variables are loaded

## 📞 Support

For issues or questions:
- Create an issue on GitHub
- Contact: [Your Email/Support Channel]

## 📄 License

This project is licensed under the ISC License.

---

**Built with ❤️ for Mithila Makhana**

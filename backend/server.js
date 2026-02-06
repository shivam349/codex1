const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, '.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve admin panel
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Request logging middleware (development)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Routes
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orders");
const userRoutes = require("./routes/users");

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({ 
    message: "Mithila Makhana API is running",
    version: "1.0.0",
    endpoints: {
      products: "/api/products",
      orders: "/api/orders",
      users: "/api/users"
    }
  });
});

// API status endpoint
app.get("/api/status", (req, res) => {
  res.json({
    status: "active",
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: "Something went wrong!",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✓ MongoDB Connected Successfully");
    console.log(`✓ Database: ${mongoose.connection.name}`);
  })
  .catch(err => {
    console.error("✗ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✓ API URL: http://localhost:${PORT}`);
});

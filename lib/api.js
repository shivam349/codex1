// API Utility Functions for Frontend
// Place this file in your frontend (e.g., lib/api.js or utils/api.js)

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// ==================== PRODUCTS ====================

/**
 * Get all products
 * @param {Object} filters - Optional filters (category, featured, inStock)
 * @returns {Promise<Array>} Array of products
 */
export const getProducts = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.featured !== undefined) queryParams.append('featured', filters.featured);
    if (filters.inStock !== undefined) queryParams.append('inStock', filters.inStock);

    const url = `${API_URL}/products${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    const response = await fetch(url);
    
    if (!response.ok) throw new Error('Failed to fetch products');
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Get single product by ID
 * @param {string} id - Product ID
 * @returns {Promise<Object>} Product object
 */
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    
    if (!response.ok) throw new Error('Product not found');
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

/**
 * Add new product (Admin only)
 * @param {Object} productData - Product data
 * @param {string} adminPassword - Admin password
 * @returns {Promise<Object>} Created product
 */
export const addProduct = async (productData, adminPassword) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...productData,
        adminPassword
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) throw new Error(data.message || 'Failed to add product');
    
    return data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

/**
 * Update product (Admin only)
 * @param {string} id - Product ID
 * @param {Object} productData - Updated product data
 * @param {string} adminPassword - Admin password
 * @returns {Promise<Object>} Updated product
 */
export const updateProduct = async (id, productData, adminPassword) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...productData,
        adminPassword
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) throw new Error(data.message || 'Failed to update product');
    
    return data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

/**
 * Delete product (Admin only)
 * @param {string} id - Product ID
 * @param {string} adminPassword - Admin password
 * @returns {Promise<Object>} Success message
 */
export const deleteProduct = async (id, adminPassword) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'admin-password': adminPassword
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) throw new Error(data.message || 'Failed to delete product');
    
    return data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// ==================== ORDERS ====================

/**
 * Create new order
 * @param {Object} orderData - Order data
 * @returns {Promise<Object>} Created order
 */
export const createOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });
    
    const data = await response.json();
    
    if (!response.ok) throw new Error(data.message || 'Failed to create order');
    
    return data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

/**
 * Get all orders (Admin only)
 * @param {string} adminPassword - Admin password
 * @param {Object} filters - Optional filters (status, limit)
 * @returns {Promise<Array>} Array of orders
 */
export const getAllOrders = async (adminPassword, filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.limit) queryParams.append('limit', filters.limit);

    const url = `${API_URL}/orders${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    
    const response = await fetch(url, {
      headers: {
        'admin-password': adminPassword
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) throw new Error(data.message || 'Failed to fetch orders');
    
    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

/**
 * Get order by ID
 * @param {string} id - Order ID
 * @returns {Promise<Object>} Order object
 */
export const getOrderById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/orders/${id}`);
    
    if (!response.ok) throw new Error('Order not found');
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

/**
 * Get order by order number
 * @param {string} orderNumber - Order number (e.g., MM-SAMPLE-001)
 * @returns {Promise<Object>} Order object
 */
export const getOrderByNumber = async (orderNumber) => {
  try {
    const response = await fetch(`${API_URL}/orders/number/${orderNumber}`);
    
    if (!response.ok) throw new Error('Order not found');
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

/**
 * Get orders by user email
 * @param {string} email - User email
 * @returns {Promise<Array>} Array of orders
 */
export const getOrdersByEmail = async (email) => {
  try {
    const response = await fetch(`${API_URL}/orders/user/${email}`);
    
    if (!response.ok) throw new Error('Failed to fetch orders');
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

/**
 * Update order status (Admin only)
 * @param {string} id - Order ID
 * @param {Object} statusData - Status update data
 * @param {string} adminPassword - Admin password
 * @returns {Promise<Object>} Updated order
 */
export const updateOrderStatus = async (id, statusData, adminPassword) => {
  try {
    const response = await fetch(`${API_URL}/orders/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'admin-password': adminPassword
      },
      body: JSON.stringify(statusData)
    });
    
    const data = await response.json();
    
    if (!response.ok) throw new Error(data.message || 'Failed to update order');
    
    return data;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

// ==================== USERS ====================

/**
 * Register new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} User object with token
 */
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    
    const data = await response.json();
    
    if (!response.ok) throw new Error(data.message || 'Registration failed');
    
    // Store token in localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
    }
    
    return data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

/**
 * User login
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User object with token
 */
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) throw new Error(data.message || 'Login failed');
    
    // Store token in localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
    }
    
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

/**
 * Admin login
 * @param {string} email - Admin email
 * @param {string} password - Admin password
 * @returns {Promise<Object>} Admin user object with token
 */
export const adminLogin = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/users/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) throw new Error(data.message || 'Admin login failed');
    
    // Store token in localStorage
    if (data.token) {
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('admin', JSON.stringify(data));
    }
    
    return data;
  } catch (error) {
    console.error('Error logging in as admin:', error);
    throw error;
  }
};

/**
 * Get user profile
 * @param {string} token - JWT token
 * @returns {Promise<Object>} User profile
 */
export const getUserProfile = async (token) => {
  try {
    const response = await fetch(`${API_URL}/users/profile`, {
      headers: {
        'Authorization': `Bearer ${token || localStorage.getItem('token')}`
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) throw new Error(data.message || 'Failed to fetch profile');
    
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

/**
 * Update user profile
 * @param {Object} userData - Updated user data
 * @param {string} token - JWT token
 * @returns {Promise<Object>} Updated user object
 */
export const updateUserProfile = async (userData, token) => {
  try {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token || localStorage.getItem('token')}`
      },
      body: JSON.stringify(userData)
    });
    
    const data = await response.json();
    
    if (!response.ok) throw new Error(data.message || 'Failed to update profile');
    
    return data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

/**
 * Logout user
 */
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('adminToken');
  localStorage.removeItem('admin');
};

/**
 * Check if user is logged in
 * @returns {boolean}
 */
export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};

/**
 * Check if admin is logged in
 * @returns {boolean}
 */
export const isAdminLoggedIn = () => {
  return !!localStorage.getItem('adminToken');
};

/**
 * Get current user from localStorage
 * @returns {Object|null}
 */
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// ==================== EXAMPLE USAGE ====================

/*

// In your React component:

import { getProducts, createOrder, loginUser } from '@/lib/api';

// Get all products
const products = await getProducts();

// Get featured products
const featuredProducts = await getProducts({ featured: true });

// Get products by category
const premiumProducts = await getProducts({ category: 'premium' });

// Create order
const orderData = {
  items: [
    {
      product: '66f1234567890abcdef',
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

// User login
const user = await loginUser('user@example.com', 'password123');
console.log('Logged in:', user);

*/

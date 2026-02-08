// API Configuration - Render Backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://codex1-nq28.onrender.com';

// ==================== PRODUCTS ====================

/**
 * Get all products from MongoDB
 */
export const getProducts = async (options = {}) => {
  try {
    const { limit = 50, page = 1, category } = options;
    let url = `${API_URL}/api/products?limit=${limit}&page=${page}`;
    if (category) url += `&category=${category}`;
    
    console.log('📦 Fetching products from:', url);
    const response = await fetch(url, {
      next: { revalidate: 300 } // Revalidate every 5 minutes (ISR)
    });
    
    if (!response.ok) throw new Error('Failed to fetch products');
    
    const data = await response.json();
    console.log('✅ Loaded ' + (data.data?.length || 0) + ' products');
    return data.data || [];
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    return [];
  }
};

/**
 * Get single product by ID
 */
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`);
    
    if (!response.ok) throw new Error('Product not found');
    
    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error('❌ Error fetching product:', error);
    return null;
  }
};

/**
 * Add new product (Admin only)
 */
export const addProduct = async (productData) => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) return { success: false, message: 'Not authenticated' };

    console.log('➕ Adding product:', productData.name);
    const response = await fetch(`${API_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Product added');
    } else {
      console.error('❌ Failed:', data.message);
    }
    
    return data;
  } catch (error) {
    console.error('❌ Error adding product:', error);
    return { success: false, message: error.message };
  }
};

/**
 * Upload product image (Admin only)
 */
export const uploadProductImage = async (file) => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) return { success: false, message: 'Not authenticated' };

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_URL}/api/uploads/image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Error uploading image:', error);
    return { success: false, message: error.message };
  }
};

/**
 * Update product (Admin only)
 */
export const updateProduct = async (id, productData) => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) return { success: false, message: 'Not authenticated' };

    const response = await fetch(`${API_URL}/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
    
    const data = await response.json();
    console.log(data.success ? '✅ Product updated' : '❌ Failed to update');
    return data;
  } catch (error) {
    console.error('❌ Error updating product:', error);
    return { success: false, message: error.message };
  }
};

/**
 * Delete product (Admin only)
 */
export const deleteProduct = async (id) => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) return { success: false, message: 'Not authenticated' };

    const response = await fetch(`${API_URL}/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    console.log(data.success ? '✅ Product deleted' : '❌ Failed to delete');
    return data;
  } catch (error) {
    console.error('❌ Error deleting product:', error);
    return { success: false, message: error.message };
  }
};

// ==================== ORDERS ====================

/**
 * Place new order
 */
export const placeOrder = async (orderData) => {
  try {
    console.log('📦 Placing order to:', `${API_URL}/api/orders`);
    const response = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Order placed');
    } else {
      console.error('❌ Failed to place order:', data.message);
    }
    
    return data;
  } catch (error) {
    console.error('❌ Error placing order:', error);
    return { success: false, message: error.message };
  }
};

/**
 * Get all orders (Admin only)
 */
export const getOrders = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) return [];

    const response = await fetch(`${API_URL}/api/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    console.log('✅ Orders loaded:', data.data?.length);
    return data.data || [];
  } catch (error) {
    console.error('❌ Error fetching orders:', error);
    return [];
  }
};

/**
 * Get order by ID (Admin only)
 */
export const getOrderById = async (id) => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) return null;

    const response = await fetch(`${API_URL}/api/orders/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error('❌ Error fetching order:', error);
    return null;
  }
};

/**
 * Update order status (Admin only)
 */
export const updateOrderStatus = async (orderId, status) => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) return { success: false, message: 'Not authenticated' };

    const response = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    
    const data = await response.json();
    console.log(data.success ? '✅ Order updated' : '❌ Failed to update');
    return data;
  } catch (error) {
    console.error('❌ Error updating order:', error);
    return { success: false, message: error.message };
  }
};

// ==================== AUTH ====================

/**
 * Admin login
 */
export const loginAdmin = async (email, password) => {
  try {
    console.log('🔐 Logging in to:', `${API_URL}/api/auth/login`);
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    
    console.log('📍 Response status:', response.status);
    const data = await response.json();
    console.log('📍 Response data:', data);
    
    if (data.success) {
      console.log('✅ Login successful');
      localStorage.setItem('adminToken', data.data.token);
    } else {
      console.error('❌ Login failed:', data.message);
    }
    
    return data;
  } catch (error) {
    console.error('❌ Login error:', error);
    const errorMsg = error instanceof TypeError && error.message === 'Failed to fetch' 
      ? 'Cannot connect to server. Please check your internet connection and backend URL.' 
      : error.message;
    return { success: false, message: errorMsg };
  }
};

/**
 * Logout admin
 */
export const logoutAdmin = () => {
  localStorage.removeItem('adminToken');
  console.log('✅ Logged out');
};

/**
 * Check if admin is logged in
 */
export const isAdminLoggedIn = () => {
  return !!localStorage.getItem('adminToken');
};

// ==================== EXAMPLE USAGE ====================

/*

import { getProducts, placeOrder, loginAdmin } from '@/lib/api';

// Get all products
const products = await getProducts();
console.log(products);

// Place order
const orderData = {
  customerName: 'John Doe',
  phone: '1234567890',
  address: '123 Main St, Mumbai',
  cartItems: [
    {  
      productId: '66f1234567890abcdef',
      name: 'Premium Makhana',
      price: 299,
      quantity: 2
    }
  ],
  totalAmount: 598
};

const order = await placeOrder(orderData);
console.log('Order:', order);

// Admin login
const login = await loginAdmin('admin@mithilamakhana.com', 'admin123');
console.log('Logged in:', login);

*/

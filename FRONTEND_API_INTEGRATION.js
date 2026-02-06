// 🔌 Frontend API Integration for Mithila Makhana

// ==============================================
// Configuration
// ==============================================

// In your Next.js project, create a .env.local file:
// NEXT_PUBLIC_API_URL=http://localhost:5000

// In production (.env.production):
// NEXT_PUBLIC_API_URL=https://your-backend.onrender.com

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ==============================================
// Helper Functions
// ==============================================

// Get auth token from localStorage
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('adminToken');
  }
  return null;
};

// Save token to localStorage
const saveToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('adminToken', token);
  }
};

// Remove token from localStorage
const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminToken');
  }
};

// ==============================================
// Authentication API
// ==============================================

/**
 * Admin Login
 * @param {string} email - Admin email
 * @param {string} password - Admin password
 * @returns {Promise<Object>} User data with token
 */
export const loginAdmin = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      // Save token to localStorage
      saveToken(data.data.token);
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Login failed' };
  }
};

/**
 * Admin Logout
 */
export const logoutAdmin = () => {
  removeToken();
};

/**
 * Check if admin is logged in
 * @returns {boolean}
 */
export const isAdminLoggedIn = () => {
  return !!getToken();
};

// ==============================================
// Product API
// ==============================================

/**
 * Get all products
 * @param {string} category - Optional category filter
 * @returns {Promise<Array>} Array of products
 */
export const getProducts = async (category = null) => {
  try {
    const url = category 
      ? `${API_URL}/api/products?category=${category}`
      : `${API_URL}/api/products`;

    const response = await fetch(url);
    const data = await response.json();

    return data.success ? data.data : [];
  } catch (error) {
    console.error('Get products error:', error);
    return [];
  }
};

/**
 * Get single product by ID
 * @param {string} productId - Product ID
 * @returns {Promise<Object>} Product data
 */
export const getProductById = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/api/products/${productId}`);
    const data = await response.json();

    return data.success ? data.data : null;
  } catch (error) {
    console.error('Get product error:', error);
    return null;
  }
};

/**
 * Add new product (Admin only)
 * @param {Object} productData - Product information
 * @returns {Promise<Object>} Created product
 */
export const addProduct = async (productData) => {
  try {
    const token = getToken();

    if (!token) {
      return { success: false, message: 'Not authorized' };
    }

    const response = await fetch(`${API_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Add product error:', error);
    return { success: false, message: 'Failed to add product' };
  }
};

/**
 * Update product (Admin only)
 * @param {string} productId - Product ID
 * @param {Object} productData - Updated product data
 * @returns {Promise<Object>} Updated product
 */
export const updateProduct = async (productId, productData) => {
  try {
    const token = getToken();

    if (!token) {
      return { success: false, message: 'Not authorized' };
    }

    const response = await fetch(`${API_URL}/api/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Update product error:', error);
    return { success: false, message: 'Failed to update product' };
  }
};

/**
 * Delete product (Admin only)
 * @param {string} productId - Product ID
 * @returns {Promise<Object>} Success message
 */
export const deleteProduct = async (productId) => {
  try {
    const token = getToken();

    if (!token) {
      return { success: false, message: 'Not authorized' };
    }

    const response = await fetch(`${API_URL}/api/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Delete product error:', error);
    return { success: false, message: 'Failed to delete product' };
  }
};

// ==============================================
// Order API
// ==============================================

/**
 * Place new order
 * @param {Object} orderData - Order information
 * @returns {Promise<Object>} Created order
 */
export const placeOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Place order error:', error);
    return { success: false, message: 'Failed to place order' };
  }
};

/**
 * Get all orders (Admin only)
 * @returns {Promise<Array>} Array of orders
 */
export const getAllOrders = async () => {
  try {
    const token = getToken();

    if (!token) {
      return { success: false, message: 'Not authorized' };
    }

    const response = await fetch(`${API_URL}/api/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Get orders error:', error);
    return [];
  }
};

/**
 * Get single order by ID (Admin only)
 * @param {string} orderId - Order ID
 * @returns {Promise<Object>} Order data
 */
export const getOrderById = async (orderId) => {
  try {
    const token = getToken();

    if (!token) {
      return { success: false, message: 'Not authorized' };
    }

    const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Get order error:', error);
    return null;
  }
};

/**
 * Update order status (Admin only)
 * @param {string} orderId - Order ID
 * @param {string} status - New status: 'pending', 'processing', 'shipped', 'delivered'
 * @returns {Promise<Object>} Updated order
 */
export const updateOrderStatus = async (orderId, status) => {
  try {
    const token = getToken();

    if (!token) {
      return { success: false, message: 'Not authorized' };
    }

    const response = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Update order status error:', error);
    return { success: false, message: 'Failed to update order status' };
  }
};

// ==============================================
// USAGE EXAMPLES
// ==============================================

/*

// ===== IN YOUR COMPONENTS =====

// 1. Display Products on Homepage
import { getProducts } from '@/lib/api';

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {products.map(product => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
        </div>
      ))}
    </div>
  );
}

// 2. Admin Login Page
import { loginAdmin } from '@/lib/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await loginAdmin(email, password);
    
    if (result.success) {
      alert('Login successful!');
      // Redirect to admin dashboard
      router.push('/admin/dashboard');
    } else {
      alert(result.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}

// 3. Add Product (Admin)
import { addProduct } from '@/lib/api';

export default function AddProductForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const productData = {
      name: 'Premium Makhana',
      price: 299,
      image: 'https://example.com/image.jpg',
      description: 'High quality makhana from Mithila',
      category: 'premium',
      stock: 50
    };

    const result = await addProduct(productData);
    
    if (result.success) {
      alert('Product added successfully!');
    } else {
      alert(result.message || 'Failed to add product');
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}

// 4. Place Order
import { placeOrder } from '@/lib/api';

export default function CheckoutPage() {
  const handleCheckout = async () => {
    const orderData = {
      customerName: 'John Doe',
      phone: '9876543210',
      address: '123 Main Street, Mumbai, Maharashtra 400001',
      cartItems: [
        {
          productId: 'PRODUCT_ID_HERE',
          name: 'Premium Makhana',
          price: 299,
          quantity: 2
        }
      ],
      totalAmount: 598
    };

    const result = await placeOrder(orderData);
    
    if (result.success) {
      alert('Order placed successfully!');
      // Show order confirmation
    } else {
      alert('Failed to place order');
    }
  };

  return <button onClick={handleCheckout}>Place Order</button>;
}

// 5. Admin Orders Dashboard
import { getAllOrders, updateOrderStatus } from '@/lib/api';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getAllOrders();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const result = await updateOrderStatus(orderId, newStatus);
    if (result.success) {
      // Refresh orders
      const data = await getAllOrders();
      setOrders(data);
    }
  };

  return (
    <div>
      {orders.map(order => (
        <div key={order._id}>
          <p>Order: {order._id}</p>
          <p>Customer: {order.customerName}</p>
          <p>Total: ₹{order.totalAmount}</p>
          <select 
            value={order.status} 
            onChange={(e) => handleStatusChange(order._id, e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
}

*/

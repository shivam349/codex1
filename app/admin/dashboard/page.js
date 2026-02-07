'use client';

import { useAuth } from '@/lib/context/AuthContext';
import { getProducts, addProduct, updateProduct, deleteProduct, getOrders, updateOrderStatus, uploadProductImage } from '@/lib/api';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: 'premium',
    stock: '',
  });
  const [loading, setLoading] = useState(false);

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const result = await getProducts();
      setProducts(result || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const result = await getOrders();
      setOrders(result || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.image) {
        alert('❌ Please upload an image first.');
        setLoading(false);
        return;
      }

      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      };

      let data;
      if (editingProduct) {
        // Update existing product
        data = await updateProduct(editingProduct._id, productData);
        if (data.success) {
          alert('✅ Product updated successfully!');
          setEditingProduct(null);
        } else {
          alert('❌ Failed to update product: ' + data.message);
        }
      } else {
        // Add new product
        data = await addProduct(productData);
        if (data.success) {
          alert('✅ Product added successfully!');
        } else {
          alert('❌ Failed to add product: ' + data.message);
        }
      }

      if (data.success) {
        setFormData({
          name: '',
          price: '',
          image: '',
          description: '',
          category: 'premium',
          stock: '',
        });
        fetchProducts();
      }
    } catch (error) {
      alert('❌ Error: ' + error.message);
    }

    setLoading(false);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      description: product.description,
      category: product.category,
      stock: product.stock.toString(),
    });
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    setImageUploading(true);

    try {
      const result = await uploadProductImage(file);
      if (result.success && result.data?.url) {
        setFormData((prev) => ({ ...prev, image: result.data.url }));
      } else {
        alert('❌ Failed to upload image: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      alert('❌ Error uploading image: ' + error.message);
    }

    setImageUploading(false);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      image: '',
      description: '',
      category: 'premium',
      stock: '',
    });
  };

  const handleDeleteProduct = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const data = await deleteProduct(productId);
      if (data.success) {
        alert('✅ Product deleted!');
        fetchProducts();
      } else {
        alert('❌ Failed to delete: ' + data.message);
      }
    } catch (error) {
      alert('❌ Error: ' + error.message);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const data = await updateOrderStatus(orderId, newStatus);

      if (data.success) {
        alert('Order updated!');
        fetchOrders();
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent\">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Manage your Mithila Makhana store</p>
          </div>
          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            <button
              onClick={() => {
                setActiveTab('products');
                fetchProducts();
              }}
              className={`py-4 px-4 font-medium border-b-2 transition-colors ${
                activeTab === 'products'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Products ({products.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('orders');
                fetchOrders();
              }}
              className={`py-4 px-4 font-medium border-b-2 transition-colors ${
                activeTab === 'orders'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Orders ({orders.length})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add Product Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  {editingProduct && (
                    <button
                      onClick={handleCancelEdit}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      ✕ Cancel
                    </button>
                  )}
                </div>
                <form onSubmit={handleSubmitProduct} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files?.[0])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      disabled={imageUploading}
                    />
                    {imageUploading && (
                      <p className="text-xs text-gray-500 mt-1">Uploading image...</p>
                    )}
                    {formData.image && (
                      <div className="mt-2">
                        <img
                          src={formData.image}
                          alt="Uploaded preview"
                          className="w-24 h-24 object-cover rounded border border-gray-200"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="premium">Premium</option>
                      <option value="standard">Standard</option>
                      <option value="organic">Organic</option>
                      <option value="flavoured">Flavoured</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock
                    </label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-medium hover:shadow-lg disabled:opacity-50"
                  >
                    {loading 
                      ? (editingProduct ? 'Updating...' : 'Adding...') 
                      : (editingProduct ? 'Update Product' : 'Add Product')
                    }
                  </button>
                </form>
              </div>
            </div>

            {/* Products List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Products List</h2>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {products.length === 0 ? (
                    <p className="text-gray-500">No products yet. Add your first product!</p>
                  ) : (
                    products.map((product) => (
                      <div
                        key={product._id}
                        className="border border-gray-200 rounded-lg p-4 flex gap-4"
                      >
                        <img
                          src={product.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect fill="%23e0e9f5" width="80" height="80"/%3E%3C/svg%3E'}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded bg-blue-50"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect fill="%23e0e9f5" width="80" height="80"/%3E%3C/svg%3E';
                          }}
                        />
                        <div className="flex-1">
                          <h3 className="font-bold">{product.name}</h3>
                          <p className="text-sm text-gray-600">₹{product.price}</p>
                          <p className="text-sm text-gray-700">Stock: {product.stock}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Customer</th>
                    <th className="px-4 py-2 text-left">Total</th>
                    <th className="px-4 py-2 text-left">Phone</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                        No orders yet
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order._id} className="border-t">
                        <td className="px-4 py-2">{order.customerName}</td>
                        <td className="px-4 py-2">₹{order.totalAmount}</td>
                        <td className="px-4 py-2">{order.phone}</td>
                        <td className="px-4 py-2">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleUpdateOrderStatus(order._id, e.target.value)
                            }
                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() =>
                              alert(
                                `Order ID: ${order._id}\nAddress: ${order.address}`
                              )
                            }
                            className="text-blue-600 hover:underline"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

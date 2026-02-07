'use client';

import { useCart } from '@/lib/context/CartContext';
import { placeOrder } from '@/lib/api';
import { useState } from 'react';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    address: '',
  });

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }

    setLoading(true);

    try {
      const data = await placeOrder({
        ...formData,
        cartItems: cart.map((item) => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: getTotalPrice(),
      });

      if (data.success) {
        alert('✅ Order placed successfully!');
        clearCart();
        setFormData({ customerName: '', phone: '', address: '' });
      } else {
        alert('❌ Failed to place order: ' + data.message);
      }
    } catch (error) {
      alert('❌ Error: ' + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cart.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
                <Link
                  href="/"
                  className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:shadow-lg"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item._id}
                      className="flex gap-4 border-b pb-4 last:border-b-0"
                    >
                      <img
                        src={item.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96"%3E%3Crect fill="%23e0e9f5" width="96" height="96"/%3E%3Ctext x="50%" y="50%" font-family="Arial" font-size="12" fill="%231e40af" text-anchor="middle" dominant-baseline="middle"%3EImage%3C/text%3E%3C/svg%3E'}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded bg-blue-50"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96"%3E%3Crect fill="%23e0e9f5" width="96" height="96"/%3E%3C/svg%3E';
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{item.name}</h3>
                        <p className="text-gray-600">₹{item.price}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.quantity - 1)
                            }
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            −
                          </button>
                          <span className="px-3">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.quantity + 1)
                            }
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            +
                          </button>
                          <span className="ml-auto font-bold">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-600 hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total:</span>
                    <span>₹{getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Checkout Form */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Checkout</h2>

              {cart.length > 0 ? (
                <form onSubmit={handleCheckout} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.customerName}
                      onChange={(e) =>
                        setFormData({ ...formData, customerName: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Address
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      required
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Order Total:</span>
                      <br />
                      <span className="text-2xl font-bold text-blue-600">
                        ₹{getTotalPrice().toFixed(2)}
                      </span>
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium hover:shadow-lg disabled:opacity-50"
                  >
                    {loading ? 'Placing Order...' : 'Place Order'}
                  </button>
                </form>
              ) : (
                <p className="text-gray-600 text-center py-8">
                  Add items to cart to checkout
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

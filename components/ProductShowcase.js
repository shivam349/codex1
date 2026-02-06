'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';
import { getProducts } from '@/lib/api';

gsap.registerPlugin(ScrollTrigger);

export default function ProductShowcase() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const { addToCart } = useCart();

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getProducts();
        setProducts(result || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        // Fallback to hardcoded products
        setProducts([
          {
            _id: 1,
            name: 'Classic Makhana',
            price: 499,
            image: 'https://via.placeholder.com/300x300?text=Classic',
            description: 'Pure roasted makhana with natural salt',
            category: 'standard',
            stock: 50,
          },
          {
            _id: 2,
            name: 'Masala Makhana',
            price: 599,
            image: 'https://via.placeholder.com/300x300?text=Masala',
            description: 'Traditional spiced roasted makhana',
            category: 'standard',
            stock: 50,
          },
          {
            _id: 3,
            name: 'Premium Organic',
            price: 799,
            image: 'https://via.placeholder.com/300x300?text=Organic',
            description: 'Certified organic makhana harvested fresh',
            category: 'organic',
            stock: 50,
          },
          {
            _id: 4,
            name: 'Honey Makhana',
            price: 699,
            image: 'https://via.placeholder.com/300x300?text=Honey',
            description: 'Lightly sweetened with natural honey',
            category: 'flavoured',
            stock: 50,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 20%',
              scrub: 1,
              markers: false,
            },
            opacity: 0,
            y: 80,
            rotation: -5 + index * 2,
            duration: 0.8,
          });
        }
      });

      cardsRef.current.forEach((card) => {
        if (card) {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -10,
              duration: 0.3,
            });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              duration: 0.3,
            });
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [products]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    alert(`✅ ${product.name} added to cart!`);
  };

  return (
    <section id="products" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
              Premium Collection
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked makhana collection, sourced directly from the fertile fields of Mithila
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-lg text-gray-600">Loading products...</p>
          </div>
        ) : (
          <div
            ref={containerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {products.map((product, index) => (
              <div
                key={product._id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-amber-600">
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock <= 0}
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-500 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {product.stock > 0 ? '🛒 Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

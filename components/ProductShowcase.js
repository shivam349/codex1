'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';
import { getProducts } from '@/lib/api';
import { defaultProducts } from '@/lib/productImages';

gsap.registerPlugin(ScrollTrigger);

// Fallback product image
const FALLBACK_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23e0e9f5" width="400" height="400"/%3E%3Ctext x="50%" y="50%" font-family="Arial" font-size="24" fill="%231e40af" text-anchor="middle" dominant-baseline="middle" text-transform="uppercase"%3EMakhana Image%3C/text%3E%3C/svg%3E';

export default function ProductShowcase() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const { addToCart } = useCart();

  // Ensure product has all required fields
  const enrichProduct = (product) => {
    return {
      ...product,
      image: product.image || FALLBACK_IMAGE,
      imageFallback: product.imageFallback || FALLBACK_IMAGE,
      _id: product._id || product.id || Math.random(),
      name: product.name || 'Makhana Product',
      price: product.price || 0,
      description: product.description || '',
      category: product.category || 'standard',
      stock: product.stock !== undefined ? product.stock : 0,
    };
  };

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getProducts();
        if (result && result.length > 0) {
          // Enrich API products with fallback values
          setProducts(result.map(enrichProduct));
        } else {
          // Use default products if API returns empty
          setProducts(defaultProducts.map(enrichProduct));
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        // Fallback to default products with proper images
        setProducts(defaultProducts.map(enrichProduct));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleImageError = (productId) => {
    setImageErrors(prev => ({
      ...prev,
      [productId]: true
    }));
  };

  const getImageSource = (product) => {
    if (imageErrors[product._id]) {
      return product.imageFallback || FALLBACK_IMAGE;
    }
    return product.image || FALLBACK_IMAGE;
  };

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
            Our <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
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
                <div className="relative h-48 bg-blue-50 overflow-hidden">
                  <img
                    src={getImageSource(product)}
                    alt={product.name}
                    onError={() => handleImageError(product._id)}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock <= 0}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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

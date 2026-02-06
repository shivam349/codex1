'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductViewer from './ProductViewer';

gsap.registerPlugin(ScrollTrigger);

export default function ProductDetail({ product = {} }) {
  const [quantity, setQuantity] = useState(1);
  const contentRef = useRef(null);
  const featuresRef = useRef([]);

  const defaultProduct = {
    id: 1,
    name: 'Classic Makhana',
    price: 499,
    originalPrice: 599,
    rating: 4.8,
    reviews: 245,
    description: 'Pure roasted makhana with natural salt. Experience the authentic taste of Mithila with our classic collection.',
    features: [
      'Lightly roasted to perfection',
      'Natural Himalayan salt',
      '100% organic, no pesticides',
      'High in protein and calcium',
      'Crunchy and delightful taste',
      'Vacuum sealed for freshness'
    ],
    nutritionFacts: {
      caloriesPer100g: 347,
      protein: 14.5,
      fat: 3.2,
      carbs: 63.1,
      fiber: 4.2
    },
    color: '#f59e0b',
    availableSizes: [
      { size: '250g', price: 299 },
      { size: '500g', price: 499 },
      { size: '1kg', price: 899 },
      { size: '2kg', price: 1699 }
    ]
  };

  const prod = { ...defaultProduct, ...product };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
      });

      featuresRef.current.forEach((feature, index) => {
        gsap.from(feature, {
          opacity: 0,
          x: -20,
          delay: 0.1 + index * 0.05,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={contentRef} className="space-y-12">
      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* 3D Viewer */}
        <div className="h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
          <ProductViewer product={prod.name} color={prod.color} classNameProp="h-full" />
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">{prod.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(prod.rating) ? 'text-amber-400' : 'text-gray-300'}>
                    ⭐
                  </span>
                ))}
              </div>
              <span className="text-gray-600">({prod.reviews} reviews)</span>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed">{prod.description}</p>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-5xl font-bold text-amber-600">₹{prod.price}</span>
              <span className="text-2xl text-gray-500 line-through">₹{prod.originalPrice}</span>
              <span className="text-lg font-bold text-green-600">
                Save {Math.round((1 - prod.price / prod.originalPrice) * 100)}%
              </span>
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-4">Select Size</label>
            <div className="grid grid-cols-2 gap-4">
              {prod.availableSizes.map((size) => (
                <button
                  key={size.size}
                  className="p-4 border-2 border-amber-200 rounded-xl hover:border-amber-600 hover:bg-amber-50 transition-all text-center"
                >
                  <p className="font-bold text-gray-900">{size.size}</p>
                  <p className="text-sm text-gray-600">₹{size.price}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex gap-4">
            <div className="flex items-center border-2 border-gray-200 rounded-full">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-gray-600 hover:text-amber-600 transition-colors"
              >
                −
              </button>
              <span className="px-6 text-xl font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-gray-600 hover:text-amber-600 transition-colors"
              >
                +
              </button>
            </div>
            <button className="flex-1 px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-500 text-white rounded-full font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105">
              Add to Cart
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex gap-6 pt-4 border-t border-amber-200">
            <div>
              <p className="text-sm text-gray-600">✓ Free Shipping</p>
              <p className="text-xs text-gray-500">On orders above ₹500</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">✓ 100% Money Back</p>
              <p className="text-xs text-gray-500">If not satisfied</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">✓ Fast Delivery</p>
              <p className="text-xs text-gray-500">Within 3-5 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features & Nutrition */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Features */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose This?</h2>
          <ul className="space-y-4">
            {prod.features.map((feature, index) => (
              <li
                key={index}
                ref={(el) => (featuresRef.current[index] = el)}
                className="flex items-start gap-4 p-4 rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors"
              >
                <span className="text-2xl flex-shrink-0">✓</span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Nutrition Facts */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Nutrition Facts</h2>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 space-y-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Per 100g serving</p>
              <p className="text-4xl font-bold text-amber-600">{prod.nutritionFacts.caloriesPer100g}</p>
              <p className="text-gray-600">Calories</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white rounded-xl">
                <p className="text-sm text-gray-600">Protein</p>
                <p className="text-2xl font-bold text-amber-700">{prod.nutritionFacts.protein}g</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl">
                <p className="text-sm text-gray-600">Fat</p>
                <p className="text-2xl font-bold text-orange-600">{prod.nutritionFacts.fat}g</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl">
                <p className="text-sm text-gray-600">Carbs</p>
                <p className="text-2xl font-bold text-amber-700">{prod.nutritionFacts.carbs}g</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl">
                <p className="text-sm text-gray-600">Fiber</p>
                <p className="text-2xl font-bold text-orange-600">{prod.nutritionFacts.fiber}g</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

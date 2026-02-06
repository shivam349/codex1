'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    slug: 'classic',
    name: 'Classic Makhana',
    price: '₹499',
    description: 'Pure roasted makhana with natural salt',
    features: ['100% Natural', 'No Added Sugar', 'Protein Rich'],
    rating: 4.8,
  },
  {
    id: 2,
    slug: 'masala',
    name: 'Masala Makhana',
    price: '₹599',
    description: 'Traditional spiced roasted makhana',
    features: ['Spiced Blend', 'Authentic Recipe', 'Low Fat'],
    rating: 4.9,
  },
  {
    id: 3,
    slug: 'premium',
    name: 'Premium Organic',
    price: '₹799',
    description: 'Certified organic makhana harvested fresh',
    features: ['Organic Certified', 'Vacuum Packed', 'Farm Direct'],
    rating: 5.0,
  },
  {
    id: 4,
    slug: 'honey',
    name: 'Honey Makhana',
    price: '₹699',
    description: 'Lightly sweetened with natural honey',
    features: ['Natural Honey', 'Healthy Snack', 'No Preservatives'],
    rating: 4.7,
  },
];

export default function ProductShowcase() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
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
      });

      // Stagger hover effect
      cardsRef.current.forEach((card) => {
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
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="products"
      className="py-24 px-6 bg-gradient-to-b from-white to-amber-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-amber-900 to-orange-600 bg-clip-text text-transparent mb-4">
            Our Collections
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked selections of makhana harvested fresh from the wetlands of Mithila
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer border border-amber-100 group"
            >
              {/* Product Image */}
              <div className="relative h-64 bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">🌾</div>
                </div>
                <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ⭐ {product.rating}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs bg-amber-50 text-amber-700 px-3 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-2xl font-bold text-amber-600">{product.price}</span>
                  <Link
                    href={`/product/${product.slug}`}
                    className="bg-gradient-to-r from-amber-600 to-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105 inline-block"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

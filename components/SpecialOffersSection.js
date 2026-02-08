'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const offers = [
  {
    badge: '🎉 MONSOON SPECIAL',
    discount: '₹150 OFF',
    condition: 'on orders above ₹500',
    color: 'from-amber-400 to-orange-400',
  },
  {
    badge: '🌱 BUY 3 GET 1 FREE',
    discount: 'Save 25%',
    condition: 'on any combination',
    color: 'from-orange-400 to-red-400',
  },
  {
    badge: '🎁 GIFT PACK OFFER',
    discount: 'Premium Pack',
    condition: '₹799 for 2kg (Save ₹200)',
    color: 'from-yellow-400 to-amber-400',
  },
];

export default function SpecialOffersSection() {
  const containerRef = useRef(null);
  const offersRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      offersRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
          },
          opacity: 0,
          rotation: -10 + index * 5,
          y: 50,
          duration: 0.8,
          stagger: 0.2,
        });

        // Hover animation
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            rotation: 0,
            y: -10,
            duration: 0.3,
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotation: -10 + index * 5,
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
      className="py-24 px-6 bg-gradient-to-b from-white to-makhana-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-makhana-700 to-earth-600 bg-clip-text text-transparent mb-4">
            🔥 Exclusive Offers
          </h2>
          <p className="text-xl text-gray-600">Limited time promotions on your favorite makhana collections</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <div
              key={index}
              ref={(el) => (offersRef.current[index] = el)}
              className={`relative rounded-2xl p-8 overflow-hidden cursor-pointer group`}
            >
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${offer.color} opacity-90`}
              />

              {/* Content */}
              <div className="relative z-10 text-white">
                <div className="mb-4">
                  <p className="text-sm font-bold mb-2 opacity-90">{offer.badge}</p>
                  <h3 className="text-4xl font-bold mb-2">{offer.discount}</h3>
                  <p className="text-white/80">{offer.condition}</p>
                </div>

                <button className="mt-6 px-6 py-2 bg-white text-makhana-600 rounded-full font-bold hover:shadow-lg transition-all group-hover:scale-105">
                  Claim Offer
                </button>
              </div>

              {/* Decorative element */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
            </div>
          ))}
        </div>

        {/* Offer info */}
        <div className="mt-12 bg-white rounded-2xl p-8 border-2 border-makhana-200 text-center">
          <p className="text-gray-600 text-lg mb-3">
            ⏰ Offers valid until the end of the month
          </p>
          <p className="text-sm text-gray-500">No minimum purchase required. Valid on both online and direct orders.</p>
        </div>
      </div>
    </section>
  );
}

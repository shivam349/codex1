'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: '🌿',
    title: 'Naturally Organic',
    description: 'Grown in pristine wetlands without any chemical pesticides or artificial fertilizers',
  },
  {
    icon: '❤️',
    title: 'Heart Healthy',
    description: 'Low in calories and fat, packed with minerals and essential nutrients for wellness',
  },
  {
    icon: '🏆',
    title: 'Certified Quality',
    description: 'Tested and certified by international standards for purity and safety',
  },
  {
    icon: '🚀',
    title: 'Energy Boost',
    description: 'Perfect snack for active lifestyle, high in protein and carbohydrates',
  },
  {
    icon: '🌱',
    title: 'Ethical Farming',
    description: 'Supporting traditional farming communities and sustainable agriculture',
  },
  {
    icon: '🎯',
    title: 'Long Shelf Life',
    description: 'Vacuum sealed packaging keeps makhana fresh for months without preservatives',
  },
];

export default function BenefitsSection() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
      });

      // Card stagger animation
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        },
        opacity: 0,
        y: 60,
        stagger: 0.1,
        duration: 0.8,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-24 px-6 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20" ref={titleRef}>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-amber-900 to-orange-600 bg-clip-text text-transparent mb-4">
            Why Choose Mithila Makhana?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the health benefits and quality assurance that make our makhana the best choice for your family
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 hover:shadow-xl transition-all border border-amber-100"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 to-orange-400/0 group-hover:from-amber-400/10 group-hover:to-orange-400/10 rounded-2xl transition-all" />

              <div className="relative z-10">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              {/* Decorative element */}
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-amber-200/50 to-orange-200/50 rounded-tl-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

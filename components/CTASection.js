'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          scrub: 1,
        },
        opacity: 0,
        y: 50,
        scale: 0.95,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 bg-gradient-to-r from-amber-600 to-orange-500 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div
        ref={contentRef}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <h2 className="text-5xl font-bold text-white mb-6">
          Ready to Experience Authentic Makhana?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust us for the finest quality lotus seeds delivered straight from Mithila to your doorstep.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-amber-700 rounded-full font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105">
            Shop Fresh Makhana
          </button>
          <button className="px-8 py-4 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all">
            Get Free Sample
          </button>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-white">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>100% Money Back</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>Free Shipping on Orders Above ₹500</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>24/7 Customer Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate content on scroll
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
      });

      // Animate image
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 px-6"
      style={{ background: 'linear-gradient(180deg, #FDF2E6 0%, #FFF8F0 100%)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div
            ref={imageRef}
            className="opacity-0 -translate-x-10"
          >
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dgvlnob4f/image/upload/v1770471076/mithila-makhana/yfym8zzxcnqlq31aispc.jpg"
                alt="Mithila Makhana Farm"
                className="w-full rounded-2xl shadow-card"
              />
              <div className="absolute -bottom-6 -right-6 bg-makhana-500 text-white p-6 rounded-xl shadow-lg max-w-xs">
                <p className="font-bold text-lg">Premium Quality</p>
                <p className="text-sm opacity-90">Handpicked and roasted fresh</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            ref={contentRef}
            className="opacity-0 translate-y-10 space-y-6"
          >
            <div>
              <h2 className="section-title mb-4">About Mithila Makhana</h2>
              <p className="text-body text-lg">
                Mithila Makhana is a premium brand dedicated to bringing authentic foxnuts from the fertile lands of Mithila, Bihar.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-body">
                Our makhana is carefully harvested, naturally processed, and roasted using traditional techniques to preserve taste and nutrition.
              </p>
              <p className="text-body">
                We work directly with local farmers to ensure freshness, quality, and fair sourcing. Every pack delivers a healthy snack rich in protein, low in fat, and full of natural goodness.
              </p>
              <p className="text-body font-semibold text-makhana-600">
                Our mission is to take Mithila's heritage to every home and make makhana a global superfood.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-makhana-200">
              <div>
                <p className="text-3xl font-bold text-makhana-600">500+</p>
                <p className="text-sm text-muted">Farmers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-makhana-600">50k+</p>
                <p className="text-sm text-muted">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-makhana-600">100%</p>
                <p className="text-sm text-muted">Organic</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

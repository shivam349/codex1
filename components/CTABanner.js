'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6"
      style={{
        background: 'linear-gradient(135deg, #C67C2E 0%, #8B5E34 100%)',
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div
          ref={contentRef}
          className="opacity-0 translate-y-10 text-center space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Order Fresh Mithila Makhana Today
          </h2>
          <p className="text-xl text-makhana-50 max-w-2xl mx-auto">
            Join thousands of customers enjoying premium foxnuts from Mithila. Fresh, healthy, and delivered to your door.
          </p>
          <Link href="#products" className="inline-block btn-accent px-10 py-4">
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}

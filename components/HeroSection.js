'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import MakhanaScene from './MakhanaScene';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const badgesRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
      })
        .from(subtitleRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
        }, '-=0.5')
        .from(ctaRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
        }, '-=0.5')
        .from(badgesRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
        }, '-=0.5')
        .from(sceneRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 1,
        }, '-=0.8');

      // Parallax scroll effect
      gsap.to(sceneRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
        y: -100,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFF8F0 0%, #FDF2E6 50%, #E8B896 100%)',
      }}
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-makhana-400/15 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-makhana-400/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 py-20">
        {/* Left content */}
        <div className="space-y-8">
          {/* Main headline */}
          <div>
            <h1
              ref={titleRef}
              className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight"
            >
              Premium Mithila Makhana
            </h1>
            <p className="text-makhana-600 font-semibold text-xl mt-2">Healthy Snack from Bihar</p>
          </div>

          {/* Subheading */}
          <p
            ref={subtitleRef}
            className="text-lg text-gray-700 max-w-lg leading-relaxed"
          >
            Handpicked foxnuts from the fertile lands of Mithila. Roasted fresh, packed with nutrition, and delivered to your door.
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Link href="#products" className="btn-primary">
              Shop Now
            </Link>
            <Link href="#about" className="btn-secondary">
              Explore Collection
            </Link>
          </div>

          {/* Trust Badges */}
          <div
            ref={badgesRef}
            className="grid grid-cols-2 gap-3 pt-8"
          >
            <div className="badge">
              <span className="text-xl">🌿</span>
              <span>100% Natural</span>
            </div>
            <div className="badge">
              <span className="text-xl">💪</span>
              <span>High Protein</span>
            </div>
            <div className="badge">
              <span className="text-xl">🚜</span>
              <span>Farm Fresh</span>
            </div>
            <div className="badge">
              <span className="text-xl">🏠</span>
              <span>Made in Bihar</span>
            </div>
          </div>
        </div>

        {/* Right 3D scene */}
        <div
          ref={sceneRef}
          className="h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl relative"
          style={{
            backgroundImage: 'url(https://res.cloudinary.com/dgvlnob4f/image/upload/v1770471076/mithila-makhana/yfym8zzxcnqlq31aispc.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/10" />
          <MakhanaScene classNameProp="h-full" />
        </div>
      </div>
    </section>
  );
}

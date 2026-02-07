'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MakhanaScene from './MakhanaScene';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
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
        .from(buttonRef.current, {
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left content */}
        <div className="space-y-8">
          <div>
            <h1
              ref={titleRef}
              className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 bg-clip-text text-transparent"
            >
              Mithila Makhana
            </h1>
            <p
              ref={subtitleRef}
              className="text-xl text-gray-600 mt-4 max-w-lg"
            >
              Experience the authentic taste of traditional Mithila popped lotus seeds, crafted with centuries of heritage and modern quality standards.
            </p>
          </div>

          <div
            ref={buttonRef}
            className="flex flex-wrap gap-4"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold hover:shadow-2xl transition-all transform hover:scale-105">
              Shop Now
            </button>
            <button className="px-8 py-4 border-2 border-blue-600 text-blue-700 rounded-full font-semibold hover:bg-blue-50 transition-all">
              Learn More
            </button>
          </div>

          {/* Features */}
          <div className="pt-8 border-t border-blue-200 grid grid-cols-3 gap-4">
            <div>
              <p className="text-3xl font-bold text-blue-700">100%</p>
              <p className="text-sm text-gray-600">Natural</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">Organic</p>
              <p className="text-sm text-gray-600">Certified</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-700">Fresh</p>
              <p className="text-sm text-gray-600">Daily</p>
            </div>
          </div>
        </div>

        {/* Right 3D scene */}
        <div
          ref={sceneRef}
          className="h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
        >
          <MakhanaScene classNameProp="h-full" />
        </div>
      </div>
    </section>
  );
}

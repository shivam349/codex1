'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MakhanaScene from '@/components/MakhanaScene';

gsap.registerPlugin(ScrollTrigger);

const products = [
  { name: 'Classic Roasted', desc: 'Lightly salted and crunchy.', price: '₹299' },
  { name: 'Peri Peri Spice', desc: 'Bold flavor with smoky heat.', price: '₹329' },
  { name: 'Caramel Crunch', desc: 'Sweet, crisp and delightful.', price: '₹349' }
];

export default function HomePage() {
  const heroRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-text > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out'
      });

      cardsRef.current.forEach((card) => {
        if (!card) {
          return;
        }
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%'
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out'
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="gradient-bg min-h-screen">
      <header className="sticky top-0 z-20 border-b border-brand-100 glass">
        <nav className="mx-auto flex w-[92%] max-w-6xl items-center justify-between py-4">
          <span className="text-xl font-bold text-brand-700">Mithila Makhana</span>
          <button className="rounded-full bg-brand-400 px-4 py-2 text-sm font-semibold text-white">Cart (0)</button>
        </nav>
      </header>

      <section ref={heroRef} className="mx-auto grid w-[92%] max-w-6xl gap-10 py-14 md:grid-cols-2 md:items-center">
        <div className="hero-text space-y-5">
          <p className="font-semibold text-brand-700">3D Premium Experience • Mithila, Bihar</p>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">Authentic Mithila Makhana, now in an immersive 3D store.</h1>
          <p className="max-w-xl text-[#6b6459]">Explore floating makhana kernels in 3D, discover flavors, and order healthy fox nuts sourced directly from Mithila farmers.</p>
          <div className="flex gap-3">
            <a href="#products" className="rounded-full bg-brand-400 px-6 py-3 font-semibold text-white">Shop Now</a>
            <a href="#products" className="rounded-full border border-brand-400 px-6 py-3 font-semibold text-brand-700">View Flavors</a>
          </div>
        </div>
        <MakhanaScene />
      </section>

      <section id="products" className="mx-auto w-[92%] max-w-6xl py-8 pb-16">
        <h2 className="mb-2 text-3xl font-bold">Best Selling Products</h2>
        <p className="mb-8 text-[#6b6459]">Scroll to discover animated product cards powered by GSAP.</p>
        <div className="grid gap-5 md:grid-cols-3">
          {products.map((product, index) => (
            <article
              key={product.name}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="rounded-2xl border border-brand-100 bg-white p-6 shadow-card"
            >
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="mt-2 text-[#6b6459]">{product.desc}</p>
              <p className="mt-4 text-2xl font-bold text-brand-700">{product.price}</p>
              <button className="mt-4 rounded-full bg-brand-400 px-5 py-2 font-semibold text-white">Add to Cart</button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Health Enthusiast',
    text: 'The quality of makhana is exceptional! Fresh, crispy, and no artificial flavors. This is my go-to healthy snack now.',
    rating: 5,
    avatar: '👩‍💼',
  },
  {
    name: 'Raj Kumar',
    role: 'Fitness Coach',
    text: 'I recommend Mithila Makhana to all my clients. Perfect for post-workout snacking with great protein content.',
    rating: 5,
    avatar: '👨‍🏫',
  },
  {
    name: 'Ananya Gupta',
    role: 'Food Blogger',
    text: 'Authentic taste of Mithila, delivered to your door. The 3D shopping experience is truly innovative!',
    rating: 5,
    avatar: '👩‍🍳',
  },
  {
    name: 'Vikram Singh',
    role: 'Business Owner',
    text: 'Fast delivery, great customer service, and premium quality. What more can you ask for?',
    rating: 5,
    avatar: '👨‍💼',
  },
];

export default function TestimonialSection() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
          },
          opacity: 0,
          x: index % 2 === 0 ? -100 : 100,
          duration: 0.8,
          stagger: 0.1,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-24 px-6 bg-gradient-to-b from-makhana-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-makhana-700 to-earth-600 bg-clip-text text-transparent mb-4">
            Loved by Customers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thousands of happy customers trust us for their daily dose of authentic Mithila makhana
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-makhana-100"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-5xl">{testimonial.avatar}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-makhana-400">⭐</span>
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed italic">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>

        {/* Rating badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          <div className="text-center">
            <p className="text-4xl font-bold text-makhana-600">4.9/5</p>
            <p className="text-gray-600">Average Rating</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-makhana-600">2000+</p>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-earth-700">10K+</p>
            <p className="text-gray-600">Orders Delivered</p>
          </div>
        </div>
      </div>
    </section>
  );
}

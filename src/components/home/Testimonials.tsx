'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import SectionHeading from '@/components/shared/SectionHeading';
import { Testimonial } from '@/types';
import { testimonialsData } from '@/data/menuItems';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const testimonials: Testimonial[] = testimonialsData.map((testimonial, i) => ({ ...testimonial, _id: String(i) }));

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="section-padding bg-dark-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="What Our Guests Say" title="Stories of Excellence" />
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass rounded-3xl p-8 sm:p-12 text-center border border-gold-400/20"
            >
              <div className="flex justify-center mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <FiStar key={i} size={20} className="text-gold-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-cream/80 text-lg sm:text-xl leading-relaxed mb-8 italic font-serif">
                &ldquo;{testimonials[current].comment}&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gold-400">
                  <Image src={testimonials[current].avatar} alt={testimonials[current].name} fill className="object-cover" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-cream">{testimonials[current].name}</p>
                  <p className="text-cream/50 text-sm">{testimonials[current].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-cream/60 hover:border-gold-400 hover:text-gold-400 transition-colors"
            >
              <FiChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-gold-400 w-6' : 'bg-white/20'}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((c) => (c + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-cream/60 hover:border-gold-400 hover:text-gold-400 transition-colors"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

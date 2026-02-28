'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SpecialOffer() {
  return (
    <section className="py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-dark-700 to-dark-600 border border-gold-400/30 p-8 sm:p-16"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-gold-400 text-sm font-medium tracking-widest uppercase mb-3">Limited Time Offer</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream mb-4">
                Afternoon Tea Experience
              </h2>
              <p className="text-cream/60 max-w-xl leading-relaxed">
                Indulge in our signature Afternoon Tea service. Includes a selection of premium teas, freshly baked scones with clotted cream, finger sandwiches, and an assortment of petit fours.
              </p>
              <div className="mt-4 flex items-center gap-4">
                <span className="text-cream/40 line-through text-xl">$65</span>
                <span className="text-gold-400 text-3xl font-bold font-serif">$45</span>
                <span className="bg-gold-400/20 text-gold-400 text-sm px-3 py-1 rounded-full border border-gold-400/30">
                  Save 30%
                </span>
              </div>
            </div>
            <Link
              href="/reservations"
              className="flex-shrink-0 px-10 py-5 bg-gold-400 hover:bg-gold-500 text-dark-900 font-bold rounded-2xl text-lg transition-all hover:scale-105"
            >
              Book Now
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

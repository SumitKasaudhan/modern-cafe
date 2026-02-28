'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920"
          alt="Café atmosphere"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-dark-900/80" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-gold-400 text-sm font-medium tracking-widest uppercase mb-4">
            Make a Reservation
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-cream mb-6">
            Reserve Your Table Today
          </h2>
          <p className="text-cream/60 text-lg leading-relaxed mb-10">
            Whether celebrating a special occasion or simply treating yourself to an extraordinary dining experience, we look forward to welcoming you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/reservations" className="px-10 py-4 bg-gold-400 hover:bg-gold-500 text-dark-900 font-bold rounded-full transition-all hover:scale-105">
              Reserve a Table
            </Link>
            <Link href="/contact" className="px-10 py-4 border border-white/30 hover:border-gold-400 text-cream hover:text-gold-400 font-semibold rounded-full transition-all">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

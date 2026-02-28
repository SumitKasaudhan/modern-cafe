'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1920"
          alt="Modern Café Interior"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/70 via-dark-900/50 to-dark-900/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gold-400 text-sm font-medium tracking-widest uppercase mb-6"
        >
          Welcome to the Pinnacle of Luxury
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-serif text-5xl sm:text-6xl lg:text-8xl font-bold text-cream leading-tight mb-8"
        >
          Modern{' '}
          <span className="gold-text">Café</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-cream/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Where extraordinary flavors meet timeless elegance. Every visit is a journey through the finest culinary artistry.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/menu"
            className="px-8 py-4 bg-gold-400 hover:bg-gold-500 text-dark-900 font-semibold rounded-full text-base transition-all hover:scale-105"
          >
            View Menu
          </Link>
          <Link
            href="/reservations"
            className="px-8 py-4 border border-cream/40 hover:border-gold-400 text-cream hover:text-gold-400 font-semibold rounded-full text-base transition-all hover:scale-105"
          >
            Reserve a Table
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-cream/40 text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-gold-400/60 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

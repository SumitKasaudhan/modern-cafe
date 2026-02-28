'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPreview() {
  return (
    <section className="section-padding bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800"
                alt="About Modern Café"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-gold-400 text-dark-900 p-6 rounded-2xl">
              <p className="text-3xl font-serif font-bold">15+</p>
              <p className="text-sm font-medium">Years of Excellence</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gold-400 text-sm font-medium tracking-widest uppercase mb-4">Our Story</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-cream mb-6 leading-tight">
              A Legacy of<br />Exceptional Taste
            </h2>
            <p className="text-cream/60 leading-relaxed mb-6">
              Founded in 2009, Modern Café was born from a passion for the finest culinary experiences. Our founders traveled the world to curate a menu that brings together the best of global cuisine with locally sourced ingredients.
            </p>
            <p className="text-cream/60 leading-relaxed mb-8">
              Every detail of our café—from the hand-selected furniture to the custom-blended coffee beans—reflects our commitment to creating an atmosphere where luxury is not an extravagance, but a standard.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold-400 hover:bg-gold-500 text-dark-900 font-semibold rounded-full transition-all hover:scale-105"
            >
              Discover Our Story
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

'use client';
import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/shared/AnimatedCounter';

const stats = [
  { value: 15, suffix: '+', label: 'Years of Excellence' },
  { value: 50000, suffix: '+', label: 'Happy Customers' },
  { value: 120, suffix: '+', label: 'Menu Items' },
  { value: 28, suffix: '', label: 'Awards Won' },
];

export default function Stats() {
  return (
    <section className="py-20 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-serif font-bold text-dark-900 mb-2">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-dark-700 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

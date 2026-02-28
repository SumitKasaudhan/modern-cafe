'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  subtitle,
  title,
  description,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${centered ? 'text-center' : ''}`}
    >
      {subtitle && (
        <p className="text-gold-400 text-sm font-medium tracking-widest uppercase mb-3">
          {subtitle}
        </p>
      )}
      <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold ${light ? 'text-dark-900' : 'text-cream'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-dark-600' : 'text-cream/60'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}

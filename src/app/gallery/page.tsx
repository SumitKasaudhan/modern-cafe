'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import SectionHeading from '@/components/shared/SectionHeading';

const categories = ['All', 'Interior', 'Food', 'Events', 'Team'];

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800', category: 'Interior', title: 'The Main Hall' },
  { src: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800', category: 'Food', title: 'Signature Espresso' },
  { src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800', category: 'Food', title: 'Fresh Croissants' },
  { src: 'https://images.unsplash.com/photo-1473093226555-0f57a3a4a3df?w=800', category: 'Food', title: 'Truffle Pasta' },
  { src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800', category: 'Interior', title: 'Evening Ambiance' },
  { src: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800', category: 'Food', title: 'Gold Latte Art' },
  { src: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800', category: 'Team', title: 'Our Barista' },
  { src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800', category: 'Interior', title: 'Window Seating' },
  { src: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800', category: 'Food', title: 'Chocolate Fondant' },
  { src: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=800', category: 'Food', title: 'Avocado Toast' },
  { src: 'https://images.unsplash.com/photo-1519671282429-b44660ead0a7?w=800', category: 'Events', title: 'Evening Event' },
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', category: 'Events', title: 'Private Dining' },
];

export default function GalleryPage() {
  const [category, setCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const filtered = category === 'All' ? galleryImages : galleryImages.filter(img => img.category === category);

  const prev = () => setLightboxIndex(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null);
  const next = () => setLightboxIndex(i => i !== null ? (i + 1) % filtered.length : null);

  return (
    <main className="min-h-screen pt-20 bg-dark-900">
      <div className="relative h-64 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1920" alt="Gallery" fill className="object-cover" />
        <div className="absolute inset-0 bg-dark-900/70 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gold-400 text-sm tracking-widest uppercase mb-2">Visual Journey</p>
            <h1 className="font-serif text-4xl font-bold text-cream">Our Gallery</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex gap-2 justify-center mb-10 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${category === cat ? 'bg-gold-400 text-dark-900' : 'bg-dark-700 text-cream/60 border border-white/10 hover:text-cream'}`}>
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((img, i) => (
            <motion.div key={img.src} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => setLightboxIndex(i)}>
              <Image src={img.src} alt={img.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-dark-900/0 group-hover:bg-dark-900/50 transition-all flex items-end p-3">
                <p className="text-cream text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">{img.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}>
            <button onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-cream">
              <FiX size={18} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-cream">
              <FiChevronLeft size={18} />
            </button>
            <div className="relative max-w-4xl max-h-[80vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
              <Image src={filtered[lightboxIndex].src} alt={filtered[lightboxIndex].title} fill className="object-contain" />
            </div>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-cream">
              <FiChevronRight size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

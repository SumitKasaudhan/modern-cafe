'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';
import SectionHeading from '@/components/shared/SectionHeading';
import { MenuItem } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/stores/cartStore';
import { MenuItemSkeleton } from '@/components/ui/Skeleton';
import toast from 'react-hot-toast';

export default function FeaturedItems() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetch('/api/menu?featured=true')
      .then((r) => r.json())
      .then((data) => { setItems(data.slice(0, 6)); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Chef's Selection"
          title="Featured Delights"
          description="Handpicked selections from our master chef, crafted with the finest ingredients for an unforgettable experience."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array(6).fill(0).map((_, i) => <MenuItemSkeleton key={i} />)
            : items.map((item, i) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group bg-dark-700 rounded-2xl overflow-hidden border border-white/5 hover:border-gold-400/30 transition-all"
                >
                  <div className="relative h-52">
                    <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif font-semibold text-cream text-lg mb-1">{item.name}</h3>
                    <p className="text-cream/50 text-sm line-clamp-2 mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gold-400 font-semibold text-lg">{formatPrice(item.price)}</span>
                      <button
                        onClick={() => { addItem(item); toast.success(`${item.name} added!`); }}
                        className="flex items-center gap-2 px-4 py-2 bg-gold-400 hover:bg-gold-500 text-dark-900 rounded-xl text-sm font-medium transition-colors"
                      >
                        <FiPlus size={14} /> Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/menu" className="inline-flex items-center gap-2 px-8 py-4 border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-dark-900 rounded-full font-semibold transition-all">
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}

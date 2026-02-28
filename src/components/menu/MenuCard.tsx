'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiPlus, FiInfo } from 'react-icons/fi';
import { MenuItem } from '@/types';
import { formatPrice, cn } from '@/lib/utils';
import { useCartStore } from '@/stores/cartStore';
import toast from 'react-hot-toast';

interface MenuCardProps {
  item: MenuItem;
  onViewDetails: (item: MenuItem) => void;
}

const dietaryColors: Record<string, string> = {
  vegan: 'bg-green-900/50 text-green-400 border-green-800',
  'gluten-free': 'bg-yellow-900/50 text-yellow-400 border-yellow-800',
  vegetarian: 'bg-emerald-900/50 text-emerald-400 border-emerald-800',
  spicy: 'bg-red-900/50 text-red-400 border-red-800',
};

export default function MenuCard({ item, onViewDetails }: MenuCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    if (!item.available) return;
    setIsAdding(true);
    addItem(item);
    toast.success(`${item.name} added to cart!`);
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -4 }}
      className="group bg-dark-700 rounded-2xl overflow-hidden border border-white/5 hover:border-gold-400/30 transition-all duration-300"
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {!item.available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-cream/80 font-medium bg-dark-800/80 px-3 py-1 rounded-full text-sm">
              Unavailable
            </span>
          </div>
        )}
        <button
          onClick={() => onViewDetails(item)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-dark-800/80 backdrop-blur-sm flex items-center justify-center text-cream/60 hover:text-gold-400 transition-colors opacity-0 group-hover:opacity-100"
        >
          <FiInfo size={14} />
        </button>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-1 mb-3">
          {item.dietaryTags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className={cn(
                'text-xs px-2 py-0.5 rounded-full border',
                dietaryColors[tag] || 'bg-dark-600 text-cream/50 border-white/10'
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-serif font-semibold text-cream text-lg mb-1 line-clamp-1">
          {item.name}
        </h3>
        <p className="text-cream/50 text-sm line-clamp-2 mb-4">{item.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-gold-400 font-semibold text-lg">{formatPrice(item.price)}</span>
          <button
            onClick={handleAddToCart}
            disabled={!item.available || isAdding}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all',
              item.available
                ? 'bg-gold-400 hover:bg-gold-500 text-dark-900'
                : 'bg-dark-600 text-cream/30 cursor-not-allowed',
              isAdding && 'scale-95'
            )}
          >
            <FiPlus size={14} />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}

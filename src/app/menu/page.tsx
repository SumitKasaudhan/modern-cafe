'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiGrid, FiList, FiFilter } from 'react-icons/fi';
import SectionHeading from '@/components/shared/SectionHeading';
import MenuCard from '@/components/menu/MenuCard';
import { MenuItemSkeleton } from '@/components/ui/Skeleton';
import { MenuItem } from '@/types';
import Modal from '@/components/ui/Modal';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/stores/cartStore';
import toast from 'react-hot-toast';

const categories = ['All', 'Coffee', 'Tea', 'Pastries', 'Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Beverages', 'Specials'];

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [sortBy, setSortBy] = useState('default');
  const addItem = useCartStore((state) => state.addItem);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category !== 'All') params.set('category', category);
      if (search) params.set('search', search);
      const res = await fetch(`/api/menu?${params}`);
      const data = await res.json();
      setItems(data);
    } catch { /* fetch errors are handled by keeping previous state */ } finally {
      setLoading(false);
    }
  }, [category, search]);

  useEffect(() => {
    const timer = setTimeout(fetchItems, 300);
    return () => clearTimeout(timer);
  }, [fetchItems]);

  const sorted = [...items].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <main className="min-h-screen pt-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeading subtitle="Culinary Excellence" title="Our Menu" description="Explore our curated selection of premium coffees, teas, and culinary creations." />

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <FiSearch size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" />
              <input
                type="text"
                placeholder="Search menu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-dark-700 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-cream placeholder-cream/40 focus:outline-none focus:border-gold-400"
              />
            </div>
            <div className="flex gap-2 items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-cream focus:outline-none focus:border-gold-400"
              >
                <option value="default">Sort By</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
              <button onClick={() => setViewMode('grid')} className={`p-3 rounded-xl ${viewMode === 'grid' ? 'bg-gold-400 text-dark-900' : 'bg-dark-700 text-cream/60'}`}>
                <FiGrid size={16} />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-3 rounded-xl ${viewMode === 'list' ? 'bg-gold-400 text-dark-900' : 'bg-dark-700 text-cream/60'}`}>
                <FiList size={16} />
              </button>
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  category === cat
                    ? 'bg-gold-400 text-dark-900'
                    : 'bg-dark-700 text-cream/60 hover:text-cream border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid/List */}
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array(8).fill(0).map((_, i) => <MenuItemSkeleton key={i} />)}
            </div>
          ) : sorted.length === 0 ? (
            <div className="text-center py-20 text-cream/40">
              <FiFilter size={48} className="mx-auto mb-4" />
              <p>No items found</p>
            </div>
          ) : (
            <motion.div
              layout
              className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}
            >
              {sorted.map((item) => (
                <MenuCard key={item._id} item={item} onViewDetails={setSelectedItem} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Item Detail Modal */}
        {selectedItem && (
          <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem.name} size="lg">
            <div className="p-6">
              <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                <Image src={selectedItem.image} alt={selectedItem.name} fill className="object-cover" />
              </div>
              <p className="text-cream/70 mb-4">{selectedItem.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-cream/40 uppercase tracking-wide mb-2">Category</p>
                  <p className="text-cream">{selectedItem.category}</p>
                </div>
                <div>
                  <p className="text-xs text-cream/40 uppercase tracking-wide mb-2">Price</p>
                  <p className="text-gold-400 font-semibold text-xl">{formatPrice(selectedItem.price)}</p>
                </div>
              </div>
              {selectedItem.ingredients?.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-cream/40 uppercase tracking-wide mb-2">Ingredients</p>
                  <p className="text-cream/70 text-sm">{selectedItem.ingredients.join(', ')}</p>
                </div>
              )}
              {selectedItem.nutritionalInfo && (
                <div className="grid grid-cols-4 gap-3 mb-6 p-4 bg-dark-800 rounded-xl">
                  {Object.entries(selectedItem.nutritionalInfo).map(([key, val]) => (
                    <div key={key} className="text-center">
                      <p className="text-gold-400 font-semibold">{val}{key === 'calories' ? '' : 'g'}</p>
                      <p className="text-cream/40 text-xs capitalize">{key}</p>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={() => { addItem(selectedItem); toast.success(`${selectedItem.name} added to cart!`); setSelectedItem(null); }}
                disabled={!selectedItem.available}
                className="w-full py-4 bg-gold-400 hover:bg-gold-500 text-dark-900 font-semibold rounded-xl transition-colors"
              >
                {selectedItem.available ? 'Add to Cart' : 'Currently Unavailable'}
              </button>
            </div>
          </Modal>
        )}
      </div>
    </main>
  );
}

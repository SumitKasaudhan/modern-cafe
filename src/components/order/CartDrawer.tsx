'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMinus, FiPlus, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/lib/utils';

export default function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, getTotal } = useCartStore();
  const total = getTotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={toggleCart}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-dark-800 border-l border-white/10 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <h2 className="text-xl font-serif font-semibold text-cream">Your Cart</h2>
              <button
                onClick={toggleCart}
                className="p-2 text-cream/60 hover:text-cream rounded-lg hover:bg-white/10 transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <FiShoppingBag size={48} className="text-cream/20" />
                  <p className="text-cream/60">Your cart is empty</p>
                  <Link
                    href="/menu"
                    onClick={toggleCart}
                    className="px-6 py-2 bg-gold-400 text-dark-900 font-semibold rounded-xl text-sm hover:bg-gold-500 transition-colors"
                  >
                    Browse Menu
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={`${item.menuItem._id}-${item.size ?? 'default'}`} className="flex gap-4 p-3 rounded-xl bg-dark-700">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.menuItem.image}
                          alt={item.menuItem.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-cream text-sm">{item.menuItem.name}</p>
                        {item.size && <p className="text-xs text-cream/50">{item.size}</p>}
                        <p className="text-gold-400 text-sm font-semibold">{formatPrice(item.menuItem.price)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.menuItem._id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center hover:border-gold-400 hover:text-gold-400 transition-colors"
                          >
                            <FiMinus size={10} />
                          </button>
                          <span className="text-sm text-cream w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.menuItem._id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center hover:border-gold-400 hover:text-gold-400 transition-colors"
                          >
                            <FiPlus size={10} />
                          </button>
                          <button
                            onClick={() => removeItem(item.menuItem._id)}
                            className="ml-auto text-cream/40 hover:text-red-400 transition-colors"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-cream/60">Subtotal</span>
                  <span className="text-cream font-semibold">{formatPrice(total)}</span>
                </div>
                <Link
                  href="/order"
                  onClick={toggleCart}
                  className="block w-full text-center bg-gold-400 hover:bg-gold-500 text-dark-900 font-semibold py-4 rounded-xl transition-colors"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

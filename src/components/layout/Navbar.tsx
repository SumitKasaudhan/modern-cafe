'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiMenu, FiX, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import { useCartStore } from '@/stores/cartStore';
import { useUIStore } from '@/stores/uiStore';
import CartDrawer from '@/components/order/CartDrawer';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/reservations', label: 'Reservations' },
  { href: '/order', label: 'Order Online' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { data: session } = useSession();
  const { isMobileMenuOpen, isNavScrolled, toggleMobileMenu, closeMobileMenu, setNavScrolled } = useUIStore();
  const { isOpen: isCartOpen, toggleCart } = useCartStore();
  const itemCount = useCartStore((state) => state.getItemCount());
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setNavScrolled]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isNavScrolled
            ? 'bg-dark-800/95 backdrop-blur-md shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gold-400 flex items-center justify-center">
                <span className="text-dark-900 font-serif font-bold text-lg">M</span>
              </div>
              <div>
                <span className="text-cream font-serif text-xl font-semibold tracking-wide group-hover:text-gold-400 transition-colors">
                  Modern Café
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-cream/80 hover:text-gold-400 transition-colors text-sm font-medium tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-4">
              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative p-2 text-cream/80 hover:text-gold-400 transition-colors"
                aria-label="Shopping cart"
              >
                <FiShoppingCart size={22} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold-400 text-dark-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>

              {/* User */}
              {session ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1 rounded-full border border-gold-400/30 hover:border-gold-400 transition-colors"
                  >
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gold-400/20 flex items-center justify-center">
                        <FiUser size={16} className="text-gold-400" />
                      </div>
                    )}
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 top-12 w-48 glass rounded-xl overflow-hidden border border-gold-400/20"
                      >
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="text-sm font-medium text-cream">{session.user?.name}</p>
                          <p className="text-xs text-cream/50">{session.user?.email}</p>
                        </div>
                        <Link
                          href="/profile"
                          className="flex items-center gap-2 px-4 py-3 text-sm text-cream/80 hover:text-gold-400 hover:bg-white/5 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <FiUser size={14} />
                          Profile
                        </Link>
                        {(session.user as any)?.role === 'admin' && (
                          <Link
                            href="/admin"
                            className="flex items-center gap-2 px-4 py-3 text-sm text-cream/80 hover:text-gold-400 hover:bg-white/5 transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <FiSettings size={14} />
                            Admin
                          </Link>
                        )}
                        <button
                          onClick={() => { signOut(); setUserMenuOpen(false); }}
                          className="w-full flex items-center gap-2 px-4 py-3 text-sm text-cream/80 hover:text-red-400 hover:bg-white/5 transition-colors"
                        >
                          <FiLogOut size={14} />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-dark-900 bg-gold-400 hover:bg-gold-500 rounded-full transition-colors"
                >
                  Sign In
                </Link>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 text-cream/80 hover:text-gold-400 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-dark-800/95 backdrop-blur-md border-t border-white/10"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-cream/80 hover:text-gold-400 transition-colors text-lg font-medium py-2 border-b border-white/5"
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Overlay for user menu */}
      {userMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </>
  );
}

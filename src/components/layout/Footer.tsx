'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube, FiArrowUp, FiMail } from 'react-icons/fi';
import toast from 'react-hot-toast';

const quickLinks = [
  { href: '/menu', label: 'Menu' },
  { href: '/reservations', label: 'Reservations' },
  { href: '/order', label: 'Order Online' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  { href: '#', icon: FiInstagram, label: 'Instagram' },
  { href: '#', icon: FiFacebook, label: 'Facebook' },
  { href: '#', icon: FiTwitter, label: 'Twitter' },
  { href: '#', icon: FiYoutube, label: 'YouTube' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        toast.success('Successfully subscribed to our newsletter!');
        setEmail('');
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to subscribe');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-800 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gold-400 flex items-center justify-center">
                <span className="text-dark-900 font-serif font-bold text-lg">M</span>
              </div>
              <span className="text-cream font-serif text-xl font-semibold">Modern Café</span>
            </div>
            <p className="text-cream/60 text-sm leading-relaxed mb-6">
              A sanctuary of luxury and flavor in the heart of the city. We craft extraordinary experiences through exceptional coffee, exquisite cuisine, and impeccable service.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-cream/60 hover:text-gold-400 hover:border-gold-400 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-cream font-serif text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/60 hover:text-gold-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-cream font-serif text-lg font-semibold mb-6">Visit Us</h3>
            <div className="space-y-4 text-sm text-cream/60">
              <p>123 Luxury Avenue<br />New York, NY 10001</p>
              <p>+1 (212) 555-0190</p>
              <p>hello@moderncafe.com</p>
              <div>
                <p className="font-medium text-cream/80 mb-2">Opening Hours</p>
                <p>Mon–Fri: 7:00 AM – 10:00 PM</p>
                <p>Sat–Sun: 8:00 AM – 11:00 PM</p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-cream font-serif text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-cream/60 text-sm mb-4">
              Subscribe to receive exclusive offers, seasonal menus, and café updates.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <FiMail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full bg-dark-700 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-cream placeholder-cream/40 focus:outline-none focus:border-gold-400 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold-400 hover:bg-gold-500 text-dark-900 font-semibold py-3 rounded-lg text-sm transition-colors disabled:opacity-70"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream/40 text-sm">
            © {new Date().getFullYear()} Modern Café. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-cream/40 hover:text-cream/60 text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-cream/40 hover:text-cream/60 text-xs transition-colors">
              Terms of Service
            </Link>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-cream/60 hover:text-gold-400 hover:border-gold-400 transition-all"
              aria-label="Back to top"
            >
              <FiArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

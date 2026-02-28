'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiClock, FiUser } from 'react-icons/fi';
import SectionHeading from '@/components/shared/SectionHeading';
import { BlogPost } from '@/types';
import { formatDate } from '@/lib/utils';
import { Skeleton } from '@/components/ui/Skeleton';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog').then(r => r.json()).then(d => { setPosts(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen pt-20 bg-dark-900">
      <div className="relative h-64 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1920" alt="Blog" fill className="object-cover" />
        <div className="absolute inset-0 bg-dark-900/70 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gold-400 text-sm tracking-widest uppercase mb-2">Stories & Events</p>
            <h1 className="font-serif text-4xl font-bold text-cream">Blog & News</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading subtitle="Our Stories" title="Latest from the Café" />
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="space-y-4"><Skeleton className="h-52" /><Skeleton className="h-6 w-3/4" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-2/3" /></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.article key={post._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="group bg-dark-700 rounded-2xl overflow-hidden border border-white/5 hover:border-gold-400/30 transition-all">
                <div className="relative h-52 overflow-hidden">
                  <Image src={post.featuredImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-gold-400 text-dark-900 text-xs font-semibold px-3 py-1 rounded-full">{post.category}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-cream/40 mb-3">
                    <span className="flex items-center gap-1"><FiUser size={12} />{post.author}</span>
                    <span className="flex items-center gap-1"><FiClock size={12} />{post.readTime} min read</span>
                  </div>
                  <h2 className="font-serif font-semibold text-cream text-xl mb-2 line-clamp-2 group-hover:text-gold-400 transition-colors">{post.title}</h2>
                  <p className="text-cream/50 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-cream/40">{formatDate(post.createdAt)}</span>
                    <Link href={`/blog/${post.slug}`} className="text-sm text-gold-400 hover:text-gold-300 font-medium transition-colors">Read More →</Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiArrowLeft, FiClock, FiUser } from 'react-icons/fi';
import connectDB from '@/lib/mongodb';
import BlogPostModel from '@/models/BlogPost';
import { blogPostsData } from '@/data/menuItems';
import { formatDate } from '@/lib/utils';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return { title: params.slug.replace(/-/g, ' ') };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  await connectDB();
  let post = await BlogPostModel.findOne({ slug: params.slug, published: true }).lean() as any;
  if (!post) {
    const count = await BlogPostModel.countDocuments();
    if (count === 0) {
      await BlogPostModel.insertMany(blogPostsData);
      post = await BlogPostModel.findOne({ slug: params.slug, published: true }).lean() as any;
    }
  }
  if (!post) notFound();

  return (
    <main className="min-h-screen pt-20 bg-dark-900">
      <div className="relative h-72 overflow-hidden">
        <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-dark-900/70" />
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/blog" className="flex items-center gap-2 text-gold-400 hover:text-gold-300 mb-8 text-sm">
          <FiArrowLeft size={14} /> Back to Blog
        </Link>
        <div className="flex items-center gap-4 text-sm text-cream/40 mb-4">
          <span className="bg-gold-400 text-dark-900 text-xs font-semibold px-3 py-1 rounded-full">{post.category}</span>
          <span className="flex items-center gap-1"><FiUser size={12} />{post.author}</span>
          <span className="flex items-center gap-1"><FiClock size={12} />{post.readTime} min read</span>
        </div>
        <h1 className="font-serif text-4xl font-bold text-cream mb-4">{post.title}</h1>
        <p className="text-cream/40 text-sm mb-8">{formatDate(post.createdAt)}</p>
        <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </main>
  );
}

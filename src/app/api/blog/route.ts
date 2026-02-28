import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import { blogPostsData } from '@/data/menuItems';

export async function GET() {
  try {
    await connectDB();
    let posts = await BlogPost.find({ published: true }).sort({ createdAt: -1 }).lean();
    if (posts.length === 0) {
      await BlogPost.insertMany(blogPostsData);
      posts = await BlogPost.find({ published: true }).sort({ createdAt: -1 }).lean();
    }
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

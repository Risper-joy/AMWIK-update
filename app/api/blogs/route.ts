// app/api/blogs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

// GET all blog posts
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const author = searchParams.get('author');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    
    // Build query - ensure we filter correctly
    const query: any = {};
    
    if (status && status !== 'All') {
      query.status = status; // Exact match for status
    } else {
      // Default to published posts only for public pages
      query.status = 'Published';
    }
    
    if (category && category !== 'All') {
      query.category = category;
    }
    if (author) {
      query.author = { $regex: author, $options: 'i' };
    }
    if (featured === 'true') {
      query.featured = true;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    const skip = (page - 1) * limit;
    
    const [posts, total] = await Promise.all([
      BlogPost.find(query)
        .sort({ publishDate: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      BlogPost.countDocuments(query)
    ]);

    console.log('📊 Blog Query:', { 
      status: status || 'Published (default)',
      category, 
      totalFound: total, 
      postsReturned: posts.length 
    });
    
    return NextResponse.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
    
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts', data: [] },
      { status: 500 }
    );
  }
}

// POST create new blog post
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const data = await request.json();
    
    // Ensure status is one of the valid values
    if (!['Published', 'Draft', 'Scheduled'].includes(data.status)) {
      data.status = 'Draft'; // Default to Draft
    }
    
    // Process tags if they're a comma-separated string
    if (typeof data.tags === 'string') {
      data.tags = data.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean);
    }
    
    // Ensure other required fields
    if (!data.createdAt) {
      data.createdAt = new Date();
    }
    
    if (!data.updatedAt) {
      data.updatedAt = new Date();
    }
    
    // Create new blog post
    const blogPost = new BlogPost(data);
    await blogPost.save();
    
    console.log('✅ Blog post created:', { 
      id: blogPost._id, 
      title: blogPost.title, 
      status: blogPost.status 
    });
    
    return NextResponse.json({
      success: true,
      data: blogPost,
      message: 'Blog post created successfully'
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('Error creating blog post:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        details: Object.values(error.errors).map((err: any) => err.message)
      }, { status: 400 });
    }
    
    if (error.code === 11000) {
      return NextResponse.json({
        success: false,
        error: 'Blog post with this slug already exists'
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to create blog post',
      details: error.message
    }, { status: 500 });
  }
}
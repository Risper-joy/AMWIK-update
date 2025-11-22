// models/BlogPost.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category?: string;
  tags: string[];
  author: string;
  featuredImage?: string;
  status: 'Draft' | 'Published' | 'Scheduled';
  publishDate?: Date;
  seoTitle?: string;
  seoDescription?: string;
  allowComments: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
  likes: number;
}

const BlogPostSchema = new Schema<IBlogPost>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens']
  },
  excerpt: {
    type: String,
    trim: true,
    maxlength: [500, 'Excerpt cannot exceed 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  category: {
    type: String,
    enum: [
      'digital-media',
      'investigative-journalism', 
      'media-ethics',
      'community-media',
      'entrepreneurship',
      'leadership',
      'training',
      'advocacy'
    ]
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  author: {
  type: String,
  required: [true, 'Author is required'],
  trim: true,
  maxlength: [100, 'Author name cannot exceed 100 characters']
},
  featuredImage: {
    type: String,
    validate: {
      validator: function(v: string) {
        return !v || /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(v);
      },
      message: 'Featured image must be a valid image URL'
    }
  },
  status: {
    type: String,
    enum: ['Draft', 'Published', 'Scheduled'],
    default: 'Draft'
  },
  publishDate: {
    type: Date,
    validate: {
      validator: function(this: IBlogPost, v: Date) {
        if (this.status === 'Scheduled') {
          return v && v > new Date();
        }
        return true;
      },
      message: 'Publish date must be in the future for scheduled posts'
    }
  },
  seoTitle: {
    type: String,
    trim: true,
    maxlength: [200, 'SEO title cannot exceed 200 characters']
  },
  seoDescription: {
    type: String,
    trim: true,
    maxlength: [500, 'SEO description cannot exceed 500 characters']
  },
  allowComments: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  viewCount: {
    type: Number,
    default: 0,
    min: 0
  },
  likes: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
BlogPostSchema.index({ slug: 1 });
BlogPostSchema.index({ status: 1, publishDate: 1 });
BlogPostSchema.index({ category: 1 });
BlogPostSchema.index({ tags: 1 });
BlogPostSchema.index({ author: 1 });
BlogPostSchema.index({ featured: 1 });
BlogPostSchema.index({ createdAt: -1 });

// Virtual for reading time (approximate)
BlogPostSchema.virtual('readingTime').get(function() {
  const wordsPerMinute = 200;
  const wordCount = this.content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
});

// Pre-save middleware to auto-generate SEO fields if not provided
BlogPostSchema.pre('save', function(next) {
  if (!this.seoTitle) {
    this.seoTitle = this.title.substring(0, 60);
  }
  
  if (!this.seoDescription && this.excerpt) {
    this.seoDescription = this.excerpt.substring(0, 160);
  }
  
  // Set publish date for published posts if not set
  if (this.status === 'Published' && !this.publishDate) {
    this.publishDate = new Date();
  }
  
  next();
});

// Static method to get published posts
BlogPostSchema.statics.getPublished = function() {
  return this.find({ 
    status: 'Published',
    $or: [
      { publishDate: { $lte: new Date() } },
      { publishDate: null }
    ]
  }).sort({ createdAt: -1 });
};

export default mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
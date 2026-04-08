import mongoose, { Schema, type Document } from "mongoose";

export interface IBlogPost extends Document {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  tags: string[];
  category: string;
  coverIcon: string;
  coverGradient: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    date: { type: String, required: true },
    readTime: { type: Number, required: true, default: 5 },
    tags: { type: [String], default: [] },
    category: { type: String, required: true },
    coverIcon: { type: String, default: "fa-solid fa-pen-nib" },
    coverGradient: { type: String, default: "from-accent-indigo to-accent-violet" },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const BlogPost =
  mongoose.models.BlogPost ??
  mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);

import { connectDB } from "@/lib/mongodb";
import { BlogPost } from "@/lib/models/BlogPost";

// ─── Types ─────────────────────────────────────────

export interface BlogPostData {
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
}

// ─── Server-side DB helpers ────────────────────────

export async function getAllPosts(): Promise<BlogPostData[]> {
  await connectDB();
  const posts = await BlogPost.find({}).sort({ date: -1 }).lean();
  return posts.map(serializePost);
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPostData | null> {
  await connectDB();
  const post = await BlogPost.findOne({ slug }).lean();
  return post ? serializePost(post) : null;
}

export async function getAllCategories(): Promise<string[]> {
  await connectDB();
  const categories = await BlogPost.distinct("category");
  return categories;
}

export async function getAllTags(): Promise<string[]> {
  await connectDB();
  const posts = await BlogPost.find({}, { tags: 1 }).lean();
  const tagSet = new Set<string>();
  for (const p of posts) {
    for (const t of p.tags ?? []) tagSet.add(t);
  }
  return [...tagSet];
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─── Serialise Mongoose docs to plain objects ──────

function serializePost(doc: Record<string, unknown>): BlogPostData {
  return {
    slug: doc.slug as string,
    title: doc.title as string,
    excerpt: doc.excerpt as string,
    date: doc.date as string,
    readTime: doc.readTime as number,
    tags: (doc.tags as string[]) ?? [],
    category: doc.category as string,
    coverIcon: (doc.coverIcon as string) ?? "fa-solid fa-pen-nib",
    coverGradient:
      (doc.coverGradient as string) ?? "from-accent-indigo to-accent-violet",
    content: doc.content as string,
  };
}

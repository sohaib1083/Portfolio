import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { BlogPost } from "@/lib/models/BlogPost";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const posts = await BlogPost.find({}).sort({ date: -1 }).lean();

    const serialized = posts.map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      date: p.date,
      readTime: p.readTime,
      tags: p.tags ?? [],
      category: p.category,
      coverIcon: p.coverIcon ?? "fa-solid fa-pen-nib",
      coverGradient: p.coverGradient ?? "from-accent-indigo to-accent-violet",
    }));

    return NextResponse.json(serialized);
  } catch (err) {
    console.error("Blog API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

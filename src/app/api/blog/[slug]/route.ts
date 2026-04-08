import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { BlogPost } from "@/lib/models/BlogPost";

export const dynamic = "force-dynamic";

interface Ctx {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: Request, ctx: Ctx) {
  try {
    const { slug } = await ctx.params;
    await connectDB();
    const post = await BlogPost.findOne({ slug }).lean();

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      readTime: post.readTime,
      tags: post.tags ?? [],
      category: post.category,
      coverIcon: post.coverIcon ?? "fa-solid fa-pen-nib",
      coverGradient: post.coverGradient ?? "from-accent-indigo to-accent-violet",
      content: post.content,
    });
  } catch (err) {
    console.error("Blog slug API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { BlogPost } from "@/lib/models/BlogPost";

const SECRET = process.env.ADMIN_SECRET;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { secret, post } = body as {
      secret: string;
      post: {
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
      };
    };

    if (!SECRET || secret !== SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate required fields
    const required = ["slug", "title", "excerpt", "date", "content", "category"];
    for (const field of required) {
      if (!post[field as keyof typeof post]) {
        return NextResponse.json(
          { error: `Missing field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Sanitize slug
    const slug = post.slug
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    await connectDB();

    // Check for duplicate slug
    const existing = await BlogPost.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { error: `Slug "${slug}" already exists` },
        { status: 409 }
      );
    }

    // Create the post
    await BlogPost.create({
      slug,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      readTime: Number(post.readTime) || 5,
      tags: post.tags ?? [],
      category: post.category,
      coverIcon: post.coverIcon || "fa-solid fa-pen-nib",
      coverGradient: post.coverGradient || "from-accent-indigo to-accent-violet",
      content: post.content,
    });

    return NextResponse.json({ success: true, slug });
  } catch (err) {
    console.error("Admin post error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

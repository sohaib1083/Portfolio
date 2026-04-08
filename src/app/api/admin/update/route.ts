import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { BlogPost } from "@/lib/models/BlogPost";

const SECRET = process.env.ADMIN_SECRET;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { secret, originalSlug, post } = body as {
      secret: string;
      originalSlug: string;
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

    if (!originalSlug) {
      return NextResponse.json({ error: "Missing originalSlug" }, { status: 400 });
    }

    const required = ["slug", "title", "excerpt", "date", "content", "category"];
    for (const field of required) {
      if (!post[field as keyof typeof post]) {
        return NextResponse.json(
          { error: `Missing field: ${field}` },
          { status: 400 }
        );
      }
    }

    const newSlug = post.slug
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    await connectDB();

    // If slug changed, make sure the new slug isn't taken by another post
    if (newSlug !== originalSlug) {
      const conflict = await BlogPost.findOne({ slug: newSlug });
      if (conflict) {
        return NextResponse.json(
          { error: `Slug "${newSlug}" is already in use by another post` },
          { status: 409 }
        );
      }
    }

    const updated = await BlogPost.findOneAndUpdate(
      { slug: originalSlug },
      {
        $set: {
          slug: newSlug,
          title: post.title,
          excerpt: post.excerpt,
          date: post.date,
          readTime: Number(post.readTime) || 5,
          tags: post.tags ?? [],
          category: post.category,
          coverIcon: post.coverIcon || "fa-solid fa-pen-nib",
          coverGradient: post.coverGradient || "from-accent-indigo to-accent-violet",
          content: post.content,
        },
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { error: `Post "${originalSlug}" not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, slug: newSlug });
  } catch (err) {
    console.error("Admin update error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { BlogPost } from "@/lib/models/BlogPost";

const SECRET = process.env.ADMIN_SECRET;

export async function POST(request: Request) {
  try {
    const { secret, slug } = (await request.json()) as {
      secret: string;
      slug: string;
    };

    if (!SECRET || secret !== SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    await connectDB();

    const result = await BlogPost.deleteOne({ slug });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: `Post with slug "${slug}" not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin delete error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

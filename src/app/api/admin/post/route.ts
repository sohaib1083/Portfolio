import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const BLOG_FILE = join(process.cwd(), "src", "data", "blog.ts");
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
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate required fields
    const required = ["slug", "title", "excerpt", "date", "content", "category"];
    for (const field of required) {
      if (!post[field as keyof typeof post]) {
        return Response.json({ error: `Missing field: ${field}` }, { status: 400 });
      }
    }

    // Sanitize slug
    const slug = post.slug
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    // Read current file
    const src = readFileSync(BLOG_FILE, "utf-8");

    // Check for duplicate slug
    if (src.includes(`slug: "${slug}"`)) {
      return Response.json({ error: `Slug "${slug}" already exists` }, { status: 409 });
    }

    // Escape backticks and template literal syntax in content
    const escapedContent = post.content
      .replace(/\\/g, "\\\\")
      .replace(/`/g, "\\`")
      .replace(/\$\{/g, "\\${");

    const newEntry = `  {
    slug: "${slug}",
    title: ${JSON.stringify(post.title)},
    excerpt: ${JSON.stringify(post.excerpt)},
    date: "${post.date}",
    readTime: ${Number(post.readTime) || 5},
    tags: ${JSON.stringify(post.tags)},
    category: ${JSON.stringify(post.category)},
    coverIcon: ${JSON.stringify(post.coverIcon || "fa-solid fa-pen-nib")},
    coverGradient: ${JSON.stringify(post.coverGradient || "from-accent-indigo to-accent-violet")},
    content: \`${escapedContent}\`,
  },`;

    // Insert before the closing ]; of blogPosts array
    const marker = "];\n\n// ─── HELPERS";
    if (!src.includes(marker)) {
      return Response.json({ error: "Could not locate insertion point in blog.ts" }, { status: 500 });
    }

    const updated = src.replace(marker, `${newEntry}\n${marker}`);
    writeFileSync(BLOG_FILE, updated, "utf-8");

    return Response.json({ success: true, slug });
  } catch (err) {
    console.error("Admin post error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

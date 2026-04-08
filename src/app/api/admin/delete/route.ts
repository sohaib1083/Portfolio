import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const BLOG_FILE = join(process.cwd(), "src", "data", "blog.ts");
const SECRET = process.env.ADMIN_SECRET;

export async function POST(request: Request) {
  try {
    const { secret, slug } = await request.json() as { secret: string; slug: string };

    if (!SECRET || secret !== SECRET) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!slug) {
      return Response.json({ error: "Missing slug" }, { status: 400 });
    }

    const src = readFileSync(BLOG_FILE, "utf-8");

    // Find the block starting with `  {\n    slug: "<slug>",` and remove it
    // We match from the opening `  {` (that contains this slug) to the matching closing `  },`
    const slugLine = `    slug: "${slug}",`;
    const blockStart = src.indexOf(`  {\n${slugLine}`);

    if (blockStart === -1) {
      return Response.json({ error: `Post with slug "${slug}" not found` }, { status: 404 });
    }

    // Find the matching closing `  },` after blockStart
    let depth = 0;
    let i = blockStart;
    let blockEnd = -1;

    while (i < src.length) {
      if (src[i] === "{") depth++;
      if (src[i] === "}") {
        depth--;
        if (depth === 0) {
          // include the trailing `,\n`
          blockEnd = i + 1;
          if (src[blockEnd] === ",") blockEnd++;
          if (src[blockEnd] === "\n") blockEnd++;
          break;
        }
      }
      i++;
    }

    if (blockEnd === -1) {
      return Response.json({ error: "Could not locate end of post block" }, { status: 500 });
    }

    const updated = src.slice(0, blockStart) + src.slice(blockEnd);
    writeFileSync(BLOG_FILE, updated, "utf-8");

    return Response.json({ success: true });
  } catch (err) {
    console.error("Admin delete error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

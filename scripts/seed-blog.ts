/**
 * Seed script — migrates blog posts from src/data/blog.ts into MongoDB.
 *
 * Usage:  npx tsx scripts/seed-blog.ts
 */

import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI ??
  "mongodb+srv://sohaib1083_db_user:XJP5yLgnFoy9U7np@cluster0.3tywifi.mongodb.net/portfolio?appName=Cluster0";

// ── Inline the schema so we don't depend on Next.js aliases ──

const BlogPostSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
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

const BlogPost =
  mongoose.models.BlogPost ?? mongoose.model("BlogPost", BlogPostSchema);

// ── Import static data ─────────────────────────────

import { blogPosts } from "../src/data/blog";

async function main() {
  console.log("⏳ Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected!\n");

  let created = 0;
  let skipped = 0;

  for (const post of blogPosts) {
    const exists = await BlogPost.findOne({ slug: post.slug });
    if (exists) {
      console.log(`  ⏭  Skipping "${post.slug}" (already exists)`);
      skipped++;
      continue;
    }

    await BlogPost.create({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      readTime: post.readTime,
      tags: post.tags,
      category: post.category,
      coverIcon: post.coverIcon,
      coverGradient: post.coverGradient,
      content: post.content,
    });
    console.log(`  ✅ Created "${post.slug}"`);
    created++;
  }

  console.log(`\n🎉 Done! Created: ${created} | Skipped: ${skipped}`);
  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});

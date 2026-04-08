import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  getAllPosts,
  getAllCategories,
  getAllTags,
  formatDate,
  type BlogPostData,
} from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Sohaib Shamsi",
  description:
    "Technical articles on AI/ML, data engineering, full-stack development, and more by Sohaib Shamsi.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();
  const tags = await getAllTags();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-18">
        {/* ─── Hero ──────────────────────────────────────── */}
        <section className="relative py-20 overflow-hidden border-b border-border">
          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-150 h-150 rounded-full bg-accent-indigo/10 blur-[120px]" />
          </div>

          <div className="relative max-w-6xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-bg-glass text-text-secondary text-sm mb-6">
              <i className="fa-solid fa-pen-nib text-accent-indigo" />
              <span>Writing &amp; Thoughts</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
              The{" "}
              <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Deep-dives into AI, ML systems, data engineering, and full-stack
              development
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* ─── Main Content ──────────────────────────────── */}
            <div className="flex-1 min-w-0">
              {/* Featured Post */}
              {featured && (
                <div className="mb-12">
                  <p className="text-xs font-mono text-accent-cyan uppercase tracking-widest mb-4">
                    ★ Featured Post
                  </p>
                  <FeaturedCard post={featured} />
                </div>
              )}

              {/* Latest Posts */}
              {rest.length > 0 && (
                <div>
                  <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-6">
                    Latest Posts
                  </p>
                  <div className="flex flex-col gap-6">
                    {rest.map((post) => (
                      <PostCard key={post.slug} post={post} />
                    ))}
                  </div>
                </div>
              )}

              {posts.length === 0 && (
                <div className="text-center py-20">
                  <i className="fa-solid fa-pen-nib text-4xl text-text-muted mb-4 block" />
                  <p className="text-text-secondary">No posts yet. Check back soon!</p>
                </div>
              )}
            </div>

            {/* ─── Sidebar ───────────────────────────────────── */}
            <aside className="lg:w-72 shrink-0">
              <div className="sticky top-24 flex flex-col gap-8">
                {/* Categories */}
                <div className="glass-card p-6">
                  <h3 className="font-display font-semibold text-sm uppercase tracking-widest text-text-secondary mb-4">
                    Categories
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {categories.map((cat) => (
                      <li key={cat}>
                        <Link
                          href={`/blog?category=${encodeURIComponent(cat)}`}
                          className="flex items-center justify-between text-sm text-text-secondary hover:text-accent-indigo transition-colors group"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-200">
                            {cat}
                          </span>
                          <i className="fa-solid fa-chevron-right text-xs opacity-40" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="glass-card p-6">
                  <h3 className="font-display font-semibold text-sm uppercase tracking-widest text-text-secondary mb-4">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="px-3 py-1 rounded-full text-xs border border-border text-text-secondary hover:border-accent-indigo hover:text-accent-indigo transition-all duration-200"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Recent Posts */}
                <div className="glass-card p-6">
                  <h3 className="font-display font-semibold text-sm uppercase tracking-widest text-text-secondary mb-4">
                    Recent Posts
                  </h3>
                  <ul className="flex flex-col gap-4">
                    {posts.slice(0, 4).map((post) => (
                      <li key={post.slug}>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="group block"
                        >
                          <p className="text-sm text-text-primary group-hover:text-accent-indigo transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </p>
                          <p className="text-xs text-text-muted mt-1">
                            {formatDate(post.date)}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}

// ─── Sub-components ────────────────────────────────

function FeaturedCard({ post }: { post: BlogPostData }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="glass-card overflow-hidden hover:border-accent-indigo/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.1)]">
        {/* Cover Banner */}
        <div
          className={`h-48 bg-linear-to-br ${post.coverGradient} relative flex items-center justify-center`}
        >
          <i className={`${post.coverIcon} text-6xl text-white/20`} />
          <div className="absolute inset-0 bg-linear-to-t from-bg-secondary/80 to-transparent" />
          <div className="absolute bottom-4 left-6 flex gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded text-xs bg-bg-primary/60 border border-border text-text-secondary backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
            <span className="text-accent-cyan font-medium">{post.category}</span>
            <span>·</span>
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>
              <i className="fa-regular fa-clock mr-1" />
              {post.readTime} min read
            </span>
          </div>
          <h2 className="font-display text-xl font-bold text-text-primary group-hover:text-accent-indigo transition-colors mb-3 leading-snug">
            {post.title}
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-accent-indigo font-medium">
            Read article
            <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function PostCard({ post }: { post: BlogPostData }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="glass-card p-6 hover:border-accent-indigo/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.08)]">
        <div className="flex gap-5">
          {/* Icon */}
          <div
            className={`shrink-0 w-14 h-14 rounded-xl bg-linear-to-br ${post.coverGradient} flex items-center justify-center`}
          >
            <i className={`${post.coverIcon} text-xl text-white/80`} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs text-text-muted mb-2 flex-wrap">
              <span className="text-accent-cyan font-medium">{post.category}</span>
              <span>·</span>
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>
                <i className="fa-regular fa-clock mr-1" />
                {post.readTime} min read
              </span>
            </div>
            <h3 className="font-display font-semibold text-text-primary group-hover:text-accent-indigo transition-colors mb-2 leading-snug">
              {post.title}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-xs border border-border text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

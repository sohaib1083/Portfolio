import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import BlogPostContent from "@/components/BlogPostContent";
import {
  getPostBySlug,
  getAllPosts,
  formatDate,
} from "@/data/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} — Sohaib Shamsi`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = allPosts[currentIndex + 1] ?? null;
  const nextPost = allPosts[currentIndex - 1] ?? null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-18">
        {/* ─── Cover Banner ──────────────────────────────── */}
        <div
          className={`relative h-64 md:h-80 bg-linear-to-br ${post.coverGradient} flex items-center justify-center overflow-hidden`}
        >
          <i className={`${post.coverIcon} text-[160px] text-white/10 absolute`} />
          <div className="absolute inset-0 bg-linear-to-t from-bg-primary via-bg-primary/50 to-transparent" />

          {/* Breadcrumb */}
          <nav className="absolute top-6 left-6 md:left-10 flex items-center gap-2 text-sm text-white/60 z-10">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <i className="fa-solid fa-chevron-right text-xs" />
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <i className="fa-solid fa-chevron-right text-xs" />
            <span className="text-white/40 truncate max-w-50">{post.title}</span>
          </nav>
        </div>

        <div className="max-w-6xl mx-auto px-6 -mt-24 relative z-10 pb-24">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* ─── Article ───────────────────────────────────── */}
            <article className="flex-1 min-w-0">
              {/* Header */}
              <div className="glass-card p-8 mb-8">
                <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted mb-4">
                  <span className="px-3 py-1 rounded-full bg-accent-indigo/10 border border-accent-indigo/30 text-accent-indigo font-medium">
                    {post.category}
                  </span>
                  <span>·</span>
                  <span>{formatDate(post.date)}</span>
                  <span>·</span>
                  <span>
                    <i className="fa-regular fa-clock mr-1" />
                    {post.readTime} min read
                  </span>
                </div>

                <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4 leading-tight">
                  {post.title}
                </h1>

                <p className="text-text-secondary text-lg leading-relaxed mb-6">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 rounded-full text-xs border border-border text-text-secondary hover:border-accent-indigo hover:text-accent-indigo transition-all duration-200"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div className="glass-card p-8">
                <BlogPostContent content={post.content} />
              </div>

              {/* Author Card */}
              <div className="glass-card p-6 mt-8 flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-linear-to-br from-accent-indigo to-accent-cyan flex items-center justify-center text-white font-bold text-xl shrink-0">
                  SS
                </div>
                <div>
                  <p className="font-display font-semibold text-text-primary">
                    Sohaib Sarosh Shamsi
                  </p>
                  <p className="text-sm text-text-secondary mt-0.5">
                    Full-Stack & AI/ML Engineer — building intelligent systems.
                  </p>
                  <div className="flex gap-4 mt-2 text-xs">
                    <a
                      href="https://github.com/sohaib1083"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-accent-indigo transition-colors"
                    >
                      <i className="fa-brands fa-github mr-1" />
                      GitHub
                    </a>
                    <a
                      href="https://linkedin.com/in/sohaib-shamsi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-accent-cyan transition-colors"
                    >
                      <i className="fa-brands fa-linkedin mr-1" />
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              {/* Post Navigation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {prevPost && (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="glass-card p-5 hover:border-accent-indigo/40 transition-all duration-300 group"
                  >
                    <p className="text-xs text-text-muted mb-1 flex items-center gap-1">
                      <i className="fa-solid fa-arrow-left text-xs" />
                      Previous
                    </p>
                    <p className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors line-clamp-2">
                      {prevPost.title}
                    </p>
                  </Link>
                )}
                {nextPost && (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="glass-card p-5 hover:border-accent-indigo/40 transition-all duration-300 group sm:text-right"
                  >
                    <p className="text-xs text-text-muted mb-1 flex items-center gap-1 sm:justify-end">
                      Next
                      <i className="fa-solid fa-arrow-right text-xs" />
                    </p>
                    <p className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors line-clamp-2">
                      {nextPost.title}
                    </p>
                  </Link>
                )}
              </div>
            </article>

            {/* ─── Sidebar ───────────────────────────────────── */}
            <aside className="lg:w-72 shrink-0">
              <div className="sticky top-24 flex flex-col gap-6">
                {/* Back to blog */}
                <Link
                  href="/blog"
                  className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent-indigo transition-colors group"
                >
                  <i className="fa-solid fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform duration-200" />
                  Back to all posts
                </Link>

                {/* Tags */}
                <div className="glass-card p-5">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-text-muted mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="px-2.5 py-1 rounded-full text-xs border border-border text-text-secondary hover:border-accent-indigo hover:text-accent-indigo transition-all"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* More Posts */}
                <div className="glass-card p-5">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-text-muted mb-4">
                    More Posts
                  </h3>
                  <ul className="flex flex-col gap-4">
                    {getAllPosts()
                      .filter((p) => p.slug !== slug)
                      .slice(0, 3)
                      .map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/blog/${p.slug}`}
                            className="group block"
                          >
                            <p className="text-sm text-text-secondary group-hover:text-accent-indigo transition-colors line-clamp-2 leading-snug">
                              {p.title}
                            </p>
                            <p className="text-xs text-text-muted mt-1">
                              {formatDate(p.date)}
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

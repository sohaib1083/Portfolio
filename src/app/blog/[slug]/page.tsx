import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostContent from "@/components/BlogPostContent";
import { ArticleView } from "@/components/site/Article";
import { Footer, Header } from "@/components/site/Chrome";
import { profile } from "@/data/profile";
import { getPostBySlug } from "@/lib/blog";
import { getBlogPosts, tidy, tidyMarkdown, withTimeout } from "@/lib/feeds";

export const revalidate = 3600;

// Render each post on its first visit, then serve it from cache (admin edits refresh it).
export async function generateStaticParams() {
  return [];
}

interface Props {
  params: Promise<{ slug: string }>;
}

async function loadPost(slug: string) {
  try {
    return await withTimeout(getPostBySlug(slug));
  } catch (err) {
    console.error("[blog] post:", err);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await loadPost((await params).slug);
  if (!post) return { title: `Not found · ${profile.name}` };
  return { title: `${tidy(post.title)} · ${profile.name}`, description: tidy(post.excerpt) };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, all] = await Promise.all([loadPost(slug), getBlogPosts()]);
  if (!post) notFound();

  const i = all.findIndex((p) => p.slug === slug);

  return (
    <>
      <Header current="blog" />
      <main>
        <ArticleView
          article={{
            slug: post.slug,
            title: tidy(post.title),
            href: `/blog/${post.slug}`,
            date: new Date(post.date).toISOString(),
            excerpt: tidy(post.excerpt),
            tags: post.tags,
            readTime: post.readTime,
            source: "Blog",
          }}
          section={{ href: "/blog", label: "All posts" }}
          prev={all[i + 1] ?? null}
          next={i > 0 ? all[i - 1] : null}
        >
          {/* Posts open with their own `# Title`; the page header already shows it. */}
          <BlogPostContent content={tidyMarkdown(post.content.replace(/^\s*#\s.*\n/, ""))} />
        </ArticleView>
      </main>
      <Footer />
    </>
  );
}

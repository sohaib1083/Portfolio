import type { Metadata } from "next";
import Link from "next/link";
import { ArticleList } from "@/components/site/Article";
import { Container, Footer, Header } from "@/components/site/Chrome";
import { profile } from "@/data/profile";
import { fetchBlogPosts, type Article } from "@/lib/feeds";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Blog · ${profile.name}`,
  description: "Notes on AI engineering, fraud detection, data pipelines and shipping software.",
};

async function loadPosts(): Promise<Article[]> {
  try {
    return await fetchBlogPosts();
  } catch (err) {
    // At build time, render the empty state rather than failing the deploy. At runtime,
    // throw: ISR then keeps serving the last good page instead of caching an empty one.
    if (process.env.NEXT_PHASE === "phase-production-build") return [];
    throw err;
  }
}

export default async function BlogPage() {
  const posts = await loadPosts();

  return (
    <>
      <Header current="blog" />

      <main>
        <Container className="pt-12 sm:pt-20">
          <h1 className="rise text-[clamp(2.4rem,6.5vw,4.25rem)] leading-[1] font-medium tracking-[-0.04em]">
            I write things <span className="text-accent">down.</span>
          </h1>
          <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-muted" style={{ "--d": "150ms" } as React.CSSProperties}>
            What I learned the hard way, so you don&apos;t have to. AI engineering, fraud detection,
            data pipelines and shipping software.
          </p>
        </Container>

        <Container className="mt-14">
          {posts.length > 0 ? (
            <ArticleList articles={posts} />
          ) : (
            <p className="text-muted">
              The blog is taking a moment to load. Meanwhile, read my{" "}
              <Link href="/medium" className="text-ink underline decoration-accent underline-offset-4">
                Medium articles
              </Link>
              .
            </p>
          )}
        </Container>
      </main>

      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import { ArticleList } from "@/components/site/Article";
import { Container, Footer, Header } from "@/components/site/Chrome";
import { links, profile } from "@/data/profile";
import { getMediumArticles } from "@/lib/feeds";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Medium · ${profile.name}`,
  description: "Articles first published on Medium, readable right here.",
};

export default async function MediumPage() {
  const articles = await getMediumArticles();

  return (
    <>
      <Header current="medium" />

      <main>
        <Container className="pt-12 sm:pt-20">
          <h1 className="rise text-[clamp(2.4rem,6.5vw,4.25rem)] leading-[1] font-medium tracking-[-0.04em]">
            Also on <span className="text-accent">Medium.</span>
          </h1>
          <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-muted" style={{ "--d": "150ms" } as React.CSSProperties}>
            Pieces I first published on Medium, mirrored here so you can read them without
            leaving. Pulled live from my feed.
          </p>
        </Container>

        <Container className="mt-14">
          {articles.length > 0 ? (
            <ArticleList articles={articles} />
          ) : (
            <p className="text-muted">
              Medium isn&apos;t answering right now.{" "}
              <a href={links.medium} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-accent underline-offset-4">
                Read on Medium ↗
              </a>
            </p>
          )}
        </Container>
      </main>

      <Footer />
    </>
  );
}

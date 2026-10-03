import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/site/Article";
import { Footer, Header } from "@/components/site/Chrome";
import { profile } from "@/data/profile";
import { getMediumArticle, getMediumArticles } from "@/lib/feeds";

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getMediumArticles()).map((a) => ({ slug: a.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getMediumArticle((await params).slug);
  if (!article) return { title: `Not found · ${profile.name}` };
  return {
    title: `${article.title} · ${profile.name}`,
    description: article.excerpt,
    // Medium has the original; tell search engines so this copy doesn't compete with it.
    alternates: { canonical: article.original },
  };
}

export default async function MediumArticlePage({ params }: Props) {
  const { slug } = await params;
  const all = await getMediumArticles();
  const i = all.findIndex((a) => a.slug === slug);
  const article = all[i];
  if (!article) notFound();

  const { html, ...meta } = article;

  return (
    <>
      <Header current="medium" />
      <main>
        <ArticleView
          // The excerpt is just the opening paragraph, which the body already starts with.
          article={{ ...meta, excerpt: "" }}
          section={{ href: "/medium", label: "All Medium articles" }}
          prev={all[i + 1] ?? null}
          next={i > 0 ? all[i - 1] : null}
        >
          {/* Sanitised in lib/feeds (allow-listed tags, no scripts, no tracking pixel). */}
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </ArticleView>
      </main>
      <Footer />
    </>
  );
}

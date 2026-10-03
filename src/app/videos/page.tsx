import type { Metadata } from "next";
import Image from "next/image";
import { Container, Footer, Header } from "@/components/site/Chrome";
import { links, profile } from "@/data/profile";
import { formatMonth, formatViews, getVideos } from "@/lib/feeds";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Videos · ${profile.name}`,
  description: "Lecture series on recommender systems and advanced AI, plus short takes on AI engineering.",
};

export default async function VideosPage() {
  const videos = await getVideos();
  const longForm = videos.filter((v) => !v.isShort);
  const shorts = videos.filter((v) => v.isShort);

  return (
    <>
      <Header current="videos" />

      <main>
        <Container className="pt-12 sm:pt-20">
          <h1 className="rise text-[clamp(2.4rem,6.5vw,4.25rem)] leading-[1] font-medium tracking-[-0.04em]">
            I explain things <span className="text-accent">on camera.</span>
          </h1>
          <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-muted" style={{ "--d": "150ms" } as React.CSSProperties}>
            Two full lecture series, Recommender Systems and Advanced AI, plus short takes on
            AI engineering. Pulled live from YouTube.
          </p>
        </Container>

        {videos.length === 0 && (
          <Container className="mt-16">
            <p className="text-muted">
              YouTube isn&apos;t answering right now.{" "}
              <a href={links.youtube} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-accent underline-offset-4">
                Watch on the channel ↗
              </a>
            </p>
          </Container>
        )}

        {longForm.length > 0 && (
          <Container className="mt-16">
            <ul className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {longForm.map((v) => (
                <li key={v.id}>
                  <a href={v.url} target="_blank" rel="noopener noreferrer" className="group block">
                    <div className="relative aspect-video overflow-hidden rounded-lg border border-line bg-line">
                      <Image
                        src={v.thumbnail}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <p className="mt-3 font-medium leading-snug decoration-accent decoration-2 underline-offset-4 group-hover:underline">
                      {v.title}
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-muted">
                      {formatViews(v.views)} · {formatMonth(v.published)}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        )}

        {shorts.length > 0 && (
          <Container className="mt-24">
            <h2 className="flex items-baseline justify-between">
              <span className="text-2xl font-medium tracking-tight">Shorts</span>
              <span className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase">Under a minute</span>
            </h2>
            <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5">
              {shorts.map((v) => (
                <li key={v.id}>
                  <a href={v.url} target="_blank" rel="noopener noreferrer" className="group block">
                    <div className="relative aspect-9/16 overflow-hidden rounded-lg border border-line bg-line">
                      <Image
                        src={v.thumbnail}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 190px, (min-width: 640px) 25vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <p className="mt-2 text-sm leading-snug">{v.title.replace(/\s*#shorts/i, "")}</p>
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        )}

        <Container className="mt-20">
          <a
            href={links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-ink px-5 py-2.5 font-mono text-[12px] tracking-[0.08em] uppercase transition-colors hover:border-accent hover:bg-accent hover:text-white"
          >
            Subscribe on YouTube ↗
          </a>
        </Container>
      </main>

      <Footer />
    </>
  );
}

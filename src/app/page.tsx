import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, Footer, Header, SectionHead } from "@/components/site/Chrome";
import Lifecycle from "@/components/site/Lifecycle";
import SystemFlow from "@/components/site/SystemFlow";
import { LinkedInTile, WritingTile, YouTubeTile } from "@/components/site/Tiles";
import Work from "@/components/site/Work";
import { profile, prsShipped } from "@/data/profile";
import { getArticles, getTazamaActivity, getVideos } from "@/lib/feeds";
import portrait from "../../public/assets/sohaib.jpg";

export const revalidate = 3600;

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// Registration marks: the little corner ticks on a technical drawing.
function Corners() {
  const tick = "absolute size-3 border-accent";
  return (
    <>
      <span aria-hidden className={`${tick} -top-1.5 -left-1.5 border-t border-l`} />
      <span aria-hidden className={`${tick} -top-1.5 -right-1.5 border-t border-r`} />
      <span aria-hidden className={`${tick} -bottom-1.5 -left-1.5 border-b border-l`} />
      <span aria-hidden className={`${tick} -right-1.5 -bottom-1.5 border-r border-b`} />
    </>
  );
}

export default async function Home() {
  const [videos, articles, activity] = await Promise.all([
    getVideos(),
    getArticles(),
    getTazamaActivity(),
  ]);

  return (
    <>
      <Header />

      <main>
        {/* ─── The big picture ─────────────────────── */}
        <Container className="pt-8 sm:pt-16">
          <div className="grid gap-10 md:grid-cols-[1fr_14rem] md:items-end lg:grid-cols-[1fr_16.5rem] lg:gap-14">
            <div>
              {/* Phones get a small portrait here; wider screens get the framed one. */}
              <Image
                src={portrait}
                alt=""
                priority
                sizes="56px"
                className="rise size-14 rounded-md object-cover object-[50%_20%] md:hidden"
                style={delay(0)}
              />
              <h1
                className="rise mt-6 text-[clamp(2.6rem,7vw,5.25rem)] leading-[0.98] font-medium tracking-[-0.045em] md:mt-0"
                style={delay(120)}
              >
                I build the systems <span className="text-accent">money moves through.</span>
              </h1>
              <p className="rise mt-7 max-w-xl text-lg leading-relaxed text-muted" style={delay(280)}>
                Fraud monitoring, data lakehouses and cross-currency payments. I take them{" "}
                <span className="text-ink">end to end</span>: requirements, analysis, build, pen-test,
                and handing it to the client myself. Curious about the hard part, and good at
                explaining it.
              </p>
            </div>

            <figure className="rise relative hidden md:block" style={delay(220)}>
              <div className="relative">
                <Corners />
                <div className="relative aspect-4/5 overflow-hidden rounded-sm">
                  <Image
                    src={portrait}
                    alt={profile.name}
                    fill
                    priority
                    placeholder="blur"
                    sizes="(min-width: 1024px) 264px, 224px"
                    className="object-cover"
                  />
                </div>
              </div>
              <figcaption className="mt-4 flex justify-between font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
                <span>Sohaib Shamsi</span>
                <span>KHI, PK</span>
              </figcaption>
            </figure>
          </div>

          <div className="rise mt-12 sm:mt-16" style={delay(450)}>
            <SystemFlow />
          </div>
        </Container>

        {/* ─── How I work ──────────────────────────── */}
        <Container className="mt-24 sm:mt-32">
          <SectionHead index="02" label="Process">
            Most engineers own a slice. <span className="text-accent">I own the loop.</span>
          </SectionHead>
          <div className="mt-10">
            <Lifecycle />
          </div>
        </Container>

        {/* ─── What I've built ─────────────────────── */}
        <Container className="mt-24 sm:mt-32">
          <SectionHead index="03" label="Systems · Open source">
            Built in production. <span className="text-accent">Contributed in the open.</span>
          </SectionHead>
          <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-5xl font-medium tracking-[-0.04em] text-accent">{prsShipped}</span>
            <span className="text-muted">pull requests shipped across Paysys and Tazama codebases</span>
          </p>
          <div className="mt-10">
            <Work activity={activity} />
          </div>
          <Link
            href="/projects"
            className="mt-8 inline-flex items-center gap-2 rounded-md border border-ink px-5 py-2.5 font-mono text-[12px] tracking-[0.08em] uppercase transition-colors hover:border-accent hover:bg-accent hover:text-white"
          >
            All projects →
          </Link>
        </Container>

        {/* ─── Proof, live from the source ─────────── */}
        <Container className="mt-24 sm:mt-32">
          <SectionHead index="04" label="Live from the source">
            Don&apos;t take my word for it.
          </SectionHead>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <YouTubeTile videos={videos} className="md:row-span-2" />
            <WritingTile articles={articles} />
            <LinkedInTile />
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}

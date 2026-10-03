import Image from "next/image";
import Link from "next/link";
import { Container, Label } from "@/components/site/Chrome";
import { profile } from "@/data/profile";
import { formatLongDate, formatMonth, type Article } from "@/lib/feeds";
import portrait from "../../../public/assets/sohaib.jpg";

// ─── Index: a ruled list of articles ───────────────

export function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {articles.map((a, i) => (
        <li key={a.href}>
          <Link href={a.href} className="group grid gap-2 py-8 sm:grid-cols-[9rem_1fr] sm:gap-8">
            <div className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase sm:pt-2">
              <span className="text-accent">{String(i + 1).padStart(2, "0")}</span> · {formatMonth(a.date)}
              <span className="mt-1 block">{a.readTime} min read</span>
            </div>
            <div>
              <h2 className="text-[1.5rem] leading-[1.2] font-medium tracking-[-0.02em] text-balance transition-colors group-hover:text-accent sm:text-[1.75rem]">
                {a.title}
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">{a.excerpt}</p>
              {a.tags.length > 0 && (
                <p className="mt-3 flex flex-wrap gap-x-3 font-mono text-[11px] text-muted">
                  {a.tags.slice(0, 4).map((t) => (
                    <span key={t}>#{t}</span>
                  ))}
                </p>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

// ─── Reading view ──────────────────────────────────

type Neighbour = Pick<Article, "href" | "title"> | null;

export function ArticleView({
  article,
  section,
  prev,
  next,
  children,
}: {
  article: Article;
  section: { href: string; label: string };
  prev: Neighbour;
  next: Neighbour;
  children: React.ReactNode;
}) {
  return (
    <article>
      <Container className="pt-8 sm:pt-14">
        <div className="mx-auto max-w-[44rem]">
          <Link
            href={section.href}
            className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase transition-colors hover:text-accent"
          >
            ← {section.label}
          </Link>

          <header className="mt-8 border-b border-line pb-8">
            <Label>
              <span className="text-accent">{article.source}</span> · {formatLongDate(article.date)} ·{" "}
              {article.readTime} min read
            </Label>
            <h1 className="mt-4 text-[clamp(2rem,5vw,3.1rem)] leading-[1.08] font-medium tracking-[-0.035em] text-balance">
              {article.title}
            </h1>
            {article.excerpt && <p className="mt-5 text-lg leading-relaxed text-muted">{article.excerpt}</p>}
            {article.tags.length > 0 && (
              <p className="mt-5 flex flex-wrap gap-x-3 font-mono text-[11px] text-muted">
                {article.tags.map((t) => (
                  <span key={t}>#{t}</span>
                ))}
              </p>
            )}
          </header>

          <div className="article mt-10">{children}</div>

          {article.original && (
            <p className="mt-12 font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
              Originally published on{" "}
              <a href={article.original} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                Medium ↗
              </a>
            </p>
          )}

          {/* Byline */}
          <div className="mt-12 flex items-center gap-4 border-y border-line py-6">
            <Image src={portrait} alt="" sizes="56px" className="size-14 rounded-md object-cover object-[50%_20%]" />
            <div>
              <p className="font-medium">{profile.name}</p>
              <p className="text-sm text-muted">I build the systems money moves through.</p>
            </div>
            <Link
              href="/"
              className="ml-auto hidden font-mono text-[11px] tracking-[0.12em] text-muted uppercase transition-colors hover:text-accent sm:block"
            >
              About me →
            </Link>
          </div>

          {(prev || next) && (
            <nav className="mt-6 grid gap-4 sm:grid-cols-2">
              {prev ? <NeighbourLink item={prev} dir="prev" /> : <span />}
              {next && <NeighbourLink item={next} dir="next" />}
            </nav>
          )}
        </div>
      </Container>
    </article>
  );
}

function NeighbourLink({ item, dir }: { item: NonNullable<Neighbour>; dir: "prev" | "next" }) {
  return (
    <Link
      href={item.href}
      className={`group rounded-xl border border-line bg-card p-5 transition-colors hover:border-ink ${dir === "next" ? "sm:text-right" : ""}`}
    >
      <Label>{dir === "prev" ? "← Older" : "Newer →"}</Label>
      <p className="mt-2 line-clamp-2 font-medium transition-colors group-hover:text-accent">{item.title}</p>
    </Link>
  );
}

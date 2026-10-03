import Image from "next/image";
import Link from "next/link";
import { career, links } from "@/data/profile";
import {
  formatMonth,
  formatViews,
  type Article,
  type Video,
} from "@/lib/feeds";

// ─── Shell ─────────────────────────────────────────
// Each tile is a live window onto the other side of the link.

function Tile({
  href,
  label,
  cta,
  children,
  className = "",
}: {
  href: string;
  label: string;
  cta: string;
  children: React.ReactNode;
  className?: string;
}) {
  const external = href.startsWith("http");
  const shared = `group flex flex-col rounded-xl border border-line bg-card p-5 transition-colors duration-300 hover:border-ink sm:p-6 ${className}`;

  const body = (
    <>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase">{label}</span>
        <span className="flex items-center gap-1.5 text-sm text-muted transition-colors group-hover:text-accent">
          {cta}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            {external ? "↗" : "→"}
          </span>
        </span>
      </div>
      <div className="mt-6 flex flex-1 flex-col">{children}</div>
    </>
  );

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={shared}>
      {body}
    </a>
  ) : (
    <Link href={href} className={shared}>
      {body}
    </Link>
  );
}

// ─── YouTube: latest long-form video + what's next ─

export function YouTubeTile({ videos, className }: { videos: Video[]; className?: string }) {
  const longForm = videos.filter((v) => !v.isShort);
  const [latest, ...more] = longForm;

  if (!latest) {
    return (
      <Tile href={links.youtube} label="YouTube" cta="Channel" className={className}>
        <p className="text-2xl font-medium tracking-[-0.02em]">I explain things on camera.</p>
      </Tile>
    );
  }

  return (
    <Tile href="/videos" label="YouTube" cta="All videos" className={className}>
      <div className="relative aspect-video overflow-hidden rounded-lg bg-line">
        <Image
          src={latest.thumbnail}
          alt=""
          fill
          sizes="(min-width: 768px) 460px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute bottom-3 left-3 flex size-10 items-center justify-center rounded-md bg-card/90 text-ink backdrop-blur transition-colors group-hover:bg-accent group-hover:text-white">
          <svg viewBox="0 0 10 12" className="ml-0.5 size-3 fill-current" aria-hidden>
            <path d="M0 0l10 6-10 6z" />
          </svg>
        </span>
      </div>
      <p className="mt-4 font-medium leading-snug">{latest.title}</p>
      <p className="mt-1 font-mono text-[11px] text-muted">
        {formatViews(latest.views)} · {formatMonth(latest.published)}
      </p>

      {more.length > 0 && (
        <div className="mt-auto grid grid-cols-4 gap-2 pt-5">
          {more.slice(0, 8).map((v) => (
            <div key={v.id} className="relative aspect-video overflow-hidden rounded-md bg-line">
              <Image src={v.thumbnail} alt="" fill sizes="110px" className="object-cover opacity-80" />
            </div>
          ))}
        </div>
      )}
    </Tile>
  );
}

// ─── Writing: latest article as a headline ─────────

export function WritingTile({ articles }: { articles: Article[] }) {
  const [latest] = articles;

  if (!latest) {
    return (
      <Tile href={links.medium} label="Writing" cta="Medium">
        <p className="text-2xl font-medium tracking-[-0.02em]">I write things down.</p>
      </Tile>
    );
  }

  return (
    <Tile href={latest.href} label="Writing" cta="Read">
      <p className="font-mono text-[11px] text-muted">
        {latest.source} · {formatMonth(latest.date)} · {latest.readTime} min read
      </p>
      <p className="mt-3 text-[1.45rem] leading-[1.2] font-medium tracking-[-0.02em] text-balance">{latest.title}</p>
      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted">{latest.excerpt}</p>
      {latest.tags.length > 0 && (
        <p className="mt-auto flex flex-wrap gap-x-3 pt-5 font-mono text-[11px] text-muted">
          {latest.tags.slice(0, 3).map((t) => (
            <span key={t}>#{t}</span>
          ))}
        </p>
      )}
    </Tile>
  );
}

// ─── LinkedIn: the career at a glance ──────────────

export function LinkedInTile() {
  return (
    <Tile href={links.linkedin} label="LinkedIn" cta="Connect">
      <ul className="divide-y divide-line border-y border-line">
        {career.map((c) => (
          <li key={c.where} className="grid grid-cols-[5.5rem_1fr] items-baseline gap-3 py-3 sm:grid-cols-[6.5rem_1fr]">
            <span className="font-mono text-[11px] text-muted">{c.when}</span>
            <span className="text-[15px]">
              {c.what} <span className="text-muted">at</span> {c.where}
              {c.current && (
                <span className="ml-2 inline-block size-1.5 -translate-y-0.5 bg-accent" aria-label="current" />
              )}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-auto pt-6 text-[1.45rem] leading-[1.2] font-medium tracking-[-0.02em]">
        Let&apos;s talk about <span className="text-accent">your</span> hard problem.
      </p>
    </Tile>
  );
}

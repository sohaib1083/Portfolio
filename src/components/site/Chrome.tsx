import Link from "next/link";
import { links, profile } from "@/data/profile";

const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/videos", label: "Videos" },
  { href: "/blog", label: "Blog" },
  { href: "/medium", label: "Medium" },
];

export function Header({ current }: { current?: "projects" | "videos" | "blog" | "medium" }) {
  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-6 sm:px-6">
      <Link href="/" className="flex items-center gap-2.5 font-mono text-[13px] tracking-[0.08em] uppercase">
        <span className="size-2.5 bg-accent" aria-hidden />
        <span className="hidden sm:inline">{profile.name}</span>
        <span className="sm:hidden">Sohaib</span>
      </Link>
      <nav className="flex gap-3.5 font-mono text-[11px] tracking-[0.06em] uppercase sm:gap-5 sm:text-[12px] sm:tracking-[0.08em]">
        {nav.map((item) =>
          item.href.startsWith("http") ? (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-ink"
            >
              {item.label} ↗
            </a>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className={
                current && item.href === `/${current}`
                  ? "text-accent"
                  : "text-muted transition-colors hover:text-ink"
              }
            >
              {item.label}
            </Link>
          )
        )}
      </nav>
    </header>
  );
}

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-5xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-[11px] tracking-[0.12em] text-muted uppercase ${className}`}>{children}</p>
  );
}

export function SectionHead({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-line pt-5">
      <Label>
        <span className="text-accent">{index}</span> / {label}
      </Label>
      <h2 className="mt-4 max-w-3xl text-2xl font-medium tracking-[-0.02em] sm:text-[2rem] sm:leading-tight">
        {children}
      </h2>
    </div>
  );
}

const elsewhere = [
  { label: "YouTube", href: links.youtube },
  { label: "LinkedIn", href: links.linkedin },
  { label: "GitHub", href: links.githubWork },
  { label: "Medium", href: links.medium },
];

export function Footer() {
  return (
    <footer className="mx-auto mt-28 w-full max-w-5xl px-4 sm:px-6">
      <div className="flex flex-col gap-8 border-t border-line py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Label>Got a hard problem?</Label>
          <a
            href={`mailto:${profile.email}`}
            className="mt-2 inline-block text-2xl font-medium tracking-[-0.02em] decoration-accent decoration-2 underline-offset-[6px] hover:underline sm:text-3xl"
          >
            {profile.email}
          </a>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[12px] tracking-[0.08em] text-muted uppercase">
          {elsewhere.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                {l.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

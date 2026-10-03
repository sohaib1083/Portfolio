import type { Metadata } from "next";
import Link from "next/link";
import { Container, Footer, Header, Label, SectionHead } from "@/components/site/Chrome";
import { links, profile } from "@/data/profile";
import { production, sideProjects, type ProductionSystem, type SideProject } from "@/data/projects";
import { getTazamaActivity } from "@/lib/feeds";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Projects · ${profile.name}`,
  description: "Production systems for Tazama and Paysys, plus the side projects I build to learn.",
};

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
      {children} ↗
    </a>
  );
}

// ─── Production: the work that runs ────────────────

function SystemCard({ system, prs }: { system: ProductionSystem; prs: number }) {
  return (
    <article className="flex flex-col rounded-xl border border-line bg-card p-5 transition-colors hover:border-ink sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <Label>
          <span className="text-accent">{system.id}</span> · {system.org}
        </Label>
        {prs > 0 && <span className="font-mono text-[11px] text-accent">{prs} PRs</span>}
      </div>

      <h3 className="mt-4 text-2xl font-medium tracking-[-0.02em]">{system.name}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">{system.line}</p>

      {system.details.length > 0 && (
        <ul className="mt-4 space-y-1.5 text-sm">
          {system.details.map((d) => (
            <li key={d} className="flex gap-2.5">
              <span className="mt-[0.55em] size-1.5 shrink-0 bg-accent" aria-hidden />
              {d}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex flex-wrap items-end justify-between gap-x-6 gap-y-3 pt-6">
        <p className="font-mono text-[11px] text-muted">{system.stack.join(" · ")}</p>
        <p className="flex gap-4 font-mono text-[11px] tracking-[0.08em] uppercase">
          {system.code && <ExternalLink href={system.code}>Code</ExternalLink>}
          {system.writeup && (
            <Link href={system.writeup} className="transition-colors hover:text-accent">
              Write-up →
            </Link>
          )}
        </p>
      </div>
    </article>
  );
}

// ─── Side projects ─────────────────────────────────

function ProjectCard({ project, index }: { project: SideProject; index: number }) {
  return (
    <article className="group relative flex flex-col rounded-xl border border-line bg-card p-5 transition-colors hover:border-ink">
      <div className="flex items-center justify-between">
        <Label>
          <span className="text-accent">PRJ-{String(index + 1).padStart(2, "0")}</span> · {project.category}
        </Label>
        <span className="font-mono text-[11px] text-muted">{project.year}</span>
      </div>
      <h3 className="mt-4 text-xl font-medium tracking-[-0.02em]">
        {/* Stretched link: the whole card opens the repo. */}
        <a href={project.repo} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0 group-hover:text-accent">
          {project.name}
        </a>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{project.line}</p>
      <div className="mt-auto flex items-end justify-between gap-4 pt-5">
        <p className="font-mono text-[11px] text-muted">{project.stack.join(" · ")}</p>
        {project.homepage && (
          <a
            href={project.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 shrink-0 font-mono text-[11px] tracking-[0.08em] text-accent uppercase hover:underline"
          >
            Live ↗
          </a>
        )}
      </div>
    </article>
  );
}

export default async function ProjectsPage() {
  const activity = await getTazamaActivity();
  const prsFor = (s: ProductionSystem) =>
    (s.repos ?? []).reduce((n, repo) => n + (activity?.byRepo[repo] ?? 0), 0);

  const featured = sideProjects.filter((p) => p.featured);
  const archive = sideProjects.filter((p) => !p.featured);

  const stats = [
    { label: "Production systems", value: production.length },
    { label: "Side projects", value: sideProjects.length },
    ...(activity ? [{ label: "PRs merged into Tazama", value: activity.merged }] : []),
  ];

  return (
    <>
      <Header current="projects" />

      <main>
        <Container className="pt-12 sm:pt-20">
          <h1 className="rise text-[clamp(2.4rem,6.5vw,4.25rem)] leading-[1] font-medium tracking-[-0.04em]">
            Things I&apos;ve <span className="text-accent">shipped.</span>
          </h1>
          <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-muted" style={{ "--d": "150ms" } as React.CSSProperties}>
            Production systems for Tazama and Paysys Labs, and the side projects I build to learn
            something new. Everything links to real code or a write-up.
          </p>
          <dl className="rise mt-10 grid max-w-2xl grid-cols-3 border-y border-line" style={{ "--d": "300ms" } as React.CSSProperties}>
            {stats.map((s) => (
              <div key={s.label} className="border-r border-line py-4 pr-4 last:border-r-0 [&:not(:first-child)]:pl-4">
                <dt className="font-mono text-[10px] tracking-[0.1em] text-muted uppercase sm:text-[11px]">{s.label}</dt>
                <dd className="mt-1 text-3xl font-medium tracking-[-0.03em]">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Container>

        <Container className="mt-20 sm:mt-28">
          <SectionHead index="01" label="Production">
            Systems that run. <span className="text-accent">Some of them move money.</span>
          </SectionHead>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {production.map((s) => (
              <SystemCard key={s.id} system={s} prs={prsFor(s)} />
            ))}
          </div>
        </Container>

        {featured.length > 0 && (
          <Container className="mt-20 sm:mt-28">
            <SectionHead index="02" label="Side projects">
              Built to learn. <span className="text-accent">Shipped anyway.</span>
            </SectionHead>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p, i) => (
                <ProjectCard key={p.repo} project={p} index={i} />
              ))}
            </div>
          </Container>
        )}

        {archive.length > 0 && (
          <Container className="mt-20 sm:mt-28">
            <SectionHead index="03" label="Archive">
              Everything else, newest first.
            </SectionHead>
            <ul className="mt-10 divide-y divide-line border-y border-line">
              {archive.map((p) => (
                <li key={p.repo}>
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-x-4 py-4 sm:grid-cols-[3.5rem_14rem_1fr_auto]"
                  >
                    <span className="font-mono text-[11px] text-muted">{p.year}</span>
                    <span className="font-medium transition-colors group-hover:text-accent">{p.name}</span>
                    <span className="col-span-2 col-start-2 text-sm text-muted sm:col-span-1 sm:col-start-auto">
                      {p.line}
                    </span>
                    <span className="hidden font-mono text-[11px] text-muted sm:block">{p.stack.slice(0, 2).join(" · ")}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        )}

        <Container className="mt-16">
          <p className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
            More on GitHub: <ExternalLink href={links.github}>sohaib1083</ExternalLink> ·{" "}
            <ExternalLink href={links.githubWork}>sohaib1083-paysys</ExternalLink>
          </p>
        </Container>
      </main>

      <Footer />
    </>
  );
}

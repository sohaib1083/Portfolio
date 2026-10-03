import { Label } from "@/components/site/Chrome";
import { links, openSource, systems } from "@/data/profile";
import { formatDay, type OpenSourceActivity } from "@/lib/feeds";

function Arrow() {
  return (
    <span className="text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent">
      ↗
    </span>
  );
}

export default function Work({ activity }: { activity: OpenSourceActivity | null }) {
  return (
    <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
      {/* ─── Systems ─── */}
      <div>
        <Label>Systems I&apos;ve built</Label>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {systems.map((s) => (
            <li key={s.id}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[4.25rem_1fr_auto] gap-x-3 py-5">
                <span className="pt-1.5 font-mono text-[11px] text-muted">{s.id}</span>
                <span>
                  <span className="block text-2xl font-medium tracking-[-0.02em] transition-colors group-hover:text-accent sm:text-[1.75rem]">
                    {s.name}
                  </span>
                  <span className="mt-1 block text-sm text-muted">{s.line}</span>
                  <span className="mt-2 block font-mono text-[11px] text-muted/80">{s.stack}</span>
                </span>
                <span className="pt-1.5">
                  <Arrow />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* ─── Open source ─── */}
      <div>
        <Label>Open source I contribute to</Label>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {openSource.map((p) => (
            <li key={p.name}>
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="group flex items-start justify-between gap-6 py-5">
                <span>
                  <span className="flex items-baseline gap-3">
                    <span className="text-2xl font-medium tracking-[-0.02em] transition-colors group-hover:text-accent sm:text-[1.75rem]">
                      {p.name}
                    </span>
                    {p.name === "Tazama" && activity && (
                      <span className="font-mono text-[11px] text-accent">{activity.merged} PRs merged</span>
                    )}
                  </span>
                  <span className="mt-1 block text-sm text-muted">{p.line}</span>
                </span>
                <span className="pt-1.5">
                  <Arrow />
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* Live PR log, straight from GitHub */}
        {activity && activity.recent.length > 0 && (
          <a
            href={`${links.githubWork}?tab=overview`}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 block rounded-xl border border-line bg-card p-4 transition-colors hover:border-ink sm:p-5"
          >
            <div className="flex items-center justify-between">
              <Label>
                <span className="text-accent">$</span> git log --author=sohaib · tazama-lf
              </Label>
              <Arrow />
            </div>
            <ul className="mt-4 space-y-2.5 font-mono text-[12px] leading-snug">
              {activity.recent.map((pr) => (
                <li key={pr.url} className="grid grid-cols-[3.25rem_1fr] gap-x-3">
                  <span className="text-muted">{formatDay(pr.date)}</span>
                  <span className="min-w-0">
                    <span className="block truncate">{pr.title}</span>
                    <span className="text-muted">
                      {pr.repo}
                      {pr.merged && <span className="text-accent"> · merged</span>}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[11px] text-muted">
              Public on GitHub: {activity.opened} opened, {activity.merged} merged
            </p>
          </a>
        )}
      </div>
    </div>
  );
}

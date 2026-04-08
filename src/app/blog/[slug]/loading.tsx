import Navbar from "@/components/Navbar";

export default function BlogPostLoading() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-18">
        {/* ─── Cover Banner Skeleton ─────────────────────── */}
        <div className="relative h-64 md:h-80 bg-bg-secondary animate-pulse flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-t from-bg-primary via-bg-primary/50 to-transparent" />

          {/* Breadcrumb skeleton */}
          <nav className="absolute top-6 left-6 md:left-10 flex items-center gap-2 z-10">
            <div className="h-3 w-10 rounded bg-white/10 animate-pulse" />
            <i className="fa-solid fa-chevron-right text-xs text-white/20" />
            <div className="h-3 w-8 rounded bg-white/10 animate-pulse" />
            <i className="fa-solid fa-chevron-right text-xs text-white/20" />
            <div className="h-3 w-32 rounded bg-white/10 animate-pulse" />
          </nav>
        </div>

        <div className="max-w-6xl mx-auto px-6 -mt-24 relative z-10 pb-24">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* ─── Article Skeleton ──────────────────────────── */}
            <article className="flex-1 min-w-0">
              {/* Header card */}
              <div className="glass-card p-8 mb-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-20 rounded-full bg-bg-secondary animate-pulse" />
                  <div className="h-3 w-28 rounded bg-bg-secondary animate-pulse" />
                  <div className="h-3 w-20 rounded bg-bg-secondary animate-pulse" />
                </div>
                <div className="h-8 w-4/5 rounded bg-bg-secondary animate-pulse" />
                <div className="h-5 w-full rounded bg-bg-secondary animate-pulse" />
                <div className="h-5 w-3/4 rounded bg-bg-secondary animate-pulse" />
                <div className="pt-4 border-t border-border flex gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-6 w-16 rounded-full bg-bg-secondary animate-pulse" />
                  ))}
                </div>
              </div>

              {/* Body skeleton */}
              <div className="glass-card p-8 space-y-5">
                {/* Heading */}
                <div className="h-6 w-1/3 rounded bg-bg-secondary animate-pulse mt-4" />
                <div className="h-px w-full bg-border" />
                {/* Paragraph lines */}
                <div className="h-4 w-full rounded bg-bg-secondary animate-pulse" />
                <div className="h-4 w-full rounded bg-bg-secondary animate-pulse" />
                <div className="h-4 w-3/4 rounded bg-bg-secondary animate-pulse" />

                {/* Code block skeleton */}
                <div className="rounded-xl bg-bg-secondary border border-border overflow-hidden">
                  <div className="flex items-center gap-1.5 px-4 pt-3 pb-2 border-b border-border/50">
                    <span className="w-3 h-3 rounded-full bg-red-500/30" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/30" />
                    <span className="w-3 h-3 rounded-full bg-green-500/30" />
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="h-3 w-3/4 rounded bg-border animate-pulse" />
                    <div className="h-3 w-1/2 rounded bg-border animate-pulse" />
                    <div className="h-3 w-2/3 rounded bg-border animate-pulse" />
                    <div className="h-3 w-4/5 rounded bg-border animate-pulse" />
                  </div>
                </div>

                {/* More paragraphs */}
                <div className="h-6 w-1/4 rounded bg-bg-secondary animate-pulse mt-6" />
                <div className="h-px w-full bg-border" />
                <div className="h-4 w-full rounded bg-bg-secondary animate-pulse" />
                <div className="h-4 w-full rounded bg-bg-secondary animate-pulse" />
                <div className="h-4 w-2/3 rounded bg-bg-secondary animate-pulse" />
                <div className="h-4 w-full rounded bg-bg-secondary animate-pulse" />
                <div className="h-4 w-1/2 rounded bg-bg-secondary animate-pulse" />
              </div>

              {/* Author card skeleton */}
              <div className="glass-card p-6 mt-8 flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-bg-secondary animate-pulse shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-40 rounded bg-bg-secondary animate-pulse" />
                  <div className="h-3 w-56 rounded bg-bg-secondary animate-pulse" />
                </div>
              </div>
            </article>

            {/* ─── Sidebar Skeleton ──────────────────────────── */}
            <aside className="lg:w-72 shrink-0">
              <div className="sticky top-24 flex flex-col gap-6">
                <div className="h-4 w-32 rounded bg-bg-secondary animate-pulse" />

                <div className="glass-card p-5 space-y-3">
                  <div className="h-3 w-12 rounded bg-bg-secondary animate-pulse mb-3" />
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-6 w-14 rounded-full bg-bg-secondary animate-pulse" />
                    ))}
                  </div>
                </div>

                <div className="glass-card p-5 space-y-4">
                  <div className="h-3 w-20 rounded bg-bg-secondary animate-pulse mb-3" />
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 w-full rounded bg-bg-secondary animate-pulse" />
                      <div className="h-3 w-20 rounded bg-bg-secondary animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}

import Navbar from "@/components/Navbar";

export default function BlogLoading() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-18">
        {/* ─── Hero Skeleton ─────────────────────────────── */}
        <section className="relative py-20 overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-150 h-150 rounded-full bg-accent-indigo/10 blur-[120px]" />
          </div>
          <div className="relative max-w-6xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-bg-glass text-text-secondary text-sm mb-6">
              <i className="fa-solid fa-pen-nib text-accent-indigo" />
              <span>Writing &amp; Thoughts</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
              The <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Deep-dives into AI, ML systems, data engineering, and full-stack
              development — written from the trenches.
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* ─── Main Skeleton ─────────────────────────────── */}
            <div className="flex-1 min-w-0">
              {/* Featured label */}
              <div className="mb-12">
                <div className="h-3 w-28 rounded bg-bg-secondary animate-pulse mb-4" />

                {/* Featured card skeleton */}
                <div className="glass-card overflow-hidden">
                  <div className="h-48 bg-bg-secondary animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="flex gap-3">
                      <div className="h-3 w-16 rounded bg-bg-secondary animate-pulse" />
                      <div className="h-3 w-24 rounded bg-bg-secondary animate-pulse" />
                      <div className="h-3 w-20 rounded bg-bg-secondary animate-pulse" />
                    </div>
                    <div className="h-5 w-3/4 rounded bg-bg-secondary animate-pulse" />
                    <div className="h-4 w-full rounded bg-bg-secondary animate-pulse" />
                    <div className="h-4 w-2/3 rounded bg-bg-secondary animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Post list skeletons */}
              <div className="space-y-6">
                <div className="h-3 w-24 rounded bg-bg-secondary animate-pulse mb-6" />
                {[1, 2, 3].map((i) => (
                  <div key={i} className="glass-card p-6">
                    <div className="flex gap-5">
                      <div className="shrink-0 w-14 h-14 rounded-xl bg-bg-secondary animate-pulse" />
                      <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex gap-2">
                          <div className="h-3 w-14 rounded bg-bg-secondary animate-pulse" />
                          <div className="h-3 w-20 rounded bg-bg-secondary animate-pulse" />
                          <div className="h-3 w-16 rounded bg-bg-secondary animate-pulse" />
                        </div>
                        <div className="h-4 w-4/5 rounded bg-bg-secondary animate-pulse" />
                        <div className="h-3 w-full rounded bg-bg-secondary animate-pulse" />
                        <div className="h-3 w-1/2 rounded bg-bg-secondary animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── Sidebar Skeleton ──────────────────────────── */}
            <aside className="lg:w-72 shrink-0">
              <div className="sticky top-24 flex flex-col gap-8">
                {/* Categories */}
                <div className="glass-card p-6 space-y-3">
                  <div className="h-3 w-24 rounded bg-bg-secondary animate-pulse mb-4" />
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-4 w-full rounded bg-bg-secondary animate-pulse" />
                  ))}
                </div>

                {/* Tags */}
                <div className="glass-card p-6">
                  <div className="h-3 w-16 rounded bg-bg-secondary animate-pulse mb-4" />
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="h-6 w-16 rounded-full bg-bg-secondary animate-pulse" />
                    ))}
                  </div>
                </div>

                {/* Recent */}
                <div className="glass-card p-6 space-y-4">
                  <div className="h-3 w-28 rounded bg-bg-secondary animate-pulse mb-4" />
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 w-full rounded bg-bg-secondary animate-pulse" />
                      <div className="h-3 w-24 rounded bg-bg-secondary animate-pulse" />
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

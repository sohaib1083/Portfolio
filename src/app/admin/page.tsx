"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { getAllPosts, type BlogPost } from "@/data/blog";

// ─── Types ─────────────────────────────────────────

interface FormState {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  tags: string;          // comma-separated
  category: string;
  coverIcon: string;
  coverGradient: string;
  content: string;
}

const GRADIENTS = [
  { label: "Indigo → Violet", value: "from-accent-indigo to-accent-violet" },
  { label: "Cyan → Green", value: "from-accent-cyan to-accent-green" },
  { label: "Violet → Pink", value: "from-accent-violet to-accent-pink" },
  { label: "Cyan → Indigo", value: "from-accent-cyan to-accent-indigo" },
  { label: "Indigo → Pink", value: "from-accent-indigo to-accent-pink" },
  { label: "Green → Cyan", value: "from-accent-green to-accent-cyan" },
];

const ICONS = [
  "fa-solid fa-pen-nib",
  "fa-solid fa-brain",
  "fa-solid fa-shield-halved",
  "fa-solid fa-database",
  "fa-brands fa-react",
  "fa-solid fa-robot",
  "fa-solid fa-code",
  "fa-solid fa-chart-line",
  "fa-solid fa-cloud",
  "fa-solid fa-microchip",
  "fa-solid fa-flask",
  "fa-solid fa-lightbulb",
];

const EMPTY_FORM: FormState = {
  slug: "",
  title: "",
  excerpt: "",
  date: new Date().toISOString().slice(0, 10),
  readTime: 5,
  tags: "",
  category: "",
  coverIcon: "fa-solid fa-pen-nib",
  coverGradient: "from-accent-indigo to-accent-violet",
  content: `## Introduction

Write your intro here...

---

## Section 1

Content...

---

## Conclusion

Wrap up...
`,
};

// ─── Main Component ─────────────────────────────────

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => {
    if (typeof window === "undefined") return false;
    return !!sessionStorage.getItem("admin_secret");
  });
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState(() => {
    if (typeof window === "undefined") return "";
    return sessionStorage.getItem("admin_secret") ?? "";
  });
  const [authError, setAuthError] = useState("");
  const [view, setView] = useState<"list" | "new" | "edit">("list");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [preview, setPreview] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    if (typeof window === "undefined") return [];
    const isAuthed = !!sessionStorage.getItem("admin_secret");
    return isAuthed ? getAllPosts() : [];
  });
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;
    setSecret(password);
    setAuthed(true);
    setPosts(getAllPosts());
    sessionStorage.setItem("admin_secret", password);
    setAuthError("");
  }

  function logout() {
    sessionStorage.removeItem("admin_secret");
    setAuthed(false);
    setSecret("");
    setPassword("");
  }

  function autoSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  const handleChange = useCallback(
    (field: keyof FormState, value: string | number) => {
      setForm((prev) => {
        const next = { ...prev, [field]: value };
        if (field === "title" && !prev.slug) {
          next.slug = autoSlug(value as string);
        }
        return next;
      });
    },
    []
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const payload = {
      secret,
      post: {
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        readTime: Number(form.readTime),
      },
    };

    const res = await fetch("/api/admin/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setStatus({ type: "success", msg: `✓ Post "${data.slug}" published! Rebuild the site to see it live.` });
      setForm(EMPTY_FORM);
      setPosts(getAllPosts());
      setView("list");
    } else if (res.status === 401) {
      setAuthed(false);
      sessionStorage.removeItem("admin_secret");
      setAuthError("Wrong password — please log in again.");
    } else {
      setStatus({ type: "error", msg: data.error ?? "Something went wrong." });
    }
  }

  async function handleDelete(slug: string) {
    setLoading(true);
    const res = await fetch("/api/admin/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, slug }),
    });
    const data = await res.json();
    setLoading(false);
    setDeleteSlug(null);
    if (res.ok) {
      setStatus({ type: "success", msg: `Post "${slug}" deleted. Rebuild to apply.` });
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
    } else {
      setStatus({ type: "error", msg: data.error ?? "Delete failed." });
    }
  }

  // ── Login Screen ─────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center p-6">
        <form
          onSubmit={handleLogin}
          className="glass-card p-8 w-full max-w-sm flex flex-col gap-5"
        >
          <div className="text-center mb-2">
            <i className="fa-solid fa-lock text-accent-indigo text-2xl mb-3 block" />
            <p className="font-display font-semibold text-text-primary text-lg">Admin Access</p>
            <p className="text-text-muted text-sm mt-1">Enter your secret to continue</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Secret password"
            className="bg-bg-secondary border border-border rounded-lg px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-accent-indigo transition-colors w-full"
            autoFocus
          />
          {authError && <p className="text-red-400 text-xs">{authError}</p>}
          <button
            type="submit"
            className="bg-accent-indigo hover:bg-accent-indigo/80 text-white font-medium py-3 rounded-lg text-sm transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  // ── Admin Shell ───────────────────────────────────
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-bg-primary/90 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-accent-indigo">
              &lt;SS/&gt;
            </span>
            <span className="text-text-muted text-sm">/ Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/blog" target="_blank" className="text-xs text-text-muted hover:text-accent-cyan transition-colors">
              <i className="fa-solid fa-arrow-up-right-from-square mr-1" />
              View Blog
            </Link>
            <button onClick={logout} className="text-xs text-text-muted hover:text-red-400 transition-colors">
              <i className="fa-solid fa-right-from-bracket mr-1" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Status banner */}
        {status && (
          <div
            className={`mb-6 px-5 py-4 rounded-xl border text-sm flex items-start gap-3 ${
              status.type === "success"
                ? "bg-accent-green/10 border-accent-green/30 text-accent-green"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            <i className={`mt-0.5 ${status.type === "success" ? "fa-solid fa-circle-check" : "fa-solid fa-circle-exclamation"}`} />
            <span>{status.msg}</span>
            <button className="ml-auto opacity-60 hover:opacity-100" onClick={() => setStatus(null)}>
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <TabBtn active={view === "list"} onClick={() => setView("list")}>
            <i className="fa-solid fa-list mr-2" />Posts ({posts.length})
          </TabBtn>
          <TabBtn active={view === "new"} onClick={() => { setView("new"); setForm(EMPTY_FORM); setPreview(false); setStatus(null); }}>
            <i className="fa-solid fa-plus mr-2" />New Post
          </TabBtn>
        </div>

        {/* ── Post List ───────────────────────────────── */}
        {view === "list" && (
          <div className="flex flex-col gap-3">
            {posts.length === 0 && (
              <p className="text-text-muted text-sm text-center py-12">No posts yet.</p>
            )}
            {posts.map((post) => (
              <div
                key={post.slug}
                className="glass-card p-5 flex items-center gap-4"
              >
                <div className={`w-11 h-11 rounded-lg bg-linear-to-br ${post.coverGradient} flex items-center justify-center shrink-0`}>
                  <i className={`${post.coverIcon} text-white/80`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-text-primary text-sm truncate">{post.title}</p>
                  <p className="text-text-muted text-xs mt-0.5">
                    {post.date} · {post.category} · {post.readTime} min
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="px-3 py-1.5 text-xs rounded-lg border border-border text-text-muted hover:text-accent-cyan hover:border-accent-cyan/40 transition-all"
                  >
                    <i className="fa-solid fa-eye mr-1" />View
                  </Link>
                  <button
                    onClick={() => setDeleteSlug(post.slug)}
                    className="px-3 py-1.5 text-xs rounded-lg border border-border text-text-muted hover:text-red-400 hover:border-red-500/40 transition-all"
                  >
                    <i className="fa-solid fa-trash mr-1" />Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── New Post Form ────────────────────────────── */}
        {view === "new" && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-xl">New Post</h2>
              <button
                type="button"
                onClick={() => setPreview(!preview)}
                className={`text-xs px-4 py-2 rounded-lg border transition-all ${
                  preview
                    ? "bg-accent-indigo/10 border-accent-indigo/40 text-accent-indigo"
                    : "border-border text-text-muted hover:border-accent-indigo/40 hover:text-accent-indigo"
                }`}
              >
                <i className={`mr-1.5 ${preview ? "fa-solid fa-code" : "fa-solid fa-eye"}`} />
                {preview ? "Editor" : "Preview"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Title */}
              <div className="md:col-span-2">
                <Label>Title</Label>
                <Input
                  value={form.title}
                  onChange={(v) => handleChange("title", v)}
                  placeholder="My Awesome Post"
                  required
                />
              </div>

              {/* Slug */}
              <div>
                <Label>Slug</Label>
                <Input
                  value={form.slug}
                  onChange={(v) => handleChange("slug", v)}
                  placeholder="my-awesome-post"
                  required
                />
                <p className="text-text-muted text-xs mt-1">URL: /blog/{form.slug || "..."}</p>
              </div>

              {/* Date */}
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(v) => handleChange("date", v)}
                  required
                />
              </div>

              {/* Excerpt */}
              <div className="md:col-span-2">
                <Label>Excerpt</Label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => handleChange("excerpt", e.target.value)}
                  placeholder="One or two sentences summarising the post..."
                  rows={2}
                  required
                  className="w-full bg-bg-secondary border border-border rounded-lg px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-accent-indigo transition-colors resize-none"
                />
              </div>

              {/* Category */}
              <div>
                <Label>Category</Label>
                <Input
                  value={form.category}
                  onChange={(v) => handleChange("category", v)}
                  placeholder="AI / ML"
                  required
                />
              </div>

              {/* Read time */}
              <div>
                <Label>Read Time (minutes)</Label>
                <Input
                  type="number"
                  value={String(form.readTime)}
                  onChange={(v) => handleChange("readTime", v)}
                  placeholder="5"
                />
              </div>

              {/* Tags */}
              <div className="md:col-span-2">
                <Label>Tags <span className="text-text-muted font-normal">(comma-separated)</span></Label>
                <Input
                  value={form.tags}
                  onChange={(v) => handleChange("tags", v)}
                  placeholder="AI, Python, Tutorial"
                />
              </div>

              {/* Cover Icon */}
              <div>
                <Label>Cover Icon</Label>
                <div className="flex gap-2 flex-wrap mt-1">
                  {ICONS.map((ic) => (
                    <button
                      key={ic}
                      type="button"
                      onClick={() => handleChange("coverIcon", ic)}
                      className={`w-9 h-9 rounded-lg border text-sm transition-all ${
                        form.coverIcon === ic
                          ? "bg-accent-indigo/20 border-accent-indigo text-accent-indigo"
                          : "border-border text-text-muted hover:border-accent-indigo/40"
                      }`}
                      title={ic}
                    >
                      <i className={ic} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Gradient */}
              <div>
                <Label>Cover Gradient</Label>
                <div className="flex gap-2 flex-wrap mt-1">
                  {GRADIENTS.map((g) => (
                    <button
                      key={g.value}
                      type="button"
                      onClick={() => handleChange("coverGradient", g.value)}
                      title={g.label}
                      className={`w-9 h-9 rounded-lg bg-linear-to-br ${g.value} border-2 transition-all ${
                        form.coverGradient === g.value ? "border-white/80 scale-110" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Content / Preview */}
            <div>
              <Label>Content <span className="text-text-muted font-normal">(Markdown)</span></Label>
              {preview ? (
                <div className="mt-1 bg-bg-secondary border border-border rounded-xl p-6 min-h-64 prose-preview text-text-secondary text-sm leading-relaxed whitespace-pre-wrap font-mono">
                  {form.content || <span className="text-text-muted italic">Nothing to preview yet...</span>}
                </div>
              ) : (
                <textarea
                  value={form.content}
                  onChange={(e) => handleChange("content", e.target.value)}
                  rows={22}
                  required
                  className="w-full mt-1 bg-bg-secondary border border-border rounded-xl px-5 py-4 text-text-primary text-sm font-mono focus:outline-none focus:border-accent-indigo transition-colors resize-y leading-relaxed"
                />
              )}
            </div>

            {/* Live Preview Block */}
            <div className="glass-card p-4 flex items-center gap-4 text-sm">
              <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${form.coverGradient} flex items-center justify-center shrink-0`}>
                <i className={`${form.coverIcon} text-white/80 text-lg`} />
              </div>
              <div>
                <p className="font-medium text-text-primary leading-snug">{form.title || "Post title preview"}</p>
                <p className="text-text-muted text-xs mt-0.5">
                  {form.category || "Category"} · {form.date} · {form.readTime} min read
                </p>
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-3 justify-end pt-2 border-t border-border">
              <button
                type="button"
                onClick={() => setView("list")}
                className="px-5 py-2.5 text-sm rounded-lg border border-border text-text-secondary hover:text-text-primary transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 text-sm rounded-lg bg-accent-indigo hover:bg-accent-indigo/80 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <><i className="fa-solid fa-circle-notch fa-spin" /> Publishing...</>
                ) : (
                  <><i className="fa-solid fa-paper-plane" /> Publish Post</>
                )}
              </button>
            </div>
          </form>
        )}
      </main>

      {/* Delete Confirm Modal */}
      {deleteSlug && (
        <div className="fixed inset-0 bg-bg-primary/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="glass-card p-7 max-w-sm w-full">
            <i className="fa-solid fa-triangle-exclamation text-red-400 text-2xl mb-3 block" />
            <p className="font-semibold text-text-primary mb-2">Delete this post?</p>
            <p className="text-text-secondary text-sm mb-6">
              <code className="text-accent-cyan">{deleteSlug}</code> will be permanently removed from{" "}
              <code className="text-text-muted">blog.ts</code>.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteSlug(null)}
                className="px-4 py-2 text-sm rounded-lg border border-border text-text-secondary hover:text-text-primary transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteSlug)}
                disabled={loading}
                className="px-4 py-2 text-sm rounded-lg bg-red-500/80 hover:bg-red-500 text-white font-medium transition-colors disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tiny shared sub-components ────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-1.5">
      {children}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  required,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full bg-bg-secondary border border-border rounded-lg px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-accent-indigo transition-colors"
    />
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
        active
          ? "bg-accent-indigo/10 border border-accent-indigo/40 text-accent-indigo"
          : "border border-border text-text-secondary hover:text-text-primary hover:border-border-hover"
      }`}
    >
      {children}
    </button>
  );
}

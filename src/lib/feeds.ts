import { XMLParser } from "fast-xml-parser";
import sanitizeHtml from "sanitize-html";
import { handles } from "@/data/profile";
import { getAllPosts } from "@/lib/blog";

// Every feed is fetched server-side, cached for an hour, and fails soft:
// a dead upstream returns an empty list, never a broken page.

const REVALIDATE = 3600;
const TIMEOUT_MS = 8000;

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
  parseTagValue: false,
});

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (sohaib1083.tech)" },
    next: { revalidate: REVALIDATE },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

function toArray<T>(value: T | T[] | undefined): T[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function stripTags(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, "")).trim();
}

// House style: no em dashes anywhere on the site, including text pulled from feeds.
export function tidy(s: string): string {
  return s.replace(/\s*—\s*/g, ", ");
}

function truncate(s: string, max: number): string {
  return s.length <= max ? s : s.slice(0, s.lastIndexOf(" ", max)) + "…";
}

// ─── YouTube ───────────────────────────────────────

export interface Video {
  id: string;
  title: string;
  url: string;
  published: string;
  views: number;
  isShort: boolean;
  thumbnail: string;
}

interface YouTubeEntry {
  "yt:videoId": string;
  title: string;
  link: { href: string };
  published: string;
  "media:group"?: {
    "media:community"?: { "media:statistics"?: { views?: string } };
  };
}

export async function getVideos(): Promise<Video[]> {
  try {
    const xml = await fetchText(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${handles.youtubeChannelId}`
    );
    const entries = toArray<YouTubeEntry>(parser.parse(xml).feed?.entry);
    return entries.map((e) => {
      const id = e["yt:videoId"];
      const url = e.link?.href ?? `https://www.youtube.com/watch?v=${id}`;
      return {
        id,
        title: tidy(decodeEntities(e.title)),
        url,
        published: e.published,
        views: Number(e["media:group"]?.["media:community"]?.["media:statistics"]?.views ?? 0),
        isShort: url.includes("/shorts/"),
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      };
    });
  } catch (err) {
    console.error("[feeds] youtube:", err);
    return [];
  }
}

// ─── Writing (Medium + on-site blog) ───────────────
// Everything renders on this site. Medium pieces keep a link (and canonical) to the original.

export interface Article {
  slug: string;
  title: string;
  href: string;
  original?: string;
  date: string;
  excerpt: string;
  tags: string[];
  readTime: number;
  source: "Medium" | "Blog";
}

export interface MediumArticle extends Article {
  html: string;
}

interface MediumItem {
  title: string;
  link: string;
  pubDate: string;
  category?: string | string[];
  "content:encoded": string;
}

// Apply house style to prose but never touch code.
function tidyHtml(html: string): string {
  return html
    .split(/(<pre[\s\S]*?<\/pre>)/)
    .map((part, i) => (i % 2 ? part : tidy(part)))
    .join("");
}

export function tidyMarkdown(md: string): string {
  return md
    .split(/(```[\s\S]*?```)/)
    .map((part, i) => (i % 2 ? part : tidy(part)))
    .join("");
}

function cleanMediumHtml(html: string): string {
  const safe = sanitizeHtml(html, {
    allowedTags: [
      "h1", "h2", "h3", "h4", "p", "a", "ul", "ol", "li", "blockquote", "pre", "code",
      "strong", "em", "b", "i", "figure", "figcaption", "img", "hr", "br",
      "table", "thead", "tbody", "tr", "th", "td",
    ],
    allowedAttributes: { a: ["href"], img: ["src", "alt"] },
    allowedSchemes: ["https", "http", "mailto"],
    // Medium appends a 1px tracking image to every post.
    exclusiveFilter: (frame) => frame.tag === "img" && (frame.attribs.src ?? "").includes("/_/stat"),
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { target: "_blank", rel: "noopener noreferrer" }),
    },
  });
  // The first heading repeats the title, which the page already shows.
  return tidyHtml(safe.replace(/^\s*<h[1-4]>[\s\S]*?<\/h[1-4]>/, ""));
}

export async function getMediumArticles(): Promise<MediumArticle[]> {
  try {
    const xml = await fetchText(`https://medium.com/feed/@${handles.medium}`);
    const items = toArray<MediumItem>(parser.parse(xml).rss?.channel?.item);
    return items.map((item) => {
      const raw = item["content:encoded"] ?? "";
      // The feed truncates long titles; the article's first heading has the full one.
      const heading = raw.match(/<h[1-4][^>]*>(.*?)<\/h[1-4]>/)?.[1];
      const firstPara = raw.match(/<p>(.*?)<\/p>/)?.[1] ?? "";
      const words = stripTags(raw).split(/\s+/).length;
      const original = item.link.split("?")[0];
      const slug = original.split("/").pop() ?? "";
      return {
        slug,
        title: tidy(heading ? stripTags(heading) : item.title),
        href: `/medium/${slug}`,
        original,
        date: new Date(item.pubDate).toISOString(),
        excerpt: truncate(tidy(stripTags(firstPara)), 220),
        tags: toArray(item.category),
        readTime: Math.max(1, Math.round(words / 230)),
        source: "Medium" as const,
        html: cleanMediumHtml(raw),
      };
    });
  } catch (err) {
    console.error("[feeds] medium:", err);
    return [];
  }
}

export async function getMediumArticle(slug: string): Promise<MediumArticle | null> {
  return (await getMediumArticles()).find((a) => a.slug === slug) ?? null;
}

// Mongo can take ~30s to give up on server selection. Pages regenerate in the
// background (ISR), so a slow cold connect is fine; a dead one is not.
export function withTimeout<T>(promise: Promise<T>, ms = 15000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error("blog db timeout")), ms)),
  ]);
}

/** Throws if the database is unreachable; callers decide how to degrade. */
export async function fetchBlogPosts(): Promise<Article[]> {
  const posts = await withTimeout(getAllPosts());
  return posts.map((p) => ({
    slug: p.slug,
    title: tidy(p.title),
    href: `/blog/${p.slug}`,
    date: new Date(p.date).toISOString(),
    excerpt: tidy(p.excerpt),
    tags: p.tags,
    readTime: p.readTime,
    source: "Blog" as const,
  }));
}

export async function getBlogPosts(): Promise<Article[]> {
  try {
    return await fetchBlogPosts();
  } catch (err) {
    console.error("[feeds] blog:", err);
    return [];
  }
}

export async function getArticles(): Promise<Article[]> {
  const [medium, blog] = await Promise.all([getMediumArticles(), getBlogPosts()]);
  return [...medium, ...blog].sort((a, b) => b.date.localeCompare(a.date));
}

// ─── GitHub: open-source activity on Tazama ────────

export interface PullRequest {
  title: string;
  repo: string;
  url: string;
  date: string;
  merged: boolean;
}

export interface OpenSourceActivity {
  opened: number;
  merged: number;
  recent: PullRequest[];
  byRepo: Record<string, number>;
}

interface SearchResult {
  total_count: number;
  items: {
    title: string;
    html_url: string;
    created_at: string;
    repository_url: string;
    pull_request?: { merged_at: string | null };
  }[];
}

async function searchPRs(query: string, perPage: number): Promise<SearchResult> {
  const url = `https://api.github.com/search/issues?q=${encodeURIComponent(query)}&sort=created&order=desc&per_page=${perPage}`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "sohaib1083.tech",
      // Optional: lifts the unauthenticated search limit (10 req/min per IP).
      ...(process.env.GITHUB_TOKEN && { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }),
    },
    next: { revalidate: REVALIDATE },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`${res.status} github search`);
  return res.json();
}

export async function getTazamaActivity(): Promise<OpenSourceActivity | null> {
  const base = `author:${handles.githubWork} org:tazama-lf type:pr`;
  try {
    const [all, merged] = await Promise.all([
      searchPRs(base, 100),
      searchPRs(`${base} is:merged`, 1),
    ]);
    // The same branch is sometimes PR'd twice (dev + main); show each title once.
    const seen = new Set<string>();
    const recent = all.items
      .filter((pr) => !seen.has(pr.title) && seen.add(pr.title))
      .slice(0, 6)
      .map((pr) => ({
        title: pr.title,
        repo: pr.repository_url.split("/").pop() ?? "",
        url: pr.html_url,
        date: pr.created_at,
        merged: Boolean(pr.pull_request?.merged_at),
      }));
    const byRepo: Record<string, number> = {};
    for (const pr of all.items) {
      const repo = pr.repository_url.split("/").pop() ?? "";
      byRepo[repo] = (byRepo[repo] ?? 0) + 1;
    }
    return { opened: all.total_count, merged: merged.total_count, recent, byRepo };
  } catch (err) {
    console.error("[feeds] github:", err);
    return null;
  }
}

// ─── Formatting ────────────────────────────────────

export function formatMonth(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function formatViews(n: number): string {
  return `${n.toLocaleString("en-US")} view${n === 1 ? "" : "s"}`;
}

export function formatDay(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "2-digit" });
}

export function formatLongDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

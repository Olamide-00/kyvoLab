import { marked } from "marked";
import DOMPurify from "dompurify";
import { SEED_POSTS } from "../data/posts";

export type BlogAuthor = {
  name: string;
  role?: string;
  avatar?: string;
  slug?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** Markdown or HTML. */
  content: string;
  cover?: string;
  coverAlt?: string;
  category: string;
  tags: string[];
  author: BlogAuthor;
  publishedAt: string;
  updatedAt?: string;
  featured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  readingMinutes: number;
};

export type TocItem = { id: string; text: string; level: 2 | 3 };

/*
 * Backend contract (set VITE_BLOG_API_URL, e.g. https://api.kyvolab.com.ng/blog):
 *   GET {base}/posts          -> BlogPost[]  or  { data: BlogPost[] }  or  { posts: BlogPost[] }
 *   GET {base}/posts/{slug}   -> BlogPost    or  { data: BlogPost }     (404 when missing)
 * Only slug, title and content are required; everything else has a fallback.
 * Common snake_case names (published_at, cover_image, ...) are accepted too.
 */
const API_BASE = import.meta.env.VITE_BLOG_API_URL?.replace(/\/+$/, "");

const WORDS_PER_MINUTE = 220;

function readingMinutes(content: string) {
  const words = content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function pick<T>(raw: Record<string, unknown>, ...keys: string[]): T | undefined {
  for (const k of keys) {
    if (raw[k] !== undefined && raw[k] !== null && raw[k] !== "") return raw[k] as T;
  }
  return undefined;
}

function normalizeAuthor(a: unknown): BlogAuthor {
  if (typeof a === "string") return { name: a };
  if (a && typeof a === "object") {
    const r = a as Record<string, unknown>;
    return {
      name: pick<string>(r, "name", "fullName", "full_name") ?? "KyvoLab Team",
      role: pick<string>(r, "role", "title", "jobTitle"),
      avatar: pick<string>(r, "avatar", "photo", "image"),
      slug: pick<string>(r, "slug"),
    };
  }
  return { name: "KyvoLab Team", role: "Editorial" };
}

export function normalizePost(input: unknown): BlogPost | null {
  if (!input || typeof input !== "object") return null;
  const r = input as Record<string, unknown>;
  const slug = pick<string>(r, "slug");
  const title = pick<string>(r, "title");
  const content = pick<string>(r, "content", "body", "html", "markdown") ?? "";
  if (!slug || !title) return null;

  const excerpt =
    pick<string>(r, "excerpt", "summary", "description") ??
    content.replace(/<[^>]+>|[#*_>`[\]()!-]/g, "").replace(/\s+/g, " ").trim().slice(0, 180) + "…";

  const rawTags = pick<unknown>(r, "tags");
  const tags = Array.isArray(rawTags)
    ? rawTags.map((t) => (typeof t === "string" ? t : String((t as Record<string, unknown>)?.name ?? ""))).filter(Boolean)
    : typeof rawTags === "string"
      ? rawTags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

  const rawCategory = pick<unknown>(r, "category");
  const category =
    typeof rawCategory === "string"
      ? rawCategory
      : String((rawCategory as Record<string, unknown> | undefined)?.name ?? "Insights");

  return {
    slug,
    title,
    excerpt,
    content,
    cover: pick<string>(r, "cover", "coverImage", "cover_image", "image", "thumbnail"),
    coverAlt: pick<string>(r, "coverAlt", "cover_alt"),
    category,
    tags,
    author: normalizeAuthor(r.author),
    publishedAt: pick<string>(r, "publishedAt", "published_at", "createdAt", "created_at") ?? new Date().toISOString(),
    updatedAt: pick<string>(r, "updatedAt", "updated_at"),
    featured: Boolean(pick<boolean>(r, "featured", "isFeatured", "is_featured")),
    metaTitle: pick<string>(r, "metaTitle", "meta_title", "seoTitle"),
    metaDescription: pick<string>(r, "metaDescription", "meta_description", "seoDescription"),
    readingMinutes: pick<number>(r, "readingMinutes", "reading_time", "readTime") ?? readingMinutes(content),
  };
}

function unwrap(json: unknown): unknown {
  if (json && typeof json === "object" && !Array.isArray(json)) {
    const r = json as Record<string, unknown>;
    return r.data ?? r.posts ?? r.post ?? r.items ?? json;
  }
  return json;
}

const byDateDesc = (a: BlogPost, b: BlogPost) => +new Date(b.publishedAt) - +new Date(a.publishedAt);

const seeds = () => SEED_POSTS.map((p) => normalizePost(p)!).sort(byDateDesc);

let listCache: Promise<BlogPost[]> | null = null;

export function getPosts(): Promise<BlogPost[]> {
  if (!API_BASE) return Promise.resolve(seeds());
  listCache ??= fetch(`${API_BASE}/posts`, { headers: { Accept: "application/json" } })
    .then((res) => {
      if (!res.ok) throw new Error(`Blog API ${res.status}`);
      return res.json();
    })
    .then((json) => {
      const list = unwrap(json);
      if (!Array.isArray(list)) throw new Error("Blog API returned no list");
      return list.map(normalizePost).filter((p): p is BlogPost => p !== null).sort(byDateDesc);
    })
    .catch((err) => {
      listCache = null;
      console.warn("[blog] falling back to built-in posts:", err);
      return seeds();
    });
  return listCache;
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  if (API_BASE) {
    try {
      const res = await fetch(`${API_BASE}/posts/${encodeURIComponent(slug)}`, {
        headers: { Accept: "application/json" },
      });
      if (res.status === 404) return seeds().find((p) => p.slug === slug) ?? null;
      if (res.ok) {
        const post = normalizePost(unwrap(await res.json()));
        if (post) return post;
      }
    } catch (err) {
      console.warn("[blog] post fetch failed:", err);
    }
    const fromList = (await getPosts()).find((p) => p.slug === slug);
    if (fromList) return fromList;
  }
  return seeds().find((p) => p.slug === slug) ?? null;
}

export function getRelated(post: BlogPost, all: BlogPost[], count = 3): BlogPost[] {
  return all
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      p,
      score: (p.category === post.category ? 3 : 0) + p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score || byDateDesc(a.p, b.p))
    .slice(0, count)
    .map((x) => x.p);
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Renders markdown/HTML to sanitized HTML, adding ids to h2/h3 for the table of contents. */
export function renderContent(content: string): { html: string; toc: TocItem[] } {
  const looksLikeHtml = /^\s*<[a-z][\s\S]*>/i.test(content);
  const raw = looksLikeHtml ? content : (marked.parse(content, { async: false, gfm: true }) as string);
  const clean = DOMPurify.sanitize(raw, { ADD_ATTR: ["target", "rel"] });

  const doc = new DOMParser().parseFromString(clean, "text/html");
  const toc: TocItem[] = [];
  const used = new Set<string>();
  doc.querySelectorAll("h2, h3").forEach((h) => {
    const text = h.textContent?.trim() ?? "";
    let id = h.id || slugify(text) || "section";
    while (used.has(id)) id += "-x";
    used.add(id);
    h.id = id;
    toc.push({ id, text, level: h.tagName === "H2" ? 2 : 3 });
  });
  doc.querySelectorAll("a[href^='http']").forEach((a) => {
    if (!a.getAttribute("href")?.includes("kyvolab.com.ng")) {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    }
  });
  doc.querySelectorAll("img").forEach((img) => img.setAttribute("loading", "lazy"));
  doc.querySelectorAll("table").forEach((t) => {
    const wrap = doc.createElement("div");
    wrap.className = "bp-table";
    t.replaceWith(wrap);
    wrap.appendChild(t);
  });

  return { html: doc.body.innerHTML, toc };
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(+d)) return "";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export const COVER_PALETTES = [
  ["#00D9B4", "#2F8FFF"],
  ["#2F8FFF", "#8B5CF6"],
  ["#00D9B4", "#4ADE80"],
  ["#F59E0B", "#EF4444"],
  ["#8B5CF6", "#EC4899"],
];

export function hashSlug(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function postAccent(post: Pick<BlogPost, "slug">) {
  return COVER_PALETTES[hashSlug(post.slug) % COVER_PALETTES.length][0];
}

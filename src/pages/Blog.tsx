import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AlgorithmCanvas from "../components/AlgorithmCanvas";
import Reveal from "../components/Reveal";
import SEO from "../components/SEO";
import BlogCover from "../components/BlogCover";
import { BlogListSchema } from "../components/BlogSchema";
import { formatDate, getPosts, type BlogPost } from "../lib/blog";
import "../styles/blog.css";

const ALL = "All";

function Meta({ post }: { post: BlogPost }) {
  return (
    <div className="bl-meta">
      {post.author.avatar && <img src={post.author.avatar} alt="" className="bl-meta-av" />}
      <span className="bl-meta-name">{post.author.name}</span>
      <span className="bl-meta-sep">·</span>
      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      <span className="bl-meta-sep">·</span>
      <span>{post.readingMinutes} min read</span>
    </div>
  );
}

function PostCard({ post, i }: { post: BlogPost; i: number }) {
  return (
    <Reveal delay={(i % 3) * 90}>
      <article className="bl-card">
        <Link to={`/blog/${post.slug}`} className="bl-card-link" aria-label={post.title}>
          <div className="bl-card-cover">
            <BlogCover post={post} size="sm" />
            <span className="bl-chip bl-card-cat">{post.category}</span>
          </div>
          <div className="bl-card-body">
            <h3 className="bl-card-title">{post.title}</h3>
            <p className="bl-card-ex">{post.excerpt}</p>
            <div className="bl-card-foot">
              <Meta post={post} />
              <span className="bl-arr">→</span>
            </div>
          </div>
        </Link>
      </article>
    </Reveal>
  );
}

function Skeleton() {
  return (
    <div className="bl-grid" aria-busy="true" aria-label="Loading articles">
      {[0, 1, 2].map((i) => (
        <div key={i} className="bl-card bl-skel">
          <div className="bl-skel-cover" />
          <div className="bl-card-body">
            <div className="bl-skel-line w80" />
            <div className="bl-skel-line w60" />
            <div className="bl-skel-line w40" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [params, setParams] = useSearchParams();
  const category = params.get("category") || ALL;
  const query = params.get("q") || "";

  useEffect(() => {
    let alive = true;
    getPosts().then((p) => alive && setPosts(p));
    return () => {
      alive = false;
    };
  }, []);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (!value || value === ALL) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    posts?.forEach((p) => counts.set(p.category, (counts.get(p.category) ?? 0) + 1));
    return [ALL, ...[...counts.entries()].sort((a, b) => b[1] - a[1]).map(([c]) => c)];
  }, [posts]);

  const filtered = useMemo(() => {
    if (!posts) return [];
    const q = query.trim().toLowerCase();
    return posts.filter(
      (p) =>
        (category === ALL || p.category === category) &&
        (!q || [p.title, p.excerpt, p.category, ...p.tags].join(" ").toLowerCase().includes(q)),
    );
  }, [posts, category, query]);

  const isFiltering = category !== ALL || query.trim() !== "";
  const featured = !isFiltering ? (filtered.find((p) => p.featured) ?? filtered[0]) : undefined;
  const rest = featured ? filtered.filter((p) => p !== featured) : filtered;

  const topics = useMemo(() => {
    const counts = new Map<string, number>();
    posts?.forEach((p) => p.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12).map(([t]) => t);
  }, [posts]);

  return (
    <>
      <SEO
        title="Blog — Fintech Guides & Engineering Insights | KyvoLab"
        description="The KyvoLab Journal: practical guides on building fintech apps in Nigeria — payments, wallets, VTU, KYC with BVN and NIN, security and product design."
        path="/blog"
      />
      {posts && <BlogListSchema posts={posts} />}

      {/* ── HERO ── */}
      <section className="page-hero bl-hero">
        <AlgorithmCanvas intensity="low" />
        <div className="hero-scrim" />
        <div className="bl-hero-in">
          <Reveal>
            <div className="hero-eye">
              <div className="hero-dot" />
              <span>kyvolab.journal()</span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="page-h1">
              Notes from the lab.
              <br />
              <span className="tg">Fintech, engineered.</span>
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="page-sub">
              Field-tested guides on building payment, wallet and VTU products for Africa — written by the
              engineers and designers who ship them.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <label className="bl-search">
              <span className="bl-search-prompt">$ grep</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setParam("q", e.target.value)}
                placeholder="search articles, e.g. KYC, VTU, payments…"
                aria-label="Search articles"
              />
              {query && (
                <button type="button" className="bl-search-clear" onClick={() => setParam("q", "")} aria-label="Clear search">
                  ✕
                </button>
              )}
            </label>
          </Reveal>
        </div>
      </section>

      {/* ── LISTING ── */}
      <section className="sec bl-list-bg">
        <div className="sec-in">
          <div className="bl-filters" role="tablist" aria-label="Filter by category">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={c === category}
                className={`bl-filter ${c === category ? "on" : ""}`}
                onClick={() => setParam("category", c)}
              >
                {c}
              </button>
            ))}
            {posts && (
              <span className="bl-count">
                {filtered.length} article{filtered.length === 1 ? "" : "s"}
              </span>
            )}
          </div>

          {!posts && <Skeleton />}

          {featured && (
            <Reveal>
              <article className="bl-feat">
                <Link to={`/blog/${featured.slug}`} className="bl-feat-link">
                  <div className="bl-feat-cover">
                    <BlogCover post={featured} size="lg" eager />
                  </div>
                  <div className="bl-feat-body">
                    <div className="bl-feat-top">
                      <span className="bl-chip bl-chip-glow">★ Featured</span>
                      <span className="bl-chip">{featured.category}</span>
                    </div>
                    <h2 className="bl-feat-title">{featured.title}</h2>
                    <p className="bl-feat-ex">{featured.excerpt}</p>
                    <Meta post={featured} />
                    <span className="bl-feat-cta">
                      Read article <span>→</span>
                    </span>
                  </div>
                </Link>
              </article>
            </Reveal>
          )}

          {posts && rest.length > 0 && (
            <div className="bl-grid">
              {rest.map((p, i) => (
                <PostCard key={p.slug} post={p} i={i} />
              ))}
            </div>
          )}

          {posts && filtered.length === 0 && (
            <div className="bl-empty">
              <div className="pending-glyph-lg">∅</div>
              <div className="bl-empty-t">No articles match “{query || category}”.</div>
              <button
                type="button"
                className="btn-s"
                onClick={() => setParams(new URLSearchParams(), { replace: true })}
              >
                Clear filters
              </button>
            </div>
          )}

          {topics.length > 0 && (
            <div className="bl-topics">
              <div className="eyebrow">topics we cover</div>
              <div className="bl-topics-list">
                {topics.map((t) => (
                  <button key={t} type="button" className="bl-topic" onClick={() => setParam("q", t)}>
                    #{t}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-strip">
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <AlgorithmCanvas intensity="low" />
        </div>
        <div className="cta-strip-in">
          <Reveal>
            <h2 className="cta-strip-h">
              Reading about it is good.
              <br />
              <span className="tg">Shipping it is better.</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="bl-cta-sub">
              We design and build the fintech products we write about. Tell us what you're planning and get a
              scope, timeline and plan from our team.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <div className="bl-cta-btns">
              <Link to="/contact" className="btn-p bl-btn-glow">
                Start a project →
              </Link>
              <Link to="/work" className="btn-s bl-btn-ghost">
                See our work
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

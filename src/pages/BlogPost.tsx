import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import AlgorithmCanvas from "../components/AlgorithmCanvas";
import Reveal from "../components/Reveal";
import SEO from "../components/SEO";
import BlogCover from "../components/BlogCover";
import { BlogPostSchema } from "../components/BlogSchema";
import { useToast } from "../components/Toast";
import { formatDate, getPost, getPosts, getRelated, postAccent, renderContent, type BlogPost as Post } from "../lib/blog";
import NotFound from "./NotFound";
import "../styles/blog.css";

const baseUrl = "https://www.kyvolab.com.ng";

function ShareButtons({ post, vertical = false }: { post: Post; vertical?: boolean }) {
  const toast = useToast();
  const url = `${baseUrl}/blog/${post.slug}`;
  const text = encodeURIComponent(post.title);
  const u = encodeURIComponent(url);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast("✓ Link copied to clipboard");
    } catch {
      toast("Couldn't copy — long-press the address bar instead");
    }
  };

  const nativeShare = () => {
    if (navigator.share) navigator.share({ title: post.title, url }).catch(() => {});
    else copy();
  };

  return (
    <div className={`bp-share ${vertical ? "vert" : ""}`}>
      <a className="bp-share-btn" href={`https://x.com/intent/post?text=${text}&url=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X">
        𝕏
      </a>
      <a className="bp-share-btn" href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
        in
      </a>
      <a className="bp-share-btn" href={`https://wa.me/?text=${text}%20${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
        wa
      </a>
      <button type="button" className="bp-share-btn" onClick={copy} aria-label="Copy link">
        ⧉
      </button>
      {!vertical && (
        <button type="button" className="bp-share-btn bp-share-native" onClick={nativeShare} aria-label="Share">
          ↗
        </button>
      )}
    </div>
  );
}

function PostSkeleton() {
  return (
    <section className="page-hero bp-hero">
      <div className="bp-hero-in" aria-busy="true">
        <div className="bl-skel-line w40 dark" />
        <div className="bl-skel-line w80 dark tall" />
        <div className="bl-skel-line w60 dark tall" />
        <div className="bl-skel-line w40 dark" />
      </div>
    </section>
  );
}

export default function BlogPost() {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null | undefined>(undefined);
  const [related, setRelated] = useState<Post[]>([]);
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState("");
  const articleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let alive = true;
    getPost(slug).then((p) => {
      if (!alive) return;
      setPost(p);
      if (p) getPosts().then((all) => alive && setRelated(getRelated(p, all)));
    });
    return () => {
      alive = false;
    };
  }, [slug]);

  const rendered = useMemo(() => (post ? renderContent(post.content) : null), [post]);

  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      setProgress(Math.min(1, Math.max(0, -rect.top / Math.max(total, 1))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [rendered]);

  useEffect(() => {
    const el = articleRef.current;
    if (!el || !rendered?.toc.length) return;
    const heads = el.querySelectorAll("h2[id], h3[id]");
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -65% 0px" },
    );
    heads.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [rendered]);

  // Route in-article links to our own pages through the router instead of a full reload.
  const onArticleClick = (e: MouseEvent<HTMLDivElement>) => {
    const a = (e.target as HTMLElement).closest("a");
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;
    const href = a.getAttribute("href") || "";
    const internal = href.startsWith("/") ? href : href.startsWith(baseUrl) ? href.slice(baseUrl.length) || "/" : null;
    if (internal && !internal.startsWith("//")) {
      e.preventDefault();
      navigate(internal);
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  if (post === undefined) return <PostSkeleton />;
  if (post === null) return <NotFound />;

  const accent = postAccent(post);
  const cover = post.cover;
  const updated = post.updatedAt && post.updatedAt !== post.publishedAt ? post.updatedAt : null;

  return (
    <div style={{ ["--accent" as string]: accent }}>
      <SEO
        title={post.metaTitle || `${post.title} | KyvoLab Blog`}
        description={post.metaDescription || post.excerpt}
        path={`/blog/${post.slug}`}
        image={cover}
        type="article"
      />
      <Helmet>
        <meta property="article:published_time" content={post.publishedAt} />
        {updated && <meta property="article:modified_time" content={updated} />}
        <meta property="article:author" content={post.author.name} />
        <meta property="article:section" content={post.category} />
        {post.tags.map((t) => (
          <meta key={t} property="article:tag" content={t} />
        ))}
        <meta name="keywords" content={post.tags.join(", ")} />
      </Helmet>
      <BlogPostSchema post={post} />

      <div className="bp-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      {/* ── HERO ── */}
      <header className="page-hero bp-hero">
        <AlgorithmCanvas intensity="low" />
        <div className="hero-scrim" />
        <div className="bp-hero-in">
          <Reveal>
            <nav className="bp-crumbs" aria-label="Breadcrumb">
              <Link to="/">home</Link>
              <span>/</span>
              <Link to="/blog">blog</Link>
              <span>/</span>
              <Link to={`/blog?category=${encodeURIComponent(post.category)}`}>{post.category.toLowerCase()}</Link>
            </nav>
          </Reveal>
          <Reveal delay={70}>
            <h1 className="bp-h1">{post.title}</h1>
          </Reveal>
          <Reveal delay={130}>
            <p className="bp-lede">{post.excerpt}</p>
          </Reveal>
          <Reveal delay={190}>
            <div className="bp-byline">
              {post.author.avatar ? (
                <img src={post.author.avatar} alt="" className="bp-byline-av" />
              ) : (
                <div className="bp-byline-av bp-byline-init">{post.author.name[0]}</div>
              )}
              <div>
                <div className="bp-byline-name">{post.author.name}</div>
                <div className="bp-byline-meta">
                  {post.author.role && <>{post.author.role} · </>}
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> · {post.readingMinutes} min read
                  {updated && <> · updated {formatDate(updated)}</>}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      <div className="bp-cover-wrap">
        <Reveal delay={120}>
          <BlogCover post={post} size="lg" eager />
        </Reveal>
      </div>

      {/* ── BODY ── */}
      <section className="bp-body-sec">
        <div className="bp-layout">
          <aside className="bp-rail" aria-label="Share">
            <div className="bp-rail-sticky">
              <div className="bp-rail-label">share</div>
              <ShareButtons post={post} vertical />
            </div>
          </aside>

          <div className="bp-main">
            {rendered!.toc.length > 2 && (
              <details className="bp-toc-mobile">
                <summary>On this page</summary>
                <ol>
                  {rendered!.toc.map((t) => (
                    <li key={t.id} className={t.level === 3 ? "sub" : ""}>
                      <a href={`#${t.id}`} onClick={(e) => { e.preventDefault(); scrollTo(t.id); }}>
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            )}

            <div
              ref={articleRef}
              className="bp-prose"
              onClick={onArticleClick}
              dangerouslySetInnerHTML={{ __html: rendered!.html }}
            />

            {post.tags.length > 0 && (
              <div className="bp-tags">
                {post.tags.map((t) => (
                  <Link key={t} to={`/blog?q=${encodeURIComponent(t)}`} className="bl-topic">
                    #{t}
                  </Link>
                ))}
              </div>
            )}

            <div className="bp-share-row">
              <span>Found this useful? Share it with your team.</span>
              <ShareButtons post={post} />
            </div>

            <div className="bp-author">
              {post.author.avatar ? (
                <img src={post.author.avatar} alt={post.author.name} className="bp-author-av" />
              ) : (
                <div className="bp-author-av bp-byline-init">{post.author.name[0]}</div>
              )}
              <div>
                <div className="bp-author-k">written by</div>
                <div className="bp-author-name">{post.author.name}</div>
                {post.author.role && <div className="bp-author-role">{post.author.role} at KyvoLab</div>}
                <Link to={post.author.slug ? `/team#${post.author.slug}` : "/team"} className="link-arrow bp-author-link">
                  Meet the team →
                </Link>
              </div>
            </div>
          </div>

          <aside className="bp-side">
            <div className="bp-side-sticky">
              {rendered!.toc.length > 0 && (
                <nav className="bp-toc" aria-label="Table of contents">
                  <div className="bp-rail-label">on this page</div>
                  <ol>
                    {rendered!.toc.map((t) => (
                      <li key={t.id} className={`${t.level === 3 ? "sub" : ""} ${activeId === t.id ? "on" : ""}`}>
                        <a href={`#${t.id}`} onClick={(e) => { e.preventDefault(); scrollTo(t.id); }}>
                          {t.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              <div className="bp-pitch">
                <div className="bp-pitch-glow" />
                <div className="bp-pitch-k">// kyvolab</div>
                <div className="bp-pitch-t">Building a fintech product?</div>
                <p className="bp-pitch-d">
                  Wallets, VTU, payments, lending — we design and engineer them end to end.
                </p>
                <Link to="/contact" className="bp-pitch-btn">
                  Get a free scope →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <section className="sec bl-list-bg">
          <div className="sec-in">
            <Reveal>
              <div className="eyebrow">keep reading</div>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="sec-h2">
                More from <span className="tg">the lab.</span>
              </h2>
            </Reveal>
            <div className="bl-grid">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 90}>
                  <article className="bl-card">
                    <Link to={`/blog/${p.slug}`} className="bl-card-link">
                      <div className="bl-card-cover">
                        <BlogCover post={p} size="sm" />
                        <span className="bl-chip bl-card-cat">{p.category}</span>
                      </div>
                      <div className="bl-card-body">
                        <h3 className="bl-card-title">{p.title}</h3>
                        <p className="bl-card-ex">{p.excerpt}</p>
                        <div className="bl-card-foot">
                          <div className="bl-meta">
                            <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time>
                            <span className="bl-meta-sep">·</span>
                            <span>{p.readingMinutes} min read</span>
                          </div>
                          <span className="bl-arr">→</span>
                        </div>
                      </div>
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="cta-strip">
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <AlgorithmCanvas intensity="low" />
        </div>
        <div className="cta-strip-in">
          <Reveal>
            <h2 className="cta-strip-h">
              Let's build the next one
              <br />
              <span className="tg">together.</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="bl-cta-sub">
              From idea to app store — brand, UI, mobile and backend engineering under one roof.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <div className="bl-cta-btns">
              <Link to="/contact" className="btn-p bl-btn-glow">
                Start a project →
              </Link>
              <Link to="/blog" className="btn-s bl-btn-ghost">
                ← All articles
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

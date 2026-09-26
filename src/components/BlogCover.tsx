import { COVER_PALETTES, hashSlug, type BlogPost } from "../lib/blog";

export default function BlogCover({
  post,
  size = "md",
  eager = false,
}: {
  post: BlogPost;
  size?: "sm" | "md" | "lg";
  eager?: boolean;
}) {
  if (post.cover) {
    return (
      <div className={`bc bc-${size}`}>
        <img
          src={post.cover}
          alt={post.coverAlt || post.title}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
        />
      </div>
    );
  }

  const h = hashSlug(post.slug);
  const [a, b] = COVER_PALETTES[h % COVER_PALETTES.length];
  const initials = post.category
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`bc bc-${size} bc-gen`}
      style={{ ["--a" as string]: a, ["--b" as string]: b, ["--rot" as string]: `${(h % 60) - 30}deg` }}
      role="img"
      aria-label={post.coverAlt || post.title}
    >
      <div className="bc-grid" />
      <div className="bc-orb" />
      <div className="bc-orb o2" />
      <div className="bc-ring" />
      <div className="bc-glyph">{initials}</div>
      <div className="bc-code">
        <span>{"{"}</span> kyvolab.journal/<b>{post.category.toLowerCase().replace(/\s+/g, "-")}</b> <span>{"}"}</span>
      </div>
    </div>
  );
}

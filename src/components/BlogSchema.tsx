import { Helmet } from "react-helmet-async";
import type { BlogPost } from "../lib/blog";

const baseUrl = "https://www.kyvolab.com.ng";
const absolute = (src?: string) => (!src ? `${baseUrl}/og-image.jpg` : src.startsWith("http") ? src : `${baseUrl}${src}`);

const publisher = {
  "@type": "Organization",
  "@id": `${baseUrl}/#organization`,
  name: "KyvoLab",
  logo: { "@type": "ImageObject", url: `${baseUrl}/og-image.jpg` },
};

function JsonLd({ data }: { data: object }) {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

export function BlogListSchema({ posts }: { posts: BlogPost[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": `${baseUrl}/blog#blog`,
        url: `${baseUrl}/blog`,
        name: "KyvoLab Journal",
        description: "Guides and engineering notes on building fintech products in Nigeria and across Africa.",
        publisher,
        blogPost: posts.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          url: `${baseUrl}/blog/${p.slug}`,
          datePublished: p.publishedAt,
          author: { "@type": "Person", name: p.author.name },
        })),
      }}
    />
  );
}

export function BlogPostSchema({ post }: { post: BlogPost }) {
  const url = `${baseUrl}/blog/${post.slug}`;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BlogPosting",
            "@id": `${url}#article`,
            mainEntityOfPage: url,
            url,
            headline: post.title,
            description: post.metaDescription || post.excerpt,
            image: absolute(post.cover),
            datePublished: post.publishedAt,
            dateModified: post.updatedAt || post.publishedAt,
            articleSection: post.category,
            keywords: post.tags.join(", "),
            timeRequired: `PT${post.readingMinutes}M`,
            inLanguage: "en",
            author: {
              "@type": "Person",
              name: post.author.name,
              jobTitle: post.author.role,
              ...(post.author.slug ? { url: `${baseUrl}/team#${post.author.slug}` } : {}),
            },
            publisher,
            isPartOf: { "@id": `${baseUrl}/blog#blog` },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
              { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          },
        ],
      }}
    />
  );
}

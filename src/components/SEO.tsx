import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}

export default function SEO({
  title,
  description,
  path = "/",
  image = "/og-image.jpg",
  type = "website",
}: SEOProps) {
  const baseUrl = "https://www.kyvolab.com.ng";
  const url = `${baseUrl}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>

      <meta name="description" content={description} />

      <meta name="robots" content="index, follow, max-image-preview:large" />

      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />

      <meta property="og:description" content={description} />

      <meta property="og:url" content={url} />

      <meta property="og:type" content={type} />

      <meta property="og:site_name" content="KyvoLab" />

      <meta property="og:image" content={imageUrl} />

      <meta
        property="og:image:alt"
        content="KyvoLab — Fintech Software Development"
      />

      <meta property="og:image:width" content="1200" />

      <meta property="og:image:height" content="630" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />

      <meta name="twitter:title" content={title} />

      <meta name="twitter:description" content={description} />

      <meta name="twitter:image" content={imageUrl} />

      <meta
        name="twitter:image:alt"
        content="KyvoLab — Fintech Software Development"
      />
    </Helmet>
  );
}

import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
}

export default function SEO({ title, description, path = "/" }: SEOProps) {
  const url = `https://www.kyvolab.com.ng${path}`;

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />

      <meta property="og:description" content={description} />

      <meta property="og:url" content={url} />

      <meta property="og:type" content="website" />

      <meta property="og:site_name" content="KyvoLab" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />

      <meta name="twitter:title" content={title} />

      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}

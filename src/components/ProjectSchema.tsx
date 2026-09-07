interface ProjectSchemaProps {
  name: string;
  description: string;
  slug: string;
  image: string;
  category: string;
}

export default function ProjectSchema({
  name,
  description,
  slug,
  image,
  category,
}: ProjectSchemaProps) {
  const baseUrl = "https://www.kyvolab.com.ng";
  const imageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${baseUrl}/work/${slug}#project`,
    name,
    description,
    url: `${baseUrl}/work/${slug}`,
    image: imageUrl,
    about: category,
    creator: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "KyvoLab",
    },
    isPartOf: {
      "@type": "CollectionPage",
      "@id": `${baseUrl}/work#projects`,
      name: "KyvoLab — Selected Work",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

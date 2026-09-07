import type { Project } from "../data/projects";

export default function WorkListSchema({ projects }: { projects: Project[] }) {
  const baseUrl = "https://www.kyvolab.com.ng";

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${baseUrl}/work#projects`,
    name: "KyvoLab — Selected Work",
    description:
      "Fintech products, apps, and platforms designed and built by KyvoLab.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${baseUrl}/work/${p.slug}`,
        name: p.name,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

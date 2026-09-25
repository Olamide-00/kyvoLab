import type { TeamMember } from "../data/team";

export default function TeamSchema({ team }: { team: TeamMember[] }) {
  const baseUrl = "https://www.kyvolab.com.ng";

  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${baseUrl}/team#page`,
    url: `${baseUrl}/team`,
    name: "KyvoLab — Meet the Team",
    description:
      "The engineers, security specialists and people leads behind KyvoLab's fintech products.",
    about: { "@id": `${baseUrl}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: team.map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Person",
          "@id": `${baseUrl}/team#${m.slug}`,
          name: m.name,
          jobTitle: m.role,
          description: m.bio,
          image: m.photo,
          knowsAbout: [...m.focus, ...m.stack],
          worksFor: {
            "@type": "Organization",
            "@id": `${baseUrl}/#organization`,
            name: "KyvoLab",
          },
        },
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

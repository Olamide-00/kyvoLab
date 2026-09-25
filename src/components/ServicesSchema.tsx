type Svc = { title: string; desc: string };
type Faq = { q: string; a: string };

export default function ServicesSchema({ services, faqs }: { services: Svc[]; faqs: Faq[] }) {
  const baseUrl = "https://www.kyvolab.com.ng";

  const serviceList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${baseUrl}/services#list`,
    name: "KyvoLab Services",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        serviceType: s.title,
        description: s.desc,
        provider: { "@type": "Organization", "@id": `${baseUrl}/#organization`, name: "KyvoLab" },
        areaServed: [
          { "@type": "Country", name: "Nigeria" },
          { "@type": "Place", name: "Africa" },
        ],
      },
    })),
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${baseUrl}/services#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }} />
    </>
  );
}

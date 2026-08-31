export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KyvoLab",
    url: "https://www.kyvolab.com.ng/",
    logo: "https://www.kyvolab.com.ng/og-image.jpg",
    description:
      "KyvoLab designs and builds fintech apps, payment platforms, wallets, VTU and bills platforms for African startups and financial businesses.",
    knowsAbout: [
      "Fintech",
      "Fintech Software Development",
      "Mobile App Development",
      "Payment Platforms",
      "Digital Banking",
      "Wallet Applications",
      "VTU Platforms",
      "Bill Payment Platforms",
      "Financial Technology",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.kyvolab.com.ng/#organization",

    name: "KyvoLab",
    alternateName: "KyvoLab Technologies",
    url: "https://www.kyvolab.com.ng/",

    logo: {
      "@type": "ImageObject",
      "@id": "https://www.kyvolab.com.ng/#logo",
      url: "https://www.kyvolab.com.ng/og-image.jpg",
      contentUrl: "https://www.kyvolab.com.ng/og-image.jpg",
      caption: "KyvoLab",
    },

    image: {
      "@type": "ImageObject",
      url: "https://www.kyvolab.com.ng/og-image.jpg",
      contentUrl: "https://www.kyvolab.com.ng/og-image.jpg",
    },

    description:
      "KyvoLab is a software development company specializing in fintech app development, payment platform development, digital wallet development, VTU app development, bill payment platforms, digital banking solutions, mobile app development, and custom financial technology solutions for startups, businesses, and financial companies in Nigeria and across Africa.",

    slogan: "Building the Technology Behind Modern Finance.",

    knowsAbout: [
      "Fintech",
      "Financial Technology",
      "Fintech Software Development",
      "Fintech App Development",
      "Fintech Application Development",
      "Fintech App Developers",
      "Fintech Software Company",
      "Fintech Development Company",
      "Fintech Solutions",
      "Financial Software Development",
      "Financial Technology Solutions",

      "Mobile App Development",
      "Mobile Application Development",
      "Custom Mobile App Development",
      "iOS App Development",
      "Android App Development",
      "Cross Platform App Development",
      "React Native App Development",

      "Payment Platform Development",
      "Payment App Development",
      "Payment Gateway Integration",
      "Payment Processing",
      "Payment Solutions",
      "Digital Payment Platforms",
      "Online Payment Platforms",

      "Digital Banking",
      "Digital Banking Software",
      "Digital Banking Platform Development",
      "Neobank Development",
      "Neobank App Development",
      "Banking App Development",
      "Banking Software Development",

      "Digital Wallet",
      "Digital Wallet Development",
      "E-Wallet Development",
      "Wallet Application Development",
      "Mobile Wallet Development",
      "Fintech Wallet Development",

      "VTU",
      "VTU App Development",
      "VTU Platform Development",
      "VTU Software Development",
      "VTU Application Development",
      "Airtime and Data Platform Development",
      "Airtime App Development",
      "Data Subscription Platform",
      "Bill Payment Platform",
      "Bill Payment App Development",
      "Utility Payment Platforms",
      "Electricity Bill Payment Platforms",

      "Financial APIs",
      "Fintech API Integration",
      "Payment API Integration",
      "Virtual Account Integration",
      "Banking API Integration",
      "Payment Gateway Integration",

      "Custom Software Development",
      "Software Product Development",
      "SaaS Development",
      "Startup Software Development",
      "MVP Development",
      "Web Application Development",
      "Backend Development",
      "API Development",

      "Fintech Infrastructure",
      "Financial Infrastructure",
      "Payment Infrastructure",
      "Digital Financial Infrastructure",
      "Scalable Fintech Infrastructure",

      "Software Development in Nigeria",
      "Fintech Development in Nigeria",
      "Fintech App Development in Nigeria",
      "Mobile App Development in Nigeria",
      "Fintech Software Development in Africa",
      "Fintech App Development in Africa",
    ],

    areaServed: [
      {
        "@type": "Country",
        name: "Nigeria",
      },
      {
        "@type": "Place",
        name: "Africa",
      },
    ],

    serviceArea: {
      "@type": "Place",
      name: "Africa",
    },

    industry: [
      "Financial Technology",
      "Fintech",
      "Banking",
      "Payments",
      "Financial Services",
      "Technology",
      "Software",
    ],

    category: [
      "Software Development Company",
      "Fintech Software Company",
      "Fintech Development Company",
      "Mobile App Development Company",
      "Financial Technology Company",
    ],

    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Fintech App Development",
          serviceType: "Fintech App Development",
          description:
            "Custom fintech application development for startups, businesses, and financial technology companies.",
        },
      },

      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Payment Platform Development",
          serviceType: "Payment Platform Development",
          description:
            "Development of secure payment platforms and digital payment solutions for businesses and financial companies.",
        },
      },

      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Digital Wallet Development",
          serviceType: "Digital Wallet Development",
          description:
            "Development of digital wallets, e-wallets, mobile wallets, and fintech wallet applications.",
        },
      },

      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "VTU App Development",
          serviceType: "VTU App Development",
          description:
            "Development of VTU platforms and applications for airtime, data, electricity, cable TV, and other digital bill payment services.",
        },
      },

      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Bill Payment Platform Development",
          serviceType: "Bill Payment Platform Development",
          description:
            "Custom bill payment and utility payment platforms for digital businesses and fintech companies.",
        },
      },

      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Digital Banking App Development",
          serviceType: "Digital Banking App Development",
          description:
            "Digital banking, neobank, and financial application development for modern financial businesses.",
        },
      },

      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mobile App Development",
          serviceType: "Mobile App Development",
          description:
            "Custom iOS, Android, and cross-platform mobile application development.",
        },
      },

      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Fintech API Integration",
          serviceType: "Fintech API Integration",
          description:
            "Integration of payment gateways, banking APIs, virtual accounts, financial APIs, and third-party fintech infrastructure.",
        },
      },

      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Software Development",
          serviceType: "Custom Software Development",
          description:
            "Custom software and technology product development for startups and growing businesses.",
        },
      },
    ],

    sameAs: [
      // Add only your real KyvoLab profiles
      // "https://www.linkedin.com/company/kyvolab",
      // "https://www.instagram.com/kyvolab",
      // "https://www.facebook.com/kyvolab",
      // "https://x.com/kyvolab",
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

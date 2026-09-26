export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  handle: string;
  accent: string;
  photo: string;
  bio: string;
  focus: string[];
  stack: string[];
  motto: string;
  socials: { label: string; href: string }[];
};

import olamidePhoto from "../assets/team/olamide-oladele.jpg";
import femiPhoto from "../assets/team/igbalaye-femi.jpg";
import kennyPhoto from "../assets/team/babalola-kenny.jpg";
import praisePhoto from "../assets/team/badmus-praise.jpg";

// Placeholder portrait for members whose headshot isn't ready yet.
const avatar = (seed: string) =>
  `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundColor=transparent`;

export const TEAM: TeamMember[] = [
  {
    slug: "olamide-oladele",
    name: "Olamide Oladele",
    role: "Chief Technology Officer",
    handle: "cto",
    accent: "#00D9B4",
    photo: olamidePhoto,
    bio: "Sets the technical direction at KyvoLab — from ledger architecture and payment rails to how every product gets built, reviewed, and shipped.",
    focus: ["Architecture", "Fintech Infrastructure", "Product Strategy"],
    stack: ["TypeScript", "React Native", "Node.js", "PostgreSQL"],
    motto: "Ship it right, then ship it fast.",
    socials: [
      { label: "in", href: "https://www.linkedin.com/company/kyvolab" },
      { label: "✉", href: "mailto:officialolamide001@gmail.com" },
    ],
  },
  {
    slug: "igbalaye-femi",
    name: "Igbalaye Femi",
    role: "Engineering Lead",
    handle: "eng.lead",
    accent: "#2F8FFF",
    photo: femiPhoto,
    bio: "Runs day-to-day engineering — turning approved designs into production apps, keeping the codebase clean, and the release train on time.",
    focus: ["Mobile Engineering", "Code Quality", "Delivery"],
    stack: ["Flutter", "React", "APIs", "CI/CD"],
    motto: "Clean code is a feature.",
    socials: [
      { label: "in", href: "https://www.linkedin.com/company/kyvolab" },
      { label: "gh", href: "https://github.com" },
    ],
  },
  {
    slug: "babalola-kenny",
    name: "Babalola Kenny",
    role: "Legal & Compliance Lead",
    handle: "legal",
    accent: "#4ADE80",
    photo: kennyPhoto,
    bio: "Keeps KyvoLab and its clients on the right side of the rules — contracts, licensing questions, data protection and the regulatory groundwork every fintech needs before launch.",
    focus: ["Legal", "Regulatory Compliance", "Data Protection"],
    stack: ["Contracts", "CBN Guidelines", "NDPA", "AML/KYC Policy"],
    motto: "Compliance is part of the product.",
    socials: [
      { label: "in", href: "https://www.linkedin.com/company/kyvolab" },
      { label: "✉", href: "mailto:officialolamide001@gmail.com" },
    ],
  },
  {
    slug: "badmus-praise",
    name: "Badmus Praise",
    role: "HR & Social Media Manager",
    handle: "people.social",
    accent: "#A78BFA",
    photo: praisePhoto,
    bio: "Looks after the people who build KyvoLab and the community that follows it — hiring, culture, and the voice of the brand online.",
    focus: ["People & Culture", "Talent", "Brand Voice"],
    stack: ["Recruiting", "Content", "Community", "Analytics"],
    motto: "Great products start with great people.",
    socials: [
      { label: "ig", href: "https://www.instagram.com/kyvo_lab" },
      { label: "in", href: "https://www.linkedin.com/company/kyvolab" },
    ],
  },
  {
    slug: "ayomide-quam",
    name: "Ayomide Quam",
    role: "Cyber Security Lead",
    handle: "sec.lead",
    accent: "#F59E0B",
    photo: avatar("Ayomide Quam"),
    bio: "Keeps money and data safe — threat modelling, pen-testing, and hardening every wallet, API, and admin panel before it goes live.",
    focus: ["AppSec", "Pen-testing", "Compliance"],
    stack: ["OWASP", "Threat Modelling", "Encryption", "Audits"],
    motto: "Trust is the product.",
    socials: [
      { label: "in", href: "https://www.linkedin.com/company/kyvolab" },
      { label: "x", href: "https://x.com/kyvolab" },
    ],
  },
];

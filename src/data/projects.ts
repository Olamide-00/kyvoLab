import depayHome1 from "../assets/work/depay-home-1.jpg";
import depayHome2 from "../assets/work/depay-home-2.jpg";
import obayendoBefore from "../assets/work/obayendo-before.jpg";
import jaanHome from "../assets/work/jaan-home.jpg";
import jaanBalance from "../assets/work/jaan-balance.jpg";
import jaanQuickpay from "../assets/work/jaan-quickpay.jpg";

export type GalleryShot = {
  src: string;
  alt: string;
  label: string;
};

export type Highlight = {
  title: string;
  desc: string;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  accent: string;
  accentSoft: string;
  role: string[];
  year: string;
  status: "shipped" | "in-progress";
  cover: string;
  coverAlt: string;
  gallery: GalleryShot[];
  before?: { src: string; alt: string; label: string; note: string };
  highlights: Highlight[];
};

export const PROJECTS: Project[] = [
  {
    slug: "depay",
    name: "DePay",
    category: "Fintech · Bills & Payments",
    tagline: "Bills, reimagined.",
    description:
      "DePay is a Nigerian bills-and-payments app that started life as Obayendo — a template-built wallet with no real identity of its own. We took it apart and rebuilt the product from the interface up: a new name, a considered dark-moss visual system, and a home screen re-architected around the handful of things people actually open the app to do.",
    accent: "#86b34a",
    accentSoft: "rgba(134,179,74,.35)",
    role: ["Brand Identity", "Product Design", "Mobile UI Engineering"],
    year: "2026",
    status: "shipped",
    cover: depayHome1,
    coverAlt: "DePay home screen showing masked balance and quick access grid",
    gallery: [
      { src: depayHome1, alt: "DePay home — referral promo state", label: "Home — Refer & earn" },
      { src: depayHome2, alt: "DePay home — electricity promo state", label: "Home — Pay a bill" },
    ],
    before: {
      src: obayendoBefore,
      alt: "Obayendo, the original app before the DePay rebrand",
      label: "Before — Obayendo",
      note: "Stock template UI, generic blue palette, no distinct identity.",
    },
    highlights: [
      {
        title: "Balance privacy by default",
        desc: "The available balance is masked on load — a single tap on the eye icon reveals it. A small detail that signals the app was built by people thinking about how it's actually used in public.",
      },
      {
        title: "Five-tap access to everything that matters",
        desc: "Airtime, Data, Electricity, Cable TV, and a catch-all “More” drawer — sized and ordered by how often each one gets used, not how many features the app has.",
      },
      {
        title: "A promo rail that earns its place",
        desc: "Instead of a static banner, the rail rotates between a referral push and a same-second electricity payment prompt — both tied to real actions inside the app, not just marketing space.",
      },
      {
        title: "A rebrand with a reason",
        desc: "Obayendo's generic blue template became a dark moss-green surface with one confident accent — an identity built to read as trustworthy at a glance, on a screen showing someone's real money.",
      },
    ],
  },
  {
    slug: "jaan",
    name: "Jaan",
    category: "Fintech · Wallet & Rewards",
    tagline: "One wallet, every bill.",
    description:
      "Jaan is a rewards-driven payments app built around a simple idea: every bill you pay should earn something back. The interface pairs a cash balance with JTokens — a second, visible currency that lives right next to your real balance instead of buried in a separate rewards tab.",
    accent: "#7653F7",
    accentSoft: "rgba(118,83,247,.35)",
    role: ["Product Design", "Mobile UI Engineering", "Rewards UX"],
    year: "2026",
    status: "shipped",
    cover: jaanHome,
    coverAlt: "Jaan home screen showing wallet balance, JTokens, and quick access grid",
    gallery: [
      { src: jaanHome, alt: "Jaan full home screen", label: "Home — Full screen" },
      { src: jaanBalance, alt: "Jaan wallet balance and JTokens close-up", label: "Detail — Wallet & JTokens" },
      { src: jaanQuickpay, alt: "Jaan quick access grid and One Tap Pay close-up", label: "Detail — Quick access & One Tap Pay" },
    ],
    highlights: [
      {
        title: "Two balances, one glance",
        desc: "A violet wallet card and a gold JTokens strip sit stacked, not tabbed apart — so the reward you're earning is never more than a glance from the money you're spending.",
      },
      {
        title: "Eleven-tile quick access",
        desc: "From airtime and electricity to eSIM, gift cards, and international payments — the grid scales to a genuinely wide bill-payment catalogue without losing scan-ability.",
      },
      {
        title: "One Tap Pay for the brands people actually use",
        desc: "Netflix, Spotify, GOTv, Sporty Bet — rendered as recognizable one-tap icons instead of a biller search form, for the payments people repeat every month.",
      },
      {
        title: "Rewards that show their math",
        desc: "JTokens convert to spendable balance from the home screen itself, with a visible “Convert” action — the reward loop stays legible instead of disappearing into a T&Cs page.",
      },
    ],
  },
  {
    slug: "swiftpay",
    name: "SwiftPay",
    category: "Fintech · In Progress",
    tagline: "Case study in progress.",
    description:
      "SwiftPay is the next client build in the KyvoLab pipeline. This page is wired up and ready — screens, gallery, and highlights will land here as soon as they're in hand.",
    accent: "#7c8ca6",
    accentSoft: "rgba(124,140,166,.25)",
    role: ["Product Design", "Mobile UI Engineering"],
    year: "2026",
    status: "in-progress",
    cover: "",
    coverAlt: "",
    gallery: [],
    highlights: [],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

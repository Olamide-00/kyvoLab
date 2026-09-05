import depayHome1 from "../assets/work/depay-home-1.jpg";
import depayServices from "../assets/work/depay-services.jpg";
import depayProfile from "../assets/work/depay-profile.jpg";
import depayReferrals from "../assets/work/depay-referrals.jpg";
import jaanHome from "../assets/work/jaan-home.jpg";
import jaanBalance from "../assets/work/jaan-balance.jpg";
import jaanQuickpay from "../assets/work/jaan-quickpay.jpg";
import dekingsHero from "../assets/work/dekings-hero.jpg";
import dekingsServices from "../assets/work/dekings-services.jpg";
import dekingsCoverage from "../assets/work/dekings-coverage.jpg";
import dekingsKxRide from "../assets/work/dekings-kxride.jpg";
import dekingsRiderForm from "../assets/work/dekings-rider-form.jpg";
import psiOnboardingPrecision from "../assets/work/psi-onboarding-precision.jpg";
import psiOnboardingControl from "../assets/work/psi-onboarding-control.jpg";
import psiLogin from "../assets/work/psi-login.jpg";
import psiAdminReports from "../assets/work/psi-admin-reports.jpg";

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
  highlights: Highlight[];
  url?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "depay",
    name: "DePay",
    category: "Fintech · VTU & Bill Payments",
    tagline: "Fast, secure, all your bills in one place.",
    description:
      "DePay is a Nigerian VTU (Value Top-Up) app built for everyday bill payments — airtime, data, electricity, cable TV, and other utility bills, all from one wallet. Every user gets a dedicated account generated on signup, so funding is as simple as a bank transfer. Built fast, secure, and scalable from the ground up, with a considered dark-moss visual system and a home screen architected around the handful of things people actually open the app to do.",
    accent: "#86b34a",
    accentSoft: "rgba(134,179,74,.35)",
    role: ["Brand Identity", "Product Design", "Mobile UI Engineering"],
    year: "2026",
    status: "shipped",
    cover: depayHome1,
    coverAlt: "DePay home screen showing masked balance and quick access grid",
    gallery: [
      {
        src: depayHome1,
        alt: "DePay home screen with masked balance and quick access grid",
        label: "Home",
      },
      {
        src: depayServices,
        alt: "DePay services screen listing electricity, airtime, data, cable TV, and education billers",
        label: "Services — Full catalogue",
      },
      {
        src: depayProfile,
        alt: "DePay profile screen with account, security, and support settings",
        label: "Profile — Account & settings",
      },
      {
        src: depayReferrals,
        alt: "DePay referrals screen showing invite code and tiered reward progress",
        label: "Profile — Referrals",
      },
    ],
    highlights: [
      {
        title: "Balance privacy by default",
        desc: "The available balance is masked on load — a single tap on the eye icon reveals it. A small detail that signals the app was built by people thinking about how it's actually used in public.",
      },
      {
        title: "A dedicated account, generated instantly",
        desc: "Every user gets their own virtual bank account on signup — funding the wallet is as simple as a regular bank transfer, no separate 'add card' flow required.",
      },
      {
        title: "Five-tap access to everything that matters",
        desc: "Airtime, Data, Electricity, Cable TV, and a catch-all “More” drawer — sized and ordered by how often each one gets used, not how many features the app has.",
      },
      {
        title: "A promo rail that earns its place",
        desc: "Instead of a static banner, the rail rotates between a referral push and a same-second data payment prompt — both tied to real actions inside the app, not just marketing space.",
      },
      {
        title: "Referral rewards that show the next milestone",
        desc: "The referrals screen tracks progress toward tiered payouts — 1, 5, and 10 referrals — so the incentive to keep sharing stays visible instead of disappearing after the first invite.",
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
    coverAlt:
      "Jaan home screen showing wallet balance, JTokens, and quick access grid",
    gallery: [
      {
        src: jaanHome,
        alt: "Jaan full home screen",
        label: "Home — Full screen",
      },
      {
        src: jaanBalance,
        alt: "Jaan wallet balance and JTokens close-up",
        label: "Detail — Wallet & JTokens",
      },
      {
        src: jaanQuickpay,
        alt: "Jaan quick access grid and One Tap Pay close-up",
        label: "Detail — Quick access & One Tap Pay",
      },
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
    slug: "dekings",
    name: "De Kings",
    category: "Transport & Logistics · Web Platform",
    tagline: "Premium transport & logistics, on your terms.",
    description:
      "De Kings Transports & Logistics is a premium ride, delivery, and reservation service based in Ogun State, Nigeria. Ahead of a dedicated mobile app, we built the brand's marketing site to carry the full weight of the service line — KX Ride, driver requests, interstate bookings, and reservations — reserved directly through the site in one message, with a confident black-and-gold identity built to read premium from the very first screen.",
    accent: "#D9A94E",
    accentSoft: "rgba(217,169,78,.35)",
    role: ["Brand Identity", "Web Design", "Frontend Engineering"],
    year: "2026",
    status: "shipped",
    url: "https://www.dekingstransportation.com.ng",
    cover: dekingsHero,
    coverAlt:
      "De Kings homepage hero — Premium transport & logistics, on your terms",
    gallery: [
      {
        src: dekingsHero,
        alt: "De Kings homepage hero section",
        label: "Home — Hero",
      },
      {
        src: dekingsServices,
        alt: "De Kings four service offerings — KX Ride, Request a Driver, Book a Ride, Reservations",
        label: "Home — Services",
      },
      {
        src: dekingsCoverage,
        alt: "De Kings coverage area across Ogun State towns",
        label: "Home — Coverage",
      },
      {
        src: dekingsKxRide,
        alt: "De Kings KX Ride page for intercity bike rides",
        label: "KX Ride",
      },
      {
        src: dekingsRiderForm,
        alt: "De Kings rider and partner registration form",
        label: "KX Ride — Join as rider or partner",
      },
    ],
    highlights: [
      {
        title: "Four ways to move, reserved in seconds",
        desc: "KX Ride, Request a Driver, Book a Ride, and Reservations are laid out as four clear entry points — no app to download yet, every service reserved directly through the site in one message.",
      },
      {
        title: "Built for intercity, not just around town",
        desc: "The coverage section names the actual towns served — Abeokuta, Sagamu, Ijebu-Ode, Ota — grounding a premium brand promise in routes people actually recognize.",
      },
      {
        title: "KX Ride as its own product moment",
        desc: "Bike rides between towns get a dedicated page and identity within the brand, positioned as the fast, affordable option next to full car bookings and driver requests.",
      },
      {
        title: "One form, two audiences",
        desc: "A single toggle switches the registration form between 'Become a KX Rider' and 'Become a Partner' — recruiting riders and fleet partners without splitting into separate pages.",
      },
    ],
  },
  {
    slug: "psi",
    name: "PSI Logistics",
    category: "Logistics · Multi-Role Platform",
    tagline: "Move luggage with precision.",
    description:
      "PSI (PatLog) is a role-based logistics platform built for Patrick Street Import Ltd, coordinating package movement across three distinct apps in one system. Admins create drivers, run full CRUD on every package or luggage item, and assign it to the right hands; drivers work their assigned deliveries; customers track incoming packages and pull up their full delivery history. One backend, three purpose-built experiences.",
    accent: "#3D6FE0",
    accentSoft: "rgba(61,111,224,.35)",
    role: ["Product Design", "Mobile UI Engineering", "Role-Based Access"],
    year: "2026",
    status: "shipped",
    cover: psiAdminReports,
    coverAlt:
      "PSI Logistics admin reports screen showing driver performance leaderboard",
    gallery: [
      {
        src: psiOnboardingPrecision,
        alt: "PSI Logistics onboarding screen — Move luggages with Precision, 99.8% delivery accuracy",
        label: "Onboarding — Precision",
      },
      {
        src: psiOnboardingControl,
        alt: "PSI Logistics onboarding screen — Total Control of Every luggage, 10K+ items managed daily",
        label: "Onboarding — Control",
      },
      {
        src: psiLogin,
        alt: "PSI Logistics sign-in screen for Patrick Street Import Ltd",
        label: "Sign In",
      },
      {
        src: psiAdminReports,
        alt: "PSI Logistics admin dashboard with driver performance and package status",
        label: "Admin — Reports",
      },
    ],
    highlights: [
      {
        title: "Three roles, one system",
        desc: "Admin, driver, and customer each get an experience scoped to exactly what they need to do — full package CRUD and driver management for admins, assigned jobs for drivers, tracking and history for customers — all reading from the same backend.",
      },
      {
        title: "A driver leaderboard that makes performance visible",
        desc: "The admin Reports screen ranks drivers by packages delivered, with medal markers for the top three and a live progress bar per driver — turning raw completion counts into a glanceable performance view.",
      },
      {
        title: "Fleet status at the top, always",
        desc: "Drivers, Delivered, In Transit, and In Stock counts sit in a single stat bar above the fold — the admin's first read on the state of the whole operation before drilling into any one driver.",
      },
      {
        title: "Onboarding that states the numbers up front",
        desc: "Before login, the app leads with real performance metrics — 99.8% delivery accuracy, 10K+ items managed daily — setting the operational bar before the client ever sees a package list.",
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

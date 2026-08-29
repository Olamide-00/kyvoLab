import { Link } from "react-router-dom";
import AlgorithmCanvas from "../components/AlgorithmCanvas";
import Reveal from "../components/Reveal";
import MagCard from "../components/MagCard";

const SERVICES = [
  {
    icon: "◆",
    title: "Brand Identity & Rebrands",
    desc: "Naming, color systems, and visual identity for fintech products — including full rebrands of apps that have outgrown a generic template.",
    tags: ["Identity", "Rebrand", "Design Systems"],
  },
  {
    icon: "▣",
    title: "Product Design",
    desc: "Mobile-first UI/UX for wallets, bill payments, and rewards apps — designed around the handful of actions people actually open the app to do.",
    tags: ["UI/UX", "Wireframes", "Prototyping"],
  },
  {
    icon: "◈",
    title: "Mobile App Engineering",
    desc: "Production builds from Figma to a working, shippable app — clean component architecture that a real engineering team can maintain.",
    tags: ["React Native", "iOS", "Android"],
  },
  {
    icon: "◎",
    title: "Payments & Wallet UX",
    desc: "Balance cards, quick-access grids, transaction feeds, and bill-payment flows — the specific interface patterns fintech apps live or die by.",
    tags: ["Wallets", "Bills & Utilities", "Transactions"],
  },
  {
    icon: "⬡",
    title: "Design Systems",
    desc: "Reusable component libraries and style guides so your product stays visually consistent as new screens and features get added.",
    tags: ["Components", "Tokens", "Documentation"],
  },
  {
    icon: "◐",
    title: "Growth & Rewards Features",
    desc: "Referral flows, loyalty points, and promo systems designed to earn their place in the interface instead of shouting for attention.",
    tags: ["Referrals", "Rewards", "Retention"],
  },
];

const PROCESS = [
  { n: "01", t: "Discover", d: "We learn the product, the users, and what the interface is currently getting wrong." },
  { n: "02", t: "Design", d: "Wireframes to high-fidelity screens, reviewed in rounds until the system feels considered, not decorated." },
  { n: "03", t: "Build", d: "Engineering the approved designs into a real, production-ready mobile app." },
  { n: "04", t: "Ship", d: "QA, polish, and a handoff you can actually maintain — documented, not just delivered." },
];

export default function Services() {
  return (
    <>
      <section className="page-hero">
        <AlgorithmCanvas intensity="low" />
        <div className="hero-scrim" />
        <div className="page-hero-in">
          <Reveal>
            <div className="hero-eye">
              <div className="hero-dot" />
              <span style={{ fontFamily: "Fira Code, monospace" }}>services.list()</span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="page-h1">
              What we build,
              <br />
              <span className="tg">precisely.</span>
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="page-sub">
              Design and engineering under one roof — a studio built around fintech products
              specifically, not general-purpose app work.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="sec-in">
          <div className="svc-grid">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <MagCard cls="svc-card">
                  <div className="svc-icon">{s.icon}</div>
                  <div className="svc-title">{s.title}</div>
                  <div className="svc-desc">{s.desc}</div>
                  <div className="svc-tags">
                    {s.tags.map((t) => (
                      <span key={t} className="svc-tag">{t}</span>
                    ))}
                  </div>
                </MagCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec process-bg">
        <div className="sec-in">
          <Reveal><div className="eyebrow">how we work</div></Reveal>
          <Reveal delay={80}>
            <h2 className="sec-h2">
              Four stages.
              <br />
              <span className="tg">No guesswork.</span>
            </h2>
          </Reveal>
          <div className="process-grid">
            {PROCESS.map((p, i) => (
              <Reveal key={p.n} delay={i * 90}>
                <div className="process-card">
                  <div className="process-n">{p.n}</div>
                  <div className="process-t">{p.t}</div>
                  <div className="process-d">{p.d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-strip">
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <AlgorithmCanvas intensity="low" />
        </div>
        <div className="cta-strip-in">
          <Reveal>
            <h2 className="cta-strip-h">
              Ready to see it
              <br />
              <span className="tg">on real screens?</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <Link to="/work" className="btn-p" style={{ marginTop: 28 }}>
              View our work →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

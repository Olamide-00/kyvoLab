import { Link } from "react-router-dom";
import { useState } from "react";
import AlgorithmCanvas from "../components/AlgorithmCanvas";
import Reveal from "../components/Reveal";
import MagCard from "../components/MagCard";
import SEO from "../components/SEO";

const ORBIT_ITEMS = [
  { icon: "▣", label: "Mobile" },
  { icon: "◧", label: "Web" },
  { icon: "◆", label: "Wallets" },
  { icon: "◈", label: "VTU" },
  { icon: "⬢", label: "Neobank" },
  { icon: "◎", label: "Loans" },
  { icon: "⬡", label: "Invest" },
  { icon: "◐", label: "Crypto" },
];

const CORE = [
  {
    icon: "▣",
    title: "Mobile App Development",
    desc: "Native and cross-platform apps for iOS and Android — built to actually ship, not just prototype.",
    tags: ["iOS", "Android", "React Native / Flutter"],
  },
  {
    icon: "◧",
    title: "Website Development",
    desc: "Marketing sites, dashboards, and web apps that hold up next to your mobile product, not an afterthought.",
    tags: ["Web Apps", "Dashboards", "Marketing Sites"],
  },
  {
    icon: "◆",
    title: "Custom Software Development",
    desc: "Bespoke systems for workflows off-the-shelf tools can't handle — internal tools, admin panels, integrations.",
    tags: ["Internal Tools", "Integrations", "APIs"],
  },
];

const FINTECH = [
  {
    icon: "▣",
    title: "Wallet Apps",
    desc: "Balance cards, transfers, and transaction feeds — the core loop every wallet app lives or dies by.",
    tags: ["Wallets", "Transfers", "Transactions"],
  },
  {
    icon: "◈",
    title: "VTU & Bills Platforms",
    desc: "Airtime, data, electricity, and cable subscriptions — one-tap bill payment experiences.",
    tags: ["VTU", "Airtime & Data", "Utilities"],
  },
  {
    icon: "⬢",
    title: "Neobank & MFB Apps",
    desc: "Digital banking interfaces for microfinance banks and neobanks — accounts, cards, and statements people trust.",
    tags: ["Digital Banking", "Accounts", "Cards"],
  },
  {
    icon: "◎",
    title: "Loan & Credit Apps",
    desc: "Application flows, repayment schedules, and credit dashboards designed to feel transparent, not predatory.",
    tags: ["Lending", "Repayments", "Credit Scoring"],
  },
  {
    icon: "⬡",
    title: "Investment & Wealth Apps",
    desc: "Portfolio dashboards, market data, and trade flows built for clarity under real market pressure.",
    tags: ["Portfolios", "Market Data", "Trading UX"],
  },
  {
    icon: "◐",
    title: "Crypto & Web3 Apps",
    desc: "Wallets, swaps, and on-chain activity made legible for people who aren't reading a block explorer.",
    tags: ["Wallets", "Swaps", "On-chain"],
  },
];

const PROCESS = [
  {
    n: "01",
    t: "Discover",
    d: "We learn the product, the users, and what the interface is currently getting wrong.",
  },
  {
    n: "02",
    t: "Design",
    d: "Wireframes to high-fidelity screens, reviewed in rounds until the system feels considered, not decorated.",
  },
  {
    n: "03",
    t: "Build",
    d: "Engineering the approved designs into a real, production-ready mobile app.",
  },
  {
    n: "04",
    t: "Ship",
    d: "QA, polish, and a handoff you can actually maintain — documented, not just delivered.",
  },
];

export default function Services() {
  const [openFlips, setOpenFlips] = useState<number[]>([]);
  const toggleFlip = (i: number) =>
    setOpenFlips((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i],
    );

  return (
    <>
      <SEO
        title="Fintech Software Development Services | KyvoLab"
        description="KyvoLab builds fintech apps, payment platforms, VTU solutions and custom software for businesses."
        path="/services"
      />
      <style>{`
        @keyframes orbitSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbitSpinRev { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes corePulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(0,217,180,.35); } 50% { box-shadow: 0 0 0 14px rgba(0,217,180,0); } }
        .orbit-reveal-wrap { position: relative; z-index: 3; }
        .orbit-section { display: flex; justify-content: center; padding: 10px 0 26px; position: relative; z-index: 3; }
        .orbit-wrap { position: relative; width: 420px; height: 420px; flex-shrink: 0; }
        .orbit-core {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 84px; height: 84px; border-radius: 50%;
          background: linear-gradient(135deg, #00d9b4, #2f8fff);
          display: flex; align-items: center; justify-content: center;
          font-family: "Space Grotesk", sans-serif; font-weight: 700; font-size: 15px; color: #06121a;
          z-index: 3; animation: corePulse 3s ease-in-out infinite;
        }
        .orbit-ring { position: absolute; inset: 0; animation: orbitSpin 44s linear infinite; }
        .orbit-ring.r2 { inset: 46px; animation-duration: 34s; animation-direction: reverse; }
        .orbit-node { position: absolute; top: 50%; left: 50%; width: 0; height: 0; }
        .orbit-node-spin {
          position: absolute; top: 0; left: 0; width: 0; height: 0;
          animation: orbitSpinRev 44s linear infinite;
        }
        .orbit-ring.r2 .orbit-node-spin { animation: orbitSpin 34s linear infinite; }
        .orbit-node-inner {
          position: absolute; top: 0; left: 0;
          display: flex; flex-direction: column; align-items: center; gap: 5px;
        }
        .orbit-node-chip {
          width: 46px; height: 46px; border-radius: 13px; background: #0b0f1a;
          border: 1px solid rgba(0,217,180,.25); display: flex; align-items: center; justify-content: center;
          font-size: 18px; color: #00d9b4; box-shadow: 0 8px 22px rgba(8,15,30,.18);
        }
        .orbit-node-label { font-family: "Fira Code", monospace; font-size: 9.5px; color: #4a6a80; letter-spacing: .5px; white-space: nowrap; }
        .orbit-line { position: absolute; inset: 0; border-radius: 50%; border: 1px dashed rgba(0,217,180,.16); }
        .orbit-line.l2 { inset: 46px; border-color: rgba(47,143,255,.16); }
        @media (max-width: 640px) { .orbit-wrap { transform: scale(0.62); margin: -70px 0; } }

        .flip-card { perspective: 1200px; height: 232px; cursor: pointer; }
        .flip-inner {
          position: relative; width: 100%; height: 100%; transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(.4,.2,.2,1);
        }
        .flip-card:hover .flip-inner, .flip-card.flipped .flip-inner { transform: rotateY(180deg); }
        .flip-face {
          position: absolute; inset: 0; backface-visibility: hidden; border-radius: 20px;
          padding: 28px; display: flex; flex-direction: column;
        }
        .flip-front {
          background: rgba(255,255,255,.85); border: 1px solid rgba(8,15,30,.06);
          box-shadow: 0 2px 20px rgba(8,15,30,.04); justify-content: space-between;
        }
        .flip-back {
          background: #0b0f1a; color: #fff; transform: rotateY(180deg); justify-content: center;
          border: 1px solid rgba(0,217,180,.18);
        }
        .flip-hint { font-family: "Fira Code", monospace; font-size: 10px; color: #7c8ca6; letter-spacing: .5px; }
        .flip-back-desc { font-size: 13px; color: #b8c4d6; line-height: 1.65; margin-bottom: 14px; }

        .pipe-wrap { position: relative; height: 3px; background: rgba(0,217,180,.14); border-radius: 3px; margin: 50px 0 44px; }
        .pipe-glow {
          position: absolute; top: 50%; width: 110px; height: 3px; transform: translateY(-50%);
          border-radius: 3px; background: linear-gradient(90deg, transparent, #00d9b4, #2f8fff, transparent);
          animation: pipeFlow 4.5s linear infinite;
        }
        @keyframes pipeFlow { 0% { left: -110px; } 100% { left: 100%; } }
        .pipe-node {
          position: absolute; top: 50%; width: 9px; height: 9px; border-radius: 50%;
          background: #00d9b4; transform: translate(-50%, -50%); box-shadow: 0 0 0 4px rgba(0,217,180,.15);
        }
      `}</style>

      <section className="page-hero">
        <AlgorithmCanvas intensity="low" />
        <div className="hero-scrim" />
        <div className="page-hero-in">
          <Reveal>
            <div className="hero-eye">
              <div className="hero-dot" />
              <span style={{ fontFamily: "Fira Code, monospace" }}>
                services.list()
              </span>
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
              Mobile apps, websites, and custom software with a specific focus
              on fintech products: wallets, VTU, neobanks, MFBs, loan apps,
              investment platforms, and crypto.
            </p>
          </Reveal>

          <Reveal delay={220} className="orbit-reveal-wrap">
            <div className="orbit-section">
              <div className="orbit-wrap">
                <div className="orbit-line" />
                <div className="orbit-line l2" />
                <div className="orbit-core">KyvoLab</div>
                <div className="orbit-ring">
                  {ORBIT_ITEMS.slice(0, 5).map((it, i) => {
                    const angle = (360 / 5) * i;
                    return (
                      <div
                        className="orbit-node"
                        key={it.label}
                        style={{
                          transform: `rotate(${angle}deg) translateX(190px)`,
                        }}
                      >
                        <div className="orbit-node-spin">
                          <div
                            className="orbit-node-inner"
                            style={{
                              transform: `translate(-50%, -50%) rotate(${-angle}deg)`,
                            }}
                          >
                            <div className="orbit-node-chip">{it.icon}</div>
                            <div className="orbit-node-label">{it.label}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="orbit-ring r2">
                  {ORBIT_ITEMS.slice(5).map((it, i) => {
                    const angle = (360 / 3) * i + 40;
                    return (
                      <div
                        className="orbit-node"
                        key={it.label}
                        style={{
                          transform: `rotate(${angle}deg) translateX(140px)`,
                        }}
                      >
                        <div className="orbit-node-spin">
                          <div
                            className="orbit-node-inner"
                            style={{
                              transform: `translate(-50%, -50%) rotate(${-angle}deg)`,
                            }}
                          >
                            <div className="orbit-node-chip">{it.icon}</div>
                            <div className="orbit-node-label">{it.label}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CORE CAPABILITIES ── */}
      <section className="sec" style={{ paddingTop: 60 }}>
        <div className="sec-in">
          <Reveal>
            <div className="eyebrow">core capabilities</div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="sec-h2">
              The foundation:
              <br />
              <span className="tg">apps, web, software.</span>
            </h2>
          </Reveal>

          <div className="svc-grid" style={{ marginTop: 40 }}>
            {CORE.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <MagCard cls="svc-card">
                  <div className="svc-icon">{s.icon}</div>
                  <div className="svc-title">{s.title}</div>
                  <div className="svc-desc">{s.desc}</div>
                  <div className="svc-tags">
                    {s.tags.map((t) => (
                      <span key={t} className="svc-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </MagCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINTECH SPECIALTIES (flip cards) ── */}
      <section className="sec svc-tease-bg">
        <div className="sec-in">
          <Reveal>
            <div className="eyebrow">fintech specialties</div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="sec-h2">
              Where we spend
              <br />
              <span className="tg">most of our time.</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="sec-sub" style={{ marginBottom: 20 }}>
              Tap or hover a card to see what's inside.
            </p>
          </Reveal>

          <div className="svc-grid" style={{ marginTop: 24 }}>
            {FINTECH.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <div
                  className={`flip-card ${openFlips.includes(i) ? "flipped" : ""}`}
                  onClick={() => toggleFlip(i)}
                >
                  <div className="flip-inner">
                    <div className="flip-face flip-front">
                      <div>
                        <div className="svc-icon">{s.icon}</div>
                        <div className="svc-title">{s.title}</div>
                      </div>
                      <div className="flip-hint">// tap for details</div>
                    </div>
                    <div className="flip-face flip-back">
                      <div className="svc-title" style={{ color: "#fff" }}>
                        {s.title}
                      </div>
                      <div className="flip-back-desc" style={{ marginTop: 8 }}>
                        {s.desc}
                      </div>
                      <div className="svc-tags">
                        {s.tags.map((t) => (
                          <span
                            key={t}
                            className="svc-tag"
                            style={{
                              background: "rgba(255,255,255,.08)",
                              color: "#a8b6cc",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="sec process-bg">
        <div className="sec-in">
          <Reveal>
            <div className="eyebrow">how we work</div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="sec-h2">
              Four stages.
              <br />
              <span className="tg">No guesswork.</span>
            </h2>
          </Reveal>

          <div className="pipe-wrap">
            <div className="pipe-glow" />
            {PROCESS.map((_, i) => (
              <div
                key={i}
                className="pipe-node"
                style={{ left: `${(i / (PROCESS.length - 1)) * 100}%` }}
              />
            ))}
          </div>

          <div className="process-grid" style={{ marginTop: 0 }}>
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

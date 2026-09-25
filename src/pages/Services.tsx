import { Link } from "react-router-dom";
import { useEffect, useRef, useState, type ReactNode } from "react";
import AlgorithmCanvas from "../components/AlgorithmCanvas";
import Reveal from "../components/Reveal";
import MagCard from "../components/MagCard";
import SEO from "../components/SEO";
import Typed from "../components/Typed";
import ServicesSchema from "../components/ServicesSchema";
import SpecScreen, { type SpecKind } from "../components/SpecScreen";
import "../styles/services.css";

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

type MockKind = "mobile" | "web" | "api";

const CORE: {
  icon: string;
  title: string;
  desc: string;
  tags: string[];
  mock: MockKind;
}[] = [
  {
    icon: "▣",
    title: "Mobile App Development",
    desc: "Native and cross-platform apps for iOS and Android — built to actually ship, not just prototype.",
    tags: ["iOS", "Android", "React Native / Flutter"],
    mock: "mobile",
  },
  {
    icon: "◧",
    title: "Website Development",
    desc: "Marketing sites, dashboards, and web apps that hold up next to your mobile product, not an afterthought.",
    tags: ["Web Apps", "Dashboards", "Marketing Sites"],
    mock: "web",
  },
  {
    icon: "◆",
    title: "Custom Software Development",
    desc: "Bespoke systems for workflows off-the-shelf tools can't handle — internal tools, admin panels, integrations.",
    tags: ["Internal Tools", "Integrations", "APIs"],
    mock: "api",
  },
];

const FINTECH: {
  icon: string;
  title: string;
  desc: string;
  tags: string[];
  kind: SpecKind;
  accent: string;
}[] = [
  {
    icon: "▣",
    title: "Wallet Apps",
    desc: "Balance cards, transfers, and transaction feeds — the core loop every wallet app lives or dies by.",
    tags: ["Wallets", "Transfers", "Transactions"],
    kind: "wallet",
    accent: "#00D9B4",
  },
  {
    icon: "◈",
    title: "VTU & Bills Platforms",
    desc: "Airtime, data, electricity, and cable subscriptions — one-tap bill payment experiences.",
    tags: ["VTU", "Airtime & Data", "Utilities"],
    kind: "vtu",
    accent: "#F59E0B",
  },
  {
    icon: "⬢",
    title: "Neobank & MFB Apps",
    desc: "Digital banking interfaces for microfinance banks and neobanks — accounts, cards, and statements people trust.",
    tags: ["Digital Banking", "Accounts", "Cards"],
    kind: "bank",
    accent: "#2F8FFF",
  },
  {
    icon: "◎",
    title: "Loan & Credit Apps",
    desc: "Application flows, repayment schedules, and credit dashboards designed to feel transparent, not predatory.",
    tags: ["Lending", "Repayments", "Credit Scoring"],
    kind: "loan",
    accent: "#A78BFA",
  },
  {
    icon: "⬡",
    title: "Investment & Wealth Apps",
    desc: "Portfolio dashboards, market data, and trade flows built for clarity under real market pressure.",
    tags: ["Portfolios", "Market Data", "Trading UX"],
    kind: "invest",
    accent: "#4ADE80",
  },
  {
    icon: "◐",
    title: "Crypto & Web3 Apps",
    desc: "Wallets, swaps, and on-chain activity made legible for people who aren't reading a block explorer.",
    tags: ["Wallets", "Swaps", "On-chain"],
    kind: "crypto",
    accent: "#F472B6",
  },
];

const DEFAULTS = [
  {
    icon: "⛨",
    t: "Security baked in",
    d: "Encryption, PIN & biometric auth, rate limits and audit trails from day one.",
  },
  {
    icon: "◉",
    t: "KYC ready",
    d: "BVN, NIN and document verification flows wired into onboarding.",
  },
  {
    icon: "⇄",
    t: "Payment rails",
    d: "Gateways, virtual accounts and transfers integrated and reconciled.",
  },
  {
    icon: "▤",
    t: "Admin dashboard",
    d: "Users, transactions, disputes and reports — so ops never touch the database.",
  },
  {
    icon: "◷",
    t: "Analytics & events",
    d: "Funnels and product events instrumented so you know what's working.",
  },
  {
    icon: "✦",
    t: "Design system",
    d: "A reusable component library, so screen #50 looks as sharp as screen #1.",
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

const FAQS = [
  {
    q: "How long does it take to build a fintech app?",
    a: "It depends on scope. After a short discovery phase we give you a fixed timeline and milestone plan, so you know exactly when designs, builds and launch will land.",
  },
  {
    q: "Can you integrate Paystack, Flutterwave or other payment providers?",
    a: "Yes. We integrate payment gateways, virtual accounts, bank transfers and bill-payment APIs, and build the reconciliation and admin tooling around them.",
  },
  {
    q: "Do you handle KYC like BVN and NIN verification?",
    a: "Yes. We design and build onboarding flows with BVN, NIN and document verification through your chosen KYC provider.",
  },
  {
    q: "Can you redesign or rebuild an existing app?",
    a: "Absolutely. Many of our projects are full rebrands or redesigns — we audit what exists, keep what works, and rebuild what doesn't.",
  },
  {
    q: "Do you work with clients outside Nigeria?",
    a: "Yes. We're based in Nigeria and work with startups and financial businesses across Africa.",
  },
  {
    q: "What happens after launch?",
    a: "You get documented code and a clean handoff. We also offer ongoing maintenance and feature work if you want us to stay on.",
  },
];

function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

/* ── core capability mockups ── */
function CoreMock({ kind }: { kind: MockKind }) {
  if (kind === "mobile") {
    return (
      <div className="sv-mock sv-mock-mobile">
        <div className="sv-mm-rings" />
        <div className="sv-mm-chip c1">
          <b>✓</b> Face ID
        </div>
        <div className="sv-mm-chip c2">
          <b>iOS</b> + Android
        </div>
        <div className="sv-mm-chip c3">
          <b>60</b> fps
        </div>
        <div className="sv-mm-phone">
          <div className="sv-mm-notch" />
          <div className="sv-mm-bal">
            <span>Balance</span>
            <b>₦248,500</b>
          </div>
          <div className="sv-mm-actions">
            <i /> <i /> <i /> <i />
          </div>
          <div className="sv-mm-row" />
          <div className="sv-mm-row" />
          <div className="sv-mm-row short" />
          <div className="sv-mm-row" />
          <div className="sv-mm-row short" />
        </div>
        <div className="sv-mm-toast">
          <span className="sv-mm-toast-dot">↓</span> ₦25,000 received
        </div>
      </div>
    );
  }
  if (kind === "web") {
    return (
      <div className="sv-mock sv-mock-web">
        <div className="sv-mw-bar">
          <i /> <i /> <i />
          <span>app.yourproduct.com</span>
        </div>
        <div className="sv-mw-body">
          <div className="sv-mw-side">
            <i className="on" /> <i /> <i /> <i />
          </div>
          <div className="sv-mw-main">
            <div className="sv-mw-kpis">
              <div />
              <div />
              <div />
            </div>
            <div className="sv-mw-chart">
              {[40, 65, 50, 80, 58, 92, 74].map((h, i) => (
                <span
                  key={i}
                  style={{
                    ["--h" as string]: `${h}%`,
                    animationDelay: `${i * 0.12}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="sv-mock sv-mock-api">
      <svg viewBox="0 0 300 150" className="sv-ma-svg" aria-hidden>
        <path d="M60 40 C 120 40, 120 75, 150 75" />
        <path d="M60 110 C 120 110, 120 75, 150 75" />
        <path d="M150 75 C 180 75, 180 40, 240 40" />
        <path d="M150 75 C 180 75, 180 110, 240 110" />
      </svg>
      <span className="sv-ma-node" style={{ left: "20%", top: "26.6%" }}>
        app
      </span>
      <span className="sv-ma-node" style={{ left: "20%", top: "73.3%" }}>
        admin
      </span>
      <span className="sv-ma-node core" style={{ left: "50%", top: "50%" }}>
        api
      </span>
      <span className="sv-ma-node" style={{ left: "80%", top: "26.6%" }}>
        ledger
      </span>
      <span className="sv-ma-node" style={{ left: "80%", top: "73.3%" }}>
        kyc
      </span>
    </div>
  );
}

function Card({ children, accent }: { children: ReactNode; accent?: string }) {
  return (
    <div
      className="sv-shell"
      style={accent ? { ["--accent" as string]: accent } : undefined}
    >
      <MagCard cls="sv-card">
        <div className="sv-card-spot" />
        {children}
      </MagCard>
    </div>
  );
}

export default function Services() {
  const [active, setActive] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [explorerRef, explorerInView] = useInView<HTMLDivElement>(0.35);
  const [procRef, procInView] = useInView<HTMLDivElement>(0.4);
  const spec = FINTECH[active];

  return (
    <>
      <SEO
        title="Fintech Software Development Services | KyvoLab"
        description="KyvoLab builds fintech apps, digital wallets, VTU & bill payment platforms, neobank, loan, investment and crypto apps, plus mobile, web and custom software for businesses in Nigeria and Africa."
        path="/services"
      />
      <ServicesSchema services={[...CORE, ...FINTECH]} faqs={FAQS} />

      {/* ── HERO ── */}
      <section className="page-hero sv-hero">
        <AlgorithmCanvas intensity="low" />
        <div className="hero-scrim" />
        <div className="sv-hero-in">
          <div>
            <Reveal>
              <div className="hero-eye">
                <div className="hero-dot" />
                <span>services.list()</span>
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
            <Reveal delay={220}>
              <div className="sv-cmd">
                <span className="tc-teal">›</span> kyvo.build(
                <span className="sv-cmd-str">
                  "
                  <Typed
                    strings={[
                      "wallet app",
                      "vtu platform",
                      "neobank",
                      "loan app",
                      "crypto exchange",
                      "admin dashboard",
                    ]}
                  />
                  "
                </span>
                )
              </div>
            </Reveal>
            <Reveal delay={280}>
              <div className="sv-hero-btns">
                <Link to="/contact" className="btn-p">
                  Start a project →
                </Link>
                <a href="#specialties" className="btn-s">
                  Explore specialties
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={220} className="orbit-reveal-wrap">
            <div className="orbit-section">
              <div className="orbit-wrap">
                <div className="orbit-glow" />
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

      {/* ── CORE CAPABILITIES (bento) ── */}
      <section className="sec sv-dark">
        <div className="sv-aurora" />
        <div className="sec-in">
          <Reveal>
            <div className="eyebrow">core capabilities</div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="sec-h2" style={{ color: "#fff" }}>
              The foundation:
              <br />
              <span className="tg">apps, web, software.</span>
            </h2>
          </Reveal>

          <div className="sv-bento">
            {CORE.map((s, i) => (
              <Reveal key={s.title} delay={i * 110} className={`sv-bento-${i}`}>
                <Card>
                  <CoreMock kind={s.mock} />
                  <div className="sv-card-body">
                    <div className="sv-card-idx">0{i + 1}</div>
                    <h3 className="sv-card-title">{s.title}</h3>
                    <p className="sv-card-desc">{s.desc}</p>
                    <div className="ptags">
                      {s.tags.map((t) => (
                        <span key={t} className="ptag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINTECH SPECIALTIES (explorer) ── */}
      <section className="sec svc-tease-bg" id="specialties">
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
            <p className="sec-sub">
              Pick a product type to preview what we build — or sit back and
              watch them cycle.
            </p>
          </Reveal>

          <div
            ref={explorerRef}
            className={`sv-explorer ${explorerInView ? "run" : ""}`}
            style={{ ["--accent" as string]: spec.accent }}
          >
            <div
              className="sv-ex-list"
              role="tablist"
              aria-label="Fintech specialties"
            >
              {FINTECH.map((f, i) => (
                <button
                  key={f.title}
                  role="tab"
                  aria-selected={i === active}
                  className={`sv-ex-item ${i === active ? "on" : ""}`}
                  style={{ ["--accent" as string]: f.accent }}
                  onClick={() => setActive(i)}
                >
                  <span className="sv-ex-icon">{f.icon}</span>
                  <span className="sv-ex-text">
                    <b>{f.title}</b>
                    <span>{f.tags.join(" · ")}</span>
                  </span>
                  {i === active && (
                    <span
                      key={`p-${active}`}
                      className="sv-ex-progress"
                      onAnimationEnd={() =>
                        setActive((a) => (a + 1) % FINTECH.length)
                      }
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="sv-ex-stage">
              <div className="sv-ex-glow" />
              <div className="sv-ex-phone" key={spec.kind}>
                <div className="sv-ex-notch" />
                <SpecScreen kind={spec.kind} />
              </div>
              <div className="sv-ex-info" key={`i-${spec.kind}`}>
                <div className="sv-ex-info-icon">{spec.icon}</div>
                <h3>{spec.title}</h3>
                <p>{spec.desc}</p>
                <div className="svc-tags">
                  {spec.tags.map((t) => (
                    <span key={t} className="svc-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  to="/contact"
                  className="link-arrow"
                  style={{ marginTop: 20 }}
                >
                  Build one with us <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SHIPPED BY DEFAULT ── */}
      <section className="sec sv-defaults-bg">
        <div className="sec-in">
          <div className="sv-defaults-head">
            <div>
              <Reveal>
                <div className="eyebrow">included by default</div>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="sec-h2">
                  Every build ships
                  <br />
                  <span className="tg">production-grade.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <p className="sec-sub">
                Fintech is unforgiving. These aren't upsells — they're the
                baseline for anything that moves money.
              </p>
            </Reveal>
          </div>

          <div className="sv-defaults">
            {DEFAULTS.map((d, i) => (
              <Reveal key={d.t} delay={i * 70}>
                <div className="sv-def">
                  <div className="sv-def-icon">{d.icon}</div>
                  <div>
                    <div className="sv-def-t">
                      {d.t} <span className="sv-def-check">✓</span>
                    </div>
                    <div className="sv-def-d">{d.d}</div>
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

          <div ref={procRef} className={`sv-proc ${procInView ? "run" : ""}`}>
            <div className="sv-pipe">
              <div className="sv-pipe-fill" />
              <div className="sv-pipe-glow" />
              {PROCESS.map((_, i) => (
                <div
                  key={i}
                  className="sv-pipe-node"
                  style={{
                    left: `${(i / (PROCESS.length - 1)) * 100}%`,
                    ["--i" as string]: i,
                  }}
                />
              ))}
            </div>
            <div className="process-grid" style={{ marginTop: 0 }}>
              {PROCESS.map((p, i) => (
                <div
                  key={p.n}
                  className="process-card sv-proc-card"
                  style={{ ["--i" as string]: i }}
                >
                  <div className="sv-proc-n">{p.n}</div>
                  <div className="process-t">{p.t}</div>
                  <div className="process-d">{p.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="sec sv-faq-bg">
        <div className="sec-in sv-faq-grid">
          <div>
            <Reveal>
              <div className="eyebrow">faq</div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="sec-h2">
                Questions,
                <br />
                <span className="tg">answered.</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="sec-sub">
                Still curious?{" "}
                <Link to="/contact" className="sv-inline-link">
                  Talk to us
                </Link>{" "}
                — we reply fast.
              </p>
            </Reveal>
          </div>
          <div className="sv-faq">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <div className={`sv-faq-item ${openFaq === i ? "open" : ""}`}>
                  <button
                    className="sv-faq-q"
                    aria-expanded={openFaq === i}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{f.q}</span>
                    <i aria-hidden>+</i>
                  </button>
                  <div className="sv-faq-a">
                    <div>
                      <p>{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
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
            <div className="sv-cta-btns">
              <Link to="/work" className="btn-p sv-btn-glow">
                View our work →
              </Link>
              <Link to="/contact" className="btn-s sv-btn-ghost">
                Start a project
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

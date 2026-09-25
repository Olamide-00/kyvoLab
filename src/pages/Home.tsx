import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AlgorithmCanvas from "../components/AlgorithmCanvas";
import Reveal from "../components/Reveal";
import Typed from "../components/Typed";
import PhoneFrame from "../components/PhoneFrame";
import SEO from "../components/SEO";
import { PROJECTS } from "../data/projects";

import kyvolabLogo from "../assets/logos/kyvolab.jpeg";
import paystackLogo from "../assets/logos/paystack.png";
import flutterwaveLogo from "../assets/logos/flutterwave.jpeg";
import interswitchLogo from "../assets/logos/interswitch.jpeg";
import stripeLogo from "../assets/logos/stripe.png";
import nombaLogo from "../assets/logos/nomba.png";
import vtpassLogo from "../assets/logos/vtpass.jpeg";
import safeHavenLogo from "../assets/logos/safeheave.png";
import momoLogo from "../assets/logos/momo.jpeg";
import nibssLogo from "../assets/logos/nibss.jpeg";
import bvnLogo from "../assets/logos/bvn.jpeg";
import ninLogo from "../assets/logos/nin.jpeg";
import cbnLogo from "../assets/logos/cbn.png";
import OrganizationSchema from "../components/OrganizationSchema";
import SpecScreen, { type SpecKind } from "../components/SpecScreen";
import StackWall from "../components/StackWall";
import "../styles/home.css";

const GT = ({ c }: { c: string }) => <span className="tg">{c}</span>;

const SERVICE_TEASE: {
  icon: string;
  title: string;
  desc: string;
  tags: string[];
  kind: SpecKind;
  accent: string;
}[] = [
  {
    icon: "◆",
    title: "Neobank & MFB Apps",
    desc: "Digital banking interfaces for microfinance banks and neobanks — accounts, cards, and statements people actually trust.",
    tags: ["Accounts", "Cards", "Statements"],
    kind: "bank",
    accent: "#2F8FFF",
  },
  {
    icon: "▣",
    title: "Wallets & Payments",
    desc: "Balance cards, transfers, and transaction flows built around how people actually move money.",
    tags: ["Wallets", "Transfers", "Payouts"],
    kind: "wallet",
    accent: "#00D9B4",
  },
  {
    icon: "◈",
    title: "VTU & Bills Platforms",
    desc: "Airtime, data, electricity, and cable subscriptions — one-tap bill payment experiences.",
    tags: ["Airtime & Data", "Electricity", "Cable TV"],
    kind: "vtu",
    accent: "#F59E0B",
  },
];

const HERO_RAILS = ["Paystack", "Flutterwave", "Interswitch", "NIBSS", "Stripe"];

const BUILD_STEPS = [
  {
    key: "discover",
    title: "Discover",
    hash: "a3f9c2d",
    cmd: 'git commit -m "map money flow & auth rules"',
    resultLines: ["✓ discovery.md synced to team"],
  },
  {
    key: "design",
    title: "Design",
    hash: "e71b40a",
    cmd: 'git commit -m "design pending/declined/reversed states"',
    resultLines: ["✓ 42 Figma frames handed off"],
  },
  {
    key: "build",
    title: "Build",
    hash: "9c02f3e",
    cmd: "npm run build -- --target=production",
    isBuild: true,
    resultLines: ["✓ build passed · 0 errors · 128 tests"],
  },
  {
    key: "ship",
    title: "Ship",
    hash: "4d18b6f",
    cmd: "kyvolab deploy --env=production",
    resultLines: ["✓ deployed → api.kyvolab.dev"],
  },
];

type DevLine = { id: string; kind: "cmd" | "out"; text: string };

function DevBuildConsole() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [lines, setLines] = useState<DevLine[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [phase, setPhase] = useState<"idle" | "building" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const runIdRef = useRef(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      const all: DevLine[] = [];
      BUILD_STEPS.forEach((s) => {
        all.push({ id: `${s.key}-cmd`, kind: "cmd", text: s.cmd });
        s.resultLines.forEach((r, ri) =>
          all.push({ id: `${s.key}-out-${ri}`, kind: "out", text: r }),
        );
      });

      const timeoutId = window.setTimeout(() => {
        setLines(all);
        setCompletedCount(BUILD_STEPS.length);
        setPhase("done");
      }, 0);

      return () => window.clearTimeout(timeoutId);
    }

    runIdRef.current += 1;
    const myRun = runIdRef.current;

    const typeLine = (
      full: string,
      kind: "cmd" | "out",
      onDone: () => void,
    ) => {
      const id = Math.random().toString(36).slice(2);
      setLines((ls) => [...ls, { id, kind, text: "" }]);
      let ci = 0;
      const tick = () => {
        if (runIdRef.current !== myRun) return;
        ci += 1;
        setLines((ls) =>
          ls.map((l) => (l.id === id ? { ...l, text: full.slice(0, ci) } : l)),
        );
        if (ci < full.length) {
          window.setTimeout(tick, 24);
        } else {
          onDone();
        }
      };
      window.setTimeout(tick, 24);
    };

    const revealResults = (
      results: string[],
      idx: number,
      onDone: () => void,
    ) => {
      if (runIdRef.current !== myRun) return;
      if (idx >= results.length) {
        onDone();
        return;
      }
      setLines((ls) => [
        ...ls,
        {
          id: Math.random().toString(36).slice(2),
          kind: "out",
          text: results[idx],
        },
      ]);
      window.setTimeout(() => revealResults(results, idx + 1, onDone), 220);
    };

    const runProgress = (onDone: () => void) => {
      setPhase("building");
      setProgress(0);
      const dur = 1100;
      const startTime = performance.now();
      const frame = (now: number) => {
        if (runIdRef.current !== myRun) return;
        const t = Math.min(1, (now - startTime) / dur);
        setProgress(Math.round(t * 100));
        if (t < 1) {
          window.requestAnimationFrame(frame);
        } else {
          window.setTimeout(() => {
            setPhase("idle");
            onDone();
          }, 200);
        }
      };
      window.requestAnimationFrame(frame);
    };

    const runStep = (i: number) => {
      if (runIdRef.current !== myRun) return;
      if (i >= BUILD_STEPS.length) {
        setPhase("done");
        window.setTimeout(() => {
          if (runIdRef.current !== myRun) return;
          setLines([]);
          setCurrentStepIndex(-1);
          setCompletedCount(0);
          setPhase("idle");
          runStep(0);
        }, 2600);
        return;
      }
      const step = BUILD_STEPS[i];
      setCurrentStepIndex(i);
      typeLine(step.cmd, "cmd", () => {
        window.setTimeout(() => {
          if (runIdRef.current !== myRun) return;
          if (step.isBuild) {
            runProgress(() => {
              revealResults(step.resultLines, 0, () => {
                setCompletedCount(i + 1);
                window.setTimeout(() => runStep(i + 1), 550);
              });
            });
          } else {
            revealResults(step.resultLines, 0, () => {
              setCompletedCount(i + 1);
              window.setTimeout(() => runStep(i + 1), 550);
            });
          }
        }, 260);
      });
    };

    const runOnce = () => {
      setLines([]);
      setCurrentStepIndex(-1);
      setCompletedCount(0);
      runStep(0);
    };

    const resetTimer = window.setTimeout(runOnce, 0);

    return () => {
      window.clearTimeout(resetTimer);
      runIdRef.current += 1;
    };
  }, [inView]);

  return (
    <div ref={wrapRef} className="dev-console-grid">
      <div className="terminal dev-terminal">
        <div className="term-bar">
          <div className="term-dot" style={{ background: "#FF5F57" }} />
          <div className="term-dot" style={{ background: "#FEBC2E" }} />
          <div className="term-dot" style={{ background: "#28C840" }} />
          <span className="term-title">kyvolab — build.log</span>
        </div>
        <div className="term-body dev-term-body">
          {lines.map((l) =>
            l.kind === "cmd" ? (
              <div key={l.id}>
                <span className="tc-dim">$ </span>
                <span className="tc-teal">{l.text}</span>
              </div>
            ) : (
              <div key={l.id} className="tc-dim">
                {l.text}
              </div>
            ),
          )}
          {phase === "building" && (
            <div className="dev-progress-row">
              <div className="dev-progress-track">
                <div
                  className="dev-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="tc-dim dev-progress-pct">{progress}%</span>
            </div>
          )}
          <div className="dev-cursor-line">
            <span className="tc-teal">▍</span>
          </div>
        </div>
      </div>

      <div className="dev-graph">
        {BUILD_STEPS.map((s, i) => (
          <div
            key={s.key}
            className={`dev-graph-node${
              completedCount > i
                ? " is-done"
                : currentStepIndex === i
                  ? " is-active"
                  : ""
            }`}
          >
            <div className="dev-graph-rail">
              <span className="dev-graph-dot" />
              {i < BUILD_STEPS.length - 1 && (
                <span className="dev-graph-line" />
              )}
            </div>
            <div className="dev-graph-info">
              <div className="dev-graph-hash">{s.hash}</div>
              <div className="dev-graph-title">{s.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type RailCategory = "payments" | "bills" | "settlement";

const RAIL_NODES: {
  key: string;
  name: string;
  logo: string;
  angle: number;
  color: string;
  category: RailCategory;
}[] = [
  {
    key: "paystack",
    name: "Paystack",
    logo: paystackLogo,
    angle: -90,
    color: "#00d9b4",
    category: "payments",
  },
  {
    key: "flutterwave",
    name: "Flutterwave",
    logo: flutterwaveLogo,
    angle: -60,
    color: "#00d9b4",
    category: "payments",
  },
  {
    key: "interswitch",
    name: "Interswitch",
    logo: interswitchLogo,
    angle: -30,
    color: "#00d9b4",
    category: "payments",
  },
  {
    key: "stripe",
    name: "Stripe",
    logo: stripeLogo,
    angle: 0,
    color: "#00d9b4",
    category: "payments",
  },
  {
    key: "nomba",
    name: "Nomba",
    logo: nombaLogo,
    angle: 30,
    color: "#2f8fff",
    category: "bills",
  },
  {
    key: "vtpass",
    name: "VTpass",
    logo: vtpassLogo,
    angle: 60,
    color: "#2f8fff",
    category: "bills",
  },
  {
    key: "safehaven",
    name: "Safe Haven",
    logo: safeHavenLogo,
    angle: 90,
    color: "#2f8fff",
    category: "bills",
  },
  {
    key: "momo",
    name: "MTN MoMo",
    logo: momoLogo,
    angle: 120,
    color: "#2f8fff",
    category: "bills",
  },
  {
    key: "nibss",
    name: "NIBSS",
    logo: nibssLogo,
    angle: 150,
    color: "#f5c451",
    category: "settlement",
  },
  {
    key: "bvn",
    name: "BVN",
    logo: bvnLogo,
    angle: 180,
    color: "#f5c451",
    category: "settlement",
  },
  {
    key: "nin",
    name: "NIN",
    logo: ninLogo,
    angle: 210,
    color: "#f5c451",
    category: "settlement",
  },
  {
    key: "cbn",
    name: "CBN",
    logo: cbnLogo,
    angle: 240,
    color: "#f5c451",
    category: "settlement",
  },
];

const ORBIT_LEGEND = [
  {
    key: "payments" as RailCategory,
    label: "Payments",
    color: "#00d9b4",
    items: "Paystack · Flutterwave · Interswitch · Stripe",
  },
  {
    key: "bills" as RailCategory,
    label: "Bills & BaaS",
    color: "#2f8fff",
    items: "Nomba · VTpass · Safe Haven · MTN MoMo",
  },
  {
    key: "settlement" as RailCategory,
    label: "Settlement & Compliance",
    color: "#f5c451",
    items: "NIBSS · BVN · NIN · CBN",
  },
];

function RailLogoImg({ name, src }: { name: string; src: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return !failed ? (
    <img src={src} alt={name} onError={() => setFailed(true)} />
  ) : (
    <span className="railflow-fallback">{initials}</span>
  );
}

function FlowNetwork({ focus = null }: { focus?: RailCategory | null }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const R = 40;

  return (
    <div className="railflow-outer">
      <div className="railflow-container">
        <svg
          className="railflow-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0,217,180,0.5)" />
              <stop offset="100%" stopColor="rgba(0,217,180,0)" />
            </radialGradient>
          </defs>

          <circle
            cx="50"
            cy="50"
            r="20"
            fill="url(#hubGlow)"
            className="railflow-hub-glow"
          />

          {RAIL_NODES.map((n, i) => {
            const rad = (n.angle * Math.PI) / 180;
            const x1 = 50 + R * Math.cos(rad);
            const y1 = 50 + R * Math.sin(rad);
            const ctrlRad = ((n.angle + 24) * Math.PI) / 180;
            const cx = 50 + R * 0.48 * Math.cos(ctrlRad);
            const cy = 50 + R * 0.48 * Math.sin(ctrlRad);
            const pathId = `rail-path-${n.key}`;
            const dur = 2.6 + (i % 4) * 0.6;
            const delay = (i * 0.28).toFixed(2);
            const active = hovered === n.key || focus === n.category;
            const dim = focus !== null && focus !== n.category;
            return (
              <g key={n.key}>
                <path
                  id={pathId}
                  d={`M ${x1} ${y1} Q ${cx} ${cy} 50 50`}
                  className={`railflow-path${active ? " is-active" : ""}${dim ? " is-dim" : ""}`}
                  style={{ ["--rail-color" as string]: n.color }}
                />
                <circle
                  r={active ? 1.7 : 1.2}
                  className={`railflow-pulse${dim ? " is-dim" : ""}`}
                  style={{ ["--rail-color" as string]: n.color }}
                >
                  <animateMotion
                    dur={`${dur}s`}
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                  >
                    <mpath href={`#${pathId}`} />
                  </animateMotion>
                </circle>
              </g>
            );
          })}

          <circle cx="50" cy="50" r="10.5" className="railflow-hub-ring" />
        </svg>

        {RAIL_NODES.map((n) => {
          const rad = (n.angle * Math.PI) / 180;
          const left = 50 + R * Math.cos(rad);
          const top = 50 + R * Math.sin(rad);
          return (
            <div
              key={n.key}
              className={`railflow-node${hovered === n.key || focus === n.category ? " is-active" : ""}${focus !== null && focus !== n.category ? " is-dim" : ""}`}
              style={{
                left: `${left}%`,
                top: `${top}%`,
                ["--rail-color" as string]: n.color,
              }}
              onMouseEnter={() => setHovered(n.key)}
              onMouseLeave={() => setHovered((h) => (h === n.key ? null : h))}
            >
              <div className="railflow-tile">
                <RailLogoImg name={n.name} src={n.logo} />
              </div>
              <div className="railflow-node-label">{n.name}</div>
            </div>
          );
        })}

        <div className="railflow-hub">
          <div className="railflow-hub-tile">
            <RailLogoImg name="KyvoLab" src={kyvolabLogo} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const featured = PROJECTS.slice(0, 3);
  const heroRef = useRef<HTMLElement | null>(null);
  const [teaseActive, setTeaseActive] = useState(1);
  const [railFocus, setRailFocus] = useState<RailCategory | null>(null);

  const onHeroMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--hx", `${x}px`);
    el.style.setProperty("--hy", `${y}px`);
    el.style.setProperty("--px", ((x / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty("--py", ((y / r.height) * 2 - 1).toFixed(3));
  };

  return (
    <>
      {/* ── HERO ── */}
      <SEO
        title="KyvoLab | Fintech App & Software Development Company"
        description="KyvoLab designs and builds fintech apps, payment platforms, wallets, VTU and bills platforms for African startups and financial businesses."
        path="/"
      />
      <OrganizationSchema />
      <section className="hero hm-hero" ref={heroRef} onMouseMove={onHeroMove}>
        <AlgorithmCanvas />
        <div className="hero-scrim" />
        <div className="hm-blob b1" />
        <div className="hm-blob b2" />
        <div className="hm-spot" />

        <div className="hero-inner">
          <div>
            <div
              className="hero-eye"
              style={{ animation: "fadeUp .7s ease .1s both" }}
            >
              <div className="hero-dot" />
              <span style={{ fontFamily: "Fira Code, monospace" }}>
                kyvolab.init()
              </span>
            </div>
            <h1
              className="hero-h1"
              style={{ animation: "fadeUp .7s ease .25s both" }}
            >
              We design &amp; engineer
              <br />
              <span className="tg hm-shimmer">fintechs</span>.
            </h1>
            <p
              className="hero-sub"
              style={{ animation: "fadeUp .7s ease .35s both" }}
            >
              A product studio building bills, payments, and wallet apps for
              African startups — from first sketch to a real interface people
              trust with their money.
            </p>
            <div
              className="hero-btns"
              style={{ animation: "fadeUp .7s ease .45s both" }}
            >
              <Link className="btn-p hm-shine" to="/work">
                See our work →
              </Link>
              <Link className="btn-s" to="/contact">
                Talk to us
              </Link>
            </div>
            <div
              className="hero-badges"
              style={{ animation: "fadeUp .7s ease .55s both" }}
            >
              {[
                "Neobanks & MFBs",
                "Wallet Apps",
                "VTU & Bills",
                "Payments Infrastructure",
              ].map((b) => (
                <span key={b} className="hero-badge">
                  {b}
                </span>
              ))}
            </div>
            <div
              className="hm-rails"
              style={{ animation: "fadeUp .7s ease .7s both" }}
            >
              <span className="hm-rails-label">integrated with</span>
              <div className="hm-rails-logos">
                {HERO_RAILS.map((r) => (
                  <span key={r} className="hm-rail">
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div
            className="hm-stage"
            style={{ animation: "fadeUp .8s ease .4s both" }}
          >
            <div className="hm-layer hm-layer-term">
                <div className="terminal">
                  <div className="term-bar">
                    <div className="term-dot" style={{ background: "#FF5F57" }} />
                    <div className="term-dot" style={{ background: "#FEBC2E" }} />
                    <div className="term-dot" style={{ background: "#28C840" }} />
                    <span className="term-title">
                      kyvolab — wallet.service.ts
                    </span>
                  </div>
                  <div className="term-body">
                    <div>
                      <span className="tc-dim">01 </span>
                      <span className="tc-blue">import</span>{" "}
                      <span className="tc-white">{"{ Injectable }"}</span>{" "}
                      <span className="tc-blue">from</span>{" "}
                      <span className="tc-green">'@nestjs/common'</span>
                      <span className="tc-dim">;</span>
                    </div>
                    <div>
                      <span className="tc-dim">02 </span>
                      <span className="tc-blue">import</span>{" "}
                      <span className="tc-white">{"{ DataSource }"}</span>{" "}
                      <span className="tc-blue">from</span>{" "}
                      <span className="tc-green">'typeorm'</span>
                      <span className="tc-dim">;</span>
                    </div>
                    <div>
                      <span className="tc-dim">03 </span>
                    </div>
                    <div>
                      <span className="tc-dim">04 </span>
                      <span className="tc-teal">@Injectable</span>
                      <span className="tc-white">()</span>
                    </div>
                    <div>
                      <span className="tc-dim">05 </span>
                      <span className="tc-blue">export class</span>{" "}
                      <span className="tc-yellow">WalletService</span>{" "}
                      <span className="tc-white">{"{"}</span>
                    </div>
                    <div>
                      <span className="tc-dim">06 </span>{" "}
                      <span className="tc-blue">constructor</span>
                      <span className="tc-white">(</span>
                    </div>
                    <div>
                      <span className="tc-dim">07 </span>{" "}
                      <span className="tc-blue">private readonly</span>{" "}
                      <span className="tc-white">db: </span>
                      <span className="tc-yellow">DataSource</span>
                      <span className="tc-dim">,</span>
                    </div>
                    <div>
                      <span className="tc-dim">08 </span>{" "}
                      <span className="tc-white">) {"{}"}</span>
                    </div>
                    <div>
                      <span className="tc-dim">09 </span>
                    </div>
                    <div>
                      <span className="tc-dim">10 </span>{" "}
                      <span className="tc-comment">
                        {"// atomic transfer with row lock"}
                      </span>
                    </div>
                    <div>
                      <span className="tc-dim">11 </span>{" "}
                      <span className="tc-blue">async</span>{" "}
                      <span className="tc-teal">transfer</span>
                      <span className="tc-white">(from, to, amt) {"{"}</span>
                    </div>
                    <div>
                      <span className="tc-dim">12 </span>{" "}
                      <span className="tc-blue">return await</span>{" "}
                      <span className="tc-white">this.db.</span>
                      <span className="tc-teal">transaction</span>
                      <span className="tc-white">(</span>
                      <span className="tc-blue">async</span>{" "}
                      <span className="tc-white">
                        mgr {"=>"} {"{"}
                      </span>
                    </div>
                    <div>
                      <span className="tc-dim">13 </span>{" "}
                      <span className="tc-blue">const</span>{" "}
                      <span className="tc-white">s = </span>
                      <span className="tc-blue">await</span>{" "}
                      <span className="tc-white">mgr.</span>
                      <span className="tc-teal">findWithLock</span>
                      <span className="tc-white">(from);</span>
                    </div>
                    <div>
                      <span className="tc-dim">14 </span>{" "}
                      <span className="tc-blue">if</span>{" "}
                      <span className="tc-white">(s.balance {"<"} amt) </span>
                      <span className="tc-blue">throw new</span>{" "}
                      <span className="tc-yellow">InsufficientFunds</span>
                      <span className="tc-white">();</span>
                    </div>
                    <div>
                      <span className="tc-dim">15 </span>{" "}
                      <span className="tc-blue">await</span>{" "}
                      <span className="tc-white">mgr.</span>
                      <span className="tc-teal">debit</span>
                      <span className="tc-white">(from, amt);</span>
                    </div>
                    <div>
                      <span className="tc-dim">16 </span>{" "}
                      <span className="tc-blue">await</span>{" "}
                      <span className="tc-white">mgr.</span>
                      <span className="tc-teal">credit</span>
                      <span className="tc-white">(to, amt);</span>
                    </div>
                    <div>
                      <span className="tc-dim">17 </span>{" "}
                      <span className="tc-white">{"});"}</span>
                    </div>
                    <div>
                      <span className="tc-dim">18 </span>{" "}
                      <span className="tc-white">{"}"}</span>
                    </div>
                    <div>
                      <span className="tc-dim">19 </span>
                      <span className="tc-white">{"}"}</span>
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <span className="tc-dim">▶ </span>
                      <span className="tc-teal">
                        <Typed
                          strings={[
                            "Transfer committed in 1.2s",
                            "✓ Wallet debited & credited atomically",
                            "✓ Build passing — 0 errors",
                          ]}
                          speed={45}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              
            </div>

            <div className="hm-layer hm-layer-phone">
              <div className="hm-phone">
                <div className="hm-phone-notch" />
                <SpecScreen kind="wallet" />
              </div>
            </div>

            <div className="hm-layer hm-layer-float f1">
              <div className="hm-float">
                <span className="hm-float-ico ok">✓</span>
                <div>
                  <div className="hm-float-l">build.status</div>
                  <div className="hm-float-n">passing</div>
                </div>
              </div>
            </div>
            <div className="hm-layer hm-layer-float f2">
              <div className="hm-float">
                <span className="hm-float-ico in">↓</span>
                <div>
                  <div className="hm-float-l">transfer received</div>
                  <div className="hm-float-n">+₦25,000</div>
                </div>
              </div>
            </div>
            <div className="hm-layer hm-layer-float f3">
              <div className="hm-float">
                <span className="hm-float-ico kyc">◉</span>
                <div>
                  <div className="hm-float-l">kyc.bvn</div>
                  <div className="hm-float-n">verified</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a href="#what-we-build" className="hm-scroll" aria-label="Scroll to services">
          <span />
        </a>
      </section>

      {/* ── SERVICES TEASE ── */}
      <section className="sec hm-tease" id="what-we-build">
        <div className="hm-tease-aurora" />
        <div className="sec-in">
          <div className="hm-tease-head">
            <div>
              <Reveal>
                <div className="eyebrow">what we build</div>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="sec-h2" style={{ color: "#fff" }}>
                  Design and engineering,
                  <br />
                  <GT c="under one roof." />
                </h2>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <div className="hm-tease-side">
                <p className="sec-sub">
                  From the first sketch to the production build — the three
                  product types we ship most. Tap or hover to look inside.
                </p>
                <Link to="/services" className="link-arrow hm-tease-link">
                  See all services →
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={180}>
            <div className="hm-panels">
              {SERVICE_TEASE.map((s, i) => {
                const on = i === teaseActive;
                return (
                  <div
                    key={s.title}
                    className={`hm-panel ${on ? "on" : ""}`}
                    style={{ ["--accent" as string]: s.accent }}
                    onMouseEnter={() => setTeaseActive(i)}
                    onClick={() => setTeaseActive(i)}
                    onFocus={() => setTeaseActive(i)}
                    tabIndex={0}
                    role="button"
                    aria-expanded={on}
                  >
                    <div className="hm-panel-glow" />
                    <div className="hm-panel-top">
                      <span className="hm-panel-idx">0{i + 1}</span>
                      <span className="hm-panel-icon">{s.icon}</span>
                    </div>
                    <div className="hm-panel-vtitle">{s.title}</div>
                    <div className="hm-panel-body">
                      <div className="hm-panel-copy">
                        <h3 className="hm-panel-title">{s.title}</h3>
                        <p className="hm-panel-desc">{s.desc}</p>
                        <div className="ptags">
                          {s.tags.map((t) => (
                            <span key={t} className="ptag">{t}</span>
                          ))}
                        </div>
                        <Link to="/services#specialties" className="hm-panel-cta">
                          Explore <span>→</span>
                        </Link>
                      </div>
                      {on && (
                        <div className="hm-panel-phone" key={s.kind}>
                          <div className="hm-phone-notch" />
                          <SpecScreen kind={s.kind} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STACK ── */}
      <section className="sec hm-stack">
        <div className="sec-in">
          <div className="hm-sec-head">
            <div>
              <Reveal>
                <div className="eyebrow">stack.list()</div>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="sec-h2">
                  Tools we build
                  <br />
                  <GT c="fintech products with." />
                </h2>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <p className="sec-sub">
                Native and cross-platform mobile, a modern web/backend toolchain,
                and the payments infrastructure fintech apps actually run on.
              </p>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <StackWall />
          </Reveal>
        </div>
      </section>

      {/* ── PROCESS (live build console) ── */}
      <section className="sec hm-process">
        <div className="hm-process-grid-bg" />
        <div className="hm-process-aurora" />
        <div className="sec-in">
          <div className="hm-sec-head">
            <div>
              <Reveal>
                <div className="eyebrow">build.log()</div>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="sec-h2" style={{ color: "#fff" }}>
                  Watch it
                  <br />
                  <GT c="actually get built." />
                </h2>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <div className="hm-process-side">
                <span className="hm-live">
                  <i /> live pipeline
                </span>
                <p className="sec-sub">
                  No buzzword slide — this is roughly what a project's commit
                  history looks like from kickoff to production.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={180}>
            <div className="hm-console-wrap">
              <div className="hm-console-glow" />
              <DevBuildConsole />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── INTEGRATIONS / RAILS ── */}
      <section className="sec hm-rails-sec">
        <div className="sec-in hm-rails-grid">
          <div>
            <Reveal>
              <div className="eyebrow">network.map()</div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="sec-h2">
                Every rail your app needs,
                <br />
                <GT c="already wired in." />
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="sec-sub">
                Payments, bills, verification, and settlement — the infrastructure
                layer, so you can focus on the product.
              </p>
            </Reveal>

            <div className="hm-legend">
              {ORBIT_LEGEND.map((l, i) => (
                <Reveal key={l.key} delay={200 + i * 80}>
                  <button
                    type="button"
                    className={`hm-legend-card ${railFocus === l.key ? "on" : ""}`}
                    style={{ ["--rail-color" as string]: l.color }}
                    onMouseEnter={() => setRailFocus(l.key)}
                    onMouseLeave={() => setRailFocus(null)}
                    onFocus={() => setRailFocus(l.key)}
                    onBlur={() => setRailFocus(null)}
                    onClick={() => setRailFocus((f) => (f === l.key ? null : l.key))}
                  >
                    <span className="hm-legend-dot" />
                    <span className="hm-legend-text">
                      <b>{l.label}</b>
                      <span>{l.items}</span>
                    </span>
                    <span className="hm-legend-n">
                      {RAIL_NODES.filter((n) => n.category === l.key).length}
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={180}>
            <div className="hm-net-panel">
              <div className="hm-net-grid" />
              <div className="hm-net-radar" />
              <div className="hm-net-status">
                <i /> {RAIL_NODES.length} rails connected
              </div>
              <FlowNetwork focus={railFocus} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURED WORK ── */}
      <section className="sec hm-work">
        <div className="sec-in">
          <div className="hm-sec-head">
            <div>
              <Reveal>
                <div className="eyebrow">selected work</div>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="sec-h2">
                  Products we've
                  <br />
                  <GT c="designed & built." />
                </h2>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <div className="hm-work-side">
                <p className="sec-sub">
                  A running record of real client work — each one a full rebrand,
                  redesign, or ground-up interface build.
                </p>
                <Link to="/work" className="link-arrow">
                  View all work →
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="hm-work-grid">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100} className={i === 0 ? "hm-work-lead" : ""}>
                <Link
                  to={`/work/${p.slug}`}
                  className={`hm-work-card ${i === 0 ? "lead" : ""}`}
                  style={{ ["--accent" as string]: p.accent }}
                >
                  <div className="hm-work-thumb">
                    <div className="hm-work-thumb-glow" />
                    {p.status === "shipped" ? (
                      <div className="hm-work-phones">
                        <PhoneFrame
                          src={p.cover}
                          alt={p.coverAlt}
                          accent={p.accent}
                          tilt={i % 2 === 0 ? "left" : "right"}
                        />
                        {i === 0 && p.gallery[1] && (
                          <PhoneFrame
                            src={p.gallery[1].src}
                            alt={p.gallery[1].alt}
                            accent={p.accent}
                            tilt="right"
                            className="hm-work-phone-2"
                          />
                        )}
                      </div>
                    ) : (
                      <div className="feat-pending">
                        <div className="feat-pending-glyph">＋</div>
                        <span>Pending assets</span>
                      </div>
                    )}
                  </div>
                  <div className="hm-work-body">
                    <div className="hm-work-meta">
                      <span className="feat-card-cat">{p.category}</span>
                      <span className="hm-work-year">{p.year}</span>
                    </div>
                    <div className="hm-work-title">{p.name}</div>
                    <div className="feat-card-tag">{p.tagline}</div>
                    <div className="feat-card-foot">
                      <div className="ptags">
                        {p.role.slice(0, i === 0 ? 3 : 2).map((t) => (
                          <div key={t} className="ptag">
                            {t}
                          </div>
                        ))}
                      </div>
                      <div className="hm-work-cta">
                        <span>case study</span>
                        <div className="parr">→</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="cta-strip hm-cta">
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <AlgorithmCanvas intensity="low" />
        </div>
        <div className="hm-cta-marquee" aria-hidden>
          <div className="hm-cta-track">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i}>let's build ✦</span>
            ))}
          </div>
        </div>
        <div className="hm-cta-orb" />
        <div className="cta-strip-in">
          <Reveal>
            <div className="hero-eye hm-cta-eye">
              <div className="hero-dot" />
              <span>project.start()</span>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="cta-strip-h hm-cta-h">
              Have a fintech idea that needs
              <br />
              <span className="tg hm-shimmer">a real interface?</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="hm-cta-sub">
              Tell us what you're building. We'll come back with a plan, a
              timeline, and the first screens we'd design.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="hm-cta-btns">
              <Link to="/contact" className="btn-p hm-shine hm-cta-primary">
                Start a project →
              </Link>
              <a href="mailto:officialolamide001@gmail.com" className="btn-s hm-cta-ghost">
                officialolamide001@gmail.com
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

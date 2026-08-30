import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AlgorithmCanvas from "../components/AlgorithmCanvas";
import Reveal from "../components/Reveal";
import MagCard from "../components/MagCard";
import Typed from "../components/Typed";
import PhoneFrame from "../components/PhoneFrame";
import { PROJECTS } from "../data/projects";

const GT = ({ c }: { c: string }) => <span className="tg">{c}</span>;

const SERVICE_TEASE = [
  {
    icon: "◆",
    title: "Neobank & MFB Apps",
    desc: "Digital banking interfaces for microfinance banks and neobanks — accounts, cards, and statements people actually trust.",
  },
  {
    icon: "▣",
    title: "Wallets & Payments",
    desc: "Balance cards, transfers, and transaction flows built around how people actually move money.",
  },
  {
    icon: "◈",
    title: "VTU & Bills Platforms",
    desc: "Airtime, data, electricity, and cable subscriptions — one-tap bill payment experiences.",
  },
];

const STACK_ROWS = [
  {
    label: "Mobile",
    dir: "left" as const,
    duration: 34,
    tools: [
      "React Native",
      "Flutter",
      "Swift",
      "SwiftUI",
      "Kotlin",
      "Expo",
      "EAS",
      "CodePush",
    ],
  },
  {
    label: "Web & Backend",
    dir: "right" as const,
    duration: 42,
    tools: [
      "React",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Express",
      "Python",
      "Go",
    ],
  },
  {
    label: "Fintech Infrastructure",
    dir: "left" as const,
    duration: 38,
    tools: [
      "Paystack",
      "Flutterwave",
      "Mono",
      "Okra",
      "NIBSS",
      "Firebase",
      "PostgreSQL",
    ],
  },
];

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
      setLines(all);
      setCompletedCount(BUILD_STEPS.length);
      setPhase("done");
      return;
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

    setLines([]);
    setCurrentStepIndex(-1);
    setCompletedCount(0);
    runStep(0);

    return () => {
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

export default function Home() {
  const featured = PROJECTS.slice(0, 3);

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <AlgorithmCanvas />
        <div className="hero-scrim" />

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
              <GT c="fintech" /> that ships.
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
              <Link className="btn-p" to="/work">
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
          </div>

          <div
            className="hero-right-col"
            style={{ animation: "fadeUp .8s ease .4s both" }}
          >
            <MagCard>
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
            </MagCard>

            <div
              className="stat-card"
              style={{
                bottom: -18,
                left: -32,
                animation: "float 7s ease-in-out infinite",
              }}
            >
              <div
                className="stat-card-l"
                style={{
                  fontFamily: "Fira Code, monospace",
                  color: "#00D9B4",
                  marginBottom: 3,
                }}
              >
                ● build.status
              </div>
              <div className="stat-card-n" style={{ fontSize: 18 }}>
                passing
              </div>
            </div>
            <div
              className="stat-card"
              style={{
                top: -14,
                right: -24,
                animation: "float 9s ease-in-out 1s infinite",
              }}
            >
              <div
                className="stat-card-l"
                style={{
                  fontFamily: "Fira Code, monospace",
                  color: "#2F8FFF",
                  marginBottom: 3,
                }}
              >
                figma → production
              </div>
              <div className="stat-card-n" style={{ fontSize: 18 }}>
                live preview
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES TEASE ── */}
      <section className="sec svc-tease-bg">
        <div className="sec-in">
          <Reveal>
            <div className="eyebrow">what we build</div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="sec-h2">
              Design and engineering,
              <br />
              <GT c="under one roof." />
            </h2>
          </Reveal>
          <div className="tease-grid">
            {SERVICE_TEASE.map((s, i) => (
              <Reveal key={s.title} delay={i * 70}>
                <MagCard cls="tease-card">
                  <div className="tease-icon">{s.icon}</div>
                  <div className="tease-title">{s.title}</div>
                  <div className="tease-desc">{s.desc}</div>
                </MagCard>
              </Reveal>
            ))}
          </div>
          <Reveal delay={220}>
            <Link to="/services" className="link-arrow">
              See all services →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── STACK ── */}
      <section className="sec">
        <style>{`
          @keyframes marqueeLeft { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          @keyframes marqueeRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }
          .marquee-row {
            overflow: hidden;
            position: relative;
            -webkit-mask-image: linear-gradient(90deg, transparent, black 6%, black 94%, transparent);
            mask-image: linear-gradient(90deg, transparent, black 6%, black 94%, transparent);
            padding: 6px 0;
          }
          .marquee-track {
            display: flex;
            width: max-content;
            gap: 14px;
            will-change: transform;
          }
          .marquee-row:hover .marquee-track { animation-play-state: paused; }
          .stack-chip {
            display: inline-flex;
            align-items: center;
            gap: 9px;
            padding: 11px 18px;
            border-radius: 11px;
            background: #0b0f1a;
            border: 1px solid rgba(255, 255, 255, 0.08);
            font-family: "Fira Code", monospace;
            font-size: 13.5px;
            color: #e2e8f0;
            white-space: nowrap;
            box-shadow: 0 6px 18px rgba(8, 15, 30, 0.12);
            transition: border-color 0.2s, transform 0.2s;
          }
          .stack-chip:hover { border-color: rgba(0, 217, 180, 0.45); transform: translateY(-2px); }
          .stack-chip .dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: linear-gradient(135deg, #00d9b4, #2f8fff);
            flex-shrink: 0;
          }
          .stack-row-label {
            font-family: "Fira Code", monospace;
            font-size: 11px;
            letter-spacing: 2.5px;
            text-transform: uppercase;
            color: #6a8da8;
            margin-bottom: 14px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .stack-row-label::before { content: "//"; color: rgba(0, 217, 180, 0.4); }
          .stack-row-wrap { margin-bottom: 34px; }
        `}</style>

        <div className="sec-in">
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
          <Reveal delay={140}>
            <p className="sec-sub" style={{ marginBottom: 44 }}>
              Native and cross-platform mobile, a modern web/backend toolchain,
              and the payments infrastructure fintech apps actually run on.
            </p>
          </Reveal>

          {STACK_ROWS.map((row, i) => (
            <Reveal key={row.label} delay={i * 90}>
              <div className="stack-row-wrap">
                <div className="stack-row-label">{row.label}</div>
                <div className="marquee-row">
                  <div
                    className="marquee-track"
                    style={{
                      animation: `${row.dir === "left" ? "marqueeLeft" : "marqueeRight"} ${row.duration}s linear infinite`,
                    }}
                  >
                    {[...row.tools, ...row.tools].map((t, idx) => (
                      <div className="stack-chip" key={`${t}-${idx}`}>
                        <span className="dot" />
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PROCESS (live build console) ── */}
      <section className="sec">
        <style>{`
          .dev-console-grid {
            display: grid;
            grid-template-columns: 1.3fr 1fr;
            gap: 24px;
            align-items: start;
          }
          @media (max-width: 820px) {
            .dev-console-grid { grid-template-columns: 1fr; }
          }
          .dev-terminal { margin: 0; }
          .dev-term-body {
            min-height: 230px;
            font-size: 13.5px;
            line-height: 1.75;
          }
          .dev-progress-row {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 4px;
          }
          .dev-progress-track {
            flex: 1;
            height: 6px;
            border-radius: 4px;
            background: rgba(255, 255, 255, 0.08);
            overflow: hidden;
          }
          .dev-progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #00d9b4, #2f8fff);
          }
          .dev-progress-pct {
            font-family: "Fira Code", monospace;
            font-size: 11px;
            width: 34px;
            text-align: right;
          }
          .dev-cursor-line { margin-top: 2px; }
          .dev-cursor-line span {
            animation: devBlink 1s step-end infinite;
          }
          @keyframes devBlink { 50% { opacity: 0; } }

          .dev-graph {
            background: #0b0f1a;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 14px;
            padding: 24px 22px 24px 20px;
          }
          .dev-graph-node { display: flex; gap: 14px; }
          .dev-graph-rail {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 14px;
            flex-shrink: 0;
          }
          .dev-graph-dot {
            width: 11px;
            height: 11px;
            border-radius: 50%;
            background: transparent;
            border: 2px solid rgba(255, 255, 255, 0.18);
            margin-top: 3px;
            transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          }
          .dev-graph-node.is-active .dev-graph-dot {
            background: #00d9b4;
            border-color: #00d9b4;
            animation: devNodePulse 1.2s ease-in-out infinite;
          }
          .dev-graph-node.is-done .dev-graph-dot {
            background: #00d9b4;
            border-color: #00d9b4;
          }
          @keyframes devNodePulse {
            0%, 100% { box-shadow: 0 0 0 4px rgba(0, 217, 180, 0.16); }
            50% { box-shadow: 0 0 0 8px rgba(0, 217, 180, 0.26); }
          }
          .dev-graph-line {
            width: 1.5px;
            flex: 1;
            background: rgba(255, 255, 255, 0.12);
            margin: 4px 0;
            transition: background 0.3s ease;
          }
          .dev-graph-node.is-done .dev-graph-line { background: rgba(0, 217, 180, 0.4); }
          .dev-graph-info { padding-bottom: 24px; }
          .dev-graph-node:last-child .dev-graph-info { padding-bottom: 0; }
          .dev-graph-hash {
            font-family: "Fira Code", monospace;
            font-size: 10.5px;
            color: #6a8da8;
            margin-bottom: 3px;
          }
          .dev-graph-title {
            font-size: 14.5px;
            font-weight: 600;
            color: #e2e8f0;
            transition: color 0.3s ease;
          }
          .dev-graph-node.is-active .dev-graph-title,
          .dev-graph-node.is-done .dev-graph-title {
            color: #00d9b4;
          }
          @media (prefers-reduced-motion: reduce) {
            .dev-cursor-line span { animation: none; }
            .dev-graph-node.is-active .dev-graph-dot { animation: none; }
          }
        `}</style>

        <div className="sec-in">
          <Reveal>
            <div className="eyebrow">build.log()</div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="sec-h2">
              Watch it
              <br />
              <GT c="actually get built." />
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="sec-sub" style={{ marginBottom: 40 }}>
              No buzzword slide — this is roughly what a project's commit
              history looks like from kickoff to production.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <DevBuildConsole />
          </Reveal>
        </div>
      </section>

      {/* ── FEATURED WORK ── */}
      <section className="sec">
        <div className="sec-in">
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
          <Reveal delay={140}>
            <p className="sec-sub" style={{ marginBottom: 44 }}>
              A running record of real client work — each one a full rebrand,
              redesign, or ground-up interface build.
            </p>
          </Reveal>

          <div className="feat-grid">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link
                  to={`/work/${p.slug}`}
                  className="feat-card"
                  style={{ ["--accent" as string]: p.accent }}
                >
                  <div className="feat-card-thumb">
                    {p.status === "shipped" ? (
                      <PhoneFrame
                        src={p.cover}
                        alt={p.coverAlt}
                        accent={p.accent}
                        tilt={i % 2 === 0 ? "left" : "right"}
                      />
                    ) : (
                      <div className="feat-pending">
                        <div className="feat-pending-glyph">＋</div>
                        <span>Pending assets</span>
                      </div>
                    )}
                  </div>
                  <div className="feat-card-body">
                    <div className="feat-card-cat">{p.category}</div>
                    <div className="feat-card-title">{p.name}</div>
                    <div className="feat-card-tag">{p.tagline}</div>
                    <div className="feat-card-foot">
                      <div className="ptags">
                        {p.role.slice(0, 2).map((t) => (
                          <div key={t} className="ptag">
                            {t}
                          </div>
                        ))}
                      </div>
                      <div className="parr">→</div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="cta-strip">
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <AlgorithmCanvas intensity="low" />
        </div>
        <div className="cta-strip-in">
          <Reveal>
            <h2 className="cta-strip-h">
              Have a fintech idea that needs
              <br />
              <GT c="a real interface?" />
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <Link to="/contact" className="btn-p" style={{ marginTop: 28 }}>
              Start a project →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

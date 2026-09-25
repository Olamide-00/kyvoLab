import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import AlgorithmCanvas from "../components/AlgorithmCanvas";
import CountUp from "../components/CountUp";
import Reveal from "../components/Reveal";
import MagCard from "../components/MagCard";
import SEO from "../components/SEO";
import TeamSchema from "../components/TeamSchema";
import Typed from "../components/Typed";
import { TEAM, type TeamMember } from "../data/team";
import { PROJECTS } from "../data/projects";
import "../styles/team.css";

const VALUES = [
  "ship > talk",
  "security by default",
  "design is how it works",
  "own the outcome",
  "clean code is a feature",
  "users first, always",
  "trust is the product",
  "small team, big leverage",
];

const STATS = [
  { n: TEAM.length, suffix: "", l: "core leads" },
  { n: PROJECTS.filter((p) => p.status === "shipped").length, suffix: "+", l: "products shipped" },
  { n: 4, suffix: "", l: "disciplines under one roof" },
  { n: 100, suffix: "%", l: "fintech focused" },
];

function Portrait({ m, size = "md" }: { m: TeamMember; size?: "sm" | "md" | "lg" }) {
  return (
    <div className={`tm-portrait tm-portrait-${size}`} style={{ ["--accent" as string]: m.accent }}>
      <div className="tm-portrait-ring" />
      <div className="tm-portrait-ring r2" />
      <div className="tm-portrait-disc">
        <img src={m.photo} alt={`${m.name}, ${m.role} at KyvoLab`} loading="lazy" width={400} height={400} />
      </div>
    </div>
  );
}

function profileLines(m: TeamMember) {
  return [
    { k: "name", v: `"${m.name}"` },
    { k: "role", v: `"${m.role}"` },
    { k: "focus", v: `[${m.focus.map((f) => `"${f}"`).join(", ")}]` },
    { k: "stack", v: `[${m.stack.map((f) => `"${f}"`).join(", ")}]` },
    { k: "motto", v: `"${m.motto}"` },
    { k: "status", v: `"online"` },
  ];
}

export default function Team() {
  const [active, setActive] = useState(0);
  const consoleRef = useRef<HTMLDivElement | null>(null);
  const current = TEAM[active];

  const openProfile = (i: number) => {
    setActive(i);
    consoleRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      <SEO
        title="Meet the Team — Engineers Behind KyvoLab | KyvoLab"
        description="Meet the KyvoLab team: Olamide Oladele (CTO), Igbalaye Femi (Engineering Lead), Badmus Praise (HR & Social Media) and Ayomide Quam (Cyber Security Lead) — the people building fintech products for Africa."
        path="/team"
      />
      <TeamSchema team={TEAM} />

      {/* ── HERO ── */}
      <section className="page-hero tm-hero">
        <AlgorithmCanvas intensity="low" />
        <div className="hero-scrim" />
        <div className="tm-hero-in">
          <div>
            <Reveal>
              <div className="hero-eye">
                <div className="hero-dot" />
                <span>team.members()</span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="page-h1">
                The humans
                <br />
                behind <span className="tg">the code.</span>
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="page-sub">
                A tight crew of engineers, security specialists and people
                builders — shipping fintech products for startups across Africa.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="tm-whoami">
                <span className="tc-teal">$</span> whoami{" "}
                <span className="tc-dim">→</span>{" "}
                <span className="tm-whoami-out">
                  <Typed strings={TEAM.map((m) => `${m.name.split(" ")[0].toLowerCase()} // ${m.role.toLowerCase()}`)} />
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="tm-orbit-reveal">
            <div className="tm-orbit">
              <div className="tm-orbit-line" />
              <div className="tm-orbit-line l2" />
              <div className="tm-orbit-glow" />
              <div className="tm-orbit-core">
                <span>Kyvo</span>
                <span className="tm-orbit-core-sub">team</span>
              </div>
              <div className="tm-orbit-ring">
                {TEAM.map((m, i) => {
                  const angle = (360 / TEAM.length) * i;
                  return (
                    <div
                      key={m.slug}
                      className="tm-orbit-node"
                      style={{ transform: `rotate(${angle}deg) translateX(175px)` }}
                    >
                      <div className="tm-orbit-counter">
                        <button
                          type="button"
                          className="tm-orbit-chip"
                          style={{ transform: `translate(-50%, -50%) rotate(${-angle}deg)`, ["--accent" as string]: m.accent }}
                          onClick={() => openProfile(i)}
                          aria-label={`View ${m.name}'s profile`}
                        >
                          <img src={m.photo} alt="" />
                          <span className="tm-orbit-tip">{m.name.split(" ")[0]}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="tm-stats">
        <div className="tm-stats-in">
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 80}>
              <div className="tm-stat">
                <div className="tm-stat-n tg">
                  <CountUp to={s.n} suffix={s.suffix} />
                </div>
                <div className="tm-stat-l">{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── TEAM GRID ── */}
      <section className="sec tm-grid-bg">
        <div className="tm-aurora" />
        <div className="sec-in">
          <Reveal>
            <div className="eyebrow">leadership</div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="sec-h2" style={{ color: "#fff" }}>
              Four leads.
              <br />
              <span className="tg">One standard.</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="sec-sub" style={{ color: "#8b9bb5" }}>
              Every product we ship passes through these hands — architecture,
              engineering, security and the people who make it all run.
            </p>
          </Reveal>

          <div className="tm-grid">
            {TEAM.map((m, i) => (
              <Reveal key={m.slug} delay={i * 110}>
                <article id={m.slug} className="tm-card-shell" style={{ ["--accent" as string]: m.accent }}>
                  <MagCard cls="tm-card">
                    <div className="tm-card-spot" />
                    <div className="tm-card-top">
                      <span className="tm-card-idx">0{i + 1}</span>
                      <span className="tm-card-status">
                        <i /> online
                      </span>
                    </div>
                    <Portrait m={m} />
                    <div className="tm-card-handle">@kyvolab/{m.handle}</div>
                    <h3 className="tm-card-name">{m.name}</h3>
                    <div className="tm-card-role">{m.role}</div>
                    <p className="tm-card-bio">{m.bio}</p>
                    <div className="tm-card-tags">
                      {m.focus.map((f) => (
                        <span key={f} className="ptag">
                          {f}
                        </span>
                      ))}
                    </div>
                    <div className="tm-card-foot">
                      <div className="tm-card-socials">
                        {m.socials.map((s) => (
                          <a
                            key={s.label}
                            href={s.href}
                            target={s.href.startsWith("http") ? "_blank" : undefined}
                            rel="noreferrer"
                            className="tm-soc"
                            aria-label={`${m.name} on ${s.label}`}
                          >
                            {s.label}
                          </a>
                        ))}
                      </div>
                      <button type="button" className="tm-card-more" onClick={() => openProfile(i)}>
                        profile <span>→</span>
                      </button>
                    </div>
                  </MagCard>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFILE CONSOLE ── */}
      <section className="sec tm-console-bg">
        <div className="sec-in">
          <Reveal>
            <div className="eyebrow">profile.inspect()</div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="sec-h2">
              Pick a teammate,
              <br />
              <span className="tg">read the source.</span>
            </h2>
          </Reveal>

          <div className="tm-tabs" role="tablist" aria-label="Team members">
            {TEAM.map((m, i) => (
              <button
                key={m.slug}
                role="tab"
                aria-selected={i === active}
                className={`tm-tab ${i === active ? "on" : ""}`}
                style={{ ["--accent" as string]: m.accent }}
                onClick={() => setActive(i)}
              >
                <img src={m.photo} alt="" />
                <span>{m.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>

          <div ref={consoleRef} className="tm-console" style={{ ["--accent" as string]: current.accent }}>
            <div className="tm-console-visual" key={`v-${current.slug}`}>
              <Portrait m={current} size="lg" />
              <div className="tm-console-name">{current.name}</div>
              <div className="tm-console-role">{current.role}</div>
              <blockquote className="tm-console-motto">“{current.motto}”</blockquote>
            </div>

            <div className="terminal tm-terminal">
              <div className="term-bar">
                <div className="term-dot" style={{ background: "#ff5f57" }} />
                <div className="term-dot" style={{ background: "#febc2e" }} />
                <div className="term-dot" style={{ background: "#28c840" }} />
                <div className="term-title">~/kyvolab/team</div>
              </div>
              <div className="term-body" key={`t-${current.slug}`}>
                <div className="tm-line" style={{ animationDelay: "0ms" }}>
                  <span className="tc-teal">$</span> <span className="tc-white">cat</span>{" "}
                  <span className="tc-blue">team/{current.slug}.json</span>
                </div>
                <div className="tm-line" style={{ animationDelay: "180ms" }}>
                  <span className="tc-white">{"{"}</span>
                </div>
                {profileLines(current).map((l, i, arr) => (
                  <div key={l.k} className="tm-line" style={{ animationDelay: `${260 + i * 110}ms` }}>
                    &nbsp;&nbsp;<span className="tc-blue">"{l.k}"</span>
                    <span className="tc-white">: </span>
                    <span className={l.k === "status" ? "tc-green" : "tc-yellow"}>{l.v}</span>
                    {i < arr.length - 1 && <span className="tc-white">,</span>}
                  </div>
                ))}
                <div className="tm-line" style={{ animationDelay: `${260 + 6 * 110}ms` }}>
                  <span className="tc-white">{"}"}</span>
                </div>
                <div className="tm-line" style={{ animationDelay: `${360 + 6 * 110}ms` }}>
                  <span className="tc-teal">$</span> <span className="type-cursor">▌</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES MARQUEE ── */}
      <section className="tm-marquee-sec" aria-label="Team values">
        <div className="tm-marquee">
          <div className="tm-marquee-track">
            {[...VALUES, ...VALUES].map((v, i) => (
              <span key={i} className="tm-marquee-item">
                <b>◆</b> {v}
              </span>
            ))}
          </div>
        </div>
        <div className="tm-marquee rev">
          <div className="tm-marquee-track">
            {[...VALUES, ...VALUES].reverse().map((v, i) => (
              <span key={i} className="tm-marquee-item outline">
                {v} <b>✦</b>
              </span>
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
              Want this team
              <br />
              <span className="tg">on your product?</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="tm-cta-btns">
              <Link to="/contact" className="btn-p tm-btn-glow">
                Start a project →
              </Link>
              <Link to="/work" className="btn-s tm-btn-ghost">
                See what we've built
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

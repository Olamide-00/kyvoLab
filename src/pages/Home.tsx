import { Link } from "react-router-dom";
import AlgorithmCanvas from "../components/AlgorithmCanvas";
import Reveal from "../components/Reveal";
import MagCard from "../components/MagCard";
import Typed from "../components/Typed";
import PhoneFrame from "../components/PhoneFrame";
import { PROJECTS } from "../data/projects";

const GT = ({ c }: { c: string }) => <span className="tg">{c}</span>;

const SERVICE_TEASE = [
  { icon: "◆", title: "Brand Identity", desc: "Naming, color systems, and visual identity for fintech products." },
  { icon: "▣", title: "Product Design", desc: "Interfaces designed around the three things people actually do." },
  { icon: "◈", title: "Mobile Engineering", desc: "Production-ready builds from Figma to a working, shippable app." },
];

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
            <div className="hero-eye" style={{ animation: "fadeUp .7s ease .1s both" }}>
              <div className="hero-dot" />
              <span style={{ fontFamily: "Fira Code, monospace" }}>kyvolab.init()</span>
            </div>
            <h1 className="hero-h1" style={{ animation: "fadeUp .7s ease .25s both" }}>
              We design &amp; engineer
              <br />
              <GT c="fintech" /> that ships.
            </h1>
            <p className="hero-sub" style={{ animation: "fadeUp .7s ease .35s both" }}>
              A product studio building bills, payments, and wallet apps for African startups —
              from first sketch to a real interface people trust with their money.
            </p>
            <div className="hero-btns" style={{ animation: "fadeUp .7s ease .45s both" }}>
              <Link className="btn-p" to="/work">
                See our work →
              </Link>
              <Link className="btn-s" to="/contact">
                Talk to us
              </Link>
            </div>
            <div className="hero-badges" style={{ animation: "fadeUp .7s ease .55s both" }}>
              {["Brand Identity", "Product Design", "Mobile Engineering", "Based in Lagos"].map((b) => (
                <span key={b} className="hero-badge">
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-right-col" style={{ animation: "fadeUp .8s ease .4s both" }}>
            <MagCard>
              <div className="terminal">
                <div className="term-bar">
                  <div className="term-dot" style={{ background: "#FF5F57" }} />
                  <div className="term-dot" style={{ background: "#FEBC2E" }} />
                  <div className="term-dot" style={{ background: "#28C840" }} />
                  <span className="term-title">kyvolab — wallet.service.ts</span>
                </div>
                <div className="term-body">
                  <div><span className="tc-dim">01 </span><span className="tc-blue">import</span> <span className="tc-white">{"{ Injectable }"}</span> <span className="tc-blue">from</span> <span className="tc-green">'@nestjs/common'</span><span className="tc-dim">;</span></div>
                  <div><span className="tc-dim">02 </span><span className="tc-blue">import</span> <span className="tc-white">{"{ DataSource }"}</span> <span className="tc-blue">from</span> <span className="tc-green">'typeorm'</span><span className="tc-dim">;</span></div>
                  <div><span className="tc-dim">03 </span></div>
                  <div><span className="tc-dim">04 </span><span className="tc-teal">@Injectable</span><span className="tc-white">()</span></div>
                  <div><span className="tc-dim">05 </span><span className="tc-blue">export class</span> <span className="tc-yellow">WalletService</span> <span className="tc-white">{"{"}</span></div>
                  <div><span className="tc-dim">06 </span>  <span className="tc-blue">constructor</span><span className="tc-white">(</span></div>
                  <div><span className="tc-dim">07 </span>    <span className="tc-blue">private readonly</span> <span className="tc-white">db: </span><span className="tc-yellow">DataSource</span><span className="tc-dim">,</span></div>
                  <div><span className="tc-dim">08 </span>  <span className="tc-white">) {"{}"}</span></div>
                  <div><span className="tc-dim">09 </span></div>
                  <div><span className="tc-dim">10 </span>  <span className="tc-comment">{"// atomic transfer with row lock"}</span></div>
                  <div><span className="tc-dim">11 </span>  <span className="tc-blue">async</span> <span className="tc-teal">transfer</span><span className="tc-white">(from, to, amt) {"{"}</span></div>
                  <div><span className="tc-dim">12 </span>    <span className="tc-blue">return await</span> <span className="tc-white">this.db.</span><span className="tc-teal">transaction</span><span className="tc-white">(</span><span className="tc-blue">async</span> <span className="tc-white">mgr {"=>"} {"{"}</span></div>
                  <div><span className="tc-dim">13 </span>      <span className="tc-blue">const</span> <span className="tc-white">s = </span><span className="tc-blue">await</span> <span className="tc-white">mgr.</span><span className="tc-teal">findWithLock</span><span className="tc-white">(from);</span></div>
                  <div><span className="tc-dim">14 </span>      <span className="tc-blue">if</span> <span className="tc-white">(s.balance {"<"} amt) </span><span className="tc-blue">throw new</span> <span className="tc-yellow">InsufficientFunds</span><span className="tc-white">();</span></div>
                  <div><span className="tc-dim">15 </span>      <span className="tc-blue">await</span> <span className="tc-white">mgr.</span><span className="tc-teal">debit</span><span className="tc-white">(from, amt);</span></div>
                  <div><span className="tc-dim">16 </span>      <span className="tc-blue">await</span> <span className="tc-white">mgr.</span><span className="tc-teal">credit</span><span className="tc-white">(to, amt);</span></div>
                  <div><span className="tc-dim">17 </span>    <span className="tc-white">{"});"}</span></div>
                  <div><span className="tc-dim">18 </span>  <span className="tc-white">{"}"}</span></div>
                  <div><span className="tc-dim">19 </span><span className="tc-white">{"}"}</span></div>
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

            <div className="stat-card" style={{ bottom: -18, left: -32, animation: "float 7s ease-in-out infinite" }}>
              <div className="stat-card-l" style={{ fontFamily: "Fira Code, monospace", color: "#00D9B4", marginBottom: 3 }}>
                ● build.status
              </div>
              <div className="stat-card-n" style={{ fontSize: 18 }}>passing</div>
            </div>
            <div className="stat-card" style={{ top: -14, right: -24, animation: "float 9s ease-in-out 1s infinite" }}>
              <div className="stat-card-l" style={{ fontFamily: "Fira Code, monospace", color: "#2F8FFF", marginBottom: 3 }}>
                figma → production
              </div>
              <div className="stat-card-n" style={{ fontSize: 18 }}>live preview</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES TEASE ── */}
      <section className="sec svc-tease-bg">
        <div className="sec-in">
          <Reveal><div className="eyebrow">what we build</div></Reveal>
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

      {/* ── FEATURED WORK ── */}
      <section className="sec">
        <div className="sec-in">
          <Reveal><div className="eyebrow">selected work</div></Reveal>
          <Reveal delay={80}>
            <h2 className="sec-h2">
              Products we've
              <br />
              <GT c="designed & built." />
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="sec-sub" style={{ marginBottom: 44 }}>
              A running record of real client work — each one a full rebrand, redesign, or ground-up
              interface build.
            </p>
          </Reveal>

          <div className="feat-grid">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link to={`/work/${p.slug}`} className="feat-card" style={{ ["--accent" as string]: p.accent }}>
                  <div className="feat-card-thumb">
                    {p.status === "shipped" ? (
                      <PhoneFrame src={p.cover} alt={p.coverAlt} accent={p.accent} tilt={i % 2 === 0 ? "left" : "right"} />
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
                          <div key={t} className="ptag">{t}</div>
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

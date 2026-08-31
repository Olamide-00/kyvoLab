import { Link } from "react-router-dom";
import AlgorithmCanvas from "../components/AlgorithmCanvas";
import Reveal from "../components/Reveal";
import SEO from "../components/SEO";
import PhoneFrame from "../components/PhoneFrame";
import { PROJECTS } from "../data/projects";

export default function Work() {
  return (
    <>
      <SEO
        title="Our Work — Fintech & Software Projects | KyvoLab"
        description="Explore software, fintech and digital products built by KyvoLab."
        path="/work"
      />
      <section className="page-hero">
        <AlgorithmCanvas intensity="low" />
        <div className="hero-scrim" />
        <div className="page-hero-in">
          <Reveal>
            <div className="hero-eye">
              <div className="hero-dot" />
              <span style={{ fontFamily: "Fira Code, monospace" }}>
                work.list()
              </span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="page-h1">
              Selected client
              <br />
              <span className="tg">work.</span>
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="page-sub">
              Real products, real screens — each one a full rebrand, redesign,
              or ground-up interface build for a fintech client.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="sec-in">
          <div className="work-grid">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <Link
                  to={`/work/${p.slug}`}
                  className="work-card"
                  style={{ ["--accent" as string]: p.accent }}
                >
                  <div className="work-card-thumb">
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
                  <div className="work-card-body">
                    <div className="work-card-top">
                      <div className="feat-card-cat">{p.category}</div>
                      {p.status === "in-progress" && (
                        <span className="status-pill">in progress</span>
                      )}
                    </div>
                    <div className="feat-card-title" style={{ fontSize: 26 }}>
                      {p.name}
                    </div>
                    <div className="feat-card-tag">{p.tagline}</div>
                    <p className="work-card-desc">{p.description}</p>
                    <div className="feat-card-foot">
                      <div className="ptags">
                        {p.role.map((t) => (
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
    </>
  );
}

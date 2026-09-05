import { Link, Navigate, useParams } from "react-router-dom";
import AlgorithmCanvas from "../components/AlgorithmCanvas";
import Reveal from "../components/Reveal";
import PhoneFrame from "../components/PhoneFrame";
import { PROJECTS, getProject } from "../data/projects";

export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProject(slug || "");

  if (!project) return <Navigate to="/work" replace />;

  const idx = PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  if (project.status === "in-progress") {
    return (
      <section className="page-hero cs-pending">
        <AlgorithmCanvas intensity="low" />
        <div className="hero-scrim" />
        <div className="page-hero-in">
          <Reveal>
            <Link to="/work" className="back-link">
              ← Back to work
            </Link>
          </Reveal>
          <Reveal delay={60}>
            <div
              className="hero-eye"
              style={{
                ["--accent" as string]: project.accent,
                borderColor: project.accentSoft,
              }}
            >
              <div
                className="hero-dot"
                style={{ background: project.accent }}
              />
              <span style={{ fontFamily: "Fira Code, monospace" }}>
                {project.category}
              </span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="page-h1">
              {project.name}
              <br />
              <span className="tg">{project.tagline}</span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="page-sub">{project.description}</p>
          </Reveal>
          <Reveal delay={240}>
            <div className="pending-frame">
              <div className="pending-glyph-lg">＋</div>
              <div className="pending-status">STATUS: PENDING_ASSET_UPLOAD</div>
              <p>
                Screens for {project.name} will build this page out
                automatically the moment they're uploaded — same gallery, same
                highlights format as DePay and Jaan.
              </p>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <Link
              to={`/work/${next.slug}`}
              className="link-arrow"
              style={{ marginTop: 32, display: "inline-block" }}
            >
              See {next.name}'s case study →
            </Link>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        className="page-hero cs-hero"
        style={{
          ["--accent" as string]: project.accent,
          ["--accent-soft" as string]: project.accentSoft,
        }}
      >
        <AlgorithmCanvas intensity="low" />
        <div className="hero-scrim" />
        <div className="page-hero-in">
          <Reveal>
            <Link to="/work" className="back-link">
              ← Back to work
            </Link>
          </Reveal>
          <Reveal delay={60}>
            <div className="hero-eye cs-eye">
              <div
                className="hero-dot"
                style={{ background: project.accent }}
              />
              <span style={{ fontFamily: "Fira Code, monospace" }}>
                {project.category} · {project.year}
              </span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="page-h1">
              {project.name} —<br />
              <span className="cs-accent-text">{project.tagline}</span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="page-sub" style={{ maxWidth: 620 }}>
              {project.description}
            </p>
          </Reveal>
          <Reveal delay={230}>
            <div className="ptags" style={{ marginTop: 22 }}>
              {project.role.map((t) => (
                <div key={t} className="ptag">
                  {t}
                </div>
              ))}
            </div>
          </Reveal>
          {project.url && (
            <Reveal delay={280}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-p"
                style={{ marginTop: 28, display: "inline-block" }}
              >
                Visit website →
              </a>
            </Reveal>
          )}
        </div>
      </section>

      {/* GALLERY */}
      <section className="sec gallery-bg">
        <div className="sec-in">
          <Reveal>
            <div className="eyebrow">the screens</div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="sec-h2">
              Every surface,
              <br />
              <span className="tg">re-approached.</span>
            </h2>
          </Reveal>

          <div className="cs-gallery">
            {project.gallery.map((g, i) => (
              <Reveal key={g.src} delay={i * 90} className="cs-gallery-item">
                <PhoneFrame
                  src={g.src}
                  alt={g.alt}
                  variant={i === 0 ? "full" : "detail"}
                  tilt={i % 2 === 0 ? "left" : "right"}
                  accent={project.accent}
                />
                <div className="cs-gallery-label">{g.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="sec">
        <div className="sec-in">
          <Reveal>
            <div className="eyebrow">interface detail</div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="sec-h2">
              Built to feel deliberate,
              <br />
              <span className="tg">not decorated.</span>
            </h2>
          </Reveal>

          <div className="highlights-list">
            {project.highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 70}>
                <div
                  className="highlight-row"
                  style={{ ["--accent" as string]: project.accent }}
                >
                  <div className="highlight-idx">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="highlight-title">{h.title}</div>
                    <div className="highlight-desc">{h.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEXT PROJECT */}
      <section className="cta-strip">
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <AlgorithmCanvas intensity="low" />
        </div>
        <div className="cta-strip-in">
          <Reveal>
            <div className="eyebrow" style={{ justifyContent: "center" }}>
              next project
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="cta-strip-h">{next.name}</h2>
          </Reveal>
          <Reveal delay={140}>
            <Link
              to={`/work/${next.slug}`}
              className="btn-p"
              style={{ marginTop: 24 }}
            >
              View case study →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

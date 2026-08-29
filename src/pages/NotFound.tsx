import { Link } from "react-router-dom";
import AlgorithmCanvas from "../components/AlgorithmCanvas";
import Reveal from "../components/Reveal";

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: "100vh" }}>
      <AlgorithmCanvas intensity="low" />
      <div className="hero-scrim" />
      <div className="page-hero-in" style={{ textAlign: "center" }}>
        <Reveal>
          <div className="hero-eye" style={{ margin: "0 auto" }}>
            <div className="hero-dot" style={{ background: "#FF5F57" }} />
            <span style={{ fontFamily: "Fira Code, monospace" }}>error.404()</span>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="page-h1">
            This route doesn't
            <br />
            <span className="tg">exist yet.</span>
          </h1>
        </Reveal>
        <Reveal delay={150}>
          <p className="page-sub" style={{ margin: "0 auto 30px" }}>
            The page you're looking for may have moved, or never shipped.
          </p>
        </Reveal>
        <Reveal delay={210}>
          <Link to="/" className="btn-p">
            Back to home →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

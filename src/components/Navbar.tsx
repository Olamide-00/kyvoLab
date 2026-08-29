import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/referral", label: "Referral" },
  { to: "/commission", label: "Commission" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [navigate]);

  return (
    <nav className={`nav ${scrolled ? "on" : ""}`}>
      <Link to="/" className="nav-logo" aria-label="KyvoLab home">
        <div className="nav-mark">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
                <stop offset="0%" stopColor="#00D9B4" />
                <stop offset="100%" stopColor="#2F8FFF" />
              </linearGradient>
            </defs>
            <rect x="4" y="4" width="4" height="16" rx="1.5" fill="url(#lg)" />
            <polygon points="8,12 8,4.5 18.5,4 14,12" fill="url(#lg)" opacity=".95" />
            <polygon points="8,12 8,19.5 18.5,20 14,12" fill="url(#lg)" opacity=".82" />
          </svg>
          <div className="nav-dot" />
        </div>
        <div className="nav-wordmark">
          Kyvo<span className="tg">Lab</span>
        </div>
      </Link>

      <div className={`nav-links ${open ? "open" : ""}`}>
        {LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === "/"}
            className={({ isActive }) => `nb ${isActive ? "on" : ""}`}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </NavLink>
        ))}
      </div>

      <Link to="/contact" className="nav-cta">
        Start a project →
      </Link>

      <button className={`nav-burger ${open ? "open" : ""}`} onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}

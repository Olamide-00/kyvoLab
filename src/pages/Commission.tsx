import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import SEO from "../components/SEO";

const TERMS = [
  {
    t: "Per-payment, not one-time",
    d: "5% on every payment — milestone 1, milestone 2, retainers. Every invoice your client sends to KyvoLab earns you 5%.",
  },
  {
    t: "Zero ceiling",
    d: "No cap on earnings. Refer multiple clients, earn on all simultaneously. More clients means more passive income.",
  },
  {
    t: "48-hour bank transfer",
    d: "Commission is calculated when payment clears. Funds hit your bank account within 48 hours, every time.",
  },
  {
    t: "Lifetime earnings",
    d: "As long as your referred client keeps paying KyvoLab — retainers, upgrades, new features — you keep earning.",
  },
  {
    t: "Full payment visibility",
    d: "Every client, every payment, and every commission earned is confirmed to you directly as it happens.",
  },
];

function rateForClients(n: number) {
  if (n >= 5) return 10;
  if (n >= 3) return 7;
  return 5;
}

function tierIndexForClients(n: number) {
  if (n >= 5) return 2;
  if (n >= 3) return 1;
  return 0;
}

const TIERS = [
  { label: "Standard", range: "1–2 clients / quarter", rate: 5 },
  { label: "Growth", range: "3–4 clients / quarter", rate: 7 },
  { label: "Elite", range: "5+ clients / quarter", rate: 10 },
];

function TierLadder() {
  const [clients, setClients] = useState(2);
  const [displayRate, setDisplayRate] = useState(5);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const target = rateForClients(clients);
    if (target === displayRate) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const start = displayRate;
    const duration = 380;
    const startTime = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayRate(start + (target - start) * eased);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayRate(target);
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clients]);

  const activeTier = tierIndexForClients(clients);
  const clientsLabel = clients >= 6 ? "6+" : String(clients);

  return (
    <div className="tier-box">
      <div className="tier-label">Clients you'd refer this quarter</div>

      <div className="tier-stepper">
        <button
          type="button"
          className="tier-step-btn"
          onClick={() => setClients((c) => Math.max(0, c - 1))}
          aria-label="Fewer clients"
        >
          −
        </button>
        <div className="tier-count">{clientsLabel}</div>
        <button
          type="button"
          className="tier-step-btn"
          onClick={() => setClients((c) => Math.min(6, c + 1))}
          aria-label="More clients"
        >
          +
        </button>
      </div>

      <div className="tier-rate">
        {displayRate.toFixed(displayRate % 1 === 0 ? 0 : 1)}%
        <span className="tier-rate-label">your commission rate</span>
      </div>

      <div className="tier-ladder">
        {TIERS.map((t, i) => (
          <div
            key={t.label}
            className={`tier-bracket${i === activeTier ? " is-active" : ""}`}
          >
            <div className="tier-bracket-rate">{t.rate}%</div>
            <div className="tier-bracket-label">{t.label}</div>
            <div className="tier-bracket-range">{t.range}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Commission() {
  return (
    <section
      className="sec comm-bg-light"
      style={{ minHeight: "100vh", paddingTop: 140 }}
    >
      <SEO
        title="KyvoLab Commission"
        description="Learn about KyvoLab commissions and partnership opportunities."
        path="/commission"
      />
      <style>{`
        .comm-bg-light {
          position: relative;
          background: #ffffff;
          overflow: hidden;
        }
        .comm-grid-texture {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(15, 23, 42, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15, 23, 42, 0.035) 1px, transparent 1px);
          background-size: 42px 42px;
          -webkit-mask-image: radial-gradient(circle at 50% 0%, black, transparent 75%);
          mask-image: radial-gradient(circle at 50% 0%, black, transparent 75%);
          pointer-events: none;
          z-index: 0;
        }
        .comm-h2 { color: #0b1220; }
        .comm-h2 .tg { color: #0c9c86; }
        .comm-sub { color: #55607a; max-width: 58ch; }
        .comm-eyebrow {
          font-family: "Fira Code", monospace;
          font-size: 12.5px;
          color: #0c9c86;
        }
        .back-link-light { color: #7c8aa3 !important; }

        /* ── Tier ladder (signature element) ── */
        .tier-box {
          margin-top: 44px;
          background: #ffffff;
          border: 1px solid #e4e9f0;
          border-radius: 18px;
          padding: 34px 32px;
          box-shadow: 0 24px 50px rgba(15, 23, 42, 0.06);
          max-width: 620px;
        }
        .tier-label {
          font-family: "Fira Code", monospace;
          font-size: 12px;
          color: #8592a8;
          margin-bottom: 18px;
        }
        .tier-stepper {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 22px;
        }
        .tier-step-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid #e4e9f0;
          background: #fafbfc;
          color: #0b1220;
          font-size: 18px;
          line-height: 1;
          cursor: pointer;
          transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
        }
        .tier-step-btn:hover { border-color: #0c9c86; color: #0c9c86; background: #f0fbf8; }
        .tier-count {
          font-family: "Fira Code", monospace;
          font-size: 22px;
          font-weight: 600;
          color: #0b1220;
          min-width: 30px;
          text-align: center;
        }
        .tier-rate {
          font-family: "Fira Code", monospace;
          font-variant-numeric: tabular-nums;
          font-size: 44px;
          font-weight: 700;
          color: #0c9c86;
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 26px;
        }
        .tier-rate-label {
          font-family: "Fira Code", monospace;
          font-size: 12px;
          font-weight: 400;
          color: #8592a8;
        }
        .tier-ladder {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .tier-bracket {
          border: 1px solid #e4e9f0;
          border-radius: 12px;
          padding: 16px 14px;
          text-align: center;
          transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;
        }
        .tier-bracket-rate {
          font-family: "Fira Code", monospace;
          font-size: 20px;
          font-weight: 700;
          color: #b7c0d1;
          transition: color 0.25s ease;
        }
        .tier-bracket-label {
          font-size: 13.5px;
          font-weight: 600;
          color: #94a3b8;
          margin-top: 4px;
          transition: color 0.25s ease;
        }
        .tier-bracket-range {
          font-family: "Fira Code", monospace;
          font-size: 10.5px;
          color: #b7c0d1;
          margin-top: 4px;
        }
        .tier-bracket.is-active {
          border-color: #0c9c86;
          background: #f0fbf8;
          transform: translateY(-2px);
        }
        .tier-bracket.is-active .tier-bracket-rate { color: #0c9c86; }
        .tier-bracket.is-active .tier-bracket-label { color: #0b1220; }
        @media (prefers-reduced-motion: reduce) {
          .tier-bracket { transition: none; }
        }

        /* ── Term sheet ── */
        .term-sheet {
          max-width: 720px;
          margin-top: 60px;
          border: 1px solid #e4e9f0;
          border-radius: 16px;
          overflow: hidden;
        }
        .term-sheet-head {
          font-family: "Fira Code", monospace;
          font-size: 12px;
          color: #8592a8;
          padding: 16px 22px;
          border-bottom: 1px solid #e4e9f0;
          background: #fafbfc;
        }
        .term-row {
          display: flex;
          gap: 18px;
          padding: 20px 22px;
          border-bottom: 1px solid #e4e9f0;
        }
        .term-row:last-child { border-bottom: none; }
        .term-num {
          font-family: "Fira Code", monospace;
          font-size: 13px;
          color: #0c9c86;
          flex-shrink: 0;
          padding-top: 1px;
        }
        .term-t { font-size: 15.5px; font-weight: 600; color: #0b1220; margin-bottom: 4px; }
        .term-d { font-size: 13.5px; line-height: 1.55; color: #6b7690; max-width: 56ch; }

        @media (max-width: 640px) {
          .tier-ladder { grid-template-columns: 1fr; }
          .tier-box { padding: 26px 22px; }
        }
      `}</style>

      <div className="comm-grid-texture" />

      <div className="sec-in" style={{ position: "relative", zIndex: 1 }}>
        <Reveal>
          <Link to="/" className="back-link back-link-light">
            ← Back home
          </Link>
        </Reveal>
        <Reveal delay={60}>
          <div className="eyebrow comm-eyebrow">how_you_earn()</div>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="sec-h2 comm-h2">
            Your commission,
            <br />
            <span className="tg">decoded.</span>
          </h1>
        </Reveal>
        <Reveal delay={180}>
          <p className="sec-sub comm-sub">
            No hidden terms. No thresholds to unlock the base rate. Every time
            your referred client pays KyvoLab, 5% routes directly to you — for
            the life of the contract. Refer more, and the rate goes up.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <TierLadder />
        </Reveal>

        <div className="term-sheet">
          <Reveal delay={260}>
            <div className="term-sheet-head">§ terms</div>
          </Reveal>
          {TERMS.map((c, i) => (
            <Reveal key={c.t} delay={280 + i * 50}>
              <div className="term-row">
                <div className="term-num">§{i + 1}</div>
                <div>
                  <div className="term-t">{c.t}</div>
                  <div className="term-d">{c.d}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={260}>
          <div style={{ marginTop: 50, textAlign: "center" }}>
            <Link to="/referral" className="btn-p">
              Submit a referral →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

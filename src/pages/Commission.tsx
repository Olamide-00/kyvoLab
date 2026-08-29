import { Link } from "react-router-dom";
import AlgorithmCanvas from "../components/AlgorithmCanvas";
import Reveal from "../components/Reveal";
import MagCard from "../components/MagCard";

const CARDS = [
  { icon: "💰", t: "Per-payment, not one-time", d: "5% on every payment — milestone 1, milestone 2, retainers. Every invoice your client sends to KyvoLab earns you 5%." },
  { icon: "♾️", t: "Zero ceiling", d: "No cap on earnings. Refer multiple clients, earn on all simultaneously. More clients = more passive income." },
  { icon: "⚡", t: "48-hour bank transfer", d: "Commission calculated when payment clears. Funds hit your bank account within 48 hours, every time." },
  { icon: "🔁", t: "Lifetime earnings", d: "As long as your referred client keeps paying KyvoLab — retainers, upgrades, new features — you keep earning." },
  { icon: "📊", t: "Full payment visibility", d: "Every client, every payment, and every commission earned is confirmed to you directly as it happens." },
  { icon: "🏆", t: "Performance bonuses", d: "3+ clients/quarter → 7%. 5+ clients → 10%. Top referrers get a rate upgrade, not just a thank you." },
];

export default function Commission() {
  return (
    <section className="sec comm-bg" style={{ minHeight: "100vh", paddingTop: 140 }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.35 }}>
        <AlgorithmCanvas />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "rgba(6,10,18,.94)", zIndex: 1 }} />
      <div className="sec-in" style={{ position: "relative", zIndex: 2 }}>
        <Reveal>
          <Link to="/" className="back-link">← Back home</Link>
        </Reveal>
        <Reveal delay={60}><div className="eyebrow">how you earn</div></Reveal>
        <Reveal delay={120}>
          <h1 className="sec-h2">
            Your commission,
            <br />
            <span className="tg">decoded.</span>
          </h1>
        </Reveal>
        <Reveal delay={180}>
          <p className="sec-sub">
            No hidden terms. No thresholds. Every time your referred client pays KyvoLab, 5%
            routes directly to you — for the life of the contract.
          </p>
        </Reveal>

        <div className="comm-grid">
          {CARDS.map((c, i) => (
            <Reveal key={c.t} delay={i * 65}>
              <MagCard cls="ccard">
                <div className="cicon">{c.icon}</div>
                <div className="ct">{c.t}</div>
                <div className="cd">{c.d}</div>
              </MagCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="ctotal">
            {[
              { n: "5%", l: "base_commission_rate", div: true },
              { n: "48hrs", l: "payout_processing_time", div: true },
              { n: "10%", l: "top_referrer_rate (5+ clients)" },
            ].map((m) => (
              <div key={m.l} className={m.div ? "ct-div" : ""}>
                <div className="ctn">{m.n}</div>
                <div className="ctl">{m.l}</div>
              </div>
            ))}
          </div>
        </Reveal>

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

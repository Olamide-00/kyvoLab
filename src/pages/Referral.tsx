import { useState } from "react";
import { Link } from "react-router-dom";
import AlgorithmCanvas from "../components/AlgorithmCanvas";
import Reveal from "../components/Reveal";
import MagCard from "../components/MagCard";
import { useToast } from "../components/Toast";

const STEPS = [
  { n: "1", t: "You make an introduction", d: "Connect us with any startup or company that needs a fintech product designed and built." },
  { n: "2", t: "We close and build it", d: "KyvoLab handles the proposal, contract, and full design-and-engineering process end-to-end." },
  { n: "3", t: "Client makes a payment", d: "Every time the client pays a milestone, invoice, or retainer to KyvoLab..." },
  { n: "4", t: "5% hits your account", d: "Calculated on every payment, paid to you within 48 hours. No ceiling. Forever." },
];

export default function Referral() {
  const showToast = useToast();
  const [form, setForm] = useState({ name: "", email: "", cname: "", cemail: "" });

  const submit = () => {
    if (form.name && form.email && form.cname) {
      showToast("🎉 Referral submitted — we'll follow up within 24hrs.");
      setForm({ name: "", email: "", cname: "", cemail: "" });
    } else {
      showToast("⚠️ Please fill all fields.");
    }
  };

  return (
    <section className="sec ref-bg" style={{ minHeight: "100vh", paddingTop: 140 }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <AlgorithmCanvas />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "rgba(8,15,30,.88)", zIndex: 1 }} />
      <div className="sec-in" style={{ position: "relative", zIndex: 2 }}>
        <Reveal>
          <Link to="/" className="back-link" style={{ color: "#8fa3c0" }}>← Back home</Link>
        </Reveal>
        <div className="ref-grid">
          <div>
            <Reveal delay={40}><div className="eyebrow" style={{ color: "#00D9B4" }}>referral_program.init()</div></Reveal>
            <Reveal delay={100}>
              <h1 className="ref-h2">
                Refer a client.
                <br />
                <span className="tg">Earn as they pay.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="ref-sub">
                Know a startup that needs a fintech product designed and built? Introduce them to
                us — and earn 5% of every payment they make to KyvoLab. Per payment. No cap.
              </p>
            </Reveal>
            <div>
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 80}>
                  <div className="rstep">
                    <div className="rline" />
                    <div className="rnum">{s.n}</div>
                    <div>
                      <div className="rt">{s.t}</div>
                      <div className="rd">{s.d}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={200}>
            <MagCard>
              <div className="rcard">
                <div className="rpct">5%</div>
                <div className="rpct-l">// per_payment · no_cap · lifetime</div>
                <div className="rexample">
                  {[
                    { l: "client.pay(kyvolab)", v: "₦5,000,000" },
                    { l: "your.earn(5%)", v: "₦250,000", earn: true },
                    { l: "client.pay(milestone_2)", v: "₦3,000,000" },
                    { l: "your.earn(5%)", v: "₦150,000", earn: true },
                  ].map((r) => (
                    <div key={r.l} className="rex-row">
                      <div className="rex-l">{r.l}</div>
                      <div className={`rex-v ${r.earn ? "earn" : ""}`}>{r.v}</div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    fontFamily: "Fira Code, monospace",
                    fontSize: 10,
                    color: "rgba(0,217,180,.4)",
                    letterSpacing: 2,
                    marginBottom: 14,
                    textTransform: "uppercase",
                  }}
                >
                  // submit referral
                </div>
                <input className="rinput" placeholder="your_name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input className="rinput" placeholder="your_email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input className="rinput" placeholder="client_company" value={form.cname} onChange={(e) => setForm({ ...form, cname: e.target.value })} />
                <input className="rinput" placeholder="client_contact" value={form.cemail} onChange={(e) => setForm({ ...form, cemail: e.target.value })} />
                <button className="rsubmit" onClick={submit}>
                  kyvo.referral.submit() →
                </button>
              </div>
            </MagCard>
          </Reveal>
        </div>

        <Reveal delay={260}>
          <div style={{ marginTop: 60, textAlign: "center" }}>
            <Link to="/commission" className="link-arrow" style={{ color: "#00D9B4" }}>
              See the full commission breakdown →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

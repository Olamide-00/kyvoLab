import { useState } from "react";
import AlgorithmCanvas from "../components/AlgorithmCanvas";
import Reveal from "../components/Reveal";
import { useToast } from "../components/Toast";

const CHANNELS = [
  { icon: "📧", label: "email", val: "officialolamide001@gmail.com", href: "mailto:officialolamide001@gmail.com" },
  { icon: "📱", label: "phone / whatsapp", val: "+234 903 601 8013", href: "tel:+2349036018013" },
  { icon: "📸", label: "instagram", val: "@kyvo_lab", href: "https://instagram.com/kyvo_lab" },
  { icon: "👥", label: "facebook", val: "kyvoLab", href: "#" },
];

export default function Contact() {
  const showToast = useToast();
  const [form, setForm] = useState({ fn: "", ln: "", email: "", phone: "", svc: "", msg: "" });

  const submit = () => {
    if (form.fn && form.email && form.msg) {
      showToast("✅ Message sent! We'll reply within 24hrs.");
      setForm({ fn: "", ln: "", email: "", phone: "", svc: "", msg: "" });
    } else {
      showToast("⚠️ Please fill the required fields.");
    }
  };

  return (
    <section className="sec cont-bg" style={{ minHeight: "100vh", paddingTop: 140 }}>
      <AlgorithmCanvas intensity="low" />
      <div className="sec-in" style={{ position: "relative", zIndex: 2 }}>
        <div className="cont-grid">
          <div>
            <Reveal><div className="eyebrow">get in touch</div></Reveal>
            <Reveal delay={80}>
              <h1 className="sec-h2">
                Let's build your
                <br />
                <span className="tg">next product.</span>
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="sec-sub" style={{ marginBottom: 40 }}>
                Full spec or just an idea — we'll scope it, price it, and design it right. First
                call is free.
              </p>
            </Reveal>
            {CHANNELS.map((item, i) => (
              <Reveal key={item.label} delay={i * 55}>
                <a className="ci-item" href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  <div className="ci-icon">{item.icon}</div>
                  <div>
                    <div className="ci-lbl">{item.label}</div>
                    <div className="ci-val">{item.val}</div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={180}>
            <div className="cform">
              <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 22, fontWeight: 700, color: "#080F1E", marginBottom: 6, letterSpacing: -0.5 }}>
                Send us a message
              </div>
              <div style={{ fontFamily: "Fira Code, monospace", fontSize: 12, color: "#00A98A", marginBottom: 28 }}>
                // response_time: &lt; 24h
              </div>
              <div className="frow">
                <div className="ff">
                  <label className="fl">First name</label>
                  <input className="fi" placeholder="John" value={form.fn} onChange={(e) => setForm({ ...form, fn: e.target.value })} />
                </div>
                <div className="ff">
                  <label className="fl">Last name</label>
                  <input className="fi" placeholder="Doe" value={form.ln} onChange={(e) => setForm({ ...form, ln: e.target.value })} />
                </div>
              </div>
              <div className="frow">
                <div className="ff">
                  <label className="fl">Email</label>
                  <input className="fi" type="email" placeholder="john@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="ff">
                  <label className="fl">Phone</label>
                  <input className="fi" placeholder="+234 800 000 0000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>
              <div className="ff">
                <label className="fl">What do you need built?</label>
                <select className="fi" value={form.svc} onChange={(e) => setForm({ ...form, svc: e.target.value })}>
                  <option value="">Select a service...</option>
                  <option>Brand Identity / Rebrand</option>
                  <option>Product Design (UI/UX)</option>
                  <option>Mobile App Engineering</option>
                  <option>Payments / Wallet UX</option>
                  <option>Design System</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="ff">
                <label className="fl">Tell us about your project</label>
                <textarea
                  className="fi fta"
                  placeholder="Describe what you're building, your timeline, budget range, and any relevant details..."
                  value={form.msg}
                  onChange={(e) => setForm({ ...form, msg: e.target.value })}
                />
              </div>
              <button className="fsub" onClick={submit}>
                kyvo.contact.send() →
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

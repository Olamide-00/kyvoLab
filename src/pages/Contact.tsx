import { useState, type JSX } from "react";
import AlgorithmCanvas from "../components/AlgorithmCanvas";
import Reveal from "../components/Reveal";
import { useToast } from "../components/Toast";
import SEO from "../components/SEO";

function MailGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function PhoneGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1.1.5 1.1 1.1V20c0 .6-.5 1-1.1 1C10.6 21 3 13.4 3 4.1 3 3.5 3.5 3 4.1 3H7.2c.6 0 1.1.5 1.1 1.1 0 1.2.2 2.4.6 3.5.1.3 0 .7-.2 1l-2.1 2.2z" />
    </svg>
  );
}

type DirectChannel = {
  label: string;
  val: string;
  href: string;
  Glyph?: () => JSX.Element;
  slug?: string;
};

const DIRECT_CHANNELS: DirectChannel[] = [
  {
    label: "email",
    val: "officialolamide001@gmail.com",
    href: "mailto:officialolamide001@gmail.com",
    Glyph: MailGlyph,
  },
  {
    label: "phone",
    val: "+234 903 601 8013",
    href: "tel:+2349036018013",
    Glyph: PhoneGlyph,
  },
  {
    label: "whatsapp",
    val: "+234 815 394 0239",
    href: "https://wa.me/2348153940239",
    slug: "whatsapp",
  },
];

const SOCIALS = [
  {
    label: "Instagram",
    handle: "@kyvo_lab",
    href: "https://instagram.com/kyvo_lab",
    slug: "instagram",
  },
  {
    label: "X",
    handle: "@kyvo_lab",
    href: "https://x.com/kyvo_lab",
    slug: "x",
  },
  {
    label: "LinkedIn",
    handle: "KyvoLab",
    href: "https://linkedin.com/company/kyvolab",
    slug: "linkedin",
  },
  {
    label: "Facebook",
    handle: "kyvoLab",
    href: "https://facebook.com/kyvolab",
    slug: "facebook",
  },
  {
    label: "Threads",
    handle: "@kyvo_lab",
    href: "https://threads.net/@kyvo_lab",
    slug: "threads",
  },
];

function SocialIcon({ slug, label }: { slug: string; label: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="social-icon-inner">
      {!failed ? (
        <img
          src={`https://cdn.simpleicons.org/${slug}/94a3b8`}
          alt={label}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="social-icon-fallback">{label[0]}</span>
      )}
    </div>
  );
}

export default function Contact() {
  const showToast = useToast();
  const [form, setForm] = useState({
    fn: "",
    ln: "",
    email: "",
    phone: "",
    svc: "",
    msg: "",
  });

  const submit = () => {
    if (form.fn && form.email && form.msg) {
      showToast("✅ Message sent! We'll reply within 24hrs.");
      setForm({ fn: "", ln: "", email: "", phone: "", svc: "", msg: "" });
    } else {
      showToast("⚠️ Please fill the required fields.");
    }
  };

  return (
    <section
      className="sec cont-bg"
      style={{ minHeight: "100vh", paddingTop: 140 }}
    >
      <SEO
        title="Contact KyvoLab — Let's Build Your Product"
        description="Get in touch with KyvoLab to discuss fintech software, payment platforms and custom digital products."
        path="/contact"
      />
      <style>{`
        .direct-channels { margin-top: 6px; }

        .social-follow { margin-top: 28px; }
        .social-follow-label {
          font-family: "Fira Code", monospace;
          font-size: 11.5px;
          letter-spacing: 1px;
          color: #6a8da8;
          margin-bottom: 14px;
        }
        .social-row { display: flex; gap: 10px; flex-wrap: wrap; }
        .social-icon-btn {
          position: relative;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.09);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
        }
        .social-icon-btn:hover {
          border-color: rgba(0, 217, 180, 0.45);
          background: rgba(0, 217, 180, 0.08);
          transform: translateY(-2px);
        }
        .social-icon-inner { width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; }
        .social-icon-inner img { width: 100%; height: 100%; object-fit: contain; opacity: 0.85; transition: opacity 0.2s ease; }
        .social-icon-btn:hover .social-icon-inner img { opacity: 1; }
        .social-icon-fallback {
          font-family: "Fira Code", monospace;
          font-size: 13px;
          color: #93a4b8;
        }
        .social-tooltip {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%) translateY(4px);
          background: #0b0f1a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #e2e8f0;
          font-family: "Fira Code", monospace;
          font-size: 11px;
          padding: 5px 9px;
          border-radius: 6px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.15s ease, transform 0.15s ease;
        }
        .social-icon-btn:hover .social-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      `}</style>

      <AlgorithmCanvas intensity="low" />
      <div className="sec-in" style={{ position: "relative", zIndex: 2 }}>
        <div className="cont-grid">
          <div>
            <Reveal>
              <div className="eyebrow">get in touch</div>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="sec-h2">
                Let's build your
                <br />
                <span className="tg">next product.</span>
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="sec-sub" style={{ marginBottom: 40 }}>
                Full spec or just an idea — we'll scope it, price it, and design
                it right. First call is free.
              </p>
            </Reveal>

            <div className="direct-channels">
              {DIRECT_CHANNELS.map((item, i) => (
                <Reveal key={item.label} delay={i * 55}>
                  <a
                    className="ci-item"
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                  >
                    <div className="ci-icon">
                      {item.Glyph ? (
                        <item.Glyph />
                      ) : (
                        <SocialIcon slug={item.slug!} label={item.label} />
                      )}
                    </div>
                    <div>
                      <div className="ci-lbl">{item.label}</div>
                      <div className="ci-val">{item.val}</div>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal delay={DIRECT_CHANNELS.length * 55}>
              <div className="social-follow">
                <div className="social-follow-label">follow_us</div>
                <div className="social-row">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="social-icon-btn"
                      aria-label={s.label}
                    >
                      <SocialIcon slug={s.slug} label={s.label} />
                      <span className="social-tooltip">{s.handle}</span>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={180}>
            <div className="cform">
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#080F1E",
                  marginBottom: 6,
                  letterSpacing: -0.5,
                }}
              >
                Send us a message
              </div>
              <div
                style={{
                  fontFamily: "Fira Code, monospace",
                  fontSize: 12,
                  color: "#00A98A",
                  marginBottom: 28,
                }}
              >
                // response_time: &lt; 24h
              </div>
              <div className="frow">
                <div className="ff">
                  <label className="fl">First name</label>
                  <input
                    className="fi"
                    placeholder="John"
                    value={form.fn}
                    onChange={(e) => setForm({ ...form, fn: e.target.value })}
                  />
                </div>
                <div className="ff">
                  <label className="fl">Last name</label>
                  <input
                    className="fi"
                    placeholder="Doe"
                    value={form.ln}
                    onChange={(e) => setForm({ ...form, ln: e.target.value })}
                  />
                </div>
              </div>
              <div className="frow">
                <div className="ff">
                  <label className="fl">Email</label>
                  <input
                    className="fi"
                    type="email"
                    placeholder="john@company.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
                <div className="ff">
                  <label className="fl">Phone</label>
                  <input
                    className="fi"
                    placeholder="+234 800 000 0000"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="ff">
                <label className="fl">What do you need built?</label>
                <select
                  className="fi"
                  value={form.svc}
                  onChange={(e) => setForm({ ...form, svc: e.target.value })}
                >
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

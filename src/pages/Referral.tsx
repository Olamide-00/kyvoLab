import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { useToast } from "../components/Toast";

const STEPS = [
  {
    n: "1",
    t: "You make an introduction",
    d: "Connect us with any startup or company that needs a fintech product designed and built.",
  },
  {
    n: "2",
    t: "We close and build it",
    d: "KyvoLab handles the proposal, contract, and full design-and-engineering process end-to-end.",
  },
  {
    n: "3",
    t: "Client makes a payment",
    d: "Every time the client pays a milestone, invoice, or retainer to KyvoLab.",
  },
  {
    n: "4",
    t: "5% hits your account",
    d: "Calculated on every payment, paid to you within 48 hours. No ceiling. Forever.",
  },
];

const PRESETS = [1_000_000, 5_000_000, 10_000_000, 25_000_000];
const MIN_VALUE = 200_000;
const MAX_VALUE = 50_000_000;

function formatNaira(n: number) {
  return `₦${Math.round(n).toLocaleString("en-NG")}`;
}

function formatCompact(n: number) {
  return `₦${n / 1_000_000}M`;
}

function posToValue(pos: number) {
  const raw = MIN_VALUE * Math.pow(MAX_VALUE / MIN_VALUE, pos / 100);
  return Math.round(raw / 50_000) * 50_000;
}

function valueToPos(value: number) {
  const pos =
    (100 * Math.log(value / MIN_VALUE)) / Math.log(MAX_VALUE / MIN_VALUE);
  return Math.max(0, Math.min(100, pos));
}

function CommissionCalculator() {
  const [sliderPos, setSliderPos] = useState(() => valueToPos(5_000_000));
  const rafRef = useRef<number | null>(null);
  const animationStartRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const projectValue = useMemo(() => posToValue(sliderPos), [sliderPos]);
  const earn = projectValue * 0.05;

  const animateTo = (targetPos: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const startPos = sliderPos;
    const duration = 420;
    animationStartRef.current = null;
    const tick = (now: number) => {
      if (animationStartRef.current === null) {
        animationStartRef.current = now;
      }
      const t = Math.min(1, (now - animationStartRef.current) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setSliderPos(startPos + (targetPos - startPos) * eased);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  return (
    <div className="calc-box">
      <div className="calc-label">Estimate your earning</div>

      <div className="calc-figures">
        <div className="calc-figure">
          <div className="calc-figure-label">Client pays</div>
          <div className="calc-figure-value">{formatNaira(projectValue)}</div>
        </div>
        <div className="calc-figure">
          <div className="calc-figure-label">You earn · 5%</div>
          <div className="calc-figure-value calc-earn-value">
            {formatNaira(earn)}
          </div>
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        step={0.1}
        value={sliderPos}
        onMouseDown={() => {
          if (rafRef.current) cancelAnimationFrame(rafRef.current);
        }}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        className="calc-slider"
        aria-label="Estimated project value"
      />

      <div className="calc-presets">
        {PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            className="calc-preset-btn"
            onClick={() => animateTo(valueToPos(p))}
          >
            {formatCompact(p)}
          </button>
        ))}
      </div>

      <div className="calc-note">
        Paid within 48 hours of each payment. No cap. For as long as the client
        stays a client.
      </div>
    </div>
  );
}

function StepsTimeline({ steps }: { steps: typeof STEPS }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`steps-timeline${inView ? " in-view" : ""}`}>
      <div className="steps-line-base" />
      <div className="steps-line-fill" />
      {steps.map((s, i) => (
        <div className="step-row" key={s.n} style={{ ["--i" as string]: i }}>
          <div className="step-num">{s.n}</div>
          <div>
            <div className="step-t">{s.t}</div>
            <div className="step-d">{s.d}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Referral() {
  const showToast = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    cname: "",
    cemail: "",
  });

  const submit = () => {
    if (form.name && form.email && form.cname) {
      showToast("🎉 Referral submitted — we'll follow up within 24hrs.");
      setForm({ name: "", email: "", cname: "", cemail: "" });
    } else {
      showToast("⚠️ Please fill all fields.");
    }
  };

  return (
    <section
      className="sec ref-bg-light"
      style={{ minHeight: "100vh", paddingTop: 140 }}
    >
      <style>{`
        .ref-bg-light {
          position: relative;
          background: #ffffff;
          overflow: hidden;
        }
        .ref-grid-texture {
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
        .ref-h2 { color: #0b1220; }
        .ref-h2 .tg { color: #0c9c86; }
        .ref-sub { color: #55607a; max-width: 52ch; }
        .back-link-light { color: #7c8aa3 !important; }
        .eyebrow-light {
          font-family: "Fira Code", monospace;
          font-size: 12.5px;
          color: #0c9c86;
        }

        /* ── Steps timeline ── */
        .steps-timeline { position: relative; margin-top: 34px; padding-left: 0; }
        .steps-line-base {
          position: absolute;
          left: 15px;
          top: 6px;
          bottom: 6px;
          width: 2px;
          background: #e4e9f0;
        }
        .steps-line-fill {
          position: absolute;
          left: 15px;
          top: 6px;
          width: 2px;
          height: calc(100% - 12px);
          background: #0c9c86;
          transform-origin: top;
          transform: scaleY(0);
        }
        .steps-timeline.in-view .steps-line-fill {
          animation: lineDraw 1.3s cubic-bezier(0.16, 0.84, 0.44, 1) forwards;
        }
        @keyframes lineDraw { to { transform: scaleY(1); } }
        .step-row {
          position: relative;
          display: flex;
          gap: 18px;
          padding: 16px 0;
        }
        .step-num {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid #e4e9f0;
          background: #ffffff;
          color: #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Fira Code", monospace;
          font-size: 13px;
          font-weight: 600;
          flex-shrink: 0;
          z-index: 1;
        }
        .steps-timeline.in-view .step-num {
          animation: stepFill 0.01s linear forwards;
          animation-delay: calc(var(--i) * 0.4s + 0.1s);
        }
        @keyframes stepFill {
          to { border-color: #0c9c86; color: #ffffff; background: #0c9c86; }
        }
        .step-t { font-size: 15.5px; font-weight: 600; color: #0b1220; margin-bottom: 4px; }
        .step-d { font-size: 13.5px; line-height: 1.55; color: #6b7690; max-width: 46ch; }
        @media (prefers-reduced-motion: reduce) {
          .steps-line-fill { animation: none !important; transform: scaleY(1); }
          .step-num { animation: none !important; border-color: #0c9c86; color: #fff; background: #0c9c86; }
        }

        /* ── Calculator ── */
        .calc-box {
          background: #ffffff;
          border: 1px solid #e4e9f0;
          border-radius: 18px;
          padding: 32px 30px;
          box-shadow: 0 24px 50px rgba(15, 23, 42, 0.06);
        }
        .calc-label {
          font-family: "Fira Code", monospace;
          font-size: 12px;
          color: #8592a8;
          margin-bottom: 20px;
        }
        .calc-figures {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 24px;
        }
        .calc-figure-label {
          font-family: "Fira Code", monospace;
          font-size: 11px;
          color: #8592a8;
          margin-bottom: 6px;
        }
        .calc-figure-value {
          font-family: "Fira Code", monospace;
          font-variant-numeric: tabular-nums;
          font-size: 22px;
          font-weight: 600;
          color: #0b1220;
        }
        .calc-earn-value { color: #0c9c86; font-size: 30px; }
        .calc-slider {
          width: 100%;
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 4px;
          background: linear-gradient(90deg, #0c9c86, #2f6fed);
          outline: none;
          margin: 10px 0 18px;
        }
        .calc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #0c9c86;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.2);
          cursor: pointer;
        }
        .calc-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #0c9c86;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.2);
          cursor: pointer;
        }
        .calc-presets { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
        .calc-preset-btn {
          font-family: "Fira Code", monospace;
          font-size: 12.5px;
          padding: 7px 14px;
          border-radius: 100px;
          border: 1px solid #e4e9f0;
          background: #fafbfc;
          color: #4b5670;
          cursor: pointer;
          transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
        }
        .calc-preset-btn:hover { border-color: #0c9c86; color: #0c9c86; background: #f0fbf8; }
        .calc-note { font-size: 12.5px; line-height: 1.5; color: #8592a8; }

        /* ── Ledger form ── */
        .ledger-wrap { max-width: 640px; margin: 70px auto 0; }
        .ledger-head {
          font-family: "Fira Code", monospace;
          font-size: 12.5px;
          color: #0c9c86;
          margin-bottom: 18px;
        }
        .ledger-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 0;
          border-bottom: 1px solid #e4e9f0;
          transition: border-color 0.2s ease;
        }
        .ledger-row:focus-within { border-bottom-color: #0c9c86; }
        .ledger-row label {
          width: 150px;
          flex-shrink: 0;
          font-family: "Fira Code", monospace;
          font-size: 12.5px;
          color: #8592a8;
        }
        .ledger-row input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-size: 15px;
          color: #0b1220;
          padding: 6px 0;
        }
        .ledger-submit {
          margin-top: 26px;
          width: 100%;
          padding: 15px 20px;
          border-radius: 10px;
          border: none;
          background: #0b1220;
          color: #ffffff;
          font-family: "Fira Code", monospace;
          font-size: 13.5px;
          letter-spacing: 0.3px;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.12s ease;
        }
        .ledger-submit:hover { background: #0c9c86; }
        .ledger-submit:active { transform: scale(0.98); }

        @media (max-width: 860px) {
          .calc-figures { flex-direction: column; gap: 14px; }
        }
      `}</style>

      <div className="ref-grid-texture" />

      <div className="sec-in" style={{ position: "relative", zIndex: 1 }}>
        <Reveal>
          <Link to="/" className="back-link back-link-light">
            ← Back home
          </Link>
        </Reveal>

        <div className="ref-grid">
          <div>
            <Reveal delay={40}>
              <div className="eyebrow eyebrow-light">
                referral_program.init()
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="ref-h2">
                Refer a client.
                <br />
                <span className="tg">Earn as they pay.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="ref-sub">
                Know a startup that needs a fintech product designed and built?
                Introduce them to us — and earn 5% of every payment they make to
                KyvoLab. Per payment. No cap.
              </p>
            </Reveal>

            <StepsTimeline steps={STEPS} />
          </div>

          <Reveal delay={200}>
            <CommissionCalculator />
          </Reveal>
        </div>

        <div className="ledger-wrap">
          <Reveal>
            <div className="ledger-head">submit_referral()</div>
          </Reveal>
          <Reveal delay={60}>
            <div className="ledger-row">
              <label>your_name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="ledger-row">
              <label>your_email</label>
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="ledger-row">
              <label>client_company</label>
              <input
                value={form.cname}
                onChange={(e) => setForm({ ...form, cname: e.target.value })}
              />
            </div>
          </Reveal>
          <Reveal delay={180}>
            <div className="ledger-row">
              <label>client_contact</label>
              <input
                value={form.cemail}
                onChange={(e) => setForm({ ...form, cemail: e.target.value })}
              />
            </div>
          </Reveal>
          <Reveal delay={220}>
            <button className="ledger-submit" onClick={submit}>
              kyvo.referral.submit() →
            </button>
          </Reveal>
        </div>

        <Reveal delay={260}>
          <div style={{ marginTop: 60, textAlign: "center" }}>
            <Link
              to="/commission"
              className="link-arrow"
              style={{ color: "#0c9c86" }}
            >
              See the full commission breakdown →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

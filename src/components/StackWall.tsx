import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  siReact,
  siFlutter,
  siSwift,
  siKotlin,
  siExpo,
  siTypescript,
  siJavascript,
  siNodedotjs,
  siExpress,
  siPython,
  siGo,
  siFirebase,
  siPostgresql,
  type SimpleIcon,
} from "simple-icons";

type Cat = "mobile" | "web" | "fintech";

type Tool = {
  name: string;
  cat: Cat;
  note: string;
  color: string;
  icon?: SimpleIcon;
  mark?: ReactNode;
};

const Mono = ({ t }: { t: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden>
    <text x="12" y="16.5" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize={t.length > 1 ? 10 : 14} fill="currentColor">
      {t}
    </text>
  </svg>
);

const PaystackMark = (
  <svg viewBox="0 0 24 24" aria-hidden>
    <rect x="3" y="4" width="18" height="3" rx="1.5" fill="currentColor" />
    <rect x="3" y="8.8" width="18" height="3" rx="1.5" fill="currentColor" />
    <rect x="3" y="13.6" width="18" height="3" rx="1.5" fill="currentColor" opacity=".85" />
    <rect x="3" y="18.4" width="11" height="3" rx="1.5" fill="currentColor" opacity=".7" />
  </svg>
);

const FlutterwaveMark = (
  <svg viewBox="0 0 24 24" aria-hidden fill="none" strokeWidth="2.2">
    <ellipse cx="12" cy="12" rx="9" ry="5" transform="rotate(-35 12 12)" stroke="#F5A623" />
    <ellipse cx="12" cy="12" rx="9" ry="5" transform="rotate(35 12 12)" stroke="#F3A7C4" />
    <path d="M4.8 15.6c1.6 2.4 5 3.1 8.4 1.9" stroke="#1E9E4A" />
  </svg>
);

const TOOLS: Tool[] = [
  { name: "React Native", cat: "mobile", note: "cross-platform", color: "#61DAFB", icon: siReact },
  { name: "Flutter", cat: "mobile", note: "cross-platform", color: "#02569B", icon: siFlutter },
  { name: "Swift", cat: "mobile", note: "native iOS", color: "#F05138", icon: siSwift },
  { name: "SwiftUI", cat: "mobile", note: "declarative UI", color: "#0A84FF", icon: siSwift },
  { name: "Kotlin", cat: "mobile", note: "native Android", color: "#7F52FF", icon: siKotlin },
  { name: "Expo", cat: "mobile", note: "RN toolchain", color: "#1C2024", icon: siExpo },
  { name: "EAS", cat: "mobile", note: "builds & OTA", color: "#4630EB", icon: siExpo },
  { name: "CodePush", cat: "mobile", note: "live updates", color: "#0078D4", mark: <Mono t="CP" /> },

  { name: "React", cat: "web", note: "web apps", color: "#61DAFB", icon: siReact },
  { name: "TypeScript", cat: "web", note: "typed everything", color: "#3178C6", icon: siTypescript },
  { name: "JavaScript", cat: "web", note: "the web runtime", color: "#E8C600", icon: siJavascript },
  { name: "Node.js", cat: "web", note: "APIs & services", color: "#5FA04E", icon: siNodedotjs },
  { name: "Express", cat: "web", note: "HTTP layer", color: "#1C2024", icon: siExpress },
  { name: "Python", cat: "web", note: "data & scripts", color: "#3776AB", icon: siPython },
  { name: "Go", cat: "web", note: "fast services", color: "#00ADD8", icon: siGo },

  { name: "Paystack", cat: "fintech", note: "payments", color: "#09A5DB", mark: PaystackMark },
  { name: "Flutterwave", cat: "fintech", note: "payments", color: "#F5A623", mark: FlutterwaveMark },
  { name: "Mono", cat: "fintech", note: "open banking", color: "#182CD1", mark: <Mono t="M" /> },
  { name: "Okra", cat: "fintech", note: "open banking", color: "#1C2024", mark: <Mono t="O" /> },
  { name: "NIBSS", cat: "fintech", note: "interbank rails", color: "#1E8E3E", mark: <Mono t="N" /> },
  { name: "Firebase", cat: "fintech", note: "auth & push", color: "#DD2C00", icon: siFirebase },
  { name: "PostgreSQL", cat: "fintech", note: "ledger storage", color: "#4169E1", icon: siPostgresql },
];

const TABS: { key: Cat | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "mobile", label: "Mobile" },
  { key: "web", label: "Web & Backend" },
  { key: "fintech", label: "Fintech Infrastructure" },
];

export default function StackWall() {
  const [tab, setTab] = useState<Cat | "all">("all");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`hm-wall ${inView ? "run" : ""}`}>
      <div className="hm-wall-tabs" role="tablist" aria-label="Filter tools">
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            className={`hm-wall-tab ${tab === t.key ? "on" : ""}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
            <span>{t.key === "all" ? TOOLS.length : TOOLS.filter((x) => x.cat === t.key).length}</span>
          </button>
        ))}
      </div>

      <div className="hm-wall-grid">
        {TOOLS.map((t, i) => {
          const match = tab === "all" || tab === t.cat;
          return (
            <div
              key={t.name}
              className={`hm-tile ${match ? "" : "off"}`}
              style={{ ["--c" as string]: t.color, ["--i" as string]: i }}
              aria-hidden={!match}
            >
              <div className="hm-tile-glow" />
              <div className="hm-tile-ico">
                {t.icon ? (
                  <svg viewBox="0 0 24 24" aria-hidden>
                    <path d={t.icon.path} fill="currentColor" />
                  </svg>
                ) : (
                  t.mark
                )}
              </div>
              <div className="hm-tile-name">{t.name}</div>
              <div className="hm-tile-note">{t.note}</div>
            </div>
          );
        })}
        <Link to="/contact" className="hm-tile hm-tile-cta" style={{ ["--i" as string]: TOOLS.length }}>
          <div className="hm-tile-cta-plus">＋</div>
          <div>
            <div className="hm-tile-name">Your stack?</div>
            <div className="hm-tile-note">we adapt — let's talk →</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

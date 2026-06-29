import { useState, useEffect, useRef, useCallback } from "react";



/* ─── MASTER CANVAS: Algorithm / AI / Code background ──────── */
function AlgorithmCanvas({ dark = false }) {
  const ref = useRef(null);
  const raf = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const t = useRef(0);

  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    let W = (c.width = c.offsetWidth * devicePixelRatio);
    let H = (c.height = c.offsetHeight * devicePixelRatio);
    ctx.scale(devicePixelRatio, devicePixelRatio);
    let LW = c.offsetWidth, LH = c.offsetHeight;

    const TEAL = dark ? [0, 201, 167] : [0, 180, 150];
    const BLUE = dark ? [26, 143, 255] : [0, 120, 220];
    const BG = dark ? "rgba(8,15,30," : "rgba(242,244,248,";

    /* — Code snippets floating in BG — */
    const CODE_LINES = [
      "async transfer(from, to, ₦amt)",
      "wallet.debit(sender, amount)",
      "await kyvo.ledger.commit(txn)",
      "if (balance < amount) throw Error",
      "const neobank = new KyvoLab()",
      "kyvo.vtu.topup({ msisdn, plan })",
      "return { status: 'success', ref }",
      "await BVN.verify(userId)",
      "const hash = sha256(payload)",
      "emit('transfer:complete', txn)",
      "SELECT * FROM wallets LIMIT 100",
      "POST /api/v1/transfer HTTP/2",
      "Authorization: Bearer <token>",
      "Content-Type: application/json",
      "kyvo.compliance.runKYC(user)",
      "await redis.set(key, data, 3600)",
      "model.predict(creditScore)",
      "const jwt = sign(payload, secret)",
    ];

    /* — Nodes (particle mesh) — */
    const nodes = Array.from({ length: 55 }, (_, i) => ({
      x: Math.random() * LW, y: Math.random() * LH,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 2.2 + 0.6,
      hue: i % 3,  // 0=teal 1=blue 2=dim
      pulse: Math.random() * Math.PI * 2,
    }));

    /* — Code glyphs drifting upward — */
    const glyphs = Array.from({ length: 14 }, (_, i) => ({
      text: CODE_LINES[i % CODE_LINES.length],
      x: (LW / 14) * i + Math.random() * 40 - 20,
      y: Math.random() * LH,
      vy: -(0.18 + Math.random() * 0.25),
      op: 0.04 + Math.random() * 0.08,
      size: 9 + Math.random() * 4,
      phase: Math.random() * Math.PI * 2,
    }));

    /* — Scan lines — */
    const scanLines = Array.from({ length: 3 }, (_, i) => ({
      y: (LH / 3) * i + Math.random() * 100,
      vy: 0.4 + Math.random() * 0.3,
      op: 0.03 + Math.random() * 0.04,
    }));

    /* — Circuit path segments — */
    const circuits = Array.from({ length: 8 }, () => {
      const sx = Math.random() * LW;
      const sy = Math.random() * LH;
      const len = 3 + Math.floor(Math.random() * 4);
      const segs = [{ x: sx, y: sy }];
      let cx = sx, cy = sy;
      for (let i = 0; i < len; i++) {
        const dir = Math.floor(Math.random() * 4);
        const d = 40 + Math.random() * 80;
        if (dir === 0) cx += d; else if (dir === 1) cx -= d;
        else if (dir === 2) cy += d; else cy -= d;
        segs.push({ x: cx, y: cy });
      }
      return { segs, progress: Math.random(), speed: 0.003 + Math.random() * 0.004, op: 0.06 + Math.random() * 0.08, col: Math.random() > 0.5 ? TEAL : BLUE };
    });

    const onMouse = (e) => {
      const r = c.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    window.addEventListener("mousemove", onMouse);

    const draw = () => {
      t.current += 0.008;
      ctx.clearRect(0, 0, LW, LH);

      /* Background */
      ctx.fillStyle = dark ? "rgba(8,15,30,1)" : "rgba(242,244,248,1)";
      ctx.fillRect(0, 0, LW, LH);

      /* Animated gradient orbs */
      const orbs = [
        { x: LW * 0.75 + Math.sin(t.current * 0.4) * 60, y: LH * 0.2 + Math.cos(t.current * 0.3) * 40, r: 280, c: TEAL, op: dark ? 0.09 : 0.07 },
        { x: LW * 0.15 + Math.cos(t.current * 0.35) * 50, y: LH * 0.65 + Math.sin(t.current * 0.45) * 50, r: 220, c: BLUE, op: dark ? 0.07 : 0.055 },
        { x: LW * 0.5 + Math.sin(t.current * 0.25) * 80, y: LH * 0.85, r: 180, c: TEAL, op: dark ? 0.05 : 0.04 },
      ];
      orbs.forEach((o) => {
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, `rgba(${o.c.join(",")},${o.op})`);
        g.addColorStop(1, `rgba(${o.c.join(",")},0)`);
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2); ctx.fill();
      });

      /* Perspective grid */
      ctx.save();
      ctx.strokeStyle = dark ? `rgba(${TEAL.join(",")},0.04)` : `rgba(${BLUE.join(",")},0.06)`;
      ctx.lineWidth = 0.6;
      const gSpacing = 64;
      for (let x = 0; x < LW; x += gSpacing) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, LH); ctx.stroke(); }
      for (let y = 0; y < LH; y += gSpacing) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(LW, y); ctx.stroke(); }
      ctx.restore();

      /* Circuit traces */
      circuits.forEach((circ) => {
        circ.progress += circ.speed;
        if (circ.progress > 1) circ.progress = 0;
        const total = circ.segs.length - 1;
        const drawn = circ.progress * total;
        const full = Math.floor(drawn);
        const frac = drawn - full;
        ctx.strokeStyle = `rgba(${circ.col.join(",")},${circ.op})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.lineDashOffset = -t.current * 18;
        ctx.beginPath();
        ctx.moveTo(circ.segs[0].x, circ.segs[0].y);
        for (let i = 1; i <= full && i < circ.segs.length; i++) {
          ctx.lineTo(circ.segs[i].x, circ.segs[i].y);
        }
        if (full < total) {
          const a = circ.segs[full], b = circ.segs[full + 1];
          ctx.lineTo(a.x + (b.x - a.x) * frac, a.y + (b.y - a.y) * frac);
        }
        ctx.stroke();
        ctx.setLineDash([]);
        /* Node dot at current tip */
        const tip = full < total
          ? { x: circ.segs[full].x + (circ.segs[full + 1].x - circ.segs[full].x) * frac, y: circ.segs[full].y + (circ.segs[full + 1].y - circ.segs[full].y) * frac }
          : circ.segs[total];
        ctx.fillStyle = `rgba(${circ.col.join(",")},${circ.op * 3})`;
        ctx.beginPath(); ctx.arc(tip.x, tip.y, 3, 0, Math.PI * 2); ctx.fill();
      });

      /* Scan lines */
      scanLines.forEach((sl) => {
        sl.y += sl.vy;
        if (sl.y > LH + 2) sl.y = -2;
        const g = ctx.createLinearGradient(0, sl.y - 2, 0, sl.y + 2);
        g.addColorStop(0, `rgba(${TEAL.join(",")},0)`);
        g.addColorStop(0.5, `rgba(${TEAL.join(",")},${sl.op})`);
        g.addColorStop(1, `rgba(${TEAL.join(",")},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, sl.y - 2, LW, 4);
      });

      /* Particle mesh nodes */
      nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy; n.pulse += 0.02;
        if (n.x < 0) n.x = LW; if (n.x > LW) n.x = 0;
        if (n.y < 0) n.y = LH; if (n.y > LH) n.y = 0;
        /* Mouse repel */
        const dx = n.x - mouse.current.x, dy = n.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) { n.x += (dx / dist) * 1.2; n.y += (dy / dist) * 1.2; }
      });
      /* Draw connections */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            const op = (1 - d / 120) * (dark ? 0.35 : 0.2);
            const col = nodes[i].hue === 0 ? TEAL : BLUE;
            ctx.strokeStyle = `rgba(${col.join(",")},${op})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
          }
        }
      }
      /* Draw nodes */
      nodes.forEach((n) => {
        const col = n.hue === 0 ? TEAL : n.hue === 1 ? BLUE : (dark ? [40, 70, 110] : [150, 170, 200]);
        const pulse = Math.sin(n.pulse) * 0.4 + 0.6;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col.join(",")},${dark ? 0.85 : 0.65})`;
        ctx.fill();
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col.join(",")},0.04)`;
        ctx.fill();
      });

      /* Floating code glyphs */
      ctx.save();
      glyphs.forEach((g) => {
        g.y += g.vy;
        if (g.y < -20) { g.y = LH + 20; g.text = CODE_LINES[Math.floor(Math.random() * CODE_LINES.length)]; }
        const flicker = 0.85 + Math.sin(t.current * 2.5 + g.phase) * 0.15;
        ctx.font = `${g.size}px 'Fira Code', monospace`;
        ctx.fillStyle = dark
          ? `rgba(${TEAL.join(",")},${g.op * flicker})`
          : `rgba(${BLUE.join(",")},${g.op * flicker})`;
        ctx.fillText(g.text, g.x, g.y);
      });
      ctx.restore();

      raf.current = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(() => {
      LW = c.offsetWidth; LH = c.offsetHeight;
      c.width = LW * devicePixelRatio; c.height = LH * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    });
    ro.observe(c);
    draw();
    return () => { cancelAnimationFrame(raf.current); window.removeEventListener("mousemove", onMouse); ro.disconnect(); };
  }, [dark]);

  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />;
}

/* ─── SCROLL REVEAL ─────────────────────────────────────────── */
function Reveal({ children, delay = 0, x = 0 }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.08 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      transition: `opacity .8s ease ${delay}ms, transform .8s ease ${delay}ms`,
      opacity: v ? 1 : 0,
      transform: v ? "translate(0,0)" : `translate(${x}px, 24px)`,
    }}>
      {children}
    </div>
  );
}

/* ─── 3D MAGNETIC CARD ──────────────────────────────────────── */
function MagCard({ children, style = {}, className = "" }) {
  const ref = useRef(null);
  return (
    <div ref={ref} className={className} style={{ transformStyle: "preserve-3d", transition: "transform .15s ease", willChange: "transform", ...style }}
      onMouseMove={(e) => {
        const el = ref.current; if (!el) return;
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - .5) * 12;
        const y = ((e.clientY - r.top) / r.height - .5) * 12;
        el.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) translateZ(10px)`;
      }}
      onMouseLeave={() => { if (ref.current) ref.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)"; }}
    >
      {children}
    </div>
  );
}

/* ─── TYPED TEXT ─────────────────────────────────────────────── */
function Typed({ strings, speed = 60 }) {
  const [text, setText] = useState("");
  const [si, setSi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const cur = strings[si];
    const t = setTimeout(() => {
      if (!deleting) {
        setText(cur.slice(0, ci + 1));
        if (ci + 1 === cur.length) { setTimeout(() => setDeleting(true), 1800); }
        else setCi(ci + 1);
      } else {
        setText(cur.slice(0, ci - 1));
        if (ci - 1 === 0) { setDeleting(false); setSi((si + 1) % strings.length); setCi(0); }
        else setCi(ci - 1);
      }
    }, deleting ? speed * 0.4 : speed);
    return () => clearTimeout(t);
  }, [text, deleting, ci, si, strings, speed]);
  return <span>{text}<span style={{ animation: "blink 1s step-end infinite", borderRight: "2px solid #00C9A7", marginLeft: 1 }} /></span>;
}

/* ─── PHONE MOCKUP ──────────────────────────────────────────── */
function PhoneMockup({ p }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(145deg,${p.bg1},${p.bg2})`, position: "relative", overflow: "hidden" }}>
      <AlgorithmCanvas dark />
      {/* Phone shell */}
      <div style={{ width: 150, height: 292, borderRadius: 30, background: "#080F1E", border: "4px solid #1A2840", boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)", position: "relative", zIndex: 10, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* Notch */}
        <div style={{ height: 11, background: "#050C18", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "#1A2840" }} />
        </div>
        {/* App UI */}
        <div style={{ flex: 1, background: "#06101E", padding: "7px 7px 5px", display: "flex", flexDirection: "column", gap: 5 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 7, color: "#3A6080", fontFamily: "Fira Code, monospace", fontWeight: 600 }}>kyvo://home</div>
            <div style={{ fontSize: 7, color: p.ac, fontWeight: 700 }}>● LIVE</div>
          </div>
          {/* Balance card */}
          <div style={{ borderRadius: 11, padding: "9px 10px 8px", background: "linear-gradient(135deg,#0E2540,#071830)", border: `1px solid ${p.ac}22`, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${p.ac},#1A8FFF)` }} />
            <div style={{ fontSize: 6, color: "#1E4060", letterSpacing: 1, marginBottom: 2, fontFamily: "Fira Code, monospace" }}>WALLET_BALANCE</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", fontFamily: "Space Grotesk, sans-serif", letterSpacing: -0.5 }}>₦482,500</div>
            <div style={{ height: 2.5, borderRadius: 2, background: "#0A1628", marginTop: 6 }}>
              <div style={{ height: "100%", width: "72%", borderRadius: 2, background: `linear-gradient(90deg,${p.ac},#1A8FFF)` }} />
            </div>
          </div>
          {/* Actions */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
            {[{ l: "↑", t: "Send", c: p.ac }, { l: "↓", t: "Receive", c: "#1A8FFF" }, { l: "⚡", t: "VTU", c: p.ac }, { l: "···", t: "More", c: "#1A8FFF" }].map(a => (
              <div key={a.t} style={{ background: "#0A1828", borderRadius: 8, padding: "5px 3px", textAlign: "center", border: "1px solid #152030" }}>
                <div style={{ fontSize: 11, color: a.c, fontWeight: 700 }}>{a.l}</div>
                <div style={{ fontSize: 5.5, color: "#1E4060", marginTop: 1, fontFamily: "Fira Code, monospace" }}>{a.t}</div>
              </div>
            ))}
          </div>
          {/* Mini chart */}
          <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 34 }}>
            {[35, 55, 42, 65, 50, 72, 60].map((h, i) => (
              <div key={i} style={{ flex: 1, height: h * 0.47, borderRadius: "3px 3px 0 0", background: i === 6 ? `linear-gradient(180deg,${p.ac},${p.ac}44)` : `linear-gradient(180deg,#1A8FFF22,#1A8FFF08)` }} />
            ))}
          </div>
          {/* Transactions */}
          {[{ l: "Airtime", v: "-₦500", c: "#FF4D6D" }, { l: "Transfer in", v: "+₦15K", c: p.ac }].map(tx => (
            <div key={tx.l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#070F1C", borderRadius: 7, padding: "5px 7px", border: "1px solid #0E1E2E" }}>
              <span style={{ fontSize: 6.5, color: "#3A6080", fontFamily: "Fira Code, monospace" }}>{tx.l}</span>
              <span style={{ fontSize: 7.5, fontWeight: 700, color: tx.c }}>{tx.v}</span>
            </div>
          ))}
        </div>
        {/* Nav */}
        <div style={{ height: 28, background: "#040B14", display: "flex", alignItems: "center", justifyContent: "space-around", borderTop: "1px solid #0E1E2E" }}>
          {["⌂", "↕", "◎", "☰"].map((ic, i) => <span key={ic} style={{ fontSize: i === 0 ? 13 : 11, color: i === 0 ? p.ac : "#152030" }}>{ic}</span>)}
        </div>
      </div>
    </div>
  );
}

/* ─── DATA ──────────────────────────────────────────────────── */
const PROJECTS = [
  { id: 1, type: "Neobank", cat: "neobank", title: "SwiftBank", emoji: "🏦", ac: "#00C9A7", bg1: "#080F1E", bg2: "#0A1628",
    desc: "Full-featured digital bank for Nigerian SMEs — instant KYC, multi-currency wallets, real-time ledger.",
    full: "SwiftBank is a complete neobanking platform for Nigerian SMEs. Instant account creation with full CBN compliance, multi-currency wallets, real-time transaction processing, and embedded lending. 50,000+ daily active users at 99.9% uptime.",
    tags: ["NestJS", "React", "PostgreSQL", "Redis"],
    features: ["Instant account opening", "BVN/NIN verification", "Multi-currency wallets", "Real-time ledger engine", "Overdraft & credit scoring", "CBN compliance module", "In-app customer support", "Fraud detection engine"],
    metrics: [{ n: "50K+", l: "Daily active users" }, { n: "₦2.8B", l: "Monthly volume" }, { n: "99.9%", l: "Uptime SLA" }] },
  { id: 2, type: "MFB Platform", cat: "mfb", title: "CapitalMFB", emoji: "💼", ac: "#1A8FFF", bg1: "#060D1A", bg2: "#0A1628",
    desc: "Complete CBS for a licensed MFB — loans, savings, cooperative management, and automated CBN reporting.",
    full: "CapitalMFB is a complete core banking solution for Nigerian MFBs. Full lifecycle — savings, loans, fixed deposits, cooperative management — with automated CBN regulatory reports and real-time branch dashboards.",
    tags: ["Java Spring", "Angular", "Oracle DB", "Docker"],
    features: ["Core Banking System (CBS)", "Loan origination & approval", "Savings & fixed deposits", "Cooperative group lending", "Automated CBN reporting", "Multi-branch management", "Teller & vault operations", "GL & reconciliation engine"],
    metrics: [{ n: "12K+", l: "Active accounts" }, { n: "₦800M", l: "Loans disbursed" }, { n: "4", l: "Branches live" }] },
  { id: 3, type: "VTU Platform", cat: "vtu", title: "QuickTopup", emoji: "⚡", ac: "#00C9A7", bg1: "#06101C", bg2: "#08121E",
    desc: "White-label VTU aggregator — airtime, data, electricity, cable, betting for agents and consumers.",
    full: "QuickTopup is a scalable VTU aggregator integrating MTN, Glo, Airtel, 9Mobile, DSTV, PHCN, and betting platforms directly. Includes a merchant reseller portal with margin config, wallet management, and auto-reconciliation.",
    tags: ["Node.js", "Vue.js", "MySQL", "AWS"],
    features: ["Airtime & data top-up", "Electricity bill payment", "Cable TV subscription", "Betting wallet funding", "Merchant reseller portal", "Margin & pricing engine", "Automated reconciliation", "SMS & push notifications"],
    metrics: [{ n: "200K+", l: "Transactions/month" }, { n: "9", l: "Billers integrated" }, { n: "1.2s", l: "Avg response time" }] },
  { id: 4, type: "Fintech App", cat: "fintech", title: "PocketSend", emoji: "💸", ac: "#00C9A7", bg1: "#080F1E", bg2: "#060C18",
    desc: "P2P payment app with social features — split bills, request money, send to any bank instantly.",
    full: "PocketSend reimagines peer-to-peer payments with a social layer. Contact-based sending, group bill splits, shareable request links, and NIP integration with all Nigerian banks. Biometric auth with scheduled payments.",
    tags: ["Flutter", "Node.js", "MongoDB", "Firebase"],
    features: ["Instant NIP transfers", "Bill splitting with groups", "Money requests via link", "Scheduled payments", "Contact-based sending", "Transaction history feed", "In-app dispute resolution", "Biometric authentication"],
    metrics: [{ n: "30K+", l: "Downloads" }, { n: "4.7★", l: "App Store rating" }, { n: "₦1.2B", l: "P2P volume/month" }] },
  { id: 5, type: "Investment App", cat: "fintech", title: "YieldVault", emoji: "📈", ac: "#1A8FFF", bg1: "#060C18", bg2: "#080F1E",
    desc: "Retail investment platform — dollar savings, mutual funds, and treasury bills for everyday Nigerians.",
    full: "YieldVault democratises investing for Nigerians. Dollar savings, mutual funds, and government securities with FX conversion, portfolio tracking, and automated investment schedules. SEC compliant.",
    tags: ["React Native", "Python/Django", "PostgreSQL", "Celery"],
    features: ["Dollar savings wallet", "Mutual fund marketplace", "Treasury bill investment", "Auto-invest scheduler", "FX conversion engine", "Portfolio analytics", "Tax document generation", "SEC compliance module"],
    metrics: [{ n: "18K+", l: "Investors" }, { n: "$2.4M", l: "Assets under mgmt" }, { n: "12.4%", l: "Avg annual yield" }] },
  { id: 6, type: "Agency Banking", cat: "mfb", title: "AgentPlus", emoji: "🏪", ac: "#00C9A7", bg1: "#06101C", bg2: "#080F1E",
    desc: "Agency banking for last-mile financial access — deposits, withdrawals, account opening at agent points.",
    full: "AgentPlus extends banking to unbanked communities via a POS-like mobile app. Cash-in/out, account opening, BVN enrollment, utility payments with offline fallback. Agents earn real-time commissions.",
    tags: ["React Native", "Node.js", "PostgreSQL", "MQTT"],
    features: ["Cash deposit & withdrawal", "Account opening (KYC)", "BVN & NIN enrollment", "Utility & bill payments", "Agent commission tracking", "Offline transaction queue", "Real-time settlement", "GPS agent mapping"],
    metrics: [{ n: "2,400+", l: "Active agents" }, { n: "6", l: "States covered" }, { n: "₦4.2B", l: "Txns/month" }] },
  { id: 7, type: "Crypto Exchange", cat: "fintech", title: "CryptoEdge", emoji: "₿", ac: "#1A8FFF", bg1: "#080F1E", bg2: "#060C18",
    desc: "Regulated crypto OTC & trading desk — buy, sell, swap BTC/ETH/USDT with instant NGN settlement.",
    full: "CryptoEdge is a SEC-registered crypto exchange and OTC desk for Nigeria. Instant buy/sell with NGN settlement, P2P marketplace, and OTC desk for high-volume trades. Full KYC compliance.",
    tags: ["Next.js", "Go", "Redis", "Kubernetes"],
    features: ["Buy/sell BTC, ETH, USDT", "P2P trading marketplace", "OTC desk for large trades", "NGN instant settlement", "Wallet custody system", "SEC compliance reporting", "Price alert engine", "2FA & anti-phishing"],
    metrics: [{ n: "22K+", l: "Verified traders" }, { n: "$8.4M", l: "OTC volume/month" }, { n: "SEC", l: "Registered" }] },
  { id: 8, type: "BNPL / Lending", cat: "fintech", title: "PayLater NG", emoji: "🤝", ac: "#00C9A7", bg1: "#060C18", bg2: "#080F1E",
    desc: "Buy-now-pay-later and salary advance — instant AI credit decisions for Nigerian employees.",
    full: "PayLater NG delivers instant credit via AI scoring of payroll, bank statements, and behavioural data. Decisions in under 8 seconds. Repayment automated via direct salary deduction. CRC compliant.",
    tags: ["FastAPI", "React", "PostgreSQL", "TensorFlow"],
    features: ["AI credit scoring engine", "Instant loan decisioning", "Employer payroll integration", "Direct salary deduction", "BNPL checkout widget", "Debt collection module", "CRC bureau integration", "Loan portfolio dashboard"],
    metrics: [{ n: "₦2.1B", l: "Loans disbursed" }, { n: "94%", l: "Repayment rate" }, { n: "8 sec", l: "Decision time" }] },
];

const SERVICES = [
  { icon: "🏦", title: "Neobank & Digital Banking", desc: "End-to-end digital bank builds — account opening, KYC, core banking, lending, and CBN compliance.", tags: ["CBS", "KYC/AML", "CBN"] },
  { icon: "🏛️", title: "MFB Core Banking", desc: "Complete CBS for licensed MFBs — loans, savings, cooperative management, and automated CBN reporting.", tags: ["Core Banking", "Loans", "Reporting"] },
  { icon: "⚡", title: "VTU & Utility Platforms", desc: "Scalable VTU aggregators for airtime, data, bills and betting — white-label ready for any market.", tags: ["VTU", "Bill Payment", "Agents"] },
  { icon: "💳", title: "Fintech & Payment Apps", desc: "P2P payments, wallets, investment platforms, and embedded finance with modern mobile and web stacks.", tags: ["Mobile", "Payments", "Wallets"] },
  { icon: "📡", title: "Financial APIs & Infrastructure", desc: "Core financial APIs — ledger, reconciliation, FX, and transaction processing to power your fintech.", tags: ["REST APIs", "Webhooks", "SDKs"] },
  { icon: "🔐", title: "Compliance & Security", desc: "AML/KYC, fraud detection, biometric auth, and CBN/SEC regulatory reporting in every product we ship.", tags: ["AML", "Fraud", "BVN/NIN"] },
];

/* ─── CSS ───────────────────────────────────────────────────── */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500;600&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Inter',sans-serif;background:#F2F4F8;color:#080F1E;overflow-x:hidden}

@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes pulse{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}
@keyframes scanline{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
@keyframes glow{0%,100%{box-shadow:0 0 20px rgba(0,201,167,.2)}50%{box-shadow:0 0 40px rgba(0,201,167,.5),0 0 80px rgba(0,201,167,.15)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes slideIn{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}

/* GRADIENT TEXT */
.tg{background:linear-gradient(90deg,#00C9A7,#1A8FFF);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.tg2{background:linear-gradient(135deg,#00C9A7,#00E5C0);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

/* ── NAV ── */
.nav{
  position:fixed;top:0;left:0;right:0;z-index:200;height:68px;
  display:flex;align-items:center;justify-content:space-between;
  padding:0 52px;transition:all .4s;
}
.nav.on{
  background:rgba(242,244,248,.92);
  backdrop-filter:blur(24px) saturate(200%);
  border-bottom:1px solid rgba(0,201,167,.15);
  box-shadow:0 1px 40px rgba(8,15,30,.06);
}
.nav-logo{display:flex;align-items:center;gap:10px;cursor:pointer}
.nav-mark{
  width:38px;height:38px;border-radius:10px;
  background:linear-gradient(135deg,#080F1E,#0D1A2E);
  display:flex;align-items:center;justify-content:center;
  position:relative;border:1px solid rgba(0,201,167,.2);
  box-shadow:0 4px 20px rgba(0,201,167,.15);
}
.nav-dot{
  position:absolute;top:-3px;right:-3px;width:9px;height:9px;
  border-radius:50%;background:#00C9A7;border:2px solid #F2F4F8;
  animation:pulse 2.5s ease-in-out infinite;
}
.nav-wordmark{font-family:'Space Grotesk',sans-serif;font-size:20px;font-weight:700;color:#080F1E;letter-spacing:-.5px}
.nav-links{display:flex;align-items:center;gap:2px}
.nb{
  padding:8px 15px;border-radius:8px;
  font-size:13.5px;font-weight:500;color:#3A5070;
  cursor:pointer;background:none;border:none;
  font-family:'Inter',sans-serif;transition:all .2s;letter-spacing:-.1px;
}
.nb:hover,.nb.on{color:#080F1E;background:rgba(8,15,30,.07);font-weight:600}
.nav-cta{
  padding:10px 22px;border-radius:10px;
  background:#080F1E;color:#fff;
  font-size:13.5px;font-weight:700;border:none;cursor:pointer;
  font-family:'Space Grotesk',sans-serif;
  transition:all .25s;letter-spacing:-.2px;
  box-shadow:0 4px 20px rgba(8,15,30,.2);
}
.nav-cta:hover{background:linear-gradient(135deg,#00C9A7,#0D8FE0);transform:translateY(-2px);box-shadow:0 10px 30px rgba(0,201,167,.3)}

/* ── HERO ── */
.hero{
  min-height:100vh;position:relative;overflow:hidden;
  display:flex;align-items:center;background:#F2F4F8;
}
.hero-inner{
  max-width:1340px;margin:0 auto;width:100%;
  padding:130px 52px 80px;
  display:grid;grid-template-columns:1fr 1fr;gap:60px;
  align-items:center;position:relative;z-index:2;
}

/* Terminal window */
.terminal{
  background:rgba(8,15,30,.96);border-radius:16px;
  border:1px solid rgba(0,201,167,.18);
  box-shadow:0 40px 100px rgba(8,15,30,.25),0 0 0 1px rgba(0,201,167,.08) inset, 0 0 80px rgba(0,201,167,.06);
  overflow:hidden;animation:float 6s ease-in-out infinite;
}
.term-bar{
  height:38px;background:rgba(8,15,30,1);
  display:flex;align-items:center;gap:8px;padding:0 16px;
  border-bottom:1px solid rgba(0,201,167,.08);
}
.term-dot{width:11px;height:11px;border-radius:50%}
.term-title{margin-left:auto;font-family:'Fira Code',monospace;font-size:11px;color:rgba(0,201,167,.4);letter-spacing:.5px}
.term-body{padding:20px 22px;font-family:'Fira Code',monospace;font-size:12.5px;line-height:1.85}
.tc-dim{color:#1E4060}
.tc-teal{color:#00C9A7}
.tc-blue{color:#1A8FFF}
.tc-green{color:#4ADE80}
.tc-yellow{color:#FDE68A}
.tc-red{color:#FF4D6D}
.tc-white{color:#E2E8F0}
.tc-comment{color:#1E3A56;font-style:italic}
.term-cursor{display:inline-block;width:8px;height:14px;background:#00C9A7;vertical-align:middle;margin-left:3px;animation:blink 1s step-end infinite}

/* Floating stat cards */
.stat-card{
  position:absolute;border-radius:14px;
  background:rgba(255,255,255,.9);backdrop-filter:blur(16px);
  border:1px solid rgba(0,201,167,.15);
  padding:12px 18px;
  box-shadow:0 12px 40px rgba(8,15,30,.12);
  white-space:nowrap;
}
.stat-card-n{font-family:'Space Grotesk',sans-serif;font-size:22px;font-weight:700;background:linear-gradient(90deg,#00C9A7,#1A8FFF);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.stat-card-l{font-size:11px;color:#6A8DA8;font-weight:500;margin-top:2px}

/* Hero text */
.hero-eye{
  display:inline-flex;align-items:center;gap:8px;
  padding:5px 14px 5px 8px;border-radius:20px;
  background:rgba(8,15,30,.07);border:1px solid rgba(0,201,167,.2);
  font-size:11px;font-weight:600;color:#3A5070;
  letter-spacing:2px;text-transform:uppercase;
  margin-bottom:24px;width:fit-content;
  font-family:'Fira Code',monospace;
}
.hero-dot{width:6px;height:6px;border-radius:50%;background:#00C9A7;animation:pulse 2s ease-in-out infinite}
.hero-h1{
  font-family:'Space Grotesk',sans-serif;
  font-size:clamp(46px,6vw,80px);font-weight:700;
  line-height:1.02;letter-spacing:-2.5px;color:#080F1E;
  margin-bottom:22px;
}
.hero-sub{font-size:17px;color:#3A5070;line-height:1.78;max-width:480px;margin-bottom:40px;font-weight:400}
.hero-btns{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:48px}
.btn-p{
  padding:14px 30px;border-radius:11px;background:#080F1E;color:#fff;
  font-size:15px;font-weight:700;border:none;cursor:pointer;
  font-family:'Space Grotesk',sans-serif;transition:all .25s;
  box-shadow:0 8px 28px rgba(8,15,30,.22);letter-spacing:-.2px;
}
.btn-p:hover{background:linear-gradient(135deg,#00C9A7,#0D8FE0);transform:translateY(-3px);box-shadow:0 18px 48px rgba(0,201,167,.3)}
.btn-s{
  padding:14px 30px;border-radius:11px;
  background:rgba(8,15,30,.07);color:#080F1E;
  font-size:15px;font-weight:600;cursor:pointer;
  border:1.5px solid rgba(8,15,30,.12);
  font-family:'Space Grotesk',sans-serif;transition:all .25s;
}
.btn-s:hover{border-color:#00C9A7;color:#00C9A7;background:rgba(0,201,167,.04)}

/* Hero stats bar */
.hero-stats{display:flex;gap:36px;padding-top:36px;border-top:1px solid rgba(8,15,30,.08);flex-wrap:wrap}
.hs-n{font-family:'Space Grotesk',sans-serif;font-size:30px;font-weight:700;letter-spacing:-1px}
.hs-l{font-size:12px;color:#6A8DA8;margin-top:2px}

/* ── SECTION ── */
.sec{padding:110px 52px;position:relative;overflow:hidden}
.sec-in{max-width:1340px;margin:0 auto;position:relative;z-index:2}
.eyebrow{
  font-family:'Fira Code',monospace;font-size:11px;font-weight:600;
  letter-spacing:3px;text-transform:uppercase;color:#00C9A7;
  margin-bottom:14px;display:flex;align-items:center;gap:10px;
}
.eyebrow::before{content:'//';color:rgba(0,201,167,.4);font-size:13px}
.sec-h2{
  font-family:'Space Grotesk',sans-serif;
  font-size:clamp(34px,4vw,58px);font-weight:700;
  line-height:1.04;letter-spacing:-1.5px;color:#080F1E;margin-bottom:16px;
}
.sec-sub{font-size:17px;color:#3A5070;line-height:1.75;max-width:560px;font-weight:400}

/* ── SERVICES ── */
.svc-bg{background:#ECEEF4}
.svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:56px}
.svc-card{
  border-radius:20px;padding:30px;
  background:rgba(255,255,255,.8);backdrop-filter:blur(12px);
  border:1px solid rgba(8,15,30,.06);
  box-shadow:0 2px 20px rgba(8,15,30,.04);
  transition:all .35s;position:relative;overflow:hidden;cursor:default;
}
.svc-card::before{
  content:'';position:absolute;inset:0;border-radius:20px;
  background:linear-gradient(135deg,rgba(0,201,167,.04),rgba(26,143,255,.04));
  opacity:0;transition:opacity .3s;
}
.svc-card::after{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,#00C9A7,#1A8FFF);
  transform:scaleX(0);transform-origin:left;transition:transform .35s;
}
.svc-card:hover{transform:translateY(-7px);box-shadow:0 32px 72px rgba(8,15,30,.12);border-color:rgba(0,201,167,.25)}
.svc-card:hover::before{opacity:1}
.svc-card:hover::after{transform:scaleX(1)}
.svc-icon{
  width:50px;height:50px;border-radius:14px;
  background:linear-gradient(135deg,rgba(0,201,167,.1),rgba(26,143,255,.1));
  display:flex;align-items:center;justify-content:center;
  font-size:22px;margin-bottom:18px;
  border:1px solid rgba(0,201,167,.12);
}
.svc-title{font-family:'Space Grotesk',sans-serif;font-size:17px;font-weight:700;color:#080F1E;margin-bottom:9px;letter-spacing:-.3px}
.svc-desc{font-size:13.5px;color:#4A6A80;line-height:1.7}
.svc-tags{display:flex;flex-wrap:wrap;gap:5px;margin-top:16px}
.stag{padding:3px 9px;border-radius:5px;background:rgba(8,15,30,.06);font-size:10.5px;font-weight:600;color:#3A5070;font-family:'Fira Code',monospace}

/* ── PROJECTS ── */
.proj-sec{background:#F7F8FC}
.proj-filters{display:flex;gap:8px;margin-bottom:44px;flex-wrap:wrap}
.pf{
  padding:8px 20px;border-radius:9px;font-size:13px;font-weight:600;
  cursor:pointer;border:1.5px solid rgba(8,15,30,.1);
  background:white;color:#3A5070;transition:all .2s;
  font-family:'Space Grotesk',sans-serif;letter-spacing:-.2px;
}
.pf:hover{border-color:#080F1E;color:#080F1E;background:#F2F4F8}
.pf.on{background:#080F1E;color:white;border-color:#080F1E;box-shadow:0 4px 20px rgba(8,15,30,.2)}
.proj-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.pcard{
  border-radius:22px;overflow:hidden;background:white;
  border:1px solid rgba(8,15,30,.07);cursor:pointer;
  transition:all .35s;display:flex;flex-direction:column;
  box-shadow:0 2px 14px rgba(8,15,30,.04);
}
.pcard:hover{transform:translateY(-9px) scale(1.01);box-shadow:0 48px 100px rgba(8,15,30,.15);border-color:rgba(0,201,167,.25)}
.pcard-thumb{height:216px;position:relative;overflow:hidden}
.pcard-body{padding:22px;flex:1;display:flex;flex-direction:column}
.pcard-type{font-family:'Fira Code',monospace;font-size:10px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:#00C9A7;margin-bottom:7px}
.pcard-title{font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:700;color:#080F1E;margin-bottom:7px;letter-spacing:-.4px}
.pcard-desc{font-size:13px;color:#4A6A80;line-height:1.65;flex:1}
.pcard-foot{display:flex;align-items:center;justify-content:space-between;margin-top:16px;padding-top:14px;border-top:1px solid rgba(8,15,30,.06)}
.ptags{display:flex;gap:5px;flex-wrap:wrap}
.ptag{padding:3px 7px;border-radius:5px;background:#F0F2F6;font-size:10px;font-weight:500;color:#3A5070;font-family:'Fira Code',monospace}
.parr{width:34px;height:34px;border-radius:9px;background:#F0F2F6;display:flex;align-items:center;justify-content:center;font-size:14px;transition:all .25s;flex-shrink:0}
.pcard:hover .parr{background:#080F1E;color:white;transform:rotate(-45deg)}

/* ── MODAL ── */
.overlay{position:fixed;inset:0;z-index:300;background:rgba(8,15,30,.7);backdrop-filter:blur(16px);display:flex;align-items:center;justify-content:center;padding:24px;animation:fadeUp .2s ease}
.modal{background:white;border-radius:28px;max-width:960px;width:100%;max-height:90vh;overflow-y:auto;position:relative;animation:fadeUp .3s ease;box-shadow:0 80px 140px rgba(8,15,30,.4);border:1px solid rgba(0,201,167,.1)}
.modal-x{position:sticky;top:16px;float:right;margin:16px 16px 0 0;z-index:10;width:36px;height:36px;border-radius:10px;background:white;border:1px solid rgba(8,15,30,.1);cursor:pointer;font-size:16px;color:#3A5070;display:flex;align-items:center;justify-content:center;transition:all .2s;box-shadow:0 2px 8px rgba(8,15,30,.07)}
.modal-x:hover{background:#080F1E;color:white}
.modal-thumb{height:300px;border-radius:28px 28px 0 0;overflow:hidden;position:relative}
.modal-body{padding:44px}
.modal-type{font-family:'Fira Code',monospace;font-size:10.5px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:#00C9A7;margin-bottom:10px}
.modal-title{font-family:'Space Grotesk',sans-serif;font-size:38px;font-weight:700;color:#080F1E;margin-bottom:14px;letter-spacing:-1px}
.modal-desc{font-size:16px;color:#3A5070;line-height:1.82;margin-bottom:36px}
.modal-st{font-family:'Fira Code',monospace;font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#6A8DA8;margin-bottom:16px}
.modal-feats{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:36px}
.mfeat{display:flex;align-items:flex-start;gap:10px;padding:13px 15px;border-radius:12px;background:#F5F7FB;border:1px solid rgba(8,15,30,.06)}
.mcheck{width:18px;height:18px;border-radius:5px;background:linear-gradient(135deg,#00C9A7,#1A8FFF);display:flex;align-items:center;justify-content:center;font-size:10px;color:white;flex-shrink:0;margin-top:1px}
.mft{font-size:13px;color:#3A5070;font-weight:500}
.mstack{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:36px}
.mtag{padding:6px 14px;border-radius:8px;background:#080F1E;color:white;font-size:11.5px;font-weight:600;font-family:'Fira Code',monospace}
.mmetrics{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.mmet{padding:22px;border-radius:16px;background:linear-gradient(135deg,#F5F7FB,#EEF2F8);border:1px solid rgba(8,15,30,.07);text-align:center}
.mmet-n{font-family:'Space Grotesk',sans-serif;font-size:30px;font-weight:700;background:linear-gradient(90deg,#00C9A7,#1A8FFF);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.mmet-l{font-size:11.5px;color:#6A8DA8;margin-top:4px;font-weight:500}

/* ── REFERRAL (DARK) ── */
.ref-bg{background:#080F1E}
.ref-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
.ref-h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(34px,4vw,56px);font-weight:700;color:white;letter-spacing:-1.5px;margin-bottom:20px;line-height:1.04}
.ref-sub{font-size:16px;color:#2A5070;line-height:1.78;margin-bottom:38px}
.rstep{display:flex;gap:18px;padding-bottom:28px;position:relative}
.rline{position:absolute;left:19px;top:42px;bottom:0;width:1px;background:linear-gradient(180deg,rgba(0,201,167,.3),transparent)}
.rstep:last-child .rline{display:none}
.rnum{width:40px;height:40px;border-radius:11px;flex-shrink:0;background:linear-gradient(135deg,#00C9A7,#1A8FFF);display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:700;color:white;box-shadow:0 8px 24px rgba(0,201,167,.25)}
.rt{font-size:15px;font-weight:600;color:white;margin-bottom:4px;font-family:'Space Grotesk',sans-serif}
.rd{font-size:13px;color:#1E4060;line-height:1.65}

/* Referral card */
.rcard{
  background:#0C1828;border-radius:24px;
  border:1px solid rgba(0,201,167,.15);padding:36px;
  position:relative;overflow:hidden;
}
.rcard::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#00C9A7,#1A8FFF)}
.rpct{font-family:'Space Grotesk',sans-serif;font-size:90px;font-weight:700;background:linear-gradient(90deg,#00C9A7,#1A8FFF);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:.9;margin-bottom:8px}
.rpct-l{font-size:14px;color:#1E4060;margin-bottom:28px;font-family:'Fira Code',monospace}
.rexample{background:#060D18;border-radius:14px;padding:18px;margin-bottom:22px;border:1px solid rgba(0,201,167,.08)}
.rex-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(0,201,167,.05)}
.rex-row:last-child{border:none}
.rex-l{font-size:12.5px;color:#1E4060;font-family:'Fira Code',monospace}
.rex-v{font-size:13px;font-weight:700;color:white;font-family:'Space Grotesk',sans-serif}
.rex-v.earn{color:#00C9A7}
.rinput{width:100%;padding:12px 16px;border-radius:10px;background:#060D18;border:1px solid rgba(0,201,167,.12);color:white;font-size:14px;font-family:'Inter',sans-serif;outline:none;margin-bottom:10px;transition:border-color .2s}
.rinput::placeholder{color:#0E2A40}
.rinput:focus{border-color:#00C9A7;box-shadow:0 0 0 3px rgba(0,201,167,.08)}
.rsubmit{width:100%;padding:14px;border-radius:11px;background:linear-gradient(135deg,#00C9A7,#1A8FFF);color:white;font-size:15px;font-weight:700;border:none;cursor:pointer;font-family:'Space Grotesk',sans-serif;transition:all .2s;box-shadow:0 8px 28px rgba(0,201,167,.25)}
.rsubmit:hover{opacity:.9;transform:translateY(-2px);box-shadow:0 16px 40px rgba(0,201,167,.35)}

/* ── COMMISSION ── */
.comm-bg{background:#F0F3F8}
.comm-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:52px}
.ccard{border-radius:20px;border:1px solid rgba(8,15,30,.07);padding:28px;background:white;transition:all .3s;box-shadow:0 2px 12px rgba(8,15,30,.04)}
.ccard:hover{transform:translateY(-5px);box-shadow:0 28px 60px rgba(8,15,30,.1);border-color:rgba(0,201,167,.2)}
.cicon{width:46px;height:46px;border-radius:13px;background:linear-gradient(135deg,rgba(0,201,167,.1),rgba(26,143,255,.1));display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:14px;border:1px solid rgba(0,201,167,.1)}
.ct{font-family:'Space Grotesk',sans-serif;font-size:16px;font-weight:700;color:#080F1E;margin-bottom:8px;letter-spacing:-.3px}
.cd{font-size:13px;color:#4A6A80;line-height:1.65}
.ctotal{margin-top:48px;background:#080F1E;border-radius:22px;padding:48px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:32px;text-align:center;position:relative;overflow:hidden}
.ctotal::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#00C9A7,#1A8FFF)}
.ctn{font-family:'Space Grotesk',sans-serif;font-size:48px;font-weight:700;background:linear-gradient(90deg,#00C9A7,#1A8FFF);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-1px}
.ctl{font-size:13px;color:#1E4060;margin-top:6px;font-family:'Fira Code',monospace}
.ct-div{border-right:1px solid rgba(0,201,167,.1)}

/* ── CONTACT ── */
.cont-bg{background:#F7F8FC}
.cont-grid{display:grid;grid-template-columns:1fr 1.2fr;gap:80px;align-items:start}
.ci-item{display:flex;gap:14px;align-items:flex-start;margin-bottom:22px}
.ci-icon{width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,rgba(0,201,167,.1),rgba(26,143,255,.1));border:1px solid rgba(0,201,167,.12);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
.ci-lbl{font-family:'Fira Code',monospace;font-size:10.5px;font-weight:600;color:#6A8DA8;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:3px}
.ci-val{font-size:14.5px;font-weight:600;color:#080F1E}
.cform{background:white;border-radius:24px;border:1px solid rgba(8,15,30,.07);padding:44px;box-shadow:0 16px 50px rgba(8,15,30,.06)}
.frow{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.ff{display:flex;flex-direction:column;gap:6px;margin-bottom:14px}
.fl{font-size:13px;font-weight:600;color:#080F1E}
.fi{padding:12px 16px;border-radius:10px;border:1.5px solid rgba(8,15,30,.09);background:#F5F7FB;color:#080F1E;font-size:14px;font-family:'Inter',sans-serif;outline:none;transition:all .2s}
.fi:focus{border-color:#00C9A7;background:white;box-shadow:0 0 0 4px rgba(0,201,167,.08)}
.fta{resize:vertical;min-height:120px}
.fsub{width:100%;padding:15px;border-radius:12px;background:#080F1E;color:white;font-size:15px;font-weight:700;border:none;cursor:pointer;font-family:'Space Grotesk',sans-serif;transition:all .25s;margin-top:8px;box-shadow:0 8px 26px rgba(8,15,30,.2)}
.fsub:hover{background:linear-gradient(135deg,#00C9A7,#0D8FE0);transform:translateY(-2px);box-shadow:0 16px 40px rgba(0,201,167,.28)}

/* ── FOOTER ── */
.footer{background:#050B16;padding:72px 52px 32px}
.fi-in{max-width:1340px;margin:0 auto}
.fg{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px;margin-bottom:52px}
.fb-desc{font-size:14px;color:#1A3A56;line-height:1.72;margin:14px 0 20px;max-width:268px;font-weight:400}
.fsocs{display:flex;gap:9px}
.fsoc{width:36px;height:36px;border-radius:9px;background:#0A1828;border:1px solid rgba(0,201,167,.08);display:flex;align-items:center;justify-content:center;font-size:14px;cursor:pointer;transition:all .25s;color:#1E4060}
.fsoc:hover{background:linear-gradient(135deg,#00C9A7,#1A8FFF);color:white;border-color:transparent;transform:translateY(-2px)}
.fc-t{font-family:'Fira Code',monospace;font-size:10px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:#0E2A40;margin-bottom:18px}
.fc-links{display:flex;flex-direction:column;gap:10px}
.flnk{font-size:14px;color:#1A3A56;cursor:pointer;background:none;border:none;text-align:left;padding:0;font-family:'Inter',sans-serif;transition:color .2s}
.flnk:hover{color:#00C9A7}
.fbot{padding-top:28px;border-top:1px solid #0A1828;display:flex;align-items:center;justify-content:space-between}
.fcopy{font-size:12.5px;color:#0E2A40;font-family:'Fira Code',monospace}
.fblnks{display:flex;gap:22px}
.fblnk{font-size:12.5px;color:#0E2A40;cursor:pointer;background:none;border:none;font-family:'Fira Code',monospace;transition:color .2s}
.fblnk:hover{color:#00C9A7}

/* TOAST */
.toast{position:fixed;bottom:32px;right:32px;z-index:400;background:#080F1E;color:white;padding:15px 22px;border-radius:14px;font-size:14px;font-weight:600;box-shadow:0 20px 50px rgba(8,15,30,.4);display:flex;align-items:center;gap:10px;animation:slideIn .3s ease;border:1px solid rgba(0,201,167,.2);font-family:'Space Grotesk',sans-serif}

/* ── RESPONSIVE ── */
@media(max-width:1024px){
  .nav{padding:0 20px}
  .nav-links{display:none}
  .hero-inner{grid-template-columns:1fr;padding:100px 20px 60px}
  .hero-right-col{display:none}
  .sec{padding:72px 20px}
  .svc-grid,.proj-grid,.comm-grid{grid-template-columns:repeat(2,1fr)}
  .ref-grid,.cont-grid{grid-template-columns:1fr}
  .modal-feats,.mmetrics{grid-template-columns:1fr}
  .fg{grid-template-columns:1fr 1fr;gap:28px}
  .ctotal{grid-template-columns:1fr}
  .frow{grid-template-columns:1fr}
}
@media(max-width:640px){
  .svc-grid,.proj-grid,.comm-grid{grid-template-columns:1fr}
  .fg{grid-template-columns:1fr}
}
`;

/* ─── APP ──────────────────────────────────────────────────── */
export default function KyvoLab() {
  const [nav, setNav] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState("all");
  const [proj, setProj] = useState(null);
  const [toast, setToast] = useState(null);
  const [rForm, setRForm] = useState({ name: "", email: "", cname: "", cemail: "" });
  const [cForm, setCForm] = useState({ fn: "", ln: "", email: "", phone: "", svc: "", msg: "" });

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 20);
      const ids = ["home", "services", "projects", "referral", "commission", "contact"];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) { setNav(id); break; }
      }
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const showToast = (m) => { setToast(m); setTimeout(() => setToast(null), 3400); };
  const filtered = filter === "all" ? PROJECTS : PROJECTS.filter(p => p.cat === filter);

  const GT = ({ c }) => <span className="tg">{c}</span>;

  /* Logo component */
  const Logo = () => (
    <div className="nav-logo" onClick={() => go("home")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
      <div className="nav-mark">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="#00D4AA" /><stop offset="100%" stopColor="#1A8FFF" />
            </linearGradient>
          </defs>
          <rect x="4" y="4" width="4" height="16" rx="1.5" fill="url(#lg)" />
          <polygon points="8,12 8,4.5 18.5,4 14,12" fill="url(#lg)" opacity=".95" />
          <polygon points="8,12 8,19.5 18.5,20 14,12" fill="url(#lg)" opacity=".82" />
        </svg>
        <div className="nav-dot" />
      </div>
      <div className="nav-wordmark">Kyvo<GT c="Lab" /></div>
    </div>
  );

  return (
    <>
      <style>{G}</style>

      {/* ── NAV ── */}
      <nav className={`nav ${scrolled ? "on" : ""}`}>
        <Logo />
        <div className="nav-links">
          {["home", "services", "projects", "referral", "commission", "contact"].map(s => (
            <button key={s} className={`nb ${nav === s ? "on" : ""}`} onClick={() => go(s)}>
              {s[0].toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <button className="nav-cta" onClick={() => go("contact")}>Start a project →</button>
      </nav>

      {/* ── HERO ── */}
      <section id="home" className="hero">
        <AlgorithmCanvas />
        {/* Subtle overlay so text reads clearly */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(242,244,248,.85) 0%,rgba(242,244,248,.7) 50%,rgba(242,244,248,.4) 100%)", zIndex: 1 }} />

        <div className="hero-inner" style={{ position: "relative", zIndex: 2 }}>
          {/* Left */}
          <div>
            <div className="hero-eye" style={{ animation: "fadeUp .7s ease .1s both" }}>
              <div className="hero-dot" />
              <span style={{ fontFamily: "Fira Code, monospace" }}>kyvolab.init()</span>
            </div>
            <h1 className="hero-h1" style={{ animation: "fadeUp .7s ease .25s both" }}>
              We engineer<br /><GT c="fintech" /><br />that ships.
            </h1>
            <p className="hero-sub" style={{ animation: "fadeUp .7s ease .35s both" }}>
              Neobanks. MFB platforms. VTU apps. Payment infrastructure. Built from scratch by engineers who understand African fintech deeply.
            </p>
            <div className="hero-btns" style={{ animation: "fadeUp .7s ease .45s both" }}>
              <button className="btn-p" onClick={() => go("projects")}>See our work →</button>
              <button className="btn-s" onClick={() => go("contact")}>Talk to us</button>
            </div>
            <div className="hero-stats" style={{ animation: "fadeUp .7s ease .55s both" }}>
              {[{ n: "8+", l: "Products shipped" }, { n: "₦12B+", l: "Volume processed" }, { n: "3", l: "Countries" }, { n: "100%", l: "Client retention" }].map(s => (
                <div key={s.l}>
                  <div className="hs-n"><GT c={s.n} /></div>
                  <div className="hs-l">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Terminal window */}
          <div className="hero-right-col" style={{ animation: "fadeUp .8s ease .4s both", position: "relative" }}>
            <MagCard>
              <div className="terminal">
                <div className="term-bar">
                  <div className="term-dot" style={{ background: "#FF5F57" }} />
                  <div className="term-dot" style={{ background: "#FEBC2E" }} />
                  <div className="term-dot" style={{ background: "#28C840" }} />
                  <span className="term-title">kyvolab — neobank.service.ts</span>
                </div>
                <div className="term-body" style={{ fontSize: 12 }}>
                  <div><span className="tc-dim">01 </span><span className="tc-blue">import</span> <span className="tc-white">{"{ Injectable }"}</span> <span className="tc-blue">from</span> <span className="tc-green">'@nestjs/common'</span><span className="tc-dim">;</span></div>
                  <div><span className="tc-dim">02 </span><span className="tc-blue">import</span> <span className="tc-white">{"{ DataSource }"}</span> <span className="tc-blue">from</span> <span className="tc-green">'typeorm'</span><span className="tc-dim">;</span></div>
                  <div><span className="tc-dim">03 </span></div>
                  <div><span className="tc-dim">04 </span><span className="tc-teal">@Injectable</span><span className="tc-white">()</span></div>
                  <div><span className="tc-dim">05 </span><span className="tc-blue">export class</span> <span className="tc-yellow">NeoBankService</span> <span className="tc-white">{"{"}</span></div>
                  <div><span className="tc-dim">06 </span>  <span className="tc-blue">constructor</span><span className="tc-white">(</span></div>
                  <div><span className="tc-dim">07 </span>    <span className="tc-blue">private readonly</span> <span className="tc-white">walletSvc: </span><span className="tc-yellow">WalletService</span><span className="tc-dim">,</span></div>
                  <div><span className="tc-dim">08 </span>    <span className="tc-blue">private readonly</span> <span className="tc-white">db: </span><span className="tc-yellow">DataSource</span><span className="tc-dim">,</span></div>
                  <div><span className="tc-dim">09 </span>  <span className="tc-white">) {"{}"}</span></div>
                  <div><span className="tc-dim">10 </span></div>
                  <div><span className="tc-dim">11 </span>  <span className="tc-comment">{"// 🏦 atomic transfer with tx lock"}</span></div>
                  <div><span className="tc-dim">12 </span>  <span className="tc-blue">async</span> <span className="tc-teal">transfer</span><span className="tc-white">(from, to, ₦amt) {"{"}</span></div>
                  <div><span className="tc-dim">13 </span>    <span className="tc-blue">return await</span> <span className="tc-white">this.db.</span><span className="tc-teal">transaction</span><span className="tc-white">(</span><span className="tc-blue">async</span> <span className="tc-white">mgr {"=>"} {"{"}</span></div>
                  <div><span className="tc-dim">14 </span>      <span className="tc-blue">const</span> <span className="tc-white">s = </span><span className="tc-blue">await</span> <span className="tc-white">this.walletSvc.</span><span className="tc-teal">findWithLock</span><span className="tc-white">(from, mgr);</span></div>
                  <div><span className="tc-dim">15 </span>      <span className="tc-blue">if</span> <span className="tc-white">(s.balance {"<"} ₦amt) </span><span className="tc-blue">throw new</span> <span className="tc-yellow">BadRequestException</span><span className="tc-white">();</span></div>
                  <div><span className="tc-dim">16 </span>      <span className="tc-blue">await</span> <span className="tc-white">this.walletSvc.</span><span className="tc-teal">debit</span><span className="tc-white">(from, ₦amt, mgr);</span></div>
                  <div><span className="tc-dim">17 </span>      <span className="tc-blue">await</span> <span className="tc-white">this.walletSvc.</span><span className="tc-teal">credit</span><span className="tc-white">(to, ₦amt, mgr);</span></div>
                  <div><span className="tc-dim">18 </span>      <span className="tc-blue">return</span> <span className="tc-white">{"{ status: "}</span><span className="tc-green">'success'</span><span className="tc-white">{", ref: uuid() };"}</span></div>
                  <div><span className="tc-dim">19 </span>    <span className="tc-white">{"});"}</span></div>
                  <div><span className="tc-dim">20 </span>  <span className="tc-white">{"}"}</span></div>
                  <div><span className="tc-dim">21 </span><span className="tc-white">{"}"}</span></div>
                  <div style={{ marginTop: 8 }}>
                    <span className="tc-dim">▶ </span>
                    <span className="tc-teal">
                      <Typed strings={["Transfer committed — ₦50,000 in 1.2s", "✓ Wallet debited & credited atomically", "✓ 0 failed txns this session"]} speed={45} />
                    </span>
                  </div>
                </div>
              </div>
            </MagCard>

            {/* Floating stat cards */}
            <div className="stat-card" style={{ bottom: -18, left: -48, animation: "float 7s ease-in-out infinite" }}>
              <div className="stat-card-n">₦2.8B</div>
              <div className="stat-card-l">Monthly volume</div>
            </div>
            <div className="stat-card" style={{ top: -14, right: -36, animation: "float 9s ease-in-out 1s infinite" }}>
              <div style={{ fontFamily: "Fira Code, monospace", fontSize: 11, color: "#00C9A7", marginBottom: 3 }}>● status: active</div>
              <div className="stat-card-n" style={{ fontSize: 18 }}>99.9% uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="sec svc-bg">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.4 }}><AlgorithmCanvas /></div>
        <div style={{ position: "absolute", inset: 0, background: "rgba(236,238,244,.94)", zIndex: 1 }} />
        <div className="sec-in">
          <Reveal><div className="eyebrow">what we build</div></Reveal>
          <Reveal delay={80}><h2 className="sec-h2">Engineering-first<br /><GT c="fintech products" /></h2></Reveal>
          <Reveal delay={140}><p className="sec-sub">We don't just write code. We architect financial systems that scale, comply, and deliver real business value from day one.</p></Reveal>
          <div className="svc-grid">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 70}>
                <MagCard cls="svc-card">
                  <div className="svc-icon">{s.icon}</div>
                  <div className="svc-title">{s.title}</div>
                  <div className="svc-desc">{s.desc}</div>
                  <div className="svc-tags">{s.tags.map(t => <div key={t} className="stag">{t}</div>)}</div>
                </MagCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="sec proj-sec">
        <div className="sec-in">
          <Reveal><div className="eyebrow">portfolio</div></Reveal>
          <Reveal delay={80}><h2 className="sec-h2">Products we've<br /><GT c="shipped" /></h2></Reveal>
          <Reveal delay={140}><p className="sec-sub" style={{ marginBottom: 44 }}>Every project is a fully engineered, production-deployed financial product. Click any card to see full details.</p></Reveal>
          <Reveal delay={160}>
            <div className="proj-filters">
              {[["all", "All projects"], ["neobank", "Neobank"], ["mfb", "MFB / Core Banking"], ["vtu", "VTU"], ["fintech", "Fintech Apps"]].map(([v, l]) => (
                <button key={v} className={`pf ${filter === v ? "on" : ""}`} onClick={() => setFilter(v)}>{l}</button>
              ))}
            </div>
          </Reveal>
          <div className="proj-grid">
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={i * 50}>
                <div className="pcard" onClick={() => setProj(p)}>
                  <div className="pcard-thumb"><PhoneMockup p={p} /></div>
                  <div className="pcard-body">
                    <div className="pcard-type">{p.type}</div>
                    <div className="pcard-title">{p.title}</div>
                    <div className="pcard-desc">{p.desc}</div>
                    <div className="pcard-foot">
                      <div className="ptags">{p.tags.slice(0, 3).map(t => <div key={t} className="ptag">{t}</div>)}</div>
                      <div className="parr">→</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODAL ── */}
      {proj && (
        <div className="overlay" onClick={e => e.target === e.currentTarget && setProj(null)}>
          <div className="modal">
            <button className="modal-x" onClick={() => setProj(null)}>✕</button>
            <div className="modal-thumb"><PhoneMockup p={proj} /></div>
            <div className="modal-body">
              <div className="modal-type">{proj.type}</div>
              <div className="modal-title">{proj.title}</div>
              <div className="modal-desc">{proj.full}</div>
              <div className="modal-st">// key features</div>
              <div className="modal-feats">
                {proj.features.map(f => (
                  <div key={f} className="mfeat">
                    <div className="mcheck">✓</div>
                    <div className="mft">{f}</div>
                  </div>
                ))}
              </div>
              <div className="modal-st">// tech stack</div>
              <div className="mstack">{proj.tags.map(t => <div key={t} className="mtag">{t}</div>)}</div>
              <div className="modal-st">// product metrics</div>
              <div className="mmetrics">
                {proj.metrics.map(m => (
                  <div key={m.l} className="mmet">
                    <div className="mmet-n">{m.n}</div>
                    <div className="mmet-l">{m.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── REFERRAL ── */}
      <section id="referral" className="sec ref-bg">
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}><AlgorithmCanvas dark /></div>
        <div style={{ position: "absolute", inset: 0, background: "rgba(8,15,30,.88)", zIndex: 1 }} />
        <div className="sec-in" style={{ position: "relative", zIndex: 2 }}>
          <div className="ref-grid">
            <div>
              <Reveal><div className="eyebrow" style={{ color: "#00C9A7" }}>referral_program.init()</div></Reveal>
              <Reveal delay={80}><h2 className="ref-h2">Refer a client.<br /><GT c="Earn as they pay." /></h2></Reveal>
              <Reveal delay={140}><p className="ref-sub">Know a startup or company that needs a fintech product? Introduce them to us — and earn 5% of every payment they make to KyvoLab. Per payment. No cap.</p></Reveal>
              <div>
                {[
                  { n: "1", t: "You make an introduction", d: "Connect us with any company needing a neobank, MFB platform, VTU app, or any fintech product built." },
                  { n: "2", t: "We close and build it", d: "KyvoLab handles proposal, contracts, and full engineering end-to-end." },
                  { n: "3", t: "Client makes a payment", d: "Every time the client pays a milestone, invoice, or retainer to KyvoLab..." },
                  { n: "4", t: "5% hits your account", d: "Calculated on every payment, paid to you within 48hrs. No ceiling. Forever." },
                ].map((s, i) => (
                  <Reveal key={i} delay={i * 80}>
                    <div className="rstep">
                      <div className="rline" />
                      <div className="rnum">{s.n}</div>
                      <div><div className="rt">{s.t}</div><div className="rd">{s.d}</div></div>
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
                    ].map(r => (
                      <div key={r.l} className="rex-row">
                        <div className="rex-l">{r.l}</div>
                        <div className={`rex-v ${r.earn ? "earn" : ""}`}>{r.v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontFamily: "Fira Code, monospace", fontSize: 10, color: "rgba(0,201,167,.4)", letterSpacing: 2, marginBottom: 14, textTransform: "uppercase" }}>// submit referral</div>
                  <input className="rinput" placeholder="your_name" value={rForm.name} onChange={e => setRForm({ ...rForm, name: e.target.value })} />
                  <input className="rinput" placeholder="your_email" value={rForm.email} onChange={e => setRForm({ ...rForm, email: e.target.value })} />
                  <input className="rinput" placeholder="client_company" value={rForm.cname} onChange={e => setRForm({ ...rForm, cname: e.target.value })} />
                  <input className="rinput" placeholder="client_contact" value={rForm.cemail} onChange={e => setRForm({ ...rForm, cemail: e.target.value })} />
                  <button className="rsubmit" onClick={() => {
                    if (rForm.name && rForm.email && rForm.cname) { showToast("🎉 Referral submitted!"); setRForm({ name: "", email: "", cname: "", cemail: "" }); }
                    else showToast("⚠️ Please fill all fields.");
                  }}>kyvo.referral.submit() →</button>
                </div>
              </MagCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── COMMISSION ── */}
      <section id="commission" className="sec comm-bg">
        <div style={{ position: "absolute", inset: 0, opacity: 0.35 }}><AlgorithmCanvas /></div>
        <div style={{ position: "absolute", inset: 0, background: "rgba(240,243,248,.95)", zIndex: 1 }} />
        <div className="sec-in">
          <Reveal><div className="eyebrow">how you earn</div></Reveal>
          <Reveal delay={80}><h2 className="sec-h2">Your commission,<br /><GT c="decoded" /></h2></Reveal>
          <Reveal delay={140}><p className="sec-sub">No hidden terms. No thresholds. Every time your referred client pays KyvoLab, 5% routes directly to you — for the life of the contract.</p></Reveal>
          <div className="comm-grid">
            {[
              { icon: "💰", t: "Per-payment, not one-time", d: "5% on every payment — milestone 1, milestone 2, retainers. Every invoice your client sends to KyvoLab earns you 5%." },
              { icon: "♾️", t: "Zero ceiling", d: "No cap on earnings. Refer multiple clients, earn on all simultaneously. More clients = more passive income." },
              { icon: "⚡", t: "48-hour bank transfer", d: "Commission calculated when payment clears. Funds hit your bank account within 48 hours, every time." },
              { icon: "🔁", t: "Lifetime earnings", d: "As long as your referred client keeps paying KyvoLab — retainers, upgrades, new features — you keep earning." },
              { icon: "📊", t: "Real-time dashboard", d: "Track every client, every payment, and every commission earned in real time via your referral dashboard." },
              { icon: "🏆", t: "Performance bonuses", d: "3+ clients/quarter → 7%. 5+ clients → 10%. Top referrers get a rate upgrade, not just a thank you." },
            ].map((c, i) => (
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
              ].map(m => (
                <div key={m.l} className={m.div ? "ct-div" : ""}>
                  <div className="ctn">{m.n}</div>
                  <div className="ctl">{m.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="sec cont-bg">
        <div className="sec-in">
          <div className="cont-grid">
            <div>
              <Reveal><div className="eyebrow">get in touch</div></Reveal>
              <Reveal delay={80}><h2 className="sec-h2">Let's build your<br /><GT c="next product" /></h2></Reveal>
              <Reveal delay={140}><p className="sec-sub" style={{ marginBottom: 40 }}>Full spec or just an idea — we'll scope it, price it, and build it right. First call is free.</p></Reveal>
              {[
                { icon: "📧", label: "email", val: "officialolamide001@gmail.com" },
                { icon: "📱", label: "phone / whatsapp", val: "+234 903 601 8013" },
                { icon: "🌐", label: "website", val: "kyvolab.com" },
                { icon: "📸", label: "instagram", val: "@kyvo_lab" },
                { icon: "👥", label: "facebook", val: "kyvoLab" },
              ].map((item, i) => (
                <Reveal key={item.label} delay={i * 55}>
                  <div className="ci-item">
                    <div className="ci-icon">{item.icon}</div>
                    <div>
                      <div className="ci-lbl">{item.label}</div>
                      <div className="ci-val">{item.val}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={180}>
              <div className="cform">
                <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 22, fontWeight: 700, color: "#080F1E", marginBottom: 6, letterSpacing: -0.5 }}>Send us a message</div>
                <div style={{ fontFamily: "Fira Code, monospace", fontSize: 12, color: "#00C9A7", marginBottom: 28 }}>// response_time: {"<"} 24h</div>
                <div className="frow">
                  <div className="ff"><label className="fl">First name</label><input className="fi" placeholder="John" value={cForm.fn} onChange={e => setCForm({ ...cForm, fn: e.target.value })} /></div>
                  <div className="ff"><label className="fl">Last name</label><input className="fi" placeholder="Doe" value={cForm.ln} onChange={e => setCForm({ ...cForm, ln: e.target.value })} /></div>
                </div>
                <div className="frow">
                  <div className="ff"><label className="fl">Email</label><input className="fi" type="email" placeholder="john@company.com" value={cForm.email} onChange={e => setCForm({ ...cForm, email: e.target.value })} /></div>
                  <div className="ff"><label className="fl">Phone</label><input className="fi" placeholder="+234 800 000 0000" value={cForm.phone} onChange={e => setCForm({ ...cForm, phone: e.target.value })} /></div>
                </div>
                <div className="ff">
                  <label className="fl">What do you need built?</label>
                  <select className="fi" value={cForm.svc} onChange={e => setCForm({ ...cForm, svc: e.target.value })}>
                    <option value="">Select a service...</option>
                    <option>Neobank / Digital Bank</option>
                    <option>MFB Core Banking System</option>
                    <option>VTU / Utility Platform</option>
                    <option>Fintech / Payment App</option>
                    <option>Investment Platform</option>
                    <option>Financial API / Infrastructure</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="ff">
                  <label className="fl">Tell us about your project</label>
                  <textarea className="fi fta" placeholder="Describe what you're building, your timeline, budget range, and any relevant details..." value={cForm.msg} onChange={e => setCForm({ ...cForm, msg: e.target.value })} />
                </div>
                <button className="fsub" onClick={() => {
                  if (cForm.fn && cForm.email && cForm.msg) { showToast("✅ Message sent! We'll reply within 24hrs."); setCForm({ fn: "", ln: "", email: "", phone: "", svc: "", msg: "" }); }
                  else showToast("⚠️ Please fill the required fields.");
                }}>kyvo.contact.send() →</button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="fi-in">
          <div className="fg">
            <div>
              <Logo />
              <p className="fb-desc">KyvoLab engineers financial software for startups and enterprises across Africa. From concept to production — we build fintech that actually works.</p>
              <div className="fsocs">
                {["📸", "👥", "💼", "𝕏"].map((s, i) => <div key={i} className="fsoc">{s}</div>)}
              </div>
            </div>
            {[
              { t: "services", links: ["Neobank Platforms", "MFB Core Banking", "VTU Applications", "Fintech Apps", "Financial APIs"] },
              { t: "company", links: ["About KyvoLab", "Our projects", "Referral program", "Commission structure"] },
              { t: "contact", links: ["officialolamide001@gmail.com", "+234 903 601 8013", "@kyvo_lab", "kyvolab.com"] },
            ].map(col => (
              <div key={col.t}>
                <div className="fc-t">{col.t}</div>
                <div className="fc-links">{col.links.map(l => <button key={l} className="flnk">{l}</button>)}</div>
              </div>
            ))}
          </div>
          <div className="fbot">
            <div className="fcopy">// © 2025 KyvoLab — all rights reserved</div>
            <div className="fblnks">
              {["privacy_policy", "terms_of_service", "cookies"].map(l => <button key={l} className="fblnk">{l}</button>)}
            </div>
          </div>
        </div>
      </footer>

      {toast && <div className="toast">🔔 {toast}</div>}
    </>
  );
}
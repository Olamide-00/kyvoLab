import { useEffect, useRef } from "react";

const CODE_LINES = [
  "async transfer(from, to, ₦amt)",
  "wallet.debit(sender, amount)",
  "await kyvo.ledger.commit(txn)",
  "if (balance < amount) throw Error",
  "const studio = new KyvoLab()",
  "kyvo.build({ client, product })",
  "return { status: 'shipped' }",
  "await design.review(screens)",
  "const hash = sha256(payload)",
  "emit('release:tagged', build)",
  "git commit -m 'ship it'",
  "POST /api/v1/deploy HTTP/2",
  "Authorization: Bearer <token>",
  "Content-Type: application/json",
  "kyvo.qa.run(suite)",
  "await cache.set(key, data, 3600)",
  "figma.export(frame, '@3x')",
  "const build = sign(payload, key)",
];

type Props = {
  dark?: boolean;
  intensity?: "low" | "normal";
};

export default function AlgorithmCanvas({ intensity = "normal" }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const raf = useRef<number | null>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const t = useRef(0);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(devicePixelRatio || 1, 2);
    let LW = c.offsetWidth;
    let LH = c.offsetHeight;
    c.width = LW * dpr;
    c.height = LH * dpr;
    ctx.scale(dpr, dpr);

    const TEAL: [number, number, number] = [0, 217, 180];
    const BLUE: [number, number, number] = [47, 143, 255];

    const density = intensity === "low" ? 0.6 : 1;

    const nodeCount = Math.round(50 * density);
    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
      x: Math.random() * LW,
      y: Math.random() * LH,
      vx: (Math.random() - 0.5) * 0.26,
      vy: (Math.random() - 0.5) * 0.26,
      r: Math.random() * 2.1 + 0.6,
      hue: i % 3,
      pulse: Math.random() * Math.PI * 2,
    }));

    const glyphCount = Math.round(12 * density);
    const glyphs = Array.from({ length: glyphCount }, (_, i) => ({
      text: CODE_LINES[i % CODE_LINES.length],
      x: (LW / glyphCount) * i + Math.random() * 40 - 20,
      y: Math.random() * LH,
      vy: -(0.16 + Math.random() * 0.22),
      op: 0.045 + Math.random() * 0.07,
      size: 9 + Math.random() * 4,
      phase: Math.random() * Math.PI * 2,
    }));

    const scanLines = Array.from({ length: 2 }, (_, i) => ({
      y: (LH / 2) * i + Math.random() * 100,
      vy: 0.35 + Math.random() * 0.25,
      op: 0.025 + Math.random() * 0.03,
    }));

    const circuits = Array.from({ length: Math.round(7 * density) }, () => {
      const sx = Math.random() * LW;
      const sy = Math.random() * LH;
      const len = 3 + Math.floor(Math.random() * 4);
      const segs = [{ x: sx, y: sy }];
      let cx = sx,
        cy = sy;
      for (let i = 0; i < len; i++) {
        const dir = Math.floor(Math.random() * 4);
        const d = 40 + Math.random() * 80;
        if (dir === 0) cx += d;
        else if (dir === 1) cx -= d;
        else if (dir === 2) cy += d;
        else cy -= d;
        segs.push({ x: cx, y: cy });
      }
      return {
        segs,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
        op: 0.06 + Math.random() * 0.07,
        col: Math.random() > 0.5 ? TEAL : BLUE,
      };
    });

    const onMouse = (e: MouseEvent) => {
      const r = c.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    window.addEventListener("mousemove", onMouse);

    const draw = () => {
      t.current += 0.008;
      ctx.clearRect(0, 0, LW, LH);

      // faint grid
      ctx.strokeStyle = "rgba(255,255,255,0.025)";
      ctx.lineWidth = 1;
      const grid = 56;
      for (let x = 0; x < LW; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, LH);
        ctx.stroke();
      }
      for (let y = 0; y < LH; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(LW, y);
        ctx.stroke();
      }

      // circuits
      for (const cir of circuits) {
        cir.progress += cir.speed;
        if (cir.progress > 1.4) cir.progress = -0.2;
        const total = cir.segs.length - 1;
        const idx = Math.min(total - 1, Math.floor(Math.max(0, cir.progress) * total));
        ctx.strokeStyle = `rgba(${cir.col[0]},${cir.col[1]},${cir.col[2]},${cir.op})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        cir.segs.forEach((s, i) => (i === 0 ? ctx.moveTo(s.x, s.y) : ctx.lineTo(s.x, s.y)));
        ctx.stroke();
        if (idx >= 0 && idx < total) {
          const a = cir.segs[idx];
          const b = cir.segs[idx + 1];
          const localP = Math.max(0, cir.progress) * total - idx;
          const px = a.x + (b.x - a.x) * localP;
          const py = a.y + (b.y - a.y) * localP;
          ctx.fillStyle = `rgba(${cir.col[0]},${cir.col[1]},${cir.col[2]},${Math.min(1, cir.op * 6)})`;
          ctx.beginPath();
          ctx.arc(px, py, 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // glyphs
      ctx.font = "10px 'Fira Code', monospace";
      for (const g of glyphs) {
        g.y += g.vy;
        if (g.y < -20) g.y = LH + 20;
        const flick = 0.7 + 0.3 * Math.sin(t.current * 2 + g.phase);
        ctx.font = `${g.size}px 'Fira Code', monospace`;
        ctx.fillStyle = `rgba(0,217,180,${g.op * flick})`;
        ctx.fillText(g.text, g.x, g.y);
      }

      // scanlines
      for (const s of scanLines) {
        s.y += s.vy;
        if (s.y > LH + 40) s.y = -40;
        const grad = ctx.createLinearGradient(0, s.y - 40, 0, s.y + 40);
        grad.addColorStop(0, "rgba(47,143,255,0)");
        grad.addColorStop(0.5, `rgba(47,143,255,${s.op})`);
        grad.addColorStop(1, "rgba(47,143,255,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, s.y - 40, LW, 80);
      }

      // node mesh
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > LW) n.vx *= -1;
        if (n.y < 0 || n.y > LH) n.vy *= -1;
        const dx = mouse.current.x - n.x;
        const dy = mouse.current.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          n.x -= dx * 0.0018;
          n.y -= dy * 0.0018;
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i],
            b = nodes[j];
          const dx = a.x - b.x,
            dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const op = (1 - dist / 130) * 0.14;
            const col = a.hue === 2 || b.hue === 2 ? BLUE : TEAL;
            ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${op})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        n.pulse += 0.02;
        const pf = 0.7 + 0.3 * Math.sin(n.pulse);
        const col = n.hue === 2 ? BLUE : TEAL;
        ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${0.55 * pf})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf.current = requestAnimationFrame(draw);
    };
    raf.current = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => {
      LW = c.offsetWidth;
      LH = c.offsetHeight;
      c.width = LW * dpr;
      c.height = LH * dpr;
      ctx.scale(dpr, dpr);
    });
    ro.observe(c);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMouse);
      ro.disconnect();
    };
  }, [intensity]);

  return <canvas ref={ref} className="algo-canvas" />;
}

import CountUp from "./CountUp";
import "../styles/spec-screen.css";

export type SpecKind = "wallet" | "vtu" | "bank" | "loan" | "invest" | "crypto";

export default function SpecScreen({ kind }: { kind: SpecKind }) {
  switch (kind) {
    case "wallet":
      return (
        <div className="sv-scr">
          <div className="sv-scr-head">Hi, Tolu 👋</div>
          <div className="sv-scr-card grad">
            <span>Wallet balance</span>
            <b>
              <CountUp to={248500} prefix="₦" decimals={2} duration={1200} />
            </b>
            <div className="sv-scr-card-acts">
              <em>＋ Fund</em>
              <em>↗ Send</em>
            </div>
          </div>
          <div className="sv-scr-label">Recent</div>
          {[
            ["From Ada", "+₦25,000", "in"],
            ["MTN Airtime", "-₦2,000", "out"],
            ["Netflix", "-₦4,400", "out"],
          ].map(([n, v, d], i) => (
            <div
              key={n}
              className="sv-scr-txn"
              style={{ animationDelay: `${0.3 + i * 0.15}s` }}
            >
              <i className={d} />
              <span>{n}</span>
              <b className={d}>{v}</b>
            </div>
          ))}
        </div>
      );
    case "vtu":
      return (
        <div className="sv-scr">
          <div className="sv-scr-head">Buy airtime</div>
          <div className="sv-scr-nets">
            {["MTN", "Airtel", "Glo", "9mobile"].map((n, i) => (
              <span key={n} className={i === 0 ? "on" : ""}>
                {n}
              </span>
            ))}
          </div>
          <div className="sv-scr-input">0803 •••• 214</div>
          <div className="sv-scr-amts">
            {["₦100", "₦200", "₦500", "₦1,000", "₦2,000", "₦5,000"].map(
              (a, i) => (
                <span
                  key={a}
                  className={i === 3 ? "on" : ""}
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  {a}
                </span>
              ),
            )}
          </div>
          <div className="sv-scr-btn">Pay ₦1,000</div>
          <div className="sv-scr-success">✓ Airtime sent successfully</div>
        </div>
      );
    case "bank":
      return (
        <div className="sv-scr">
          <div className="sv-scr-head">Cards</div>
          <div className="sv-scr-vcard">
            <div className="sv-scr-vcard-chip" />
            <div className="sv-scr-vcard-num">5399 •••• •••• 4821</div>
            <div className="sv-scr-vcard-foot">
              <span>TOLU ADEYEMI</span>
              <span>09/29</span>
            </div>
          </div>
          <div className="sv-scr-label">Account</div>
          <div className="sv-scr-acct">
            <span>Savings · 2045 887 310</span>
            <b>
              <CountUp to={1204300} prefix="₦" duration={1200} />
            </b>
          </div>
          <div className="sv-scr-toggles">
            <span>
              Freeze card <i className="on" />
            </span>
            <span>
              Online payments <i />
            </span>
          </div>
        </div>
      );
    case "loan":
      return (
        <div className="sv-scr">
          <div className="sv-scr-head">Your loan</div>
          <div className="sv-scr-ring">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" className="track" />
              <circle cx="60" cy="60" r="50" className="bar" />
            </svg>
            <div>
              <b>65%</b>
              <span>repaid</span>
            </div>
          </div>
          {[
            ["Oct 01", "₦45,000", "paid"],
            ["Nov 01", "₦45,000", "paid"],
            ["Dec 01", "₦45,000", "due"],
          ].map(([d, v, s], i) => (
            <div
              key={d}
              className="sv-scr-txn"
              style={{ animationDelay: `${0.4 + i * 0.15}s` }}
            >
              <i className={s === "paid" ? "in" : "due"} />
              <span>{d}</span>
              <b className={s === "paid" ? "in" : ""}>{v}</b>
            </div>
          ))}
        </div>
      );
    case "invest":
      return (
        <div className="sv-scr">
          <div className="sv-scr-head">Portfolio</div>
          <div className="sv-scr-port">
            <b>
              <CountUp to={3420000} prefix="₦" duration={1200} />
            </b>
            <span className="up">▲ 12.4% this month</span>
          </div>
          <svg viewBox="0 0 200 90" className="sv-scr-line" aria-hidden>
            <defs>
              <linearGradient id="svInvFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ADE80" stopOpacity=".35" />
                <stop offset="100%" stopColor="#4ADE80" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              className="fill"
              d="M0 70 L25 62 L50 66 L75 48 L100 52 L125 34 L150 38 L175 18 L200 12 L200 90 L0 90 Z"
            />
            <path
              className="stroke"
              d="M0 70 L25 62 L50 66 L75 48 L100 52 L125 34 L150 38 L175 18 L200 12"
            />
          </svg>
          <div className="sv-scr-tabs">
            {["1D", "1W", "1M", "1Y"].map((t) => (
              <span key={t} className={t === "1M" ? "on" : ""}>
                {t}
              </span>
            ))}
          </div>
        </div>
      );
    case "crypto":
      return (
        <div className="sv-scr">
          <div className="sv-scr-head">Swap</div>
          <div className="sv-scr-swap">
            <span>You pay</span>
            <div>
              <b>0.015</b>
              <em>BTC</em>
            </div>
          </div>
          <div className="sv-scr-swap-ico">⇅</div>
          <div className="sv-scr-swap">
            <span>You receive</span>
            <div>
              <b>1,012.40</b>
              <em>USDT</em>
            </div>
          </div>
          <div className="sv-scr-rate">1 BTC ≈ 67,493 USDT · fee 0.1%</div>
          <div className="sv-scr-btn">Swap now</div>
        </div>
      );
  }
}

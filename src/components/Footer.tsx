import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="fi-in">
        <div className="fg">
          <div>
            <Link to="/" className="nav-logo">
              <div className="nav-mark">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <linearGradient id="lgf" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
                      <stop offset="0%" stopColor="#00D9B4" />
                      <stop offset="100%" stopColor="#2F8FFF" />
                    </linearGradient>
                  </defs>
                  <rect x="4" y="4" width="4" height="16" rx="1.5" fill="url(#lgf)" />
                  <polygon points="8,12 8,4.5 18.5,4 14,12" fill="url(#lgf)" opacity=".95" />
                  <polygon points="8,12 8,19.5 18.5,20 14,12" fill="url(#lgf)" opacity=".82" />
                </svg>
                <div className="nav-dot" />
              </div>
              <div className="nav-wordmark">
                Kyvo<span className="tg">Lab</span>
              </div>
            </Link>
            <p className="fb-desc">
              KyvoLab designs and engineers fintech products for startups across Africa — from
              brand identity through to a shipped, production interface.
            </p>
            <div className="fsocs">
              <a className="fsoc" href="https://instagram.com/kyvo_lab" target="_blank" rel="noreferrer" aria-label="Instagram">IG</a>
              <a className="fsoc" href="#" target="_blank" rel="noreferrer" aria-label="Facebook">FB</a>
              <a className="fsoc" href="mailto:officialolamide001@gmail.com" aria-label="Email">✉</a>
            </div>
          </div>

          <div>
            <div className="fc-t">navigate</div>
            <div className="fc-links">
              <Link className="flnk" to="/services">Services</Link>
              <Link className="flnk" to="/work">Our projects</Link>
              <Link className="flnk" to="/referral">Referral program</Link>
              <Link className="flnk" to="/commission">Commission structure</Link>
            </div>
          </div>

          <div>
            <div className="fc-t">work</div>
            <div className="fc-links">
              <Link className="flnk" to="/work/depay">DePay</Link>
              <Link className="flnk" to="/work/jaan">Jaan</Link>
              <Link className="flnk" to="/work/swiftpay">SwiftPay</Link>
            </div>
          </div>

          <div>
            <div className="fc-t">contact</div>
            <div className="fc-links">
              <a className="flnk" href="mailto:officialolamide001@gmail.com">officialolamide001@gmail.com</a>
              <a className="flnk" href="tel:+2349036018013">+234 903 601 8013</a>
              <a className="flnk" href="https://instagram.com/kyvo_lab" target="_blank" rel="noreferrer">@kyvo_lab</a>
            </div>
          </div>
        </div>

        <div className="fbot">
          <div className="fcopy">// © {new Date().getFullYear()} KyvoLab — all rights reserved</div>
          <div className="fblnks">
            <span className="fblnk">privacy_policy</span>
            <span className="fblnk">terms_of_service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

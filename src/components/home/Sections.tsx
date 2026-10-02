import Link from "next/link";
import {
  FaPhoneVolume, FaWhatsapp, FaEnvelope, FaCarSide, FaCircleCheck, FaMobileScreen, FaApple, FaGooglePlay,
  FaLocationDot,
} from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";
import Slogan from "@/components/ui/Slogan";
import Counter from "@/components/ui/Counter";
import SectionHead from "@/components/ui/SectionHead";
import { Icon } from "@/components/ui/Icons";
import VehicleArt from "@/components/ui/VehicleArt";
import { SITE, STATS, telLink, waLink, DEFAULT_WA_TEXT } from "@/data/site";
import { WHY, APP_FEATURES } from "@/data/content";
import { FOCUS_STATES, OTHER_REGIONS, citiesIn } from "@/data/areas";

const ROUTES = [
  "Bangalore → Ooty", "Bangalore → Chennai", "Bangalore → Mysuru", "Bangalore → Coimbatore", "Bangalore → Kodaikanal",
  "Bangalore → Tirupati", "Bangalore → Madurai", "Bangalore Airport", "Attibele → Hosur", "Temple Tours",
];

export function RouteMarquee() {
  const items = [...ROUTES, ...ROUTES];
  return (
    <div className="marquee" aria-label="Popular routes">
      <div className="marquee-track">
        {items.map((r, i) => (
          <span className="marquee-item" key={i}>
            <FaCarSide size={18} /> {r}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ContactStrip() {
  return (
    <section className="wrap">
      <Reveal className="strip" dir="zoom">
        <div style={{ position: "relative" }}>
          <span className="eyebrow" style={{ color: "var(--gold)" }}>Quick Booking</span>
          <h2 style={{ marginTop: 12 }}>Need help booking?</h2>
          <p>Speak with our travel experts and get assistance choosing the right vehicle and trip plan.</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 24 }}>
            <a href={telLink} className="btn btn-gold"><FaPhoneVolume /> Call Now</a>
            <a href={waLink(DEFAULT_WA_TEXT)} target="_blank" rel="noopener" className="btn btn-wa"><FaWhatsapp size={18} /> WhatsApp Us</a>
          </div>
        </div>
        <div className="strip-list" style={{ position: "relative" }}>
          <a href={telLink}>
            <i><FaPhoneVolume /></i>
            <div><small>Phone</small><b>{SITE.phoneDisplay}</b></div>
          </a>
          <a href={waLink(DEFAULT_WA_TEXT)} target="_blank" rel="noopener">
            <i style={{ color: "#128c4b" }}><FaWhatsapp size={20} /></i>
            <div><small>WhatsApp</small><b>{SITE.phoneDisplay}</b></div>
          </a>
          <a href={`mailto:${SITE.email}`}>
            <i><FaEnvelope /></i>
            <div><small>Email</small><b>{SITE.email}</b></div>
          </a>
        </div>
        <svg className="strip-deco" viewBox="0 0 64 64" aria-hidden="true">
          <path d="M32 4C19.8 4 10 13.6 10 25.6 10 41 32 60 32 60s22-19 22-34.4C54 13.6 44.2 4 32 4z" fill="#fff" />
        </svg>
      </Reveal>
    </section>
  );
}

/** Home "Service Areas" — internal links to every city landing page. */
export function ServiceAreas() {
  return (
    <section className="sec" id="service-areas">
      <div className="wrap">
        <SectionHead
          eyebrow="Service Areas"
          title={<>Cab service <em>all over India</em></>}
          text="Strongest across Tamil Nadu, Kerala and Karnataka — one-way drops, round trips, tours and airport cabs in every major city, and outstation trips to any state."
        />
        <div className="area-states">
          {FOCUS_STATES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 100} className="area-state">
              <h3><FaLocationDot /> {s.name}</h3>
              <p>{s.text}</p>
              <ul className="area-links">
                {citiesIn(s.name).map((c) => (
                  <li key={c.slug}><Link href={`/taxi-service/${c.slug}`}>{c.name}</Link></li>
                ))}
              </ul>
            </Reveal>
          ))}
          <Reveal delay={300} className="area-state area-state-dark">
            <h3><FaCarSide /> Rest of India</h3>
            <p>Pondicherry, Tirupati and interstate trips to {OTHER_REGIONS.slice(1, 6).join(", ")} and beyond.</p>
            <Link href="/taxi-service" className="btn btn-gold btn-sm" style={{ marginTop: 16 }}>All service areas</Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function WhyChoose() {
  return (
    <section className="sec sec-alt">
      <div className="wrap">
        <SectionHead eyebrow="Why Choose Master Drop Taxi" title={<>Why travel <em>with us?</em></>} text="Everything you need for a smooth ride — from the first message to the final drop." />
        <div className="why-grid">
          {WHY.map((w, i) => (
            <Reveal key={w.title} className="why" delay={(i % 4) * 90}>
              {w.soon && <span className="chip soon">Coming Soon</span>}
              <div className="ic"><Icon name={w.icon} size={24} /></div>
              <h4>{w.title}</h4>
              <p>{w.text}</p>
              <span className="num">0{i + 1}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StatsBand() {
  return (
    <section className="wrap" style={{ marginTop: "var(--sec)" }}>
      <Reveal className="stats" dir="zoom">
        <div className="stats-grid">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <b><Counter to={s.value} suffix={s.suffix} /></b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
        <svg className="road-bg" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true">
          <line x1="0" y1="30" x2="1200" y2="30" stroke="#c9a266" strokeWidth="4" className="road-dash" />
        </svg>
      </Reveal>
    </section>
  );
}

export function ComingSoonApp() {
  return (
    <section className="sec">
      <div className="wrap app">
        <Reveal dir="left" style={{ position: "relative", padding: "30px 0" }}>
          <div className="phone">
            <div className="orbit" />
            <div className="phone-notch" />
            <div className="phone-screen">
              <svg viewBox="0 0 250 520" width="100%" height="100%" aria-hidden="true">
                <rect width="250" height="520" fill="#e9f2f5" />
                {Array.from({ length: 9 }).map((_, i) => (
                  <path key={i} d={`M0,${60 + i * 50} L250,${40 + i * 50}`} stroke="#fff" strokeWidth="10" />
                ))}
                {Array.from({ length: 5 }).map((_, i) => (
                  <path key={`v${i}`} d={`M${30 + i * 55},0 L${45 + i * 55},520`} stroke="#fff" strokeWidth="8" />
                ))}
                <path className="map-path" d="M50,380 C60,300 150,320 160,240 S120,120 190,90" stroke="#2f6b82" strokeWidth="6" fill="none" strokeLinecap="round" />
                <circle cx="50" cy="380" r="9" fill="#25d366" stroke="#fff" strokeWidth="3" />
                <g transform="translate(190 72)" style={{ animation: "float 2.4s ease-in-out infinite" }}>
                  <path d="M0,-18 C-10,-18 -16,-10 -16,-2 C-16,10 0,22 0,22 C0,22 16,10 16,-2 C16,-10 10,-18 0,-18Z" fill="#e5484d" />
                  <circle cy="-3" r="6" fill="#fff" />
                </g>
              </svg>
              <div className="phone-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <small style={{ color: "var(--ink-soft)" }}>Driver arriving in</small>
                    <br />
                    <b>6 min</b>
                  </div>
                  <span className="chip teal">Live</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
                  <div style={{ width: 70 }}><VehicleArt shape="sedan" color="#2f6b82" /></div>
                  <div style={{ fontSize: 11.5 }}>
                    Sedan • TN 47 XX 0000
                    <br />
                    <span style={{ color: "var(--gold-deep)" }}>Driver details shared</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal dir="right">
          <span className="eyebrow">Coming Soon</span>
          <h2 className="h-sec" style={{ marginTop: 14 }}>The Master Drop Taxi <em>app</em></h2>
          <p className="muted" style={{ marginTop: 16, fontSize: 17 }}>
            Book, track and share your trip from your phone. Our customer and driver apps are on the way — until then, booking by website, phone or WhatsApp works 24/7.
          </p>
          <ul className="app-list">
            {APP_FEATURES.customer.slice(0, 8).map((f) => (
              <li key={f}><FaCircleCheck /> {f}</li>
            ))}
          </ul>
          <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
            <span className="btn btn-ink" aria-disabled="true"><FaGooglePlay /> Google Play — Soon</span>
            <span className="btn btn-ghost" aria-disabled="true"><FaApple size={18} /> App Store — Soon</span>
          </div>
          <p className="hint" style={{ marginTop: 14 }}><FaMobileScreen /> Features shown are planned and will be marked live when released.</p>
        </Reveal>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="wrap" style={{ marginTop: "var(--sec)" }}>
      <Reveal className="cta" dir="zoom">
        <div className="hero-blob" style={{ background: "#2f6b82", left: "-15%", top: "-40%", width: 420, height: 420 }} />
        <div className="hero-blob" style={{ background: "#c9a266", right: "-15%", bottom: "-50%", width: 420, height: 420, animationDelay: "-6s" }} />
        <span className="eyebrow" style={{ position: "relative" }}><FaLocationDot /> Attibele • Bangalore • Beyond</span>
        <h2 style={{ marginTop: 16 }}>Ready when <em>you are.</em></h2>
        <p>One call or one WhatsApp message — we&apos;ll help you choose the right vehicle and share your estimate in minutes.</p>
        <div className="btns">
          <a href={telLink} className="btn btn-gold"><FaPhoneVolume /> {SITE.phoneDisplay}</a>
          <a href={waLink(DEFAULT_WA_TEXT)} target="_blank" rel="noopener" className="btn btn-wa"><FaWhatsapp size={18} /> WhatsApp Us</a>
          <Link href="/#estimate" className="btn btn-glass">Get Estimate</Link>
        </div>
        <Slogan />
      </Reveal>
    </section>
  );
}

import Link from "next/link";
import { FaPhoneVolume, FaWhatsapp, FaEnvelope, FaLocationDot, FaClock } from "react-icons/fa6";
import { SITE, telLink, waLink, DEFAULT_WA_TEXT } from "@/data/site";
import VehicleArt from "@/components/ui/VehicleArt";
import Slogan from "@/components/ui/Slogan";
import { TOP_CITIES } from "@/data/areas";

const QUICK = [
  ["/", "Home"], ["/services", "Services"], ["/plans", "Plans"], ["/about", "About Us"], ["/contact", "Contact Us"], ["/taxi-service", "Service Areas"], ["/faq", "FAQ"],
];
const SERVICES = [
  ["Local Taxi", "local"], ["One Way", "one-way"], ["Round Trip", "round-trip"], ["Outstation", "outstation"],
  ["Tours", "tours"], ["Temple Tours", "temple"], ["Airport Transfer", "airport"], ["Railway Transfer", "railway"],
];
const POLICIES = [
  ["terms", "Terms & Conditions"], ["privacy", "Privacy Policy"], ["cancellation", "Cancellation Policy"],
  ["refund", "Refund Policy"], ["luggage", "Luggage Policy"], ["pet", "Pet Travel Policy"], ["cookies", "Cookie Policy"],
];

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="ftr-road" aria-hidden="true">
        <div className="ftr-car">
          <VehicleArt shape="sedan" color="#2F6B82" beam />
        </div>
      </div>
      <div className="wrap">
        <div className="ftr-grid">
          <div className="ftr-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SITE.logo} alt={SITE.name} width={192} height={64} />
            <Slogan className="slogan-sm" />
            <p>{SITE.description}</p>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <a href={telLink} className="btn btn-teal btn-sm"><FaPhoneVolume /> Call</a>
              <a href={waLink(DEFAULT_WA_TEXT)} target="_blank" rel="noopener" className="btn btn-wa btn-sm"><FaWhatsapp /> WhatsApp</a>
            </div>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>{QUICK.map(([h, l]) => <li key={h}><Link href={h}>{l}</Link></li>)}</ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>{SERVICES.map(([l, id]) => <li key={id}><Link href={`/services#${id}`}>{l}</Link></li>)}</ul>
          </div>
          <div>
            <h4>Policies</h4>
            <ul>{POLICIES.map(([s, l]) => <li key={s}><Link href={`/policies/${s}`}>{l}</Link></li>)}</ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul className="ftr-contact">
              <li><FaPhoneVolume /><a href={telLink}>{SITE.phoneDisplay}</a></li>
              <li><FaWhatsapp /><a href={waLink(DEFAULT_WA_TEXT)} target="_blank" rel="noopener">{SITE.phoneDisplay}</a></li>
              <li><FaEnvelope /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><FaLocationDot /><span>{SITE.address}</span></li>
              <li><FaClock /><span>{SITE.hours}</span></li>
            </ul>
          </div>
        </div>
        <nav className="ftr-cities" aria-label="Taxi service locations">
          <b>Taxi service in:</b>
          {TOP_CITIES.map((c) => (
            <Link key={c.slug} href={`/taxi-service/${c.slug}`}>{c.name}</Link>
          ))}
          <Link href="/taxi-service">All over India →</Link>
        </nav>
        <div className="ftr-bottom">
          <span>© {new Date().getFullYear()} {SITE.name}. All Rights Reserved.</span>
          <span className="ftr-tagline">Book at your <mark>fingertip</mark>, cab at your <mark>doorstep</mark></span>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { FaPhoneVolume, FaWhatsapp, FaEnvelope, FaLocationDot, FaClock } from "react-icons/fa6";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "./ContactForm";
import { SITE, telLink, waLink, DEFAULT_WA_TEXT } from "@/data/site";
import { CONTACT_KEYWORDS } from "@/data/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact Master Drop Taxi Service",
  description:
    "Contact Master Drop Taxi Service in Bengaluru — call or WhatsApp +91 97871 11277 for airport, one-way and outstation cab bookings, fare estimates and trip planning. Available 24/7.",
  path: "/contact",
  keywords: CONTACT_KEYWORDS,
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact Us"
        path="/contact"
        title={<>Contact <em>Master Drop Taxi</em></>}
        text="Have a question, need a fare estimate or want help planning your journey? Our team is ready to assist you."
      />
      <section className="sec">
        <div className="wrap contact-grid">
          <Reveal dir="left" className="cinfo">
            <a href={telLink}>
              <i><FaPhoneVolume /></i>
              <div><small>Call Us</small><b>{SITE.phoneDisplay}</b></div>
            </a>
            <a href={waLink(DEFAULT_WA_TEXT)} target="_blank" rel="noopener">
              <i style={{ background: "#e3f7ea", color: "#128c4b" }}><FaWhatsapp size={22} /></i>
              <div><small>WhatsApp</small><b>{SITE.phoneDisplay}</b></div>
            </a>
            <a href={`mailto:${SITE.email}`}>
              <i><FaEnvelope /></i>
              <div><small>Email</small><b>{SITE.email}</b></div>
            </a>
            <div className="ci">
              <i style={{ background: "var(--gold-pale)", color: "var(--gold-deep)" }}><FaLocationDot /></i>
              <div><small>Office Address</small><b>{SITE.address}</b></div>
            </div>
            <div className="ci">
              <i style={{ background: "var(--gold-pale)", color: "var(--gold-deep)" }}><FaClock /></i>
              <div><small>Business Hours</small><b>{SITE.hours}</b></div>
            </div>
          </Reveal>
          <Reveal dir="right" className="card">
            <ContactForm />
          </Reveal>
        </div>
      </section>
      <section className="wrap">
        <Reveal dir="zoom">
          <iframe
            className="map"
            title="Master Drop Taxi location"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&output=embed`}
          />
        </Reveal>
      </section>
    </>
  );
}

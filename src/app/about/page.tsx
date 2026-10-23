import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { FaBullseye, FaEye, FaCircleCheck, FaClock } from "react-icons/fa6";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import IllustratedScene from "@/components/ui/IllustratedScene";
import { StatsBand, ComingSoonApp, CtaBand, WhyChoose } from "@/components/home/Sections";
import { SAFETY } from "@/data/content";
import { ABOUT_KEYWORDS } from "@/data/seo";

export const metadata: Metadata = pageMeta({
  title: "About Master Drop Taxi Bengaluru",
  description:
    "Master Drop Taxi — 15+ years of comfortable, reliable cab service for local, outstation, tour and pilgrimage trips across Tamil Nadu, Kerala, Karnataka and all over India.",
  path: "/about",
  keywords: ABOUT_KEYWORDS,
});

export default function AboutPage() {
  return (
    <>
      <PageHero crumb="About Us" path="/about" title={<>About Master <em>Drop Taxi</em></>} text="Comfortable, reliable and convenient transportation — for everyday rides and long-distance journeys." />

      <section className="sec">
        <div className="wrap about-grid">
          <Reveal dir="left" className="about-art">
            <IllustratedScene variant="outstation" />
            <div className="about-badge">
              <b>15+</b>
              <span>Years of experience</span>
            </div>
          </Reveal>
          <Reveal dir="right">
            <span className="eyebrow">Our Story</span>
            <h2 className="h-sec" style={{ marginTop: 14 }}>15+ years on <em>the road</em></h2>
            <p className="muted" style={{ marginTop: 18, fontSize: 17 }}>
              Master Drop Taxi is committed to providing comfortable, reliable and convenient transportation for local travel, outstation journeys, tours and pilgrimage trips.
            </p>
            <p className="muted" style={{ marginTop: 14, fontSize: 17 }}>
              With years of experience in the taxi and travel industry, we understand that every journey is different. Whether travelling alone, with family, for business or as a group, our goal is to help customers choose the right vehicle and travel option.
            </p>
            <ul style={{ display: "grid", gap: 10, marginTop: 22 }}>
              {["Transparent estimates before you travel", "Clean, well-maintained vehicles", "Experienced, courteous drivers", "24/7 phone & WhatsApp support"].map((t) => (
                <li key={t} style={{ display: "flex", gap: 10, alignItems: "center", fontWeight: 500 }}>
                  <FaCircleCheck color="var(--teal)" /> {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap mv">
          <Reveal dir="left">
            <div className="mv-ic"><FaBullseye size={24} /></div>
            <h3>Our Mission</h3>
            <p>To make every journey comfortable, safe, transparent and convenient.</p>
          </Reveal>
          <Reveal dir="right" delay={100}>
            <div className="mv-ic" style={{ background: "var(--gold-pale)", color: "var(--gold-deep)" }}><FaEye size={24} /></div>
            <h3>Our Vision</h3>
            <p>To build a trusted taxi and travel service that customers can rely on for everyday rides and long-distance journeys.</p>
          </Reveal>
        </div>
      </section>

      <StatsBand />

      <section className="sec sec-dark" style={{ marginTop: "var(--sec)" }}>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Women&apos;s Safety</span>
            <h2 className="h-sec" style={{ marginTop: 14 }}>Travel with <em>confidence</em></h2>
            <p>We believe every passenger deserves to feel comfortable and secure during their journey.</p>
          </Reveal>
          <ul className="safety-list">
            {SAFETY.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 70}>
                <span style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  {s.active ? <FaCircleCheck color="#25d366" /> : <FaClock color="#e8a93a" />} {s.title}
                </span>
                <span className={`chip ${s.active ? "live" : "soon"}`}>{s.active ? "Available" : "Coming Soon"}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <WhyChoose />
      <ComingSoonApp />
      <CtaBand />
    </>
  );
}

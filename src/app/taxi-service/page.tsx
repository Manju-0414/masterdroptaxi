import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowRight, FaLocationDot, FaRoute } from "react-icons/fa6";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import { CtaBand } from "@/components/home/Sections";
import { CITIES, FOCUS_STATES, OTHER_REGIONS, citiesIn } from "@/data/areas";
import { SITE } from "@/data/site";
import { JsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Taxi Service Across India — Tamil Nadu, Kerala & Karnataka",
  description:
    "Cab service all over India with the widest coverage in Tamil Nadu, Kerala and Karnataka — Bangalore, Chennai, Coimbatore, Madurai, Kochi, Munnar, Mysuru, Ooty, Tirupati and more. One-way drop, round trip and outstation taxis.",
  path: "/taxi-service",
  keywords: [
    "taxi service all over India", "outstation cab India", "taxi service Tamil Nadu", "taxi service Kerala", "taxi service Karnataka",
    "South India taxi", "one way taxi Tamil Nadu", "Kerala tour cab", "Karnataka outstation taxi", "interstate taxi",
  ],
});

const ld = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `${SITE.name} service areas`,
  itemListElement: CITIES.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `Taxi service in ${c.name}`,
    url: `${SITE.url}/taxi-service/${c.slug}`,
  })),
};

const MORE = ["Puducherry", "Andhra Pradesh"] as const;

export default function ServiceAreasPage() {
  return (
    <>
      <JsonLd data={ld} />
      <PageHero
        crumb="Service Areas"
        path="/taxi-service"
        title={<>Taxi service <em>across India</em></>}
        text="Strongest in Tamil Nadu, Kerala and Karnataka — and ready to drive you to any state in India."
      />

      <section className="sec">
        <div className="wrap">
          <SectionHead
            eyebrow="Where we drive"
            title={<>South India, <em>covered</em></>}
            text="Daily one-way drops, round trips, tours and airport transfers across our three home states. Pick your city for local fares and popular routes."
          />
          <div className="area-states">
            {FOCUS_STATES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 100} className="area-state" >
                <div id={s.slug} style={{ scrollMarginTop: 120 }}>
                  <h2><FaLocationDot /> Taxi service in {s.name}</h2>
                  <p>{s.text}</p>
                  <ul className="area-links">
                    {citiesIn(s.name).map((c) => (
                      <li key={c.slug}><Link href={`/taxi-service/${c.slug}`}>{c.name} <FaArrowRight /></Link></li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
            <Reveal delay={300} className="area-state">
              <h2><FaLocationDot /> Puducherry & Andhra Pradesh</h2>
              <p>Pondicherry beach trips and Tirupati darshan are among our most-booked routes from Bangalore, Hosur and Chennai.</p>
              <ul className="area-links">
                {MORE.flatMap((m) => citiesIn(m)).map((c) => (
                  <li key={c.slug}><Link href={`/taxi-service/${c.slug}`}>{c.name} <FaArrowRight /></Link></li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap area-india">
          <Reveal dir="left">
            <span className="eyebrow"><FaRoute /> All over India</span>
            <h2 className="h-sec" style={{ marginTop: 14 }}>Going <em>further?</em></h2>
            <p className="muted" style={{ marginTop: 16 }}>
              Our outstation cabs are not limited to the south. We take one-way and round trips from Bangalore, Chennai,
              Coimbatore, Kochi and every city above to anywhere in India — with interstate permits handled for you (charged as applicable), experienced
              long-distance drivers and a clear per-km fare before you travel.
            </p>
          </Reveal>
          <Reveal dir="right">
            <ul className="area-chips big">
              {OTHER_REGIONS.map((r) => <li key={r}>{r}</li>)}
              <li>…and every other state</li>
            </ul>
          </Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

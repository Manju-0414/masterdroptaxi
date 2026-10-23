import type { Metadata } from "next";
import { JsonLd, pageMeta } from "@/lib/seo";
import Link from "next/link";
import { FaWhatsapp, FaCalculator } from "react-icons/fa6";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icons";
import { CtaBand, RouteMarquee } from "@/components/home/Sections";
import { SERVICES } from "@/data/content";
import { SITE, waLink } from "@/data/site";
import { SERVICES_KEYWORDS } from "@/data/seo";

export const metadata: Metadata = pageMeta({
  title: "Local, Airport, One-Way, Outstation & Round Trip Taxi Bengaluru",
  description:
    "Local taxi service in Bengaluru, Bengaluru airport taxi, one way drop taxi and outstation taxi from Bengaluru, plus round trip, tour, temple and railway transfers across Tamil Nadu, Kerala and Karnataka.",
  path: "/services",
  keywords: SERVICES_KEYWORDS,
});

const servicesLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: SERVICES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      description: s.text,
      serviceType: s.title,
      url: `${SITE.url}/services#${s.id}`,
      provider: { "@id": `${SITE.url}/#business` },
      areaServed: ["India", "Tamil Nadu", "Kerala", "Karnataka"],
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesLd} />
      <PageHero crumb="Services" path="/services" title={<>Taxi <em>services</em></>} text="Every kind of journey — across the street, across the state, or across a week of temple towns." />
      <section className="sec">
        <div className="wrap svc-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 100}>
              <article className="svc" id={s.id} style={{ scrollMarginTop: 120 }}>
                {s.soon && <span className="chip soon">Coming Soon</span>}
                <div className="ic"><Icon name={s.icon} size={28} /></div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul>{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
                {!s.soon && (
                  <div className="actions">
                    <Link href="/#estimate" className="btn btn-ink btn-sm"><FaCalculator /> Estimate</Link>
                    <a href={waLink(`Hi, I'm interested in your ${s.title} service.`)} target="_blank" rel="noopener" className="btn btn-wa btn-sm"><FaWhatsapp /> Enquire</a>
                  </div>
                )}
                <span className="svc-bar" />
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <RouteMarquee />
      <CtaBand />
    </>
  );
}

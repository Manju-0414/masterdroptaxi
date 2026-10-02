import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaCalculator, FaWhatsapp, FaPhoneVolume, FaLocationDot, FaRoute, FaArrowRight } from "react-icons/fa6";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import FaqList from "@/components/ui/FaqList";
import SectionHead from "@/components/ui/SectionHead";
import { CtaBand } from "@/components/home/Sections";
import { CITIES, cityBySlug, cityByName, citiesIn } from "@/data/areas";
import { SERVICES } from "@/data/content";
import { TARIFFS, VEHICLE_TYPES, VEHICLES, EXTRAS_NOTICE } from "@/data/vehicles";
import { SITE, telLink, waLink } from "@/data/site";
import { inr } from "@/lib/fare";
import { JsonLd, pageMeta } from "@/lib/seo";

const HUB = { name: "Service Areas", path: "/taxi-service" };

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

type Params = Promise<{ city: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const c = cityBySlug((await params).city);
  if (!c) return { title: "Taxi Service" };
  return pageMeta({
    title: `Taxi Service in ${c.name} — Drop & Outstation Cabs`,
    description: `Book a taxi in ${c.name}, ${c.state}: one-way drop, round trip, outstation, airport and tour cabs from ${inr(TARIFFS.Mini.oneWayRate)}/km. ${c.routes.slice(0, 3).map((r) => `${c.name} to ${r}`).join(", ")} and all over India. Call ${SITE.phoneDisplay}.`,
    path: `/taxi-service/${c.slug}`,
    keywords: [
      `taxi service in ${c.name}`, `cab service in ${c.name}`, `${c.name} taxi`, `${c.name} cabs`, `one way taxi ${c.name}`,
      `drop taxi ${c.name}`, `outstation cab ${c.name}`, `${c.name} airport taxi`, `${c.state} taxi`,
      ...c.routes.map((r) => `${c.name} to ${r} taxi`),
    ],
  });
}

export default async function CityPage({ params }: { params: Params }) {
  const c = cityBySlug((await params).city);
  if (!c) notFound();

  const path = `/taxi-service/${c.slug}`;
  const nearby = citiesIn(c.state).filter((x) => x.slug !== c.slug);
  const faqs = [
    {
      q: `How do I book a taxi in ${c.name}?`,
      a: `Call or WhatsApp ${SITE.phoneDisplay}, or get an instant fare estimate on our website and tap Book Now. We confirm your cab, driver and pickup time in ${c.name} right away — available 24/7.`,
    },
    {
      q: `Do you offer one-way drop taxi from ${c.name}?`,
      a: `Yes. With a one-way drop from ${c.name} you pay only for the one side of the journey (minimum ${TARIFFS.Sedan.minKmOneWay} km). Popular drops include ${c.routes.slice(0, 4).join(", ")}.`,
    },
    {
      q: `What is the taxi fare per km in ${c.name}?`,
      a: `One-way rates start at ${inr(TARIFFS.Mini.oneWayRate)}/km for Mini, ${inr(TARIFFS.Sedan.oneWayRate)}/km for Sedan, ${inr(TARIFFS.SUV.oneWayRate)}/km for SUV and ${inr(TARIFFS["SUV Premium"].oneWayRate)}/km for Innova Crysta. Driver allowance applies per day.`,
    },
    { q: "Are toll, parking and permit charges included?", a: EXTRAS_NOTICE },
    {
      q: `Can I book an outstation cab from ${c.name} to other states?`,
      a: `Yes. We cover all of Tamil Nadu, Kerala and Karnataka every day, and take outstation trips from ${c.name} to anywhere in India — Andhra Pradesh, Telangana, Goa, Maharashtra and beyond.`,
    },
  ];

  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "TaxiService",
      name: `${SITE.name} — Taxi Service in ${c.name}`,
      url: `${SITE.url}${path}`,
      provider: { "@id": `${SITE.url}/#business` },
      areaServed: { "@type": "City", name: c.name, containedInPlace: { "@type": "State", name: c.state } },
      offers: VEHICLE_TYPES.map((t) => ({
        "@type": "Offer",
        name: `${t} one-way taxi`,
        priceSpecification: { "@type": "UnitPriceSpecification", price: TARIFFS[t].oneWayRate, priceCurrency: "INR", unitText: "km" },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <>
      <JsonLd data={ld} />
      <PageHero
        crumb={`Taxi in ${c.name}`}
        path={path}
        parent={HUB}
        title={<>Taxi service in <em>{c.name}</em></>}
        text={`One-way drop, round trip, outstation, airport and tour cabs in ${c.name}, ${c.state} — and onward to anywhere in India.`}
      />

      <section className="sec">
        <div className="wrap area-intro">
          <Reveal dir="left">
            <span className="eyebrow"><FaLocationDot /> {c.name}, {c.state}</span>
            <h2 className="h-sec" style={{ marginTop: 14 }}>Cabs in <em>{c.name}</em></h2>
            <p className="area-lead">{c.blurb}</p>
            <p className="muted" style={{ marginTop: 14 }}>
              {SITE.name} runs clean AC Mini, Sedan, SUV and Innova Crysta cabs with experienced drivers across Tamil Nadu,
              Kerala and Karnataka. Book a local ride in {c.name}, a one-way drop where you pay only one side, or a multi-day
              round trip — with a transparent per-km fare before you confirm.
            </p>
            <div className="area-cta">
              <Link href="/#estimate" className="btn btn-gold"><FaCalculator /> Get Fare Estimate</Link>
              <a href={waLink(`Hi, I need a taxi in ${c.name}.`)} target="_blank" rel="noopener" className="btn btn-wa"><FaWhatsapp /> WhatsApp</a>
              <a href={telLink} className="btn btn-ink"><FaPhoneVolume /> Call</a>
            </div>
          </Reveal>
          <Reveal dir="right" className="area-card">
            <h3>Popular in {c.name}</h3>
            <ul className="area-chips">{c.places.map((p) => <li key={p}>{p}</li>)}</ul>
            <h3 style={{ marginTop: 22 }}>Popular trips from {c.name}</h3>
            <ul className="area-routes">
              {c.routes.map((r) => {
                const to = cityByName(r);
                return (
                  <li key={r}>
                    <FaRoute />
                    {to ? <Link href={`/taxi-service/${to.slug}`}>{c.name} to {r} taxi</Link> : <span>{c.name} to {r} taxi</span>}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          <SectionHead eyebrow="Fares" title={<>Taxi fare in <em>{c.name}</em></>} text={`Per-km rates for every cab we run from ${c.name}.`} />
          <div className="area-rates">
            {VEHICLE_TYPES.map((t) => (
              <Reveal key={t} className="area-rate">
                <h3>{t}</h3>
                <small>{VEHICLES.filter((v) => v.type === t).map((v) => v.name).join(", ")}</small>
                <div><span>One-way</span><b>{inr(TARIFFS[t].oneWayRate)}/km</b></div>
                <div><span>Round trip</span><b>{inr(TARIFFS[t].roundTripRate)}/km</b></div>
                <div><span>Seats</span><b>{TARIFFS[t].seats}</b></div>
                <div><span>Driver allowance</span><b>{inr(TARIFFS[t].driverAllowance)}/day</b></div>
              </Reveal>
            ))}
          </div>
          <p className="notice notice-extra" style={{ marginTop: 24 }}><span><b>Please note:</b> {EXTRAS_NOTICE}</span></p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHead eyebrow="Services" title={<>What we offer in <em>{c.name}</em></>} />
          <ul className="area-svc">
            {SERVICES.filter((s) => !s.soon).map((s) => (
              <li key={s.id}>
                <Link href={`/services#${s.id}`}>
                  <b>{s.title} in {c.name}</b>
                  <span>{s.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <SectionHead eyebrow="FAQ" title={<>{c.name} taxi <em>questions</em></>} />
          <FaqList items={faqs} />
        </div>
      </section>

      {nearby.length > 0 && (
        <section className="sec">
          <div className="wrap">
            <SectionHead eyebrow={c.state} title={<>More cities in <em>{c.state}</em></>} />
            <ul className="area-links">
              {nearby.map((n) => (
                <li key={n.slug}><Link href={`/taxi-service/${n.slug}`}>Taxi in {n.name} <FaArrowRight /></Link></li>
              ))}
              <li><Link href="/taxi-service">All service areas <FaArrowRight /></Link></li>
            </ul>
          </div>
        </section>
      )}
      <CtaBand />
    </>
  );
}

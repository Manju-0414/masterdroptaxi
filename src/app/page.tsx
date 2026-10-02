import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import HeroSlider from "@/components/home/HeroSlider";
import EstimateSection from "@/components/estimate/EstimateSection";
import FleetSection from "@/components/home/FleetSection";
import FareCalculator from "@/components/home/FareCalculator";
import { TourPackages, TemplePackages } from "@/components/home/PackagesSection";
import { RouteMarquee, ContactStrip, WhyChoose, ServiceAreas, StatsBand, ComingSoonApp, CtaBand } from "@/components/home/Sections";
import FaqList from "@/components/ui/FaqList";
import Reveal from "@/components/ui/Reveal";
import { FAQS } from "@/data/content";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <RouteMarquee />
      <EstimateSection />
      <ContactStrip />
      <div style={{ height: "var(--sec)" }} />
      <FleetSection />
      <FareCalculator />
      <TourPackages />
      <TemplePackages />
      <ServiceAreas />
      <WhyChoose />
      <StatsBand />
      <ComingSoonApp />
      <section className="sec sec-alt">
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, alignItems: "start" }}>
          <Reveal dir="left">
            <span className="eyebrow">FAQ</span>
            <h2 className="h-sec" style={{ marginTop: 14 }}>Questions? <em>Answered.</em></h2>
            <p className="muted" style={{ marginTop: 16 }}>Quick answers about fares, tolls, luggage, pets and bookings.</p>
            <Link href="/faq" className="btn btn-ink" style={{ marginTop: 24 }}>
              View all FAQs <FaArrowRight />
            </Link>
          </Reveal>
          <FaqList items={FAQS.slice(0, 6)} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}

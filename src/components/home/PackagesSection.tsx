import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";
import PackageRail from "./PackageRail";
import { TOUR_PACKAGES, TEMPLE_PACKAGES } from "@/data/packages";

export function TourPackages() {
  return (
    <section className="sec sec-alt" id="packages">
      <div className="wrap">
        <Reveal className="head-row">
          <div>
            <span className="eyebrow">Tour & Travel Packages</span>
            <h2 className="h-sec">Explore South India <em>with us</em></h2>
          </div>
          <div style={{ display: "grid", gap: 14, justifyItems: "start" }}>
            <p>Plan your next journey with comfortable vehicles, experienced drivers and flexible travel options.</p>
            <Link href="/plans" className="link-more">All packages <FaArrowRight /></Link>
          </div>
        </Reveal>
        <Reveal dir="up">
          <PackageRail items={TOUR_PACKAGES} label="Tour packages" />
        </Reveal>
      </div>
    </section>
  );
}

function Mandala() {
  return (
    <svg className="mandala" viewBox="0 0 200 200" aria-hidden="true">
      <g fill="none" stroke="#c9a266" strokeWidth="0.8">
        {Array.from({ length: 16 }).map((_, i) => (
          <ellipse key={i} cx="100" cy="100" rx="90" ry="28" transform={`rotate(${i * 11.25} 100 100)`} />
        ))}
        <circle cx="100" cy="100" r="30" />
        <circle cx="100" cy="100" r="60" />
      </g>
    </svg>
  );
}

export function TemplePackages() {
  return (
    <section className="sec temple-sec" id="temple">
      <Mandala />
      <div className="wrap" style={{ position: "relative" }}>
        <Reveal className="head-row">
          <div>
            <span className="eyebrow">Pilgrimage</span>
            <h2 className="h-sec">Temple <em>tours</em></h2>
          </div>
          <p style={{ color: "rgba(255,255,255,.7)" }}>Peaceful, well-planned darshan trips with drivers who know every temple town, timing and route.</p>
        </Reveal>
        <Reveal dir="up">
          <PackageRail items={TEMPLE_PACKAGES} label="Temple tour packages" />
        </Reveal>
      </div>
    </section>
  );
}

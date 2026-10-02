"use client";
import { useState } from "react";
import { FaCarSide, FaWhatsapp, FaChevronDown, FaClock } from "react-icons/fa6";
import SceneArt from "@/components/ui/SceneArt";
import type { TourPackage } from "@/data/packages";
import { waLink } from "@/data/site";
import { inr } from "@/lib/fare";

export default function PackageCard({ p, showTerms = false }: { p: TourPackage; showTerms?: boolean }) {
  const [open, setOpen] = useState(false);
  const quote = `Hi, I'd like a quote for the *${p.name}* (${p.duration}).\nRoute: ${p.route.join(" → ")}\nPreferred vehicle: ${p.vehicle}`;
  return (
    <article className="pkg">
      <div className="ph">
        <SceneArt id={p.id} scene={p.scene} hue={p.hue} />
        {p.tag && <span className="chip">{p.tag}</span>}
        <span className="chip dur"><FaClock size={10} /> {p.duration}</span>
      </div>
      <div className="in">
        <h3>{p.name}</h3>
        <div className="pkg-route">
          {p.route.map((r, i) => (
            <span key={i}>
              {r}
              {i < p.route.length - 1 && <i> → </i>}
            </span>
          ))}
        </div>
        <div className="places">
          {p.places.slice(0, open ? 99 : 3).map((pl) => (
            <span key={pl}>{pl}</span>
          ))}
          {!open && p.places.length > 3 && <span>+{p.places.length - 3} more</span>}
        </div>
        <div className={`pkg-more ${open ? "open" : ""}`}>
          <div>
            <ol className="timeline">
              {p.route.map((r, i) => (
                <li key={i}>
                  <b>{i === 0 ? "Start" : i === p.route.length - 1 ? "Arrive" : `Stop ${i}`}</b> — {r}
                </li>
              ))}
            </ol>
            {p.distance && <p className="pkg-terms" style={{ marginTop: 8 }}>Includes {p.distance}. Extra km / hours charged as per vehicle rate.</p>}
            {showTerms && <p className="pkg-terms" style={{ marginTop: 6 }}>Tolls, parking, permits and driver night allowance extra as applicable. Itinerary can be customised.</p>}
          </div>
        </div>
        <div className="pkg-foot">
          <span className="v"><FaCarSide /> {p.vehicle}</span>
          <strong style={{ fontFamily: "var(--f-display)", color: "var(--gold-deep)" }}>
            {p.startingPrice ? `From ${inr(p.startingPrice)}` : "Get Quote"}
          </strong>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-ghost btn-sm" style={{ flex: 1, color: "inherit" }} onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            {open ? "Less" : "View Package"} <FaChevronDown style={{ transition: "transform .3s", transform: open ? "rotate(180deg)" : "none" }} />
          </button>
          <a className="btn btn-wa btn-sm" style={{ flex: 1 }} href={waLink(quote)} target="_blank" rel="noopener">
            <FaWhatsapp /> Get Quote
          </a>
        </div>
      </div>
    </article>
  );
}

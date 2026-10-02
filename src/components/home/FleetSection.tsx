"use client";
import { useEffect, useRef, useState } from "react";
import {
  FaUsers, FaSuitcase, FaSnowflake, FaCircleCheck, FaChevronLeft, FaChevronRight, FaArrowRight, FaCarSide, FaRotateLeft,
} from "react-icons/fa6";
import VehicleArt from "@/components/ui/VehicleArt";
import SectionHead from "@/components/ui/SectionHead";
import { usePricing } from "@/lib/usePricing";
import { inr } from "@/lib/fare";
import { cdn } from "@/lib/cdn";
import { VEHICLE_TYPES, type Vehicle, type VehicleType } from "@/data/vehicles";

const pickVehicle = (id: string) => {
  window.dispatchEvent(new CustomEvent("mdt:vehicle", { detail: id }));
  document.getElementById("estimate")?.scrollIntoView({ behavior: "smooth" });
};

function FleetCard({
  v, offset, flipped, onClick,
}: { v: Vehicle; offset: number; flipped: boolean; onClick: () => void }) {
  const a = Math.abs(offset);
  const active = offset === 0;
  const style = {
    "--o": offset,
    "--a": a,
    zIndex: 10 - a,
    opacity: a > 2 ? 0 : 1,
    pointerEvents: a > 2 ? "none" : undefined,
  } as React.CSSProperties;

  return (
    <div
      className={`fc ${active ? "is-active" : ""} ${flipped ? "is-flipped" : ""}`}
      style={style}
      onClick={onClick}
      role="button"
      tabIndex={a > 2 ? -1 : 0}
      aria-label={active ? `${v.name} — ${flipped ? "hide" : "show"} details` : `Show ${v.name}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="fc-inner">
        {/* front */}
        <div className="fc-face fc-front" aria-hidden={flipped}>
          <div className="fc-photo" style={{ "--c": v.color } as React.CSSProperties}>
            <span className="fc-sun" />
            <span className="fc-hill h1" />
            <span className="fc-hill h2" />
            <span className="fc-road" />
            {v.fleetImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cdn(`vechile-list/${v.fleetImage}`)} alt={v.name} className="fc-car fc-car-img" loading="lazy" draggable={false} />
            ) : (
              <VehicleArt shape={v.shape} color={v.color} taxi={false} className="fc-car" />
            )}
          </div>
          <div className="fc-body">
            <h3>{v.name}</h3>
            <div className="fc-sub"><FaCarSide size={13} /> {v.category}</div>
            <h4>Description</h4>
            <p className="fc-desc">{v.description}</p>
            <div className="fc-stats">
              <div><small>Seats</small><b>{v.seats}</b></div>
              <div><small>Bags</small><b>{v.bags}</b></div>
              <div><small>Round Trip</small><b>{inr(v.roundTripRate)}</b></div>
            </div>
            <div className="fc-foot">
              <div>
                <small>One-way from</small>
                <b>{inr(v.oneWayRate)}<span>/km</span></b>
              </div>
              <span className="fc-go" aria-hidden="true"><FaArrowRight /></span>
            </div>
          </div>
        </div>

        {/* back — details */}
        <div className="fc-face fc-back" aria-hidden={!flipped}>
          <div className="fc-back-head">
            <div>
              <h3>{v.name}</h3>
              <div className="fc-sub">{v.category}</div>
            </div>
            <span className="fc-flip-hint"><FaRotateLeft /></span>
          </div>
          <div className="fc-specs">
            <span><FaUsers /> {v.seats} Pax</span>
            <span><FaSuitcase /> {v.bags} Bags</span>
            <span><FaSnowflake /> {v.ac ? "AC" : "Non-AC"}</span>
          </div>
          <div className="fc-table">
            <div><span>One-way</span><b>{inr(v.oneWayRate)}/km</b></div>
            <div><span>Round trip</span><b>{inr(v.roundTripRate)}/km</b></div>
            <div><span>Min. km (one-way)</span><b>{v.minKmOneWay} km</b></div>
            <div><span>Min. km / day (round)</span><b>{v.minKmPerDay} km</b></div>
            <div><span>Driver allowance</span><b>{inr(v.driverAllowance)}/day</b></div>
            <div><span>Waiting</span><b>{inr(v.waitingPerHour)}/hr</b></div>
          </div>
          <ul className="fc-hl">
            {v.highlights.map((h) => (
              <li key={h}><FaCircleCheck size={12} /> {h}</li>
            ))}
          </ul>
          <button
            className="btn btn-gold fc-cta"
            tabIndex={flipped ? 0 : -1}
            onClick={(e) => {
              e.stopPropagation();
              pickVehicle(v.id);
            }}
          >
            Get Estimate <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FleetSection() {
  const all = usePricing();
  const [filter, setFilter] = useState<VehicleType | "All">("All");
  const vehicles = filter === "All" ? all : all.filter((v) => v.type === filter);
  const n = vehicles.length;
  const [active, setActive] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const pickFilter = (f: VehicleType | "All") => {
    setFilter(f);
    setActive(0);
    setFlipped(false);
  };
  const drag = useRef<{ x: number; moved: boolean } | null>(null);

  useEffect(() => {
    if (active >= n) setActive(0);
  }, [n, active]);

  // Auto-advance every 5s — paused on hover, touch, while a card is flipped, off-screen or with reduced motion.
  const stage = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);
  const pausedUntil = useRef(0);
  const visible = useRef(false);
  const pause = () => (pausedUntil.current = Date.now() + 8000);

  /** manual navigation (arrows, dots, swipe, click) — also holds off auto-advance for a while */
  const go = (i: number) => {
    pause();
    setActive(((i % n) + n) % n);
    setFlipped(false);
  };

  useEffect(() => {
    const el = stage.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (n < 2 || flipped || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (hovering.current || document.hidden || !visible.current || Date.now() < pausedUntil.current) return;
      setActive((a) => (a + 1) % n);
    }, 5000);
    return () => clearInterval(t);
  }, [n, flipped, active]);

  // circular offset so cards wrap around both sides of the centre
  const offsetOf = (i: number) => {
    let o = i - active;
    if (o > n / 2) o -= n;
    if (o < -n / 2) o += n;
    return o;
  };

  return (
    <section className="sec sec-dark fleet-sec" id="fleet">
      <div className="wrap">
        <SectionHead
          eyebrow="Our Fleet"
          title={<>Our <em>vehicles</em></>}
          text="Every car we run — Mini, Sedan, SUV and SUV Premium. Tap a car to bring it forward, tap again to see full rates and details."
        />
        <div className="fleet-filter" role="tablist" aria-label="Filter by vehicle type">
          {(["All", ...VEHICLE_TYPES] as const).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={filter === t}
              className={filter === t ? "on" : ""}
              onClick={() => pickFilter(t)}
            >
              {t} ({t === "All" ? all.length : all.filter((v) => v.type === t).length})
            </button>
          ))}
        </div>
        <div
          className="fleet-stage"
          ref={stage}
          onMouseEnter={() => (hovering.current = true)}
          onMouseLeave={() => (hovering.current = false)}
          onPointerDown={(e) => {
            pause();
            drag.current = { x: e.clientX, moved: false };
          }}
          onPointerMove={(e) => {
            const d = drag.current;
            if (!d || d.moved) return;
            const dx = e.clientX - d.x;
            if (Math.abs(dx) > 50) {
              d.moved = true;
              go(active + (dx < 0 ? 1 : -1));
            }
          }}
          onPointerUp={() => setTimeout(() => (drag.current = null), 0)}
          onPointerLeave={() => (drag.current = null)}
        >
          {vehicles.map((v, i) => (
            <FleetCard
              key={v.id}
              v={v}
              offset={offsetOf(i)}
              flipped={flipped && i === active}
              onClick={() => {
                if (drag.current?.moved) return;
                if (i === active) setFlipped((f) => !f);
                else go(i);
              }}
            />
          ))}
        </div>
        <div className="fleet-nav">
          <button className="fleet-arrow" onClick={() => go(active - 1)} aria-label="Previous vehicle"><FaChevronLeft /></button>
          <div className="fleet-dots">
            {vehicles.map((v, i) => (
              <button key={v.id} className={i === active ? "on" : ""} onClick={() => go(i)} aria-label={`Show ${v.name}`} />
            ))}
          </div>
          <button className="fleet-arrow" onClick={() => go(active + 1)} aria-label="Next vehicle"><FaChevronRight /></button>
        </div>
      </div>
    </section>
  );
}

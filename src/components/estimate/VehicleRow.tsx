"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import VehicleArt from "@/components/ui/VehicleArt";
import { inr } from "@/lib/fare";
import { cdn } from "@/lib/cdn";
import type { Vehicle } from "@/data/vehicles";

interface Props {
  vehicles: Vehicle[];
  value: string;
  onChange: (id: string) => void;
  /** radio group name — unique per tab */
  name: string;
  /** show round-trip rate instead of one-way */
  roundTrip: boolean;
}

/** Single-row vehicle picker with left / right arrows. */
export default function VehicleRow({ vehicles, value, onChange, name, roundTrip }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update, vehicles.length]);

  // Bring the selected car into view (e.g. when picked from the fleet section).
  useEffect(() => {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>(`[data-id="${value}"]`);
    if (!el || !card) return;
    const left = card.offsetLeft; // .veh-track is position: relative
    if (left < el.scrollLeft || left + card.offsetWidth > el.scrollLeft + el.clientWidth) {
      el.scrollTo({ left: left - (el.clientWidth - card.offsetWidth) / 2, behavior: "smooth" });
    }
  }, [value]);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="veh-row">
      <button type="button" className="veh-arrow" onClick={() => scroll(-1)} disabled={edge.start} aria-label="Previous vehicles">
        <FaChevronLeft />
      </button>
      <div className="veh-track" ref={track} onScroll={update}>
        {vehicles.map((v) => (
          <label key={v.id} className="veh-opt" data-id={v.id}>
            <input type="radio" name={name} checked={value === v.id} onChange={() => onChange(v.id)} />
            <div>
              {v.image ? (
                <Image src={cdn(`vehicle-icon/${v.image}`)} alt="" className="veh-img" width={240} height={112} sizes="120px" />
              ) : (
                <VehicleArt shape={v.shape} color={v.color} taxi={false} />
              )}
              <b>{v.name}</b>
              <small>{v.type} • {inr(roundTrip ? v.roundTripRate : v.oneWayRate)}/km</small>
            </div>
          </label>
        ))}
      </div>
      <button type="button" className="veh-arrow" onClick={() => scroll(1)} disabled={edge.end} aria-label="More vehicles">
        <FaChevronRight />
      </button>
    </div>
  );
}

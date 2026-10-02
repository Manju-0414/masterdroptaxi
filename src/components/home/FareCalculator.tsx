"use client";
import { useMemo, useState } from "react";
import { FaGaugeHigh, FaCarSide, FaCircleInfo, FaWhatsapp, FaCalendarDays } from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";
import { Tween } from "@/components/ui/Counter";
import { usePricing } from "@/lib/usePricing";
import { calculateFare, inr, type TripType } from "@/lib/fare";
import { EXTRAS_NOTICE, FARE_NOTICE, VEHICLE_TYPES, DEFAULT_VEHICLE_ID } from "@/data/vehicles";
import { waLink } from "@/data/site";

const TYPES: { id: TripType; label: string }[] = [
  { id: "oneway", label: "One Way" },
  { id: "round", label: "Round Trip" },
  { id: "local", label: "Local" },
  { id: "multi", label: "Multi-Stop" },
  { id: "tour", label: "Tour" },
];

const RANGE_MIN = 10;
const RANGE_MAX = 1000;

export default function FareCalculator() {
  const vehicles = usePricing();
  const [km, setKm] = useState(180);
  const [vid, setVid] = useState(DEFAULT_VEHICLE_ID);
  const [type, setType] = useState<TripType>("oneway");
  const [days, setDays] = useState(1);
  const [shown, setShown] = useState<ReturnType<typeof calculateFare> | null>(null);
  const v = vehicles.find((x) => x.id === vid) ?? vehicles[0];
  const multiDay = type === "round" || type === "tour" || type === "multi";

  const live = useMemo(() => (v ? calculateFare({ vehicle: v, tripType: type, km, days: multiDay ? days : 1 }) : null), [v, type, km, days, multiDay]);
  const fare = shown ?? live;

  return (
    <section className="sec" id="fare">
      <div className="wrap">
        <Reveal className="head-row">
          <div>
            <span className="eyebrow">Fare Calculator</span>
            <h2 className="h-sec">
              Calculate your <em>estimated fare</em>
            </h2>
          </div>
          <p>Know your approximate travel cost before you book. Drag the distance, pick a vehicle and trip type.</p>
        </Reveal>

        <Reveal className="calc-wrap" dir="zoom">
          <div className="calc-l">
            <h3>Trip details</h3>
            <div className="field" style={{ marginBottom: 16 }}>
              <label>Enter Distance (km)</label>
              <div className="ctrl">
                <FaGaugeHigh size={14} />
                <input type="number" min={1} max={3000} value={km} onChange={(e) => { setKm(Math.max(0, Number(e.target.value))); setShown(null); }} />
              </div>
              <input
                className="range"
                type="range"
                min={RANGE_MIN}
                max={RANGE_MAX}
                step={5}
                value={Math.min(Math.max(km, RANGE_MIN), RANGE_MAX)}
                onChange={(e) => { setKm(Number(e.target.value)); setShown(null); }}
                style={{ "--p": `${((Math.min(Math.max(km, RANGE_MIN), RANGE_MAX) - RANGE_MIN) / (RANGE_MAX - RANGE_MIN)) * 100}%` } as React.CSSProperties}
                aria-label="Distance slider"
              />
              <div className="range-scale"><span>{RANGE_MIN} km</span><span>{RANGE_MAX} km</span></div>
            </div>
            <div className="field" style={{ marginBottom: 16 }}>
              <label>Select Vehicle</label>
              <div className="ctrl">
                <FaCarSide size={14} />
                <select value={vid} onChange={(e) => { setVid(e.target.value); setShown(null); }}>
                  {VEHICLE_TYPES.map((t) => {
                    const cars = vehicles.filter((x) => x.type === t);
                    return cars.length ? (
                      <optgroup key={t} label={`${t} — ${cars[0].seats} seats`}>
                        {cars.map((x) => (
                          <option key={x.id} value={x.id}>{x.name}</option>
                        ))}
                      </optgroup>
                    ) : null;
                  })}
                </select>
              </div>
            </div>
            <div className="field" style={{ marginBottom: multiDay ? 16 : 24 }}>
              <label>Trip Type</label>
              <div className="seg">
                {TYPES.map((t) => (
                  <label key={t.id}>
                    <input type="radio" name="calc-type" checked={type === t.id} onChange={() => { setType(t.id); setShown(null); }} />
                    <span>{t.label}</span>
                  </label>
                ))}
              </div>
            </div>
            {multiDay && (
              <div className="field" style={{ marginBottom: 24 }}>
                <label>Number of Days</label>
                <div className="ctrl">
                  <FaCalendarDays size={14} />
                  <input type="number" min={1} max={30} value={days} onChange={(e) => { setDays(Math.max(1, Number(e.target.value))); setShown(null); }} />
                </div>
              </div>
            )}
            <button className="btn btn-gold btn-block" onClick={() => setShown(live)}>Calculate Fare</button>
          </div>

          <div className="calc-r">
            {fare && v && (
              <>
                <div className="calc-eq">
                  <b>{fare.chargeableKm} KM</b> × <b>{inr(fare.rate)}/KM</b>
                  {fare.driverAllowance > 0 && <span className="plus">+ <b>{inr(fare.driverAllowance)} bata</b></span>}
                </div>
                <div className="calc-total">
                  <Tween value={fare.total} format={inr} />
                  <small>Estimated fare • {v.name} ({v.type}) • {TYPES.find((t) => t.id === type)?.label}</small>
                </div>
                <div className="meter"><i style={{ width: `${Math.min(100, (fare.total / 30000) * 100)}%` }} /></div>
                {fare.minKmApplied && (
                  <p className="hint" style={{ marginBottom: 12 }}><FaCircleInfo /> Minimum {fare.chargeableKm} km applies for this trip type.</p>
                )}
                <p className="notice notice-extra"><FaCircleInfo style={{ flex: "0 0 auto", marginTop: 3 }} /> <span><b>Please note:</b> {EXTRAS_NOTICE}</span></p>
                <p className="notice" style={{ marginTop: 10 }}><FaCircleInfo style={{ flex: "0 0 auto", marginTop: 3 }} /> {FARE_NOTICE}</p>
                <a
                  className="btn btn-wa"
                  style={{ marginTop: 18, alignSelf: "flex-start" }}
                  target="_blank"
                  rel="noopener"
                  href={waLink(`Hi, I'd like to book a ${v.name} – ${v.type} (${TYPES.find((t) => t.id === type)?.label}) for about ${km} km. Estimated fare shown: ${inr(fare.total)}.`)}
                >
                  <FaWhatsapp size={18} /> Book this on WhatsApp
                </a>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

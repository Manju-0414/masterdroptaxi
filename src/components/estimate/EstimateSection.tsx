"use client";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaArrowRightLong, FaRightLeft, FaRoute, FaUser, FaPhone, FaCalendarDays, FaClock, FaPlus, FaTrash,
  FaWhatsapp, FaPhoneVolume, FaFilePdf, FaCircleInfo, FaLocationDot, FaCalculator, FaCircleCheck, FaGaugeHigh,
} from "react-icons/fa6";
import LocationInput from "./LocationInput";
import VehicleRow from "./VehicleRow";
import { Tween } from "@/components/ui/Counter";
import Reveal from "@/components/ui/Reveal";
import { usePricing } from "@/lib/usePricing";
import { calculateFare, daysBetween, formatDuration, inr, type FareBreakdown, type TripType } from "@/lib/fare";
import { estimateMinutes, getRoadRoute } from "@/lib/maps";
import { downloadEstimatePdf } from "@/lib/pdf";
import { FARE_NOTICE, WAITING_NOTICE, EXTRAS_NOTICE, DEFAULT_VEHICLE_ID } from "@/data/vehicles";
import { telLink, waLink } from "@/data/site";

type Tab = "oneway" | "round" | "multi";
const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "oneway", label: "One Way", icon: <FaArrowRightLong /> },
  { id: "round", label: "Round Trip", icon: <FaRightLeft /> },
  { id: "multi", label: "Multi-Stop / Tour", icon: <FaRoute /> }, // label shortened on phones via .tab-long
];

interface Result {
  tab: Tab;
  points: string[];
  oneWayKm?: number;
  km: number;
  minutes: number;
  fare: FareBreakdown;
  vehicleName: string;
  date: string;
  time: string;
  source: "google" | "manual";
}

const today = () => new Date().toISOString().slice(0, 10);

export default function EstimateSection() {
  const router = useRouter();
  const vehicles = usePricing();
  const [tab, setTab] = useState<Tab>("oneway");
  const [f, setF] = useState({
    name: "", mobile: "", pickup: "", drop: "", vehicle: DEFAULT_VEHICLE_ID, date: "", time: "",
    returnDate: "", returnTime: "", manualKm: "",
  });
  const [stops, setStops] = useState<string[]>([""]);
  const [returnToStart, setReturnToStart] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [booking, setBooking] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [apiError, setApiError] = useState("");
  // Only ask for a manual distance when the route could not be calculated.
  const [needManualKm, setNeedManualKm] = useState(false);

  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }));
  const vehicle = vehicles.find((v) => v.id === f.vehicle) ?? vehicles[0];

  // Fleet cards dispatch this to preselect a vehicle.
  useEffect(() => {
    const on = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (id) setF((p) => ({ ...p, vehicle: id }));
    };
    window.addEventListener("mdt:vehicle", on);
    return () => window.removeEventListener("mdt:vehicle", on);
  }, []);

  // sliding tab indicator
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [ind, setInd] = useState({ left: 5, width: 0 });
  useLayoutEffect(() => {
    const el = tabRefs.current[tab];
    if (el) setInd({ left: el.offsetLeft, width: el.offsetWidth });
  }, [tab]);
  useEffect(() => {
    const on = () => {
      const el = tabRefs.current[tab];
      if (el) setInd({ left: el.offsetLeft, width: el.offsetWidth });
    };
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, [tab]);

  const switchTab = (t: Tab) => {
    setTab(t);
    setResult(null);
    setErrors({});
    setApiError("");
  };

  const points = useMemo(() => {
    if (tab === "oneway") return [f.pickup, f.drop];
    if (tab === "round") return [f.pickup, f.drop, f.pickup];
    const end = returnToStart ? f.pickup : f.drop;
    return [f.pickup, ...stops.filter((s) => s.trim()), end];
  }, [tab, f.pickup, f.drop, stops, returnToStart]);

  // New locations → recalculate before asking for a manual distance.
  useEffect(() => setNeedManualKm(false), [points]);

  function validate() {
    const e: Record<string, string> = {};
    if (!f.name.trim()) e.name = "Please enter your name";
    if (!/^(\+?91[\s-]?)?[6-9]\d{9}$/.test(f.mobile.replace(/\s/g, ""))) e.mobile = "Enter a valid 10-digit mobile number";
    if (!f.pickup.trim()) e.pickup = tab === "multi" ? "Enter the start location" : "Enter the pickup location";
    if (tab !== "multi" && !f.drop.trim()) e.drop = tab === "round" ? "Enter the destination" : "Enter the drop location";
    if (tab === "multi" && !returnToStart && !f.drop.trim()) e.drop = "Enter the end location";
    if (tab === "multi" && !stops.some((s) => s.trim())) e.stops = "Add at least one stop";
    if (!f.date) e.date = "Choose a pickup date";
    if (tab === "round" && !f.returnDate) e.returnDate = "Choose a return date";
    if (f.returnDate && f.date && f.returnDate < f.date) e.returnDate = "Return date must be after pickup";
    if (needManualKm && !(Number(f.manualKm) > 0)) e.manualKm = "Enter the approximate distance in km";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function estimate() {
    setApiError("");
    if (!validate() || !vehicle) return;
    setBusy(true);
    try {
      let km = 0;
      let minutes = 0;
      let oneWayKm: number | undefined;
      let source: Result["source"] = "manual";
      const r = needManualKm ? null : await getRoadRoute(tab === "round" ? [f.pickup, f.drop] : points).catch(() => null);
      if (r) {
        source = "google";
        if (tab === "round") {
          oneWayKm = r.km;
          km = r.km * 2;
          minutes = r.minutes;
        } else {
          km = r.km;
          minutes = r.minutes;
        }
      } else if (Number(f.manualKm) > 0) {
        const m = Number(f.manualKm);
        if (tab === "round") {
          oneWayKm = m;
          km = m * 2;
          minutes = estimateMinutes(m);
        } else {
          km = m;
          minutes = estimateMinutes(m);
        }
      } else {
        setNeedManualKm(true);
        setApiError("We couldn't calculate the road distance for these locations. Please check them, enter an approximate distance below, or call / WhatsApp us for a quote.");
        return;
      }
      // multi-stop that ends elsewhere is priced like a one-way drop; returning multi-stop like a round trip
      const tripType: TripType = tab === "oneway" ? "oneway" : tab === "round" ? "round" : returnToStart ? "multi" : "oneway";
      const days = tripType === "oneway" ? 1 : daysBetween(f.date, f.returnDate || f.date);
      const fare = calculateFare({ vehicle, tripType, km, days });
      setResult({ tab, points, oneWayKm, km, minutes, fare, vehicleName: `${vehicle.name} (${vehicle.type})`, date: f.date, time: f.time, source });
      setTimeout(() => document.getElementById("est-summary")?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 60);
    } catch {
      setApiError("We couldn't calculate the road distance for these locations. Please check them, or call / WhatsApp us for a quote.");
    } finally {
      setBusy(false);
    }
  }

  const tabLabel = TABS.find((t) => t.id === (result?.tab ?? tab))!.label;

  const rows = (r: Result): [string, string][] => {
    const out: [string, string][] = [];
    if (r.oneWayKm) out.push(["One-way distance", `${r.oneWayKm} km`]);
    out.push([r.tab === "round" ? "Round-trip distance" : "Total distance", `${r.km} km`]);
    out.push(["Est. travel time" + (r.tab === "round" ? " (one way)" : ""), formatDuration(r.minutes)]);
    out.push(["Vehicle", r.vehicleName]);
    out.push(["Rate", `${inr(r.fare.rate)}/km`]);
    if (r.fare.minKmApplied) out.push(["Min. chargeable", `${r.fare.chargeableKm} km`]);
    out.push(["Base fare", inr(r.fare.baseFare)]);
    if (r.fare.driverAllowance) out.push([`Driver allowance${r.fare.days > 1 ? ` (${r.fare.days} days)` : ""}`, inr(r.fare.driverAllowance)]);
    out.push(["Toll / Parking / Permit / Hill charges", "Not included (extra)"]);
    return out;
  };

  const waText = (r: Result) =>
    [
      `*Master Drop Taxi — ${tabLabel} Estimate*`,
      `Name: ${f.name}`,
      `Mobile: ${f.mobile}`,
      `Route: ${r.points.join(" → ")}`,
      `Date: ${r.date}${r.time ? " " + r.time : ""}`,
      f.returnDate ? `Return: ${f.returnDate}${f.returnTime ? " " + f.returnTime : ""}` : "",
      ...rows(r).map(([k, v]) => `${k}: ${v}`),
      `*Estimated Total: ${inr(r.fare.total)}*`,
      `Note: ${EXTRAS_NOTICE}`,
      "Please confirm availability.",
    ]
      .filter(Boolean)
      .join("\n");

  async function book() {
    if (!result) return;
    setBooking(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "estimate",
          tripType: result.tab,
          name: f.name,
          phone: f.mobile,
          pickup: result.points[0],
          drop: result.points[result.points.length - 1],
          route: result.points,
          vehicle: result.vehicleName,
          date: f.date,
          time: f.time,
          returnDate: f.returnDate,
          estimatedFare: result.fare.total,
          km: result.km,
        }),
      });
      const data = await res.json().catch(() => ({}));
      const q = new URLSearchParams({
        id: data.bookingId ?? "",
        pickup: result.points[0],
        drop: result.tab === "oneway" ? result.points[1] : result.points.slice(1).join(" → "),
        vehicle: result.vehicleName,
        date: f.date,
        time: f.time,
        fare: String(result.fare.total),
      });
      router.push(`/booking-confirmation?${q.toString()}`);
    } catch {
      setApiError("Couldn't send your request. Please call or WhatsApp us to book.");
      setBooking(false);
    }
  }

  return (
    <section className="sec" id="estimate">
      <div className="wrap">
        <Reveal className="head-row">
          <div>
            <span className="eyebrow">Get Estimate / Book Now</span>
            <h2 className="h-sec">
              Know your fare <em>before</em> you ride
            </h2>
          </div>
          <p>Pick a trip type, add your route and vehicle — we&apos;ll calculate the road distance, travel time and an estimated fare instantly.</p>
        </Reveal>

        <div className="est">
          <Reveal className="card" dir="left">
            <div className="tabs" role="tablist">
              <span className="tab-ind" style={{ left: ind.left, width: ind.width }} />
              {TABS.map((t) => (
                <button
                  key={t.id}
                  ref={(el) => {
                    tabRefs.current[t.id] = el;
                  }}
                  role="tab"
                  aria-selected={tab === t.id}
                  className="tab"
                  onClick={() => switchTab(t.id)}
                >
                  {t.icon} {t.id === "multi" ? <>Multi-Stop<span className="tab-long"> / Tour</span></> : t.label}
                </button>
              ))}
            </div>

            <div className="tab-panel" key={tab}>
              <div className="fgrid">
                <div className={`field ${errors.name ? "invalid" : ""}`}>
                  <label>Name <em>*</em></label>
                  <div className="ctrl">
                    <FaUser size={14} />
                    <input value={f.name} onChange={(e) => set("name")(e.target.value)} placeholder="Your name" autoComplete="name" />
                  </div>
                  {errors.name && <span className="err">{errors.name}</span>}
                </div>
                <div className={`field ${errors.mobile ? "invalid" : ""}`}>
                  <label>Mobile Number <em>*</em></label>
                  <div className="ctrl">
                    <FaPhone size={14} />
                    <input value={f.mobile} onChange={(e) => set("mobile")(e.target.value)} placeholder="10-digit mobile" inputMode="tel" autoComplete="tel" />
                  </div>
                  {errors.mobile && <span className="err">{errors.mobile}</span>}
                </div>

                <LocationInput
                  label={tab === "multi" ? "Start Location" : "Pickup Location"}
                  value={f.pickup}
                  onChange={set("pickup")}
                  required
                  error={errors.pickup}
                  placeholder="e.g. Attibele"
                  className={tab === "multi" ? "full" : ""}
                />
                {tab !== "multi" && (
                  <LocationInput
                    label={tab === "round" ? "Destination" : "Drop Location"}
                    value={f.drop}
                    onChange={set("drop")}
                    required
                    error={errors.drop}
                    placeholder="e.g. Ooty"
                  />
                )}

                {tab === "multi" && (
                  <div className="full" style={{ display: "grid", gap: 10 }}>
                    {stops.map((s, k) => (
                      <div className="stop-row" key={k}>
                        <span className="stop-num">{k + 1}</span>
                        <LocationInput
                          label={`Stop ${k + 1}`}
                          value={s}
                          onChange={(v) => setStops((p) => p.map((x, j) => (j === k ? v : x)))}
                          placeholder="Add a stop"
                        />
                        <button
                          type="button"
                          className="rm-btn"
                          aria-label={`Remove stop ${k + 1}`}
                          onClick={() => setStops((p) => (p.length > 1 ? p.filter((_, j) => j !== k) : [""]))}
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    ))}
                    {errors.stops && <span className="err" style={{ color: "#c0392b", fontSize: 12 }}>{errors.stops}</span>}
                    <button type="button" className="add-stop" onClick={() => setStops((p) => [...p, ""])}>
                      <FaPlus /> Add Another Stop
                    </button>
                    <div className="field">
                      <label>Trip Type</label>
                      <div className="seg">
                        <label>
                          <input type="radio" checked={returnToStart} onChange={() => setReturnToStart(true)} />
                          <span><FaRightLeft /> Return to Starting Location</span>
                        </label>
                        <label>
                          <input type="radio" checked={!returnToStart} onChange={() => setReturnToStart(false)} />
                          <span><FaLocationDot /> Drop at Final Destination</span>
                        </label>
                      </div>
                    </div>
                    {!returnToStart && (
                      <LocationInput label="End Location" value={f.drop} onChange={set("drop")} required error={errors.drop} placeholder="e.g. Coimbatore" />
                    )}
                  </div>
                )}

                <div className="field full">
                  <label>Choose Vehicle <em>*</em></label>
                  <VehicleRow
                    vehicles={vehicles}
                    value={f.vehicle}
                    onChange={set("vehicle")}
                    name={`veh-${tab}`}
                    roundTrip={tab !== "oneway"}
                  />
                </div>

                <div className={`field ${errors.date ? "invalid" : ""}`}>
                  <label>Pickup Date <em>*</em></label>
                  <div className="ctrl">
                    <FaCalendarDays size={14} />
                    <input type="date" min={today()} value={f.date} onChange={(e) => set("date")(e.target.value)} />
                  </div>
                  {errors.date && <span className="err">{errors.date}</span>}
                </div>
                <div className="field">
                  <label>Pickup Time</label>
                  <div className="ctrl">
                    <FaClock size={14} />
                    <input type="time" value={f.time} onChange={(e) => set("time")(e.target.value)} />
                  </div>
                </div>

                {(tab === "round" || (tab === "multi" && returnToStart)) && (
                  <>
                    <div className={`field ${errors.returnDate ? "invalid" : ""}`}>
                      <label>Return Date {tab === "round" && <em>*</em>}</label>
                      <div className="ctrl">
                        <FaCalendarDays size={14} />
                        <input type="date" min={f.date || today()} value={f.returnDate} onChange={(e) => set("returnDate")(e.target.value)} />
                      </div>
                      {errors.returnDate && <span className="err">{errors.returnDate}</span>}
                    </div>
                    <div className="field">
                      <label>Return Time</label>
                      <div className="ctrl">
                        <FaClock size={14} />
                        <input type="time" value={f.returnTime} onChange={(e) => set("returnTime")(e.target.value)} />
                      </div>
                    </div>
                  </>
                )}

                {needManualKm && (
                  <div className={`field full ${errors.manualKm ? "invalid" : ""}`}>
                    <label>
                      {tab === "round" ? "Approx. one-way distance (km)" : tab === "multi" ? "Approx. total route distance (km)" : "Approx. distance (km)"} <em>*</em>
                    </label>
                    <div className="ctrl">
                      <FaGaugeHigh size={14} />
                      <input type="number" min={1} value={f.manualKm} onChange={(e) => set("manualKm")(e.target.value)} placeholder="e.g. 210" />
                    </div>
                    {errors.manualKm ? (
                      <span className="err">{errors.manualKm}</span>
                    ) : (
                      <span className="hint"><FaCircleInfo /> We couldn&apos;t find this route — enter an approximate distance, or <button type="button" className="link-btn" onClick={() => setNeedManualKm(false)} style={{ background: "none", border: 0, padding: 0, color: "inherit", textDecoration: "underline", cursor: "pointer", font: "inherit" }}>try again</button>.</span>
                    )}
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button className="btn btn-ink" onClick={estimate} disabled={busy}>
                  <FaCalculator /> {busy ? "Calculating…" : "Get Estimate"}
                </button>
                <a className="btn btn-ghost" href={telLink}>
                  <FaPhoneVolume /> Call to Book
                </a>
              </div>
              {apiError && <p className="notice" style={{ marginTop: 14 }}>{apiError}</p>}
            </div>
          </Reveal>

          <Reveal className="card summary" id="est-summary" dir="right" delay={120}>
            <h3>{tabLabel} Summary</h3>
            {!result ? (
              <div className="empty-sum">
                <FaLocationDot size={44} className="pin" />
                <p style={{ marginTop: 14 }}>Fill in your trip details and tap <b>Get Estimate</b> to see the distance, travel time and fare here.</p>
                <div className="route-line" style={{ textAlign: "left", marginTop: 26 }}>
                  {points.map((p, k) => (
                    <div key={k} className={`route-pt ${k === 0 ? "start" : k === points.length - 1 ? "end" : ""}`} style={{ animationDelay: `${k * 80}ms` }}>
                      <small>{k === 0 ? "Pickup" : k === points.length - 1 ? (tab === "oneway" ? "Drop" : tab === "round" || returnToStart ? "Return" : "End") : tab === "round" ? "Destination" : `Stop ${k}`}</small>
                      {p || "—"}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div key={result.fare.total}>
                <div className="route-line">
                  {result.points.map((p, k) => (
                    <div key={k} className={`route-pt ${k === 0 ? "start" : k === result.points.length - 1 ? "end" : ""}`} style={{ animationDelay: `${k * 90}ms` }}>
                      <small>{k === 0 ? "Pickup" : k === result.points.length - 1 ? (result.tab === "oneway" ? "Drop" : "Return / End") : result.tab === "round" ? "Destination" : `Stop ${k}`}</small>
                      {p}
                    </div>
                  ))}
                </div>
                {rows(result).map(([k, v]) => (
                  <div className="srow" key={k}>
                    <span>{k}</span>
                    <b>{v}</b>
                  </div>
                ))}
                <div className="stotal">
                  <span>Estimated Total</span>
                  <b><Tween value={result.fare.total} format={inr} /></b>
                </div>
                <div className="sum-actions">
                  <button
                    className="btn btn-glass"
                    onClick={() =>
                      downloadEstimatePdf({
                        title: `${tabLabel} Estimate`,
                        rows: [["Date", `${result.date} ${result.time}`], ...rows(result)],
                        total: inr(result.fare.total),
                        route: result.points,
                        customer: { name: f.name, phone: f.mobile },
                      })
                    }
                  >
                    <FaFilePdf /> Download PDF
                  </button>
                  <a className="btn btn-wa" href={waLink(waText(result))} target="_blank" rel="noopener">
                    <FaWhatsapp /> WhatsApp Estimate
                  </a>
                  <a className="btn btn-glass" href={telLink}>
                    <FaPhoneVolume /> Call to Book
                  </a>
                  <button className="btn btn-gold" onClick={book} disabled={booking}>
                    <FaCircleCheck /> {booking ? "Sending…" : "Book Now"}
                  </button>
                </div>
                <p className="notice notice-extra"><FaCircleInfo style={{ flex: "0 0 auto", marginTop: 3 }} /> <span><b>Please note:</b> {EXTRAS_NOTICE}</span></p>
                <p className="notice"><FaCircleInfo style={{ flex: "0 0 auto", marginTop: 3 }} /> {result.tab === "oneway" ? FARE_NOTICE : WAITING_NOTICE}</p>
                {result.source === "manual" && <p className="muted" style={{ fontSize: 12, marginTop: 10 }}>Based on the distance you entered. We&apos;ll confirm the exact road distance when we call.</p>}
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

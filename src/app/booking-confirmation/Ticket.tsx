"use client";
import { useSearchParams } from "next/navigation";
import { FaCircleCheck, FaWhatsapp, FaPhoneVolume, FaDownload, FaSatelliteDish } from "react-icons/fa6";
import { inr } from "@/lib/fare";
import { telLink, waLink } from "@/data/site";
import { downloadEstimatePdf } from "@/lib/pdf";

export default function Ticket() {
  const q = useSearchParams();
  const id = q.get("id") || "MDT-PENDING";
  const fare = Number(q.get("fare") || 0);
  const rows: [string, string][] = [
    ["Booking ID", id],
    ["Pickup", q.get("pickup") || "—"],
    ["Destination", q.get("drop") || "—"],
    ["Vehicle", q.get("vehicle") || "—"],
    ["Date", q.get("date") || "—"],
    ["Time", q.get("time") || "To be confirmed"],
    ["Estimated fare", fare ? inr(fare) : "—"],
    ["Booking status", "Awaiting Confirmation"],
  ];
  const wa = `Hi, I've placed a booking request.\n${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}`;

  return (
    <div className="ticket">
      <div className="ticket-top">
        <FaCircleCheck size={46} style={{ animation: "popIn .6s .2s var(--ease) both" }} />
        <h2>Request received</h2>
        <p style={{ opacity: 0.8, marginTop: 6 }}>We&apos;ll call you shortly to confirm your vehicle and fare.</p>
        <span className="ticket-id">{id}</span>
      </div>
      <div className="ticket-cut" />
      <div className="ticket-body">
        {rows.map(([k, v]) => (
          <div className="srow" key={k}>
            <span>{k}</span>
            <b style={k === "Booking status" ? { color: "#b7791f" } : undefined}>{v}</b>
          </div>
        ))}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10, marginTop: 22 }}>
          <button
            className="btn btn-ghost"
            onClick={() =>
              downloadEstimatePdf({
                title: `Booking Request ${id}`,
                rows: rows.filter(([k]) => k !== "Estimated fare"),
                total: fare ? inr(fare) : "-",
                route: [q.get("pickup") || "", q.get("drop") || ""],
              })
            }
          >
            <FaDownload /> Download
          </button>
          <a className="btn btn-wa" href={waLink(wa)} target="_blank" rel="noopener"><FaWhatsapp /> WhatsApp</a>
          <a className="btn btn-teal" href={telLink}><FaPhoneVolume /> Call Us</a>
        </div>
        <p className="hint" style={{ marginTop: 18 }}>
          <FaSatelliteDish /> Driver name, phone and vehicle number will be shared before your trip. Live tracking — coming soon.
        </p>
      </div>
    </div>
  );
}

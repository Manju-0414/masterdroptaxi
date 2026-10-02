import { ImageResponse } from "next/og";
import { SITE } from "@/data/site";

export const alt = "Master Drop Taxi — One-Way, Round Trip & Outstation Taxi in Bangalore & Attibele";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default share card for every page (WhatsApp, Facebook, X, LinkedIn previews).
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: "72px 80px", color: "#fff",
          background: "radial-gradient(ellipse at 80% 30%, #2f6b82 0%, #0e2233 60%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "rgba(255,255,255,.9)" }}>
          Book at your&nbsp;<span style={{ color: "#c9a266" }}>fingertip</span>, cab at your&nbsp;<span style={{ color: "#c9a266" }}>doorstep</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 800, lineHeight: 1.05 }}>{SITE.name}</div>
          <div style={{ display: "flex", fontSize: 40, marginTop: 20, color: "rgba(255,255,255,.85)" }}>
            One-Way • Round Trip • Outstation • Tours
          </div>
          <div style={{ display: "flex", fontSize: 32, marginTop: 10, color: "rgba(255,255,255,.7)" }}>
            Tamil Nadu • Kerala • Karnataka • All over India
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 38, fontWeight: 700 }}>
          <div style={{ display: "flex", background: "#c9a266", color: "#0e2233", padding: "14px 30px", borderRadius: 999 }}>
            Call / WhatsApp {SITE.phoneDisplay}
          </div>
          <div style={{ display: "flex", marginLeft: 28, fontSize: 30, color: "rgba(255,255,255,.75)" }}>24/7</div>
        </div>
      </div>
    ),
    size,
  );
}

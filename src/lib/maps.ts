"use client";
/**
 * Google Maps Platform helpers (spec §41).
 * Places Autocomplete → Directions (actual road distance, never straight-line).
 * If NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set, `hasMapsKey` is false and the
 * estimator falls back to a manual distance field.
 */
export const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
export const hasMapsKey = MAPS_KEY.length > 0;

let loader: Promise<typeof google> | null = null;

export function loadGoogleMaps(): Promise<typeof google> {
  if (typeof window === "undefined") return Promise.reject(new Error("SSR"));
  if (!hasMapsKey) return Promise.reject(new Error("NO_KEY"));
  if (window.google?.maps?.places) return Promise.resolve(window.google);
  if (loader) return loader;
  loader = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_KEY}&libraries=places&region=IN&language=en`;
    s.async = true;
    s.onload = () => resolve(window.google);
    s.onerror = () => reject(new Error("MAPS_LOAD_FAILED"));
    document.head.appendChild(s);
  });
  return loader;
}

export interface RouteResult {
  km: number;
  minutes: number;
  legs: { from: string; to: string; km: number }[];
}

/**
 * Road distance through all points in order (origin, ...stops, destination).
 * Tries the server route (/api/distance → Google Routes API, or OpenStreetMap without a key) first, then the
 * browser DirectionsService if a public key is configured.
 */
export async function getRoadRoute(points: string[]): Promise<RouteResult> {
  const clean = points.map((p) => p.trim()).filter(Boolean);
  if (clean.length < 2) throw new Error("NEED_TWO_POINTS");
  try {
    const res = await fetch("/api/distance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ points: clean }),
    });
    const data = await res.json();
    if (res.ok && data.km > 0) return data as RouteResult;
  } catch {
    /* fall through to browser directions */
  }
  return getBrowserRoute(clean);
}

async function getBrowserRoute(clean: string[]): Promise<RouteResult> {
  const g = await loadGoogleMaps();
  const svc = new g.maps.DirectionsService();
  const res = await svc.route({
    origin: clean[0],
    destination: clean[clean.length - 1],
    waypoints: clean.slice(1, -1).map((location) => ({ location, stopover: true })),
    travelMode: g.maps.TravelMode.DRIVING,
    region: "IN",
  });
  const legs = res.routes[0]?.legs ?? [];
  let meters = 0;
  let secs = 0;
  const out = legs.map((l, i) => {
    meters += l.distance?.value ?? 0;
    secs += l.duration?.value ?? 0;
    return { from: clean[i], to: clean[i + 1], km: Math.round((l.distance?.value ?? 0) / 1000) };
  });
  return { km: Math.round(meters / 1000), minutes: Math.round(secs / 60), legs: out };
}

/** Rough duration when Google is unavailable: ~50 km/h average on Indian highways. */
export const estimateMinutes = (km: number) => Math.round((km / 50) * 60);

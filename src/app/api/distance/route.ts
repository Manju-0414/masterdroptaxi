import { NextResponse } from "next/server";
import { osmRoute } from "@/lib/osm";

/**
 * Road distance between pickup → (stops) → drop via Google Routes API (computeRoutes).
 * Uses GOOGLE_MAPS_API_KEY (server-only), falling back to NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.
 * Enable "Routes API" on the key's Google Cloud project.
 * Without a key, uses free OpenStreetMap services (Photon + OSRM) instead.
 */
const KEY = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

const secs = (d?: string) => Number(String(d ?? "0s").replace("s", "")) || 0;

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const points: string[] = Array.isArray(body.points)
    ? body.points.map((p: unknown) => String(p ?? "").trim()).filter(Boolean).slice(0, 25)
    : [];
  if (points.length < 2) return NextResponse.json({ error: "NEED_TWO_POINTS" }, { status: 400 });

  if (!KEY) {
    try {
      return NextResponse.json(await osmRoute(points));
    } catch (e) {
      return NextResponse.json({ error: (e as Error).message }, { status: 502 });
    }
  }

  const res = await fetch("https://routes.googleapis.com/directions/v2:computeRoutes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": KEY,
      "X-Goog-FieldMask": "routes.distanceMeters,routes.duration,routes.legs.distanceMeters,routes.legs.duration",
    },
    body: JSON.stringify({
      origin: { address: points[0] },
      destination: { address: points[points.length - 1] },
      intermediates: points.slice(1, -1).map((address) => ({ address })),
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_UNAWARE",
      regionCode: "IN",
      languageCode: "en",
      units: "METRIC",
    }),
    cache: "no-store",
  }).catch(() => null);

  const data = res ? await res.json().catch(() => null) : null;
  const route = data?.routes?.[0];
  if (!res?.ok || !route) {
    return NextResponse.json({ error: data?.error?.message ?? "ROUTE_NOT_FOUND" }, { status: 502 });
  }

  const legs = (route.legs ?? []).map((l: { distanceMeters?: number }, i: number) => ({
    from: points[i],
    to: points[i + 1],
    km: Math.round((l.distanceMeters ?? 0) / 1000),
  }));
  return NextResponse.json({
    km: Math.round((route.distanceMeters ?? 0) / 1000),
    minutes: Math.round(secs(route.duration) / 60),
    legs,
  });
}

import { NextResponse } from "next/server";
import { searchPlaces } from "@/lib/osm";

/**
 * Location suggestions for the pickup / drop dropdowns via Google Places API (New) autocomplete.
 * Uses GOOGLE_MAPS_API_KEY (server-only), falling back to NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.
 * Enable "Places API (New)" on the key's Google Cloud project.
 * Without a key, uses free OpenStreetMap search (Photon) instead.
 */
const KEY = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

interface Prediction {
  placeId?: string;
  text?: { text?: string };
  structuredFormat?: { mainText?: { text?: string }; secondaryText?: { text?: string } };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const input = (searchParams.get("q") ?? "").trim().slice(0, 120);
  const sessionToken = (searchParams.get("session") ?? "").slice(0, 64) || undefined;
  if (input.length < 2) return NextResponse.json({ suggestions: [] });

  if (!KEY) {
    try {
      const places = await searchPlaces(input);
      return NextResponse.json({ suggestions: places.map(({ id, main, secondary, value }) => ({ id, main, secondary, value })) });
    } catch {
      return NextResponse.json({ error: "PLACES_FAILED" }, { status: 502 });
    }
  }

  const res = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Goog-Api-Key": KEY },
    body: JSON.stringify({ input, includedRegionCodes: ["in"], languageCode: "en", sessionToken }),
    cache: "no-store",
  }).catch(() => null);

  const data = res ? await res.json().catch(() => null) : null;
  if (!res?.ok) return NextResponse.json({ error: data?.error?.message ?? "PLACES_FAILED" }, { status: 502 });

  const suggestions = ((data?.suggestions ?? []) as { placePrediction?: Prediction }[])
    .map((s) => s.placePrediction)
    .filter((p): p is Prediction => !!p?.text?.text)
    .map((p) => ({
      id: p.placeId ?? p.text!.text!,
      main: p.structuredFormat?.mainText?.text ?? p.text!.text!,
      secondary: p.structuredFormat?.secondaryText?.text ?? "",
      value: p.text!.text!,
    }));
  return NextResponse.json({ suggestions });
}

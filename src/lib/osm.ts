/**
 * Free, key-less location + road distance helpers (server-side only).
 * - Photon (photon.komoot.io, OpenStreetMap data): place search / geocoding
 * - OSRM public router (router.project-osrm.org): driving distance and time
 * Falls back to straight-line distance × a road factor if the router is unreachable.
 */
const UA = { "User-Agent": "MasterDropTaxi/1.0 (fare estimator)" };
// India bounding box: minLon, minLat, maxLon, maxLat
const INDIA_BBOX = "68.1,6.5,97.5,35.7";
// Indian roads are typically ~25% longer than the straight line between two towns.
const ROAD_FACTOR = 1.25;
const AVG_KMPH = 50;

export interface Place {
  id: string;
  main: string;
  secondary: string;
  value: string;
  lat: number;
  lon: number;
}

interface PhotonFeature {
  geometry: { coordinates: [number, number] };
  properties: {
    osm_id?: number;
    osm_type?: string;
    name?: string;
    street?: string;
    city?: string;
    district?: string;
    county?: string;
    state?: string;
    country?: string;
    countrycode?: string;
  };
}

export async function searchPlaces(q: string, limit = 8): Promise<Place[]> {
  const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=${limit + 4}&lang=en&bbox=${INDIA_BBOX}`;
  const res = await fetch(url, { headers: UA, next: { revalidate: 86400 } });
  if (!res.ok) throw new Error("PLACES_FAILED");
  const data = (await res.json()) as { features?: PhotonFeature[] };
  const seen = new Set<string>();
  const out: Place[] = [];
  for (const f of data.features ?? []) {
    const p = f.properties;
    if (p.countrycode && p.countrycode !== "IN") continue;
    const main = p.name || p.street || p.city;
    if (!main) continue;
    const area = [p.city !== main ? p.city : "", p.district || p.county, p.state].filter(Boolean);
    const secondary = [...new Set(area)].join(", ");
    const value = secondary ? `${main}, ${secondary}` : main;
    if (seen.has(value)) continue;
    seen.add(value);
    const [lon, lat] = f.geometry.coordinates;
    out.push({ id: `${p.osm_type ?? ""}${p.osm_id ?? value}`, main, secondary, value, lat, lon });
    if (out.length >= limit) break;
  }
  return out;
}

async function geocode(text: string): Promise<{ lat: number; lon: number }> {
  const [first] = await searchPlaces(text, 1);
  if (!first) throw new Error(`PLACE_NOT_FOUND:${text}`);
  return first;
}

const haversineKm = (a: { lat: number; lon: number }, b: { lat: number; lon: number }) => {
  const r = (d: number) => (d * Math.PI) / 180;
  const dLat = r(b.lat - a.lat);
  const dLon = r(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
};

export interface OsmRoute {
  km: number;
  minutes: number;
  legs: { from: string; to: string; km: number }[];
  method: "road" | "approx";
}

/** Driving distance through all points in order (origin, ...stops, destination). */
export async function osmRoute(points: string[]): Promise<OsmRoute> {
  const coords = await Promise.all(points.map(geocode));

  try {
    const path = coords.map((c) => `${c.lon.toFixed(6)},${c.lat.toFixed(6)}`).join(";");
    const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${path}?overview=false`, {
      headers: UA,
      signal: AbortSignal.timeout(10000),
      next: { revalidate: 86400 },
    });
    const data = await res.json();
    const route = data?.routes?.[0];
    if (!res.ok || data.code !== "Ok" || !route) throw new Error("OSRM_FAILED");
    return {
      km: Math.round(route.distance / 1000),
      minutes: Math.round(route.duration / 60),
      legs: (route.legs ?? []).map((l: { distance: number }, i: number) => ({
        from: points[i],
        to: points[i + 1],
        km: Math.round(l.distance / 1000),
      })),
      method: "road",
    };
  } catch {
    // Router down → straight-line distance adjusted for roads.
    const legs = coords.slice(1).map((c, i) => ({
      from: points[i],
      to: points[i + 1],
      km: Math.round(haversineKm(coords[i], c) * ROAD_FACTOR),
    }));
    const km = legs.reduce((s, l) => s + l.km, 0);
    return { km, minutes: Math.round((km / AVG_KMPH) * 60), legs, method: "approx" };
  }
}

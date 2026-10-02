import type { Vehicle } from "@/data/vehicles";

export type TripType = "oneway" | "round" | "multi" | "local" | "tour";

export interface FareInput {
  vehicle: Vehicle;
  tripType: TripType;
  /** total road distance to be charged (already includes return legs) */
  km: number;
  /** number of days for round / tour trips (min 1) */
  days?: number;
}

export interface FareBreakdown {
  km: number;
  chargeableKm: number;
  rate: number;
  baseFare: number;
  driverAllowance: number;
  days: number;
  total: number;
  minKmApplied: boolean;
}

/**
 * Fare architecture (spec §42):
 * road distance → trip type → vehicle → minimum km → per-km rate
 * → driver allowance → (toll / permit / parking shown as "as applicable") → total
 */
export function calculateFare({ vehicle, tripType, km, days = 1 }: FareInput): FareBreakdown {
  const d = Math.max(1, Math.round(days));
  let rate = vehicle.oneWayRate;
  let minKm = vehicle.minKmOneWay;
  let allowanceDays = 1;

  switch (tripType) {
    case "round":
    case "tour":
    case "multi":
      rate = vehicle.roundTripRate;
      minKm = vehicle.minKmPerDay * d;
      allowanceDays = d;
      break;
    case "local":
      rate = vehicle.localRate;
      minKm = 0;
      allowanceDays = 0;
      break;
    default:
      break;
  }

  const safeKm = Math.max(0, Math.round(km));
  const chargeableKm = Math.max(safeKm, minKm);
  const baseFare = chargeableKm * rate;
  const driverAllowance = safeKm > 0 ? vehicle.driverAllowance * allowanceDays : 0;

  return {
    km: safeKm,
    chargeableKm,
    rate,
    baseFare,
    driverAllowance,
    days: d,
    total: safeKm > 0 ? baseFare + driverAllowance : 0,
    minKmApplied: chargeableKm > safeKm && safeKm > 0,
  };
}

export function daysBetween(start?: string, end?: string) {
  if (!start || !end) return 1;
  const a = new Date(start);
  const b = new Date(end);
  const diff = Math.round((b.getTime() - a.getTime()) / 86_400_000);
  return Math.max(1, diff + 1);
}

export const inr = (n: number) =>
  "₹" + Math.round(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });

export function formatDuration(mins: number) {
  if (!mins) return "—";
  const h = Math.floor(mins / 60);
  const m = Math.round(mins % 60);
  return h ? `${h} hr ${m} min` : `${m} min`;
}

export function makeBookingId() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `MDT-${n}`;
}

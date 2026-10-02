/**
 * Vehicle & pricing configuration.
 * This file is the single source of truth until the admin panel exists —
 * it is served by /api/pricing and components read it through usePricing(),
 * so swapping to a database later needs no UI changes.
 *
 * Rates are set once per vehicle type (TARIFFS); every car in CARS inherits its type's tariff.
 * One-way / round-trip rates, minimum km, driver allowance and waiting charges
 * are the business's confirmed tariff. Local rates are still placeholders.
 */
export type VehicleShape = "sedan" | "compact" | "suv" | "muv" | "tempo";

export type VehicleType = "Mini" | "Sedan" | "SUV" | "SUV Premium";

export interface Tariff {
  seats: string;
  bags: string;
  highlights: string[];
  /** ₹ per km */
  oneWayRate: number;
  roundTripRate: number;
  localRate: number;
  /** minimum chargeable km for a one-way trip */
  minKmOneWay: number;
  /** minimum chargeable km per day for round / tour trips */
  minKmPerDay: number;
  /** driver allowance per day (₹) */
  driverAllowance: number;
  /** waiting charge per hour (₹) */
  waitingPerHour: number;
}

export interface Vehicle extends Tariff {
  id: string;
  name: string;
  type: VehicleType;
  /** sub-label shown under the name, e.g. "Sedan" */
  category: string;
  shape: VehicleShape;
  ac: boolean;
  music: boolean;
  /** short blurb shown on the fleet card */
  description: string;
  active: boolean;
  color: string;
  /** picker icon file in the CDN's vehicle-icon/ folder; falls back to the drawn car when absent */
  image?: string;
  /** side-view photo in the CDN's vechile-list/ folder, shown on the fleet cards */
  fleetImage?: string;
}

export const VEHICLE_TYPES: VehicleType[] = ["Mini", "Sedan", "SUV", "SUV Premium"];

export const TARIFFS: Record<VehicleType, Tariff> = {
  Mini: {
    seats: "4",
    bags: "1–2",
    highlights: ["Air Conditioning", "Budget friendly", "Easy in city traffic"],
    oneWayRate: 14,
    roundTripRate: 13,
    localRate: 17, // TODO(business): confirm local rate
    minKmOneWay: 130,
    minKmPerDay: 250,
    driverAllowance: 400,
    waitingPerHour: 150, // TODO(business): confirm — Mini waiting charge not given, using Sedan rate
  },
  Sedan: {
    seats: "4",
    bags: "2–3",
    highlights: ["Air Conditioning", "Music System", "Comfortable Seats"],
    oneWayRate: 15,
    roundTripRate: 14,
    localRate: 18, // TODO(business): confirm local rate
    minKmOneWay: 130,
    minKmPerDay: 250,
    driverAllowance: 400,
    waitingPerHour: 150,
  },
  SUV: {
    seats: "6–7",
    bags: "4",
    highlights: ["Spacious luggage area", "Comfortable seating", "Ideal for family trips"],
    oneWayRate: 20,
    roundTripRate: 19,
    localRate: 24, // TODO(business): confirm local rate
    minKmOneWay: 130,
    minKmPerDay: 250,
    driverAllowance: 500,
    waitingPerHour: 180,
  },
  "SUV Premium": {
    seats: "7",
    bags: "4–5",
    highlights: ["Premium comfort", "Large luggage capacity", "Ideal for family & tours"],
    oneWayRate: 23,
    roundTripRate: 22,
    localRate: 27, // TODO(business): confirm local rate
    minKmOneWay: 130,
    minKmPerDay: 250,
    driverAllowance: 500,
    waitingPerHour: 180,
  },
};

type Car = Pick<Vehicle, "id" | "name" | "type" | "shape" | "color" | "description" | "image" | "fleetImage">;

const CARS: Car[] = [
  // Mini
  { id: "swift", name: "Maruti Swift", type: "Mini", shape: "compact", color: "#C04B3C", image: "mini-swift.png", fleetImage: "mini-swift-r.png", description: "Peppy AC hatchback — quick and economical for city rides, airport drops and short trips." },
  { id: "wagonr", name: "Maruti WagonR", type: "Mini", shape: "compact", color: "#3E7CB1", image: "wagonR.png", fleetImage: "wagonR-r.png", description: "Tall-boy hatchback with easy entry and good headroom. A budget pick for everyday rides." },
  { id: "spresso", name: "Maruti S-Presso", type: "Mini", shape: "compact", color: "#E08A2E", image: "spresso.png", fleetImage: "spresso-r.png", description: "Compact and fuel-efficient — the most affordable way to get around town." },
  // Sedan
  { id: "etios", name: "Toyota Etios", type: "Sedan", shape: "sedan", color: "#8A6A3A", image: "etios.png", fleetImage: "etios-r.png", description: "Reliable Toyota Etios with a smooth ride and roomy boot — a favourite for long highway journeys." },
  { id: "dzire", name: "Swift Dzire", type: "Sedan", shape: "sedan", color: "#2F6B82", image: "swift.jpeg", fleetImage: "swiftdesire-r.png", description: "Comfortable AC sedan for city rides, airport drops and outstation trips. Ideal for small families." },
  { id: "amaze", name: "Honda Amaze", type: "Sedan", shape: "sedan", color: "#5B6770", image: "amaze.png", fleetImage: "amaze-r.png", description: "Spacious cabin and a big boot — relaxed comfort for couples and small families." },
  { id: "aura", name: "Hyundai Aura", type: "Sedan", shape: "sedan", color: "#7A3B2E", image: "aura.png", fleetImage: "aura-r.png", description: "Modern, quiet sedan with a comfortable ride for city and highway travel." },
  { id: "ciaz", name: "Maruti Ciaz", type: "Sedan", shape: "sedan", color: "#1B3A4E", image: "claz.png", fleetImage: "claz-r.png", description: "Premium sedan with generous rear legroom — great for business and long trips." },
  // SUV
  { id: "innova", name: "Toyota Innova", type: "SUV", shape: "muv", color: "#6E7C86", image: "innova.png", fleetImage: "Innova-r.png", description: "Trusted 7-seater for families and groups, with plenty of luggage room for tours." },
  { id: "xylo", name: "Mahindra Xylo", type: "SUV", shape: "suv", color: "#0E2233", image: "xylo.png", fleetImage: "Xylo-r.png", description: "Rugged, roomy 7-seater that handles hill roads and long journeys with ease." },
  { id: "ertiga", name: "Maruti Ertiga", type: "SUV", shape: "muv", color: "#355C4B", image: "ertiga.png", fleetImage: "ertiga-r.png", description: "Comfortable, fuel-efficient 7-seater — ideal for family trips and airport runs." },
  { id: "rumion", name: "Toyota Rumion", type: "SUV", shape: "muv", color: "#4F6B2F", image: "rumion.png", fleetImage: "rumion-r.png", description: "Toyota's practical 7-seater with a smooth ride and flexible seating." },
  { id: "carens", name: "Kia Carens", type: "SUV", shape: "muv", color: "#8E2F4A", image: "kia-carens.png", fleetImage: "KIA-r.png", description: "Modern 6–7 seater with a premium cabin for comfortable family travel." },
  { id: "marazzo", name: "Mahindra Marazzo", type: "SUV", shape: "muv", color: "#2B5876", image: "marazzo.png", fleetImage: "marazzo-r.png", description: "Spacious, quiet 7-seater with great ride comfort on long highway drives." },
  { id: "triber", name: "Renault Triber", type: "SUV", shape: "compact", color: "#A0461F", image: "triber.png", fleetImage: "triber-r.png", description: "Compact 7-seater — an economical choice for small groups and families." },
  // SUV Premium
  { id: "crysta", name: "Innova Crysta", type: "SUV Premium", shape: "muv", color: "#C9A266", image: "innova-crysta.png", fleetImage: "innovacrysta-r.png", description: "Premium Innova Crysta — plenty of legroom, big luggage space and all-day comfort on tours." },
];

export const VEHICLES: Vehicle[] = CARS.map((c) => ({
  ...TARIFFS[c.type],
  ...c,
  category: c.type,
  ac: true,
  music: true,
  active: true,
}));

export const DEFAULT_VEHICLE_ID = "dzire";

export const EXTRA_CHARGES = {
  nightChargePercent: 0, // TODO(business)
  tollNote: "As applicable",
  permitNote: "As applicable (interstate)",
  parkingNote: "As applicable",
};

/** Charges never included in an estimate — shown on the estimate screen, PDF and WhatsApp message. */
export const EXTRAS_NOTICE =
  "Toll fees, parking charges, state permit charges and hill charges are NOT included in this estimate. They are payable extra, as applicable.";

export const FARE_NOTICE =
  "Final fare may vary based on tolls, permits, parking charges, waiting charges, route changes and applicable fees.";

export const WAITING_NOTICE =
  "Waiting charges are applicable according to the selected vehicle and trip policy. Additional charges may apply for extended waiting, night travel, parking, tolls, permits and route deviations.";

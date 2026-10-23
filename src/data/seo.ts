/**
 * Search keywords and the homepage SEO copy, grouped by the page they target.
 * Each page's primary keyword comes first in its list.
 */

export const HOME_SEO = {
  title: "Master Drop Taxi | Airport, One-Way & Outstation Cabs Bengaluru",
  description:
    "Book Master Drop Taxi in Bengaluru for airport pickup and drop, one-way taxi rides, and outstation travel. Check fares, plan your journey, and contact us for easy taxi bookings.",
  h1: "Master Drop Taxi – Bengaluru Airport, One-Way & Outstation Taxi Service",
};

export const KW = {
  brand: [
    "Master Drop Taxi Service", "Master Drop Taxi", "Master Drop Taxi booking", "Master Drop Taxi Bengaluru",
  ],
  bengaluru: [
    "Taxi service in Bengaluru", "Call taxi in Bengaluru", "Cab booking in Bengaluru", "Best taxi service in Bengaluru",
    "Online taxi booking Bengaluru", "Affordable taxi service Bengaluru", "Private taxi service Bengaluru", "Taxi hire in Bengaluru",
    "Book a cab in Bengaluru", "Family taxi service Bengaluru", "Corporate taxi service Bengaluru", "Reliable taxi service near me",
  ],
  local: [
    "Local taxi service in Bengaluru", "Local cab booking Bengaluru", "Full day taxi rental Bengaluru", "Half day taxi rental Bengaluru",
    "City taxi booking Bengaluru", "Local car rental with driver Bengaluru",
  ],
  airport: [
    "Bengaluru airport taxi service", "Bengaluru airport taxi", "Bangalore airport taxi service", "Airport pickup and drop Bengaluru",
    "Taxi to Bengaluru airport", "Airport cab booking Bengaluru", "Kempegowda International Airport taxi", "BLR airport pickup and drop",
    "Airport transfer service Bengaluru", "24 hours airport taxi Bengaluru", "Airport drop taxi booking Bengaluru",
    "Bangalore airport drop taxi service", "One way cab to Chennai airport", "Bengaluru to Chennai airport taxi booking",
    "Airport drop taxi service",
  ],
  oneWay: [
    "One way drop taxi from Bengaluru", "One way taxi from Bengaluru", "One way cab booking Bengaluru", "One way drop taxi Bengaluru",
    "Outstation one way taxi Bengaluru", "One way drop taxi", "One way taxi rental", "One way cab booking", "Cheapest one way taxi",
    "Nearest one way drop taxi", "Bengaluru to Chennai one way taxi", "Bengaluru to Coimbatore one way taxi",
    "Bengaluru to Mysuru one way taxi", "Bengaluru to Salem one way taxi", "Bengaluru to Karur one way taxi",
    "Bengaluru to Madurai one way taxi",
  ],
  outstation: [
    "Outstation taxi from Bengaluru", "Outstation taxi service Bengaluru", "Outstation cab booking Bengaluru", "Bengaluru outstation car rental",
    "Intercity taxi service Bengaluru", "Long distance taxi from Bengaluru", "Family outstation taxi Bengaluru",
    "Bengaluru to Tamil Nadu taxi service", "Bengaluru to Kerala taxi service", "Bengaluru to Andhra Pradesh taxi service",
    "Outstation drop taxi", "Outstation one way taxi", "Long distance drop taxi", "Intercity drop taxi", "Outstation cab booking",
    "Highway drop taxi", "Outstation taxi near me", "Best outstation taxi near me", "Outstation taxi for tourist places",
    "Hill station drop taxi rental Ooty Kodaikanal Yercaud", "Best outstation cab offers",
  ],
  roundTrip: ["Round trip taxi booking Bengaluru", "Round trip taxi from Bengaluru", "Round trip taxi booking"],
  dropTaxi: [
    "Best drop taxi service", "Drop taxi in Tamil Nadu", "Drop taxi service near me", "Drop taxi nearby", "24/7 drop taxi service",
    "Urgent drop taxi booking", "Emergency drop taxi booking", "Midnight outstation cab service", "Safe drop taxi for family",
    "Chennai to Bangalore drop taxi", "Bangalore to Chennai drop taxi", "Chennai to Coimbatore drop taxi",
    "Coimbatore to Bangalore drop taxi", "Trichy to Madurai drop taxi", "Drop taxi to Bangalore", "Drop taxi to Chennai",
    "Drop taxi to Madurai", "Drop taxi to Salem",
  ],
  fares: [
    "Cheap drop taxi", "Affordable drop taxi service", "Lowest fare drop taxi", "Drop taxi per km rate", "Budget outstation taxi",
    "Drop taxi fare calculator", "No hidden charges drop taxi", "Transparent billing drop taxi", "Instant booking confirmation taxi",
  ],
  fleet: [
    "Sedan drop taxi booking", "SUV drop taxi service", "Innova drop taxi for outstation", "Innova Crysta drop taxi price",
    "Ertiga drop taxi rental", "Swift Dzire one way taxi fare", "Etios drop taxi service near me", "7 seater drop taxi for outstation",
    "AC drop taxi service", "Luxury outstation drop taxi",
  ],
  trust: [
    "Professional drop taxi service", "Safe outstation taxi for women", "On-time pickup drop taxi", "Safe one way taxi service for night travel",
    "Sanitized outstation cab service",
  ],
  occasions: ["Festival outstation taxi offers", "Marriage function cab rental", "Family taxi booking from Bengaluru to Tamil Nadu"],
};

/** Homepage: brand + every service's lead terms. */
export const HOME_KEYWORDS = [
  ...KW.brand, ...KW.bengaluru, ...KW.airport.slice(0, 6), ...KW.oneWay.slice(0, 8), ...KW.outstation.slice(0, 8),
  ...KW.roundTrip, ...KW.local.slice(0, 3), ...KW.dropTaxi.slice(0, 6), ...KW.fares.slice(0, 5),
];

export const SERVICES_KEYWORDS = [
  ...KW.local, ...KW.airport, ...KW.oneWay, ...KW.outstation, ...KW.roundTrip, ...KW.occasions,
];

export const PLANS_KEYWORDS = [...KW.fares, ...KW.fleet, "Outstation taxi for tourist places", "Hill station drop taxi rental Ooty Kodaikanal Yercaud"];

export const FAQ_KEYWORDS = [
  "Which is the best drop taxi in Tamil Nadu", "Drop taxi cost per km", "Is toll charge included in drop taxi",
  "How to book a drop taxi online", "Cheapest way to travel between cities in Tamil Nadu", ...KW.trust, ...KW.fares.slice(0, 4),
];

export const ABOUT_KEYWORDS = ["Master Drop Taxi Bengaluru", ...KW.brand.slice(0, 3), ...KW.trust, "Best taxi service in Bengaluru"];

export const CONTACT_KEYWORDS = [
  "Contact Master Drop Taxi Service", "Master Drop Taxi phone number", "Master Drop Taxi booking", "Book a cab in Bengaluru",
  "Call taxi in Bengaluru", "24/7 drop taxi service", "Urgent drop taxi booking", "Instant booking confirmation taxi",
];

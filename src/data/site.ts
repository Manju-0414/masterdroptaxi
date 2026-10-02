import { cdn } from "@/lib/cdn";

/**
 * Business contact & brand details.
 * TODO(business): confirm email and verify stats before going live.
 */
export const SITE = {
  name: "Master Drop Taxi",
  tagline: "Book at your fingertip, cab at your doorstep",
  description:
    "Reliable taxi and travel services for local rides, outstation journeys, tours and pilgrimage travel.",
  phoneDisplay: "+91 97871 11277",
  phoneTel: "+919787111277",
  whatsapp: "919787111277",
  email: "booking@masterdroptaxi.com", // placeholder — replace with the real inbox
  address: "No. 170, TVS Main Road, Attibele, Anekal, Bangalore, Karnataka 562107",
  hours: "Open 24 hours, 7 days a week",
  mapQuery: "No. 170, TVS Main Road, Attibele, Anekal, Bangalore, Karnataka 562107",
  /** Optional hero background video (mp4 in /public). Leave empty for the animated highway scene. */
  heroVideo: "",
  url: "https://www.masterdroptaxi.com",
  /** brand logo, served from the Cloudflare R2 bucket */
  logo: cdn("masterdroptaxi-logo.png"),
  logoFile: "masterdroptaxi-logo.png",
};

/** Only publish numbers the business can verify (spec §3, §15). */
export const STATS = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 50000, suffix: "+", label: "Customers Served" },
  { value: 24, suffix: "/7", label: "Support" },
  { value: 4, suffix: "", label: "Vehicle Types" },
];

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/plans", label: "Plans" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export const telLink = `tel:${SITE.phoneTel}`;

export function waLink(text?: string) {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const DEFAULT_WA_TEXT = "Hi Master Drop Taxi, I would like to book a taxi.";

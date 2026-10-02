/**
 * Local location list for the pickup / drop dropdowns.
 * Shown before the user types, and merged with online suggestions while they type.
 */
export interface LocalPlace {
  name: string;
  /** shown under the name in the dropdown */
  secondary: string;
  /** value written into the field (district names carry the state so route lookup is unambiguous) */
  value: string;
  /** other common names that should also match, e.g. "Trichy" for Tiruchirappalli */
  alt?: string[];
}

/** Pickup points near the office and frequent destinations — listed first. */
const POPULAR = [
  "Attibele", "Bangalore", "Electronic City", "Anekal", "Chandapura", "Sarjapur", "Hosur",
  "Bangalore Airport", "KSR Bengaluru Railway Station", "Tirupati", "Pondicherry",
  "Ooty", "Kodaikanal", "Yercaud", "Valparai", "Rameswaram", "Kumbakonam", "Palani", "Pollachi", "Tiruchendur",
  "Chennai Airport", "Coimbatore Airport", "Madurai Airport", "Trichy Airport",
];

type District = [name: string, alt?: string[]];

const DISTRICTS: Record<string, District[]> = {
  Karnataka: [
    ["Bagalkot"], ["Ballari", ["Bellary"]], ["Belagavi", ["Belgaum"]], ["Bengaluru Rural"],
    ["Bengaluru Urban", ["Bangalore"]], ["Bengaluru South", ["Ramanagara"]], ["Bidar"], ["Chamarajanagar"],
    ["Chikkaballapur"], ["Chikkamagaluru", ["Chikmagalur"]], ["Chitradurga"],
    ["Dakshina Kannada", ["Mangaluru", "Mangalore"]], ["Davanagere"], ["Dharwad", ["Hubli", "Hubballi"]],
    ["Gadag"], ["Hassan"], ["Haveri"], ["Kalaburagi", ["Gulbarga"]], ["Kodagu", ["Coorg", "Madikeri"]],
    ["Kolar"], ["Koppal"], ["Mandya"], ["Mysuru", ["Mysore"]], ["Raichur"], ["Shivamogga", ["Shimoga"]],
    ["Tumakuru", ["Tumkur"]], ["Udupi"], ["Uttara Kannada", ["Karwar"]], ["Vijayanagara", ["Hospet", "Hosapete"]],
    ["Vijayapura", ["Bijapur"]], ["Yadgir"],
  ],
  "Tamil Nadu": [
    ["Ariyalur"], ["Chengalpattu"], ["Chennai", ["Madras"]], ["Coimbatore", ["Kovai"]], ["Cuddalore"],
    ["Dharmapuri"], ["Dindigul"], ["Erode"], ["Kallakurichi"], ["Kanchipuram"],
    ["Kanniyakumari", ["Kanyakumari", "Nagercoil"]], ["Karur"], ["Krishnagiri"], ["Madurai"], ["Mayiladuthurai"],
    ["Nagapattinam"], ["Namakkal"], ["Nilgiris", ["Ooty", "Udhagamandalam", "Coonoor"]], ["Perambalur"],
    ["Pudukkottai"], ["Ramanathapuram"], ["Ranipet"], ["Salem"], ["Sivaganga", ["Karaikudi"]], ["Tenkasi"],
    ["Thanjavur", ["Tanjore"]], ["Theni"], ["Thoothukudi", ["Tuticorin"]], ["Tiruchirappalli", ["Trichy"]],
    ["Tirunelveli"], ["Tirupathur"], ["Tiruppur"], ["Tiruvallur"], ["Tiruvannamalai"], ["Tiruvarur"],
    ["Vellore"], ["Viluppuram", ["Villupuram"]], ["Virudhunagar"],
  ],
  Kerala: [
    ["Alappuzha", ["Alleppey"]], ["Ernakulam", ["Kochi", "Cochin"]], ["Idukki", ["Munnar"]],
    ["Kannur", ["Cannanore"]], ["Kasaragod"], ["Kollam", ["Quilon"]], ["Kottayam"],
    ["Kozhikode", ["Calicut"]], ["Malappuram"], ["Palakkad", ["Palghat"]], ["Pathanamthitta", ["Sabarimala"]],
    ["Thiruvananthapuram", ["Trivandrum"]], ["Thrissur", ["Trichur", "Guruvayur"]], ["Wayanad"],
  ],
};

export const LOCAL_PLACES: LocalPlace[] = [
  ...POPULAR.map((name) => ({ name, secondary: "Popular location", value: name })),
  ...Object.entries(DISTRICTS).flatMap(([state, list]) =>
    list.map(([name, alt]) => ({ name, alt, secondary: `District • ${state}`, value: `${name}, ${state}` }))
  ),
];

/** Local matches for a query: name prefix matches first, then alias / substring matches. */
export function searchLocalPlaces(query: string, limit = LOCAL_PLACES.length): LocalPlace[] {
  const q = query.trim().toLowerCase();
  if (!q) return LOCAL_PLACES.slice(0, limit);
  const starts: LocalPlace[] = [];
  const rest: LocalPlace[] = [];
  for (const p of LOCAL_PLACES) {
    const names = [p.name, ...(p.alt ?? [])].map((n) => n.toLowerCase());
    if (names.some((n) => n.startsWith(q))) starts.push(p);
    else if (names.some((n) => n.includes(q)) || p.secondary.toLowerCase().includes(q)) rest.push(p);
  }
  return [...starts, ...rest].slice(0, limit);
}

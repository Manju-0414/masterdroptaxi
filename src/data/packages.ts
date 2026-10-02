/**
 * Tour & temple packages. Editable content — will move to the admin panel.
 * Prices are intentionally "Get Quote" until the business confirms them.
 */
export type Scene = "hills" | "lake" | "tea" | "falls" | "sea" | "temple" | "city" | "road";

export interface TourPackage {
  id: string;
  name: string;
  kind: "tour" | "temple" | "local" | "outstation" | "round";
  duration: string;
  route: string[];
  places: string[];
  vehicle: string;
  distance?: string;
  startingPrice?: number;
  scene: Scene;
  tag?: string;
  hue: [string, string];
}

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: "ooty",
    name: "Ooty Tour",
    kind: "tour",
    duration: "2 Days / 1 Night",
    route: ["Attibele", "Hosur", "Krishnagiri", "Salem", "Mettupalayam", "Coonoor", "Ooty"],
    places: ["Coonoor", "Tea Gardens", "Doddabetta", "Ooty Lake", "Botanical Garden"],
    vehicle: "Sedan / Innova",
    scene: "hills",
    tag: "Popular",
    hue: ["#2F6B82", "#8CC0C9"],
  },
  {
    id: "kodaikanal",
    name: "Kodaikanal Tour",
    kind: "tour",
    duration: "2 Days / 1 Night",
    route: ["Attibele", "Hosur", "Salem", "Dindigul", "Batlagundu", "Kodaikanal"],
    places: ["Kodaikanal Lake", "Coaker's Walk", "Bryant Park", "Pillar Rocks", "Moir Point"],
    vehicle: "Sedan / SUV",
    scene: "lake",
    tag: "Best Seller",
    hue: ["#355C4B", "#9CC5A1"],
  },
  {
    id: "yercaud",
    name: "Yercaud Tour",
    kind: "tour",
    duration: "1 Day",
    route: ["Attibele", "Hosur", "Krishnagiri", "Salem", "Yercaud"],
    places: ["Yercaud Lake", "Pagoda Point", "Lady's Seat", "Emerald Lake"],
    vehicle: "Mini / Sedan",
    scene: "tea",
    hue: ["#4F6B2F", "#C5D98C"],
  },
  {
    id: "valparai",
    name: "Valparai Tour",
    kind: "tour",
    duration: "2 Days / 1 Night",
    route: ["Attibele", "Hosur", "Salem", "Coimbatore", "Pollachi", "Aliyar", "Valparai"],
    places: ["Aliyar", "Monkey Falls", "Valparai", "Tea Estates", "Sholayar"],
    vehicle: "SUV / Innova",
    scene: "falls",
    hue: ["#1E4B5A", "#7FB6C4"],
  },
  {
    id: "rameswaram",
    name: "Rameswaram Tour",
    kind: "tour",
    duration: "2 Days / 1 Night",
    route: ["Attibele", "Salem", "Madurai", "Ramanathapuram", "Rameswaram"],
    places: ["Ramanathaswamy Temple", "Pamban Bridge", "Dhanushkodi"],
    vehicle: "Sedan / Innova",
    scene: "sea",
    tag: "Pilgrimage",
    hue: ["#1F5D86", "#E4C08B"],
  },
];

export const TEMPLE_PACKAGES: TourPackage[] = [
  {
    id: "navagraha",
    name: "Navagraha Temple Tour",
    kind: "temple",
    duration: "2 Days",
    route: ["Attibele", "Salem", "Trichy", "Kumbakonam", "Navagraha Temples", "Attibele"],
    places: ["Suriyanar Koil", "Thingalur", "Vaitheeswaran Koil", "Alangudi", "Kanjanur", "Thirunallar"],
    vehicle: "Sedan / Innova",
    scene: "temple",
    tag: "Most Asked",
    hue: ["#8A4B1F", "#E4C08B"],
  },
  {
    id: "chola",
    name: "Chola Temple Tour",
    kind: "temple",
    duration: "1 Day",
    route: ["Attibele", "Salem", "Trichy", "Thanjavur", "Gangaikonda Cholapuram", "Darasuram"],
    places: ["Brihadeeswarar Temple", "Gangaikonda Cholapuram", "Airavatesvara Temple"],
    vehicle: "Sedan / SUV",
    scene: "temple",
    hue: ["#7A3B2E", "#E9B872"],
  },
  {
    id: "murugan",
    name: "Murugan Temple Tour",
    kind: "temple",
    duration: "3 Days",
    route: ["Attibele", "Salem", "Palani", "Thiruparankundram", "Tiruchendur", "Swamimalai"],
    places: ["Palani", "Thiruparankundram", "Tiruchendur", "Swamimalai", "Pazhamudircholai"],
    vehicle: "SUV / Innova",
    scene: "temple",
    hue: ["#A0461F", "#F2C46D"],
  },
  {
    id: "amman",
    name: "Amman Temple Tour",
    kind: "temple",
    duration: "1 Day",
    route: ["Attibele", "Salem", "Samayapuram", "Srirangam", "Attibele"],
    places: ["Samayapuram Mariamman", "Srirangam", "Thiruvanaikaval"],
    vehicle: "Sedan",
    scene: "temple",
    hue: ["#8E2F4A", "#EFA7A0"],
  },
  {
    id: "rameswaram-madurai",
    name: "Rameswaram – Madurai Temple Tour",
    kind: "temple",
    duration: "2 Days / 1 Night",
    route: ["Attibele", "Madurai", "Rameswaram", "Attibele"],
    places: ["Meenakshi Amman Temple", "Ramanathaswamy Temple", "Dhanushkodi"],
    vehicle: "Sedan / Innova",
    scene: "sea",
    hue: ["#1F5D86", "#F2C46D"],
  },
  {
    id: "tiruchendur",
    name: "Tiruchendur – Tirunelveli Tour",
    kind: "temple",
    duration: "2 Days",
    route: ["Attibele", "Madurai", "Tirunelveli", "Tiruchendur"],
    places: ["Nellaiappar Temple", "Tiruchendur Murugan Temple"],
    vehicle: "Sedan / SUV",
    scene: "sea",
    hue: ["#2B5876", "#E4C08B"],
  },
  {
    id: "palani-madurai",
    name: "Palani – Madurai Tour",
    kind: "temple",
    duration: "1 Day",
    route: ["Attibele", "Salem", "Palani", "Madurai"],
    places: ["Palani Murugan Temple", "Meenakshi Amman Temple"],
    vehicle: "Sedan",
    scene: "temple",
    hue: ["#6B3A1F", "#E9B872"],
  },
];

export const PLAN_CATEGORIES = [
  { id: "local", label: "Local Packages" },
  { id: "outstation", label: "Outstation Packages" },
  { id: "round", label: "Round Trips" },
  { id: "tour", label: "Tour Packages" },
  { id: "temple", label: "Temple Packages" },
  { id: "corporate", label: "Corporate Plans", soon: true },
] as const;

export const EXTRA_PLANS: TourPackage[] = [
  {
    id: "local-4h",
    name: "Local 4 Hrs / 40 KM",
    kind: "local",
    duration: "4 Hours",
    distance: "40 KM",
    route: ["Within city limits"],
    places: ["Shopping", "Meetings", "Appointments"],
    vehicle: "Mini / Sedan",
    scene: "city",
    hue: ["#0E2233", "#2F6B82"],
  },
  {
    id: "local-8h",
    name: "Local 8 Hrs / 80 KM",
    kind: "local",
    duration: "8 Hours",
    distance: "80 KM",
    route: ["Within city limits"],
    places: ["Family outings", "Business visits", "Multiple errands"],
    vehicle: "Any vehicle",
    scene: "city",
    hue: ["#1B3A4E", "#C9A266"],
  },
  {
    id: "bangalore-chennai",
    name: "Bangalore → Chennai Drop",
    kind: "outstation",
    duration: "One Way",
    route: ["Attibele", "Hosur", "Krishnagiri", "Vellore", "Chennai"],
    places: ["Door-to-door drop", "Airport / Railway drop"],
    vehicle: "Sedan / Innova",
    scene: "road",
    hue: ["#2F6B82", "#C9A266"],
  },
  {
    id: "bangalore-coimbatore",
    name: "Bangalore → Coimbatore Drop",
    kind: "outstation",
    duration: "One Way",
    route: ["Attibele", "Hosur", "Salem", "Erode", "Coimbatore"],
    places: ["Door-to-door drop", "Interstate permit as applicable"],
    vehicle: "Sedan / Innova",
    scene: "road",
    hue: ["#0E2233", "#8CC0C9"],
  },
  {
    id: "bangalore-mysuru-rt",
    name: "Bangalore ⇄ Mysuru",
    kind: "round",
    duration: "Same Day",
    route: ["Attibele", "Bangalore", "Mandya", "Mysuru", "Attibele"],
    places: ["Mysore Palace", "Chamundi Hills", "Business visits"],
    vehicle: "Any vehicle",
    scene: "road",
    hue: ["#355C4B", "#C9A266"],
  },
  {
    id: "bangalore-tirupati-rt",
    name: "Bangalore ⇄ Tirupati",
    kind: "round",
    duration: "Same Day",
    route: ["Attibele", "Krishnagiri", "Chittoor", "Tirupati", "Attibele"],
    places: ["Tirumala darshan", "Temple visit"],
    vehicle: "Any vehicle",
    scene: "temple",
    hue: ["#8A4B1F", "#2F6B82"],
  },
];

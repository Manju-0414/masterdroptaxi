/**
 * Service areas — powers the /taxi-service location pages, the home "Service Areas" section,
 * footer city links, sitemap and structured data.
 * Each city has its own blurb and highlights so every landing page has unique content.
 */
export type FocusState = "Karnataka" | "Tamil Nadu" | "Kerala";

export interface City {
  slug: string;
  name: string;
  state: FocusState | "Puducherry" | "Andhra Pradesh";
  /** one or two sentences unique to this city */
  blurb: string;
  /** landmarks / places travellers ask for */
  places: string[];
  /** a few popular trips from this city (names must match other cities where possible) */
  routes: string[];
  /** show in footer / home quick links */
  top?: boolean;
}

export const FOCUS_STATES: { name: FocusState; slug: string; text: string }[] = [
  {
    name: "Karnataka",
    slug: "karnataka",
    text: "Our home base — Attibele, Electronic City and all of Bangalore, with daily outstation runs to Mysuru, Coorg, Chikkamagaluru, Mangaluru and every district in the state.",
  },
  {
    name: "Tamil Nadu",
    slug: "tamil-nadu",
    text: "Hosur to Kanyakumari — Chennai, Coimbatore, Madurai, Trichy, hill stations like Ooty, Kodaikanal and Yercaud, and temple towns from Rameswaram to Thanjavur.",
  },
  {
    name: "Kerala",
    slug: "kerala",
    text: "Kochi, Munnar, Alleppey backwaters, Wayanad, Thekkady and Thiruvananthapuram — comfortable cabs for Kerala holidays, family visits and airport drops.",
  },
];

/** Beyond the three focus states — we take outstation trips anywhere in India. */
export const OTHER_REGIONS = [
  "Andhra Pradesh", "Telangana", "Puducherry", "Goa", "Maharashtra", "Odisha", "Gujarat", "Rajasthan", "Delhi NCR", "Madhya Pradesh",
];

export const CITIES: City[] = [
  // Karnataka
  {
    slug: "bangalore", name: "Bangalore", state: "Karnataka", top: true,
    blurb: "Airport transfers from Kempegowda International, office cabs for Whitefield and Electronic City, and one-way drops from Bangalore to anywhere in South India.",
    places: ["Kempegowda Airport", "KSR Bengaluru Station", "Whitefield", "Electronic City", "Koramangala", "MG Road"],
    routes: ["Mysuru", "Ooty", "Chennai", "Coorg", "Tirupati", "Kochi"],
  },
  {
    slug: "attibele", name: "Attibele", state: "Karnataka", top: true,
    blurb: "Our office is on TVS Main Road, Attibele — the quickest pickups in Attibele, Anekal, Chandapura and Sarjapur, right at the Karnataka–Tamil Nadu border.",
    places: ["TVS Main Road", "Anekal", "Chandapura", "Sarjapur", "Attibele Toll Plaza"],
    routes: ["Bangalore", "Hosur", "Chennai", "Ooty", "Salem", "Tirupati"],
  },
  {
    slug: "electronic-city", name: "Electronic City", state: "Karnataka", top: true,
    blurb: "Reliable cabs for Electronic City tech parks — early-morning airport runs, weekend getaways and outstation drops for IT professionals and families.",
    places: ["Infosys Campus", "Electronic City Phase 1 & 2", "Hosur Road", "Bommasandra"],
    routes: ["Bangalore", "Hosur", "Chennai", "Pondicherry", "Mysuru", "Coimbatore"],
  },
  {
    slug: "mysore", name: "Mysuru", state: "Karnataka", top: true,
    blurb: "Mysuru Palace, Chamundi Hills and Brindavan Gardens — plus easy onward trips to Coorg, Ooty via Bandipur and Wayanad.",
    places: ["Mysuru Palace", "Chamundi Hills", "Brindavan Gardens", "Srirangapatna", "Mysuru Zoo"],
    routes: ["Bangalore", "Coorg", "Ooty", "Wayanad", "Chikkamagaluru", "Hassan"],
  },
  {
    slug: "coorg", name: "Coorg", state: "Karnataka",
    blurb: "Coffee estates and misty hills of Kodagu — cabs for Madikeri, Abbey Falls, Dubare and Bylakuppe with drivers who know the ghat roads.",
    places: ["Madikeri", "Abbey Falls", "Raja's Seat", "Dubare Elephant Camp", "Bylakuppe Golden Temple"],
    routes: ["Bangalore", "Mysuru", "Mangaluru", "Wayanad", "Kozhikode", "Chikkamagaluru"],
  },
  {
    slug: "mangalore", name: "Mangaluru", state: "Karnataka",
    blurb: "Coastal Karnataka cabs for Mangaluru airport, temple circuits to Dharmasthala, Kukke Subramanya and Udupi, and beach drives along the coast.",
    places: ["Mangaluru Airport", "Panambur Beach", "Kadri Temple", "Dharmasthala", "Kukke Subramanya"],
    routes: ["Udupi", "Coorg", "Bangalore", "Chikkamagaluru", "Kozhikode", "Hassan"],
  },
  {
    slug: "udupi", name: "Udupi", state: "Karnataka",
    blurb: "Udupi Sri Krishna Temple, Malpe Beach, Manipal and Kollur Mookambika — temple and coastal trips with comfortable AC cabs.",
    places: ["Sri Krishna Temple", "Malpe Beach", "Manipal", "Kollur Mookambika", "St. Mary's Island"],
    routes: ["Mangaluru", "Bangalore", "Chikkamagaluru", "Coorg", "Hassan", "Mysuru"],
  },
  {
    slug: "chikmagalur", name: "Chikkamagaluru", state: "Karnataka",
    blurb: "Mullayanagiri, Baba Budangiri and coffee country — hill-road friendly cabs for Chikkamagaluru weekends and homestay trips.",
    places: ["Mullayanagiri", "Baba Budangiri", "Hebbe Falls", "Kudremukh", "Sringeri"],
    routes: ["Bangalore", "Hassan", "Udupi", "Mangaluru", "Coorg", "Mysuru"],
  },
  {
    slug: "hassan", name: "Hassan", state: "Karnataka",
    blurb: "Gateway to Belur, Halebidu and Shravanabelagola — heritage temple tours and connecting trips to the Western Ghats.",
    places: ["Belur", "Halebidu", "Shravanabelagola", "Sakleshpur", "Hassanamba Temple"],
    routes: ["Bangalore", "Chikkamagaluru", "Mysuru", "Mangaluru", "Coorg", "Udupi"],
  },
  {
    slug: "hubli", name: "Hubballi", state: "Karnataka",
    blurb: "North Karnataka cabs for Hubballi–Dharwad, Hampi heritage trips, Gokarna beaches and long-distance drops to Bangalore and Goa.",
    places: ["Hubballi Airport", "Dharwad", "Unkal Lake", "Hampi", "Gokarna"],
    routes: ["Bangalore", "Goa", "Hampi", "Udupi", "Mangaluru", "Hassan"],
  },
  // Tamil Nadu
  {
    slug: "hosur", name: "Hosur", state: "Tamil Nadu", top: true,
    blurb: "Minutes from our Attibele office — Hosur SIPCOT, industrial estates and residential areas, with quick drops to Bangalore Airport and across Tamil Nadu.",
    places: ["SIPCOT", "Hosur Bus Stand", "Rayakottai Road", "Mathigiri", "Bagalur Road"],
    routes: ["Bangalore", "Chennai", "Krishnagiri", "Salem", "Yercaud", "Tirupati"],
  },
  {
    slug: "chennai", name: "Chennai", state: "Tamil Nadu", top: true,
    blurb: "Chennai airport and Central station pickups, one-way drops to Bangalore, and trips to Mahabalipuram, Pondicherry and Tirupati.",
    places: ["Chennai Airport", "Chennai Central", "Marina Beach", "T. Nagar", "Mahabalipuram"],
    routes: ["Bangalore", "Pondicherry", "Tirupati", "Vellore", "Trichy", "Madurai"],
  },
  {
    slug: "coimbatore", name: "Coimbatore", state: "Tamil Nadu", top: true,
    blurb: "Kovai airport transfers, Isha Yoga Centre visits and the shortest hop to Ooty, Valparai and Kerala's Palakkad gap.",
    places: ["Coimbatore Airport", "Isha Yoga Centre", "Marudhamalai", "Perur Temple", "Siruvani"],
    routes: ["Ooty", "Bangalore", "Kochi", "Munnar", "Madurai", "Palakkad"],
  },
  {
    slug: "madurai", name: "Madurai", state: "Tamil Nadu", top: true,
    blurb: "Meenakshi Amman Temple, Madurai airport and pilgrim circuits to Rameswaram, Palani and Kodaikanal.",
    places: ["Meenakshi Amman Temple", "Madurai Airport", "Thirumalai Nayakkar Mahal", "Alagar Kovil"],
    routes: ["Rameswaram", "Kodaikanal", "Kanyakumari", "Trichy", "Bangalore", "Chennai"],
  },
  {
    slug: "trichy", name: "Trichy", state: "Tamil Nadu",
    blurb: "Srirangam, Rockfort and Samayapuram — temple tours, Trichy airport transfers and connections to Thanjavur and Kumbakonam.",
    places: ["Srirangam", "Rockfort Temple", "Samayapuram", "Trichy Airport", "Jambukeswarar Temple"],
    routes: ["Thanjavur", "Madurai", "Chennai", "Bangalore", "Rameswaram", "Kodaikanal"],
  },
  {
    slug: "salem", name: "Salem", state: "Tamil Nadu",
    blurb: "Salem city cabs and the quickest climb to Yercaud, plus easy drives to Bangalore, Coimbatore and Erode.",
    places: ["Yercaud", "Mettur Dam", "Kottai Mariamman Temple", "Salem Junction"],
    routes: ["Yercaud", "Bangalore", "Coimbatore", "Hosur", "Trichy", "Ooty"],
  },
  {
    slug: "ooty", name: "Ooty", state: "Tamil Nadu", top: true,
    blurb: "Queen of hill stations — Ooty Lake, Doddabetta, Coonoor tea gardens and Pykara, driven by experienced ghat-road drivers.",
    places: ["Ooty Lake", "Doddabetta Peak", "Botanical Garden", "Coonoor", "Pykara Falls"],
    routes: ["Bangalore", "Mysuru", "Coimbatore", "Wayanad", "Kochi", "Chennai"],
  },
  {
    slug: "kodaikanal", name: "Kodaikanal", state: "Tamil Nadu",
    blurb: "Kodai Lake, Pillar Rocks and Coaker's Walk — relaxed hill-station trips from Madurai, Bangalore and Coimbatore.",
    places: ["Kodai Lake", "Pillar Rocks", "Coaker's Walk", "Guna Caves", "Bryant Park"],
    routes: ["Madurai", "Bangalore", "Coimbatore", "Munnar", "Trichy", "Chennai"],
  },
  {
    slug: "yercaud", name: "Yercaud", state: "Tamil Nadu",
    blurb: "The Shevaroy Hills near Salem — a quick, scenic weekend escape from Bangalore and Hosur.",
    places: ["Yercaud Lake", "Lady's Seat", "Shevaroy Temple", "Killiyur Falls", "Pagoda Point"],
    routes: ["Salem", "Bangalore", "Hosur", "Chennai", "Coimbatore", "Trichy"],
  },
  {
    slug: "pondicherry", name: "Pondicherry", state: "Puducherry",
    blurb: "French Quarter, Auroville and Promenade Beach — easy drives from Bangalore, Chennai and Hosur.",
    places: ["Promenade Beach", "French Quarter", "Auroville", "Paradise Beach", "Sri Aurobindo Ashram"],
    routes: ["Chennai", "Bangalore", "Tiruvannamalai", "Thanjavur", "Hosur", "Trichy"],
  },
  {
    slug: "rameswaram", name: "Rameswaram", state: "Tamil Nadu",
    blurb: "Ramanathaswamy Temple, Dhanushkodi and the Pamban Bridge — pilgrim-friendly cabs with patient, experienced drivers.",
    places: ["Ramanathaswamy Temple", "Dhanushkodi", "Pamban Bridge", "Agni Theertham", "APJ Abdul Kalam Memorial"],
    routes: ["Madurai", "Kanyakumari", "Trichy", "Bangalore", "Chennai", "Thanjavur"],
  },
  {
    slug: "kanyakumari", name: "Kanyakumari", state: "Tamil Nadu",
    blurb: "India's southern tip — Vivekananda Rock, sunrise point and onward drives to Thiruvananthapuram and Rameswaram.",
    places: ["Vivekananda Rock Memorial", "Thiruvalluvar Statue", "Kanyakumari Temple", "Padmanabhapuram Palace"],
    routes: ["Thiruvananthapuram", "Madurai", "Rameswaram", "Kochi", "Chennai", "Bangalore"],
  },
  {
    slug: "thanjavur", name: "Thanjavur", state: "Tamil Nadu",
    blurb: "Brihadeeswarar Temple and the Navagraha circuit around Kumbakonam — comfortable cabs for temple tours.",
    places: ["Brihadeeswarar Temple", "Kumbakonam", "Swamimalai", "Darasuram", "Thanjavur Palace"],
    routes: ["Trichy", "Pondicherry", "Madurai", "Chennai", "Bangalore", "Rameswaram"],
  },
  {
    slug: "vellore", name: "Vellore", state: "Tamil Nadu",
    blurb: "CMC hospital visits, the Golden Temple at Sripuram and Vellore Fort — gentle, reliable cabs for patients and families.",
    places: ["CMC Hospital", "Sripuram Golden Temple", "Vellore Fort", "VIT University"],
    routes: ["Chennai", "Bangalore", "Tirupati", "Hosur", "Tiruvannamalai", "Pondicherry"],
  },
  {
    slug: "tiruvannamalai", name: "Tiruvannamalai", state: "Tamil Nadu",
    blurb: "Arunachaleswarar Temple, Girivalam and Ramana Ashram — full-moon and pilgrimage trips with flexible waiting.",
    places: ["Arunachaleswarar Temple", "Ramana Ashram", "Girivalam Path", "Virupaksha Cave"],
    routes: ["Bangalore", "Chennai", "Pondicherry", "Vellore", "Hosur", "Salem"],
  },
  // Kerala
  {
    slug: "kochi", name: "Kochi", state: "Kerala", top: true,
    blurb: "Cochin airport, Fort Kochi and Marine Drive — plus the classic Kerala loop to Munnar, Alleppey and Thekkady.",
    places: ["Cochin Airport", "Fort Kochi", "Marine Drive", "Mattancherry", "Lulu Mall"],
    routes: ["Munnar", "Alleppey", "Thekkady", "Bangalore", "Coimbatore", "Thiruvananthapuram"],
  },
  {
    slug: "munnar", name: "Munnar", state: "Kerala", top: true,
    blurb: "Tea hills, Eravikulam and Mattupetty — Munnar trips from Kochi, Coimbatore, Madurai and Bangalore by drivers used to hill roads.",
    places: ["Eravikulam National Park", "Mattupetty Dam", "Tea Museum", "Echo Point", "Top Station"],
    routes: ["Kochi", "Thekkady", "Alleppey", "Coimbatore", "Madurai", "Bangalore"],
  },
  {
    slug: "alleppey", name: "Alleppey", state: "Kerala",
    blurb: "Houseboat jetties, Alappuzha beach and the Kumarakom backwaters — easy transfers from Kochi and Thiruvananthapuram.",
    places: ["Houseboat Jetty", "Alappuzha Beach", "Kumarakom", "Marari Beach", "Punnamada Lake"],
    routes: ["Kochi", "Munnar", "Thekkady", "Thiruvananthapuram", "Kottayam", "Bangalore"],
  },
  {
    slug: "thiruvananthapuram", name: "Thiruvananthapuram", state: "Kerala",
    blurb: "Trivandrum airport, Padmanabhaswamy Temple, Kovalam and Varkala beaches — and onward drives to Kanyakumari.",
    places: ["Trivandrum Airport", "Padmanabhaswamy Temple", "Kovalam Beach", "Varkala", "Ponmudi"],
    routes: ["Kanyakumari", "Kochi", "Alleppey", "Madurai", "Munnar", "Bangalore"],
  },
  {
    slug: "wayanad", name: "Wayanad", state: "Kerala",
    blurb: "Edakkal Caves, Banasura Sagar and Chembra Peak — forest-road trips from Bangalore, Mysuru and Kozhikode.",
    places: ["Edakkal Caves", "Banasura Sagar Dam", "Chembra Peak", "Pookode Lake", "Soochipara Falls"],
    routes: ["Bangalore", "Mysuru", "Ooty", "Kozhikode", "Coorg", "Kochi"],
  },
  {
    slug: "kozhikode", name: "Kozhikode", state: "Kerala",
    blurb: "Calicut airport, Kappad beach and Malabar cuisine — cabs for north Kerala and the Wayanad ghat.",
    places: ["Calicut Airport", "Kappad Beach", "Mananchira", "SM Street", "Beypore"],
    routes: ["Wayanad", "Kochi", "Mangaluru", "Coorg", "Bangalore", "Mysuru"],
  },
  {
    slug: "thekkady", name: "Thekkady", state: "Kerala",
    blurb: "Periyar Tiger Reserve, spice plantations and Kumily — a favourite stop between Munnar, Madurai and Alleppey.",
    places: ["Periyar Tiger Reserve", "Kumily", "Spice Plantations", "Murikkady", "Chellarkovil"],
    routes: ["Munnar", "Kochi", "Madurai", "Alleppey", "Kodaikanal", "Bangalore"],
  },
  {
    slug: "palakkad", name: "Palakkad", state: "Kerala",
    blurb: "Palakkad Fort, Malampuzha and Silent Valley — the Kerala gateway right next to Coimbatore.",
    places: ["Palakkad Fort", "Malampuzha Dam", "Silent Valley", "Nelliyampathy", "Kalpathy"],
    routes: ["Coimbatore", "Kochi", "Ooty", "Bangalore", "Thrissur", "Munnar"],
  },
  // Andhra Pradesh
  {
    slug: "tirupati", name: "Tirupati", state: "Andhra Pradesh", top: true,
    blurb: "Tirumala Balaji darshan, Sri Kalahasti and Kanipakam — pilgrim cabs from Bangalore, Chennai, Hosur and Vellore.",
    places: ["Tirumala", "Sri Kalahasti", "Kanipakam", "Alamelu Mangapuram", "Tirupati Airport"],
    routes: ["Bangalore", "Chennai", "Vellore", "Hosur", "Kanchipuram", "Attibele"],
  },
];

export const cityBySlug = (slug: string) => CITIES.find((c) => c.slug === slug);
export const cityByName = (name: string) => CITIES.find((c) => c.name === name);
export const citiesIn = (state: string) => CITIES.filter((c) => c.state === state);
export const TOP_CITIES = CITIES.filter((c) => c.top);

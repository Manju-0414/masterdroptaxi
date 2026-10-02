export const SERVICES = [
  {
    id: "local",
    icon: "city",
    title: "Local City Taxi",
    text: "Comfortable rides for local travel, shopping, business meetings, appointments and everyday transportation.",
    points: ["Local travel", "Shopping", "Business meetings", "Appointments", "Everyday transportation"],
  },
  {
    id: "one-way",
    icon: "oneway",
    title: "One-Way Taxi",
    text: "Travel from pickup to destination and pay only for one side — no unnecessary return journey.",
    points: ["Pay one side only", "Door-to-door drop", "Intercity & interstate"],
  },
  {
    id: "round-trip",
    icon: "round",
    title: "Round-Trip Taxi",
    text: "Go and come back with the same car and driver — for same-day or multi-day journeys.",
    points: ["Business visits", "Family trips", "Appointments", "Same-day trips", "Multi-day trips"],
  },
  {
    id: "outstation",
    icon: "outstation",
    title: "Outstation Taxi",
    text: "Comfortable intercity travel from Bangalore across Karnataka, Tamil Nadu and beyond, with one-way and round-trip options.",
    points: ["One-way & round trip", "Experienced highway drivers", "Clean, sanitised cars"],
  },
  {
    id: "tours",
    icon: "tour",
    title: "Tours & Travel",
    text: "Flexible travel plans with multiple stops and customised routes for hill stations and getaways.",
    points: ["Multi-stop routes", "Hill stations", "Custom itineraries"],
  },
  {
    id: "temple",
    icon: "temple",
    title: "Temple Tours",
    text: "Customised travel plans for temple and pilgrimage destinations with drivers who know the routes.",
    points: ["Navagraha", "Murugan temples", "Rameswaram – Madurai"],
  },
  {
    id: "airport",
    icon: "airport",
    title: "Airport Transfer",
    text: "On-time airport pickup and drop — Trichy, Coimbatore, Madurai, Chennai and Bangalore airports.",
    points: ["Flight-time pickups", "Luggage friendly", "24/7 availability"],
  },
  {
    id: "railway",
    icon: "railway",
    title: "Railway Station Transfer",
    text: "Railway station pickup and drop services — early morning and late-night trains covered.",
    points: ["Early / late trains", "Platform-side pickup where allowed", "Fixed estimates"],
  },
  {
    id: "corporate",
    icon: "corporate",
    title: "Corporate / Office Cab",
    text: "Employee transportation and corporate travel solutions.",
    points: ["Monthly billing", "Dedicated vehicles", "Trip reports"],
    soon: true,
  },
];

export const WHY = [
  { icon: "easy", title: "Easy Booking", text: "Book your taxi quickly through the website, phone or WhatsApp." },
  { icon: "estimate", title: "Transparent Estimates", text: "Get an estimated fare before confirming your journey." },
  { icon: "driver", title: "Experienced Drivers", text: "Professional drivers focused on comfortable and responsible travel." },
  { icon: "fleet", title: "Multiple Vehicle Options", text: "Choose a vehicle according to passengers, luggage and travel needs." },
  { icon: "support", title: "24/7 Assistance", text: "Get support before and during your journey." },
  { icon: "info", title: "Trip Information", text: "Receive important booking and driver details before your trip." },
  { icon: "safety", title: "Passenger Safety", text: "Safety-focused travel for individuals, families and women passengers." },
  { icon: "tracking", title: "Live Tracking", text: "Track your vehicle and trip status through the upcoming app.", soon: true },
];

export const SAFETY = [
  { title: "Driver identification", active: true },
  { title: "Driver contact details", active: true },
  { title: "Trip details sharing", active: true },
  { title: "Emergency contact", active: true },
  { title: "SOS button", active: false },
  { title: "Live trip tracking", active: false },
  { title: "Trip sharing with family", active: false },
];

export const APP_FEATURES = {
  customer: ["Book Taxi", "Fare Estimate", "Booking History", "Driver Details", "Live Tracking", "Trip Sharing", "SOS", "Payments", "Saved Locations"],
  driver: ["Online / Offline", "Accept / Reject Trips", "Navigation", "Trip Start / End", "Earnings", "Trip History"],
};

export const FAQS: { q: string; a: string }[] = [
  { q: "What types of taxi services do you provide?", a: "Local city taxi, one-way drop, round trip, outstation, multi-stop tours, temple tours, and airport and railway station transfers." },
  { q: "How can I get a fare estimate?", a: "Use the Get Estimate section on the home page, the fare calculator, or simply WhatsApp / call us with your pickup, drop, date and vehicle." },
  { q: "Can I book a round trip?", a: "Yes. Choose the Round Trip tab, add your return date and time, and we will estimate the round-trip distance and fare." },
  { q: "Can I add multiple stops?", a: "Yes. The Multi-Stop / Tour tab lets you add as many stops as you need, then either return to the start or end at a final destination." },
  { q: "Are toll charges included?", a: "No. Tolls, parking and interstate permits are charged as applicable and are shown separately from the estimate." },
  { q: "Are waiting charges applicable?", a: "Yes, waiting charges apply according to the vehicle and trip policy. Short, reasonable halts during a trip are usually fine — ask us when booking." },
  { q: "Can I choose my vehicle?", a: "Yes. You can choose a Mini (Swift, WagonR, S-Presso), Sedan (Etios, Dzire, Amaze, Aura, Ciaz), SUV (Innova, Xylo, Ertiga, Rumion, Carens, Marazzo, Triber) or SUV Premium (Innova Crysta), subject to availability." },
  { q: "Do you provide airport pickup?", a: "Yes, we provide airport pickup and drop. Share your flight details so we can plan the pickup time." },
  { q: "Do you provide railway station pickup?", a: "Yes, railway station pickup and drop are available, including early morning and late-night trains." },
  { q: "Can I travel with pets?", a: "Pets may be allowed subject to vehicle availability and driver acceptance. Please inform us before booking — see our Pet Travel Policy." },
  { q: "Can I carry large luggage?", a: "Luggage must fit within the selected vehicle's capacity. For extra luggage, choose an SUV or Innova — see our Luggage Policy." },
  { q: "Can I cancel my booking?", a: "Yes. Cancellation terms depend on how early you cancel — see our Cancellation Policy for details." },
  { q: "Can I download my estimate?", a: "Yes. After calculating an estimate, click Download Estimate PDF." },
  { q: "Can I receive my estimate on WhatsApp?", a: "Yes. Click WhatsApp Estimate and the full trip summary opens in WhatsApp, ready to send to us." },
  { q: "How do I confirm a booking?", a: "Submit a booking request or message us. Our team will call to confirm the vehicle, fare and pickup details, and then share your driver details." },
  { q: "Can I change my travel date?", a: "Yes, subject to vehicle availability. Please inform us as early as possible." },
  { q: "What happens if the driver is delayed?", a: "We will keep you informed and, where possible, arrange an alternate vehicle. You can reach our 24/7 support any time." },
  { q: "What happens if I am not available at pickup?", a: "The driver will wait and try to contact you. Waiting charges or no-show terms may apply after the grace period." },
  { q: "Are night charges applicable?", a: "Night charges may apply for travel between late night and early morning hours, depending on the trip. We will tell you upfront." },
  { q: "How can I contact customer support?", a: "Call or WhatsApp us on +91 97871 11277 — we are available 24/7." },
];

export interface PolicyDoc {
  slug: string;
  title: string;
  intro: string;
  sections: { h: string; p: string; table?: [string, string][] }[];
}

export const POLICIES: PolicyDoc[] = [
  {
    slug: "terms",
    title: "Terms & Conditions",
    intro: "These terms apply to every booking made with Master Drop Taxi through the website, phone or WhatsApp.",
    sections: [
      { h: "General Terms", p: "By making a booking you agree to these terms. Master Drop Taxi provides taxi and travel services subject to vehicle availability." },
      { h: "Booking", p: "A booking is confirmed only after our team confirms the vehicle, fare and pickup details by phone or WhatsApp." },
      { h: "Customer Information", p: "Customers must provide an accurate name, phone number, pickup and drop locations, and travel date and time." },
      { h: "Fare Calculation & Estimated Fare", p: "Estimates are calculated on road distance, trip type, vehicle rate, minimum chargeable kilometres and driver allowance. Estimates are indicative." },
      { h: "Final Fare", p: "The final fare is based on actual kilometres travelled, time, and applicable charges, and may differ from the estimate." },
      { h: "Toll, Parking & Permit Charges", p: "Tolls, parking fees and interstate permits are not included in the estimate and are payable as applicable." },
      { h: "Waiting Charges & Driver Allowance", p: "Waiting beyond the allowed time is charged per hour per vehicle. Driver allowance applies per day for outstation trips." },
      { h: "Route Changes & Multi-Stop Journeys", p: "Changes to the agreed route or additional stops may change the fare. Please inform the driver and our team." },
      { h: "Luggage & Pets", p: "Luggage and pet travel are subject to the Luggage Policy and Pet Travel Policy." },
      { h: "Passenger Behaviour", p: "Smoking, alcohol consumption and unsafe behaviour inside the vehicle are not permitted. The driver may end the trip for safety reasons." },
      { h: "Vehicle Availability", p: "In rare cases we may provide an equivalent or upgraded vehicle if the selected vehicle is unavailable." },
      { h: "Cancellation & Refund", p: "Cancellations and refunds follow the Cancellation Policy and Refund Policy." },
      { h: "Driver & Customer Responsibilities", p: "Drivers must drive safely and follow traffic laws. Customers must be ready at the pickup time and treat the vehicle with care." },
      { h: "Lost Property", p: "Please check the vehicle before leaving. We will help trace lost items but are not liable for them." },
      { h: "Safety", p: "Passenger safety is our priority. Seat belts must be worn where available." },
      { h: "Website Usage & Privacy", p: "Use of this website is governed by our Privacy Policy and Cookie Policy." },
      { h: "Limitation of Liability", p: "Master Drop Taxi is not liable for delays caused by traffic, weather, road closures or other events outside our control." },
      { h: "Changes to Terms", p: "We may update these terms from time to time. The latest version will always be on this page." },
      { h: "Contact Information", p: "For questions about these terms, call or WhatsApp +91 97871 11277." },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    intro: "This policy explains what information we collect when you use our website and services, and how we use it.",
    sections: [
      { h: "Information Collected", p: "Name, phone number, email, pickup and drop locations, travel dates, booking information and, where applicable, payment-related information." },
      { h: "Why Information Is Collected", p: "To prepare estimates, confirm bookings, assign drivers, send trip updates and provide customer support." },
      { h: "Data Storage", p: "Booking data is stored securely and retained only as long as needed for service, accounting and legal purposes." },
      { h: "Data Sharing", p: "We share only the details needed with your assigned driver. We do not sell your personal information." },
      { h: "Third-Party Services", p: "We use Google Maps for location search and route distance, WhatsApp for messaging, and payment providers where online payment is offered." },
      { h: "Cookies", p: "We use essential cookies and, if enabled, analytics cookies. See the Cookie Policy." },
      { h: "Security", p: "We use reasonable technical and organisational measures to protect your information." },
      { h: "Your Rights", p: "You can ask us to access, correct or delete your personal information by contacting us." },
      { h: "Contact", p: "Call or WhatsApp +91 97871 11277 for privacy questions." },
    ],
  },
  {
    slug: "cancellation",
    title: "Cancellation Policy",
    intro: "We understand plans change. The terms below explain how cancellations are handled. Final percentages will be confirmed by the business before publishing.",
    sections: [
      {
        h: "Cancellation Timing",
        p: "Charges depend on how close to the pickup time you cancel.",
        table: [
          ["Early cancellation", "As per applicable terms"],
          ["Late cancellation", "Cancellation charge may apply"],
          ["No-show", "May be non-refundable"],
          ["Driver cancellation", "Customer refund subject to booking terms"],
        ],
      },
      { h: "Before Confirmation", p: "Requests cancelled before our team confirms the booking carry no charge." },
      { h: "After Confirmation", p: "Once a driver is assigned, a cancellation charge may apply." },
      { h: "Customer No-Show", p: "If the customer is unreachable at pickup after the grace period, the booking may be treated as a no-show." },
      { h: "Rescheduling", p: "Rescheduling is free when requested early and subject to vehicle availability." },
      { h: "Refund Eligibility", p: "Refunds, where applicable, follow the Refund Policy." },
    ],
  },
  {
    slug: "refund",
    title: "Refund Policy",
    intro: "Refund eligibility will be determined according to the applicable booking and cancellation terms.",
    sections: [
      { h: "Refund Eligibility", p: "Advance payments are refundable according to the Cancellation Policy." },
      { h: "Payment Gateway Refunds", p: "Online payments are refunded to the original payment method." },
      { h: "Cancellation Charges", p: "Applicable cancellation charges are deducted before a refund is processed." },
      { h: "Failed Bookings & Duplicate Payments", p: "Payments for failed bookings and duplicate payments are refunded in full." },
      { h: "Partial Refunds", p: "Partial refunds may apply when a trip is shortened or partly completed." },
      { h: "Processing Time", p: "Refunds are usually started within a few working days. Banks and payment providers may take additional time to credit them." },
    ],
  },
  {
    slug: "luggage",
    title: "Luggage Policy",
    intro: "For your comfort and safety, luggage must remain within the available luggage capacity of the selected vehicle.",
    sections: [
      { h: "Passenger Luggage Allowance", p: "Sedans carry 2–3 standard bags; SUVs and Innova carry 4–5." },
      { h: "Oversized Luggage", p: "Please tell us about oversized items (such as instruments or large boxes) when booking." },
      { h: "Roof Luggage", p: "Roof carriers are used only where available and safe, and only with the driver's approval." },
      { h: "Fragile & Valuable Items", p: "Customers are responsible for fragile and valuable items. Please keep valuables with you." },
      { h: "Restricted Items", p: "Illegal, hazardous, flammable or foul-smelling items are not permitted." },
      { h: "Excess Luggage & Unsafe Loading", p: "The driver may refuse luggage that exceeds capacity or cannot be loaded safely. An upgrade may be suggested." },
    ],
  },
  {
    slug: "pet",
    title: "Pet Travel Policy",
    intro: "Pets may be allowed on request. Please read the conditions below before booking.",
    sections: [
      { h: "Conditions", p: "Pet travel is subject to vehicle availability, driver acceptance, and informing us before booking." },
      { h: "Safe Containment", p: "Pets must be kept on a leash or in a carrier for the entire journey." },
      { h: "Protecting the Vehicle", p: "Please bring a seat cover or blanket to protect the vehicle interior." },
      { h: "Cleaning Charge", p: "A cleaning charge may apply if the vehicle needs extra cleaning after the trip." },
      { h: "Size & Safety", p: "Very large pets may require an SUV or Innova. The driver may stop the trip if safety is at risk." },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    intro: "This page explains how cookies may be used on our website.",
    sections: [
      { h: "Essential Cookies", p: "Needed for the website to work, such as remembering form progress." },
      { h: "Analytics", p: "If enabled, analytics tools such as Google Analytics help us understand how the site is used." },
      { h: "Managing Cookies", p: "You can block or delete cookies through your browser settings." },
    ],
  },
];

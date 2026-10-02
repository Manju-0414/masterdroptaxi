import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingUI from "@/components/layout/FloatingUI";
import { SITE } from "@/data/site";
import { CITIES, FOCUS_STATES } from "@/data/areas";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-outfit", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });

const DESCRIPTION =
  "Cab service all over India — strongest in Tamil Nadu, Kerala and Karnataka. Book one-way drop, round trip, outstation, airport, tour and temple taxis from Bangalore, Attibele, Hosur, Chennai, Coimbatore, Kochi and more. Instant fare estimate. Call or WhatsApp +91 97871 11277.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Master Drop Taxi — Cab Service in Tamil Nadu, Kerala & Karnataka",
    template: "%s | Master Drop Taxi",
  },
  description: DESCRIPTION,
  applicationName: SITE.name,
  keywords: [
    "cab service", "taxi service", "drop taxi", "one way taxi", "outstation cab", "cab service all over India", "interstate taxi",
    "taxi service in Tamil Nadu", "taxi service in Kerala", "taxi service in Karnataka", "South India taxi",
    "Taxi Service in Attibele", "Taxi Service in Bangalore", "Hosur Taxi", "Chennai drop taxi", "Coimbatore taxi", "Madurai taxi",
    "Kochi taxi", "Munnar cab", "Mysore taxi", "Ooty taxi", "Tirupati taxi", "Bangalore to Ooty Taxi", "Bangalore to Chennai Taxi",
    "Bangalore to Kochi Taxi", "Airport Taxi Bangalore", "Innova Crysta Taxi", "Temple Tours", "Kerala tour package cab",
  ],
  category: "travel",
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, address: false, email: false },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE.name,
    url: "/",
    title: "Master Drop Taxi — Cab Service in Tamil Nadu, Kerala, Karnataka & All India",
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: "Master Drop Taxi — Outstation & Drop Taxi Across South India", description: DESCRIPTION },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  icons: { icon: "/icon.svg", apple: SITE.logo },
};

export const viewport: Viewport = { themeColor: "#0e2233", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TaxiService",
      "@id": `${SITE.url}/#business`,
      name: SITE.name,
      description: DESCRIPTION,
      url: SITE.url,
      logo: SITE.logo,
      image: `${SITE.url}/opengraph-image`,
      telephone: SITE.phoneTel,
      priceRange: "₹₹",
      slogan: SITE.tagline,
      areaServed: [
        { "@type": "Country", name: "India" },
        ...FOCUS_STATES.map((s) => ({ "@type": "State", name: s.name })),
        ...CITIES.map((c) => ({ "@type": "City", name: c.name, url: `${SITE.url}/taxi-service/${c.slug}` })),
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "No. 170, TVS Main Road, Attibele",
        addressLocality: "Anekal, Bangalore",
        addressRegion: "Karnataka",
        postalCode: "562107",
        addressCountry: "IN",
      },
      hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapQuery)}`,
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
      contactPoint: { "@type": "ContactPoint", telephone: SITE.phoneTel, contactType: "reservations", areaServed: "IN" },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE.url}/#business` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${outfit.variable} ${inter.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingUI />
      </body>
    </html>
  );
}

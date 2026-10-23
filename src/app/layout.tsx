import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingUI from "@/components/layout/FloatingUI";
import { SITE } from "@/data/site";
import { CITIES, FOCUS_STATES } from "@/data/areas";
import { HOME_KEYWORDS, HOME_SEO } from "@/data/seo";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-outfit", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });

const DESCRIPTION = HOME_SEO.description;
const GA_ID = "G-501WF4HRZH";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: HOME_SEO.title,
    template: "%s | Master Drop Taxi",
  },
  description: DESCRIPTION,
  applicationName: SITE.name,
  keywords: [
    ...HOME_KEYWORDS,
    "cab service all over India", "taxi service in Tamil Nadu", "taxi service in Kerala", "taxi service in Karnataka",
    "Taxi Service in Attibele", "Hosur Taxi", "Bangalore to Ooty Taxi", "Bangalore to Kochi Taxi", "Innova Crysta Taxi", "Temple Tours",
  ],
  category: "travel",
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, address: false, email: false },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE.name,
    url: "/",
    title: HOME_SEO.title,
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: HOME_SEO.title, description: DESCRIPTION },
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
        {/* Google tag (gtag.js) */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}

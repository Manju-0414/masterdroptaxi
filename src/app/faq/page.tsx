import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import FaqList from "@/components/ui/FaqList";
import { CtaBand } from "@/components/home/Sections";
import { FAQS } from "@/data/content";

export const metadata: Metadata = pageMeta({
  title: "FAQ",
  description:
    "Answers about fares, tolls, waiting charges, luggage, pets, cancellations and bookings with Master Drop Taxi.",
  path: "/faq",
});

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <PageHero crumb="FAQ" path="/faq" title={<>Frequently asked <em>questions</em></>} text="Everything you need to know before you book." />
      <section className="sec">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <FaqList items={FAQS} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}

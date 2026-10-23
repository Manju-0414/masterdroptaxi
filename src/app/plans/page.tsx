import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import PlansBrowser from "./PlansBrowser";
import { CtaBand } from "@/components/home/Sections";
import { PLANS_KEYWORDS } from "@/data/seo";

export const metadata: Metadata = pageMeta({
  title: "Taxi & Tour Packages",
  description:
    "Local, outstation, round-trip, tour and temple packages across Tamil Nadu, Kerala and Karnataka — Ooty, Kodaikanal, Munnar, Yercaud, Valparai, Rameswaram and more.",
  path: "/plans",
  keywords: PLANS_KEYWORDS,
});

export default function PlansPage() {
  return (
    <>
      <PageHero crumb="Plans" path="/plans" title={<>Taxi & tour <em>packages</em></>} text="Ready-made plans you can book as-is or customise — tell us your dates and we'll send a quote." />
      <section className="sec">
        <div className="wrap">
          <PlansBrowser />
        </div>
      </section>
      <CtaBand />
    </>
  );
}

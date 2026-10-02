import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/ui/PageHero";
import Ticket from "./Ticket";

export const metadata: Metadata = { title: "Booking Request Received", robots: { index: false } };

export default function BookingConfirmationPage() {
  return (
    <>
      <PageHero crumb="Booking" title={<>Booking request <em>received</em></>} text="Thank you for choosing Master Drop Taxi." />
      <section className="sec">
        <div className="wrap">
          <Suspense fallback={null}>
            <Ticket />
          </Suspense>
        </div>
      </section>
    </>
  );
}

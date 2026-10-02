import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Page Not Found", robots: { index: false, follow: true }, alternates: { canonical: null } };

export default function NotFound() {
  return (
    <>
      <PageHero crumb="404" title={<>Wrong <em>turn</em></>} text="This page took a detour. Let's get you back on the road." />
      <section className="sec" style={{ textAlign: "center" }}>
        <Link href="/" className="btn btn-ink">Back to Home</Link>
      </section>
    </>
  );
}

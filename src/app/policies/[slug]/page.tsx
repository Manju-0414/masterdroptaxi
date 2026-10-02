import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { POLICIES } from "@/data/content";

export function generateStaticParams() {
  return POLICIES.map((p) => ({ slug: p.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const doc = POLICIES.find((p) => p.slug === slug);
  if (!doc) return { title: "Policy" };
  return pageMeta({ title: doc.title, description: doc.intro, path: `/policies/${doc.slug}` });
}

export default async function PolicyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const doc = POLICIES.find((p) => p.slug === slug);
  if (!doc) notFound();

  return (
    <>
      <PageHero crumb={doc.title} path={`/policies/${doc.slug}`} title={doc.title} text={doc.intro} />
      <section className="sec">
        <div className="wrap policy-layout">
          <nav className="policy-nav" aria-label="Policies">
            {POLICIES.map((p) => (
              <Link key={p.slug} href={`/policies/${p.slug}`} className={p.slug === doc.slug ? "on" : ""}>
                {p.title}
              </Link>
            ))}
          </nav>
          <Reveal className="policy-body">
            <p className="notice">Draft wording — to be reviewed and finalised by the business before publishing.</p>
            {doc.sections.map((s, i) => (
              <div key={s.h}>
                <h2>
                  <span>{i + 1}</span>
                  {s.h}
                </h2>
                <p>{s.p}</p>
                {s.table && (
                  <table className="ptable">
                    <thead>
                      <tr>
                        <th>Cancellation Timing</th>
                        <th>Refund</th>
                      </tr>
                    </thead>
                    <tbody>
                      {s.table.map(([a, b]) => (
                        <tr key={a}>
                          <td>{a}</td>
                          <td>{b}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}

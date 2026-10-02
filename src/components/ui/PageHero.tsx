import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd, breadcrumbLd, type Crumb } from "@/lib/seo";
import Slogan from "@/components/ui/Slogan";

export default function PageHero({
  crumb,
  title,
  text,
  path,
  parent,
}: {
  crumb: string;
  title: ReactNode;
  text?: string;
  /** page URL path — emits breadcrumb structured data when set */
  path?: string;
  /** middle breadcrumb, e.g. Service Areas */
  parent?: Crumb;
}) {
  return (
    <section className="phero">
      {path && <JsonLd data={breadcrumbLd(crumb, path, parent)} />}
      <div className="hero-grid-lines" />
      <div className="hero-blob" style={{ background: "#2f6b82", right: "-10%", top: "-30%" }} />
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link> <span>/</span>{" "}
          {parent && (
            <>
              <Link href={parent.path}>{parent.name}</Link> <span>/</span>{" "}
            </>
          )}
          <span style={{ color: "#fff" }}>{crumb}</span>
        </nav>
        <h1>{title}</h1>
        {text && <p>{text}</p>}
        <Slogan />
      </div>
    </section>
  );
}

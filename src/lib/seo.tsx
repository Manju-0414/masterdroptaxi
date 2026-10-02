import type { Metadata } from "next";
import { SITE } from "@/data/site";

const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: SITE.name };

/** Per-page metadata with canonical URL, Open Graph and Twitter tags filled in. */
export function pageMeta({ title, description, path, keywords }: { title: string; description: string; path: string; keywords?: string[] }): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    // page-level openGraph/twitter replace the layout's, so repeat the shared fields
    openGraph: { type: "website", locale: "en_IN", siteName: SITE.name, title: `${title} | ${SITE.name}`, description, url: path, images: OG_IMAGE },
    twitter: { card: "summary_large_image", title: `${title} | ${SITE.name}`, description, images: OG_IMAGE.url },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

/** schema.org BreadcrumbList for Home → (parent) → page. */
export function breadcrumbLd(name: string, path: string, parent?: Crumb) {
  const trail = [{ name: "Home", path: "" }, ...(parent ? [parent] : []), { name, path }];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${SITE.url}${c.path}` })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

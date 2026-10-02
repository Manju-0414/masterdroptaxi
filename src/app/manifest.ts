import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "Master Taxi",
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0e2233",
    theme_color: "#0e2233",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}

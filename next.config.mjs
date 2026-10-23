/** @type {import('next').NextConfig} */
const CDN = (process.env.CLOUDEFLARE_BASEURL || "").replace(/\/+$/, "");

const nextConfig = {
  reactStrictMode: true,
  // CDN originals are multi-MB PNGs; next/image resizes them to AVIF/WebP and caches the result.
  // Cached for a year, so give a replaced image a new file name.
  images: {
    remotePatterns: CDN ? [{ protocol: "https", hostname: new URL(CDN).hostname }] : [],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  // expose the image CDN base URL to client components
  env: {
    CLOUDEFLARE_BASEURL: process.env.CLOUDEFLARE_BASEURL || "",
  },
  // same-origin proxy for CDN files that must be fetched by script (e.g. the logo in the estimate PDF)
  async rewrites() {
    return CDN ? [{ source: "/cdn/:path*", destination: `${CDN}/:path*` }] : [];
  },
};
export default nextConfig;

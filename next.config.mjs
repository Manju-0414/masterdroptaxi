/** @type {import('next').NextConfig} */
const CDN = (process.env.CLOUDEFLARE_BASEURL || "").replace(/\/+$/, "");

const nextConfig = {
  reactStrictMode: true,
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

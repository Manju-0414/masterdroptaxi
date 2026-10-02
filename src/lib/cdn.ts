const BASE = (process.env.CLOUDEFLARE_BASEURL || "").replace(/\/+$/, "");

/** Full URL for a file stored in the Cloudflare R2 image bucket. */
export const cdn = (file: string) => `${BASE}/${file.replace(/^\/+/, "")}`;

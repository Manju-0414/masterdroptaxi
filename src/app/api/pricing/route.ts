import { NextResponse } from "next/server";
import { VEHICLES, EXTRA_CHARGES } from "@/data/vehicles";

/** Vehicle & rate config. Swap the import for a DB query when the admin panel is built. */
export async function GET() {
  return NextResponse.json(
    { vehicles: VEHICLES, extras: EXTRA_CHARGES },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
  );
}

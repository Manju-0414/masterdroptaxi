import { NextResponse } from "next/server";
import { makeBookingId } from "@/lib/fare";

/**
 * Lead capture (spec §31). Every website enquiry becomes a lead with status "New".
 * TODO(backend): persist to PostgreSQL (Prisma/Sequelize) and trigger WhatsApp / SMS / email notifications.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  const phone = String(body.phone ?? "").replace(/\s/g, "");
  if (!body.name || !/^(\+?91[-]?)?[6-9]\d{9}$/.test(phone)) {
    return NextResponse.json({ ok: false, error: "Name and a valid mobile number are required" }, { status: 422 });
  }
  const lead = {
    bookingId: makeBookingId(),
    status: "New",
    createdAt: new Date().toISOString(),
    ...body,
  };
  console.log("[lead]", JSON.stringify(lead));
  return NextResponse.json({ ok: true, bookingId: lead.bookingId, status: "Awaiting Confirmation" });
}

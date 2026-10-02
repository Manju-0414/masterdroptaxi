"use client";
import { SITE } from "@/data/site";
import { EXTRAS_NOTICE, FARE_NOTICE } from "@/data/vehicles";

export interface EstimateDoc {
  title: string;
  rows: [string, string][];
  total: string;
  route: string[];
  customer?: { name?: string; phone?: string };
}

/** Builds a branded one-page estimate PDF in the browser (spec §4 "Download Estimate PDF"). */
export async function downloadEstimatePdf(doc: EstimateDoc) {
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595, 842]);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const reg = await pdf.embedFont(StandardFonts.Helvetica);
  const navy = rgb(0.055, 0.133, 0.2);
  const teal = rgb(0.184, 0.42, 0.51);
  const gold = rgb(0.79, 0.635, 0.4);
  const soft = rgb(0.36, 0.42, 0.45);
  // Standard PDF fonts can't encode ₹ — use "Rs." in the PDF.
  const safe = (s: string) => s.replace(/₹/g, "Rs. ").replace(/[→⇄↓]/g, ">").replace(/[–—]/g, "-").replace(/[^\x20-\x7E]/g, "");

  try {
    // same-origin proxy (next.config rewrites) — the R2 bucket sends no CORS headers
    const res = await fetch(`/cdn/${SITE.logoFile}`);
    if (!res.ok) throw new Error("logo");
    const img = await pdf.embedPng(await res.arrayBuffer());
    const w = 210;
    page.drawImage(img, { x: 40, y: 842 - 40 - (w * img.height) / img.width, width: w, height: (w * img.height) / img.width });
  } catch {
    page.drawText("MASTER DROP TAXI", { x: 40, y: 780, size: 22, font: bold, color: navy });
  }

  page.drawText("TRIP ESTIMATE", { x: 400, y: 790, size: 16, font: bold, color: teal });
  page.drawText(new Date().toLocaleString("en-IN"), { x: 400, y: 772, size: 9, font: reg, color: soft });
  page.drawRectangle({ x: 40, y: 720, width: 515, height: 3, color: gold });

  let y = 690;
  page.drawText(safe(doc.title), { x: 40, y, size: 15, font: bold, color: navy });
  y -= 22;
  if (doc.customer?.name || doc.customer?.phone) {
    page.drawText(safe(`Customer: ${doc.customer.name ?? ""}  ${doc.customer.phone ?? ""}`), { x: 40, y, size: 10, font: reg, color: soft });
    y -= 20;
  }
  page.drawText(safe("Route: " + doc.route.join(" > ")), { x: 40, y, size: 10, font: reg, color: soft, maxWidth: 515 });
  y -= 34;

  for (const [k, v] of doc.rows) {
    page.drawText(safe(k), { x: 50, y, size: 11, font: reg, color: soft });
    page.drawText(safe(v), { x: 330, y, size: 11, font: bold, color: navy });
    y -= 8;
    page.drawLine({ start: { x: 40, y }, end: { x: 555, y }, thickness: 0.4, color: rgb(0.85, 0.87, 0.88) });
    y -= 18;
  }

  y -= 6;
  page.drawRectangle({ x: 40, y: y - 14, width: 515, height: 44, color: rgb(0.9, 0.94, 0.95) });
  page.drawText("Estimated Total", { x: 56, y: y + 2, size: 13, font: bold, color: teal });
  page.drawText(safe(doc.total), { x: 330, y: y + 1, size: 17, font: bold, color: navy });
  y -= 50;
  // highlighted "not included" box so customers don't miss it
  page.drawRectangle({ x: 40, y: y - 22, width: 515, height: 38, color: rgb(0.99, 0.95, 0.88), borderColor: gold, borderWidth: 0.8 });
  page.drawText("NOTE:", { x: 50, y, size: 9.5, font: bold, color: navy });
  page.drawText(safe(EXTRAS_NOTICE), { x: 86, y, size: 9.5, font: bold, color: navy, maxWidth: 460, lineHeight: 12 });
  y -= 44;
  page.drawText(safe(FARE_NOTICE), { x: 40, y, size: 9, font: reg, color: soft, maxWidth: 515, lineHeight: 12 });

  page.drawRectangle({ x: 0, y: 0, width: 595, height: 70, color: navy });
  page.drawText(safe(`Call / WhatsApp: ${SITE.phoneDisplay}   |   ${SITE.email}`), { x: 40, y: 40, size: 10, font: bold, color: rgb(1, 1, 1) });
  page.drawText(safe(SITE.tagline), { x: 40, y: 22, size: 10, font: bold, color: gold });

  const bytes = await pdf.save();
  const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `master-drop-taxi-estimate-${Date.now()}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

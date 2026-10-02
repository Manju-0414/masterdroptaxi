"use client";
import { useState } from "react";
import { FaBuilding } from "react-icons/fa6";
import PackageCard from "@/components/home/PackageCard";
import { PLAN_CATEGORIES, TOUR_PACKAGES, TEMPLE_PACKAGES, EXTRA_PLANS } from "@/data/packages";

const ALL = [...EXTRA_PLANS, ...TOUR_PACKAGES, ...TEMPLE_PACKAGES];

export default function PlansBrowser() {
  const [cat, setCat] = useState<string>("all");
  const list = cat === "all" ? ALL : ALL.filter((p) => p.kind === cat);
  return (
    <>
      <div className="filter" role="tablist">
        <button className={cat === "all" ? "on" : ""} onClick={() => setCat("all")}>All</button>
        {PLAN_CATEGORIES.map((c) => (
          <button
            key={c.id}
            className={cat === c.id ? "on" : ""}
            disabled={"soon" in c && c.soon}
            onClick={() => setCat(c.id)}
            title={"soon" in c && c.soon ? "Coming soon" : undefined}
          >
            {"soon" in c && c.soon && <FaBuilding />} {c.label}
            {"soon" in c && c.soon && <span className="chip soon" style={{ padding: "2px 8px" }}>Soon</span>}
          </button>
        ))}
      </div>
      <div className="pkg-grid" key={cat}>
        {list.map((p, i) => (
          <div key={p.id} style={{ animation: `rise .6s ${i * 60}ms var(--ease) both` }}>
            <PackageCard p={p} showTerms />
          </div>
        ))}
      </div>
    </>
  );
}

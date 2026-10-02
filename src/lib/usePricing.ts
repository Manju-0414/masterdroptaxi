"use client";
import { useEffect, useState } from "react";
import { VEHICLES, type Vehicle } from "@/data/vehicles";

/**
 * Reads vehicles & rates from /api/pricing (admin-configurable later).
 * Starts with the bundled defaults so the UI is never empty.
 */
export function usePricing() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(VEHICLES.filter((v) => v.active));
  useEffect(() => {
    let alive = true;
    fetch("/api/pricing")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (alive && d?.vehicles?.length) setVehicles(d.vehicles.filter((v: Vehicle) => v.active));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  return vehicles;
}

"use client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Reveal from "./Reveal";

export default function FaqList({ items, initialOpen = 0 }: { items: { q: string; a: string }[]; initialOpen?: number }) {
  const [open, setOpen] = useState<number>(initialOpen);
  return (
    <div className="faq">
      {items.map((f, i) => (
        <Reveal key={f.q} delay={Math.min(i, 6) * 50}>
          <div className={`faq-item ${open === i ? "open" : ""}`}>
            <button className="faq-q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
              {f.q}
              <span className="pm"><FaPlus size={12} /></span>
            </button>
            <div className="faq-a">
              <div>
                <p>{f.a}</p>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

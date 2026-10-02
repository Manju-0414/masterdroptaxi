import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionHead({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text?: string }) {
  return (
    <Reveal className="sec-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="h-sec">{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  );
}

"use client";
import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from "react";

type Dir = "up" | "left" | "right" | "zoom";

interface Props {
  children: ReactNode;
  as?: ElementType;
  dir?: Dir;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}

/** Fades/slides children in when they scroll into view. */
export default function Reveal({ children, as: Tag = "div", dir = "up", delay = 0, className = "", style, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`rv rv-${dir} ${className}`} style={{ ...style, ["--d" as string]: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

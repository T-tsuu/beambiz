"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "./gsap";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Distance the elements fall in from, in px. */
  distance?: number;
  /** Initial X-axis rotation, so elements tip forward as they land. */
  tilt?: number;
  /** Seconds between each direct child. */
  stagger?: number;
  delay?: number;
  /** How far up the viewport the trigger fires, e.g. "top 85%". */
  start?: string;
};

/**
 * Scroll-linked entrance: children float up from below with a slight
 * forward rotation and land in a staggered cascade.
 * Renders its final state immediately when motion is reduced.
 */
export default function Reveal({
  children,
  className,
  distance = 30,
  tilt = 7,
  stagger = 0.085,
  delay = 0,
  start = "top 86%",
}: RevealProps) {
  const container = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = container.current;
      if (!el || reduced) return;

      const targets = el.children.length > 0 ? Array.from(el.children) : [el];

      gsap.from(targets, {
        y: distance,
        opacity: 0,
        rotateX: tilt,
        transformOrigin: "50% 100%",
        duration: 1,
        stagger,
        delay,
        scrollTrigger: { trigger: el, start, once: true },
      });
    },
    { dependencies: [reduced], scope: container },
  );

  return (
    <div ref={container} className={className}>
      {children}
    </div>
  );
}

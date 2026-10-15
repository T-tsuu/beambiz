"use client";

import { useRef } from "react";
import { ScrollTrigger, gsap, useGSAP } from "./gsap";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type AnimatedNumberProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
  /** Wait until the element scrolls into view before counting up. */
  onView?: boolean;
};

/**
 * Tweened numeric readout. Counts up on first render (or first view) and
 * re-tweens from wherever it currently sits whenever `value` changes.
 */
export default function AnimatedNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  duration = 1.1,
  onView = false,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const state = useRef({ v: 0 });
  const seen = useRef(false);
  const reduced = usePrefersReducedMotion();

  const format = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (reduced) {
        el.textContent = format(value);
        state.current.v = value;
        seen.current = true;
        return;
      }

      const start = seen.current ? state.current.v : 0;
      state.current.v = start;
      seen.current = true;

      const run = () => {
        gsap.to(state.current, {
          v: value,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = format(state.current.v);
          },
        });
      };

      if (!onView) {
        run();
        return;
      }

      // Reset to the starting point before paint, then fire on first view.
      el.textContent = format(start);

      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: run,
      });
    },
    {
      dependencies: [value, decimals, prefix, suffix, reduced, onView],
      revertOnUpdate: false,
    },
  );

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}

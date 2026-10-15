"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "./gsap";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees at the card edges. */
  intensity?: number;
  /** Adds a pointer-tracked specular highlight. */
  glare?: boolean;
};

/**
 * Pointer-reactive 3D card. Tilts on the X/Y axis as the cursor moves across
 * it, exposing the glare layer, then eases back to rest on leave.
 * Inert on touch devices and when motion is reduced.
 */
export default function TiltCard({
  children,
  className = "",
  intensity = 9,
  glare = true,
}: TiltCardProps) {
  const frame = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = card.current;
      if (!el || reduced) return;
      if (window.matchMedia("(hover: none)").matches) return;

      const rotateX = gsap.quickTo(el, "rotationX", {
        duration: 0.7,
        ease: "power3",
      });
      const rotateY = gsap.quickTo(el, "rotationY", {
        duration: 0.7,
        ease: "power3",
      });
      const lift = gsap.quickTo(el, "z", { duration: 0.7, ease: "power3" });

      const onMove = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;

        rotateY(px * intensity * 2);
        rotateX(-py * intensity * 2);
        lift(26);
        el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
        el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
      };

      const onLeave = () => {
        rotateX(0);
        rotateY(0);
        lift(0);
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);

      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { dependencies: [reduced, intensity], scope: frame },
  );

  return (
    <div ref={frame} className="perspective h-full">
      <div
        ref={card}
        className={`tilt preserve-3d h-full ${glare ? "tilt-glare" : ""} ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

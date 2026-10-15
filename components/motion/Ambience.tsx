"use client";

import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Weightless backdrop: soft colour blooms drifting behind a receding
 * isometric grid plane. Purely decorative, never interactive.
 */
export default function Ambience({
  variant = "hero",
}: {
  variant?: "hero" | "section" | "cta";
}) {
  const reduced = usePrefersReducedMotion();

  if (variant === "section") {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="bloom anim-drift stagger-2"
          style={{
            width: "38rem",
            height: "38rem",
            left: "-12rem",
            top: "18%",
            background:
              "radial-gradient(circle, rgba(109,93,251,.42), transparent 68%)",
          }}
        />
        <div
          className="bloom anim-drift stagger-3"
          style={{
            width: "30rem",
            height: "30rem",
            right: "-10rem",
            bottom: "4%",
            background:
              "radial-gradient(circle, rgba(18,194,221,.32), transparent 68%)",
          }}
        />
      </div>
    );
  }

  if (variant === "cta") {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
        <div
          className="bloom anim-drift"
          style={{
            width: "34rem",
            height: "34rem",
            left: "6%",
            top: "-14rem",
            background:
              "radial-gradient(circle, rgba(109,93,251,.5), transparent 66%)",
          }}
        />
        <div
          className="bloom anim-drift stagger-1"
          style={{
            width: "26rem",
            height: "26rem",
            right: "4%",
            bottom: "-12rem",
            background:
              "radial-gradient(circle, rgba(255,122,89,.32), transparent 68%)",
          }}
        />
        <div className="iso-plane absolute inset-x-0 -bottom-40 h-[34rem] opacity-40" />
      </div>
    );
  }

  /* hero */
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* base tint for the band the nav floats in — without this the top of
          the page is the plain (near-white) body background */}
      <div className="hero-topwash" />
      <div
        className={`bloom ${reduced ? "" : "anim-drift"}`}
        style={{
          width: "52rem",
          height: "52rem",
          left: "-14rem",
          top: "-16rem",
          background:
            "radial-gradient(circle, rgba(109,93,251,.45), transparent 66%)",
        }}
      />
      <div
        className={`bloom ${reduced ? "" : "anim-drift stagger-1"}`}
        style={{
          width: "40rem",
          height: "40rem",
          right: "-12rem",
          top: "-14rem",
          background:
            "radial-gradient(circle, rgba(18,194,221,.34), transparent 68%)",
        }}
      />
      <div
        className={`bloom ${reduced ? "" : "anim-drift stagger-2"}`}
        style={{
          width: "44rem",
          height: "44rem",
          left: "34%",
          bottom: "-26rem",
          background:
            "radial-gradient(circle, rgba(255,122,89,.24), transparent 70%)",
        }}
      />
      <div className="iso-plane absolute inset-x-[-20%] -bottom-56 h-[52rem] opacity-70" />
    </div>
  );
}

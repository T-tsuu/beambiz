"use client";

/**
 * Single place where the motion stack is created and configured.
 * Everything that animates imports from here so plugins are registered once.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 0.9 });
}

export const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

export { gsap, ScrollTrigger, useGSAP };

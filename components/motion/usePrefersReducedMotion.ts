"use client";

import { useEffect, useState } from "react";
import { REDUCED_QUERY } from "./gsap";

/**
 * Tracks `prefers-reduced-motion: reduce` so every animated component can
 * render its final state instead of animating into it.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(REDUCED_QUERY);
    setReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

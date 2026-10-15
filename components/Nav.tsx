"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "./Brand";

const LINKS = [
  { label: "Product", href: "#product" },
  { label: "Live lab", href: "#lab" },
  { label: "Pricing", href: "#pricing" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  /**
   * The nav floats bare on the hero gradient. It only picks up a backing once
   * the hero has scrolled past, which is also when it starts passing over the
   * dark experiment console and needs the contrast.
   */
  useEffect(() => {
    const hero = document.getElementById("top");
    let limit = 12;

    const measure = () => {
      limit = hero ? Math.max(hero.offsetHeight - 120, 12) : 12;
    };

    const onScroll = () => setSolid(window.scrollY > limit);
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        aria-label="Main"
        className={`nav-glass mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-transparent py-2.5 pl-5 pr-2.5 transition-all duration-500 ${
          solid ? "is-solid" : ""
        }`}
      >
        <a href="#top" className="shrink-0 rounded-full" aria-label="Beam home">
          <Wordmark />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative rounded-full px-3.5 py-2 text-[0.9rem] font-medium text-ink-2 transition-colors duration-300 hover:text-ink"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-0 scale-90 rounded-full bg-white/70 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="/login"
            className="rounded-full px-3.5 py-2 text-[0.9rem] font-medium text-ink-2 transition-colors duration-300 hover:text-ink"
          >
            Sign in
          </a>
          <a href="/signup" className="btn btn-primary px-5 py-2.5 text-[0.86rem]">
            Start free
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="mr-1 flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-[5px] rounded-full bg-white/70 md:hidden"
        >
          <span
            className={`h-[1.5px] w-4 rounded bg-ink transition-transform duration-300 ${
              open ? "translate-y-[6.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-4 rounded bg-ink transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-4 rounded bg-ink transition-transform duration-300 ${
              open ? "-translate-y-[6.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <div
        className={`glass mx-auto mt-3 max-w-6xl overflow-hidden rounded-3xl md:hidden ${
          open ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0"
        } transition-all duration-500`}
      >
        <ul className="flex flex-col gap-1 p-3">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-[0.95rem] font-medium text-ink-2 transition-colors duration-300 hover:bg-white/70 hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-1">
            <a
              href="/signup"
              onClick={() => setOpen(false)}
              className="btn btn-primary w-full"
            >
              Start free
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

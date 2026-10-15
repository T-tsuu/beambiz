"use client";

import { useRef } from "react";
import Ambience from "./motion/Ambience";
import { gsap, useGSAP } from "./motion/gsap";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";

/* ------------------------------------------------------------------ */
/*  Floating variant cards                                             */
/* ------------------------------------------------------------------ */

type VariantCardProps = {
  tag: string;
  name: string;
  price: string;
  unit: string;
  features: string[];
  conversion: string;
  traffic: string;
  widthClass?: string;
  winner?: boolean;
};

function VariantCard({
  tag,
  name,
  price,
  unit,
  features,
  conversion,
  traffic,
  widthClass = "w-full sm:w-[16.5rem]",
  winner = false,
}: VariantCardProps) {
  return (
    <article
      className={`relative ${widthClass} rounded-[1.75rem] p-5 ${
        winner ? "glass-deep" : "glass"
      }`}
    >
      <header className="flex items-center justify-between gap-2">
        <span
          className="rounded-full px-2.5 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em]"
          style={
            winner
              ? { color: "#8beeff", background: "rgba(18,194,221,.16)" }
              : { color: "#4a37e0", background: "rgba(109,93,251,.12)" }
          }
        >
          {tag}
        </span>
        <span
          className={`text-[0.7rem] font-medium ${
            winner ? "text-white/60" : "text-ink-3"
          }`}
        >
          {traffic} traffic
        </span>
      </header>

      <p
        className={`mt-4 text-[0.82rem] font-medium ${
          winner ? "text-white/70" : "text-ink-3"
        }`}
      >
        {name}
      </p>
      <p className="mt-1 flex items-baseline gap-1.5">
        <span className="font-display text-[2.1rem] font-semibold leading-none tracking-[-0.05em]">
          {price}
        </span>
        <span
          className={`text-[0.78rem] font-medium ${
            winner ? "text-white/55" : "text-ink-3"
          }`}
        >
          {unit}
        </span>
      </p>

      <ul className="mt-4 space-y-2">
        {features.map((feature) => (
          <li
            key={feature}
            className={`flex items-start gap-2 text-[0.8rem] leading-snug ${
              winner ? "text-white/75" : "text-ink-2"
            }`}
          >
            <svg viewBox="0 0 16 16" className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden>
              <circle
                cx="8"
                cy="8"
                r="8"
                fill={winner ? "rgba(18,194,221,.25)" : "rgba(109,93,251,.14)"}
              />
              <path
                d="M4.6 8.3 6.9 10.5 11.4 5.8"
                fill="none"
                stroke={winner ? "#8beeff" : "#5b46f0"}
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <div
        className={`mt-5 flex items-center justify-between rounded-2xl px-3.5 py-2.5 ${
          winner ? "bg-white/10" : "bg-white/70"
        }`}
      >
        <div>
          <p
            className={`text-[0.62rem] font-semibold uppercase tracking-[0.14em] ${
              winner ? "text-white/50" : "text-ink-4"
            }`}
          >
            Conversion
          </p>
          <p className="font-mono text-[0.95rem] font-semibold">{conversion}</p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-[0.7rem] font-semibold ${
            winner ? "text-ink" : "text-white"
          }`}
          style={{
            background: winner
              ? "linear-gradient(140deg,#8beeff,#37d3ef)"
              : "linear-gradient(140deg,#b3a8ff,#5b46f0)",
          }}
        >
          {winner ? "Winner" : "Control"}
        </span>
      </div>

      {winner && (
        <span className="pointer-events-none absolute -right-2 -top-3 rounded-full bg-white px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-ink shadow-[0_10px_24px_-10px_rgba(10,10,30,.5)]">
          +58% rev / visitor
        </span>
      )}
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating metric chips (desktop only)                               */
/* ------------------------------------------------------------------ */

function Chip({
  label,
  value,
  className = "",
  stagger = "",
  accent = "beam",
}: {
  label: string;
  value: string;
  className?: string;
  stagger?: string;
  accent?: "beam" | "aqua" | "coral";
}) {
  const dot =
    accent === "aqua" ? "#12c2dd" : accent === "coral" ? "#ff7a59" : "#6d5dfb";

  return (
    <div
      className={`glass absolute hidden rounded-2xl px-3.5 py-2.5 anim-float sm:block ${stagger} ${className}`}
    >
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2 shrink-0">
          <span
            className="anim-ring absolute inset-0 rounded-full"
            style={{ background: dot }}
          />
          <span className="relative h-2 w-2 rounded-full" style={{ background: dot }} />
        </span>
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.13em] text-ink-4">
          {label}
        </p>
      </div>
      <p className="mt-1 font-mono text-[0.9rem] font-semibold text-ink">{value}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const stage = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const root = stage.current;
      if (!root) return;

      const layers = gsap.utils.toArray<HTMLElement>("[data-depth]", root);

      // Entrance: the whole rig floats up into place.
      if (!reduced) {
        gsap.from(root, {
          y: 70,
          opacity: 0,
          rotateX: -12,
          duration: 1.4,
          delay: 0.15,
        });

        gsap.from(layers, {
          y: 44,
          opacity: 0,
          duration: 1.1,
          delay: 0.4,
          stagger: { each: 0.09, from: "center" },
        });
      }

      // Pointer parallax across layered depths (desktop only).
      if (reduced || !window.matchMedia("(hover: hover)").matches) return;

      gsap.set(layers, {
        z: (_index, target) => Number((target as HTMLElement).dataset.z ?? 0),
      });

      const controls = layers.map((el) => ({
        depth: Number(el.dataset.depth ?? 1),
        x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3" }),
        y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3" }),
      }));

      const surface = root.closest("section") ?? root;

      const onMove = (event: PointerEvent) => {
        const rect = root.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        controls.forEach(({ depth, x, y }) => {
          x(px * 52 * depth);
          y(py * 38 * depth);
        });
      };

      const onLeave = () =>
        controls.forEach(({ x, y }) => {
          x(0);
          y(0);
        });

      surface.addEventListener("pointermove", onMove as EventListener);
      surface.addEventListener("pointerleave", onLeave);

      return () => {
        surface.removeEventListener("pointermove", onMove as EventListener);
        surface.removeEventListener("pointerleave", onLeave);
      };
    },
    { dependencies: [reduced], scope: stage },
  );

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pb-10 pt-24 sm:pt-28 lg:pb-16"
    >
      <Ambience variant="hero" />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-3xl text-center">
          <span className="chip mx-auto">
            <span className="h-1.5 w-1.5 rounded-full bg-beam" />
            Pricing experiments, on autopilot
          </span>

          <h1 className="mt-6 text-balance font-display text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-[4.25rem]">
            Ship the price that
            <br className="hidden sm:block" />{" "}
            <span className="bg-gradient-to-br from-[#4a37e0] via-[#6d5dfb] to-[#12a2c6] bg-clip-text text-transparent">
              actually converts.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-[1.02rem] leading-relaxed text-ink-2 sm:text-[1.12rem]">
            Beam splits traffic across pricing variants, measures revenue per visitor
            instead of clicks, and tells you — with a number you can defend in a board
            meeting — which price to keep.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/login"
              className="btn btn-primary w-full px-7 py-3.5 text-[0.95rem] sm:w-auto"
            >
              Start free for 14 days
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
                <path
                  d="M2.5 8h10m0 0L8.8 4.3M12.5 8l-3.7 3.7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#lab" className="btn btn-ghost w-full px-7 py-3.5 text-[0.95rem] sm:w-auto">
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
                <circle cx="8" cy="8" r="6.6" fill="none" stroke="currentColor" strokeWidth="1.3" />
                <path d="M6.5 5.4 10.6 8l-4.1 2.6z" fill="currentColor" />
              </svg>
              See it split live
            </a>
          </div>

          <p className="mt-5 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink-4">
            No credit card · SOC 2 Type II · 3 lines to install
          </p>
        </div>

        {/* ---------------- floating A/B rig ---------------- */}
        <div className="relative mt-12 sm:mt-16">
          <div className="perspective">
            <div className="rig-tilt preserve-3d">
              <div ref={stage} className="rig-stage preserve-3d">
                {/* ground plate */}
                <div
                  data-depth="0.35"
                  aria-hidden
                  className="pointer-events-none absolute left-[7%] right-[7%] top-[74%] hidden h-32 rounded-[50%] bg-white/55 blur-2xl sm:block"
                />

                {/* ambient light behind the rig */}
                <div
                  data-depth="0.5"
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[22rem] w-[22rem] rounded-full sm:block"
                  style={{
                    marginLeft: "-11rem",
                    marginTop: "-11rem",
                    background:
                      "radial-gradient(circle, rgba(109,93,251,.34), rgba(18,194,221,.14) 45%, transparent 70%)",
                    filter: "blur(28px)",
                  }}
                />

                {/* Variant A */}
                <div
                  data-depth="1"
                  data-z="30"
                  className="preserve-3d order-1 sm:absolute sm:left-[7%] sm:top-[26%]"
                >
                  <div className="preserve-3d rig-card anim-float">
                    <VariantCard
                      tag="Variant A"
                      name="Flat seat pricing"
                      price="$29"
                      unit="/ seat / mo"
                      traffic="50%"
                      conversion="3.1%"
                      widthClass="w-full sm:w-[15rem]"
                      features={[
                        "Unlimited seats at $29",
                        "Email support",
                        "14-day trial",
                      ]}
                    />
                  </div>
                </div>

                {/* Variant B */}
                <div
                  data-depth="1.55"
                  data-z="120"
                  className="preserve-3d order-2 sm:absolute sm:left-[47%] sm:top-[7%]"
                >
                  <div className="preserve-3d rig-card anim-float-alt stagger-1">
                    <VariantCard
                      tag="Variant B"
                      name="Seat + usage blend"
                      price="$39"
                      unit="/ seat / mo"
                      traffic="50%"
                      conversion="4.4%"
                      winner
                      features={[
                        "Includes 50k events",
                        "Priority support",
                        "Usage overflow at cost",
                      ]}
                    />
                  </div>
                </div>

                {/* connecting beam */}
                <div
                  data-depth="1.25"
                  data-z="70"
                  aria-hidden
                  className="pointer-events-none absolute left-[38%] top-[52%] hidden w-[26%] sm:block"
                >
                  <div className="sweep h-[2px] w-full rounded-full bg-gradient-to-r from-beam/0 via-beam to-aqua/0" />
                  <div className="mt-1.5 flex items-center justify-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-beam shadow-[0_0_14px_4px_rgba(109,93,251,.5)]" />
                  </div>
                </div>

                {/* floating stat tile */}
                <div
                  data-depth="1.9"
                  data-z="190"
                  className="preserve-3d order-3 sm:absolute sm:right-[6%] sm:bottom-[12%]"
                >
                  <div className="preserve-3d rig-card anim-float-alt stagger-2">
                    <div className="glass-deep w-full rounded-[1.5rem] p-4 sm:w-[13.5rem]">
                      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white/50">
                        Lift if shipped
                      </p>
                      <p className="mt-1 font-display text-[1.9rem] font-semibold leading-none text-white">
                        +$412
                        <span className="ml-1 text-[0.8rem] font-medium text-white/60">
                          /1k visitors
                        </span>
                      </p>
                      <div className="mt-3 flex h-9 items-end gap-1.5">
                        {[38, 52, 44, 68, 60, 84, 96].map((h, i) => (
                          <span
                            key={i}
                            className="w-full rounded-sm"
                            style={{
                              height: `${h}%`,
                              background:
                                i > 4
                                  ? "linear-gradient(180deg,#8beeff,#37d3ef)"
                                  : "linear-gradient(180deg,#b3a8ff,#6d5dfb)",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* metric chips */}
                <Chip
                  label="Significance"
                  value="p = 0.004"
                  accent="aqua"
                  className="left-[2%] top-[2%]"
                  stagger="stagger-2"
                />
                <Chip
                  label="Revenue / visitor"
                  value="$2.05 vs $1.30"
                  accent="coral"
                  className="right-[2%] top-[38%]"
                  stagger="stagger-3"
                />
                <Chip
                  label="Sessions split"
                  value="12,480 · 50/50"
                  className="bottom-[4%] left-[30%]"
                  stagger="stagger-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Reveal from "./motion/Reveal";
import TiltCard from "./motion/TiltCard";

type Feature = {
  title: string;
  body: string;
  note: string;
  accent: string;
  icon: React.ReactNode;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const FEATURES: Feature[] = [
  {
    title: "Zero-flash variant delivery",
    body: "Variants resolve at the edge before first paint. No flicker, no layout shift, no cloaking penalty — your Lighthouse score never notices.",
    note: "p95 decision · 41ms",
    accent: "#6d5dfb",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path d="M13.5 2 5 13.2h5.2L10 22l8.6-11.3h-5.3z" {...stroke} />
      </svg>
    ),
  },
  {
    title: "Revenue, not clicks",
    body: "Beam keeps reading Stripe and your warehouse long after the tab closes. A variant that lifts signups but quietly cuts ARPU never wins.",
    note: "Attribution window · 90 days",
    accent: "#12c2dd",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path d="M3 20h18M6.5 20V11m5 9V5.5m5 14.5v-6.5" {...stroke} />
      </svg>
    ),
  },
  {
    title: "Guardrails that page you",
    body: "Refund rate, 30-day churn, support load, payback period. If the challenger wounds a metric you protect, the experiment pauses itself.",
    note: "Auto-pause on breach",
    accent: "#ff7a59",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path d="M12 3.5 4.5 6.6v5.1c0 4.3 3 7.6 7.5 8.8 4.5-1.2 7.5-4.5 7.5-8.8V6.6z" {...stroke} />
        <path d="M9.3 12.2 11.2 14l3.6-3.9" {...stroke} />
      </svg>
    ),
  },
  {
    title: "Statistics you can defend",
    body: "Sequential testing with alpha control and confidence intervals — not a dashboard that turns green whenever it feels like it.",
    note: "Two-sided · α = 0.05",
    accent: "#7fd97f",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path d="M4 19V5m0 14h16" {...stroke} />
        <path d="M6.6 15.4c2.2 0 3.1-6.3 5.2-6.3 1.6 0 2.2 3.2 3.4 3.2 1 0 1.6-1.4 2.8-3.7" {...stroke} />
      </svg>
    ),
  },
  {
    title: "Any stack, three lines",
    body: "Next.js, Webflow, Shopify, plain HTML. Stripe, Segment, PostHog, or your own warehouse as the source of revenue truth.",
    note: "SDKs · 11 languages",
    accent: "#6d5dfb",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path d="M9 8.5 5.5 12 9 15.5m6-7L18.5 12 15 15.5M13.4 5.5l-2.8 13" {...stroke} />
      </svg>
    ),
  },
  {
    title: "Ships itself",
    body: "Auto-promote schedules the winner at rollout time, archives the losing variant, and writes the changelog entry for your team.",
    note: "Rollout in · 30 seconds",
    accent: "#12c2dd",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path d="M12 3.5c3.9 2 6 5.4 6 9.3L12 20.5l-6-7.7c0-3.9 2.1-7.3 6-9.3z" {...stroke} />
        <circle cx="12" cy="11" r="2.2" {...stroke} />
      </svg>
    ),
  },
];

export default function FeatureGrid() {
  return (
    <section id="product" className="relative isolate scroll-mt-28 overflow-hidden py-20 sm:py-28">
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <span className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-beam" />
            The product
          </span>
          <h2 className="mt-5 text-balance font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[2.6rem]">
            Everything an experiment needs to be believed
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-[1rem] leading-relaxed text-ink-2">
            Most A/B tools stop at pageviews. Pricing is a revenue question, so Beam
            measures the whole path from impression to invoice — and refuses to guess.
          </p>
        </div>

        <Reveal className="perspective mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {FEATURES.map((feature) => (
            <div key={feature.title}>
              <TiltCard className="glass rounded-[1.75rem]">
                <div className="flex h-full flex-col p-6">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-2xl"
                    style={{
                      color: feature.accent,
                      background: `color-mix(in oklab, ${feature.accent} 12%, white)`,
                      boxShadow: `0 12px 26px -14px ${feature.accent}99`,
                    }}
                  >
                    {feature.icon}
                  </span>

                  <h3 className="mt-5 text-[1.05rem] font-semibold tracking-[-0.02em] text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 text-[0.9rem] leading-relaxed text-ink-2">
                    {feature.body}
                  </p>

                  <p className="mt-auto pt-6 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-4">
                    {feature.note}
                  </p>
                </div>
              </TiltCard>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

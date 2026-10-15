"use client";

import { useState } from "react";
import Ambience from "./motion/Ambience";
import AnimatedNumber from "./motion/AnimatedNumber";
import Reveal from "./motion/Reveal";
import TiltCard from "./motion/TiltCard";

type Tier = {
  name: string;
  blurb: string;
  monthly: number;
  annual: number;
  sessions: string;
  featured?: boolean;
  cta: string;
  features: string[];
};

const TIERS: Tier[] = [
  {
    name: "Experimenter",
    blurb: "For the first price test you've been putting off.",
    monthly: 49,
    annual: 39,
    sessions: "50k sessions / mo",
    cta: "Start free trial",
    features: [
      "1 live experiment",
      "2 variants, 50/50 or weighted",
      "Revenue per visitor tracking",
      "Guardrails + Slack alerts",
      "14-day results history",
    ],
  },
  {
    name: "Growth",
    blurb: "For teams shipping a pricing change every quarter.",
    monthly: 149,
    annual: 119,
    sessions: "500k sessions / mo",
    featured: true,
    cta: "Start free trial",
    features: [
      "Unlimited experiments",
      "Multi-variant + holdout groups",
      "Warehouse revenue attribution",
      "Auto-promote + scheduled rollouts",
      "Sequential testing with alpha control",
      "SSO, roles, audit log",
    ],
  },
  {
    name: "Scale",
    blurb: "For pricing orgs with a finance team in the loop.",
    monthly: 399,
    annual: 319,
    sessions: "3M sessions / mo",
    cta: "Talk to sales",
    features: [
      "Everything in Growth",
      "Custom statistical models",
      "Reverse-ETL to your warehouse",
      "Margin + payback guardrails",
      "Dedicated experimentation lead",
      "DPA, SOC 2 report, 99.99% SLA",
    ],
  },
];

export default function PricingTiers() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="relative isolate scroll-mt-28 overflow-hidden py-20 sm:py-28">
      <Ambience variant="section" />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip mx-auto">
            <span className="h-1.5 w-1.5 rounded-full bg-beam" />
            Pricing
          </span>
          <h2 className="mt-5 text-balance font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[2.6rem]">
            Priced on sessions, not seats
          </h2>
          <p className="mt-4 text-pretty text-[1rem] leading-relaxed text-ink-2">
            Every plan includes edge variant delivery, revenue attribution, and
            guardrail alerts. Cancel any time — your data stays yours.
          </p>

          {/* billing toggle */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="glass flex rounded-full p-1">
              {(
                [
                  { label: "Monthly", value: false },
                  { label: "Annual", value: true },
                ] as const
              ).map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setAnnual(option.value)}
                  aria-pressed={annual === option.value}
                  className={`rounded-full px-4 py-2 text-[0.84rem] font-semibold transition-all duration-400 ${
                    annual === option.value
                      ? "bg-gradient-to-br from-[#7d6dff] to-[#4a37e0] text-white shadow-[0_12px_26px_-14px_rgba(74,55,224,.9)]"
                      : "text-ink-3 hover:text-ink"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <span className="rounded-full bg-lime/20 px-3 py-1.5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-[#3f8f3f]">
              2 months free
            </span>
          </div>
        </div>

        <Reveal
          className="perspective mt-14 grid items-start gap-5 lg:grid-cols-3"
          stagger={0.1}
        >
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={tier.featured ? "lg:-mt-8" : "lg:mt-4"}
            >
              <TiltCard
                className={`rounded-[1.9rem] ${
                  tier.featured ? "glass-deep" : "glass"
                }`}
                intensity={tier.featured ? 11 : 7}
              >
                <div className="relative flex h-full flex-col p-6 sm:p-7">
                  {tier.featured && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-white px-3.5 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-ink shadow-[0_14px_30px_-14px_rgba(10,10,30,.6)]">
                      Most popular
                    </span>
                  )}

                  <h3
                    className={`text-[1.15rem] font-semibold tracking-[-0.025em] ${
                      tier.featured ? "text-white" : "text-ink"
                    }`}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className={`mt-2 text-[0.86rem] leading-relaxed ${
                      tier.featured ? "text-white/60" : "text-ink-3"
                    }`}
                  >
                    {tier.blurb}
                  </p>

                  <div className="mt-6 flex items-end gap-1.5">
                    <span
                      className={`font-display text-[2.9rem] font-semibold leading-none tracking-[-0.05em] ${
                        tier.featured ? "text-white" : "text-ink"
                      }`}
                    >
                      <AnimatedNumber
                        value={annual ? tier.annual : tier.monthly}
                        prefix="$"
                      />
                    </span>
                    <span
                      className={`pb-1 text-[0.8rem] font-medium ${
                        tier.featured ? "text-white/50" : "text-ink-3"
                      }`}
                    >
                      / mo
                    </span>
                  </div>
                  <p
                    className={`mt-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] ${
                      tier.featured ? "text-white/40" : "text-ink-4"
                    }`}
                  >
                    {annual ? "billed annually" : "billed monthly"} · {tier.sessions}
                  </p>

                  {/* Every pricing CTA funnels to sign-in — there is no
                      sales contact flow yet. */}
                  <a
                    href="/login"
                    className={`btn mt-6 w-full ${
                      tier.featured ? "btn-primary" : "btn-ghost"
                    }`}
                  >
                    {tier.cta}
                  </a>

                  <ul className="mt-7 space-y-3">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className={`flex items-start gap-2.5 text-[0.86rem] leading-snug ${
                          tier.featured ? "text-white/75" : "text-ink-2"
                        }`}
                      >
                        <span
                          className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full"
                          style={{
                            background: tier.featured
                              ? "rgba(18,194,221,.2)"
                              : "rgba(109,93,251,.12)",
                          }}
                        >
                          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden>
                            <path
                              d="M2.6 6.3 4.8 8.5 9.4 3.6"
                              fill="none"
                              stroke={tier.featured ? "#8beeff" : "#5b46f0"}
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-10">
          <p className="text-center text-[0.82rem] text-ink-3">
            Running 3M+ sessions a month?{" "}
            <a
              href="#top"
              className="font-semibold text-beam-deep underline decoration-beam/40 decoration-2 underline-offset-4 transition-colors duration-300 hover:decoration-beam"
            >
              Get a usage-based quote
            </a>
            . All plans include unlimited seats and a 30-day money-back promise.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

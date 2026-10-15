"use client";

import { useMemo, useState } from "react";
import Ambience from "./motion/Ambience";
import AnimatedNumber from "./motion/AnimatedNumber";

/* ------------------------------------------------------------------ */
/*  Experiment model                                                   */
/* ------------------------------------------------------------------ */

const TOTAL_SESSIONS = 12480;
const SIGNIFICANCE_BASE = 99.6;

type VariantId = "A" | "B";

const VARIANTS: Record<
  VariantId,
  {
    tag: string;
    name: string;
    price: number;
    unit: string;
    cta: string;
    conversion: number;
    arpu: number;
    note: string;
  }
> = {
  A: {
    tag: "Variant A",
    name: "Flat seat pricing",
    price: 29,
    unit: "/ seat / mo",
    cta: "Start free trial",
    conversion: 3.1,
    arpu: 42,
    note: "One price, unlimited seats. The control everyone understands.",
  },
  B: {
    tag: "Variant B",
    name: "Seat + usage blend",
    price: 39,
    unit: "/ seat / mo",
    cta: "Start building free",
    conversion: 4.4,
    arpu: 46.6,
    note: "Higher headline, usage allowance included. More revenue per visitor.",
  },
};

const SPLITS = [
  { label: "50 / 50", bShare: 0.5 },
  { label: "70 / 30", bShare: 0.3 },
  { label: "90 / 10", bShare: 0.1 },
];

const GUARDRAILS = [
  { label: "Refund rate", a: "1.4%", b: "1.1%", state: "pass" as const },
  { label: "30-day churn", a: "2.4%", b: "2.6%", state: "watch" as const },
  { label: "Support load", a: "0.91", b: "0.84", state: "pass" as const },
];

const revenuePerVisitor = (v: (typeof VARIANTS)[VariantId]) =>
  (v.arpu * v.conversion) / 100;

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export default function VariantLab() {
  const [active, setActive] = useState<VariantId>("B");
  const [splitIndex, setSplitIndex] = useState(0);
  const [shipped, setShipped] = useState(false);

  const split = SPLITS[splitIndex];
  const bShare = shipped ? 1 : split.bShare;
  const aShare = 1 - bShare;

  const model = useMemo(() => {
    const sessions = {
      A: Math.round(TOTAL_SESSIONS * aShare),
      B: Math.round(TOTAL_SESSIONS * bShare),
    };
    const conversions = {
      A: Math.round((sessions.A * VARIANTS.A.conversion) / 100),
      B: Math.round((sessions.B * VARIANTS.B.conversion) / 100),
    };
    const minShare = Math.max(Math.min(aShare, bShare), 0.05);
    const significance = Math.min(
      SIGNIFICANCE_BASE * (minShare / 0.5),
      SIGNIFICANCE_BASE,
    );
    const rpv = {
      A: revenuePerVisitor(VARIANTS.A),
      B: revenuePerVisitor(VARIANTS.B),
    };
    const lift = ((rpv.B - rpv.A) / rpv.A) * 100;

    return { sessions, conversions, significance, rpv, lift };
  }, [aShare, bShare]);

  const variant = VARIANTS[active];
  const decidable = model.significance >= 95;
  const maxRpv = Math.max(model.rpv.A, model.rpv.B);

  const stats: {
    label: string;
    value: number;
    decimals: number;
    prefix?: string;
    suffix?: string;
    bar: number;
  }[] = [
    {
      label: "Conversion",
      value: variant.conversion,
      decimals: 1,
      suffix: "%",
      bar: (variant.conversion / 5.5) * 100,
    },
    {
      label: "ARPU",
      value: variant.arpu,
      decimals: 2,
      prefix: "$",
      bar: (variant.arpu / 55) * 100,
    },
    {
      label: "Revenue / visitor",
      value: model.rpv[active],
      decimals: 2,
      prefix: "$",
      bar: (model.rpv[active] / maxRpv) * 100,
    },
  ];

  return (
    <section id="lab" className="relative isolate scroll-mt-28 overflow-hidden py-20 sm:py-28">
      <Ambience variant="section" />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip mx-auto">
            <span className="h-1.5 w-1.5 rounded-full bg-aqua" />
            The live lab
          </span>
          <h2 className="mt-5 text-balance font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[2.6rem]">
            Poke at a real experiment
          </h2>
          <p className="mt-4 text-pretty text-[1rem] leading-relaxed text-ink-2">
            This is the console your team opens every morning. Change the traffic
            allocation, switch variants, and watch how Beam decides.
          </p>
        </div>

        {/* ------------------------------ console ------------------------------ */}
        <div className="glass-deep mt-12 rounded-[2rem] p-2.5 sm:rounded-[2.5rem] sm:p-3.5">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] sm:rounded-[2rem]">
            {/* top bar */}
            <div className="flex flex-col gap-4 border-b border-white/10 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="anim-ring absolute inset-0 rounded-full bg-lime" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-lime shadow-[0_0_10px_2px_rgba(127,217,127,.7)]" />
                </span>
                <div>
                  <p className="font-mono text-[0.78rem] font-semibold tracking-[-0.01em] text-white">
                    Experiment #1042
                  </p>
                  <p className="text-[0.72rem] text-white/45">
                    {shipped
                      ? "Stopped · winner promoted to 100%"
                      : `Running for 9 days · ${TOTAL_SESSIONS.toLocaleString()} sessions`}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/40">
                  Traffic split
                </span>
                <div className="flex rounded-full bg-white/[0.06] p-1">
                  {SPLITS.map((option, index) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => {
                        setSplitIndex(index);
                        setShipped(false);
                      }}
                      aria-pressed={splitIndex === index && !shipped}
                      className={`rounded-full px-3 py-1.5 font-mono text-[0.72rem] font-semibold transition-colors duration-300 ${
                        splitIndex === index && !shipped
                          ? "bg-white text-ink"
                          : "text-white/55 hover:text-white"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-6 lg:p-6">
              {/* -------------------- left: variant picker -------------------- */}
              <div className="flex flex-col gap-4">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {(["A", "B"] as VariantId[]).map((id) => {
                    const item = VARIANTS[id];
                    const selected = active === id;
                    const sessions = model.sessions[id];
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setActive(id)}
                        aria-pressed={selected}
                        className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-500 ${
                          selected
                            ? "border-white/30 bg-white/[0.09] shadow-[0_18px_40px_-22px_rgba(0,0,0,.9)]"
                            : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/45">
                              {item.tag}
                            </span>
                            <p className="mt-1 text-[0.92rem] font-semibold text-white">
                              {item.name}
                            </p>
                          </div>
                          <span
                            className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                              selected ? "border-aqua bg-aqua/25" : "border-white/25"
                            }`}
                          >
                            {selected && (
                              <span className="h-2 w-2 rounded-full bg-aqua" />
                            )}
                          </span>
                        </div>

                        <div className="mt-3 flex items-end justify-between gap-3">
                          <p className="font-display text-[1.5rem] font-semibold leading-none text-white">
                            ${item.price}
                            <span className="ml-1 text-[0.7rem] font-medium text-white/50">
                              {item.unit}
                            </span>
                          </p>
                          <p className="text-right font-mono text-[0.7rem] text-white/45">
                            {Math.round(aShare * 100)}% / {Math.round(bShare * 100)}%
                            <br />
                            {sessions.toLocaleString()} sessions
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* visitor-facing preview */}
                <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-white/40">
                    A visitor on {variant.tag} sees
                  </p>
                  <div key={active} className="anim-rise mt-3 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[0.85rem] font-semibold text-white">
                        {variant.name}
                      </p>
                      <p className="mt-1 font-display text-[2rem] font-semibold leading-none text-white">
                        ${variant.price}
                        <span className="ml-1 text-[0.75rem] font-medium text-white/50">
                          {variant.unit}
                        </span>
                      </p>
                    </div>
                    <span className="btn btn-primary px-4 py-2.5 text-[0.78rem]">
                      {variant.cta}
                    </span>
                  </div>
                  <p className="mt-3 text-[0.78rem] leading-relaxed text-white/50">
                    {variant.note}
                  </p>
                </div>
              </div>

              {/* -------------------- right: results -------------------- */}
              <div className="flex flex-col gap-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <p className="text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-white/40">
                        {stat.label}
                      </p>
                      <p className="mt-2 font-display text-[1.55rem] font-semibold leading-none text-white">
                        <AnimatedNumber
                          value={stat.value}
                          decimals={stat.decimals}
                          prefix={stat.prefix}
                          suffix={stat.suffix}
                        />
                      </p>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#b3a8ff] to-[#37d3ef] transition-[width] duration-700 ease-out"
                          style={{ width: `${stat.bar}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* significance meter */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-white/40">
                      Statistical confidence
                    </p>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.1em] ${
                        decidable ? "text-ink" : "text-white/70"
                      }`}
                      style={
                        decidable
                          ? { background: "linear-gradient(140deg,#8beeff,#37d3ef)" }
                          : { background: "rgba(255,255,255,.09)" }
                      }
                    >
                      {decidable ? "Ready to ship" : "Keep running"}
                    </span>
                  </div>

                  <p className="mt-3 font-display text-[2rem] font-semibold leading-none text-white">
                    <AnimatedNumber value={model.significance} decimals={1} suffix="%" />
                  </p>

                  <div className="relative mt-4 h-2.5 rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full transition-[width] duration-700 ease-out"
                      style={{
                        width: `${model.significance}%`,
                        background: decidable
                          ? "linear-gradient(90deg,#7fd97f,#37d3ef)"
                          : "linear-gradient(90deg,#b3a8ff,#6d5dfb)",
                      }}
                    />
                    <span
                      className="absolute -top-1 h-4.5 w-px bg-white/60"
                      style={{ left: "95%" }}
                    />
                    <span
                      className="absolute -top-6 -translate-x-1/2 font-mono text-[0.62rem] text-white/45"
                      style={{ left: "95%" }}
                    >
                      95%
                    </span>
                  </div>

                  <p className="mt-4 text-[0.78rem] leading-relaxed text-white/50">
                    {shipped
                      ? "Winner promoted. Beam is serving variant B to every visitor and monitoring the guardrails for 14 more days."
                      : decidable
                        ? `Variant B lifts revenue per visitor by ${model.lift.toFixed(1)}%. Beam recommends promoting it.`
                        : `Only ${Math.round(Math.min(aShare, bShare) * 100)}% of traffic is on the challenger — keep collecting data before you decide.`}
                  </p>
                </div>

                {/* guardrails */}
                <div className="grid gap-2 sm:grid-cols-3">
                  {GUARDRAILS.map((guard) => (
                    <div
                      key={guard.label}
                      className="flex items-center justify-between gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-3.5 py-3"
                    >
                      <div>
                        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white/40">
                          {guard.label}
                        </p>
                        <p className="mt-1 font-mono text-[0.74rem] text-white/70">
                          {guard.a} → {guard.b}
                        </p>
                      </div>
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{
                          background: guard.state === "pass" ? "#7fd97f" : "#ffc46b",
                          boxShadow:
                            guard.state === "pass"
                              ? "0 0 10px 2px rgba(127,217,127,.5)"
                              : "0 0 10px 2px rgba(255,196,107,.5)",
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* action */}
                <div className="mt-auto flex flex-col items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[0.78rem] text-white/50">
                    {shipped
                      ? "Variant B is the champion · guardrails still watched"
                      : "Promote B and Beam reroutes 100% of traffic instantly."}
                  </p>
                  <button
                    type="button"
                    disabled={shipped}
                    onClick={() => {
                      setShipped(true);
                      setActive("B");
                    }}
                    className={`btn shrink-0 px-5 py-3 text-[0.84rem] ${
                      shipped
                        ? "cursor-default bg-white/10 text-white/50"
                        : "btn-primary"
                    }`}
                  >
                    {shipped ? "✓ Variant B is live" : "Promote variant B"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

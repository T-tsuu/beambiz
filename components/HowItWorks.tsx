import Reveal from "./motion/Reveal";
import TiltCard from "./motion/TiltCard";

const STEPS = [
  {
    index: "01",
    title: "Point Beam at a page",
    body: "Drop in the snippet or mount the Next.js component. Beam finds your pricing table, snapshots it as the control, and starts collecting quietly.",
    visual: (
      <div className="rounded-2xl border border-white/70 bg-white/70 p-3.5 font-mono text-[0.7rem] leading-relaxed text-ink-2">
        <p className="text-ink-4">// app/pricing/page.tsx</p>
        <p className="mt-1">
          <span className="text-beam-deep">import</span> {"{ Beam }"}{" "}
          <span className="text-beam-deep">from</span> &quot;@beam/react&quot;
        </p>
        <p className="mt-0.5">
          &lt;<span className="text-aqua">Beam</span> experiment=
          <span className="text-coral">&quot;seat-vs-usage&quot;</span> /&gt;
        </p>
      </div>
    ),
  },
  {
    index: "02",
    title: "Describe what winning means",
    body: "One playbook per experiment: the primary metric, the smallest lift worth caring about, the guardrails, and how much traffic you'll risk.",
    visual: (
      <ul className="space-y-2 text-[0.76rem]">
        {[
          ["Primary", "Revenue / visitor"],
          ["Minimum lift", "5.0%"],
          ["Guardrail", "Refunds < 1.5%"],
        ].map(([key, value]) => (
          <li
            key={key}
            className="flex items-center justify-between gap-3 rounded-xl border border-white/70 bg-white/70 px-3 py-2"
          >
            <span className="text-ink-3">{key}</span>
            <span className="font-mono font-semibold text-ink">{value}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    index: "03",
    title: "Ship, watch, repeat",
    body: "Beam allocates traffic, watches revenue past the paywall, and promotes the winner on your schedule — or stops early the moment a guardrail trips.",
    visual: (
      <div className="rounded-2xl border border-white/70 bg-white/70 p-3.5">
        <div className="flex items-center justify-between text-[0.72rem]">
          <span className="font-semibold text-ink">Variant B · champion</span>
          <span className="font-mono text-beam-deep">100%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-beam/10">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-[#6d5dfb] to-[#37d3ef]" />
        </div>
        <div className="mt-3 flex h-10 items-end gap-1">
          {[34, 48, 42, 62, 74, 70, 88, 96, 92, 100].map((h, i) => (
            <span
              key={i}
              className="w-full rounded-sm bg-gradient-to-t from-[#6d5dfb] to-[#b3a8ff]"
              style={{ height: `${h}%`, opacity: 0.45 + i * 0.05 }}
            />
          ))}
        </div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-28">
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip mx-auto">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
            How it works
          </span>
          <h2 className="mt-5 text-balance font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[2.6rem]">
            Three steps to a price you can prove
          </h2>
        </div>

        <div className="relative mt-14">
          {/* connector */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[7.5rem] hidden lg:block"
          >
            <svg viewBox="0 0 1200 8" preserveAspectRatio="none" className="h-2 w-full">
              <path
                d="M40 4h1120"
                stroke="rgba(109,93,251,.35)"
                strokeWidth="2"
                strokeDasharray="2 10"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          <Reveal className="perspective relative grid gap-5 lg:grid-cols-3" stagger={0.12}>
            {STEPS.map((step) => (
              <div key={step.index}>
                <TiltCard className="glass rounded-[1.75rem]" intensity={7}>
                  <div className="flex h-full flex-col p-6">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#8b7cff] to-[#4a37e0] font-mono text-[0.72rem] font-bold text-white shadow-[0_12px_26px_-12px_rgba(74,55,224,.85)]">
                        {step.index}
                      </span>
                      <div className="hairline h-px flex-1" />
                    </div>

                    <h3 className="mt-5 text-[1.12rem] font-semibold tracking-[-0.025em] text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-[0.9rem] leading-relaxed text-ink-2">
                      {step.body}
                    </p>

                    <div className="mt-6">{step.visual}</div>
                  </div>
                </TiltCard>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

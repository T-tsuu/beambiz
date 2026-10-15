import AnimatedNumber from "./motion/AnimatedNumber";
import Reveal from "./motion/Reveal";

const METRICS = [
  {
    value: 18.4,
    decimals: 1,
    suffix: "%",
    label: "Median revenue lift",
    note: "Across 2,140 decided experiments",
    bar: 74,
  },
  {
    value: 2.3,
    decimals: 1,
    suffix: "B",
    label: "Priced pageviews served",
    note: "Split at the edge in the last 12 months",
    bar: 88,
  },
  {
    value: 41,
    decimals: 0,
    suffix: "ms",
    label: "p95 variant decision",
    note: "Before first paint, on cold cache",
    bar: 96,
  },
  {
    value: 99.99,
    decimals: 2,
    suffix: "%",
    label: "Delivery uptime",
    note: "Multi-region, no single point of failure",
    bar: 100,
  },
];

export default function MetricsBand() {
  return (
    <section className="relative isolate overflow-hidden px-4 py-6 sm:px-6 sm:py-10">
      <div className="glass-deep relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] px-6 py-12 sm:rounded-[2.5rem] sm:px-10 sm:py-16">
        {/* ambient light inside the dark band */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="bloom anim-drift"
            style={{
              width: "34rem",
              height: "34rem",
              left: "-10rem",
              top: "-16rem",
              background:
                "radial-gradient(circle, rgba(109,93,251,.55), transparent 66%)",
            }}
          />
          <div
            className="bloom anim-drift stagger-1"
            style={{
              width: "26rem",
              height: "26rem",
              right: "-6rem",
              bottom: "-14rem",
              background:
                "radial-gradient(circle, rgba(18,194,221,.42), transparent 68%)",
            }}
          />
        </div>

        <div className="relative">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="max-w-md text-balance font-display text-[1.6rem] font-semibold leading-tight tracking-[-0.03em] sm:text-[2rem]">
              Numbers our customers audited before they believed us
            </h2>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/40">
              Updated 1 Oct 2026
            </p>
          </div>

          <Reveal
            className="perspective mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.09}
          >
            {METRICS.map((metric) => (
              <div
                key={metric.label}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
              >
                <p className="font-display text-[2.1rem] font-semibold leading-none tracking-[-0.04em] text-white">
                  <AnimatedNumber
                    value={metric.value}
                    decimals={metric.decimals}
                    suffix={metric.suffix}
                    onView
                  />
                </p>
                <p className="mt-3 text-[0.86rem] font-medium text-white/80">
                  {metric.label}
                </p>
                <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#b3a8ff] to-[#37d3ef]"
                    style={{ width: `${metric.bar}%` }}
                  />
                </div>
                <p className="mt-3 text-[0.74rem] leading-relaxed text-white/45">
                  {metric.note}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import Reveal from "./motion/Reveal";
import TiltCard from "./motion/TiltCard";

const LOGOS = [
  "NORTHWIND",
  "COBALT",
  "Halo Labs",
  "FERN",
  "Arcadia",
  "PACE",
  "Lumen",
  "ORBIT",
];

const QUOTES = [
  {
    quote:
      "We ran four pricing experiments in a quarter and shipped the one that mattered. The guardrail alert probably saved us a whole renewal cohort.",
    name: "Dana Okafor",
    role: "VP Growth",
    company: "Northwind",
    metric: "+22.6% revenue / visitor",
  },
  {
    quote:
      "The first tool our finance team actually trusts. Every number traces back to a Stripe charge, not a click event.",
    name: "Marcus Feld",
    role: "CFO",
    company: "Cobalt",
    metric: "+$1.9M ARR",
  },
  {
    quote:
      "Two engineers, an afternoon, and our annual plan finally stopped leaking. Beam found the flat fee was quietly capping us.",
    name: "Priya Raman",
    role: "Head of Product",
    company: "Halo Labs",
    metric: "-34% churn intent",
  },
];

export default function Proof() {
  return (
    <section id="proof" className="relative isolate scroll-mt-28 overflow-hidden py-20 sm:py-28">
      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-4">
            Trusted with pricing at
          </p>
        </Reveal>
      </div>

      {/* logo marquee */}
      <div
        className="relative mt-8 flex overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <div className="anim-marquee flex w-max shrink-0 items-center gap-14 px-7">
          {[...LOGOS, ...LOGOS].map((logo, index) => (
            <span
              key={`${logo}-${index}`}
              className="shrink-0 font-display text-[1.15rem] font-semibold tracking-[-0.02em] whitespace-nowrap text-ink-4/70 transition-colors duration-500 hover:text-ink-2"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-16 max-w-6xl px-5">
        <Reveal className="perspective grid gap-5 lg:grid-cols-3" stagger={0.1}>
          {QUOTES.map((item) => (
            <div key={item.name}>
              <TiltCard className="glass rounded-[1.75rem]" intensity={7}>
                <figure className="flex h-full flex-col p-6">
                  <svg viewBox="0 0 32 24" className="h-5 w-7 text-beam/60" aria-hidden>
                    <path
                      d="M13 2.5C5.6 5.4 2 10.4 2 17.6v3.9h10.3v-9.3H7.6c.6-3.2 2.6-5.6 6.1-7.2zM29.9 2.5c-7.4 2.9-11 7.9-11 15.1v3.9h10.3v-9.3h-4.7c.6-3.2 2.6-5.6 6.1-7.2z"
                      fill="currentColor"
                    />
                  </svg>

                  <blockquote className="mt-4 text-[0.95rem] leading-relaxed text-ink-2">
                    {item.quote}
                  </blockquote>

                  <figcaption className="mt-6 border-t border-white/70 pt-5">
                    <p className="text-[0.88rem] font-semibold tracking-[-0.01em] text-ink">
                      {item.name}
                    </p>
                    <p className="mt-0.5 text-[0.78rem] text-ink-3">
                      {item.role} · {item.company}
                    </p>
                    <p className="mt-3 inline-flex rounded-full bg-beam/10 px-2.5 py-1 font-mono text-[0.68rem] font-semibold text-beam-deep">
                      {item.metric}
                    </p>
                  </figcaption>
                </figure>
              </TiltCard>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

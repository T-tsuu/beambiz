import Link from "next/link";
import { Wordmark } from "./Brand";

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Sub-processors", href: "/privacy#subprocessors" },
];

const COLUMNS = [
  {
    title: "Product",
    links: ["Variant delivery", "Revenue attribution", "Guardrails", "Statistics", "Integrations"],
  },
  {
    title: "Developers",
    links: ["Documentation", "Next.js SDK", "REST API", "Webhooks", "Status"],
  },
  {
    title: "Company",
    links: ["About", "Customers", "Careers", "Security", "Press kit"],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-white/70 bg-white/40 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-[0.86rem] leading-relaxed text-ink-3">
              Beam runs pricing experiments that hold up to a finance review. Built by
              people who got tired of vanity conversion lifts.
            </p>
            <div className="mt-5 flex gap-2">
              {["X", "in", "gh"].map((label) => (
                <a
                  key={label}
                  href="#top"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/80 bg-white/70 font-mono text-[0.7rem] font-semibold text-ink-2 transition-all duration-400 hover:-translate-y-1 hover:text-ink"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-4">
                {column.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="text-[0.88rem] text-ink-2 transition-colors duration-300 hover:text-beam-deep"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/70 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-4">
            © 2026 Beam Systems Inc · All prices exclude tax
          </p>
          <div className="flex gap-6">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.8rem] text-ink-3 transition-colors duration-300 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { Wordmark } from "./Brand";

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Sub-processors", href: "/privacy#subprocessors" },
];

export default function FooterMinimal() {
  return (
    <footer className="relative mt-auto border-t border-white/70 bg-white/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row">
        <Wordmark />
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-4">
          © 2026 Beam Systems Inc
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
    </footer>
  );
}
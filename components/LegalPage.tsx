import type { ReactNode } from "react";
import Link from "next/link";
import { Wordmark } from "./Brand";
import FooterMinimal from "./FooterMinimal";

export type LegalSection = {
  /** Anchor id — also the table-of-contents target. */
  id: string;
  heading: string;
  content: ReactNode;
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  summary: string;
  /** Human-readable revision date, e.g. "15 October 2026". */
  updated: string;
  sections: LegalSection[];
};

/**
 * Shared shell for the static legal documents (Privacy, Terms). Keeps the
 * marketing site's weightless look — glassy floating nav, tinted top wash,
 * drifting blooms — while laying the copy out as a readable document with a
 * sticky table of contents on desktop.
 */
export default function LegalPage({
  eyebrow,
  title,
  summary,
  updated,
  sections,
}: LegalPageProps) {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <div className="hero-topwash" aria-hidden />

      <header className="relative z-20 px-4 pt-4 sm:px-6">
        <nav
          aria-label="Main"
          className="nav-glass is-solid mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full py-2.5 pl-5 pr-2.5"
        >
          <Link href="/" className="shrink-0 rounded-full" aria-label="Beam home">
            <Wordmark />
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden rounded-full px-3.5 py-2 text-[0.9rem] font-medium text-ink-2 transition-colors duration-300 hover:text-ink sm:block"
            >
              Sign in
            </Link>
            <Link href="/signup" className="btn btn-primary px-5 py-2.5 text-[0.86rem]">
              Start free
            </Link>
          </div>
        </nav>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-4 pb-20 pt-12 sm:px-6 sm:pt-16">
        <div className="anim-rise max-w-3xl">
          <span className="chip">{eyebrow}</span>
          <h1 className="mt-5 text-balance font-display text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[2.8rem]">
            {title}
          </h1>
          <p className="mt-4 text-pretty text-[1rem] leading-relaxed text-ink-2">{summary}</p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/60 px-3.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-4 backdrop-blur">
            Last updated {updated}
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-0.5">
              <p className="mb-2 px-2.5 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-4">
                On this page
              </p>
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="rounded-lg px-2.5 py-1.5 text-[0.85rem] text-ink-3 transition-colors duration-200 hover:bg-white/60 hover:text-ink"
                >
                  {section.heading}
                </a>
              ))}
            </div>
          </nav>

          <div className="flex max-w-3xl flex-col gap-12">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="font-display text-[1.35rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.5rem]">
                  {section.heading}
                </h2>
                <div className="mt-4 flex flex-col gap-4 text-[0.95rem] leading-relaxed text-ink-2">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      <FooterMinimal />
    </div>
  );
}

/** Bulleted list styled to match the document body. */
export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <span
            className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-beam/60"
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Inline link used inside legal copy. */
export function LegalLink({
  href,
  children,
}: {
  href: React.ComponentProps<typeof Link>["href"];
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="font-medium text-beam-deep underline decoration-beam/40 decoration-2 underline-offset-4 transition-colors duration-300 hover:decoration-beam"
    >
      {children}
    </Link>
  );
}

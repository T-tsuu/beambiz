"use client";

import { useState } from "react";
import Ambience from "./motion/Ambience";
import Reveal from "./motion/Reveal";

export default function FinalCTA() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="relative isolate overflow-hidden px-4 pb-24 pt-8 sm:px-6 sm:pb-32">
      <Reveal>
        <div className="glass-deep relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:rounded-[2.75rem] sm:px-14 sm:py-20">
          <Ambience variant="cta" />

          <div className="relative">
            <span className="chip mx-auto border-white/20 bg-white/10 text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-aqua" />
              14 days free · no card
            </span>

            <h2 className="mx-auto mt-6 max-w-2xl text-balance font-display text-[2rem] font-semibold leading-[1.06] tracking-[-0.04em] sm:text-[2.9rem]">
              Your current price is a guess.
              <br className="hidden sm:block" /> Let&apos;s make it a number.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-pretty text-[1rem] leading-relaxed text-white/60">
              Connect your pricing page, pick a metric, and Beam will have a defensible
              answer within a week — or tell you honestly that you don&apos;t have the
              traffic to know yet.
            </p>

            <form
              className="mx-auto mt-9 flex w-full max-w-lg flex-col gap-3 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                if (!email.trim()) return;
                setSent(true);
              }}
            >
              <label className="sr-only" htmlFor="cta-email">
                Work email
              </label>
              <input
                id="cta-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.com"
                className="h-13 flex-1 rounded-full border border-white/15 bg-white/[0.07] px-5 text-[0.92rem] text-white placeholder:text-white/35 transition-colors duration-300 focus:border-aqua/60 focus:outline-none"
              />
              <button type="submit" className="btn btn-primary px-7 py-3.5 text-[0.92rem]">
                {sent ? "✓ Check your inbox" : "Create free experiment"}
              </button>
            </form>

            <p
              className={`mt-4 text-[0.82rem] transition-colors duration-500 ${
                sent ? "text-aqua" : "text-white/40"
              }`}
            >
              {sent
                ? "Nice — we sent a magic link to that address. Set up takes about four minutes."
                : "Or book a 20-minute demo with an experimentation engineer."}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-white/10 pt-8 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/35">
              <span>SOC 2 Type II</span>
              <span>GDPR + DPA ready</span>
              <span>No cloaking, ever</span>
              <span>Cancel in one click</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { connection } from "next/server";
import { Wordmark } from "@/components/Brand";
import { requireUser, type PortalUser } from "./data";
import { signOut } from "./actions";

export const metadata: Metadata = { title: "Portal — Beam" };

export default function PortalPage() {
  return (
    <div className="relative min-h-dvh">
      <div className="hero-topwash" aria-hidden />

      <header className="relative z-20 px-4 pt-4 sm:px-6">
        <nav className="nav-glass is-solid mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full py-2.5 pl-5 pr-2.5">
          <Link href="/" className="shrink-0 rounded-full" aria-label="Beam home">
            <Wordmark />
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/#pricing"
              className="hidden rounded-full px-3.5 py-2 text-[0.9rem] font-medium text-ink-2 transition-colors hover:text-ink sm:block"
            >
              Plans
            </Link>
            <form action={signOut}>
              <button type="submit" className="btn btn-ghost px-4 py-2.5 text-[0.86rem]">
                Sign out
              </button>
            </form>
          </div>
        </nav>
      </header>

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 sm:py-16">
        <Suspense fallback={<PortalSkeleton />}>
          <PortalDashboard />
        </Suspense>
      </main>
    </div>
  );
}

async function PortalDashboard() {
  // Opt into request-time rendering before touching Supabase: its session
  // helpers read the clock (token expiry), which is not prerenderable.
  await connection();

  const user = await requireUser();

  return (
    <>
      <div className="anim-rise flex flex-col gap-2">
        <span className="chip w-fit">Experiment portal</span>
        <h1 className="text-3xl font-semibold sm:text-4xl">
          Welcome back{user.displayName ? `, ${user.displayName.split(" ")[0]}` : ""}
        </h1>
        <p className="max-w-2xl text-ink-2">
          This is where your live pricing experiments land. Nothing is running yet —
          start a test and it will show up here with revenue impact, guardrail status
          and a ship/hold recommendation.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Active experiments" value="0" hint="Nothing live yet" />
        <Stat label="Revenue lift" value="—" hint="Needs 1 completed test" />
        <Stat label="Visitors sampled" value="0" hint="Across all variants" />
        <Stat label="Guardrail alerts" value="0" hint="All clear" />
      </section>

      <section className="glass float-2 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">Your experiments</h2>
            <p className="text-sm text-ink-3">Runs appear here as soon as they start collecting traffic.</p>
          </div>
          <Link href="/#pricing" className="btn btn-primary px-5 py-2.5 text-[0.86rem]">
            Start a free test
          </Link>
        </div>

        <div className="mt-6 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-beam/25 bg-white/50 px-6 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-beam/10 text-beam-deep">
            <span className="text-xl">◎</span>
          </div>
          <p className="font-medium text-ink">No experiments yet</p>
          <p className="max-w-sm text-sm text-ink-3">
            Connect a pricing page, pick your variants, and Beam handles the split,
            the stats and the guardrails.
          </p>
        </div>
      </section>

      <AccountCard user={user} />
    </>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="glass rounded-3xl p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-3">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold">{value}</p>
      <p className="mt-1 text-xs text-ink-4">{hint}</p>
    </div>
  );
}

function AccountCard({ user }: { user: PortalUser }) {
  return (
    <section className="glass float-1 rounded-3xl p-6 sm:p-8">
      <h2 className="text-xl font-semibold">Account</h2>
      <dl className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
        <Field label="Email" value={user.email} />
        <Field label="Sign-in method" value={user.provider} />
        <Field label="Member since" value={formatDate(user.createdAt)} />
        <Field label="Last sign-in" value={formatDate(user.lastSignInAt)} />
        <Field label="Account ID" value={user.id} mono />
      </dl>
    </section>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-xs font-semibold uppercase tracking-wide text-ink-3">{label}</dt>
      <dd className={`text-[0.95rem] text-ink ${mono ? "font-mono text-[0.8rem] break-all" : ""}`}>
        {value}
      </dd>
    </div>
  );
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/**
 * Formats a timestamp in UTC without `Intl`, which reads the machine clock
 * while prerendering the static shell. Deterministic output also keeps the
 * server and client markup identical.
 */
function formatDate(value: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}, ${pad(
    date.getUTCHours(),
  )}:${pad(date.getUTCMinutes())} UTC`;
}

function PortalSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-8" aria-hidden>
      <div className="flex flex-col gap-3">
        <div className="h-6 w-40 rounded-full bg-white/60" />
        <div className="h-10 w-72 rounded-2xl bg-white/60" />
        <div className="h-4 w-full max-w-2xl rounded-full bg-white/50" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 rounded-3xl bg-white/50" />
        ))}
      </div>
      <div className="h-64 rounded-3xl bg-white/50" />
    </div>
  );
}

"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { AuthState } from "./actions";

type Props = {
  mode: "login" | "signup";
  action: (state: AuthState, formData: FormData) => Promise<AuthState>;
  next?: string;
};

const COPY = {
  login: { label: "Sign in", cta: "Sign in", alt: "New to Beam?", altHref: "/signup", altLabel: "Create an account" },
  signup: { label: "Sign up", cta: "Create account", alt: "Already have an account?", altHref: "/login", altLabel: "Sign in" },
} as const;

export default function AuthForm({ mode, action, next }: Props) {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    action,
    undefined,
  );
  const copy = COPY[mode];

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      <input type="hidden" name="next" value={next ?? ""} />

      <label className="flex flex-col gap-1.5 text-sm font-medium text-ink-2">
        Email
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder="you@company.com"
          className="rounded-2xl border border-white/80 bg-white/70 px-4 py-3 text-[0.95rem] font-normal text-ink shadow-[inset_0_1px_2px_rgba(24,20,60,0.06)] outline-none backdrop-blur transition focus:border-beam/50 placeholder:text-ink-4"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium text-ink-2">
        Password
        <input
          type="password"
          name="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          required
          minLength={8}
          placeholder="At least 8 characters"
          className="rounded-2xl border border-white/80 bg-white/70 px-4 py-3 text-[0.95rem] font-normal text-ink shadow-[inset_0_1px_2px_rgba(24,20,60,0.06)] outline-none backdrop-blur transition focus:border-beam/50 placeholder:text-ink-4"
        />
      </label>

      {state?.error ? (
        <p
          role="alert"
          className="rounded-2xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-ink"
        >
          {state.error}
        </p>
      ) : null}

      {state?.notice ? (
        <p
          role="status"
          className="rounded-2xl border border-aqua/40 bg-aqua/10 px-4 py-3 text-sm text-ink"
        >
          {state.notice}
        </p>
      ) : null}

      <button type="submit" disabled={pending} className="btn btn-primary mt-1 w-full disabled:opacity-70">
        {pending ? "Working…" : copy.cta}
      </button>

      <p className="text-center text-sm text-ink-3">
        {copy.alt}{" "}
        <Link href={copy.altHref} className="font-semibold text-beam-deep hover:underline">
          {copy.altLabel}
        </Link>
      </p>
    </form>
  );
}

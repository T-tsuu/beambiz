import { Suspense } from "react";
import type { Metadata } from "next";
import AuthForm from "../AuthForm";
import { login } from "../actions";

export const metadata: Metadata = { title: "Sign in — Beam" };

const ERROR_COPY: Record<string, string> = {
  confirmation_failed:
    "That confirmation link is invalid or has expired. Try signing in again.",
};

export default function LoginPage(props: PageProps<"/login">) {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <LoginCard searchParams={props.searchParams} />
    </Suspense>
  );
}

async function LoginCard({
  searchParams,
}: Pick<PageProps<"/login">, "searchParams">) {
  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : undefined;
  const errorKey = typeof params.error === "string" ? params.error : undefined;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="text-sm text-ink-3">
          Sign in to open your Beam experiment portal.
        </p>
      </header>

      {errorKey && ERROR_COPY[errorKey] ? (
        <p
          role="alert"
          className="rounded-2xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm"
        >
          {ERROR_COPY[errorKey]}
        </p>
      ) : null}

      <AuthForm mode="login" action={login} next={next} />
    </div>
  );
}

function LoginSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-6" aria-hidden>
      <div className="flex flex-col gap-2">
        <div className="h-7 w-40 rounded-xl bg-white/60" />
        <div className="h-4 w-64 rounded-full bg-white/50" />
      </div>
      <div className="h-12 rounded-2xl bg-white/50" />
      <div className="h-12 rounded-2xl bg-white/50" />
      <div className="h-11 rounded-full bg-white/50" />
    </div>
  );
}

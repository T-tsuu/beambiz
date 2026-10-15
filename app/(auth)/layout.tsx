import Link from "next/link";
import { Wordmark } from "@/components/Brand";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center px-4 py-16">
      <div className="hero-topwash" aria-hidden />
      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="mx-auto mb-6 flex w-fit rounded-full" aria-label="Beam home">
          <Wordmark />
        </Link>
        <div className="glass float-2 rounded-3xl p-7 sm:p-9">{children}</div>
        <p className="mt-6 text-center text-xs text-ink-3">
          Protected by Supabase Auth. We never store your password in plain text.
        </p>
      </div>
    </main>
  );
}

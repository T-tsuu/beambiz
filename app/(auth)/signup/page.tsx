import type { Metadata } from "next";
import AuthForm from "../AuthForm";
import { signup } from "../actions";

export const metadata: Metadata = { title: "Create your account — Beam" };

export default function SignupPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-semibold">Start your first experiment</h1>
        <p className="text-sm text-ink-3">
          Create an account to run pricing tests with real revenue numbers.
        </p>
      </header>

      <AuthForm mode="signup" action={signup} />
    </div>
  );
}

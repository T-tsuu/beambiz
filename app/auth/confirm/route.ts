import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Landing endpoint for account-confirmation (and magic-link) emails.
 *
 * Handles both shapes Supabase can send:
 *  - `token_hash` + `type` — the server-side flow used when the confirmation
 *    template points at this route with `{{ .TokenHash }}`.
 *  - `code` — the PKCE flow Supabase appends when it redirects from its own
 *    verify endpoint (the default `{{ .ConfirmationURL }}` template).
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const code = searchParams.get("code");
  const next = safeNext(searchParams.get("next"));

  const supabase = await createClient();

  let failed = false;

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    failed = Boolean(error);
  } else if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    failed = Boolean(error);
  } else {
    failed = true;
  }

  const target = new URL(failed ? "/login" : next, origin);
  if (failed) target.searchParams.set("error", "confirmation_failed");

  return NextResponse.redirect(target);
}

function safeNext(value: string | null) {
  return value && value.startsWith("/") && !value.startsWith("//")
    ? value
    : "/portal";
}

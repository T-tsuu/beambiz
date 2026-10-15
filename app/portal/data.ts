import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type PortalUser = {
  id: string;
  email: string;
  createdAt: string | null;
  lastSignInAt: string | null;
  provider: string;
  displayName: string | null;
};

/**
 * Data Access Layer entry point for the portal. Revalidates the session with
 * Supabase and redirects unauthenticated visitors to the login page.
 */
export async function requireUser(): Promise<PortalUser> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/portal");
  }

  return {
    id: user.id,
    email: user.email ?? "—",
    createdAt: user.created_at ?? null,
    lastSignInAt: user.last_sign_in_at ?? null,
    provider: user.app_metadata?.provider ?? "email",
    displayName:
      (user.user_metadata?.full_name as string | undefined) ??
      (user.user_metadata?.name as string | undefined) ??
      null,
  };
}

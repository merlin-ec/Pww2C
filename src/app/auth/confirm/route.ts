import type { EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { safeNextPath } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";

const EMAIL_LINK_TYPES = new Set<EmailOtpType>([
  "signup",
  "email",
  "recovery",
  "invite",
  "magiclink",
  "email_change",
]);

/**
 * Every link in an auth email (confirm sign-up, reset password) lands here.
 * Two kinds of link are accepted:
 *  - token_hash links (our email templates): work on any device or browser.
 *  - code links (Supabase's default templates): only work in the browser that
 *    started the sign-up, which is why we switch the templates.
 * Either way the user ends up signed in and is sent on to `next`.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const code = searchParams.get("code");
  const next = safeNextPath(searchParams.get("next"), "/account");

  const supabase = await createClient();
  let confirmed = false;

  if (tokenHash && type && EMAIL_LINK_TYPES.has(type)) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    confirmed = !error;
    if (error) console.error("Email link verification failed", error.code);
  } else if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    confirmed = !error;
    if (error) console.error("Email code exchange failed", error.code);
  }

  // The secret token never travels further than this handler.
  return NextResponse.redirect(new URL(confirmed ? next : "/auth/error", origin));
}

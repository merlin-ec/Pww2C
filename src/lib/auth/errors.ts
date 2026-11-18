import type { AuthError } from "@supabase/supabase-js";

/**
 * Turns Supabase auth errors into messages that say what happened and what to
 * do next. Log-in failures stay deliberately vague so nobody can use the form
 * to find out which email addresses have accounts.
 */
export function friendlyAuthError(error: AuthError): string {
  switch (error.code) {
    case "over_email_send_rate_limit":
    case "over_request_rate_limit":
      return "Too many attempts in a short time. Wait a few minutes and try again.";
    case "weak_password":
      return "That password is too easy to guess. Try a longer one.";
    case "same_password":
      return "That's your current password. Choose a new one.";
    case "email_address_invalid":
      return "That email address can't receive mail. Check it and try again.";
    case "signup_disabled":
      return "New sign-ups are paused right now. Try again later.";
    case "email_not_confirmed":
      return "Confirm your email first: open the link we sent when you signed up.";
    case "invalid_credentials":
      return "That email and password don't match an account.";
    default:
      console.error("Unhandled auth error", error.code, error.message);
      return "Something went wrong on our side. Try again in a moment.";
  }
}

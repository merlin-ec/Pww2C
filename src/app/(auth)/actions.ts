"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { friendlyAuthError } from "@/lib/auth/errors";
import { emailField, newPasswordField, usernameField } from "@/lib/auth/validation";
import { field, type FormState } from "@/lib/forms";
import { getSessionUser } from "@/lib/auth/dal";
import { safeNextPath, siteUrl } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";

/**
 * Sign-up, log-in, log-out and password reset. Server Actions run on the
 * server only; the browser just posts the form. Every input is validated here
 * even though the forms also validate, because the browser can't be trusted.
 */

export async function signUp(_previous: FormState, formData: FormData): Promise<FormState> {
  const values = { email: field(formData, "email"), username: field(formData, "username") };
  const parsed = z
    .object({ email: emailField, password: newPasswordField, username: usernameField })
    .safeParse({ ...values, password: field(formData, "password") });
  if (!parsed.success) {
    return { status: "error", fieldErrors: z.flattenError(parsed.error).fieldErrors, values };
  }
  const { email, password, username } = parsed.data;

  const supabase = await createClient();
  const { data: existing, error: lookupError } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .maybeSingle();
  if (lookupError) {
    return { status: "error", message: "Something went wrong on our side. Try again in a moment.", values };
  }
  if (existing) {
    return { status: "error", fieldErrors: { username: ["That username is taken."] }, values };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // The database creates the profile and claims this username.
      data: { username },
      emailRedirectTo: `${siteUrl()}/auth/confirm?next=/account`,
    },
  });
  if (error) return { status: "error", message: friendlyAuthError(error), values };

  // With email confirmation switched off (local development), you're signed in already.
  if (data.session) redirect("/account");

  return {
    status: "success",
    message: `We've sent a confirmation link to ${email}. Open it to finish creating your account. If you already have an account, log in instead.`,
  };
}

export async function logIn(_previous: FormState, formData: FormData): Promise<FormState> {
  const values = { email: field(formData, "email") };
  const parsed = z
    .object({ email: emailField, password: z.string().min(1, "Enter your password.") })
    .safeParse({ ...values, password: field(formData, "password") });
  if (!parsed.success) {
    return { status: "error", fieldErrors: z.flattenError(parsed.error).fieldErrors, values };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return { status: "error", message: friendlyAuthError(error), values };

  redirect(safeNextPath(field(formData, "next"), "/"));
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function requestPasswordReset(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const values = { email: field(formData, "email") };
  const parsed = emailField.safeParse(values.email);
  if (!parsed.success) {
    return { status: "error", fieldErrors: { email: [parsed.error.issues[0]?.message ?? "Enter a valid email address."] }, values };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data, {
    redirectTo: `${siteUrl()}/auth/confirm?next=/reset-password`,
  });
  // Only rate limits are worth reporting; anything else would reveal whether
  // the address has an account.
  if (error?.code === "over_email_send_rate_limit" || error?.code === "over_request_rate_limit") {
    return { status: "error", message: friendlyAuthError(error), values };
  }
  if (error) console.error("Password reset request failed", error.code, error.message);

  return {
    status: "success",
    message: `If ${parsed.data} has an account, a reset link is on its way. It works once and expires in an hour.`,
  };
}

export async function updatePassword(_previous: FormState, formData: FormData): Promise<FormState> {
  const user = await getSessionUser();
  if (!user) {
    return {
      status: "error",
      message: "Your reset link has expired or was already used. Request a new one.",
    };
  }

  const password = field(formData, "password");
  const parsed = z
    .object({ password: newPasswordField, confirm: z.string() })
    .refine((data) => data.password === data.confirm, {
      path: ["confirm"],
      message: "The two passwords don't match.",
    })
    .safeParse({ password, confirm: field(formData, "confirm") });
  if (!parsed.success) {
    return { status: "error", fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) return { status: "error", message: friendlyAuthError(error) };

  redirect("/account?updated=password");
}

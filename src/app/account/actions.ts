"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireUser } from "@/lib/auth/dal";
import { bioField, displayNameField, usernameField } from "@/lib/auth/validation";
import { field, type FormState } from "@/lib/forms";
import { REGION_CODES } from "@/lib/regions";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function updateProfile(_previous: FormState, formData: FormData): Promise<FormState> {
  // Re-check who's asking: never trust that the form came from the right person.
  const user = await requireUser("/account");

  const values = {
    username: field(formData, "username"),
    display_name: field(formData, "display_name"),
    bio: field(formData, "bio"),
    region: field(formData, "region"),
  };
  const parsed = z
    .object({
      // Guests (anonymous accounts) can't have a username; the database enforces it too.
      username: user.isGuest ? z.literal("").transform(() => null) : usernameField,
      display_name: displayNameField,
      bio: bioField,
      region: z.enum(REGION_CODES as [string, ...string[]], "Choose a country from the list."),
    })
    .safeParse(values);
  if (!parsed.success) {
    return { status: "error", fieldErrors: z.flattenError(parsed.error).fieldErrors, values };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update(parsed.data)
    .eq("id", user.id);

  if (error?.code === "23505") {
    return { status: "error", fieldErrors: { username: ["That username is taken."] }, values };
  }
  if (error) {
    console.error("Profile update failed", error.code, error.message);
    return { status: "error", message: "Your changes weren't saved. Try again in a moment.", values };
  }

  refresh();
  return { status: "success", message: "Profile saved." };
}

const DELETE_PHRASE = "delete my account";

export async function deleteAccount(_previous: FormState, formData: FormData): Promise<FormState> {
  const user = await requireUser("/account");

  if (field(formData, "confirm").trim().toLowerCase() !== DELETE_PHRASE) {
    return {
      status: "error",
      fieldErrors: { confirm: [`Type "${DELETE_PHRASE}" to confirm.`] },
    };
  }

  // Deleting an account needs the secret key. Everything tied to the account
  // (profile, usage, and later ratings and lists) is removed with it by the
  // database's cascade rules.
  const admin = createAdminClient();
  const { error } = await admin.auth.admin.deleteUser(user.id);
  if (error) {
    console.error("Account deletion failed", error.code, error.message);
    return { status: "error", message: "Your account wasn't deleted. Try again in a moment." };
  }

  const supabase = await createClient();
  await supabase.auth.signOut({ scope: "local" });
  redirect("/?account=deleted");
}

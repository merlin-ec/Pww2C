import { z } from "zod";

/**
 * Form rules shared by sign-up, log-in and account settings. The database
 * enforces the same username and length rules, so these exist to give
 * friendly messages, not as the only line of defence.
 */

// Must match the profiles_username_not_reserved check in the database.
export const RESERVED_USERNAMES = new Set([
  "admin",
  "administrator",
  "moderator",
  "pww",
  "prestige",
  "support",
  "help",
  "official",
  "staff",
  "system",
  "root",
]);

export const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("Enter a valid email address.").max(254, "That email address is too long."));

// Supabase stores passwords with bcrypt, which only reads the first 72 bytes.
export const newPasswordField = z
  .string()
  .min(8, "Use at least 8 characters.")
  .refine((value) => new TextEncoder().encode(value).length <= 72, "Use a shorter password (72 bytes max).");

export const usernameField = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-z0-9_]{3,20}$/, "Use 3 to 20 letters, numbers or underscores.")
  .refine((value) => !RESERVED_USERNAMES.has(value), "That username is reserved.");

export const displayNameField = z
  .string()
  .trim()
  .max(50, "Keep it to 50 characters.")
  .transform((value) => (value === "" ? null : value));

export const bioField = z
  .string()
  .trim()
  .max(280, "Keep it to 280 characters.")
  .transform((value) => (value === "" ? null : value));

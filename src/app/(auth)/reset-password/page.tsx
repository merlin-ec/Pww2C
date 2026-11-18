import type { Metadata } from "next";
import { AuthCard } from "../auth-card";
import { ResetPasswordForm } from "../forms";

export const metadata: Metadata = { title: "Choose a new password", robots: { index: false } };

// You arrive here from the link in a password-reset email, which signs you in
// for long enough to choose a new password.
export default function ResetPasswordPage() {
  return (
    <AuthCard title="Choose a new password">
      <ResetPasswordForm />
    </AuthCard>
  );
}

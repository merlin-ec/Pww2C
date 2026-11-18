import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "../auth-card";
import { SignUpForm } from "../forms";

export const metadata: Metadata = { title: "Create your account" };

export default function SignUpPage() {
  return (
    <AuthCard
      title="Create your account"
      intro="Rate what you've seen, keep a watchlist, and get picks that fit your taste."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="link">
            Log in
          </Link>
        </>
      }
    >
      <SignUpForm />
    </AuthCard>
  );
}

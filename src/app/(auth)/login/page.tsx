import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { safeNextPath } from "@/lib/site";
import { AuthCard } from "../auth-card";
import { LogInForm } from "../forms";

export const metadata: Metadata = { title: "Log in" };

export default function LogInPage({ searchParams }: PageProps<"/login">) {
  return (
    <AuthCard
      title="Log in"
      footer={
        <>
          New here?{" "}
          <Link href="/signup" className="link">
            Create an account
          </Link>
        </>
      }
    >
      <Suspense fallback={<div className="skeleton h-56" aria-hidden />}>
        {/* Where to go after logging in comes from the URL, read at request time. */}
        {searchParams.then(({ next }) => (
          <LogInForm next={safeNextPath(next, "/")} />
        ))}
      </Suspense>
    </AuthCard>
  );
}

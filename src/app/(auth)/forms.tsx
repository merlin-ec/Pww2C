"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Field, FormMessage, SubmitButton } from "@/components/form-bits";
import { idleState } from "@/lib/forms";
import { logIn, requestPasswordReset, signUp, updatePassword } from "./actions";

export function SignUpForm() {
  const [state, action] = useActionState(signUp, idleState);

  if (state.status === "success") {
    return (
      <div className="space-y-4">
        <FormMessage state={state} />
        <p className="text-sm text-program">
          Nothing arrived after a few minutes? Check your spam folder, then{" "}
          <Link href="/signup" className="link">
            try again
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5" noValidate>
      <FormMessage state={state} />
      <Field name="email" label="Email" type="email" autoComplete="email" maxLength={254} state={state} />
      <Field
        name="username"
        label="Username"
        autoComplete="username"
        maxLength={20}
        hint="3 to 20 letters, numbers or underscores. It's how friends find you."
        state={state}
      />
      <Field
        name="password"
        label="Password"
        type="password"
        autoComplete="new-password"
        hint="At least 8 characters."
        state={state}
      />
      <SubmitButton pendingLabel="Creating your account…">Create account</SubmitButton>
    </form>
  );
}

export function LogInForm({ next }: { next: string }) {
  const [state, action] = useActionState(logIn, idleState);
  return (
    <form action={action} className="space-y-5" noValidate>
      <FormMessage state={state} />
      <input type="hidden" name="next" value={next} />
      <Field name="email" label="Email" type="email" autoComplete="email" maxLength={254} state={state} />
      <Field name="password" label="Password" type="password" autoComplete="current-password" state={state} />
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/forgot-password" className="link text-sm">
          Forgot your password?
        </Link>
        <SubmitButton pendingLabel="Logging in…">Log in</SubmitButton>
      </div>
    </form>
  );
}

export function ForgotPasswordForm() {
  const [state, action] = useActionState(requestPasswordReset, idleState);
  if (state.status === "success") return <FormMessage state={state} />;
  return (
    <form action={action} className="space-y-5" noValidate>
      <FormMessage state={state} />
      <Field name="email" label="Email" type="email" autoComplete="email" maxLength={254} state={state} />
      <SubmitButton pendingLabel="Sending…">Send reset link</SubmitButton>
    </form>
  );
}

export function ResetPasswordForm() {
  const [state, action] = useActionState(updatePassword, idleState);
  return (
    <form action={action} className="space-y-5" noValidate>
      <FormMessage state={state} />
      {state.status === "error" && !state.fieldErrors ? (
        <p className="text-sm">
          <Link href="/forgot-password" className="link">
            Request a new reset link
          </Link>
        </p>
      ) : null}
      <Field
        name="password"
        label="New password"
        type="password"
        autoComplete="new-password"
        hint="At least 8 characters."
        state={state}
      />
      <Field name="confirm" label="Type it again" type="password" autoComplete="new-password" state={state} />
      <SubmitButton pendingLabel="Saving…">Save new password</SubmitButton>
    </form>
  );
}

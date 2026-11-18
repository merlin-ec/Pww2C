"use client";

import { useFormStatus } from "react-dom";
import type { FormState } from "@/lib/forms";

type FieldProps = {
  name: string;
  label: string;
  type?: "text" | "email" | "password" | "search";
  autoComplete?: string;
  defaultValue?: string | null;
  required?: boolean;
  maxLength?: number;
  hint?: string;
  state: FormState;
};

/** A labelled input that shows its own validation error from the last submit. */
export function Field({
  name,
  label,
  type = "text",
  autoComplete,
  defaultValue,
  required = true,
  maxLength,
  hint,
  state,
}: FieldProps) {
  const errors = state.fieldErrors?.[name];
  // When there's an error it restates the rule, so the hint steps aside.
  const showHint = Boolean(hint) && !errors?.length;
  const describedBy = errors?.length ? `${name}-error` : showHint ? `${name}-hint` : undefined;
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        defaultValue={state.values?.[name] ?? defaultValue ?? undefined}
        required={required}
        maxLength={maxLength}
        aria-invalid={errors?.length ? true : undefined}
        aria-describedby={describedBy}
        className="text-input"
      />
      {showHint ? (
        <p id={`${name}-hint`} className="text-xs text-program">
          {hint}
        </p>
      ) : null}
      {errors?.length ? (
        <p id={`${name}-error`} className="text-sm text-exit">
          {errors[0]}
        </p>
      ) : null}
    </div>
  );
}

/** Submit button that disables itself and shows progress while the action runs. */
export function SubmitButton({
  children,
  pendingLabel,
  variant = "primary",
}: {
  children: React.ReactNode;
  pendingLabel: string;
  variant?: "primary" | "danger";
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={variant === "danger" ? "button-danger" : "button-primary w-full sm:w-auto"}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

/** The form-level message from the last submit, announced to screen readers. */
export function FormMessage({ state }: { state: FormState }) {
  if (!state.message) return null;
  return (
    <p
      role={state.status === "error" ? "alert" : "status"}
      className={`rounded-md border px-3 py-2 text-sm ${
        state.status === "error" ? "border-exit/70 text-exit" : "border-go/60 text-go"
      }`}
    >
      {state.message}
    </p>
  );
}

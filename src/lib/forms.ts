/** What every form action returns to its form. Kept free of dependencies so
 * client components can import it without pulling validation code along. */
export type FormState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: Partial<Record<string, string[]>>;
  /** Echoes safe values back so a failed submit doesn't wipe the form. */
  values?: Record<string, string>;
};

export const idleState: FormState = { status: "idle" };

/** Reads one text field from submitted form data ("" when missing). */
export function field(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

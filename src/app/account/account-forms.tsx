"use client";

import { useActionState } from "react";
import { Field, FormMessage, SubmitButton } from "@/components/form-bits";
import { idleState } from "@/lib/forms";
import { REGIONS, type RegionCode } from "@/lib/regions";
import { deleteAccount, updateProfile } from "./actions";

type ProfileFormProps = {
  username: string | null;
  displayName: string | null;
  bio: string | null;
  region: RegionCode;
  isGuest: boolean;
};

export function ProfileForm({ username, displayName, bio, region, isGuest }: ProfileFormProps) {
  const [state, action] = useActionState(updateProfile, idleState);
  const bioError = state.fieldErrors?.bio?.[0];
  const regionError = state.fieldErrors?.region?.[0];

  return (
    <form action={action} className="space-y-5" noValidate>
      <FormMessage state={state} />
      {isGuest ? (
        <input type="hidden" name="username" value="" />
      ) : (
        <Field
          name="username"
          label="Username"
          autoComplete="username"
          maxLength={20}
          defaultValue={username}
          hint="3 to 20 letters, numbers or underscores."
          state={state}
        />
      )}
      <Field
        name="display_name"
        label="Display name"
        autoComplete="nickname"
        maxLength={50}
        required={false}
        defaultValue={displayName}
        state={state}
      />
      <div className="space-y-1.5">
        <label htmlFor="bio" className="block text-sm font-medium">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={3}
          maxLength={280}
          defaultValue={state.values?.bio ?? bio ?? ""}
          aria-invalid={bioError ? true : undefined}
          aria-describedby={bioError ? "bio-error" : "bio-hint"}
          className="text-input"
        />
        {bioError ? (
          <p id="bio-error" className="text-sm text-exit">
            {bioError}
          </p>
        ) : (
          <p id="bio-hint" className="text-xs text-program">
            Up to 280 characters. Shown on your profile.
          </p>
        )}
      </div>
      <div className="space-y-1.5">
        <label htmlFor="region" className="block text-sm font-medium">
          Country for streaming availability
        </label>
        <select
          id="region"
          name="region"
          defaultValue={state.values?.region ?? region}
          aria-invalid={regionError ? true : undefined}
          className="text-input"
        >
          {Object.entries(REGIONS).map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
        {regionError ? <p className="text-sm text-exit">{regionError}</p> : null}
      </div>
      <SubmitButton pendingLabel="Saving…">Save profile</SubmitButton>
    </form>
  );
}

export function DeleteAccountForm() {
  const [state, action] = useActionState(deleteAccount, idleState);
  return (
    <form action={action} className="space-y-5" noValidate>
      <FormMessage state={state} />
      <p className="text-sm text-program">
        This permanently deletes your account, profile and everything you&apos;ve saved. It
        can&apos;t be undone.
      </p>
      <Field
        name="confirm"
        label={'Type "delete my account" to confirm'}
        autoComplete="off"
        state={state}
      />
      <SubmitButton pendingLabel="Deleting…" variant="danger">
        Delete my account
      </SubmitButton>
    </form>
  );
}

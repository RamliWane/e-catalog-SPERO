"use client"

import { useState, type FormEvent } from "react"
import { ChevronDown, CircleAlert } from "lucide-react"
import UserModal from "./UserModal"
import {
  USER_ROLES,
  USER_STATUSES,
  type UserFormValues,
  type UserRecord,
} from "./user-data"

type UserFormErrors = Partial<Record<keyof UserFormValues, string>>

type UserFormModalProps = {
  mode: "add" | "edit"
  user?: UserRecord
  existingEmails: string[]
  onClose: () => void
  onSubmit: (values: UserFormValues) => void
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputClassName =
  "h-10 w-full rounded-lg border bg-white px-3 text-[12px] text-[#14213D] transition-colors placeholder:text-[#8A9AB5] focus:outline-none focus:ring-2"

export default function UserFormModal({
  mode,
  user,
  existingEmails,
  onClose,
  onSubmit,
}: UserFormModalProps) {
  const [values, setValues] = useState<UserFormValues>(() =>
    user
      ? {
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
        }
      : {
          name: "",
          email: "",
          role: "User",
          status: "Active",
        },
  )
  const [errors, setErrors] = useState<UserFormErrors>({})

  function updateField<Key extends keyof UserFormValues>(
    field: Key,
    value: UserFormValues[Key],
  ) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      if (!current[field]) {
        return current
      }

      const nextErrors = { ...current }
      delete nextErrors[field]
      return nextErrors
    })
  }

  function validate() {
    const nextErrors: UserFormErrors = {}
    const name = values.name.trim()
    const email = values.email.trim()
    const normalizedEmail = email.toLowerCase()

    if (name === "") {
      nextErrors.name = "Full name is required."
    } else if (name.length < 2) {
      nextErrors.name = "Full name must be at least 2 characters."
    }

    if (email === "") {
      nextErrors.email = "Email address is required."
    } else if (!EMAIL_PATTERN.test(email)) {
      nextErrors.email = "Enter a valid email address."
    } else if (
      existingEmails.some(
        (existingEmail) => existingEmail.toLowerCase() === normalizedEmail,
      )
    ) {
      nextErrors.email = "A user with this email already exists."
    }

    return nextErrors
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidField = Object.keys(nextErrors)[0]
      document.getElementById(`user-form-${firstInvalidField}`)?.focus()
      return
    }

    onSubmit({
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      role: values.role,
      status: values.status,
    })
  }

  const hasErrors = Object.keys(errors).length > 0

  return (
    <UserModal
      title={mode === "add" ? "Add New User" : "Edit User"}
      description={
        mode === "add"
          ? "Create a user account and set the initial access details."
          : `Update the account details for ${user?.name ?? "this user"}.`
      }
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} noValidate>
        {hasErrors ? (
          <div
            role="alert"
            className="mb-4 flex items-start gap-2 rounded-lg border border-[#FECDCA] bg-[#FEF3F2] px-3 py-2.5 text-[11px] leading-5 text-[#B42318]"
          >
            <CircleAlert
              size={14}
              aria-hidden="true"
              className="mt-0.5 shrink-0"
            />
            <p>Please review the highlighted fields before continuing.</p>
          </div>
        ) : null}

        <div className="space-y-4">
          <div>
            <label
              htmlFor="user-form-name"
              className="mb-1.5 block text-[12px] font-medium text-[#183B56]"
            >
              Full Name
            </label>
            <input
              id="user-form-name"
              type="text"
              value={values.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Enter full name"
              autoComplete="name"
              required
              autoFocus
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "user-form-name-error" : undefined}
              className={`${inputClassName} ${
                errors.name
                  ? "border-[#FDA29B] focus:border-[#B42318] focus:ring-[#B42318]/15"
                  : "border-[#DDE7F8] focus:border-[#3978FF] focus:ring-[#3978FF]/20"
              }`}
            />
            {errors.name ? (
              <p
                id="user-form-name-error"
                className="mt-1.5 text-[11px] text-[#B42318]"
              >
                {errors.name}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="user-form-email"
              className="mb-1.5 block text-[12px] font-medium text-[#183B56]"
            >
              Email Address
            </label>
            <input
              id="user-form-email"
              type="email"
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="name@spero.test"
              autoComplete="email"
              required
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? "user-form-email-error" : undefined
              }
              className={`${inputClassName} ${
                errors.email
                  ? "border-[#FDA29B] focus:border-[#B42318] focus:ring-[#B42318]/15"
                  : "border-[#DDE7F8] focus:border-[#3978FF] focus:ring-[#3978FF]/20"
              }`}
            />
            {errors.email ? (
              <p
                id="user-form-email-error"
                className="mt-1.5 text-[11px] text-[#B42318]"
              >
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="user-form-role"
                className="mb-1.5 block text-[12px] font-medium text-[#183B56]"
              >
                Role
              </label>
              <div className="relative">
                <select
                  id="user-form-role"
                  value={values.role}
                  onChange={(event) =>
                    updateField("role", event.target.value as UserFormValues["role"])
                  }
                  className={`${inputClassName} appearance-none border-[#DDE7F8] pr-9 focus:border-[#3978FF] focus:ring-[#3978FF]/20`}
                >
                  {USER_ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={15}
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7A8CA8]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="user-form-status"
                className="mb-1.5 block text-[12px] font-medium text-[#183B56]"
              >
                Account Status
              </label>
              <div className="relative">
                <select
                  id="user-form-status"
                  value={values.status}
                  onChange={(event) =>
                    updateField(
                      "status",
                      event.target.value as UserFormValues["status"],
                    )
                  }
                  className={`${inputClassName} appearance-none border-[#DDE7F8] pr-9 focus:border-[#3978FF] focus:ring-[#3978FF]/20`}
                >
                  {USER_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={15}
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7A8CA8]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 border-t border-[#DDE7F8] pt-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-[#DDE7F8] bg-white px-4 text-[12px] font-medium text-[#526786] transition-colors hover:border-[#3978FF]/40 hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-[#14213D] px-4 text-[12px] font-semibold text-white transition-colors hover:bg-[#183B56] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2"
          >
            {mode === "add" ? "Add User" : "Save Changes"}
          </button>
        </div>
      </form>
    </UserModal>
  )
}

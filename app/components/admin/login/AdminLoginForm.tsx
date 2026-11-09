"use client"

import { useRef, useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, CircleAlert, Eye, EyeOff, LoaderCircle } from "lucide-react"

export type AdminLoginCredentials = {
  email: string
  password: string
}

export type AdminLoginResult = { ok: true } | { ok: false }

export type AdminLoginAuthenticator = (
  credentials: AdminLoginCredentials,
) => Promise<AdminLoginResult>

type AdminLoginFormProps = {
  authenticate?: AdminLoginAuthenticator
  redirectTo?: string
}

type FieldName = "email" | "password"
type FieldErrors = Partial<Record<FieldName, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const AUTH_UNAVAILABLE_MESSAGE =
  "Admin sign-in is not configured yet. Please contact the system administrator."

const GENERIC_AUTH_ERROR =
  "We couldn't sign you in. Please check your email and password and try again."

function validate(values: AdminLoginCredentials): FieldErrors {
  const errors: FieldErrors = {}
  const email = values.email.trim()

  if (!email) {
    errors.email = "Email is required."
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address."
  }

  if (!values.password) {
    errors.password = "Password is required."
  }

  return errors
}

export default function AdminLoginForm({
  authenticate,
  redirectTo,
}: AdminLoginFormProps) {
  const router = useRouter()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const [values, setValues] = useState<AdminLoginCredentials>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [authError, setAuthError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(field: FieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }))

    setErrors((current) => {
      if (!current[field]) {
        return current
      }

      const next = { ...current }
      delete next[field]
      return next
    })

    if (authError) {
      setAuthError(null)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    const nextErrors = validate(values)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setAuthError(null)

      if (nextErrors.email) {
        emailRef.current?.focus()
      } else if (nextErrors.password) {
        passwordRef.current?.focus()
      }

      return
    }

    setErrors({})
    setAuthError(null)

    if (!authenticate) {
      setAuthError(AUTH_UNAVAILABLE_MESSAGE)
      return
    }

    setIsSubmitting(true)

    try {
      const result = await authenticate({
        email: values.email.trim(),
        password: values.password,
      })

      if (!result.ok) {
        setAuthError(GENERIC_AUTH_ERROR)
        setIsSubmitting(false)
        return
      }

      if (!redirectTo) {
        setAuthError(
          "Sign-in succeeded, but the admin dashboard is not available yet. Please contact the system administrator.",
        )
        setIsSubmitting(false)
        return
      }

      router.replace(redirectTo)
      router.refresh()
    } catch {
      setAuthError(GENERIC_AUTH_ERROR)
      setIsSubmitting(false)
    }
  }

  function fieldClasses(field: FieldName) {
    return `h-11 w-full rounded-lg border bg-white px-3.5 text-[13px] text-[#14213D] outline-none transition-colors duration-150 placeholder:text-[#526786]/60 focus:ring-[3px] ${
      errors[field]
        ? "border-[#B42318]/30 focus:border-[#B42318] focus:ring-[#B42318]/10"
        : "border-[#DDE7F8] focus:border-[#14213D] focus:ring-[#14213D]/10"
    }`
  }

  return (
    <section
      aria-labelledby="admin-login-heading"
      className="w-full rounded-xl border border-[#DDE7F8] bg-white p-6 shadow-[0_18px_50px_rgba(20,33,61,0.08)] sm:p-8"
    >
      <h1
        id="admin-login-heading"
        className="text-[26px] font-bold leading-tight tracking-[-0.02em] text-[#14213D] sm:text-[30px]"
      >
        Admin Login
      </h1>

      <p className="mt-2 text-[13px] leading-[1.6] text-[#526786]">
        Sign in to manage your website
      </p>

      <form
        noValidate
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col gap-4"
      >
        {authError ? (
          <div
            role="alert"
            className="flex gap-2.5 rounded-lg border border-[#B42318]/20 bg-[#FFF5F4] px-3.5 py-3 text-[12px] leading-[1.55] text-[#B42318]"
          >
            <CircleAlert
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              className="mt-0.5 shrink-0"
            />
            <p>{authError}</p>
          </div>
        ) : null}

        <div className="min-w-0">
          <label
            htmlFor="admin-email"
            className="text-[12px] font-semibold text-[#14213D]"
          >
            Email
          </label>

          <input
            ref={emailRef}
            id="admin-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            maxLength={254}
            required
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "admin-email-error" : undefined}
            value={values.email}
            onChange={(event) => handleChange("email", event.target.value)}
            placeholder="admin@spero.com"
            className={`${fieldClasses("email")} mt-2`}
          />

          {errors.email ? (
            <p
              id="admin-email-error"
              role="alert"
              className="mt-1.5 text-[11px] font-medium text-[#B42318]"
            >
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="min-w-0">
          <label
            htmlFor="admin-password"
            className="text-[12px] font-semibold text-[#14213D]"
          >
            Password
          </label>

          <div className="relative mt-2">
            <input
              ref={passwordRef}
              id="admin-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              maxLength={256}
              required
              aria-required="true"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password ? "admin-password-error" : undefined
              }
              value={values.password}
              onChange={(event) => handleChange("password", event.target.value)}
              placeholder="Enter your password"
              className={`${fieldClasses("password")} pr-11`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              aria-controls="admin-password"
              className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-[#526786] transition-colors duration-150 hover:bg-[#F5F8FF] hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14213D] focus-visible:ring-offset-1"
            >
              {showPassword ? (
                <EyeOff size={16} strokeWidth={1.8} aria-hidden="true" />
              ) : (
                <Eye size={16} strokeWidth={1.8} aria-hidden="true" />
              )}
            </button>
          </div>

          {errors.password ? (
            <p
              id="admin-password-error"
              role="alert"
              className="mt-1.5 text-[11px] font-medium text-[#B42318]"
            >
              {errors.password}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="group mt-1 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#14213D] px-5 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-[#183B56] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14213D] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle
                size={16}
                strokeWidth={2}
                aria-hidden="true"
                className="animate-spin"
              />
              Signing In...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight
                size={16}
                strokeWidth={2}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </>
          )}
        </button>

        <span className="sr-only" aria-live="polite">
          {isSubmitting ? "Signing in" : ""}
        </span>
      </form>
    </section>
  )
}

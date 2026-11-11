"use client"

import { useRef, useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  CircleAlert,
  Eye,
  EyeOff,
  LoaderCircle,
} from "lucide-react"

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
  "Email atau kata sandi salah. Silakan periksa kembali."

function validate(values: AdminLoginCredentials): FieldErrors {
  const errors: FieldErrors = {}
  const email = values.email.trim()

  if (!email) {
    errors.email = "Email wajib diisi."
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Masukkan alamat email yang valid."
  }

  if (!values.password) {
    errors.password = "Kata sandi wajib diisi."
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
      if (!current[field]) return current

      const next = { ...current }
      delete next[field]
      return next
    })

    if (authError) setAuthError(null)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitting) return

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
          "Login berhasil, tetapi halaman dashboard admin belum tersedia.",
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
    return `w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#1A2E4C] outline-none transition-all duration-200 placeholder:text-slate-400 focus:ring-2 ${
      errors[field]
        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
        : "border-slate-300 focus:border-[#1A2E4C] focus:ring-[#1A2E4C]/10"
    }`
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-10">
      <div className="w-full max-w-md">
        <header className="mb-5 text-center">
          <a
            href="/"
            aria-label="Kembali ke halaman utama"
            className="inline-flex items-center justify-center"
          >
            <img
              src="/spero_logo.png"
              alt="Spero"
              className="h-12 w-auto object-contain"
            />
          </a>
        </header>

        <section
          aria-labelledby="admin-login-heading"
          className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"
        >
          <h1
            id="admin-login-heading"
            className="font-heading text-2xl font-extrabold tracking-tight text-[#1A2E4C] sm:text-3xl"
          >
            Welcome Back!
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
            Masuk ke akun admin Anda untuk melanjutkan.
          </p>

          <form
            noValidate
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            {authError && (
              <div
                role="alert"
                className="flex gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                <CircleAlert
                  size={18}
                  className="mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <p>{authError}</p>
              </div>
            )}

            <div>
              <label
                htmlFor="admin-email"
                className="mb-2 block text-sm font-medium text-slate-700"
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
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "admin-email-error" : undefined
                }
                value={values.email}
                onChange={(event) =>
                  handleChange("email", event.target.value)
                }
                placeholder="Alamat email"
                className={fieldClasses("email")}
              />

              {errors.email && (
                <p
                  id="admin-email-error"
                  role="alert"
                  className="mt-2 text-xs font-medium text-red-600"
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Kata sandi
              </label>

              <div className="relative">
                <input
                  ref={passwordRef}
                  id="admin-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  maxLength={256}
                  required
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? "admin-password-error" : undefined
                  }
                  value={values.password}
                  onChange={(event) =>
                    handleChange("password", event.target.value)
                  }
                  placeholder="Masukkan kata sandi"
                  className={`${fieldClasses("password")} pr-24`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={
                    showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
                  }
                  aria-pressed={showPassword}
                  aria-controls="admin-password"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-2 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-[#1A2E4C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2E4C]"
                >
                  {showPassword ? "Sembunyikan" : "Tampilkan"}
                </button>
              </div>

              {errors.password && (
                <p
                  id="admin-password-error"
                  role="alert"
                  className="mt-2 text-xs font-medium text-red-600"
                >
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-transparent bg-[#1A2E4C] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1A2E4C]/10 transition-colors duration-200 hover:border-[#1A2E4C] hover:bg-white hover:text-[#1A2E4C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2E4C] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle
                    size={17}
                    className="animate-spin"
                    aria-hidden="true"
                  />
                  Memproses...
                </>
              ) : (
                <>
                  Masuk
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </>
              )}
            </button>

            <span className="sr-only" aria-live="polite">
              {isSubmitting ? "Sedang memproses login" : ""}
            </span>
          </form>
        </section>
      </div>
    </main>
  )
}
"use client"

import { useState, type FormEvent } from "react"
import { ArrowRight } from "lucide-react"

export type ContactFormValues = {
  name: string
  email: string
  subject: string
  message: string
}

type FieldName = keyof ContactFormValues
type FormErrors = Partial<Record<FieldName, string>>
type SubmitStatus = "idle" | "submitting" | "success" | "error"

export type ContactFormProps = {
  onSubmit?: (values: ContactFormValues) => Promise<void>
}

const EMPTY_FORM: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: ContactFormValues): FormErrors {
  const errors: FormErrors = {}

  if (!values.name.trim()) {
    errors.name = "Please enter your name."
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address."
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address."
  }

  if (!values.message.trim()) {
    errors.message = "Please enter your message."
  } else if (values.message.trim().length < 10) {
    errors.message = "Please enter at least 10 characters."
  }

  return errors
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [values, setValues] = useState<ContactFormValues>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>("idle")

  const isSubmitting = status === "submitting"

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

    if (status === "success" || status === "error") {
      setStatus("idle")
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validate(values)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatus("idle")
      return
    }

    setStatus("submitting")

    try {
      const payload: ContactFormValues = {
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
      }

      if (onSubmit) {
        await onSubmit(payload)
      }

      setValues(EMPTY_FORM)
      setErrors({})
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  function fieldClasses(field: FieldName) {
    return `mt-2 w-full rounded-xl border bg-white px-3.5 text-[13px] text-[#14264B] outline-none transition-colors duration-150 placeholder:text-[#94A3B8] focus:ring-[3px] ${
      errors[field]
        ? "border-red-300 focus:border-red-400 focus:ring-red-500/10"
        : "border-[#E5EBF5] focus:border-[#3B82F6] focus:ring-[#3B82F6]/10"
    }`
  }

  return (
    <section
      aria-labelledby="contact-form-heading"
      className="flex h-full flex-col rounded-[24px] border border-[#E5EBF5] bg-white p-5 shadow-[0_18px_50px_rgba(20,38,75,0.05)] sm:p-7 lg:p-8"
    >
      
      <p className="inline-block text-[11px] font-medium text-slate-500 uppercase tracking-widest">
        Let&apos;s Talk
      </p>

      <h2
        id="contact-form-heading"
        className="mt-3 text-[28px] font-bold leading-[1.12] tracking-[-0.02em] text-[#14264B] sm:text-[32px]"
      >
        Send Us a Message
      </h2>

      <p className="mt-3 max-w-[440px] text-[13px] leading-[1.65] text-[#64748B] sm:text-[14px]">
        Fill out the form below and we&apos;ll get back to you as soon as
        possible.
      </p>

      <form
        noValidate
        onSubmit={handleSubmit}
        className="mt-7 flex flex-1 flex-col gap-4"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="min-w-0">
            <label
              htmlFor="contact-name"
              className="text-[12px] font-semibold text-[#14264B]"
            >
              Your Name <span className="text-[#3B82F6]">*</span>
            </label>

            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              value={values.name}
              onChange={(event) => handleChange("name", event.target.value)}
              placeholder="Your full name"
              maxLength={100}
              className={`h-11 ${fieldClasses("name")}`}
            />

            {errors.name ? (
              <p
                id="contact-name-error"
                role="alert"
                className="mt-1.5 text-[11px] font-medium text-red-600"
              >
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="min-w-0">
            <label
              htmlFor="contact-email"
              className="text-[12px] font-semibold text-[#14264B]"
            >
              Your Email <span className="text-[#3B82F6]">*</span>
            </label>

            <input
              id="contact-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? "contact-email-error" : undefined
              }
              value={values.email}
              onChange={(event) => handleChange("email", event.target.value)}
              placeholder="you@company.com"
              maxLength={254}
              className={`h-11 ${fieldClasses("email")}`}
            />

            {errors.email ? (
              <p
                id="contact-email-error"
                role="alert"
                className="mt-1.5 text-[11px] font-medium text-red-600"
              >
                {errors.email}
              </p>
            ) : null}
          </div>
        </div>

        <div className="min-w-0">
          <label
            htmlFor="contact-subject"
            className="text-[12px] font-semibold text-[#14264B]"
          >
            Subject <span className="font-normal text-[#94A3B8]">(optional)</span>
          </label>

          <input
            id="contact-subject"
            name="subject"
            type="text"
            autoComplete="off"
            value={values.subject}
            onChange={(event) => handleChange("subject", event.target.value)}
            placeholder="How can we help?"
            maxLength={160}
            className={`h-11 ${fieldClasses("subject")}`}
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <label
            htmlFor="contact-message"
            className="text-[12px] font-semibold text-[#14264B]"
          >
            Your Message <span className="text-[#3B82F6]">*</span>
          </label>

          <textarea
            id="contact-message"
            name="message"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? "contact-message-error" : undefined
            }
            value={values.message}
            onChange={(event) => handleChange("message", event.target.value)}
            placeholder="Tell us a little about what you need..."
            maxLength={2000}
            className={`min-h-[136px] flex-1 resize-y py-3 leading-[1.6] ${fieldClasses(
              "message",
            )}`}
          />

          {errors.message ? (
            <p
              id="contact-message-error"
              role="alert"
              className="mt-1.5 text-[11px] font-medium text-red-600"
            >
              {errors.message}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#14264B] px-6 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-[#1D3A6E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
          <ArrowRight
            size={16}
            strokeWidth={1.9}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </button>

        <div aria-live="polite">
          {status === "success" ? (
            <p
              role="status"
              className="rounded-xl bg-[#EFF6FF] px-3.5 py-3 text-[12px] font-medium text-[#1D4ED8]"
            >
              Thanks for reaching out. We&apos;ll get back to you soon.
            </p>
          ) : null}

          {status === "error" ? (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-3.5 py-3 text-[12px] font-medium text-red-600"
            >
              Something went wrong. Please try again.
            </p>
          ) : null}
        </div>
      </form>
    </section>
  )
}

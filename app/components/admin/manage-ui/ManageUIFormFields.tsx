"use client"

import {
  ChevronDown,
  CircleAlert,
  Info,
  type LucideIcon,
} from "lucide-react"
import type { ReactNode } from "react"

export const inputClassName =
  "h-10 w-full rounded-lg border border-[#DDE7F8] bg-white px-3 text-[12px] text-[#14213D] transition-colors placeholder:text-[#8A9AB5] focus:border-[#3978FF] focus:outline-none focus:ring-2 focus:ring-[#3978FF]/20"

export const textAreaClassName =
  "w-full rounded-lg border border-[#DDE7F8] bg-white px-3 py-2.5 text-[12px] leading-5 text-[#14213D] transition-colors placeholder:text-[#8A9AB5] focus:border-[#3978FF] focus:outline-none focus:ring-2 focus:ring-[#3978FF]/20"

export function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  hint,
  maxLength,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  hint?: string
  maxLength?: number
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[11px] font-medium text-[#183B56]"
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        autoComplete="off"
        className={inputClassName}
      />
      {hint ? (
        <p className="mt-1 text-[10px] leading-4 text-[#7A8CA8]">{hint}</p>
      ) : null}
    </div>
  )
}

export function TextAreaField({
  id,
  label,
  value,
  onChange,
  rows = 3,
  hint,
  maxLength,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  rows?: number
  hint?: string
  maxLength?: number
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[11px] font-medium text-[#183B56]"
      >
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        maxLength={maxLength}
        className={textAreaClassName}
      />
      {hint ? (
        <p className="mt-1 text-[10px] leading-4 text-[#7A8CA8]">{hint}</p>
      ) : null}
    </div>
  )
}

export function SelectField({
  id,
  label,
  value,
  options,
  onChange,
  hint,
}: {
  id: string
  label: string
  value: string
  options: { label: string; value: string }[]
  onChange: (value: string) => void
  hint?: string
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[11px] font-medium text-[#183B56]"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${inputClassName} appearance-none pr-9`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7A8CA8]"
        />
      </div>
      {hint ? (
        <p className="mt-1 text-[10px] leading-4 text-[#7A8CA8]">{hint}</p>
      ) : null}
    </div>
  )
}

export function ToggleField({
  id,
  label,
  description,
  checked,
  onChange,
}: {
  id: string
  label: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-[#DDE7F8] bg-white px-3 py-2.5"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[#3978FF]"
      />
      <span className="min-w-0">
        <span className="block text-[11px] font-medium text-[#183B56]">
          {label}
        </span>
        {description ? (
          <span className="mt-0.5 block text-[10px] leading-4 text-[#7A8CA8]">
            {description}
          </span>
        ) : null}
      </span>
    </label>
  )
}

export function EditorGroup({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string
  description?: string
  icon?: LucideIcon
  children: ReactNode
}) {
  return (
    <section className="rounded-lg border border-[#DDE7F8] bg-[#F8FAFC]/70 p-4">
      <div className="flex items-start gap-2">
        {Icon ? (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white text-[#3978FF] ring-1 ring-[#DDE7F8]">
            <Icon size={12} aria-hidden="true" />
          </span>
        ) : null}
        <div>
          <h3 className="text-[12px] font-semibold text-[#14213D]">{title}</h3>
          {description ? (
            <p className="mt-0.5 text-[10px] leading-4 text-[#526786]">
              {description}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-4 space-y-4">{children}</div>
    </section>
  )
}

export function ContextNote({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-[#DDE7F8] bg-white px-3 py-2.5 text-[10px] leading-4 text-[#526786]">
      <Info
        size={13}
        aria-hidden="true"
        className="mt-0.5 shrink-0 text-[#3978FF]"
      />
      <p>{children}</p>
    </div>
  )
}

export function FieldWarning({ children }: { children: ReactNode }) {
  return (
    <p className="mt-1 flex items-start gap-1.5 text-[10px] leading-4 text-[#B45309]">
      <CircleAlert size={12} aria-hidden="true" className="mt-0.5 shrink-0" />
      <span>{children}</span>
    </p>
  )
}

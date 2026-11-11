"use client"

import { CheckCircle2, CircleAlert, Info, X } from "lucide-react"

export type HomepageFeedback = {
  tone: "success" | "info" | "error"
  message: string
}

export default function HomepageEditorFeedback({
  feedback,
  onDismiss,
}: {
  feedback: HomepageFeedback
  onDismiss: () => void
}) {
  const isSuccess = feedback.tone === "success"
  const isError = feedback.tone === "error"

  return (
    <div
      role={isError ? "alert" : "status"}
      className={`flex items-start gap-2.5 rounded-lg border px-3.5 py-2.5 text-[11px] leading-5 ${
        isSuccess
          ? "border-[#BBF7D0] bg-[#F0FDF4] text-[#166534]"
          : isError
            ? "border-[#FECACA] bg-[#FEF2F2] text-[#B91C1C]"
            : "border-[#DDE7F8] bg-[#F8FAFC] text-[#526786]"
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 size={15} aria-hidden="true" className="mt-0.5 shrink-0" />
      ) : isError ? (
        <CircleAlert size={15} aria-hidden="true" className="mt-0.5 shrink-0" />
      ) : (
        <Info size={15} aria-hidden="true" className="mt-0.5 shrink-0" />
      )}
      <p className="flex-1">{feedback.message}</p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss message"
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF]"
      >
        <X size={13} aria-hidden="true" />
      </button>
    </div>
  )
}

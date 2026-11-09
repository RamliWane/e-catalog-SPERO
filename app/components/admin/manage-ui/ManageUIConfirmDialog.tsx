"use client"

import { useEffect, useId, useRef } from "react"
import { RotateCcw, X } from "lucide-react"

export default function ManageUIConfirmDialog({
  onClose,
  onConfirm,
}: {
  onClose: () => void
  onConfirm: () => void
}) {
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const bodyOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    panelRef.current?.querySelector<HTMLElement>("button")?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault()
        onCloseRef.current()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = bodyOverflow
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#14213D]/35 p-4 sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md rounded-xl border border-[#DDE7F8] bg-white shadow-[0_24px_64px_rgba(20,33,61,0.18)]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#DDE7F8] px-5 py-4 sm:px-6">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F5F8FF] text-[#3978FF]">
              <RotateCcw size={17} aria-hidden="true" />
            </span>
            <div>
              <h2
                id={titleId}
                className="text-[16px] font-semibold tracking-tight text-[#14213D]"
              >
                Reset homepage changes?
              </h2>
              <p className="mt-1 text-[12px] leading-5 text-[#526786]">
                All sections, visibility settings, and ordering will return to
                the default data.
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#7A8CA8] transition-colors hover:bg-[#F8FAFC] hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2"
          >
            <X size={17} aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-col-reverse gap-2 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-[#DDE7F8] bg-white px-4 text-[12px] font-medium text-[#526786] transition-colors hover:border-[#3978FF]/40 hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#14213D] px-4 text-[12px] font-semibold text-white transition-colors hover:bg-[#183B56] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2"
          >
            <RotateCcw size={14} aria-hidden="true" />
            Reset Changes
          </button>
        </div>
      </div>
    </div>
  )
}

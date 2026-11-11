"use client"

import { useEffect, useState } from "react"
import { LoaderCircle, Trash2, X } from "lucide-react"
import CatalogHeader from "./CatalogHeader"
import CatalogManager from "./CatalogManager"
import CatalogSummary from "./CatalogSummary"
import CatalogItemDialog from "./CatalogItemDialog"
import { deleteCatalogItem } from "@/app/admin/catalog/actions"
import type {
  CatalogAdminCategory,
  CatalogAdminItem,
} from "@/lib/catalog-admin"

type CatalogAdminProps = {
  initialItems: CatalogAdminItem[]
  initialCategories: CatalogAdminCategory[]
}

type Feedback = {
  tone: "success" | "error"
  message: string
}

type DialogState =
  | { mode: "create" }
  | { mode: "edit"; item: CatalogAdminItem }
  | null

function sortItems(items: CatalogAdminItem[]) {
  return [...items].sort(
    (a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name),
  )
}

function DeleteCatalogDialog({
  item,
  isPending,
  onCancel,
  onConfirm,
}: {
  item: CatalogAdminItem
  isPending: boolean
  onCancel: () => void
  onConfirm: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#14213D]/45 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isPending) onCancel()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="catalog-delete-dialog-title"
        className="w-full max-w-md rounded-xl bg-white p-5 shadow-2xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FEF3F2] text-[#B42318]">
            <Trash2 size={18} aria-hidden="true" />
          </span>
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            aria-label="Close dialog"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#7A8CA8] transition-colors hover:bg-[#F8FAFC] hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 disabled:opacity-50"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        <h2
          id="catalog-delete-dialog-title"
          className="mt-4 text-[16px] font-semibold tracking-tight text-[#14213D]"
        >
          Delete catalog item?
        </h2>
        <p className="mt-2 text-[12px] leading-5 text-[#526786]">
          <span className="font-semibold text-[#183B56]">{item.name}</span> will
          be removed from the admin catalog and the public website. This action
          cannot be undone.
        </p>

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-[#DDE7F8] bg-white px-4 text-[12px] font-semibold text-[#526786] transition-colors hover:bg-[#F8FAFC] hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#B42318] px-4 text-[12px] font-semibold text-white transition-colors hover:bg-[#912018] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B42318] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending && (
              <LoaderCircle
                size={14}
                className="animate-spin"
                aria-hidden="true"
              />
            )}
            Delete Catalog
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CatalogAdmin({
  initialItems,
  initialCategories,
}: CatalogAdminProps) {
  const [items, setItems] = useState(initialItems)
  const [dialog, setDialog] = useState<DialogState>(null)
  const [deleteTarget, setDeleteTarget] = useState<CatalogAdminItem | null>(
    null,
  )
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!feedback) return
    const timeout = window.setTimeout(() => setFeedback(null), 4500)
    return () => window.clearTimeout(timeout)
  }, [feedback])

  function handleSaved(item: CatalogAdminItem) {
    setItems((current) => {
      const exists = current.some((entry) => entry.id === item.id)
      return sortItems(
        exists
          ? current.map((entry) => (entry.id === item.id ? item : entry))
          : [item, ...current],
      )
    })
    setDialog(null)
    setFeedback({
      tone: "success",
      message: `Catalog item "${item.name}" saved.`,
    })
  }

  async function handleDelete() {
    if (!deleteTarget) return

    setIsDeleting(true)
    const result = await deleteCatalogItem(deleteTarget.id)
    setIsDeleting(false)

    if (!result.ok) {
      setFeedback({ tone: "error", message: result.message })
      return
    }

    setItems((current) =>
      current.filter((item) => item.id !== deleteTarget.id),
    )
    setFeedback({
      tone: "success",
      message: `Catalog item "${deleteTarget.name}" deleted.`,
    })
    setDeleteTarget(null)
  }

  return (
    <div className="min-w-0 lg:pl-[240px]">
      <CatalogHeader onAdd={() => setDialog({ mode: "create" })} />

      <main className="mx-auto w-full max-w-[1440px] space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {feedback && (
          <div
            role={feedback.tone === "error" ? "alert" : "status"}
            className={`flex items-start justify-between gap-3 rounded-xl border px-4 py-3 text-[12px] ${
              feedback.tone === "error"
                ? "border-[#FECDCA] bg-[#FEF3F2] text-[#B42318]"
                : "border-[#BFE3D0] bg-[#F0FDF4] text-[#166534]"
            }`}
          >
            <span>{feedback.message}</span>
            <button
              type="button"
              onClick={() => setFeedback(null)}
              aria-label="Dismiss message"
              className="shrink-0 opacity-70 transition-opacity hover:opacity-100"
            >
              <X size={14} aria-hidden="true" />
            </button>
          </div>
        )}

        <CatalogSummary items={items} />
        <CatalogManager
          items={items}
          categories={initialCategories}
          onEdit={(item) => setDialog({ mode: "edit", item })}
          onDelete={setDeleteTarget}
        />
      </main>

      {dialog && (
        <CatalogItemDialog
          mode={dialog.mode}
          item={dialog.mode === "edit" ? dialog.item : undefined}
          categories={initialCategories}
          onClose={() => setDialog(null)}
          onSaved={handleSaved}
        />
      )}

      {deleteTarget && (
        <DeleteCatalogDialog
          item={deleteTarget}
          isPending={isDeleting}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  )
}

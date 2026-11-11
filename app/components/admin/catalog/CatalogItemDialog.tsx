"use client"

import { useEffect, useState } from "react"
import { ImageIcon, LoaderCircle, X } from "lucide-react"
import {
  CATALOG_IMAGE_OPTIONS,
  CATALOG_STATUS_OPTIONS,
  DEFAULT_CATALOG_IMAGE,
  type CatalogAdminCategory,
  type CatalogAdminItem,
  type CatalogStatusValue,
} from "@/lib/catalog-admin"
import {
  createCatalogItem,
  updateCatalogItem,
} from "@/app/admin/catalog/actions"

type CatalogItemDialogProps = {
  mode: "create" | "edit"
  item?: CatalogAdminItem
  categories: CatalogAdminCategory[]
  onClose: () => void
  onSaved: (item: CatalogAdminItem) => void
}

type FormState = {
  name: string
  categoryId: string
  shortDescription: string
  description: string
  imageUrl: string
  status: CatalogStatusValue
  isFeatured: boolean
  sortOrder: string
}

const fieldClassName =
  "h-10 w-full rounded-lg border border-[#DDE7F8] bg-white px-3 text-[12px] text-[#14213D] transition-colors placeholder:text-[#8A9AB5] focus:border-[#3978FF] focus:outline-none focus:ring-2 focus:ring-[#3978FF]/20"

function getInitialForm(
  mode: "create" | "edit",
  item: CatalogAdminItem | undefined,
  categories: CatalogAdminCategory[],
): FormState {
  if (mode === "edit" && item) {
    return {
      name: item.name,
      categoryId: item.categoryId ? String(item.categoryId) : "",
      shortDescription: item.shortDescription,
      description: item.description,
      imageUrl: item.imageUrl,
      status: item.status,
      isFeatured: item.isFeatured,
      sortOrder: String(item.sortOrder),
    }
  }

  return {
    name: "",
    categoryId: categories[0] ? String(categories[0].id) : "",
    shortDescription: "",
    description: "",
    imageUrl: DEFAULT_CATALOG_IMAGE,
    status: "draft",
    isFeatured: false,
    sortOrder: "0",
  }
}

export default function CatalogItemDialog({
  mode,
  item,
  categories,
  onClose,
  onSaved,
}: CatalogItemDialogProps) {
  const [form, setForm] = useState<FormState>(() =>
    getInitialForm(mode, item, categories),
  )
  const [error, setError] = useState("")
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !isPending) {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isPending, onClose])

  function updateField<Key extends keyof FormState>(
    key: Key,
    value: FormState[Key],
  ) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setIsPending(true)

    const payload = {
      id: item?.id,
      name: form.name,
      categoryId: Number(form.categoryId),
      shortDescription: form.shortDescription,
      description: form.description,
      imageUrl: form.imageUrl,
      status: form.status,
      isFeatured: form.isFeatured,
      sortOrder: Number(form.sortOrder),
    }

    const result =
      mode === "edit"
        ? await updateCatalogItem(payload)
        : await createCatalogItem(payload)

    setIsPending(false)

    if (!result.ok) {
      setError(result.message)
      return
    }

    onSaved(result.item)
  }

  const title = mode === "edit" ? "Edit Catalog" : "Add Catalog"

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#14213D]/45 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isPending) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="catalog-item-dialog-title"
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#DDE7F8] px-5 py-4 sm:px-6">
          <div>
            <h2
              id="catalog-item-dialog-title"
              className="text-[16px] font-semibold tracking-tight text-[#14213D]"
            >
              {title}
            </h2>
            <p className="mt-1 text-[11px] text-[#526786]">
              {mode === "edit"
                ? "Update the catalog item shown on the website."
                : "Create a new catalog item for the website."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            aria-label="Close dialog"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#7A8CA8] transition-colors hover:bg-[#F8FAFC] hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 disabled:opacity-50"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5 sm:px-6">
          {error && (
            <p
              role="alert"
              className="rounded-lg border border-[#FECDCA] bg-[#FEF3F2] px-3 py-2 text-[12px] text-[#B42318]"
            >
              {error}
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="catalog-name"
                className="mb-1.5 block text-[11px] font-semibold text-[#183B56]"
              >
                Name
              </label>
              <input
                id="catalog-name"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                maxLength={200}
                required
                autoFocus
                placeholder="Enterprise Web Platform"
                className={fieldClassName}
              />
            </div>

            <div>
              <label
                htmlFor="catalog-category-field"
                className="mb-1.5 block text-[11px] font-semibold text-[#183B56]"
              >
                Category
              </label>
              <select
                id="catalog-category-field"
                value={form.categoryId}
                onChange={(event) =>
                  updateField("categoryId", event.target.value)
                }
                required
                className={fieldClassName}
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="catalog-status-field"
                className="mb-1.5 block text-[11px] font-semibold text-[#183B56]"
              >
                Status
              </label>
              <select
                id="catalog-status-field"
                value={form.status}
                onChange={(event) =>
                  updateField("status", event.target.value as CatalogStatusValue)
                }
                className={fieldClassName}
              >
                {CATALOG_STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="catalog-short-description"
                className="mb-1.5 block text-[11px] font-semibold text-[#183B56]"
              >
                Short description
              </label>
              <textarea
                id="catalog-short-description"
                value={form.shortDescription}
                onChange={(event) =>
                  updateField("shortDescription", event.target.value)
                }
                maxLength={500}
                required
                rows={2}
                placeholder="A scalable platform for enterprise web experiences."
                className="w-full resize-y rounded-lg border border-[#DDE7F8] bg-white px-3 py-2 text-[12px] text-[#14213D] transition-colors placeholder:text-[#8A9AB5] focus:border-[#3978FF] focus:outline-none focus:ring-2 focus:ring-[#3978FF]/20"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="catalog-description"
                className="mb-1.5 block text-[11px] font-semibold text-[#183B56]"
              >
                Description
              </label>
              <textarea
                id="catalog-description"
                value={form.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                maxLength={10000}
                rows={4}
                placeholder="Describe the problem this product solves and the experience it delivers."
                className="w-full resize-y rounded-lg border border-[#DDE7F8] bg-white px-3 py-2 text-[12px] text-[#14213D] transition-colors placeholder:text-[#8A9AB5] focus:border-[#3978FF] focus:outline-none focus:ring-2 focus:ring-[#3978FF]/20"
              />
            </div>

            <div>
              <label
                htmlFor="catalog-image"
                className="mb-1.5 block text-[11px] font-semibold text-[#183B56]"
              >
                Image
              </label>
              <div className="relative">
                <ImageIcon
                  size={14}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8CA8]"
                />
                <select
                  id="catalog-image"
                  value={form.imageUrl}
                  onChange={(event) =>
                    updateField("imageUrl", event.target.value)
                  }
                  className={`${fieldClassName} appearance-none pl-8`}
                >
                  {CATALOG_IMAGE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option.replace(/^\//, "")}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="catalog-sort-order"
                className="mb-1.5 block text-[11px] font-semibold text-[#183B56]"
              >
                Sort order
              </label>
              <input
                id="catalog-sort-order"
                type="number"
                value={form.sortOrder}
                onChange={(event) =>
                  updateField("sortOrder", event.target.value)
                }
                min={-9999}
                max={9999}
                step={1}
                className={fieldClassName}
              />
            </div>

            <label className="flex items-center gap-2.5 sm:col-span-2">
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(event) =>
                  updateField("isFeatured", event.target.checked)
                }
                className="h-4 w-4 rounded border-[#DDE7F8] text-[#3978FF] focus:ring-[#3978FF]"
              />
              <span className="text-[12px] font-medium text-[#183B56]">
                Feature this catalog item
              </span>
            </label>

            {mode === "edit" && item && (
              <p className="text-[11px] text-[#526786] sm:col-span-2">
                Public URL:{" "}
                <span className="font-medium text-[#183B56]">
                  /catalog/{item.slug}
                </span>
              </p>
            )}
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-[#DDE7F8] pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-[#DDE7F8] bg-white px-4 text-[12px] font-semibold text-[#526786] transition-colors hover:bg-[#F8FAFC] hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || categories.length === 0}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#14213D] px-4 text-[12px] font-semibold text-white transition-colors hover:bg-[#183B56] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending && (
                <LoaderCircle
                  size={14}
                  className="animate-spin"
                  aria-hidden="true"
                />
              )}
              {mode === "edit" ? "Save Changes" : "Create Catalog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

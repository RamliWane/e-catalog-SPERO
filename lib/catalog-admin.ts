export const CATALOG_STATUS_VALUES = [
  "draft",
  "published",
  "archived",
] as const

export type CatalogStatusValue = (typeof CATALOG_STATUS_VALUES)[number]

export const CATALOG_STATUS_OPTIONS: {
  value: CatalogStatusValue
  label: string
}[] = [
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
  { value: "archived", label: "Archived" },
]

export const CATALOG_STATUS_FILTERS = [
  "All Status",
  "Published",
  "Draft",
  "Archived",
] as const

export type CatalogStatusFilter = (typeof CATALOG_STATUS_FILTERS)[number]

export const CATALOG_CATEGORY_DEFS = [
  { name: "Web Development", slug: "web-development" },
  { name: "Mobile App", slug: "mobile-app" },
  { name: "Cloud & DevOps", slug: "cloud-devops" },
  { name: "UI/UX Design", slug: "ui-ux-design" },
  { name: "Data & Analytics", slug: "data-analytics" },
  { name: "Others", slug: "others" },
] as const

export type CatalogCategoryName =
  (typeof CATALOG_CATEGORY_DEFS)[number]["name"]

export const CATALOG_CATEGORY_IMAGE_FALLBACK: Record<
  CatalogCategoryName,
  string
> = {
  "Web Development": "/main-home-asset.png",
  "Mobile App": "/asset-catalog-2.jpeg",
  "Cloud & DevOps": "/asset-section-2.png",
  "UI/UX Design": "/asset-section-3.png",
  "Data & Analytics": "/main-asset-catalog.png",
  Others: "/dummy-image-catalog.jpeg",
}

export const DEFAULT_CATALOG_IMAGE = "/dummy-image-catalog.jpeg"

export const CATALOG_IMAGE_OPTIONS = [
  "/detail-catalog-image.webp",
  "/asset-catalog-2.jpeg",
  "/asset-catalog-3.png",
  "/asset-section-2.png",
  "/asset-section-3.png",
  "/dummy-image-catalog.jpeg",
  "/main-asset-catalog.png",
  "/main-home-asset.png",
  "/main-home-asset-2.png",
  "/main-home-asset-3.png",
  "/new-hero-asset.png",
  "/new-hero-asset-2.png",
  "/services-asset-1.png",
  "/aboutprocess-asset-home.jpeg",
] as const

export type CatalogAdminCategory = {
  id: number
  name: string
  slug: string
}

export type CatalogAdminItem = {
  id: number
  name: string
  slug: string
  shortDescription: string
  description: string
  categoryId: number | null
  category: string
  status: CatalogStatusValue
  isFeatured: boolean
  sortOrder: number
  imageUrl: string
  updatedAt: string
}

export type CatalogMutationInput = {
  id?: number
  name: string
  categoryId: number
  shortDescription: string
  description: string | null
  imageUrl: string
  status: CatalogStatusValue
  isFeatured: boolean
  sortOrder: number
}

export type CatalogValidationResult =
  | { ok: true; data: CatalogMutationInput }
  | { ok: false; message: string }

export function catalogSlugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function getCatalogStatusLabel(status: CatalogStatusValue): string {
  return (
    CATALOG_STATUS_OPTIONS.find((option) => option.value === status)?.label ??
    "Draft"
  )
}

export function formatCatalogDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date)
}

export function validateCatalogInput(
  input: unknown,
): CatalogValidationResult {
  if (!input || typeof input !== "object") {
    return { ok: false, message: "Invalid catalog payload." }
  }

  const raw = input as Record<string, unknown>
  const name = typeof raw.name === "string" ? raw.name.trim() : ""
  const shortDescription =
    typeof raw.shortDescription === "string"
      ? raw.shortDescription.trim()
      : ""
  const description =
    typeof raw.description === "string" ? raw.description.trim() : ""
  const imageUrl = typeof raw.imageUrl === "string" ? raw.imageUrl : ""
  const categoryId = Number(raw.categoryId)
  const sortOrder = Number(raw.sortOrder)
  const status = raw.status
  const isFeatured = raw.isFeatured === true
  const id = Number(raw.id)

  if (name.length < 2 || name.length > 200) {
    return {
      ok: false,
      message: "Catalog name must be between 2 and 200 characters.",
    }
  }

  if (!Number.isInteger(categoryId) || categoryId <= 0) {
    return { ok: false, message: "Select a valid catalog category." }
  }

  if (!shortDescription || shortDescription.length > 500) {
    return {
      ok: false,
      message: "Short description is required and must be 500 characters or less.",
    }
  }

  if (description.length > 10000) {
    return {
      ok: false,
      message: "Description must be 10,000 characters or less.",
    }
  }

  if (!CATALOG_IMAGE_OPTIONS.includes(imageUrl as never)) {
    return { ok: false, message: "Select a valid catalog image." }
  }

  if (
    typeof status !== "string" ||
    !CATALOG_STATUS_VALUES.includes(status as CatalogStatusValue)
  ) {
    return { ok: false, message: "Select a valid catalog status." }
  }

  if (!Number.isInteger(sortOrder) || sortOrder < -9999 || sortOrder > 9999) {
    return { ok: false, message: "Sort order must be a whole number." }
  }

  return {
    ok: true,
    data: {
      id: Number.isInteger(id) && id > 0 ? id : undefined,
      name,
      categoryId,
      shortDescription,
      description: description || null,
      imageUrl,
      status: status as CatalogStatusValue,
      isFeatured,
      sortOrder,
    },
  }
}
